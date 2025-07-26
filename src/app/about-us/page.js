'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function AboutUsRedirect() {
  const router = useRouter();

  useEffect(() => {
    router.replace('/company/about');
  }, [router]);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white flex items-center justify-center">
      <div className="text-center">
        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto mb-4">
          <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
        </div>
        <p className="text-gray-400">Redirecting to About page...</p>
      </div>
    </div>
  );
}
