import { NextRequest, NextResponse } from 'next/server';

/**
 * GitHub OAuth Callback Handler
 * This route should not be used when backend is available
 * OAuth callbacks are handled by the backend at /auth/github/callback
 */
export async function GET(request) {
  // Redirect to frontend auth page with error
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=use_backend_oauth`
  );
}
