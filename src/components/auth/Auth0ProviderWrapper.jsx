'use client';
import { Auth0Provider } from '@auth0/auth0-react';

const Auth0ProviderWrapper = ({ children }) => {
  // Check if Auth0 is properly configured
  const domain = process.env.NEXT_PUBLIC_AUTH0_DOMAIN;
  const clientId = process.env.NEXT_PUBLIC_AUTH0_CLIENT_ID;
  const callbackUrl = process.env.NEXT_PUBLIC_AUTH0_CALLBACK_URL;
  const audience = process.env.NEXT_PUBLIC_AUTH0_AUDIENCE;

  // If Auth0 is not configured, render children without Auth0 provider
  if (!domain || !clientId ||
      domain.includes('YOUR_DOMAIN') ||
      clientId.includes('YOUR_AUTH0_CLIENT_ID') ||
      domain === 'YOUR_DOMAIN.auth0.com' ||
      clientId === 'YOUR_AUTH0_CLIENT_ID') {
    console.warn('⚠️ Auth0 is not properly configured. Please check your environment variables.');
    return <>{children}</>;
  }

  return (
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      authorizationParams={{
        redirect_uri: callbackUrl || 'http://localhost:3000/auth/callback',
        audience: audience
      }}
    >
      {children}
    </Auth0Provider>
  );
};

export default Auth0ProviderWrapper;