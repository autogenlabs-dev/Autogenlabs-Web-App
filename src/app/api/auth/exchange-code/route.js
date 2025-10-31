import { NextRequest, NextResponse } from 'next/server';

/**
 * Exchange Authorization Code for Tokens
 * Handles the exchange of OAuth authorization codes for access tokens
 */
export async function POST(request) {
  try {
    const body = await request.json();
    const { code, state, provider } = body;
    
    if (!code) {
      return NextResponse.json(
        { error: 'Missing authorization code' },
        { status: 400 }
      );
    }
    
    // Forward to backend for token exchange
    const backendUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
    const backendExchangeUrl = `${backendUrl}/api/auth/${provider}/callback?code=${code}&state=${state}`;
    
    console.log('Exchanging code with backend:', backendExchangeUrl);
    
    // Make request to backend to exchange code for tokens
    const response = await fetch(backendExchangeUrl);
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error('Backend token exchange failed:', errorText);
      return NextResponse.json(
        { error: 'Backend token exchange failed', details: errorText },
        { status: 500 }
      );
    }
    
    // Backend will return JSON with redirect_url and tokens
    const data = await response.json();
    
    return NextResponse.json(data);
    
  } catch (error) {
    console.error('Code exchange error:', error);
    return NextResponse.json(
      { error: 'Internal server error', details: error.message },
      { status: 500 }
    );
  }
}