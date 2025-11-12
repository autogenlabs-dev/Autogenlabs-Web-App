# GLM API Key Auto-Provisioning System

## 🎯 Overview

This system automatically provisions users with YOUR GLM API key when they sign up. Users don't need their own API key - they use yours!

## 🔄 How It Works

### 1. User Signs Up (Clerk)
```
User → Signs up with Clerk → Clerk creates account
```

### 2. Auto-Provision (Next.js)
```
New user → Auto-provision component → Calls /api/auth/provision-user
                                    → Stores YOUR GLM API key in Clerk metadata
                                    → Sends user data to Python backend
```

### 3. Extension Authentication
```
Extension → User logs in → Gets Clerk token → Fetches GLM API key → Uses YOUR API key
```

---

## 📁 Files Created

### 1. `/src/app/api/auth/provision-user/route.ts`
**Purpose**: Provisions new users with GLM API key

**Endpoints**:
- `POST /api/auth/provision-user` - Create/provision user
- `GET /api/auth/provision-user` - Get user's API key

**What it does**:
1. Takes YOUR GLM API key from environment variable
2. Stores it in Clerk user's `publicMetadata`
3. Sends user info to Python backend
4. Returns API key to extension

### 2. `/src/app/api/webhooks/clerk/route.ts`
**Purpose**: Webhook handler for Clerk events

**What it does**:
- Listens for `user.created` events from Clerk
- Automatically calls provision endpoint
- Ensures every new user gets an API key

### 3. `/src/components/auth/AutoProvisionUser.tsx`
**Purpose**: Client-side component for auto-provisioning

**What it does**:
- Runs when user first logs in
- Checks if user has API key
- If not, provisions one automatically
- Silent operation (no UI)

---

## 🔧 Setup Instructions

### Step 1: Add Your GLM API Key

Edit `.env.local`:
```bash
# Replace with your actual GLM API key
GLM_API_KEY=sk-your-real-glm-api-key-here
NEXT_PUBLIC_GLM_API_KEY=sk-your-real-glm-api-key-here
```

### Step 2: Install Dependencies

```bash
npm install svix nanoid
```

### Step 3: Add AutoProvision Component to Dashboard

Edit `src/app/dashboard/page.jsx`:
```jsx
import AutoProvisionUser from '@/components/auth/AutoProvisionUser';

export default function DashboardPage() {
  return (
    <div>
      <AutoProvisionUser />
      {/* Rest of your dashboard */}
    </div>
  );
}
```

### Step 4: Configure Clerk Webhook (Optional but Recommended)

1. Go to [Clerk Dashboard](https://dashboard.clerk.com)
2. Select your application
3. Go to **Webhooks** → **Add Endpoint**
4. Add endpoint URL: `https://yourdomain.com/api/webhooks/clerk`
5. Subscribe to events: `user.created`
6. Copy the webhook secret
7. Add to `.env.local`:
   ```bash
   CLERK_WEBHOOK_SECRET=whsec_your_webhook_secret_here
   ```

### Step 5: Update Middleware (Already Done)

Your `middleware.ts` already allows webhook access:
```typescript
const isPublicRoute = createRouteMatcher([
  // ... other routes
  '/api/webhooks(.*)',
]);
```

---

## 🔌 VS Code Extension Integration

### How Extension Gets API Key

1. **User logs in to extension**
2. **Extension calls your Next.js API**:
   ```typescript
   const response = await fetch('http://localhost:3000/api/auth/provision-user', {
     method: 'GET',
     headers: {
       'Authorization': `Bearer ${clerkToken}`
     }
   });
   
   const { apiKey } = await response.json();
   ```

3. **Extension uses YOUR GLM API key**:
   ```typescript
   // Extension now has your GLM API key
   // It can make requests to GLM API on behalf of the user
   const glmResponse = await fetch('https://glm-api.example.com/v1/chat', {
     headers: {
       'Authorization': `Bearer ${apiKey}` // YOUR GLM key
     },
     body: JSON.stringify({
       messages: [...]
     })
   });
   ```

### Extension Code Example

Add this to your extension's auth flow:

```typescript
// In your extension's authentication handler
async function getUserApiKey(clerkToken: string): Promise<string> {
  const response = await fetch(`${API_URL}/api/auth/provision-user`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${clerkToken}`,
      'Content-Type': 'application/json'
    }
  });

  if (!response.ok) {
    throw new Error('Failed to get API key');
  }

  const data = await response.json();
  return data.apiKey;
}

// Store the API key in extension's secure storage
await context.secrets.store('glm_api_key', apiKey);
```

---

## 🐍 Python Backend Integration

### Create Provision Endpoint

Add to `/home/cis/Music/backend-services/user-management-backend/app/api/auth.py`:

```python
from fastapi import APIRouter, HTTPException, Header
from typing import Optional
from pydantic import BaseModel

router = APIRouter()

class ProvisionUserRequest(BaseModel):
    clerk_id: str
    email: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    username: Optional[str] = None
    glm_api_key: str
    user_identifier: str
    created_at: str

