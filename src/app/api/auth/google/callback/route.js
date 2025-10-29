import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';
import jwt from 'jsonwebtoken';

/**
 * Google OAuth Callback Endpoint
 * Handles the callback from Google after user consent
 */
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('Google OAuth Error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=${error}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=missing_code`
      );
    }

    // Google OAuth configuration
    const oauth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/google/callback`
    );

    // Exchange authorization code for tokens
    const { tokens } = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(tokens);

    // Get user information from Google
    const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
    const { data: userInfo } = await oauth2.userinfo.get();

    // Create or update user in your database
    const user = await createOrUpdateUser(userInfo);

    // Generate JWT tokens for your application
    const accessToken = jwt.sign(
      { 
        userId: user.id, 
        email: user.email,
        role: user.role 
      },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '15m' }
    );

    const refreshToken = jwt.sign(
      { userId: user.id },
      process.env.JWT_SECRET || 'fallback-secret',
      { expiresIn: '7d' }
    );

    // Redirect to frontend with tokens
    const redirectUrl = new URL(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth/callback`);
    redirectUrl.searchParams.set('access_token', accessToken);
    redirectUrl.searchParams.set('refresh_token', refreshToken);
    redirectUrl.searchParams.set('user_id', user.id);

    return NextResponse.redirect(redirectUrl.toString());

  } catch (error) {
    console.error('Google OAuth Callback Error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=oauth_failed`
    );
  }
}

/**
 * Helper function to create or update user from Google OAuth data
 */
async function createOrUpdateUser(googleUser) {
  // This is a mock implementation - replace with your actual database logic
  const mockUser = {
    id: `google_${googleUser.id}`,
    email: googleUser.email,
    full_name: googleUser.name,
    first_name: googleUser.given_name || googleUser.name?.split(' ')[0],
    last_name: googleUser.family_name || googleUser.name?.split(' ').slice(1).join(' '),
    avatar: googleUser.picture,
    role: 'user',
    provider: 'google',
    provider_id: googleUser.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // In a real implementation, you would:
  // 1. Check if user exists in your database by email or provider_id
  // 2. If exists, update the user information
  // 3. If not exists, create a new user
  // 4. Return the user object

  console.log('Mock user created/updated:', mockUser);
  return mockUser;
}