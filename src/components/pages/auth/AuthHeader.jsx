'use client';
import React from 'react';

const AuthHeader = ({ isSignIn }) => {
    return (
        <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center transform hover:scale-110 transition-all duration-500 animate-float relative">
                <svg width="56" height="56" viewBox="0 0 40 40">
                  <circle cx="20" cy="8" r="4" fill="#fff" />
                  <circle cx="8" cy="20" r="4" fill="#fff" />
                  <circle cx="20" cy="32" r="4" fill="#fff" />
                  <circle cx="32" cy="20" r="4" fill="#fff" />
                </svg>
            </div>
            <h1 className="text-xl font-bold text-white mb-1 animate-fade-in">
                {isSignIn ? 'Welcome Back!' : 'Join CodeMurf'}
            </h1>
            <p className="text-gray-300 text-xs animate-fade-in-delayed">
                {isSignIn ? 'Sign in to your dashboard' : 'Create your account'}
            </p>
        </div>
    );
};

export default AuthHeader;
