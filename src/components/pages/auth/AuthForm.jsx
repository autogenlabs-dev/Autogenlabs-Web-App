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
                className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-2 px-4 rounded-lg text-sm font-medium hover:from-blue-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all duration-500 disabled:opacity-50 flex items-center justify-center transform hover:scale-105 hover:shadow-lg group"
            >
                {isLoading ? (
                    <div className="flex items-center">
                        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                        </svg>
                        {isSignIn ? 'Signing In...' : 'Creating Account...'}
                    </div>
                ) : (
                    <span className="group-hover:translate-x-1 transition-transform duration-300">
                        {isSignIn ? 'Sign In' : 'Create Account'}
                    </span>
                )}
            </button>
        </form>
    );
};

export default AuthForm;
