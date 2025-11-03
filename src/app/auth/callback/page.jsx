'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Move hook to component level
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    // Ensure we're on client side before processing
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Only run on client side after hydration
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      // Get URL parameters using the hook at component level
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const userId = searchParams.get('user_id');
      const callbackError = searchParams.get('error');
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      // Add comprehensive debugging
      console.log('🔍 DEBUG: Full URL:', window.location.href);
      console.log('🔍 DEBUG: All URL parameters:', {
        access_token: searchParams.get('access_token'),
        refresh_token: searchParams.get('refresh_token'),
        user_id: searchParams.get('user_id'),
        error: searchParams.get('error'),
        code: searchParams.get('code'),
        state: searchParams.get('state')
      });
      console.log('Callback params:', { accessToken, refreshToken, userId, error: callbackError, code, state });
      
      // Check if we have the expected parameters from backend OAuth flow
      if (!accessToken && !refreshToken && !callbackError && !code) {
        console.error('🔍 DEBUG: No expected OAuth parameters found in URL');
        console.error('🔍 DEBUG: This suggests the OAuth flow is not working correctly');
        setError('no_oauth_params');
        router.push('/auth?error=no_oauth_params');
        return;
      }

      if (callbackError) {
        console.error('OAuth callback error:', callbackError);
        if (callbackError === 'use_backend_oauth') {
          // This indicates backend OAuth flow should be used
          router.push('/auth?info=Please use OAuth login buttons');
        } else {
          router.push('/auth?error=' + callbackError);
        }
        return;
      }

      if (accessToken && refreshToken) {
        // Store tokens in localStorage
        localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token', accessToken);
        localStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token', refreshToken);
        
        console.log('Backend tokens stored, redirecting to dashboard...');
        
        // Redirect to dashboard or home page
        router.push('/dashboard');
      } else if (code) {
        // We have an authorization code, need to exchange it for tokens
        console.log('Received authorization code, exchanging for tokens...');
        
        // Exchange code for tokens immediately
        const exchangeCodeForTokens = async () => {
          try {
            console.log('Exchanging code for tokens...');
            
            // Call backend to exchange code for tokens
            const response = await fetch('/api/auth/exchange-code', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                code,
                state,
                provider: 'google' // Default to google, could be extracted from URL or stored
              })
            });
            
            if (!response.ok) {
              throw new Error('Failed to exchange code for tokens');
            }
            
            const data = await response.json();
            
            if (data.redirect_url) {
              // Redirect to the URL with tokens
              window.location.href = data.redirect_url;
            } else {
              throw new Error('No redirect URL received');
            }
          } catch (error) {
            console.error('Error exchanging code for tokens:', error);
            setError('token_exchange_failed');
            router.push('/auth?error=token_exchange_failed');
          }
        };
        
        exchangeCodeForTokens();
      } else {
        // Missing required parameters
        console.error('Missing tokens or authorization code:', { accessToken, refreshToken, userId, code });
        setError('missing_tokens');
        router.push('/auth?error=missing_tokens');
      }
    } catch (err) {
      console.error('Error processing OAuth callback:', err);
      setError('callback_error');
      router.push('/auth?error=callback_error');
    }
  }, [router, searchParams, isClient]);

  // Show loading state during hydration
  if (!isClient) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Initializing...</p>
        </div>
      </div>
    );
  }

  // Show error state if there is one
  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-red-900 via-red-800 to-pink-900">
        <div className="text-center">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-8 max-w-md">
            <div className="text-red-600 mb-4">⚠️ Authentication Error</div>
            <p className="text-white text-lg mb-4">{error}</p>
            <button
              onClick={() => router.push('/auth')}
              className="px-6 py-3 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
            >
              Back to Login
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
        <p className="text-white text-lg">Completing authentication...</p>
      </div>
    </div>
  );
}

export default function AuthCallback() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    }>
      <AuthCallbackContent />
    </Suspense>
  );
}
