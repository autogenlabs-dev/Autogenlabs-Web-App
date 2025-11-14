# Quick Start: VS Code Extension Authentication

## ✅ Implementation Complete!

Your website authentication is working with Clerk, and VS Code extension integration is now ready.

## 🚀 What Was Implemented

### 1. **API Endpoint** → `/api/extension-auth`
- Generates JWT tokens for VS Code authentication
- Validates Clerk session
- Returns deep link to redirect back to VS Code

### 2. **Handler Component** → `SignInSuccessHandler.tsx`
- Detects `?source=vscode` parameter
- Automatically redirects after Clerk authentication
- Shows loading UI during token generation

### 3. **Updated Auth Pages**
- Sign-in page now includes VS Code handler
- Sign-up page enabled (was redirecting before)
- Both support VS Code extension flow

## 📋 Required: Set Environment Variable

### Generate JWT Secret
```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

### Add to Vercel
1. Go to Vercel Dashboard → Your Project
2. Settings → Environment Variables
3. Add: `JWT_SECRET` = (paste generated secret)
4. Save and redeploy

### Add to Local Development
Create `.env.local`:
```bash
JWT_SECRET=your_generated_secret_here
```

**⚠️ Important:** Use the **same JWT_SECRET** in your VS Code extension!

## 🔄 Authentication Flow

```
VS Code Extension
    ↓ (Click "Sign In")
Opens Browser: https://codemurf.com/sign-in?source=vscode
    ↓ (User signs in with Clerk)
SignInSuccessHandler detects ?source=vscode
    ↓ (Calls /api/extension-auth)
Gets JWT token + Deep link
    ↓ (Redirects to)
vscode://codemurf.codemurf/auth?token=<JWT>
    ↓ (VS Code receives token)
Extension validates JWT → User authenticated ✅
```

## 🧪 Testing Checklist

- [ ] Generate JWT_SECRET
- [ ] Add JWT_SECRET to Vercel environment variables  
- [ ] Update JWT_SECRET in VS Code extension config
- [ ] Verify deep link matches: `vscode://codemurf.codemurf/auth?token=<JWT>`
- [ ] Deploy to Vercel
- [ ] Test from VS Code extension
- [ ] Test direct website login (without ?source=vscode)

## 🔗 Deep Link Configuration

If your VS Code extension has a different publisher/name, update this line in:  
`src/app/api/extension-auth/route.ts` (around line 50)

```typescript
const deepLink = `vscode://YOUR_PUBLISHER.YOUR_EXTENSION/auth?token=${token}`
```

Check your extension's `package.json`:
```json
{
  "publisher": "codemurf",  // ← Use this
  "name": "codemurf"        // ← and this
}
```

## 📁 Files Created/Modified

**Created:**
- ✅ `src/app/api/extension-auth/route.ts` - JWT generation endpoint
- ✅ `src/components/auth/SignInSuccessHandler.tsx` - Redirect handler
- ✅ `VSCODE_EXTENSION_AUTH_SETUP.md` - Full documentation

**Modified:**
- ✅ `src/app/sign-in/[[...sign-in]]/page.jsx` - Added handler
- ✅ `src/app/sign-up/[[...sign-up]]/page.jsx` - Enabled + added handler

## 🐛 Common Issues

### Browser doesn't redirect to VS Code
- Check browser console for errors
- Verify VS Code is installed
- Check if browser blocked popup
- Verify deep link URL is correct

### "Not authenticated" error
- User must be logged in with Clerk first
- Check Clerk session is active

### JWT validation fails in extension
- Verify JWT_SECRET matches in both web app and extension
- Check token expiry (default: 24 hours)

## 📚 Full Documentation

See `VSCODE_EXTENSION_AUTH_SETUP.md` for detailed documentation including:
- Security considerations
- Troubleshooting guide
- Token structure
- Advanced configuration

## ✨ Next Steps

1. Set the JWT_SECRET environment variable in Vercel
2. Deploy your changes
3. Test the complete authentication flow
4. Enjoy seamless VS Code extension login! 🎉
