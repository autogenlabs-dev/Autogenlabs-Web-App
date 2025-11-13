'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser, useClerk } from '@clerk/nextjs';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const {
        user: clerkUser,
        isLoaded: clerkLoaded,
        isSignedIn: clerkIsSignedIn
    } = useUser();
    const { signOut } = useClerk();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync Clerk state with our context
    useEffect(() => {
        // Add timeout to prevent infinite loading
        const timeout = setTimeout(() => {
            if (!clerkLoaded) {
                console.warn('⚠️ Clerk took too long to load, setting loading to false');
                setLoading(false);
            }
        }, 3000); // 3 second timeout

        if (!clerkLoaded) {
            setLoading(true);
            return () => clearTimeout(timeout);
        }

        clearTimeout(timeout);

        if (clerkIsSignedIn && clerkUser) {
            // Transform Clerk user to our user format
            const userState = {
                id: clerkUser.id,
                name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
                firstName: clerkUser.firstName || clerkUser.fullName?.split(' ')[0] || clerkUser.username || 'User',
                lastName: clerkUser.lastName || clerkUser.fullName?.split(' ').slice(1).join(' ') || '',
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                role: 'user', // Default role, can be updated from backend
                avatar: clerkUser.imageUrl || '/public/logoAuto.webp',
                ...clerkUser
            };
            
            console.log('✅ User authenticated:', userState);
            setUser(userState);
            setLoading(false);
        } else {
            console.log('ℹ️ No user signed in');
            setUser(null);
            setLoading(false);
        }
    }, [clerkUser, clerkIsSignedIn, clerkLoaded]);

    const logout = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Use Clerk signOut
            await signOut();
            
            // Clear local state
            setUser(null);
            
        } catch (error) {
            console.error('❌ Logout error:', error);
            // Even if there's an error, clear local state
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = (updates) => {
        setUser(prev => prev ? { ...prev, ...updates } : null);
    };

    const clearError = () => {
        setError(null);
    };

    const value = {
        user,
        loading,
        error,
        logout,
        updateUser,
        clearError,
        isAuthenticated: clerkIsSignedIn && !!user,
        isAdmin: user?.role === 'admin',
        isDeveloper: user?.role === 'developer',
        isUser: user?.role === 'user'
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
