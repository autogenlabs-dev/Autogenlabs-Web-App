'use client';
import React from 'react';
import LogoImage from '../../ui/LogoImage';

const AuthHeader = ({ isSignIn }) => {
    return (
        <div className="text-center mb-6">
            <div className="w-14 h-14 mx-auto mb-3 flex items-center justify-center transform hover:scale-110 transition-all duration-500 animate-float relative">                <LogoImage
                    src="/logoAuto.webp"
                    alt="Autogen Logo"
                    width={56}
                    height={56}
                    className="object-contain"
                    priority={true}
                />
            </div>
            <h1 className="text-xl font-bold text-white mb-1 animate-fade-in">
                {isSignIn ? 'Welcome Back!' : 'Join AutoGen Labs'}
            </h1>
            <p className="text-gray-300 text-xs animate-fade-in-delayed">
                {isSignIn ? 'Sign in to your dashboard' : 'Create your account'}
            </p>
        </div>
    );
};

export default AuthHeader;
