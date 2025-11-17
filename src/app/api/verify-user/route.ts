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
