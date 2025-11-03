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
    
    // Production backend uses /auth instead of /api/auth
    const isProduction = process.env.NODE_ENV === 'production';
    const backendPath = isProduction ? '/auth/google/login' : '/api/auth/google/login';
    const backendOAuthUrl = `${backendUrl}${backendPath}`;
    
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
