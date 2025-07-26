'use client';
import React from 'react';

const AuthForm = ({
    isSignIn,
    formData,
    handleInputChange,
    handleSubmit,
    isLoading
}) => {
    return (
        <form onSubmit={handleSubmit} className="space-y-3">
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
            )}            <button
                type="submit"
                disabled={isLoading}
                className={`w-full text-white py-3 px-4 rounded-lg text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 flex items-center justify-center transform hover:shadow-lg group relative overflow-hidden ${
                    isLoading 
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 cursor-not-allowed' 
                        : 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 hover:scale-105'
                }`}
            >
                {isLoading ? (
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
