# Production Deployment Guide - OAuth Configuration

## Overview
This guide covers the complete OAuth setup for production deployment on:
- Frontend: `https://codemurf.com`
- Backend: `https://api.codemurf.com`

## Google OAuth Console Configuration

### Required Redirect URIs
Add these authorized redirect URIs in your Google OAuth Console:

1. **Backend Callback URL**:
   ```
   https://api.codemurf.com/auth/google/callback
   ```
   ⚠️ **Note**: Production backend uses `/auth` not `/api/auth` path

2. **Frontend Callback URL** (for direct redirects):
   ```
   https://codemurf.com/auth/callback
   ```

### JavaScript Origins
Add these authorized JavaScript origins:
```
https://codemurf.com
http://localhost:3000
```

### Your Current Configuration ✅
Based on your Google OAuth Console setup:
- **OAuth Client Name**: codemurf
- **Authorized JavaScript Origins**:
  - `https://codemurf.com` ✅
  - `http://localhost:3000` ✅ (for development)
- **Authorized Redirect URIs**:
  - `https://api.codemurf.com/auth/google/callback` ✅
  - `http://localhost:8000/api/auth/google/callback` ✅ (for development)

Your configuration is **CORRECT** and ready for production!

## Environment Configuration

### Frontend (.env.production)
```env
# Production URLs
NEXT_PUBLIC_API_URL=https://api.codemurf.com
NEXT_PUBLIC_FRONTEND_URL=https://codemurf.com

# OAuth Configuration
GOOGLE_OAUTH_REDIRECT_URI=https://api.codemurf.com/api/auth/google/callback
FRONTEND_CALLBACK_URL=https://codemurf.com/auth/callback

# Security
NODE_ENV=production
SECURE_COOKIES=true
COOKIE_DOMAIN=.codemurf.com
```

### Backend Environment Variables
```env
# Production URLs
ENVIRONMENT=production
PRODUCTION_FRONTEND_URL=https://codemurf.com
PRODUCTION_BACKEND_URL=https://api.codemurf.com

# CORS Configuration
BACKEND_CORS_ORIGINS=["https://codemurf.com", "https://www.codemurf.com"]

# OAuth Credentials
GOOGLE_CLIENT_ID=your_production_google_client_id
GOOGLE_CLIENT_SECRET=your_production_google_client_secret
```

## OAuth Flow in Production

### Complete Flow
```
User clicks "Login with Google" 
→ Frontend (https://codemurf.com/api/auth/google/login)
→ Backend (https://api.codemurf.com/api/auth/google/login) 
→ Google OAuth
→ Backend (https://api.codemurf.com/api/auth/google/callback)
→ Frontend (https://codemurf.com/auth/callback?tokens...)
→ Dashboard (https://codemurf.com/dashboard)
```

### Security Considerations
1. **HTTPS Only**: All URLs use HTTPS in production
2. **Secure Cookies**: Cookies are marked as secure
3. **CORS**: Only allowed origins can access the API
4. **Domain Cookies**: Cookies work across subdomains

## Deployment Checklist

### Pre-deployment
- [ ] Google OAuth Console configured with production URLs
- [ ] SSL certificates installed on both domains
- [ ] Environment variables set in production
- [ ] CORS origins configured correctly

### Post-deployment
- [ ] Test complete OAuth flow
- [ ] Verify HTTPS redirects work
- [ ] Check browser console for errors
- [ ] Test token storage and retrieval
- [ ] Verify user can access dashboard

## Testing Production OAuth

### Manual Test Steps
1. Visit `https://codemurf.com/auth`
2. Click "Login with Google"
3. Complete Google OAuth authentication
4. Verify redirect to `https://codemurf.com/auth/callback`
5. Check tokens are stored securely
6. Confirm redirect to dashboard

### Automated Test
```bash
# Test backend connectivity
curl https://api.codemurf.com/api/auth/providers

# Test frontend accessibility
curl -I https://codemurf.com/auth

# Test OAuth initiation
curl -I https://codemurf.com/api/auth/google/login
```

## Troubleshooting

### Common Issues
1. **Redirect URI Mismatch**
   - Error: "redirect_uri_mismatch"
   - Fix: Update Google OAuth Console with exact backend URL

2. **CORS Errors**
   - Error: "CORS policy violation"
   - Fix: Add frontend domain to backend CORS origins

3. **Cookie Issues**
   - Error: Cookies not being set
   - Fix: Ensure secure flag and domain are correct

4. **HTTPS Mixed Content**
   - Error: Mixed content warnings
   - Fix: Ensure all resources use HTTPS

## Monitoring
Monitor these metrics in production:
- OAuth success/failure rates
- Token refresh failures
- CORS errors
- Redirect loop occurrences
- Authentication latency

## Security Best Practices
1. Regularly rotate OAuth client secrets
2. Monitor for unusual authentication patterns
3. Implement rate limiting on auth endpoints
4. Use secure, HTTP-only cookies
5. Log authentication events for audit trails