'use client';

import { SignUp } from '@clerk/nextjs';
import { SignInSuccessHandler } from '../../../components/auth/SignInSuccessHandler';

export default function SignUpPage() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <SignUp
        appearance={{
          elements: {
            rootBox: "mx-auto",
            card: "shadow-xl",
          },
        }}
        routing="path"
        path="/sign-up"
        signInUrl="/sign-in"
        fallbackRedirectUrl="/profile"
      />
      <SignInSuccessHandler />
    </div>
  );
}

