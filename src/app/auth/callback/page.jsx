'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Move hook to component level
  const { login } = useAuth(); // Import login function from AuthContext
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('loading'); // Add status for better UX
  
  useEffect(() => {
    // Ensure we're on client side before processing
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Only run on client side after hydration
    if (!isClient || typeof window === 'undefined') return;
    
    try {
      // Get URL parameters using hook at component level
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const userId = searchParams.get('user_id');
      const callbackError = searchParams.get('error');
      const code = searchParams.get('code');
      const state = searchParams.get('state');

      // Add comprehensive debugging
      console.log('🔍 OAuth Callback Debug - Full URL:', window.location.href);
      console.log('🔍 OAuth Callback Debug - All URL parameters:', {
        access_token: searchParams.get('access_token'),
        refresh_token: searchParams.get('refresh_token'),
        user_id: searchParams.get('user_id'),
        error: searchParams.get('error'),
        code: searchParams.get('code'),
        state: searchParams.get('state')
      });
      console.log('🔍 OAuth Callback Debug - Processed params:', { 
        accessToken: accessToken ? '***' : null, 
        refreshToken: refreshToken ? '***' : null, 
        userId, 
        error: callbackError, 
        code: code ? '***' : null, 
        state 
      });
      
      // Check if we have the expected parameters from backend OAuth flow
      if (!accessToken && !refreshToken && !callbackError && !code) {
        console.error('❌ OAuth Callback Error: No expected OAuth parameters found in URL');
        console.error('❌ OAuth Callback Error: This suggests the OAuth flow is not working correctly');
        setStatus('error');
        setError('no_oauth_params');
        
        // Delay redirect to show error message
        setTimeout(() => {
          router.push('/auth?error=no_oauth_params');
        }, 3000);
        return;
      }

      if (callbackError) {
        console.error('❌ OAuth Callback Error:', callbackError);
        setStatus('error');
        setError(callbackError);
        
        // Show error message before redirecting
        setTimeout(() => {
          if (callbackError === 'use_backend_oauth') {
            // This indicates backend OAuth flow should be used
            router.push('/auth?info=Please use OAuth login buttons');
          } else {
            router.push('/auth?error=' + callbackError);
          }
        }, 3000);
        return;
      }

      if (accessToken && refreshToken) {
        try {
          setStatus('success');
          
          // Use AuthContext login method for proper state management
          login({
            id: userId,
            accessToken,
            refreshToken
          });
          
          console.log('✅ OAuth Callback Success: AuthContext updated successfully');
          
          // Check for intended redirect URL
          const intendedUrl = localStorage.getItem('intendedUrl');
          if (intendedUrl) {
            localStorage.removeItem('intendedUrl');
            console.log('🔍 OAuth Callback Debug: Redirecting to intended URL:', intendedUrl);
            
            setTimeout(() => {
              router.push(intendedUrl);
            }, 1500);
          } else {
            console.log('🔍 OAuth Callback Debug: Redirecting to dashboard');
            
            setTimeout(() => {
              router.push('/dashboard');
            }, 1500);
          }
        } catch (error) {
          console.error('❌ OAuth Callback Error: Failed to store tokens or update auth context:', error);
          setStatus('error');
          setError('token_storage_failed');
          
          setTimeout(() => {
            router.push('/auth?error=token_storage_failed');
          }, 3000);
        }
      } else if (code) {
        // We have an authorization code, need to exchange it for tokens
        console.log('🔍 OAuth Callback Debug: Received authorization code, exchanging for tokens...');
        setStatus('processing');
        
        // Exchange code for tokens immediately
        const exchangeCodeForTokens = async () => {
          try {
            console.log('🔍 OAuth Callback Debug: Exchanging code for tokens...');
            
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
            
            console.log('🔍 OAuth Callback Debug: Exchange response status:', response.status);
            
            if (!response.ok) {
              const errorText = await response.text();
              console.error('❌ OAuth Callback Error: Token exchange failed:', errorText);
              throw new Error(`Failed to exchange code for tokens: ${errorText}`);
            }
            
            const data = await response.json();
            console.log('🔍 OAuth Callback Debug: Exchange response data:', data);
            
            if (data.redirect_url) {
              // Redirect to the URL with tokens
              console.log('🔍 OAuth Callback Debug: Redirecting to:', data.redirect_url);
              window.location.href = data.redirect_url;
            } else {
              throw new Error('No redirect URL received from token exchange');
            }
          } catch (error) {
            console.error('❌ OAuth Callback Error: Error exchanging code for tokens:', error);
            setStatus('error');
            setError('token_exchange_failed');
            
            // Show error message before redirecting
            setTimeout(() => {
              router.push('/auth?error=token_exchange_failed');
            }, 3000);
          }
        };
        
        exchangeCodeForTokens();
      } else {
        // Missing required parameters
        console.error('❌ OAuth Callback Error: Missing tokens or authorization code:', { accessToken, refreshToken, userId, code });
        setStatus('error');
        setError('missing_tokens');
        
        // Show error message before redirecting
        setTimeout(() => {
          router.push('/auth?error=missing_tokens');
        }, 3000);
      }
    } catch (err) {
      console.error('❌ OAuth Callback Error: Error processing OAuth callback:', err);
      setStatus('error');
      setError('callback_error');
      
      setTimeout(() => {
        router.push('/auth?error=callback_error');
      }, 3000);
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

  // Show status-based UI
  const getStatusIcon = () => {
    switch (status) {
      case 'success':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
          </svg>
        );
      case 'error':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        );
      case 'processing':
        return (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        );
      default:
        return (
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        );
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case 'success':
        return 'Authentication Successful!';
      case 'error':
        return 'Authentication Failed';
      case 'processing':
        return 'Processing Authentication...';
      default:
        return 'Completing authentication...';
    }
  };

  const getStatusDescription = () => {
    switch (status) {
      case 'success':
        return 'Redirecting you to your dashboard...';
      case 'error':
        return error || 'An error occurred during authentication';
      case 'processing':
        return 'Exchanging authorization code for tokens...';
      default:
        return 'Please wait while we complete your authentication...';
    }
  };

  const getStatusColor = () => {
    switch (status) {
      case 'success':
        return 'from-green-900 via-green-800 to-emerald-900';
      case 'error':
        return 'from-red-900 via-red-800 to-pink-900';
      case 'processing':
        return 'from-yellow-900 via-orange-800 to-amber-900';
      default:
        return 'from-blue-900 via-purple-900 to-pink-900';
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center bg-gradient-to-br ${getStatusColor()}`}>
      <div className="text-center">
        <div className="max-w-md w-full space-y-8 p-8 bg-white/10 backdrop-blur-sm rounded-lg shadow-xl">
          <div className="mb-8">
            <div className={`mx-auto h-12 w-12 rounded-full flex items-center justify-center ${
              status === 'success' ? 'bg-green-600' : 
              status === 'error' ? 'bg-red-600' : 
              status === 'processing' ? 'bg-yellow-600' : 'bg-blue-600'
            }`}>
              {getStatusIcon()}
            </div>
          </div>
          
          <h2 className={`text-2xl font-bold mb-4 ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 
            status === 'processing' ? 'text-yellow-600' : 'text-gray-900'
          }`}>
            {getStatusMessage()}
          </h2>
          
          <p className={`text-center mb-8 ${
            status === 'success' ? 'text-green-600' : 
            status === 'error' ? 'text-red-600' : 
            status === 'processing' ? 'text-yellow-600' : 'text-gray-600'
          }`}>
            {getStatusDescription()}
          </p>
          
          {status === 'error' && (
            <button
              onClick={() => router.push('/auth')}
              className="w-full text-center py-2 px-4 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-300"
            >
              Back to Login
            </button>
          )}
        </div>
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
