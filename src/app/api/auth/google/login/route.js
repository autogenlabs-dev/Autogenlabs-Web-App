import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Login Endpoint
 * Redirects to backend Google OAuth handler
 */
export async function GET(request) {
  try {
    // Redirect to backend's Google OAuth endpoint
    // The backend will handle the OAuth flow and redirect back to frontend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Check if backend has Google OAuth endpoint available
    const isProduction = process.env.NODE_ENV === 'production';
    
    // For production, backend might not have Google OAuth deployed yet
    // Fallback to direct Google OAuth if backend endpoint is not available
    if (isProduction) {
      // Production: Try backend first, fallback to direct Google OAuth
      try {
        const backendPath = '/auth/google/login';
        const backendOAuthUrl = `${backendUrl}${backendPath}`;
        
        // Test if backend endpoint exists
        const testResponse = await fetch(backendOAuthUrl, { method: 'HEAD', redirect: 'manual' });
        
        if (testResponse.status === 404 || testResponse.status === 405) {
          // Backend endpoint doesn't exist, redirect directly to Google OAuth
          console.warn('Backend Google OAuth endpoint not available, using direct Google OAuth');
          
          // Direct Google OAuth - this will require backend to handle the callback
          // Use Vercel environment variables if available, fallback to defaults
          const googleClientId = process.env.GOOGLE_CLIENT_ID ||
                           process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
                           '37099745939-4v685b95lv9r2306l1edq4s7dpnk05vd.apps.googleusercontent.com';
          
          const redirectUri = `${process.env.NEXT_PUBLIC_FRONTEND_URL ||
                              process.env.VERCEL_URL ||
                              'https://codemurf.com'}/auth/callback`;
          
          const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?` +
            `response_type=code&` +
            `client_id=${googleClientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `scope=openid email profile&` +
            `access_type=offline&` +
            `state=${Math.random().toString(36).substring(2)}`;
          
          return NextResponse.redirect(googleOAuthUrl);
        }
        
        return NextResponse.redirect(backendOAuthUrl);
      } catch (error) {
        console.error('Error checking backend OAuth endpoint:', error);
        return NextResponse.json({ error: 'OAuth configuration error' }, { status: 500 });
      }
    } else {
      // Development: Use backend as usual
      const backendPath = '/api/auth/google/login';
      const backendOAuthUrl = `${backendUrl}${backendPath}`;
      return NextResponse.redirect(backendOAuthUrl);
    }
    
  } catch (error) {
    console.error('Google OAuth Login Error:', error);
    return NextResponse.json(
      { 
        detail: 'Failed to redirect to backend OAuth',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
