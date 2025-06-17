'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock user data - replace with actual API calls
    useEffect(() => {
        // Simulate loading user data
        const timer = setTimeout(() => {
            // Mock user - you can change role to test different views
            // Roles: 'admin', 'user', 'developer'
            setUser({
                id: '1',
                name: 'John Doe',
                email: 'john@example.com',
                role: 'developer', // Change this to test different roles: 'admin', 'user', 'developer'
                avatar: '/public/logoAuto.webp'
            });
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    const login = async (credentials) => {
        // Mock login - replace with actual API call
        setLoading(true);
        // Simulate API call
        setTimeout(() => {
            setUser({
                id: '1',
                name: credentials.name || 'User',
                email: credentials.email,
                role: credentials.role || 'user',
                avatar: '/public/logoAuto.webp'
            });
            setLoading(false);
        }, 1000);
    };

    const logout = () => {
        setUser(null);
    };

    const updateUser = (updates) => {
        setUser(prev => prev ? { ...prev, ...updates } : null);
    };

    const value = {
        user,
        loading,
        login,
        logout,
        updateUser,
        isAuthenticated: !!user,
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
