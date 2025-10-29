import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Login Endpoint
 * Initiates GitHub OAuth flow by redirecting user to GitHub's consent screen
 */
export async function GET(request) {
  try {
    // Get base URL from environment or use default
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // GitHub OAuth configuration
    const clientId = process.env.GITHUB_CLIENT_ID;
    const redirectUri = `${baseUrl}/api/auth/github/callback`;
    const state = Math.random().toString(36).substring(2, 15); // CSRF protection

    // Generate authorization URL
    const authUrl = new URL('https://github.com/login/oauth/authorize');
    authUrl.searchParams.set('client_id', clientId);
    authUrl.searchParams.set('redirect_uri', redirectUri);
    authUrl.searchParams.set('scope', 'user:email');
    authUrl.searchParams.set('state', state);

    // Redirect user to GitHub's consent screen
    return NextResponse.redirect(authUrl.toString());
    
  } catch (error) {
    console.error('GitHub OAuth Login Error:', error);
    return NextResponse.json(
      { 
        detail: 'Failed to initiate GitHub OAuth login',
        error: error.message 
      },
      { status: 500 }
    );
  }
}