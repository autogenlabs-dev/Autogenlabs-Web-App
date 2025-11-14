// API route to generate JWT tokens for VS Code extension authentication
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'
import jwt from 'jsonwebtoken'

// JWT secret for signing tokens - must match the secret in VS Code extension
const JWT_SECRET = process.env.JWT_SECRET

if (!JWT_SECRET) {
  console.error('⚠️ JWT_SECRET is not configured! VS Code extension authentication will not work.')
}

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated with Clerk
    const { userId } = await auth()
    if (!userId) {
      return NextResponse.json(
        { error: 'Not authenticated' },
        { status: 401 }
      )
    }

    // Get user details from Clerk
    const user = await currentUser()
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      )
    }

    // Get the session from Clerk
    const authData = await auth()
    const sessionToken = authData.sessionId

    // Create payload for VS Code extension
    const payload = {
      userId: user.id,
      email: user.emailAddresses[0]?.emailAddress,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      clerkSessionId: sessionToken,
      iat: Math.floor(Date.now() / 1000),
      exp: Math.floor(Date.now() / 1000) + (24 * 60 * 60), // 24 hours
    }

    // Sign JWT with HMAC-SHA256
    const token = jwt.sign(payload, JWT_SECRET!, {
      algorithm: 'HS256',
    })

    // Generate deep link for VS Code
    // Format: vscode://publisher.extension/auth?token=<JWT>
    // TODO: Update with your actual VS Code extension publisher and name
    const deepLink = `vscode://codemurf.codemurf/auth?token=${token}`

    return NextResponse.json({
      success: true,
      deepLink,
      token, // Include token for debugging (can be removed in production)
      user: {
        id: user.id,
        email: user.emailAddresses[0]?.emailAddress,
        name: `${user.firstName} ${user.lastName}`.trim(),
      }
    })
  } catch (error) {
    console.error('Error generating extension auth:', error)
    return NextResponse.json(
      { error: 'Internal server error', details: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    )
  }
}
