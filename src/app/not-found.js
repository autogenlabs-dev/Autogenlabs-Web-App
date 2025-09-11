import React from 'react';
import { FileQuestion, Home, Search } from 'lucide-react';
import Link from 'next/link';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 text-center px-6 max-w-lg mx-auto">
        <div className="space-y-8">
          {/* 404 Icon */}
          <div className="flex justify-center">
            <div
              className="w-24 h-24 rounded-3xl border border-white/20 flex items-center justify-center"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <FileQuestion size={48} className="text-purple-400" />
            </div>
          </div>

          {/* Error Message */}
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white">
              Page Not Found
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              The page you&apos;re looking for doesn&apos;t exist or may have been moved. 
              Let&apos;s get you back on track.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/">
              <button className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl font-semibold transition-all duration-300">
                <Home size={16} />
                Go Home
              </button>
            </Link>

            <Link href="/blogs">
              <button className="flex items-center gap-2 px-4 py-2 bg-white/5 hover:bg-white/10 border border-white/20 rounded-lg text-gray-300 hover:text-white transition-all duration-300 mx-auto">
                <Search size={16} />
                Browse Content
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;