'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function AuthCallback() {
  const router = useRouter();
  const [error, setError] = useState(null);
  
  useEffect(() => {
    // Only run on client side
    if (typeof window === 'undefined') return;
    
    try {
      // Get URL parameters using Next.js useSearchParams hook
      const searchParams = useSearchParams();
      const accessToken = searchParams.get('access_token');
      const refreshToken = searchParams.get('refresh_token');
      const userId = searchParams.get('user_id');
      const callbackError = searchParams.get('error');

      console.log('Callback params:', { accessToken, refreshToken, userId, error: callbackError });

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
      } else {
        // Missing required parameters
        console.error('Missing tokens:', { accessToken, refreshToken, userId });
        setError('missing_tokens');
        router.push('/auth?error=missing_tokens');
      }
    } catch (err) {
      console.error('Error processing OAuth callback:', err);
      setError('callback_error');
      router.push('/auth?error=callback_error');
    }
  }, [router]);

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
