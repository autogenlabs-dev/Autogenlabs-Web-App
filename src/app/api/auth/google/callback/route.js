import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Callback Handler
 * Receives OAuth callback from Google and forwards to backend for processing
 */
export async function GET(request) {
  try {
    const url = new URL(request.url);
    const code = url.searchParams.get('code');
    const state = url.searchParams.get('state');
    const error = url.searchParams.get('error');
    
    if (error) {
      // Forward error to frontend auth page
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=${error}`
      );
    }
    
    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=missing_code`
      );
    }
    
    // Forward the OAuth callback to backend for processing
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const backendCallbackUrl = `${backendUrl}/api/auth/google/callback?code=${code}&state=${state}`;
    
    // Make request to backend to process OAuth callback
    const response = await fetch(backendCallbackUrl);
    
    if (!response.ok) {
      throw new Error('Backend OAuth processing failed');
    }
    
    // Backend will handle token generation and redirect to frontend with tokens
    // The backend response should be a redirect to the frontend callback with tokens
    const responseData = await response.json();
    
    if (responseData.redirect_url) {
      return NextResponse.redirect(responseData.redirect_url);
    }
    
    // If no redirect URL, redirect to frontend callback with tokens
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/callback?${url.searchParams.toString()}`
    );
    
  } catch (error) {
    console.error('Google OAuth callback error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=callback_failed`
    );
  }
}
