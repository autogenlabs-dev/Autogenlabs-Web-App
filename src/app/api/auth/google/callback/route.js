import { NextRequest, NextResponse } from 'next/server';

/**
 * Google OAuth Callback Handler
 * This route should not be used when backend is available
 * OAuth callbacks are handled by the backend at /auth/google/callback
 */
export async function GET(request) {
  // Redirect to frontend auth page with error
  return NextResponse.redirect(
    `${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000'}/auth?error=use_backend_oauth`
  );
}
