# Pages That Differ Between Developer and User (Codemurf)

This doc enumerates all pages/routes where the UI, features, or access differ when a user has the `developer` role vs a regular `user`.

Summary:
- Total pages (route-level) with developer vs user differences: 8
- Developer-specific features span content creation, editing, analytics, and monetization flows.

## Route-level pages with developer differences

1. `/dashboard` (file: `src/app/dashboard/page.jsx`)
   - Developer sees `DeveloperDashboard` with developer analytics and content management.
   - Regular users see `EnhancedUserDashboard` with user-focused features like account, credits, and basic recommendations.

2. `/components` (file: `src/components/pages/components/ComponentGallery.jsx`)
   - `developer` or `admin` can create components and view "My Components" section.
   - Regular users can only browse and download components.

3. `/components/create` (file: `src/app/components/create/page.js` -> `CreateComponentForm`)
   - Creation form used by developers to create marketplace components (protected route).
   - Not accessible to non-authenticated users (AuthGuard), and the UI only shows create CTA when role is `developer` or `admin`.

4. `/components/[id]/edit` (file: `src/app/components/[id]/edit/page.js` -> `ComponentEditPage`)
   - A full edit flow used by developers to update their component. Guarded by AuthGuard; only relevant to the component owner or developers.

5. `/templates` (file: `src/components/pages/templates/TemplateGallery.jsx`)
   - `developer` or `admin` can upload and manage templates; users can browse templates.

6. `/templates/create` (file: `src/app/templates/create/page.js` -> `CreateTemplateForm`)
   - Template upload and create flow available to developers; not visible or available to non-developers.

7. `/templates/[id]/edit` (file: `src/components/pages/templates/TemplateEditPage.jsx` and route `src/app/templates/[id]/edit`) 
   - Allows developers to edit templates they created (protected, role-sensitive editing behavior).

8. Analytics dashboard & widgets (file: `src/components/analytics/AnalyticsDashboard.jsx`)
   - Analytics view displays developer-specific content performance metrics, "Earnings Over Time", and "Item Performance" sections accessible to developers.
   - Users see less detailed analytics (usage and spending) while admin sees platform-wide metrics.

## Smaller UI differences related to developer role (scattered)

- `ComponentEditPage.jsx` and `TemplateEditPage.jsx` contain logic that checks ownership and role for edit permissions.
- `AdminDashboard` (`src/components/pages/dashboard/AdminDashboard.jsx`) includes developer role styling in some places and also shows developer-specific counts; it's more of an admin page but it references `developer` as a role in the UI.
- Comment moderation: `src/components/ui/CommentSystem.jsx` allows `admin` (not developers) to delete comments; it's a small UI difference.

---

## How differences are enforced
- Client-side UI gating:
  - Check `user?.role` to show/hide CTAs, create buttons, or owner actions.
- Router-level protection:
  - `AuthGuard` lists protected routes like `/components/create`, `/templates/create`, and dynamic edit routes. These are protected for authenticated users but not necessarily restricted only to `developer` role.
- Server-side enforcement:
  - Backend endpoints under `/developer/*` and `/admin/*` are expected to validate tokens and check user roles. The frontend assumes the backend enforces these roles.

---

## Next steps & recommendations
- Add `role` checks at route level to strictly block `user` from accessing `/components/create` and `/templates/create` — currently only authentication gate is present.
- Add automated tests for role-based access to ensure pages and API endpoints behave as expected in the backend repository.
- Optionally add an `isDeveloperRoute` wrapper to make route-based role assertions clear and reusable.

If you want, I can also:
- Add a table view with counts of actions available per role (Create/Edit/Delete/Analytics/Downloads).
- Scan the backend repo to ensure that server-side role checks are in place for `/developer/*` routes.
