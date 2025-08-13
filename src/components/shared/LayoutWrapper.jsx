'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from '../../contexts/AuthContext';
import { TemplateProvider } from '../../contexts/TemplateContext';
import { CartProvider } from '../../contexts/CartContext';
import { NotificationProvider } from '../../contexts/NotificationContext';
import AuthGuard from '../guards/AuthGuard';

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();

    // Use consistent hook calling pattern
    const isAuthPage = useMemo(() => {
        return pathname?.startsWith('/auth') ?? false;
    }, [pathname]);

    const content = useMemo(() => {
        if (isAuthPage) {
            // Return only children for auth pages (no navbar/footer)
            return children;
        } else {
            // Return with navbar/footer for all other pages
            return (
                <>
                    <Navbar />
                    {children}
                    <Footer />
                </>
            );
        }
    }, [isAuthPage, children]);

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
