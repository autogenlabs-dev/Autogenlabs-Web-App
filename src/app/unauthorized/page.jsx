'use client';
import React from 'react';
import { Shield, ArrowLeft, Home } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../contexts/AuthContext';

const UnauthorizedPage = () => {
    const router = useRouter();
    const { user } = useAuth();

    const handleGoBack = () => {
        router.back();
    };

    const handleGoHome = () => {
        router.push('/');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl overflow-hidden">
                    <div className="bg-gradient-to-r from-red-600 to-orange-600 px-6 py-8 text-center">
                        <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30 mx-auto mb-4">
                            <Shield className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2">
                            Access Denied
                        </h1>
                        <p className="text-red-100">
                            You don&apos;t have permission to access this page
                        </p>
                    </div>
                    
                    <div className="px-6 py-8 text-center">
                        <div className="mb-6">
                            <h2 className="text-xl font-semibold text-white mb-2">
                                Insufficient Permissions
                            </h2>
                            <p className="text-gray-300 mb-4">
                                This page requires special permissions that your account doesn&apos;t have.
                            </p>
                            
                            {user && (
                                <div className="bg-white/5 rounded-lg p-4 border border-white/10 mb-4">
                                    <p className="text-sm text-gray-400">
                                        Current role: <span className="text-white font-medium">{user.role || 'user'}</span>
                                    </p>
                                </div>
                            )}
                            
                            <div className="text-sm text-gray-400">
                                <p>If you believe this is an error, please contact support.</p>
                            </div>
                        </div>
                        
                        <div className="flex flex-col sm:flex-row gap-3">
                            <button
                                onClick={handleGoBack}
                                className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <ArrowLeft className="w-4 h-4 mr-2" />
                                Go Back
                            </button>
                            <button
                                onClick={handleGoHome}
                                className="flex-1 bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition-colors flex items-center justify-center"
                            >
                                <Home className="w-4 h-4 mr-2" />
                                Home
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UnauthorizedPage;

