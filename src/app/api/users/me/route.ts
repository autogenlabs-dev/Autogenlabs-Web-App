import { NextResponse } from 'next/server';
import { auth } from '@clerk/nextjs/server';

/**
 * GET /api/users/me - Get unified user profile
 * Returns user data including all API keys (managed, OpenRouter, GLM)
 * Proxies to backend GET /api/users/me
 */
export async function GET(request: Request) {
  try {
    console.log('[users/me API] Request received');
    
    // Verify Clerk session
    const { userId, getToken } = await auth();
    console.log('[users/me API] userId:', userId);
    
    if (!userId) {
      console.log('[users/me API] No userId - returning 401');
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    // Get Clerk token
    const token = await getToken();
    console.log('[users/me API] Token obtained, length:', token?.length || 0);
    
    if (!token) {
      console.log('[users/me API] No token - returning 401');
      return NextResponse.json({ error: 'Token required' }, { status: 401 });
    }

    // Call backend
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    console.log('[users/me API] Backend URL:', backendUrl);
    console.log('[users/me API] Calling backend at', `${backendUrl}/api/users/me`);
    
    const resp = await fetch(`${backendUrl}/api/users/me`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
    });

    console.log('[users/me API] Backend response status:', resp.status);
    
    if (!resp.ok) {
      const errorText = await resp.text();
      console.error('[users/me API] Backend error:', errorText);
      return NextResponse.json({ 
        error: 'Backend request failed', 
        details: errorText,
        status: resp.status 
      }, { status: resp.status });
    }
    
    const userData = await resp.json();
    console.log('[users/me API] User profile retrieved:', {
      user_id: userData.user_id,
      email: userData.email,
      has_managed_key: !!userData.managed_api_key,
      has_openrouter_key: !!userData.openrouter_api_key,
      has_glm_key: !!userData.glm_api_key,
    });
    
    return NextResponse.json(userData, { status: 200 });
  } catch (err) {
    console.error('[users/me API] Error:', err);
    console.error('[users/me API] Error message:', err instanceof Error ? err.message : 'Unknown error');
    console.error('[users/me API] Error stack:', err instanceof Error ? err.stack : 'No stack trace');
    return NextResponse.json({ 
      error: 'Failed to fetch user profile', 
      message: err instanceof Error ? err.message : 'Unknown error'
    }, { status: 500 });
  }
}
