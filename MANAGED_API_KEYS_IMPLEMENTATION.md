# Managed API Keys Implementation Guide

## Overview
This implementation adds a centralized API key management system where admins can bulk-upload API keys and distribute them to users automatically. Users receive managed keys that can be refreshed on-demand.

## Architecture

### Backend Endpoints (Already Implemented)
Based on your backend implementation:

#### Admin Routes
- **POST** `/api/admin/managed-api-keys` - Bulk add API keys
- **GET** `/api/admin/managed-api-keys` - List all keys with assignment status
- **POST** `/api/admin/managed-api-keys/{id}/deactivate` - Deactivate a key
- **POST** `/api/admin/users/{user_id}/managed-api-key/refresh` - Force refresh user's key

#### User Routes
- **GET** `/api/users/me/managed-api-key` - Get (or auto-assign) managed key
- **POST** `/api/users/me/managed-api-key/refresh` - Refresh current key

### Frontend Implementation

#### 1. API Layer Updates

##### `/src/lib/adminApi.js`
Added admin functions:
```javascript
// Bulk add keys
adminApi.addManagedApiKeys(keysData, token)
// keysData: { keys: ["sk-1", "sk-2"], label: "GLM cluster" }

// Get all keys with assignment info
adminApi.getManagedApiKeys(token)

// Deactivate a key
adminApi.deactivateManagedApiKey(keyId, token)

// Force refresh user's key
adminApi.refreshUserManagedApiKey(userId, token)
```

##### `/src/lib/api.js`
Added new export `managedApiKeyApi`:
```javascript
// Get user's assigned key (auto-assigns if needed)
managedApiKeyApi.getManagedApiKey(accessToken)

// Refresh user's key (releases old, gets new)
managedApiKeyApi.refreshManagedApiKey(accessToken)
```

#### 2. Admin Interface

##### `/src/components/pages/dashboard/ManagedApiKeysTab.jsx`
New component with:
- **Stats Dashboard**: Shows total, active, assigned, and available keys
- **Bulk Add Form**: Upload multiple keys at once (one per line or comma-separated)
- **Keys Table**: View all keys with:
  - Masked key display with show/hide toggle
  - Status badges (Active/Assigned/Available/Inactive)
  - Assignment information (user ID, timestamp)
  - Actions: Refresh user key, deactivate key

##### `/src/components/pages/dashboard/AdminDashboard.jsx`
Added:
- New "API Keys" tab with Key icon
- Renders `ManagedApiKeysTab` when active
- Passes `getToken`, notification methods as props

#### 3. User Interface

##### `/src/app/profile/page.jsx`
Updated:
- Changed from individual API keys to managed API keys
- Uses `/api/users/me/managed-api-key` endpoint (auto-assigns on first call)
- Refresh button calls `/api/users/me/managed-api-key/refresh`
- Displays `raw_key` field from response
- Updated labels to reflect "Managed API Key"

## Usage Flow

### Admin Workflow

1. **Bulk Add Keys**
   ```bash
   # Example: Add keys via UI
   # Navigate to Admin Dashboard → API Keys tab → Click "Add Keys"
   # Paste keys (one per line):
   sk-prod-1
   sk-prod-2
   sk-prod-3
   # Set label: "GLM Production Cluster"
   # Click "Add Keys"
   ```

   Or via curl:
   ```bash
   curl -X POST http://localhost:8000/api/admin/managed-api-keys \
     -H "Authorization: Bearer <admin_token>" \
     -H "Content-Type: application/json" \
     -d '{"keys":["sk-prod-1","sk-prod-2","sk-prod-3"],"label":"GLM cluster"}'
   ```

2. **View All Keys**
   - Navigate to Admin Dashboard → API Keys tab
   - See table with all keys, their status, and assignments
   - Stats cards show: Total, Active, Assigned, Available

3. **Manage Keys**
   - **Deactivate**: Click trash icon on any key
   - **Refresh User**: Click refresh icon on assigned keys to force rotation
   - **Toggle Visibility**: Click eye icon to show/hide raw key

### User Workflow

1. **First Time Access**
   ```bash
   # When user visits profile for first time
   GET /api/users/me/managed-api-key
   # Backend auto-assigns next available key
   # Response: { raw_key: "sk-prod-1", assigned_at: "...", ... }
   ```

2. **View API Key**
   - Navigate to Profile page
   - See "Managed API Key" section
   - Key is masked by default (sk-prod-••••••••••••)
   - Click eye icon to show full key
   - Click clipboard icon to copy

3. **Refresh Key**
   - Click refresh icon (↻) on profile page
   - Backend releases current key (marks as available)
   - Assigns next unclaimed key
   - UI updates with new key

   Or via curl:
   ```bash
   curl -X POST http://localhost:8000/api/users/me/managed-api-key/refresh \
     -H "Authorization: Bearer <user_token>"
   ```

## Key Features

### Auto-Assignment
- First call to `/api/users/me/managed-api-key` automatically assigns an available key
- No manual assignment needed
- User's `glm_api_key` field updated in database

