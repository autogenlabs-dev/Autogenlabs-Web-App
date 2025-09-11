'use client';
import { usePathname } from 'next/navigation';
import { useMemo, useState, useEffect } from 'react';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { AuthProvider } from '../../contexts/AuthContext';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { CartProvider } from '../../contexts/CartContext';
import { NotificationProvider } from '../../contexts/NotificationContext';
import AuthGuard from '../guards/AuthGuard';

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();
    const [isClient, setIsClient] = useState(false);

    // Ensure we're on the client side before rendering context providers
    useEffect(() => {
        setIsClient(true);
    }, []);

    // Use consistent hook calling pattern
    const isAuthPage = useMemo(() => {
        return pathname?.startsWith('/auth') ?? false;
    }, [pathname]);

    // Check for pages that should not show footer
    const shouldHideFooter = useMemo(() => {
        if (!pathname) return false;
        
        const footerHiddenPaths = [
            '/templates/create',
            '/components/create',
            '/dashboard',
            '/profile'
        ];
        
        // Check exact matches first
        if (footerHiddenPaths.includes(pathname)) {
            return true;
        }
        
        // Check dynamic routes patterns
        const hiddenPatterns = [
            /^\/templates\/[^\/]+$/,        // /templates/[id]
            /^\/templates\/[^\/]+\/edit$/,  // /templates/[id]/edit
            /^\/components\/[^\/]+$/,       // /components/[id]
            /^\/components\/[^\/]+\/edit$/, // /components/[id]/edit
        ];
        
        return hiddenPatterns.some(pattern => pattern.test(pathname));
    }, [pathname]);

    const content = useMemo(() => {
        if (isAuthPage) {
            // Return only children for auth pages (no navbar/footer)
            return children;
        } else {
            // Return with navbar and conditionally with footer
            return (
                <>
                    <Navbar />
                    {children}
                    {!shouldHideFooter && <Footer />}
                </>
            );
        }
    }, [isAuthPage, shouldHideFooter, children]);

    // During SSR or before client hydration, render without context providers and auth guard
    if (!isClient) {
        return content;
    }

    return (
        <NotificationProvider>
            <AuthProvider>
                <TemplateProvider>
                    <CartProvider>
                        <AuthGuard>
                            {content}
                        </AuthGuard>
                    </CartProvider>
                </TemplateProvider>
            </AuthProvider>
        </NotificationProvider>
    );
              
};

export default LayoutWrapper;

