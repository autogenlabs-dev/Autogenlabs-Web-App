'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter, useSearchParams } from 'next/navigation';
import AuthBackground from './AuthBackground';
import AuthLoadingState from './AuthLoadingState';
import AuthLoadingOverlay from './AuthLoadingOverlay';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import AuthStyles from './AuthStyles';

const AuthPage = () => {
    const searchParams = useSearchParams();
    const mode = searchParams.get('mode');
    const [isSignIn, setIsSignIn] = useState(mode !== 'signup');
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const { isAuthenticated, error: authError, clearError } = useAuth();
    const router = useRouter();

    // Update form mode based on URL parameter
    useEffect(() => {
        if (mode === 'signup') {
            setIsSignIn(false);
        } else {
            setIsSignIn(true);
        }
    }, [mode]);

    // Optimized input change handler with useCallback to prevent unnecessary re-renders
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Clear errors when user starts typing
        if (error) setError('');
        if (authError) clearError();
    }, [error, authError, clearError]);

    // Fix hydration issue with useEffect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Handle redirect for already authenticated users
    useEffect(() => {
        if (!isMounted) return;
        
        if (isAuthenticated) {
            let intendedUrl = null;
            if (typeof window !== 'undefined') {
                intendedUrl = localStorage.getItem('intendedUrl');
            }
            
            if (intendedUrl && intendedUrl !== '/auth') {
                if (typeof window !== 'undefined') {
                    localStorage.removeItem('intendedUrl');
                }
                router.push(intendedUrl);
            } else {
                router.push('/');
            }
        }
    }, [isAuthenticated, isMounted, router]);

    const validateForm = () => {
        if (!formData.email || !formData.password) {
            setError('Email and password are required');
            return false;
        }

        if (!isSignIn) {
            if (!formData.name) {
                setError('Name is required for signup');
                return false;
            }
            if (formData.password !== formData.confirmPassword) {
                setError('Passwords do not match');
                return false;
            }
            if (formData.password.length < 8) {
                setError('Password must be at least 8 characters long');
                return false;
            }
        }

        return true;
    };

    // Clerk handles the actual authentication, this is just for form validation
    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError('');
        
        // Form is valid, AuthForm will handle the Clerk authentication
    }, [formData, isSignIn, validateForm]);

    // Don't render animations until component is mounted on client
    if (!isMounted) {
        return <AuthLoadingState />;
    }

    // If user is already authenticated, show loading while redirecting
    if (isAuthenticated) {
        return <AuthLoadingState />;
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            {/* Full-screen loading overlay */}
            {isLoading && (
                <AuthLoadingOverlay 
                    message={isSignIn ? "Signing you in..." : "Creating your account..."}
                />
            )}
            
            <AuthBackground isMounted={isMounted} />

            {/* Auth Card with Enhanced Animations */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-sm transform hover:scale-[1.02] transition-all duration-500">
                    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 border border-white/20 relative z-30 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] transition-all duration-500 animate-fade-in-up before:content-[''] before:absolute before:inset-0 before:backdrop-blur-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-2xl before:-z-10">

                        <AuthHeader isSignIn={isSignIn} />

                        {/* Error Message */}
                        {(error || authError) && (
                            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/30 rounded-lg text-red-200 text-sm">
                                {error || authError}
                            </div>
                        )}

                        <AuthForm
                            isSignIn={isSignIn}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}                        />

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => {
                                    setIsSignIn(!isSignIn);
                                    setError('');
                                    if (authError) clearError();
                                }}
                                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-105"
                                disabled={isLoading}
                            >
                                {isSignIn ? "Don't have an account? Sign Up" : 'Already have an account? Sign In'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <AuthStyles />
        </div>
    );
};

export default AuthPage;

