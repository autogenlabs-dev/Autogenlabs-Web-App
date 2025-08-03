'use client';
import React, { useState, useEffect, useCallback } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import AuthBackground from './AuthBackground';
import AuthLoadingState from './AuthLoadingState';
import AuthLoadingOverlay from './AuthLoadingOverlay';
import AuthHeader from './AuthHeader';
import AuthForm from './AuthForm';
import AuthStyles from './AuthStyles';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [error, setError] = useState('');
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    const { login, signup, isAuthenticated, error: authError, clearError } = useAuth();
    const router = useRouter();

    // Note: Redirect logic is handled by AuthGuard component
    // No need for redirect logic here to avoid race conditions

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

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        
        // Prevent multiple submissions
        if (isLoading) {
            return;
        }
        
        if (!validateForm()) {
            return;
        }

        setIsLoading(true);
        setError('');

        try {
            
            if (isSignIn) {
                const result = await login({
                    email: formData.email,
                    password: formData.password
                });
                
                // Show success state briefly before redirect
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Handle redirect after successful login
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
            } else {
                const result = await signup({
                    email: formData.email,
                    password: formData.password,
                    name: formData.name
                });
                
                // Show success state briefly before redirect
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Keep loading state during redirect
                // The finally block will not run as we're redirecting
                
                // Handle redirect after successful signup
                router.push('/');
            }
            // Success - redirect handled above
        } catch (error) {
            console.error('❌ Form submission error:', error);
            setError(error.message || (isSignIn ? 'Login failed' : 'Signup failed'));
        } finally {
            // Only set loading to false if we're not redirecting (i.e., there was an error)
            if (!isLoading) return; // Already set to false in catch block
            setIsLoading(false);
        }
    }, [formData, isSignIn, login, signup, isLoading, validateForm, router]);

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
