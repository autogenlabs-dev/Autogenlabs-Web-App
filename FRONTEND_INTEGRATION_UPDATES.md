# Frontend Integration - Updated Implementation Notes

## Key Changes from Updated Guide (Nov 19, 2025)

### 1. Managed API Keys - Separate Endpoints

**CRITICAL CHANGE:** Managed API keys are **NOT** included in the `/api/users/me` response.

#### Before (Old Implementation)
```javascript
GET /api/users/me
Response: {
  managed_api_key: "sk-managed-...",  // ❌ NO LONGER INCLUDED
  openrouter_api_key: "sk-or-...",
  glm_api_key: null
}
```

#### After (Current Implementation)
```javascript
// Step 1: Get user profile (no managed key)
GET /api/users/me
Response: {
  openrouter_api_key: "sk-or-...",
  glm_api_key: null,
  role: "user"
}

// Step 2: Get managed key separately
GET /api/users/me/managed-api-key
Response: {
  raw_key: "sk-managed-...",
  key: "sk-managed-...",
  assigned_at: "2024-11-19T10:30:00Z"
}
```

#### Implementation in Profile Page
```javascript
// Load profile first
useEffect(() => {
  loadUserProfile(); // Fetches /api/users/me
}, [isLoaded, isSignedIn]);

// Then load managed key separately
useEffect(() => {
  if (profileData && isSignedIn) {
    loadManagedKey(); // Fetches /api/users/me/managed-api-key
  }
}, [profileData?.id, isSignedIn]);
```

### 2. OpenRouter Key - Can Be Null

**New Behavior:** `openrouter_api_key` returns `null` if backend is not configured.

#### Backend Configuration Required
```env
# In backend .env file
OPENROUTER_PROVISIONING_API_KEY=sk-or-v1-your-admin-provisioning-key
```

#### UI Implementation
```javascript
// Show warning when null
if (!profileData?.openrouter_api_key) {
  console.warn('[Profile] OpenRouter key is null - check OPENROUTER_PROVISIONING_API_KEY in backend .env');
}
```

#### User-Facing Warning
```jsx
{!profileData?.openrouter_api_key && profileData !== null && (
  <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-3 mb-3">
    <p className="text-yellow-400 text-xs">
      ⚠️ OpenRouter key not available. Backend needs 
      <code>OPENROUTER_PROVISIONING_API_KEY</code> in .env
    </p>
  </div>
)}
```

### 3. GLM Key - Pro/Enterprise Only

**Updated Plan Requirements:** GLM keys only work for "pro" or "enterprise" subscriptions.

#### API Response Format
```javascript
// glm_api_key is a STRING (not array)
{
  "glm_api_key": "sk-glm-abc123..." | null
}
```

#### UI Badge Update
```jsx
<span className="text-xs text-yellow-400 bg-yellow-400/20 px-2 py-1 rounded">
  Pro/Enterprise Only  {/* Updated from "Paid Plans Only" */}
</span>
```

### 4. Updated API Response Structure

#### `/api/users/me` Response
```json
{
  "id": "691d926bf9dbddfa0ec7837a",
  "email": "user@example.com",
  "is_active": true,
  "openrouter_api_key": "sk-or-v1-abc123..." | null,
  "glm_api_key": "sk-glm-xyz789..." | null,
  "api_keys": [],  // Legacy, usually empty
  "role": "user",
  "can_publish_content": true,
  "subscription": "free" | "pro" | "enterprise"
}
```

**Notable Changes:**
- ❌ No `managed_api_key` field
- ⚠️ `openrouter_api_key` can be `null`
- ℹ️ `glm_api_key` is string, not array
- ✅ `role` and capabilities included

#### `/api/users/me/managed-api-key` Response
```json
{
  "raw_key": "sk-managed-abc123...",
  "key": "sk-managed-abc123...",
  "assigned_at": "2024-11-19T10:30:00Z",
  "label": "GLM Production" | null
}
```

### 5. Common Pitfalls - Updated

#### ❌ Expecting managed_api_key in /api/users/me
```javascript
// WRONG
const { managed_api_key } = await fetch('/api/users/me');

// CORRECT
const profile = await fetch('/api/users/me');
const managedKey = await fetch('/api/users/me/managed-api-key');
```

#### ❌ Not handling null openrouter_api_key
```javascript
// WRONG - Will crash if null
const key = profile.openrouter_api_key.substring(0, 12);

// CORRECT
const key = profile.openrouter_api_key 
  ? profile.openrouter_api_key.substring(0, 12) 
  : 'Not configured';
```

