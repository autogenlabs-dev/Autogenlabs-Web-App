import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';
import { randomBytes } from 'crypto';

/**
 * Generate or retrieve user's API key
 * This endpoint allows authenticated users to get their API key for external integrations
 */
export async function GET() {
  try {
    // Verify Clerk authentication
    const { userId, getToken } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get Clerk JWT token
    const clerkToken = await getToken();
    
    if (!clerkToken) {
      return NextResponse.json(
        { error: 'Failed to get authentication token' },
        { status: 401 }
      );
    }

    // Forward to backend to get/generate API key
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${backendUrl}/api/user/api-key`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clerkToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return NextResponse.json(result);
      }
    } catch (backendError) {
      console.log('Backend not available, generating temporary key');
    }

    // If backend is not available, generate a temporary API key
    // This is for development purposes - in production, the backend should handle this
    const apiKey = `cm_${userId.slice(0, 8)}_${randomBytes(16).toString('hex')}`;
    
    return NextResponse.json({
      api_key: apiKey,
      user_id: userId,
      created_at: new Date().toISOString(),
      expires_at: null, // No expiration for now
      permissions: ['read', 'write'],
      rate_limit: {
        requests_per_minute: 60,
        requests_per_day: 1000,
      },
      note: 'Development API key - Backend integration required for production',
    });

  } catch (error) {
    console.error('API key generation error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to generate API key',
        details: error.message 
      },
      { status: 500 }
    );
  }
}

/**
 * Regenerate user's API key
 */
export async function POST() {
  try {
    // Verify Clerk authentication
    const { userId, getToken } = auth();
    
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      );
    }

    // Get Clerk JWT token
    const clerkToken = await getToken();
    
    if (!clerkToken) {
      return NextResponse.json(
        { error: 'Failed to get authentication token' },
        { status: 401 }
      );
    }

    // Forward to backend to regenerate API key
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    
    try {
      const response = await fetch(`${backendUrl}/api/user/api-key/regenerate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${clerkToken}`,
        },
      });

      if (response.ok) {
        const result = await response.json();
        return NextResponse.json(result);
      }
    } catch (backendError) {
      console.log('Backend not available, generating new temporary key');
    }

    // If backend is not available, generate a new temporary API key
    const apiKey = `cm_${userId.slice(0, 8)}_${randomBytes(16).toString('hex')}`;
    
    return NextResponse.json({
      api_key: apiKey,
      user_id: userId,
      created_at: new Date().toISOString(),
      expires_at: null,
      permissions: ['read', 'write'],
      rate_limit: {
        requests_per_minute: 60,
        requests_per_day: 1000,
      },
      note: 'Development API key - Backend integration required for production',
    });

  } catch (error) {
    console.error('API key regeneration error:', error);
    return NextResponse.json(
      { 
        error: 'Failed to regenerate API key',
        details: error.message 
      },
      { status: 500 }
    );
  }
}