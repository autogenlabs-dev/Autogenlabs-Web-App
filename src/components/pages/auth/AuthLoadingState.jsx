'use client';
import React from 'react';

const AuthLoadingState = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Static background during SSR */}
            <div className="fixed inset-0 z-10 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-purple-900/40"></div>
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-sm">
                    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 border border-white/20">
                        <div className="animate-pulse">
                            <div className="h-6 bg-slate-700 rounded w-3/4 mx-auto mb-4"></div>
                            <div className="h-4 bg-slate-700 rounded w-1/2 mx-auto mb-8"></div>
                            <div className="space-y-4">
                                <div className="h-10 bg-slate-700 rounded"></div>
                                <div className="h-10 bg-slate-700 rounded"></div>
                                <div className="h-10 bg-slate-700 rounded"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AuthLoadingState;
