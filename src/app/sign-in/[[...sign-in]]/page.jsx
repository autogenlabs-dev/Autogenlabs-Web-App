'use client';

import { SignIn } from '@clerk/nextjs';
import { SignInSuccessHandler } from '../../../components/auth/SignInSuccessHandler';

export default function SignInPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SignIn
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
        }}
  routing="path"
  path="/sign-in"
  signUpUrl="/sign-up"
  fallbackRedirectUrl="/profile"
      />
      <SignInSuccessHandler />
    </div>
  );
}
