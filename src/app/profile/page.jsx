'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';

export default function ProfilePage() {
    const { user, updateProfile, loading, error, isAuthenticated, refreshUser } = useAuth();
    const router = useRouter();
    
    const [role, setRole] = useState(user?.role || 'user');
    const [isEditing, setIsEditing] = useState(false);
    const [updateLoading, setUpdateLoading] = useState(false);
    const [updateError, setUpdateError] = useState('');
    const [updateSuccess, setUpdateSuccess] = useState(false);
    const [refreshing, setRefreshing] = useState(false);

    useEffect(() => {
        if (!isAuthenticated && !loading) {
            router.push('/auth');
            return;
        }
        
        // Refresh user data when component mounts to ensure latest status
        const refreshUserData = async () => {
            if (isAuthenticated && !loading) {
                try {
                    setRefreshing(true);
                    await refreshUser();
                } catch (error) {
                    console.error('Failed to refresh user data:', error);
                } finally {
                    setRefreshing(false);
                }
            }
        };

        refreshUserData();
    }, [isAuthenticated, loading, router]); // Removed refreshUser from dependencies

    useEffect(() => {
        if (user) {
            setRole(user.role || 'user');
        }
    }, [user]);

    const handleRoleChange = (e) => {
        setRole(e.target.value);
        setUpdateError('');
        setUpdateSuccess(false);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setUpdateLoading(true);
        setUpdateError('');
        setUpdateSuccess(false);

        try {
            // Only update the role
            await updateProfile({ role });
            setUpdateSuccess(true);
            setIsEditing(false);
        } catch (error) {
            setUpdateError(error.message || 'Failed to update role');
        } finally {
            setUpdateLoading(false);
        }
    };

    const handleCancel = () => {
        if (user) {
            setRole(user.role || 'user');
        }
        setIsEditing(false);
        setUpdateError('');
        setUpdateSuccess(false);
    };

    if (loading || refreshing) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-purple-500 mx-auto"></div>
                    <p className="text-white mt-4">
                        {refreshing ? 'Loading profile...' : 'Loading...'}
                    </p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-lg border border-white/20 shadow-2xl rounded-xl overflow-hidden">
                    {/* Header */}
                    <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-8">
                        <div className="flex items-center space-x-4">
                            <div className="w-20 h-20 bg-white/20 backdrop-blur-lg rounded-full flex items-center justify-center border border-white/30">
                                <span className="text-3xl font-bold text-white">
                                    {user?.firstName?.charAt(0)?.toUpperCase() || user?.name?.charAt(0)?.toUpperCase() || user?.email?.charAt(0)?.toUpperCase()}
                                </span>
                            </div>
                            <div>
                                <h1 className="text-3xl font-bold text-white">
                                    {user?.name || user?.email || 'User'}
                                </h1>
                                <p className="text-purple-100 capitalize text-lg">
                                    {user?.role || 'user'} Account
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Profile Details */}
                    <div className="px-6 py-8">
                        {updateSuccess && (
                            <div className="mb-6 bg-green-500/20 border border-green-500/40 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-green-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-green-300">
                                            Role updated successfully!
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}

                        {updateError && (
                            <div className="mb-6 bg-red-500/20 border border-red-500/40 rounded-lg p-4">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0">
                                        <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                        </svg>
                                    </div>
                                    <div className="ml-3">
                                        <p className="text-sm font-medium text-red-300">
                                            {updateError}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}                        {/* User Details Display */}
                        <div className="space-y-6 mb-8">
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Email</label>
                                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                                        {user?.email || 'Not provided'}
                                    </div>
                                </div>
                                
                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Full Name</label>
                                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                                        {user?.name || user?.full_name || 'Not provided'}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Account Status</label>
                                    <div className="px-4 py-3 bg-white/5 border border-white/10 rounded-lg text-white">
                                        {user?.is_active ? (
                                            <span className="text-green-400">Active</span>
                                        ) : (
                                            <span className="text-red-400">Inactive</span>
                                        )}
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-sm font-medium text-gray-300">Role</label>
                                    <select
                                        value={user?.role || 'user'}
                                        onChange={handleRoleChange}
                                        disabled={!isEditing}
                                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        <option value="user" className="bg-gray-800">User</option>
                                        <option value="developer" className="bg-gray-800">Developer</option>
                                        <option value="admin" className="bg-gray-800">Admin</option>
                                    </select>
                                </div>
                            </div>
                        </div>                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-3">
                            {!isEditing ? (
                                <button
                                    type="button"
                                    onClick={() => setIsEditing(true)}
                                    className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 text-white font-medium rounded-lg hover:from-purple-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 transform hover:scale-105"
                                >
                                    Update Profile
                                </button>
                            ) : (
                                <>
                                    <button
                                        type="button"
                                        onClick={handleSubmit}
                                        disabled={updateLoading}
                                        className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium rounded-lg hover:from-green-700 hover:to-emerald-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
                                    >
                                        {updateLoading ? (
                                            <>
                                                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                                </svg>
                                                Saving...
                                            </>
                                        ) : (
                                            'Save Changes'
                                        )}
                                    </button>
                                    <button
                                        type="button"
                                        onClick={handleCancel}
                                        disabled={updateLoading}
                                        className="w-full sm:w-auto px-6 py-3 bg-white/10 border border-white/20 text-white font-medium rounded-lg hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                                    >
                                        Cancel
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>    );
}

