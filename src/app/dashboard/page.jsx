'use client';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import ProtectedRoute from '../../components/shared/ProtectedRoute';
import EnhancedUserDashboard from '../../components/pages/dashboard/EnhancedUserDashboard';
import DeveloperDashboard from '../../components/pages/dashboard/DeveloperDashboard';
import AdminDashboard from '../../components/pages/dashboard/AdminDashboard';

const Dashboard = () => {
    const { user, loading, canCreateContent, isAdmin, isDeveloper } = useAuth();
    const router = useRouter();

    // Show loading while auth is loading
    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-[#0A0A0B] via-[#1a1a1a] to-[#2d1b69] pt-24 pb-12 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-white mx-auto"></div>
                        <p className="text-white mt-4">Loading dashboard...</p>
                    </div>
                </div>
            </div>
        );
    }

    // Render appropriate dashboard based on user role
    const renderDashboard = () => {
        if (!user) {
            return null; // ProtectedRoute will handle redirect
        }

        // Admin gets admin dashboard
        if (user.role === 'admin' || isAdmin) {
            return <AdminDashboard />;
        }

        // Users with the create-content capability (legacy developers) see the DeveloperDashboard
        if (canCreateContent || isDeveloper || user?.legacyIsDeveloper) {
            return <DeveloperDashboard />;
        }

        // All other users see the enhanced user dashboard
        return <EnhancedUserDashboard />;
    };

    return (
        <ProtectedRoute>
            {renderDashboard()}
        </ProtectedRoute>
    );
};

export default Dashboard;

