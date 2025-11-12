import { auth, clerkClient } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';
import { nanoid } from 'nanoid';

/**
 * Provisions a new user with GLM API key after Clerk signup
 * This endpoint is called automatically after user signs up
 */
export async function POST(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user details from Clerk
    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);

    // Check if user already has an API key
    const existingApiKey = user.publicMetadata?.glmApiKey;
    if (existingApiKey) {
      return NextResponse.json({
        success: true,
        message: 'User already provisioned',
        apiKey: existingApiKey,
      });
    }

    // YOUR GLM API KEY (from environment variable for security)
    const GLM_API_KEY = process.env.GLM_API_KEY || process.env.NEXT_PUBLIC_GLM_API_KEY;

    if (!GLM_API_KEY) {
      console.error('GLM_API_KEY not found in environment variables');
      return NextResponse.json(
        { error: 'GLM API key not configured' },
        { status: 500 }
      );
    }

    // Generate unique user identifier for tracking
    const userIdentifier = `user_${nanoid(16)}`;

    // Store GLM API key in Clerk user metadata
    await clerk.users.updateUserMetadata(userId, {
      publicMetadata: {
        glmApiKey: GLM_API_KEY,
        userIdentifier: userIdentifier,
        provisionedAt: new Date().toISOString(),
        apiProvider: 'glm',
      },
    });

    // Send user data to Python backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

    try {
      const response = await fetch(`${backendUrl}/auth/provision-user`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-API-Key': process.env.BACKEND_API_KEY || '',
        },
        body: JSON.stringify({
          clerk_id: userId,
          email: user.emailAddresses[0]?.emailAddress,
          first_name: user.firstName || '',
          last_name: user.lastName || '',
          username: user.username || user.emailAddresses[0]?.emailAddress?.split('@')[0],
          glm_api_key: GLM_API_KEY,
          user_identifier: userIdentifier,
          created_at: new Date().toISOString(),
        }),
      });

      if (!response.ok) {
        console.error('Failed to create user in backend:', await response.text());
        // Continue anyway - user is provisioned in Clerk
      }
    } catch (error) {
      console.error('Error calling backend:', error);
      // Continue anyway - user is provisioned in Clerk
    }

    return NextResponse.json({
      success: true,
      message: 'User provisioned successfully',
      apiKey: GLM_API_KEY,
      userIdentifier: userIdentifier,
    });
  } catch (error) {
    console.error('Error provisioning user:', error);
    return NextResponse.json(
      {
        error: 'Failed to provision user',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}

/**
 * Get user's GLM API key
 */
export async function GET(req: Request) {
  try {
    const { userId } = await auth();

    if (!userId) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const clerk = await clerkClient();
    const user = await clerk.users.getUser(userId);
    const glmApiKey = user.publicMetadata?.glmApiKey;
    const userIdentifier = user.publicMetadata?.userIdentifier;

    if (!glmApiKey) {
      return NextResponse.json(
        { error: 'User not provisioned with API key' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      apiKey: glmApiKey,
      userIdentifier: userIdentifier,
      apiProvider: 'glm',
    });
  } catch (error) {
    console.error('Error getting user API key:', error);
    return NextResponse.json(
      {
        error: 'Failed to get API key',
        details: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 }
    );
  }
}
