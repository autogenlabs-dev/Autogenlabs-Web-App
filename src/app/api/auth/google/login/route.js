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
    const backendOAuthUrl = `${backendUrl}/api/auth/google/login`;
    
    console.log('Redirecting to backend OAuth:', backendOAuthUrl);
    
    return NextResponse.redirect(backendOAuthUrl);
    
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
