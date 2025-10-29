import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken';

/**
 * GitHub OAuth Callback Endpoint
 * Handles callback from GitHub after user authorization
 */
export async function GET(request) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const code = searchParams.get('code');
    const state = searchParams.get('state');
    const error = searchParams.get('error');

    // Handle OAuth errors
    if (error) {
      console.error('GitHub OAuth Error:', error);
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=${error}`
      );
    }

    if (!code) {
      return NextResponse.redirect(
        `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=missing_code`
      );
    }

    // Exchange authorization code for access token
    const tokenResponse = await exchangeCodeForToken(code);
    
    if (!tokenResponse.access_token) {
      throw new Error('Failed to obtain access token from GitHub');
    }

    // Get user information from GitHub
    const userInfo = await getGitHubUserInfo(tokenResponse.access_token);

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
    console.error('GitHub OAuth Callback Error:', error);
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=oauth_failed`
    );
  }
}

/**
 * Exchange authorization code for access token
 */
async function exchangeCodeForToken(code) {
  const clientId = process.env.GITHUB_CLIENT_ID;
  const clientSecret = process.env.GITHUB_CLIENT_SECRET;
  const redirectUri = `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/api/auth/github/callback`;

  const response = await fetch('https://github.com/login/oauth/access_token', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      client_id: clientId,
      client_secret: clientSecret,
      code: code,
      redirect_uri: redirectUri,
    }),
  });

  if (!response.ok) {
    throw new Error(`GitHub token exchange failed: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Get user information from GitHub API
 */
async function getGitHubUserInfo(accessToken) {
  const response = await fetch('https://api.github.com/user', {
    headers: {
      'Authorization': `token ${accessToken}`,
      'User-Agent': 'CodeMurf-App',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch GitHub user info: ${response.statusText}`);
  }

  const userData = await response.json();
  
  // Get user email (might be private, need separate API call)
  let email = userData.email;
  if (!email) {
    const emailResponse = await fetch('https://api.github.com/user/emails', {
      headers: {
        'Authorization': `token ${accessToken}`,
        'User-Agent': 'CodeMurf-App',
      },
    });
    
    if (emailResponse.ok) {
      const emails = await emailResponse.json();
      const primaryEmail = emails.find(e => e.primary && e.verified);
      email = primaryEmail?.email;
    }
  }

  return {
    ...userData,
    email: email || `${userData.login}@users.noreply.github.com`
  };
}

/**
 * Helper function to create or update user from GitHub OAuth data
 */
async function createOrUpdateUser(githubUser) {
  // This is a mock implementation - replace with your actual database logic
  const mockUser = {
    id: `github_${githubUser.id}`,
    email: githubUser.email,
    full_name: githubUser.name,
    first_name: githubUser.name?.split(' ')[0] || githubUser.login,
    last_name: githubUser.name?.split(' ').slice(1).join(' '),
    avatar: githubUser.avatar_url,
    role: 'user',
    provider: 'github',
    provider_id: githubUser.id,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  };

  // In a real implementation, you would:
  // 1. Check if user exists in your database by email or provider_id
  // 2. If exists, update user information
  // 3. If not exists, create a new user
  // 4. Return user object

  console.log('Mock user created/updated:', mockUser);
  return mockUser;
}