# Vercel Environment Variables Setup

## Required Environment Variables for Production

Add these in your Vercel project settings (Project Settings → Environment Variables):

### Backend API URL
```
BACKEND_URL=https://api.codemurf.com
```
Or if your backend is on a different domain:
```
BACKEND_URL=https://your-backend-domain.com
```

### How to Add in Vercel Dashboard:

1. Go to https://vercel.com/dashboard
2. Select your project (Autogenlabs-Web-App)
3. Go to Settings → Environment Variables
4. Add variable:
   - Name: `BACKEND_URL`
   - Value: `https://api.codemurf.com` (or your backend URL)
   - Environment: Production (and Preview if needed)
5. Click "Save"
6. Redeploy your application

### Important Notes:

- The backend URL should NOT include trailing slashes
- After adding environment variables, you MUST redeploy for changes to take effect
- You can also add via Vercel CLI:
  ```bash
  vercel env add BACKEND_URL production
  ```

### Current Status:

✅ Code updated to use `process.env.BACKEND_URL`
❌ Need to set `BACKEND_URL` in Vercel dashboard
❌ Need to redeploy after setting environment variable

### Backend Deployment:

Make sure your backend is deployed and accessible at the URL you specify.
For example: https://api.codemurf.com should be your FastAPI backend.
