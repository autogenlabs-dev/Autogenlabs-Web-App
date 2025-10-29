import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

/**
 * Google OAuth Login Endpoint
 * Initiates the Google OAuth flow by redirecting user to Google's consent screen
 */
export async function GET(request) {
  try {
    // Get the base URL from environment or use default
    const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
    
    // Google OAuth configuration
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${baseUrl}/api/auth/google/callback`
    );

    // Generate the authorization URL
    const authUrl = oauth2Client.generateAuthUrl({
      access_type: 'offline',
      scope: [
        'https://www.googleapis.com/auth/userinfo.email',
        'https://www.googleapis.com/auth/userinfo.profile'
      ],
      prompt: 'consent',
      state: Math.random().toString(36).substring(2, 15) // CSRF protection
    });

    // Redirect user to Google's consent screen
    return NextResponse.redirect(authUrl);
    
  } catch (error) {
    console.error('Google OAuth Login Error:', error);
    return NextResponse.json(
      { 
        detail: 'Failed to initiate Google OAuth login',
        error: error.message 
      },
      { status: 500 }
    );
  }
}