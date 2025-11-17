import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    console.log('[api-key API] Request received')
    
    // Get token from Authorization header
    const authHeader = request.headers.get('authorization')
    console.log('[api-key API] Authorization header present:', !!authHeader)

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      console.log('[api-key API] No Bearer token in header - returning 401')
      return NextResponse.json(
        { error: 'No authentication token found' },
        { status: 401 }
      )
    }

    const token = authHeader.substring(7) // Remove 'Bearer ' prefix
    console.log('[api-key API] Token extracted from header:', !!token)

    // Backend URL
    const backendUrl = process.env.BACKEND_URL || 'http://localhost:8000'
    console.log('[api-key API] Calling backend:', `${backendUrl}/api/users/me`)

    // Forward the request to backend /api/users/me
    const response = await fetch(`${backendUrl}/api/users/me`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
      },
    })

    console.log('[api-key API] Backend response status:', response.status)

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ error: 'Backend request failed' }))
      console.log('[api-key API] Backend error:', errorData)
      return NextResponse.json(
        { error: errorData.error || 'Failed to fetch user data' },
        { status: response.status }
      )
    }

    const userData = await response.json()
    console.log('[api-key API] User data retrieved')

    // Return the GLM API key and other API keys from the user profile
    return NextResponse.json({
      glm_api_key: userData.glm_api_key || null,
      api_keys: userData.api_keys || []
    })

  } catch (error) {
    console.error('[api-key API] Error:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}
