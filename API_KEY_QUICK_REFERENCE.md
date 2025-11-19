# Quick Reference: API Key Management

## For Developers

### Import the Helper
```javascript
import { 
  fetchWithAuth, 
  getUserProfile, 
  refreshManagedApiKey,
  refreshOpenRouterApiKey,
  updateGLMApiKey 
} from '@/lib/authHelper';
```

### Get User Profile (All Keys)
```javascript
const profile = await getUserProfile();
// Returns: { managed_api_key, openrouter_api_key, glm_api_key, ... }
```

### Refresh Managed Key
```javascript
const newProfile = await refreshManagedApiKey();
console.log('New key:', newProfile.managed_api_key);
```

### Set GLM Key (Paid Users)
```javascript
try {
  const result = await updateGLMApiKey('sk-glm-xxx...');
  console.log('GLM key saved:', result.glm_api_key);
} catch (error) {
  console.error('Must have paid plan:', error);
}
```

### Generic Authenticated Request
```javascript
const data = await fetchWithAuth('/api/users/me');
const posts = await fetchWithAuth('/api/posts', {
  method: 'POST',
  body: JSON.stringify({ title: 'Hello' })
});
```

## For Users

### View Your Keys
1. Navigate to **Profile** page
2. Scroll to **API Keys** section
3. See three key types:
   - **Managed Key** (green) - Auto-assigned from pool
   - **OpenRouter Key** (blue) - Auto-created for you
   - **GLM Key** (yellow) - Add your own (paid plans)

### Refresh Managed Key
1. Click the **refresh icon** (↻) next to managed key
2. Old key released back to pool
3. New key automatically assigned
4. Copy new key for use in VS Code, CLI, etc.

### Add GLM Key
1. Subscribe to paid plan
2. Get GLM API key from provider
3. Paste in **GLM API Key** input field
4. Click **Save GLM API Key**
5. Key verified and saved to your profile

## For Admins

### Add Keys to Pool
1. Go to **Dashboard** → **API Keys** tab
2. Click **Add Keys** button
3. Paste keys (one per line):
   ```
   sk-prod-1
   sk-prod-2
   sk-prod-3
   ```
4. Add optional label (e.g., "GLM Production")
5. Click **Add Keys**

### Monitor Key Usage
- **Total**: All keys in system
- **Active**: Keys available for assignment
- **Assigned**: Keys currently in use
- **Available**: Unassigned active keys

### Manage Keys
- **Show/Hide**: Click eye icon to reveal full key
- **Deactivate**: Click trash icon to retire key
- **Refresh User**: Click refresh icon to rotate user's key

## Endpoints Quick Reference

### User Endpoints
```bash
# Get profile with all keys
GET /api/users/me
Authorization: Bearer <clerk_token>

# Refresh managed key
POST /api/users/me/managed-api-key/refresh
Authorization: Bearer <clerk_token>

# Refresh OpenRouter key
POST /api/users/me/openrouter-api-key/refresh
Authorization: Bearer <clerk_token>

# Set GLM key (paid only)
POST /api/users/me/glm-api-key?api_key=sk-glm-xxx
Authorization: Bearer <clerk_token>
```

### Admin Endpoints
```bash
# Bulk add keys
POST /api/admin/managed-api-keys
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "keys": ["sk-1", "sk-2"],
  "label": "Production batch"
}

# List all keys
GET /api/admin/managed-api-keys
Authorization: Bearer <admin_token>

# Deactivate key
POST /api/admin/managed-api-keys/{key_id}/deactivate
Authorization: Bearer <admin_token>

# Force refresh user's key
POST /api/admin/users/{user_id}/managed-api-key/refresh
Authorization: Bearer <admin_token>
```

## Troubleshooting

### "Missing Clerk token"
- Ensure you're logged in
- Check component is wrapped in `<ClerkProvider>`
- Verify `getToken()` is called after `isSignedIn`

### "No available keys"
- Admin needs to bulk add keys first
- Check Dashboard → API Keys → Available count
- Add keys via bulk upload

### GLM key save fails
- Verify you have a paid subscription
- Check backend plan verification
- Ensure API key format is correct (starts with `sk-glm-`)

### Admin endpoints 404
- ✅ Fixed: All now use `/api/admin/*` prefix
- Check network tab for actual URL called
- Verify backend is running on port 8000

### Keys not refreshing
- Check backend has available keys in pool
- Verify user has a key assigned to release
- Check network tab for error responses

## Environment Setup

### Development (.env.local)
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### Production (.env.production)
```env
NEXT_PUBLIC_API_URL=https://api.yourproduction.com
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_live_xxx
CLERK_SECRET_KEY=sk_live_xxx
```

## Key Differences

| Feature | Managed Key | OpenRouter Key | GLM Key |
|---------|-------------|----------------|---------|
| **Who provides** | Admin pool | Auto-created | User provides |
| **When assigned** | First profile visit | At login | Manual save |
| **Can refresh** | Yes | Yes | No (replace only) |
| **Visibility** | Pool management | User only | User only |
| **Plan required** | Any | Any | Paid plans |
| **Purpose** | General API access | OpenRouter integration | GLM-specific features |

## Code Examples

### React Component
```jsx
import { useState, useEffect } from 'react';
import { getUserProfile, refreshManagedApiKey } from '@/lib/authHelper';

export default function KeyManager() {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    getUserProfile().then(setProfile);
  }, []);
  
  const handleRefresh = async () => {
    const updated = await refreshManagedApiKey();
    setProfile(updated);
  };
  
  return (
    <div>
      <p>Key: {profile?.managed_api_key}</p>
      <button onClick={handleRefresh}>Refresh</button>
    </div>
  );
}
```

### Server Component (Next.js 13+)
```jsx
import { auth } from '@clerk/nextjs/server';

export default async function ServerPage() {
  const { userId, getToken } = await auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  const token = await getToken();
  const res = await fetch('http://localhost:8000/api/users/me', {
    headers: { 'Authorization': `Bearer ${token}` }
  });
  
  const profile = await res.json();
  
  return <div>Welcome, {profile.email}</div>;
}
```

### API Route Handler
```javascript
import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

export async function GET(request) {
  const { userId, getToken } = await auth();
  
  if (!userId) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const token = await getToken();
  // Use token to call backend...
  
  return NextResponse.json({ success: true });
}
```

---

**Need Help?**
- Check `/FRONTEND_INTEGRATION_COMPLETE.md` for full documentation
- Review `/MANAGED_API_KEYS_IMPLEMENTATION.md` for key management details
- Contact: codemurf0@gmail.com (admin)