#### ❌ Treating glm_api_key as array
```javascript
// WRONG
if (profile.glm_api_key.length > 0) { ... }

// CORRECT
if (profile.glm_api_key) { ... }
```

### 6. Updated User Flow

#### First-Time User
1. User signs up via Clerk
2. Visit `/profile` page
3. Frontend calls `GET /api/users/me`
   - `openrouter_api_key`: `null` (if backend not configured) or auto-created
   - `glm_api_key`: `null` (not set)
4. Frontend separately calls `GET /api/users/me/managed-api-key`
   - Backend auto-assigns from pool
5. Profile displays all three keys

#### Refreshing Keys
```javascript
// Managed Key
POST /api/users/me/managed-api-key/refresh
→ Returns new managed key

// OpenRouter Key  
POST /api/users/me/openrouter-api-key/refresh
→ Returns new OpenRouter key

// GLM Key
// No refresh - user must save a new key manually
```

### 7. Testing Checklist

#### ✅ OpenRouter Configuration Test
```bash
# Without OPENROUTER_PROVISIONING_API_KEY
1. Check profile shows warning message
2. Verify openrouter_api_key is null
3. Refresh button should be disabled

# With OPENROUTER_PROVISIONING_API_KEY
1. Check profile shows valid key
2. Verify key can be copied
3. Test refresh button works
```

#### ✅ Managed Key Separate Loading
```bash
1. Open profile page
2. Check Network tab - should see TWO requests:
   - GET /api/users/me
   - GET /api/users/me/managed-api-key
3. Managed key section should show "Loading..." then key
```

#### ✅ GLM Key Plan Validation
```bash
# Free Plan
1. Try to save GLM key
2. Should fail with plan requirement error

# Pro/Enterprise Plan
1. Paste GLM key
2. Click Save
3. Should succeed and show "GLM Key Active"
```

### 8. Code Changes Summary

#### `/src/app/profile/page.jsx`

**Added:**
- `loadManagedKey()` - Separate function to fetch managed key
- Second `useEffect` to load managed key after profile loads
- OpenRouter null warning UI
- Enhanced error handling for all key operations

**Changed:**
- Removed `managed_api_key` from expected `/api/users/me` response
- Updated logging to reflect new structure
- Changed GLM badge from "Paid Plans Only" to "Pro/Enterprise Only"

**Updated Functions:**
- `refreshManagedKey()` - Better error handling with user alerts
- `refreshOpenRouterKey()` - Handles null case properly
- `saveGLMApiKey()` - Validates plan requirement

### 9. Environment Variables

#### Required for Full Functionality

**Backend (.env)**
```env
# Managed Keys - via admin pool
# No special config needed, keys managed via admin dashboard

# OpenRouter Keys - auto-provisioning
OPENROUTER_PROVISIONING_API_KEY=sk-or-v1-your-admin-key  # ⚠️ REQUIRED

# GLM Keys - user provided
# No backend config needed, just plan validation
```

**Frontend (.env.local)**
```env
NEXT_PUBLIC_API_URL=http://localhost:8000
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_xxx
CLERK_SECRET_KEY=sk_test_xxx
```

### 10. Migration Notes

If you have existing code expecting managed keys in `/api/users/me`:

#### Before
```javascript
const profile = await fetch('/api/users/me');
const managedKey = profile.managed_api_key; // ❌ Will be undefined
```

#### After
```javascript
const profile = await fetch('/api/users/me');
const managedKeyData = await fetch('/api/users/me/managed-api-key');
const managedKey = managedKeyData.raw_key; // ✅ Correct
```

### 11. Quick Reference

| Key Type | Endpoint | Included in /api/users/me? | Can be null? |
|----------|----------|---------------------------|--------------|
| Managed | `/api/users/me/managed-api-key` | ❌ No | No (auto-assigned) |
| OpenRouter | Included in `/api/users/me` | ✅ Yes | ⚠️ Yes (if not configured) |
| GLM | Included in `/api/users/me` | ✅ Yes | ✅ Yes (if not set) |

### 12. Troubleshooting

#### "OpenRouter key is null"
**Solution:** Add `OPENROUTER_PROVISIONING_API_KEY` to backend `.env` and restart:
```bash
docker compose restart api
```

#### "Managed key not loading"
**Check:**
1. Admin has added keys to pool via Dashboard → API Keys
2. Network tab shows request to `/api/users/me/managed-api-key`
3. Response is 200 with `raw_key` or `key` field

#### "GLM key save fails"
**Check:**
1. User has "pro" or "enterprise" subscription
2. Backend can verify plan status
3. Key format starts with correct prefix

---

**Last Updated:** November 19, 2025
**Status:** ✅ Aligned with Latest Backend API Specification
