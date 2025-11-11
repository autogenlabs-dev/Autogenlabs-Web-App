'use client';
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, tokenUtils, ApiError } from '../lib/api';
import { useAuth0 } from '@auth0/auth0-react';

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
        user: auth0User,
        isAuthenticated: auth0IsAuthenticated,
        isLoading: auth0Loading,
        loginWithRedirect,
        logout: auth0Logout,
        getAccessTokenSilently
    } = useAuth0();

    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Sync Auth0 state with our context
    useEffect(() => {
        if (auth0Loading) {
            setLoading(true);
            return;
        }

        if (auth0IsAuthenticated && auth0User) {
            // Transform Auth0 user to our user format
            const userState = {
                id: auth0User.sub,
                name: auth0User.name || auth0User.nickname || auth0User.email?.split('@')[0] || 'User',
                firstName: auth0User.given_name || auth0User.name?.split(' ')[0] || auth0User.nickname || 'User',
                lastName: auth0User.family_name || auth0User.name?.split(' ').slice(1).join(' ') || '',
                email: auth0User.email,
                role: 'user', // Default role, can be updated from backend
                avatar: auth0User.picture || '/public/logoAuto.webp',
                ...auth0User
            };
            
            setUser(userState);
            setLoading(false);
        } else {
            setUser(null);
            setLoading(false);
        }
    }, [auth0User, auth0IsAuthenticated, auth0Loading]);

    const login = async (credentials) => {
        setLoading(true);
        setError(null);
        
        try {
            // For Auth0, we redirect to universal login
            await loginWithRedirect({
                authorizationParams: {
                    login_hint: credentials.email
                }
            });
            
            return { success: true };
        } catch (error) {
            console.error('❌ Login failed:', error);
            setError(error.message || 'Login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // OAuth login method for handling tokens from backend OAuth flow
    const loginWithOAuth = (oauthData) => {
        setLoading(true);
        setError(null);
        
        try {
            const { id, accessToken, refreshToken } = oauthData;
            
            console.log('🔍 AuthContext Debug - loginWithOAuth called with:', {
                id: id ? '***' : null,
                accessToken: accessToken ? '***' : null,
                refreshToken: refreshToken ? '***' : null
            });
            
            // Store tokens using tokenUtils
            tokenUtils.setTokens(accessToken, refreshToken);
            
            // Set basic user data from OAuth data
            // We'll fetch full user data later if needed
            const userState = {
                id,
                accessToken,
                refreshToken,
                name: 'User', // Will be updated when we fetch user data
                email: '', // Will be updated when we fetch user data
                role: 'user',
                avatar: '/public/logoAuto.webp'
            };
            
            setUser(userState);
            console.log('✅ AuthContext Debug - User state set:', userState);
            
            // Fetch full user data asynchronously
            fetchUserDataAsync(accessToken);
            
            return { success: true, user: userState };
        } catch (error) {
            console.error('❌ OAuth login failed:', error);
            setError(error.message || 'OAuth login failed');
            throw error;
        } finally {
            setLoading(false);
        }
    };

    // Helper function to fetch user data asynchronously
    const fetchUserDataAsync = async (accessToken) => {
        try {
            const userData = await authApi.getCurrentUser(accessToken);
            const fullUserState = {
                id: userData.id,
                name: userData.full_name || userData.name || userData.email.split('@')[0],
                firstName: userData.full_name ? userData.full_name.split(' ')[0] : (userData.name ? userData.name.split(' ')[0] : userData.email.split('@')[0]),
                lastName: userData.full_name ? userData.full_name.split(' ').slice(1).join(' ') : (userData.name ? userData.name.split(' ').slice(1).join(' ') : ''),
                email: userData.email,
                role: userData.role || 'user',
                avatar: '/public/logoAuto.webp',
                accessToken,
                ...userData
            };
            
            setUser(fullUserState);
        } catch (error) {
            console.warn('❌ Failed to fetch user data after OAuth login:', error);
            // Don't fail the login, just continue with basic user data
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
            // Use Auth0 logout
            await auth0Logout({
                logoutParams: {
                    returnTo: window.location.origin
                }
            });
            
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
        loginWithOAuth,
        signup,
        logout,
        updateUser,
        updateProfile,
        refreshUser,
        clearError,
        isAuthenticated: auth0IsAuthenticated && !!user,
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
