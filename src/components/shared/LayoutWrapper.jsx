'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { AuthProvider } from '../../contexts/AuthContext';
import { TemplateProvider } from '../../contexts/TemplateContext';
import AuthGuard from '../guards/AuthGuard';

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();

    const isAuthPage = useMemo(() => {
        return pathname?.startsWith('/auth');
    }, [pathname]);

    return (
        <AuthProvider>
            <TemplateProvider>
                <AuthGuard>
                    {isAuthPage ? (
                        // Return only children for auth pages (no navbar/footer)
                        <>{children}</>
                    ) : (
                        // Return with navbar/footer for all other pages
                        <>
                            <Navbar />
                            {children}
                            <Footer />
                        </>
                    )}
                </AuthGuard>
            </TemplateProvider>
        </AuthProvider>
    );
              
};

export default LayoutWrapper;
