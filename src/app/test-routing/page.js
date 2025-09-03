'use client';
import { useEffect } from 'react';

export default function TestRoutingPage() {
  useEffect(() => {
    console.log('🎉 Test Routing Page loaded successfully!');
  }, []);

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">🎉 Routing Works!</h1>
        <p className="text-gray-300">This page proves that Next.js routing is working correctly.</p>
        <p className="text-gray-400 mt-2">Check the console for logs.</p>
      </div>
    </div>
  );
}

