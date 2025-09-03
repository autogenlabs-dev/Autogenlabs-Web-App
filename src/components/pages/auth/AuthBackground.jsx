'use client';
import React from 'react';
import OptimizedImage from '../../ui/OptimizedImage';

const AuthBackground = ({ isMounted }) => {
    // Website-related images for animation
    const websiteImages = [
        {
            id: 1,
            src: 'https://themewagon.com/wp-content/uploads/2023/10/CarServ.png',
            alt: 'CarServ Template',
            width: 400,
            height: 300
        },
        {
            id: 2,
            src: 'https://themewagon.com/wp-content/uploads/2023/09/HighTechIT.png',
            alt: 'HighTechIT Template',
            width: 400,
            height: 300
        },
        {
            id: 3,
            src: 'https://themewagon.com/wp-content/uploads/2023/08/minimal.png',
            alt: 'Minimal Template',
            width: 400,
            height: 300
        },
        {
            id: 4,
            src: 'https://themewagon.com/wp-content/uploads/2022/11/Phoenix-HTML.webp',
            alt: 'Phoenix Template',
            width: 400,
            height: 300
        },
    ];

    // Generate images for animation with proper dimensions
    const generateImages = (count) => {
        return Array.from({ length: count }, (_, i) => ({
            ...websiteImages[i % websiteImages.length],
            id: i
        }));
    };

    const images = generateImages(40);

    if (!isMounted) {
        return (
            <>
                <div className="fixed inset-0 z-10 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-purple-900/40"></div>
            </>
        );
    }

    return (
        <>
            {/* Animated Background - Only render on client */}
            <div className="fixed inset-0 z-0 opacity-30">
                <div className="flex w-full h-[400vh] gap-2">
                    {/* Column 1 - Moving Up */}
                    <div className="relative flex-1 overflow-hidden h-full">
                        <div
                            className="absolute w-full will-change-transform"
                            style={{
                                animation: 'scroll-up 60s linear infinite'
                            }}
                        >
                            {images.slice(0, 10).map((img) => (
                                <div
                                    key={`col1-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {images.slice(0, 10).map((img) => (
                                <div
                                    key={`col1-dup-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 2 - Moving Down (Opposite Direction) */}
                    <div className="relative flex-1 overflow-hidden h-full">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scroll-down 60s linear infinite'
                            }}
                        >
                            {images.slice(10, 20).map((img) => (
                                <div
                                    key={`col2-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {images.slice(10, 20).map((img) => (
                                <div
                                    key={`col2-dup-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 3 - Moving Up Slow */}
                    <div className="relative flex-1 overflow-hidden h-full">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scroll-up 80s linear infinite'
                            }}
                        >
                            {images.slice(20, 30).map((img) => (
                                <div
                                    key={`col3-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {images.slice(20, 30).map((img) => (
                                <div
                                    key={`col3-dup-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Column 4 - Moving Down Slow */}
                    <div className="relative flex-1 overflow-hidden h-full">
                        <div
                            className="absolute w-full"
                            style={{
                                animation: 'scroll-down 80s linear infinite'
                            }}
                        >
                            {images.slice(30, 40).map((img) => (
                                <div
                                    key={`col4-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                            {/* Duplicate for seamless loop */}
                            {images.slice(30, 40).map((img) => (
                                <div
                                    key={`col4-dup-${img.id}`}
                                    className="p-1 transform hover:scale-105 transition-all duration-1000"
                                >
                                    <div className="relative w-full h-56 overflow-hidden">
                                        <OptimizedImage
                                            src={img.src}
                                            alt={img.alt}
                                            width={img.width}
                                            height={img.height}
                                            className="w-full h-full object-cover rounded-lg shadow-xl hover:shadow-2xl transition-all duration-500 ease-in-out"
                                            lazy={true}
                                            quality={75}
                                            sizes="(max-width: 768px) 50vw, 25vw"
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            {/* Enhanced Overlay with Gradient */}
            <div className="fixed inset-0 z-10 bg-gradient-to-br from-slate-900/40 via-blue-900/30 to-purple-900/40 backdrop-blur-[3px]"></div>
        </>
    );
};

export default AuthBackground;

