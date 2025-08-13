'use client';
import { useAuth } from '../../contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { useEffect, useMemo } from 'react';

const AuthGuard = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const pathname = usePathname();

  // Protected routes - these require authentication
  const protectedRoutes = useMemo(() => [
    '/about',
    '/careers', 
    '/security',
    '/partnerships',
    '/contact',
    '/community',
    '/feature-requests',
    '/changelog',
    '/events',
    '/docs',
    '/pricing',
    '/templates',
    '/components',
    '/dashboard',
    '/profile'
  ], []);

  // Public routes that don't require authentication
  const publicRoutes = useMemo(() => [
    '/',
    '/auth',
    '/blogs'
  ], []);

  // Calculate if current route is protected - always call this hook
  const isProtectedRoute = useMemo(() => {
    return protectedRoutes.some(route => pathname?.startsWith(route));
  }, [protectedRoutes, pathname]);

  // Always call useEffect - don't conditionally call hooks
  useEffect(() => {
    // For auth page, completely bypass AuthGuard logic
    if (pathname === '/auth') {
      return;
    }

    // Don't redirect while loading
    if (loading) {
      return;
    }

    // If user is not authenticated and trying to access protected route
    if (!isAuthenticated && isProtectedRoute) {
      // Store the intended URL in localStorage so we can redirect back after login
      if (typeof window !== 'undefined') {
        localStorage.setItem('intendedUrl', pathname);
      }
      router.push('/auth');
      return;
    }

    // If user is authenticated and on auth page, let AuthPage handle the redirect
    // No need to redirect here as AuthPage will handle it after successful login
  }, [isAuthenticated, loading, pathname, router, isProtectedRoute]);

  // For auth page, always return children immediately
  if (pathname === '/auth') {
    return children;
  } 
  // For auth page, always return children immediately
  if (pathname === '/auth') {
    return children;
  }

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-purple-200/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-purple-500 border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold">Setting up your experience...</p>
            <p className="text-gray-400">Please wait a moment</p>
          </div>
        </div>
      </div>
    );
  }

  // For protected routes, only render if authenticated
  if (isProtectedRoute && !isAuthenticated) {
    // Return loading state while redirecting to login
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="relative w-16 h-16 mx-auto mb-6">
            <div className="absolute inset-0 rounded-full border-4 border-red-200/20"></div>
            <div className="absolute inset-0 rounded-full border-4 border-red-500 border-t-transparent animate-spin"></div>
          </div>
          <div className="space-y-2">
            <p className="text-xl font-semibold text-red-400">Authentication Required</p>
            <p className="text-gray-400">Redirecting to login...</p>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default AuthGuard;
