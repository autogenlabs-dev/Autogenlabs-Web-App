"use client";

import { ClerkProvider } from '@clerk/nextjs';
import { useEffect } from 'react';
import VerifyOnLoad from './VerifyOnLoad';

export default function ClerkProviderWrapper({ children }) {
  useEffect(() => {
    // Check if Clerk keys are available
    const publishableKey = process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY;
    if (!publishableKey) {
      console.error('❌ NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY is not set!');
    } else {
      console.log('✅ Clerk Provider initialized');
      console.log('📍 Environment:', process.env.NODE_ENV);
      console.log('🔑 Key type:', publishableKey.startsWith('pk_live_') ? 'Production' : 'Development');
    }
  }, []);



  return (
    <ClerkProvider
      publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY}
      domain={process.env.NEXT_PUBLIC_CLERK_FRONTEND_API || 'clerk.accounts.dev'}
      isSatellite={false}
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#9333ea',
        },
      }}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'}
      signInFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL || '/dashboard'}
      signUpFallbackRedirectUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL || '/profile'}
    >
      <VerifyOnLoad />
      {children}
    </ClerkProvider>
  );
}