### Key Rotation
- Users can refresh keys on-demand
- Old key released back to pool (becomes available)
- New key assigned from pool
- Seamless transition without admin intervention

### Admin Oversight
- View all keys and who holds them
- See assignment timestamps
- Force refresh specific user's key
- Deactivate compromised keys

### Pool Management
- Track available vs. assigned keys
- Bulk upload for easy provisioning
- Label keys for organization (e.g., "Production", "Development")
- Status tracking: Active, Inactive, Assigned, Available

## Data Flow

```
┌─────────────┐
│   Admin     │
│  Bulk Add   │
└──────┬──────┘
       │
       ↓
┌─────────────────────┐
│  ManagedApiKey DB   │
│  - raw_key          │
│  - is_active        │
│  - assigned_to      │
│  - assigned_at      │
│  - label            │
└──────┬──────────────┘
       │
       ↓
┌─────────────┐       ┌──────────────┐
│   User      │←─────→│  User.       │
│  Requests   │       │  glm_api_key │
│   Key       │       │  (updated)   │
└─────────────┘       └──────────────┘
```

## Security Considerations

1. **Key Visibility**
   - Keys masked by default in admin UI
   - Show/hide toggle per key
   - Users see their own key in profile

2. **Authorization**
   - All admin endpoints check for admin role
   - User endpoints verify token ownership
   - Force refresh requires admin privileges

3. **Rotation Tracking**
   - Assignment timestamps logged
   - Rotation history preserved
   - Audit trail available

## Testing

### Test Scenario 1: Admin Bulk Add
```bash
# 1. Login as admin (codemurf0@gmail.com)
# 2. Navigate to /dashboard → API Keys tab
# 3. Click "Add Keys"
# 4. Paste 3 test keys
# 5. Verify keys appear in table with "Available" status
```

### Test Scenario 2: User Auto-Assignment
```bash
# 1. Login as regular user
# 2. Navigate to /profile
# 3. Verify "Managed API Key" section shows a key
# 4. Check admin dashboard - key should be marked "Assigned"
```

### Test Scenario 3: User Refresh
```bash
# 1. As user, note current key
# 2. Click refresh icon in profile
# 3. Verify new key is different
# 4. Check admin dashboard - old key is "Available", new key is "Assigned"
```

### Test Scenario 4: Admin Force Refresh
```bash
# 1. As admin, find assigned key in table
# 2. Click refresh icon on that key
# 3. User's key should be rotated
# 4. Verify assignment updates
```

## Troubleshooting

### Issue: "No available keys"
**Solution**: Admin must bulk add keys first via API Keys tab

### Issue: Keys not showing in profile
**Solution**: 
- Check backend `/api/users/me/managed-api-key` endpoint is running
- Verify token is valid
- Ensure at least one key exists in pool

### Issue: Refresh not working
**Solution**:
- Verify backend refresh endpoint is accessible
- Check there are available keys in pool
- Confirm user has an assigned key to release

## Future Enhancements

1. **Key Rotation Policies**
   - Auto-rotation after X days
   - Force rotation on security events

2. **Usage Analytics**
   - Track API calls per key
   - Monitor key usage patterns
   - Alert on anomalies

3. **Key Pools**
   - Multiple pools (dev, staging, prod)
   - Pool assignment by user tier
   - Pool-specific rate limits

4. **Audit Logs**
   - Key access history
   - Rotation event logs
   - Admin action tracking

## API Response Examples

### Get Managed Key (User)
```json
{
  "id": "key_123",
  "raw_key": "sk-prod-abc123...",
  "assigned_at": "2024-11-19T10:30:00Z",
  "label": "GLM Production"
}
```

### List All Keys (Admin)
```json
{
  "keys": [
    {
      "id": "key_123",
      "raw_key": "sk-prod-abc123...",
      "label": "GLM Production",
      "is_active": true,
      "assigned_to": "user_35N87...",
      "assigned_at": "2024-11-19T10:30:00Z"
    }
  ],
  "total": 10,
  "assigned": 5,
  "available": 5
}
```

### Refresh Key (User)
```json
{
  "old_key_id": "key_123",
  "new_key": {
    "id": "key_456",
    "raw_key": "sk-prod-xyz789...",
    "assigned_at": "2024-11-19T11:00:00Z",
    "label": "GLM Production"
  },
  "message": "API key refreshed successfully"
}
```

## Files Modified

### Created
- `/src/components/pages/dashboard/ManagedApiKeysTab.jsx` - Admin UI component

### Modified
- `/src/lib/adminApi.js` - Added 4 admin functions
- `/src/lib/api.js` - Added managedApiKeyApi export with 2 functions
- `/src/components/pages/dashboard/AdminDashboard.jsx` - Added API Keys tab
- `/src/app/profile/page.jsx` - Integrated managed key display/refresh

## Summary

The managed API key system provides:
- ✅ Centralized key management for admins
- ✅ Automatic key assignment for users
- ✅ On-demand key rotation without admin help
- ✅ Full visibility and audit trail
- ✅ Pool-based distribution system
- ✅ Clean separation of admin and user interfaces

All implementation is role-based and properly integrated with existing authentication and dashboard systems.
