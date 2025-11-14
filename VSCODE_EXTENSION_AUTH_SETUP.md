# VS Code Extension Authentication Setup

## Overview
This document explains how to configure the VS Code extension authentication integration for the Autogenlabs Web App.

## Authentication Flow
1. User clicks "Sign In" in VS Code extension
2. Extension opens browser to: `https://codemurf.com/sign-in?source=vscode`
3. User authenticates with Clerk (Google, GitHub, email, etc.)
4. After successful auth, `SignInSuccessHandler` component:
   - Detects `?source=vscode` parameter
   - Calls `/api/extension-auth` endpoint
   - Gets JWT token and VS Code deep link
   - Redirects browser back to VS Code: `vscode://codemurf.codemurf/auth?token=<JWT>`
5. VS Code extension receives and validates the JWT token
6. User is authenticated in the extension

## Environment Variables

### Required: JWT_SECRET

**Generate a secure secret:**
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

**Add to your environment:**

#### Local Development (.env.local)
```bash
JWT_SECRET=your_generated_64_byte_hex_secret_here
```

#### Vercel Production
1. Go to your Vercel project dashboard
2. Navigate to Settings → Environment Variables
3. Add new variable:
   - **Name:** `JWT_SECRET`
   - **Value:** Your generated secret (paste the hex string)
   - **Environment:** Production (and Preview if needed)
4. Redeploy your application

**⚠️ CRITICAL:** The `JWT_SECRET` must be **exactly the same** in:
- Your Next.js web app (Vercel environment variable)
- Your VS Code extension (packages/cloud/src/config.ts)

## Files Created

### 1. `/src/app/api/extension-auth/route.ts`
API endpoint that:
- Verifies user is authenticated with Clerk
- Retrieves user details
- Generates JWT token with user info
- Returns VS Code deep link for redirect

### 2. `/src/components/auth/SignInSuccessHandler.tsx`
React component that:
- Detects `?source=vscode` query parameter
- Automatically triggers redirect after successful Clerk auth
- Shows loading UI during token generation
- Handles errors gracefully

### 3. Updated Sign-In/Sign-Up Pages
- `/src/app/sign-in/[[...sign-in]]/page.jsx`
- `/src/app/sign-up/[[...sign-up]]/page.jsx`

Both now include the `SignInSuccessHandler` component.

## VS Code Extension Configuration

Update your extension's deep link URL scheme to match:
```
vscode://codemurf.codemurf/auth?token=<JWT>
```

Verify your `package.json` has:
```json
{
  "publisher": "codemurf",
  "name": "codemurf"
}
```

If your publisher/extension name is different, update the deep link in:
`/src/app/api/extension-auth/route.ts` (line ~50)

## JWT Token Structure

The JWT payload includes:
```json
{
  "userId": "clerk_user_id",
  "email": "user@example.com",
  "firstName": "John",
  "lastName": "Doe",
  "username": "johndoe",
  "clerkSessionId": "sess_xxx",
  "iat": 1234567890,
  "exp": 1234654290
}
```

**Token expiry:** 24 hours (configurable in route.ts)

## Testing the Integration

### Test from VS Code Extension
1. Open VS Code with your extension installed
2. Click "Sign In" button
3. Browser opens to sign-in page with `?source=vscode`
4. Sign in with any Clerk method (Google, GitHub, email)
5. You should see "Connecting to VS Code..." message
6. Browser will prompt to open VS Code
7. VS Code receives token and shows "Successfully authenticated!"

### Test Direct Web Login (No Extension)
1. Navigate to `https://codemurf.com/sign-in` (without `?source=vscode`)
2. Sign in normally
3. Should redirect to `/profile` (no VS Code redirect)

### Debug Mode
The `/api/extension-auth` endpoint returns the token in the response for debugging.
**Remove this in production** for security.

In `route.ts`, remove this line:
```typescript
token, // Include token for debugging (can be removed in production)
```

## Troubleshooting

### "JWT_SECRET is not configured" error
**Solution:** Verify the environment variable is set correctly in Vercel/local env

### Deep link doesn't open VS Code
**Possible causes:**
- Browser blocked popup (check console)
- VS Code not installed
- Wrong publisher/extension name in deep link
- Browser doesn't support deep links

**Fix:** Check browser console for errors, verify deep link format

### "Not authenticated" error
**Solution:** Ensure user is logged in with Clerk before API call

### JWT validation fails in extension
**Solution:** Verify `JWT_SECRET` matches exactly between web app and extension

### Sign-up page redirects to sign-in
**Solution:** We've updated the sign-up page to show the Clerk SignUp component instead of redirecting

## Security Considerations

1. **Secret Management:** Never commit `JWT_SECRET` to git
2. **Token Expiry:** Currently 24 hours, adjust as needed
3. **HTTPS Only:** Deep links only work over HTTPS in production
4. **Signature Validation:** Extension must validate JWT signature with HMAC-SHA256
5. **Rate Limiting:** Consider adding rate limiting to `/api/extension-auth` endpoint

## Next Steps

1. ✅ Generate JWT_SECRET
2. ✅ Add JWT_SECRET to Vercel environment variables
3. ✅ Update VS Code extension to use same JWT_SECRET
4. ✅ Verify deep link URL matches your extension's publisher/name
5. ✅ Deploy to Vercel
6. ✅ Test the complete flow

## Support

For issues or questions, refer to:
- Clerk documentation: https://clerk.com/docs
- Next.js API routes: https://nextjs.org/docs/app/building-your-application/routing/route-handlers
- JWT documentation: https://jwt.io/
