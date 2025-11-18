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
            // Determine raw role from Clerk public metadata (or fallback to 'user')
            const rawRole = clerkUser?.publicMetadata?.role || clerkUser?.role || 'user';

            // Normalize developer -> user so the app only uses 'admin' and 'user'
            const normalizedRole = rawRole === 'developer' ? 'user' : rawRole;

            // Derive permission flags (backwards-compatible). If user was a legacy 'developer'
            // give them the create-content capability so they keep their privileges.
            const canCreateContent = !!(
                clerkUser?.publicMetadata?.canCreate ||
                clerkUser?.publicMetadata?.can_create ||
                clerkUser?.publicMetadata?.capabilities?.create_content ||
                rawRole === 'developer'
            );

            // Determine organization-level role (if present) from Clerk public metadata
            const rawOrgRole = clerkUser?.publicMetadata?.orgRole || clerkUser?.publicMetadata?.org_role || clerkUser?.publicMetadata?.organizationRole || null;

            // Transform Clerk user to our user format
            const userState = {
                id: clerkUser.id,
                name: clerkUser.fullName || clerkUser.firstName || clerkUser.username || clerkUser.primaryEmailAddress?.emailAddress?.split('@')[0] || 'User',
                firstName: clerkUser.firstName || clerkUser.fullName?.split(' ')[0] || clerkUser.username || 'User',
                lastName: clerkUser.lastName || clerkUser.fullName?.split(' ').slice(1).join(' ') || '',
                email: clerkUser.primaryEmailAddress?.emailAddress || '',
                // Only keep 'admin' or 'user' in the role field
                role: normalizedRole,
                // Provide a capability flag so components can check permissions instead of role === 'developer'
                canCreateContent,
                // Legacy indicator (so existing checks can be migrated incrementally)
                legacyIsDeveloper: rawRole === 'developer',
                // Organization level role (optional)
                orgRole: rawOrgRole,
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
        // Backwards-compatible: legacyIsDeveloper indicates the original role before normalization
        isDeveloper: !!user?.legacyIsDeveloper,
        // Capability flag that should be used instead of checking for a 'developer' role
        canCreateContent: !!user?.canCreateContent,
        isUser: user?.role === 'user' || !!user?.legacyIsDeveloper
    };

    // Debug log for organization role (helpful during migration)
    if (process.env.NODE_ENV !== 'production') {
        console.log('AuthContext debug - orgRole:', user?.orgRole, 'role:', user?.role, 'canCreateContent:', user?.canCreateContent);
    }

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
