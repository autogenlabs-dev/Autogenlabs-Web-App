import { NextResponse } from 'next/server'
import { auth } from '@clerk/nextjs/server'

export async function POST(request: Request) {
  try {
    console.log('[verify-user API] Request received')
    
    // Verify Clerk session
    const { userId } = await auth()
    console.log('[verify-user API] userId:', userId)
    
    if (!userId) {
      console.log('[verify-user API] No userId - returning 401')
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 })
    }

    // Get token from request body
    const { token } = await request.json()
    console.log('[verify-user API] Token received, length:', token?.length || 0)
    
    if (!token) {
      console.log('[verify-user API] No token - returning 400')
      return NextResponse.json({ error: 'Token required' }, { status: 400 })
    }

    // Call backend
    console.log('[verify-user API] Calling backend at http://localhost:8000/api/verify-user')
    const resp = await fetch('http://localhost:8000/api/verify-user', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    })

    console.log('[verify-user API] Backend response status:', resp.status)
    const backendData = await resp.json()
    console.log('[verify-user API] Backend data:', backendData)
    
    return NextResponse.json(backendData)
  } catch (err) {
    console.error('[verify-user API] Error:', err)
    return NextResponse.json({ error: 'Verification failed' }, { status: 500 })
  }
}
