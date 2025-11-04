import { NextRequest, NextResponse } from 'next/server';

/**
 * Exchange Authorization Code for Tokens
 * Handles the exchange of OAuth authorization codes for access tokens
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { code, state, provider } = body;
    
    console.log('🔍 Exchange Code Debug - Request body:', {
      code: code ? '***' : null,
      state,
      provider
    });
    
    if (!code) {
      console.error('❌ Exchange Code Error: Missing authorization code');
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }
    
    // Forward to backend for token exchange
    // Use Vercel environment variables if available, fallback to defaults
    const backendUrl = process.env.NEXT_PUBLIC_API_URL ||
                       process.env.VERCEL_API_URL ||
                       'http://localhost:8000';
    
    // Backend always uses /auth (not /api/auth) based on backend code analysis
    const backendPath = `/auth/${provider}/callback`;
    const backendExchangeUrl = `${backendUrl}${backendPath}?code=${code}&state=${state}`;
    
    console.log('🔍 Exchange Code Debug - Configuration:', {
      backendUrl,
      isProduction,
      backendPath,
      backendExchangeUrl,
      provider
    });
    
    // Make request to backend to exchange code for tokens
    console.log('🔍 Exchange Code Debug: Making request to backend...');
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const response = await fetch(backendExchangeUrl, {
      signal: controller.signal
    });
    
    clearTimeout(timeoutId);
    
    console.log('🔍 Exchange Code Debug - Backend response:', {
      status: response.status,
      ok: response.ok,
      headers: Object.fromEntries(response.headers.entries())
    });
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Exchange Code Error: Backend token exchange failed:', errorText);
      return NextResponse.json(
        { error: 'Backend token exchange failed', details: errorText },
        { status: 500 }
      );
    }
    
    // Backend will return JSON with redirect_url and tokens
    const data = await response.json();
    console.log('🔍 Exchange Code Debug - Backend response data:', {
      hasRedirectUrl: !!data.redirect_url,
      hasTokens: !!(data.access_token && data.refresh_token),
      dataType: typeof data
    });
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Code exchange error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}