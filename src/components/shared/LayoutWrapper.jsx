'use client';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";

const LayoutWrapper = ({ children }) => {
    const pathname = usePathname();

    const isAuthPage = useMemo(() => {
        return pathname?.startsWith('/auth');
    }, [pathname]);

    if (isAuthPage) {
        // Return only children for auth pages (no navbar/footer)
        return <>{children}</>;
    }

    // Return with navbar/footer for all other pages
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default LayoutWrapper;
