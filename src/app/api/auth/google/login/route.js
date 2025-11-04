import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Login Endpoint
 * Redirects to backend Google OAuth handler
 */
export async function GET(request) {
  try {
    // Add comprehensive debugging
    console.log('🔍 OAuth Login Debug - Environment variables:', {
      NODE_ENV: process.env.NODE_ENV,
      NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
      VERCEL_URL: process.env.VERCEL_URL,
      NEXT_PUBLIC_FRONTEND_URL: process.env.NEXT_PUBLIC_FRONTEND_URL
    });
    
    // Redirect to backend's Google OAuth endpoint
    // The backend will handle the OAuth flow and redirect back to frontend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    // Check if backend has Google OAuth endpoint available
    const isProduction = process.env.NODE_ENV === 'production';
    
    console.log('🔍 OAuth Login Debug - Configuration:', {
      backendUrl,
      isProduction,
      userAgent: request.headers.get('user-agent')
    });
    
    // For production, backend might not have Google OAuth deployed yet
    // Fallback to direct Google OAuth if backend endpoint is not available
    if (isProduction) {
      // Production: Try backend first, fallback to direct Google OAuth
      try {
        const backendPath = '/auth/google/login';
        const backendOAuthUrl = `${backendUrl}${backendPath}`;
        
        console.log('🔍 OAuth Login Debug - Testing backend endpoint:', backendOAuthUrl);
        
        // Test if backend endpoint exists with timeout
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout
        
        const testResponse = await fetch(backendOAuthUrl, {
          method: 'HEAD',
          redirect: 'manual',
          signal: controller.signal
        });
        
        clearTimeout(timeoutId);
        
        console.log('🔍 OAuth Login Debug - Backend endpoint response:', {
          status: testResponse.status,
          ok: testResponse.ok,
          headers: Object.fromEntries(testResponse.headers.entries())
        });
        
        if (testResponse.status === 404 || testResponse.status === 405) {
          // Backend endpoint doesn't exist, redirect directly to Google OAuth
          console.warn('⚠️ Backend Google OAuth endpoint not available, using direct Google OAuth');
          
          // Direct Google OAuth - this will require backend to handle the callback
          // Use Vercel environment variables if available, fallback to defaults
          const googleClientId = process.env.GOOGLE_CLIENT_ID ||
                           process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID ||
                           '37099745939-4v685b95lv9r2306l1edq4s7dpnk05vd.apps.googleusercontent.com';
          
          const frontendUrl = process.env.NEXT_PUBLIC_FRONTEND_URL ||
                           process.env.VERCEL_URL ||
                           'https://codemurf.com';
          const redirectUri = `${frontendUrl}/auth/callback`;
          
          const googleOAuthUrl = `https://accounts.google.com/o/oauth2/auth?` +
            `response_type=code&` +
            `client_id=${googleClientId}&` +
            `redirect_uri=${encodeURIComponent(redirectUri)}&` +
            `scope=openid email profile&` +
            `access_type=offline&` +
            `state=${Math.random().toString(36).substring(2)}`;
          
          console.log('🔍 OAuth Login Debug - Direct Google OAuth URL:', googleOAuthUrl);
          console.log('🔍 OAuth Login Debug - Redirect URI:', redirectUri);
          
          return NextResponse.redirect(googleOAuthUrl);
        }
        
        console.log('🔍 OAuth Login Debug - Redirecting to backend:', backendOAuthUrl);
        return NextResponse.redirect(backendOAuthUrl);
      } catch (error) {
        console.error('❌ Error checking backend OAuth endpoint:', error);
        return NextResponse.json({ error: 'OAuth configuration error', details: error.message }, { status: 500 });
      }
    } else {
      // Development: Use backend as usual
      const backendPath = '/auth/google/login'; // Backend uses /auth not /api/auth
      const backendOAuthUrl = `${backendUrl}${backendPath}`;
      
      console.log('🔍 OAuth Login Debug - Development mode, redirecting to:', backendOAuthUrl);
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
