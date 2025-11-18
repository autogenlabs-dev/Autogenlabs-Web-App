# Plan: Merge 'developer' role into 'user' (keep only 'admin' and 'user')

This plan lists steps for safely merging the `developer` role into `user` across the frontend and backend. The goal: reduce role complexity and maintain feature access for existing developers while keeping `admin` as the only elevated role.

## Goals
- Remove 'developer' as a role label (only `admin` and `user` remain)
- Preserve developer privileges by ensuring users retain content creation, editing, and analytics access
- Update UI, API calls, and guard checks accordingly
- Migrate all database users currently with role 'developer' to role 'user'
- Update documentation and tests

## High-level approach
1. Inventory all references to `'developer'` (done - see `ROLE_API_MAPPING.md` and `DEVELOPER_USER_DIFF_PAGES.md`)
2. Change front-end role checks to allow ordinary `user` to access developer capabilities (e.g., create templates/components, view developer analytics)
3. Remove `developer` from Admin role dropdowns and the backend user role enum
4. Migrate DB: update roles in user table/docs
5. Update server enforcement: endpoints under `/developer/*` should accept `user` or `admin` (or better, switch to a permission system or maintain `developer` flag in profile)
6. Test (end-to-end) and deploy

---

## Step-by-step implementation plan

### Step 0 — Backup
- Backup the database before making bulk role changes.
- Backup configuration files.

### Step 1 — Inventory and Documentation (done)
- Use grep to find occurrences:
  ```bash
  grep -R "role === 'developer'" -n
  grep -R "developer" -n
  ```
- Document file locations (done: `ROLE_API_MAPPING.md` & `DEVELOPER_USER_DIFF_PAGES.md`).

### Step 2 — Frontend changes
- Update `AuthContext` to normalize `developer` to `user` rather than keeping as separate role (optional)
  - Example: in `src/contexts/AuthContext.jsx`, after fetching user metadata from backend, if `role === 'developer'` then set `role = 'user'`.
- Update gating checks:
  - Replace `user?.role === 'developer' || user?.role === 'admin'` with `user && (user.role === 'admin' || user.role === 'user')` or simply `isAuthenticated` if you want all logged-in users to have developer-like privileges.
- Update all per-component checks where `developer` role was used (e.g., `ComponentGallery.jsx`, `TemplateGallery.jsx`, `Dashboard`, `AnalyticsDashboard.jsx`). `canCreateTemplates` and `canCreateComponents` should become `isCreator` or `isUser || isAdmin`.
- Update `src/components/pages/dashboard/AdminDashboard.jsx`
  - Remove `developer` from select dropdown (done)
  - Remove `developer` styling (done)
- Update pages for creation/editing to rely on `AuthGuard` + `user.role !== 'admin'` or just `isAuthenticated`.

### Step 3 — Admin & Backend
- Update admin role dropdown and Admin API to accept only `user` and `admin`.
  - Backend route `/admin/users/:id` should ensure role is validated to { 'user', 'admin' } enum.
- Update server endpoints under `developer/*` and `admin/*`: accept `user` or `admin` for `developer` endpoints OR write a permission check that can grant `create`/`edit` to any `user`.
- Update backend role schema (SQL):
  - e.g., `UPDATE users SET role='user' WHERE role='developer'`
- Add a migration script and a database backup.

### Step 4 — Backend permission system (recommended)
- Instead of equating user and developer roles, add a `permissions` or `capabilities` field in the DB (e.g., `can_create_content: bool`) so you can grant privileges to certain users without a new role label.
- Migrate developer users to `can_create_content = true`.

### Step 5 — Tests
- Update unit tests and integration tests:
  - Ensure `/templates/create`, `/components/create` accessible to users after migration.
  - Ensure `/admin/*` remains admin-only.
  - Ensure admin role editing updates to only allow `user` or `admin`.

### Step 6 — Rollout & Monitoring
- Deploy changes to staging first.
- Run smoke tests and manual test sessions: try login as a user, verify content creation and editing.
- Check `AuthGuard` and role-based conditions.
- Monitor logs for permission denial issues.

---

## Migration SQL (example)
- For MongoDB:
```js
// in Node shell or migration script
db.users.updateMany({ role: 'developer' }, { $set: { role: 'user' } });
```
- For SQL (Postgres, MySQL)
```sql
UPDATE users SET role = 'user' WHERE role = 'developer';
```

## Sample NPM script for migration
Add to `package.json`:
```json
"scripts": {
  "migrate:dev2user": "node scripts/migrate-developer-to-user.js"
}
```
Where `scripts/migrate-developer-to-user.js` runs above migration on your database.

---

## Risks & mitigations
- Risk: Unexpected side effects in content creation flows that expect 'developer' role. Mitigation: split permission model or ensure checks updated to allow `user`.
- Risk: Admin might inadvertently allow 'developer' tag to be reintroduced. Mitigation: restrict role dropdown and add validation in backend.
- Risk: Tests failing. Mitigation: comprehensive tests in CI.

---

## Quick implementation timeline (estimates)
- 2 hours: Inventory and code changes (frontend & Admin UI) — low risk
- 1-2 hours: DB migration and backend change (validation + tests)
- 1 hour: Update documentation & unit tests
- 1 hour: Staging tests and deploy to production

---

If you want, I can implement the rest of the frontend changes for you now (convert `ComponentGallery`, `TemplateGallery`, `DeveloperDashboard` checks, update `ProtectedRoute` usages) and generate a migration script to set `role='user'` for existing `developer` records. What would you like to do next? (I can implement one step at a time)