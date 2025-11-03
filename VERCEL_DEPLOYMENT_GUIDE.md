# Vercel Deployment Guide - OAuth Configuration ✅ COMPLETE

## Overview
This guide covers the specific environment variables and configuration needed for Vercel deployment.

## ✅ Status: DEPLOYMENT COMPLETE
**Your Vercel deployment is now fully configured!**

- ✅ Environment variables set in Vercel dashboard
- ✅ Frontend code updated to use Vercel variables
- ✅ OAuth configuration ready for production

## Vercel Environment Variables

### Required Environment Variables
Set these in your Vercel dashboard under **Settings → Environment Variables**:

```bash
# Frontend Configuration
NEXT_PUBLIC_API_URL=https://api.codemurf.com
NEXT_PUBLIC_FRONTEND_URL=https://codemurf.com
NEXT_PUBLIC_GOOGLE_CLIENT_ID=37099745939-4v685b95lv9r2306l1edq4s7dpnk05vd.apps.googleusercontent.com

# Backend Configuration (if using separate backend deployment)
VERCEL_API_URL=https://api.codemurf.com

# OAuth Configuration
GOOGLE_OAUTH_REDIRECT_URI=https://codemurf.com/auth/callback
FRONTEND_CALLBACK_URL=https://codemurf.com/auth/callback

# Security
NODE_ENV=production
```

## Vercel-Specific Variables
Vercel automatically provides these variables:

- `VERCEL_URL` - The deployed URL (https://codemurf.com)
- `VERCEL_ENV` - Environment (production)

## Updated Frontend Code

The frontend code has been updated to use Vercel environment variables:

### Google Login Route (`src/app/api/auth/google/login/route.js`)
```javascript
// Uses Vercel environment variables with fallbacks
const googleClientId = process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || 
                   process.env.GOOGLE_CLIENT_ID || 
                   '37099745939-4v685b95lv9r2306l1edq4s7dpnk05vd.apps.googleusercontent.com';

const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL || 
                    process.env.VERCEL_URL || 
                    'https://codemurf.com'}/auth/callback`;
```

### Exchange Code Route (`src/app/api/auth/exchange-code/route.js`)
```javascript
// Uses Vercel environment variables with fallbacks
const backendUrl = process.env.NEXT_PUBLIC_API_URL || 
                   process.env.VERCEL_API_URL || 
                   'http://localhost:8000';
```

## Deployment Steps

### 1. Set Environment Variables in Vercel
1. Go to Vercel dashboard
2. Select your project
3. Go to Settings → Environment Variables
4. Add the required variables from the list above

### 2. Deploy to Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### 3. Configure Google OAuth Console
Update your Google OAuth Console with:
- **Authorized JavaScript Origins**: `https://codemurf.com`
- **Authorized Redirect URIs**: 
  - `https://codemurf.com/auth/callback`

### 4. Verify Deployment
```bash
# Test the deployment
curl -I https://codemurf.com/api/auth/google/login

# Test OAuth flow
# 1. Visit https://codemurf.com/auth
# 2. Click "Login with Google"
# 3. Complete Google OAuth
# 4. Verify redirect and authentication
```

## Troubleshooting Vercel Deployment

### Common Issues
1. **Environment Variables Not Found**
   - Error: `process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID` is undefined
   - Fix: Ensure all required environment variables are set in Vercel dashboard

2. **CORS Issues**
   - Error: "CORS policy violation"
   - Fix: Ensure backend allows `https://codemurf.com`

3. **OAuth Redirect Mismatch**
   - Error: "redirect_uri_mismatch"
   - Fix: Update Google OAuth Console with exact Vercel URL

### Debugging in Vercel
```bash
# Check Vercel logs
vercel logs

# Check environment variables
vercel env ls
```

## Security Considerations for Vercel

1. **HTTPS Only**: Vercel automatically provides HTTPS
2. **Edge Functions**: API routes run at the edge
3. **Environment Security**: Variables are encrypted in Vercel
4. **Domain Configuration**: Automatic SSL certificates

## Production Flow with Vercel
```
User (codemurf.com) 
→ Vercel Edge Function (/api/auth/google/login)
→ Backend (api.codemurf.com) → Google OAuth
→ Backend (api.codemurf.com) → Vercel Edge Function (/auth/callback)
→ User authenticated and redirected to dashboard
```

## Next Steps
1. ✅ Set environment variables in Vercel dashboard
2. ✅ Deploy with `vercel --prod`
3. ✅ Update Google OAuth Console with Vercel URL
4. ✅ Test complete OAuth flow
5. ✅ Monitor authentication in production

Your application is now fully configured for Vercel deployment!