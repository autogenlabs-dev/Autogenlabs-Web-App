# Role & API Mapping (Autogenlabs / Codemurf)

This document summarizes the roles used across the frontend and outlines how those roles map to backend API endpoints and UI components. It will also show where role checks are enforced and how to update roles.

---

## Roles Defined (frontend)

- admin
  - Has full access to admin endpoints under `/admin/*`.
  - Can update user roles, manage content, approve/reject items, view analytics and revenue.
  - `user.role === 'admin'`

- developer
  - Has access to developer endpoints under `/developer/*`.
  - Can create/upload templates/components, view earnings, request payouts, and submit content for review.
  - `user.role === 'developer'`

- user (default)
  - Regular end users with basic access (download templates, use features, and see their profile).
  - `user.role === 'user'` or no role present defaults to 'user'.

---

## Where roles are stored / set

- The frontend maintains a `user` object in `src/contexts/AuthContext.jsx`.
  - `role` defaults to `'user'` when transforming Clerk `user` into the app user format.
  - Admin can change roles via the Admin Dashboard; this triggers `adminApi.updateUserRole()` which calls backend `/admin/users/:id` to update the role in the database.
- Backend holds the authoritative role information (user table/profile). The frontend reads and caches this; to update the role, call the Admin API.
- Clerk is used for authentication; roles are not Clerk-specific by default — the app maps Clerk identities to our role field in the backend.

---

## Frontend Role Checks

- `src/components/shared/ProtectedRoute.jsx` — redirects based on `allowedRoles` or `requiredRole`.
- `src/contexts/AuthContext.jsx` exposes convenience flags:
  - `isAdmin: user?.role === 'admin'
  - `isDeveloper: user?.role === 'developer'`
  - `isUser: user?.role === 'user' || !user?.role`
- Multiple UI components conditionally render based on the role:
  - `AdminDashboard` is shown for `admin` role. (`src/app/dashboard/page.jsx`)
  - `DeveloperDashboard` shown for `developer` role. (`src/app/dashboard/page.jsx`)
  - `ComponentGallery` and `TemplateGallery` guard creation/management actions to `developer` and `admin`.
  - `CommentSystem` allows `admin` or comment author to delete comments

---

## Backend API Mapping (frontend wrappers)

- Admin API wrapper: `src/lib/adminApi.js` — calls backend routes under `/admin/*`.
  - Example endpoints:
    - GET `/admin/users` — list users (admin)
    - PUT `/admin/users/:id` — update user/role (admin)
    - GET `/admin/developers` — developer listing (admin)
    - POST `/admin/content/:id/approve` (admin)
  - The wrapper uses a token in `Authorization: Bearer <token>` header.

- Developer API wrapper: `src/lib/developerApi.js` — calls backend routes under `/developer/*`.
  - Example endpoints:
    - GET `/developer/earnings` — developer-only
    - POST `/developer/payout-request` — request payout
    - GET `/developer/content` — developer's templates and components

- User APIs: `src/app/api/user/api-key/route.ts` — retrieves user data from backend `/api/users/me` and returns `glm_api_key` and `api_keys`.
  - This endpoint relies on `Authorization` header with Clerk token from client.
  - `src/app/api/auth/provision-user/route.ts` provisions a user and stores `glmApiKey` in Clerk public metadata and calls backend `/auth/provision-user`.

- General: `api.js`, `marketplaceApi.js`, `componentApi.js` also use different routes like `/templates`, `/components`, `/marketplace` — each uses `getAuthHeaders` to forward the Clerk token to backend when necessary.

---

## Access Control Recommendations / Where server should enforce role

- The backend must validate the token and check roles for protected endpoints:
  - `/admin/*` must be allowed only for verified `admin` roles in backend user record.
  - `/developer/*` endpoints should require the user to have `developer` or `admin` role (admin often inherits developer privileges).
  - `/api/users/me` is accessible to any authenticated user; returns user-specific data.

- The frontend should handle soft restrictions via `ProtectedRoute` and conditional UI but server must be authoritative.

---

## How to change a user's role (UI & API flow)

1. Admin uses Admin Dashboard (`AdminDashboard`) to select a new role in the Edit User modal.
2. Admin saves changes -> `adminApi.updateUserRole(userId, role, token)` is called.
3. Backend `/admin/users/:id` validates the token and verifies the admin role.
4. Backend updates the DB user role and returns updated user info. Frontend re-fetches user data.

---

## Where role checks appear in code (selected files)

- `src/contexts/AuthContext.jsx` — default role logic and isAdmin/isDeveloper flags
- `src/components/shared/ProtectedRoute.jsx` — central route guard
- `src/lib/adminApi.js` — wrapper for admin endpoints
- `src/lib/developerApi.js` — wrapper for developer endpoints
- `src/components/pages/dashboard/AdminDashboard.jsx` — UI to update role and manage user
- `src/components/pages/dashboard/DeveloperDashboard.jsx` — content/analytics available to developers
- `src/components/pages/components/ComponentGallery.jsx` — conditional controls per role

---

## Example Server APIs & Permissions Map

- /admin/* — Admin only
  - GET /admin/users — list users
  - PUT /admin/users/:id — update role
  - DELETE /admin/users/:id — delete
  - GET /admin/content — list all content
  - POST /admin/content/:id/approve — approve content

- /developer/* — Developer (+ admin)
  - GET /developer/earnings — developer only
  - POST /developer/payout-request — developer
  - GET /developer/content — developer's content

- /api/users/me — authenticated user
  - Returns user details including `glm_api_key` and `api_keys` if available

- /auth/provision-user — called on signup, provisions GLM key and writes metadata in Clerk and backend

---

## How to add a new role

1. Add role to backend user schema (e.g., `role` enum or text column): 'support'/'moderator'.
2. Update backend role checks in protected endpoints to include new role where appropriate.
3. Update frontend `AuthContext.jsx` to map Clerk or backend role into `user.role`.
4. Add UI controls in Admin Dashboard for role assignment.
5. Add role-based UI behavior using ProtectedRoute or `user.role` checks in components.

---

## Next Steps

- Verify server enforces role checks in `/admin/*` and `/developer/*` (backend repo).
- Add unit/integration tests for admin endpoints to verify access control.
- If you want, I can create a compact diagram showing relationships between roles and APIs.

---

If you'd like the document to include a table of endpoints or to include the backend-side role checks (server repo), say the word and I will scan the backend repository as well.