@router.post("/auth/provision-user")
async def provision_user(
    user_data: ProvisionUserRequest,
    x_api_key: str = Header(..., alias="X-API-Key")
):
    """Provision a new user with GLM API key"""
    
    # Verify API key
    if x_api_key != settings.BACKEND_API_KEY:
        raise HTTPException(status_code=401, detail="Invalid API key")
    
    # Check if user already exists
    existing_user = await User.find_one(User.clerk_id == user_data.clerk_id)
    if existing_user:
        return {"message": "User already exists", "user_id": str(existing_user.id)}
    
    # Create new user
    user = User(
        clerk_id=user_data.clerk_id,
        email=user_data.email,
        first_name=user_data.first_name,
        last_name=user_data.last_name,
        username=user_data.username,
        glm_api_key=user_data.glm_api_key,  # Store YOUR GLM API key
        user_identifier=user_data.user_identifier,
        created_at=datetime.fromisoformat(user_data.created_at),
        is_active=True
    )
    
    await user.insert()
    
    return {
        "success": True,
        "user_id": str(user.id),
        "message": "User provisioned successfully"
    }
```

---

## 🔒 Security Considerations

### 1. **API Key Storage**
- GLM API key stored in Clerk's `publicMetadata` (accessible to user)
- Backend stores it in database for verification
- Extension receives it via authenticated API call

### 2. **Rate Limiting**
Since all users share YOUR API key, implement rate limiting:

```typescript
// In your Next.js API or Python backend
const RATE_LIMIT = {
  requestsPerMinute: 60,
  requestsPerDay: 1000
};

// Track usage per user
await trackUsage(userId, {
  timestamp: new Date(),
  endpoint: '/v1/chat',
  tokens: response.usage.total_tokens
});
```

### 3. **Usage Monitoring**
Monitor GLM API usage to prevent abuse:

```python
# In your Python backend
class ApiUsage(Document):
    user_id: str
    endpoint: str
    tokens_used: int
    timestamp: datetime
    cost: float

async def track_glm_usage(user_id: str, tokens: int):
    usage = ApiUsage(
        user_id=user_id,
        endpoint="glm/chat",
        tokens_used=tokens,
        timestamp=datetime.now(),
        cost=calculate_cost(tokens)
    )
    await usage.insert()
```

---

## 📊 User Flow Diagram

```
┌──────────────┐
│ User Signs Up│
│   (Clerk)    │
└──────┬───────┘
       │
       ▼
┌──────────────────────────┐
│ AutoProvisionUser.tsx    │
│ (runs on first login)    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ POST /api/auth/          │
│ provision-user           │
│ - Gets YOUR GLM key      │
│ - Stores in Clerk        │
│ - Sends to backend       │
└──────┬───────────────────┘
       │
       ├─────────────────────────┐
       │                         │
       ▼                         ▼
┌──────────────────┐   ┌─────────────────┐
│ Clerk Metadata   │   │ Python Backend  │
│ glmApiKey: xxx   │   │ MongoDB User    │
│ userIdentifier   │   │ Record Created  │
└──────────────────┘   └─────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Extension Calls API      │
│ GET /api/auth/           │
│ provision-user           │
│ Returns: YOUR GLM key    │
└──────┬───────────────────┘
       │
       ▼
┌──────────────────────────┐
│ Extension Uses GLM API   │
│ with YOUR API key        │
└──────────────────────────┘
```

---

## ✅ Testing

### Test Auto-Provisioning

1. **Create a test user**:
   ```bash
   # Sign up via Clerk
   # Visit: http://localhost:3000/sign-up
   ```

2. **Check if API key was provisioned**:
   ```bash
   curl http://localhost:3000/api/auth/provision-user \
     -H "Authorization: Bearer YOUR_CLERK_TOKEN"
   ```

3. **Verify in Clerk Dashboard**:
   - Go to Users
   - Select the user
   - Check `publicMetadata` → should see `glmApiKey`

### Test Extension Integration

1. **In your extension, fetch the API key**:
   ```typescript
   const apiKey = await getUserApiKey(clerkToken);
   console.log('Got API key:', apiKey);
   ```

2. **Make a test GLM API call**:
   ```typescript
   const response = await fetch('https://glm-api.example.com/v1/chat', {
     method: 'POST',
     headers: {
       'Authorization': `Bearer ${apiKey}`,
       'Content-Type': 'application/json'
     },
     body: JSON.stringify({
       model: 'glm-4',
       messages: [{ role: 'user', content: 'Hello!' }]
     })
   });
   ```

---

## 🚀 Production Deployment

### Environment Variables

**Vercel/Production `.env.production`**:
```bash
GLM_API_KEY=sk-your-production-glm-key
CLERK_WEBHOOK_SECRET=whsec_production_secret
BACKEND_API_KEY=your-secure-backend-key
INTERNAL_API_KEY=your-secure-internal-key
NEXT_PUBLIC_API_URL=https://api.yourproduction.com
NEXT_PUBLIC_APP_URL=https://yourproduction.com
```

### Webhook URL
Update Clerk webhook endpoint to:
```
https://yourproduction.com/api/webhooks/clerk
```

---

## 📝 Summary

✅ **What This Gives You**:
1. Users sign up → automatically get YOUR GLM API key
2. No need for users to have their own API keys
3. Extension can use the GLM API immediately
4. Centralized billing (all usage on your account)
5. Easy monitoring and rate limiting

✅ **What Users Get**:
1. Seamless onboarding
2. No API key setup required
3. Instant access to GLM features
4. No billing concerns

✅ **What You Control**:
1. Single GLM API key for all users
2. Usage monitoring per user
3. Rate limiting
4. Cost management
