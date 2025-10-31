import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Callback Handler
 * This route should NOT be called directly.
 * The backend handles Google OAuth and redirects to frontend callback page.
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const error = url.searchParams.get('error');
    
    // Frontend domain
    const frontendDomain = process.env.NODE_ENV === 'production' 
      ? 'https://codemurf.com' 
      : 'http://localhost:3000';
    
    // If there's an error, redirect to auth page with error
    if (error) {
      return NextResponse.redirect(
        `${frontendDomain}/auth?error=${error}`
      );
    }
    
    // This route shouldn't be called directly in the new flow
    // The backend redirects to /auth/callback page directly
    console.warn('Frontend Google callback route called directly - this indicates incorrect OAuth flow configuration');
    
    return NextResponse.redirect(
      `${frontendDomain}/auth?error=incorrect_flow`
    );
    
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    const frontendDomain = process.env.NODE_ENV === 'production' 
      ? 'https://codemurf.com' 
      : 'http://localhost:3000';
    
    return NextResponse.redirect(
      `${frontendDomain}/auth?error=callback_failed`
    );
  }
}
