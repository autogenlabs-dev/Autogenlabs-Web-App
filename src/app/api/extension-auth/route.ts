// API route to generate auth tokens for VS Code extension
import { auth, currentUser } from '@clerk/nextjs/server'
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // Verify user is authenticated with Clerk
    const { userId, getToken } = await auth()
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

    // Get the Clerk session token with JWT template (ensures 'kid' header is present)
    // Falls back to default token if template doesn't exist yet
    const clerkToken = await getToken({ template: 'codemurf' }).catch(() => getToken())
    if (!clerkToken) {
      return NextResponse.json(
        { error: 'Failed to get session token' },
        { status: 500 }
      )
    }

    // Generate deep link for VS Code with the Clerk token
    const deepLink = `vscode://codemurf.codemurf/auth?token=${clerkToken}`

    return NextResponse.json({
      success: true,
      deepLink,
      token: clerkToken, // Pass the Clerk token directly
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
