'use client';
import { useEffect, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const { login } = useAuth();

  useEffect(() => {
    let accessToken, refreshToken, userId, error;
    
    // Wrap searchParams access in try-catch to handle potential errors
    try {
      const searchParams = useSearchParams();
      accessToken = searchParams.get('access_token');
      refreshToken = searchParams.get('refresh_token');
      userId = searchParams.get('user_id');
      error = searchParams.get('error');
    } catch (e) {
      console.error('Error accessing search params:', e);
      router.push('/auth?error=search_params_error');
      return;
    }

    if (error) {
      console.error('OAuth callback error:', error);
      router.push('/auth?error=' + error);
      return;
    }

    if (accessToken && refreshToken && userId) {
      // Store tokens in localStorage
      localStorage.setItem(process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY || 'access_token', accessToken);
      localStorage.setItem(process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY || 'refresh_token', refreshToken);
      
      // Redirect to dashboard or home page
      router.push('/dashboard');
    } else {
      // Missing required parameters
      router.push('/auth?error=missing_tokens');
    }
  }, [router, searchParams, login]);

  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Loading...</p>
        </div>
      </div>
    }>
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-900 via-purple-900 to-pink-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Completing authentication...</p>
        </div>
      </div>
    </Suspense>
  );
}