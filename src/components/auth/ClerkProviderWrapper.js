'use client';

import { ClerkProvider } from '@clerk/nextjs';
import { useEffect } from 'react';

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
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#9333ea',
        },
      }}
      signInUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_IN_URL || '/sign-in'}
      signUpUrl={process.env.NEXT_PUBLIC_CLERK_SIGN_UP_URL || '/sign-up'}
      afterSignInUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_IN_URL || '/dashboard'}
      afterSignUpUrl={process.env.NEXT_PUBLIC_CLERK_AFTER_SIGN_UP_URL || '/dashboard'}
    >
      {children}
    </ClerkProvider>
  );
}
