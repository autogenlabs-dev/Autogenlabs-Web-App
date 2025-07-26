'use client';
import React from 'react';

const AuthLoadingState = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Static background during SSR */}
            <div className="fixed inset-0 z-10 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-purple-900/40"></div>
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="text-center">
                    <div className="relative w-16 h-16 mx-auto mb-6">
                        <div className="absolute inset-0 rounded-full border-4 border-blue-200/20"></div>
                        <div className="absolute inset-0 rounded-full border-4 border-blue-500 border-t-transparent animate-spin"></div>
                    </div>
                    <div className="space-y-2">
                        <p className="text-xl font-semibold text-white">Loading Authentication</p>
                        <p className="text-gray-400">Please wait a moment...</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLoadingState;
