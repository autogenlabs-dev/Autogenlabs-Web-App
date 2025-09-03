'use client';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

const ProtectedRoute = ({ children, allowedRoles = [], requiredRole = null }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!loading && !isAuthenticated) {
            router.push('/auth');
        }
    }, [isAuthenticated, loading, router]);

    useEffect(() => {
        if (!loading && isAuthenticated && user) {
            // Check single required role
            if (requiredRole && user.role !== requiredRole) {
                router.push('/unauthorized');
                return;
            }
            
            // Check multiple allowed roles
            if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
                router.push('/unauthorized');
                return;
            }
        }
    }, [isAuthenticated, loading, user, allowedRoles, requiredRole, router]);

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900">
                <div className="text-white text-center">
                    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
                    <p>Loading...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return null; // Redirect will happen in useEffect
    }

    // Check role requirements after user is loaded
    if (user) {
        if (requiredRole && user.role !== requiredRole) {
            return null; // Redirect will happen in useEffect
        }
        
        if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
            return null; // Redirect will happen in useEffect
        }
    }

    return children;
};

export default ProtectedRoute;

