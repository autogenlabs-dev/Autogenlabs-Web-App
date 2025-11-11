'use client';

import { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '../../../contexts/AuthContext';
import { useAuth0 } from '@auth0/auth0-react';

function AuthCallbackContent() {
  const router = useRouter();
  const searchParams = useSearchParams(); // Move hook to component level
  const { login } = useAuth(); // Import login function from AuthContext
  const { handleRedirectCallback } = useAuth0(); // Auth0 redirect handler
  const [error, setError] = useState(null);
  const [isClient, setIsClient] = useState(false);
  const [status, setStatus] = useState('loading'); // Add status for better UX
  
  useEffect(() => {
    // Ensure we're on client side before processing
    setIsClient(true);
  }, []);
  
  useEffect(() => {
    // Only run on client side after hydration
    if (!isClient) return;
    
    // Handle Auth0 redirect callback
    const handleAuth0Callback = async () => {
      try {
        setStatus('processing');
        
        console.log('🔍 Auth0 Callback Debug: Processing Auth0 redirect...');
        
        // Let Auth0 handle the redirect
        await handleRedirectCallback();
        
        setStatus('success');
        console.log('✅ Auth0 Callback Success: Authentication completed');
        
        // Check for intended redirect URL
        const intendedUrl = localStorage.getItem('intendedUrl');
        if (intendedUrl) {
          localStorage.removeItem('intendedUrl');
          console.log('🔍 Auth0 Callback Debug: Redirecting to intended URL:', intendedUrl);
          
          setTimeout(() => {
            router.push(intendedUrl);
          }, 1500);
        } else {
          console.log('🔍 Auth0 Callback Debug: Redirecting to dashboard');
          
          setTimeout(() => {
            router.push('/dashboard');
          }, 1500);
        }
      } catch (error) {
        console.error('❌ Auth0 Callback Error:', error);
        setStatus('error');
        setError('auth0_callback_failed');
        
        setTimeout(() => {
          router.push('/auth?error=auth0_callback_failed');
        }, 3000);
      }
    };

    handleAuth0Callback();
  }, [router, isClient, handleRedirectCallback]);

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
