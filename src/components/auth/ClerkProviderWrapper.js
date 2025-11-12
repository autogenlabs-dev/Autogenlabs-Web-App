'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderWrapper({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined,
        variables: {
          colorPrimary: '#000000',
        },
      }}
      afterSignInUrl="/profile"
      afterSignUpUrl="/profile"
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
    >
      {children}
    </ClerkProvider>
  );
}
