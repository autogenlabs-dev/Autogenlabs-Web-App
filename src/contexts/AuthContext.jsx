'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useUser, useClerk, useAuth as useClerkAuth, useSession } from '@clerk/nextjs';

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
    const { session } = useSession();
    const { getToken: clerkGetToken } = useClerkAuth();
    const { signOut } = useClerk();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Robust getToken implementation
    const getToken = useCallback(async (options) => {
        try {
            // Try session.getToken first if available as it's often more reliable
            if (session) {
                const token = await session.getToken(options);
                if (token) {
                    // console.log('🔑 AuthContext: Got token from session');
                    return token;
                }
            }
            
            // Fallback to useAuth().getToken
            const token = await clerkGetToken(options);
            if (token) {
                // console.log('🔑 AuthContext: Got token from useAuth');
                return token;
            }
            
            console.warn('⚠️ AuthContext: No token available from session or useAuth');
            return null;
        } catch (e) {
            console.error('❌ getToken failed:', e);
            return null;
        }
    }, [session, clerkGetToken]);

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
            const email = clerkUser.primaryEmailAddress?.emailAddress || clerkUser.emailAddresses?.[0]?.emailAddress || '';
            const isAdmin = email.toLowerCase() === 'codemurf0@gmail.com';
            
            // CRITICAL: Admin check must ALWAYS take priority over metadata
            // This ensures codemurf0@gmail.com always gets admin role regardless of metadata
            let userRole = 'user';
            if (isAdmin) {
                userRole = 'admin';
                console.log('🔴 ADMIN EMAIL DETECTED - Forcing admin role for:', email);
            } else if (clerkUser.publicMetadata?.role) {
                userRole = String(clerkUser.publicMetadata.role);
            }
            
            console.log('🔐 Auth Debug:', {
                email,
                isAdmin,
                clerkId: clerkUser.id,
                metadata: clerkUser.publicMetadata,
                roleFromMetadata: clerkUser.publicMetadata?.role,
                finalRole: userRole,
                roleSource: isAdmin ? 'EMAIL_CHECK' : (clerkUser.publicMetadata?.role ? 'METADATA' : 'DEFAULT')
            });

            // Transform Clerk user to our user format
            const userState = {
                id: clerkUser.id,
                name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || email.split('@')[0] || 'User',
                firstName: clerkUser.firstName || clerkUser.fullName?.split(' ')[0] || clerkUser.username || 'User',
                lastName: clerkUser.lastName || clerkUser.fullName?.split(' ').slice(1).join(' ') || '',
                email: email,
                role: userRole,
                avatar: clerkUser.imageUrl || '/public/logoAuto.webp',
                ...clerkUser
            };
            
            console.log('✅ User authenticated:', {
                loading: false,
                isAuthenticated: true,
                hasUser: true,
                userName: userState.firstName,
                userRole: userState.role,
                userEmail: userState.email,
                fullUserState: userState
            });
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
        getToken,
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
