'use client';
import React, { useState, useEffect, useCallback } from 'react';
import AuthBackground from './AuthBackground';
import AuthLoadingState from './AuthLoadingState';
import AuthHeader from './AuthHeader';
import AuthSocialButtons from './AuthSocialButtons';
import AuthForm from './AuthForm';
import AuthStyles from './AuthStyles';

const AuthPage = () => {
    const [isSignIn, setIsSignIn] = useState(true);
    const [isLoading, setIsLoading] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        name: ''
    });

    // Optimized input change handler with useCallback to prevent unnecessary re-renders
    const handleInputChange = useCallback((e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    }, []);

    // Fix hydration issue with useEffect
    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSubmit = useCallback(async (e) => {
        e.preventDefault();
        setIsLoading(true);

        // Simulate API call
        setTimeout(() => {
            console.log('Form submitted:', formData);
            setIsLoading(false);
            alert(isSignIn ? 'Sign in successful!' : 'Account created successfully!');
        }, 1500);
    }, [formData, isSignIn]);

    const handleGoogleAuth = useCallback(async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('Google authentication clicked');
            setIsLoading(false);
        }, 1000);
    }, []);

    const handleGitHubAuth = useCallback(async () => {
        setIsLoading(true);
        setTimeout(() => {
            console.log('GitHub authentication clicked');
            setIsLoading(false);
        }, 1000);
    }, []);

    // Don't render animations until component is mounted on client
    if (!isMounted) {
        return <AuthLoadingState />;
    }

    return (
        <div className="relative min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 overflow-hidden">
            <AuthBackground isMounted={isMounted} />

            {/* Auth Card with Enhanced Animations */}
            <div className="relative z-20 flex items-center justify-center min-h-screen px-4 py-8">
                <div className="w-full max-w-sm transform hover:scale-[1.02] transition-all duration-500">
                    <div className="bg-slate-900/40 backdrop-blur-2xl rounded-2xl shadow-[0_8px_32px_0_rgba(31,38,135,0.37)] p-8 border border-white/20 relative z-30 hover:shadow-[0_8px_32px_0_rgba(31,38,135,0.6)] transition-all duration-500 animate-fade-in-up before:content-[''] before:absolute before:inset-0 before:backdrop-blur-xl before:bg-gradient-to-br before:from-white/10 before:to-transparent before:rounded-2xl before:-z-10">

                        <AuthHeader isSignIn={isSignIn} />

                        <AuthSocialButtons
                            handleGoogleAuth={handleGoogleAuth}
                            handleGitHubAuth={handleGitHubAuth}
                            isLoading={isLoading}
                        />

                        {/* Divider */}
                        <div className="relative mb-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-white/20"></div>
                            </div>
                            <div className="relative flex justify-center text-xs">
                                <span className="px-3 bg-white/10 text-gray-300 backdrop-blur-sm rounded-full">Or continue with email</span>
                            </div>
                        </div>

                        <AuthForm
                            isSignIn={isSignIn}
                            formData={formData}
                            handleInputChange={handleInputChange}
                            handleSubmit={handleSubmit}
                            isLoading={isLoading}
                        />

                        <div className="text-center mt-4">
                            <button
                                type="button"
                                onClick={() => setIsSignIn(!isSignIn)}
                                className="text-sm text-gray-300 hover:text-white transition-colors duration-300 transform hover:scale-105"
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
