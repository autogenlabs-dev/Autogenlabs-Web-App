import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Login Endpoint
 * Redirects to backend GitHub OAuth handler
 */
export async function GET(request) {
  try {
    // Redirect directly to backend's GitHub OAuth endpoint
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const backendOAuthUrl = `${backendUrl}/auth/github/login`;
    
    return NextResponse.redirect(backendOAuthUrl);
    
  } catch (error) {
    console.error('GitHub OAuth Login Error:', error);
    return NextResponse.json(
      { 
        detail: 'Failed to redirect to backend OAuth',
        error: error.message 
      },
      { status: 500 }
    );
  }
}
