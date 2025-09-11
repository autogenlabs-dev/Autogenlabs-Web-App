'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, tokenUtils, ApiError } from '../lib/api';

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
    // Start with loading false during SSR, will be updated in useEffect
    const [loading, setLoading] = useState(typeof window === 'undefined' ? false : true);
    const [error, setError] = useState(null);

    // Load user from stored tokens on app initialization
    useEffect(() => {
        const initializeAuth = async () => {
            try {
                const accessToken = tokenUtils.getAccessToken();
                
                if (accessToken && !tokenUtils.isTokenExpired(accessToken)) {
                    try {
                        // Add timeout to prevent infinite loading
                        const timeoutPromise = new Promise((_, reject) => 
                            setTimeout(() => reject(new Error('Auth timeout')), 10000)
                        );
                        
                        const userData = await Promise.race([
                            authApi.getCurrentUser(accessToken),
                            timeoutPromise
                        ]);
                        
                        setUser({
                            id: userData.id,
                            name: userData.full_name || userData.name || userData.email.split('@')[0],
                            firstName: userData.full_name ? userData.full_name.split(' ')[0] : (userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0]),
                            lastName: userData.full_name ? userData.full_name.split(' ').slice(1).join(' ') : (userData.name ? userData.name.split(' ').slice(1).join(' ') : ''),
                            email: userData.email,
                            role: userData.role || 'user',
                            avatar: '/public/logoAuto.webp',
                            ...userData
                        });
                    } catch (userError) {
                        console.error('❌ InitializeAuth - Failed to fetch user data:', userError);
                        // Token might be invalid, try refresh
                        const refreshToken = tokenUtils.getRefreshToken();
                        if (refreshToken) {
                            try {
                                const refreshResponse = await authApi.refreshToken(refreshToken);
                                tokenUtils.setTokens(refreshResponse.access_token, refreshResponse.refresh_token || refreshToken);
                                const userData = await authApi.getCurrentUser(refreshResponse.access_token);
                                setUser({
                                    id: userData.id,
                                    name: userData.full_name || userData.name || userData.email.split('@')[0],
                                    firstName: userData.full_name ? userData.full_name.split(' ')[0] : (userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0]),
                                    lastName: userData.full_name ? userData.full_name.split(' ').slice(1).join(' ') : (userData.name ? userData.name.split(' ').slice(1).join(' ') : ''),
                                    email: userData.email,
                                    role: userData.role || 'user',
                                    avatar: '/public/logoAuto.webp',
                                    ...userData
                                });
                            } catch (refreshError) {
                                console.error('❌ InitializeAuth - Refresh failed:', refreshError);
                                tokenUtils.clearTokens();
                                setUser(null);
                            }
                        } else {
                            tokenUtils.clearTokens();
                            setUser(null);
                        }
                    }
                } else {
                    tokenUtils.clearTokens();
                    setUser(null);
                }
            } catch (error) {
                console.error('❌ Failed to initialize auth:', error);
                tokenUtils.clearTokens();
                setUser(null);
            } finally {
                setLoading(false);
            }
        };

        initializeAuth();
    }, []);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        
        try {
            const response = await authApi.login(credentials.email, credentials.password);
            
            // Store tokens
            tokenUtils.setTokens(response.access_token, response.refresh_token);
            
            // Set user data
            const userData = response.user;
            const userState = {
                id: userData.id,
                name: userData.full_name || userData.first_name || userData.name || userData.email.split('@')[0],
                firstName: userData.first_name || (userData.full_name ? userData.full_name.split(' ')[0] : (userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0])),
                lastName: userData.last_name || (userData.full_name ? userData.full_name.split(' ').slice(1).join(' ') : (userData.name ? userData.name.split(' ').slice(1).join(' ') : '')),
                email: userData.email,
                role: userData.role || 'user',
                avatar: '/public/logoAuto.webp',
                ...userData
            };
            
            setUser(userState);
            
            return { success: true, user: userData };
        } catch (error) {
            console.error('❌ Login failed:', error);
            setError(error.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signup = async (userData) => {
        setLoading(true);
        setError(null);
        
        try {
            // First register the user
            const registerResponse = await authApi.signup(userData);
            
            // Then automatically login to get tokens
            const loginResponse = await authApi.login(userData.email, userData.password);
            
            // Store tokens
            tokenUtils.setTokens(loginResponse.access_token, loginResponse.refresh_token);
            
            // Set user data from login response
            const user = loginResponse.user;
            setUser({
                id: user.id,
                name: user.full_name || user.first_name || user.name || userData.firstName || user.email.split('@')[0],
                firstName: user.full_name ? user.full_name.split(' ')[0] : (user.first_name || userData.firstName || (user.name ? user.name.split(' ')[0] : user.email.split('@')[0])),
                lastName: user.full_name ? user.full_name.split(' ').slice(1).join(' ') : (user.last_name || userData.lastName || (user.name ? user.name.split(' ').slice(1).join(' ') : '')),
                email: user.email,
                role: user.role || 'user',
                avatar: '/public/logoAuto.webp',
                ...user
            });
            
            return { success: true, user };
        } catch (error) {
            setError(error.message || 'Signup failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        setLoading(true);
        setError(null);
        
        try {
            // Get access token before clearing it
            const accessToken = tokenUtils.getAccessToken();
            
            // Call backend logout endpoint if we have a token
            if (accessToken) {
                try {
                    await authApi.logout(accessToken);
                } catch (error) {
                    console.warn('⚠️ Backend logout failed, continuing with local cleanup:', error);
                }
            }
            
            // Clear tokens and user state
            tokenUtils.clearTokens();
            setUser(null);
            
        } catch (error) {
            console.error('❌ Logout error:', error);
            // Even if there's an error, clear local state
            tokenUtils.clearTokens();
            setUser(null);
        } finally {
            setLoading(false);
        }
    };

    const updateUser = (updates) => {
        setUser(prev => prev ? { ...prev, ...updates } : null);
    };

    const updateProfile = async (profileData) => {
        setLoading(true);
        setError(null);
        
        try {
            const accessToken = tokenUtils.getAccessToken();
            if (!accessToken) {
                throw new Error('No access token available');
            }
            
            const response = await authApi.updateProfile(accessToken, profileData);
            
            // Update local user state with new data
            const updatedUser = {
                ...user,
                ...profileData,
                name: profileData.full_name || profileData.first_name || user.name,
                firstName: profileData.first_name || user.firstName,
                lastName: profileData.last_name || user.lastName,
                email: profileData.email || user.email,
                role: profileData.role || user.role
            };
            
            setUser(updatedUser);
            return { success: true, user: updatedUser };
        } catch (error) {
            setError(error.message || 'Profile update failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const clearError = () => {
        setError(null);
    };

    const refreshUser = useCallback(async () => {
        try {
            const token = tokenUtils.getAccessToken();
            if (!token) {
                throw new Error('No access token available');
            }

            const userData = await authApi.getCurrentUser(token);
            const userState = {
                id: userData.id,
                name: userData.full_name || userData.first_name || userData.name || userData.email.split('@')[0],
                firstName: userData.first_name || (userData.full_name ? userData.full_name.split(' ')[0] : (userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0])),
                lastName: userData.last_name || (userData.full_name ? userData.full_name.split(' ').slice(1).join(' ') : (userData.name ? userData.name.split(' ').slice(1).join(' ') : '')),
                email: userData.email,
                role: userData.role || 'user',
                avatar: '/public/logoAuto.webp',
                ...userData
            };
            
            setUser(userState);
            return userState;
        } catch (error) {
            console.error('❌ Failed to refresh user:', error);
            throw error;
        }
    }, []);

    const value = {
        user,
        loading,
        error,
        login,
        signup,
        logout,
        updateUser,
        updateProfile,
        refreshUser,
        clearError,
        isAuthenticated: !loading && !!user && !!tokenUtils.getAccessToken(),
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

