import { NextResponse } from 'next/server'
import { auth, clerkClient } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    console.log('[verify-user API] Request received')
    
    // Read token from request body early so we can use it as a fallback if no session cookie is present
    const body = await request.json()
    const token = body?.token
    console.log('[verify-user API] Token received, length:', token?.length || 0)

    if (!token) {
      console.log('[verify-user API] No token - returning 400')
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Verify Clerk session (cookie-based). If there's no session (e.g., fetch without cookie),
    // we'll attempt a development fallback: decode JWT payload (UNVERIFIED) to extract email
    // and short-circuit admin rights for the configured admin email. WARNING: this fallback
    // is INSECURE and should only be used in development/testing.
    let userId: string | null = null
    try {
      const authResult = await auth()
      userId = authResult?.userId || null
      console.log('[verify-user API] userId from auth():', userId)
    } catch (e) {
      console.warn('[verify-user API] auth() threw; continuing to token fallback', e)
    }

    // If we have a session userId, fetch Clerk user and check email
    if (userId) {
      try {
        const clerk = await clerkClient()
        const clerkUser = await clerk.users.getUser(userId)
        const primaryEmail = clerkUser.emailAddresses?.[0]?.emailAddress?.toLowerCase()
        if (primaryEmail === 'codemurf0@gmail.com') {
          console.log('[verify-user API] Matched admin email via session, returning admin role for', primaryEmail)
          return NextResponse.json({
            ok: true,
            userId,
            email: primaryEmail,
            role: 'admin',
            capabilities: { canCreateContent: true, canManageTemplates: true }
          }, { status: 200 })
        }
      } catch (e) {
        console.warn('[verify-user API] Could not fetch Clerk user for admin override', e)
      }
    }

    // If no session userId, attempt insecure token decode fallback (development only)
    if (!userId) {
      try {
        const parts = token.split('.')
        if (parts.length >= 2) {
          const payload = parts[1]
          const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
          const decoded = Buffer.from(padded, 'base64').toString('utf8')
          const parsed = JSON.parse(decoded)
          const emailFromToken = (parsed.email || parsed?.email_address || parsed?.emailAddress || parsed?.claims?.email || parsed?.sub_email)
            ? String(parsed.email || parsed?.email_address || parsed?.emailAddress || parsed?.claims?.email || parsed?.sub_email).toLowerCase()
            : undefined
          console.warn('[verify-user API] auth() missing; using UNVERIFIED token email fallback:', emailFromToken)
          if (emailFromToken === 'codemurf0@gmail.com') {
            console.log('[verify-user API] Matched admin email via token fallback, returning admin role for', emailFromToken)
            return NextResponse.json({
              ok: true,
              userId: null,
              email: emailFromToken,
              role: 'admin',
              capabilities: { canCreateContent: true, canManageTemplates: true },
              note: 'UNVERIFIED_TOKEN_FALLBACK - remove in production'
            }, { status: 200 })
          }
        }
      } catch (e) {
        console.warn('[verify-user API] token decode fallback failed', e)
      }
    }

    // Call backend
    const backendUrl = process.env.BACKEND_URL || process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8000'
    console.log('[verify-user API] Backend URL:', backendUrl)
    console.log('[verify-user API] Calling backend at', `${backendUrl}/api/verify-user`)
    
    const resp = await fetch(`${backendUrl}/api/verify-user`, {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({ token }),
    })

    console.log('[verify-user API] Backend response status:', resp.status)
    
    if (!resp.ok) {
      const errorText = await resp.text()
      console.error('[verify-user API] Backend error:', errorText)
      return NextResponse.json({ 
        error: 'Backend verification failed', 
        details: errorText,
        status: resp.status 
      }, { status: resp.status })
    }
    
    const backendData = await resp.json()
    console.log('[verify-user API] Backend data:', backendData)
    
    return NextResponse.json(backendData, { status: 200 })
  } catch (err) {
    console.error('[verify-user API] Error:', err)
    console.error('[verify-user API] Error message:', err instanceof Error ? err.message : 'Unknown error')
    console.error('[verify-user API] Error stack:', err instanceof Error ? err.stack : 'No stack trace')
    return NextResponse.json({ 
      error: 'Verification failed', 
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 })
  }
}
