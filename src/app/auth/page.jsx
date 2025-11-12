'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function Auth() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to Clerk sign-in page
    router.replace('/sign-in');
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white">Redirecting to sign in...</p>
      </div>
    </div>
  );
}
