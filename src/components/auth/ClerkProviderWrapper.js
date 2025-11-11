'use client';

import { ClerkProvider } from '@clerk/nextjs';

export default function ClerkProviderWrapper({ children }) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: undefined, // You can add a theme later
        variables: {
          colorPrimary: '#000000',
        },
      }}
    >
      {children}
    </ClerkProvider>
  );
}
