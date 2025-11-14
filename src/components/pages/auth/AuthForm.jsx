'use client';
import React from 'react';
import { useSignIn, useSignUp } from '@clerk/nextjs';
import { useRouter } from 'next/navigation';

const AuthForm = ({
    isSignIn,
    formData,
    handleInputChange,
    handleSubmit,
    isLoading
}) => {
    const { signIn, isLoaded: signInLoaded } = useSignIn();
    const { signUp, isLoaded: signUpLoaded } = useSignUp();
    const router = useRouter();
    const [clerkLoading, setClerkLoading] = React.useState(false);

    const handleOAuthLogin = async (provider) => {
        try {
            setClerkLoading(true);
            console.log(`Clerk Debug - Initiating ${provider} OAuth login`);
            
            if (isSignIn && signInLoaded) {
                await signIn.authenticateWithRedirect({
                    strategy: provider === 'google' ? 'oauth_google' : 'oauth_github',
                    continueSignUpUrl: '/sso-callback',
                    fallbackRedirectUrl: '/dashboard'
                });
            } else if (signUpLoaded) {
                await signUp.authenticateWithRedirect({
                    strategy: provider === 'google' ? 'oauth_google' : 'oauth_github',
                    continueSignUpUrl: '/sso-callback',
                    fallbackRedirectUrl: '/dashboard'
                });
            }
        } catch (error) {
            console.error('Clerk OAuth error:', error);
            setClerkLoading(false);
        }
    };

    const handleEmailLogin = async (e) => {
        e.preventDefault();
        try {
            setClerkLoading(true);
            
            if (isSignIn && signInLoaded) {
                const result = await signIn.create({
                    identifier: formData.email,
                    password: formData.password
                });

                if (result.status === 'complete') {
                    router.push('/dashboard');
                }
            } else if (signUpLoaded) {
                const result = await signUp.create({
                    emailAddress: formData.email,
                    password: formData.password,
                    firstName: formData.name?.split(' ')[0] || '',
                    lastName: formData.name?.split(' ').slice(1).join(' ') || ''
                });

                if (result.status === 'complete') {
                    router.push('/dashboard');
                } else {
                    // Handle email verification if needed
                    await signUp.prepareEmailAddressVerification({ strategy: 'email_code' });
                    router.push('/verify-email');
                }
            }
        } catch (error) {
            console.error('Clerk email auth error:', error);
            setClerkLoading(false);
        }
    };

    const isClerkLoading = !signInLoaded || !signUpLoaded || clerkLoading;

    return (
        <form onSubmit={handleEmailLogin} className="space-y-3">
            {!isSignIn && (
                <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label htmlFor="name" className="block text-sm font-medium text-gray-200 mb-1">
                        Full Name
                    </label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 transition-all duration-300 backdrop-blur-xl text-sm hover:bg-white/10"
                        placeholder="Enter your full name"
                        required={!isSignIn}
                    />
                </div>
            )}

            <div className="transform transition-all duration-300 hover:translate-x-1">
                <label htmlFor="email" className="block text-sm font-medium text-gray-200 mb-1">
                    Email Address
                </label>
                <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 transition-all duration-300 backdrop-blur-xl text-sm hover:bg-white/10"
                    placeholder="Enter your email"
                    required
                />
            </div>

            <div className="transform transition-all duration-300 hover:translate-x-1">
                <label htmlFor="password" className="block text-sm font-medium text-gray-200 mb-1">
                    Password
                </label>
                <input
                    type="password"
                    id="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 transition-all duration-300 backdrop-blur-xl text-sm hover:bg-white/10"
                    placeholder="Enter your password"
                    required
                />
            </div>

            {!isSignIn && (
                <div className="transform transition-all duration-300 hover:translate-x-1">
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-200 mb-1">
                        Confirm Password
                    </label>
                    <input
                        type="password"
                        id="confirmPassword"
                        name="confirmPassword"
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full px-3 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-blue-400/50 focus:ring-2 focus:ring-blue-400/25 transition-all duration-300 backdrop-blur-xl text-sm hover:bg-white/10"
                        placeholder="Confirm your password"
                        required={!isSignIn}
                    />
                </div>
            )}

            {isSignIn && (
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center">
                        <input
                            id="remember-me"
                            name="remember-me"
                            type="checkbox"
                            className="h-3 w-3 text-blue-600 focus:ring-blue-500 border-white/20 rounded bg-white/10"
                        />
                        <label htmlFor="remember-me" className="ml-2 text-gray-300">
                            Remember me
                        </label>
                    </div>
                    <button
                        type="button"
                        className="text-blue-400 hover:text-blue-300 transition-colors"
                    >
                        Forgot password?
                    </button>
                </div>
            )}
            
            {/* OAuth Provider Buttons */}
            <div className="space-y-3 mb-6">
                <div className="text-center text-gray-300 text-sm mb-4">Or continue with</div>
                
                {/* Google OAuth Button */}
                <button
                    type="button"
                    onClick={() => handleOAuthLogin('google')}
                    disabled={isLoading || isClerkLoading}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                    </svg>
                    {isSignIn ? 'Sign in with Google' : 'Continue with Google'}
                </button>
                
                {/* GitHub OAuth Button */}
                <button
                    type="button"
                    onClick={() => handleOAuthLogin('github')}
                    disabled={isLoading || isClerkLoading}
                    className="w-full flex items-center justify-center px-4 py-3 border border-gray-300 rounded-lg shadow-sm text-sm font-medium bg-gray-800 hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                    </svg>
                    {isSignIn ? 'Sign in with GitHub' : 'Continue with GitHub'}
                </button>
            </div>
            
            <button
                type="submit"
                disabled={isLoading || isClerkLoading}
                className={`w-full text-white py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 flex items-center justify-center transform hover:shadow-lg group relative overflow-hidden ${
                    (isLoading || isClerkLoading)
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 cursor-not-allowed'
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                }`}
            >
                {(isLoading || isClerkLoading) ? (
                    <div className="flex items-center space-x-3">
                        {/* Animated spinner */}
                        <div className="relative">
                            <div className="w-5 h-5 border-2 border-white/30 rounded-full"></div>
                            <div className="absolute top-0 left-0 w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        </div>
                        
                        {/* Loading text with typing animation */}
                        <div className="flex items-center">
                            <span className="animate-pulse">
                                {isSignIn ? 'Signing you in' : 'Creating your account'}
                            </span>
                            <span className="ml-1 flex">
                                <span className="animate-bounce" style={{animationDelay: '0ms'}}>.</span>
                                <span className="animate-bounce" style={{animationDelay: '150ms'}}>.</span>
                                <span className="animate-bounce" style={{animationDelay: '300ms'}}>.</span>
                            </span>
                        </div>
                    </div>
                ) : (
                    <>
                        {/* Background shimmer effect on hover */}
                        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
                        
                        {/* Button text */}
                        <span className="group-hover:translate-x-1 transition-transform duration-300 relative z-10">
                            {isSignIn ? '🔐 Sign In' : '✨ Create Account'}
                        </span>
                    </>
                )}
            </button>
        </form>
    );
};

export default AuthForm;
