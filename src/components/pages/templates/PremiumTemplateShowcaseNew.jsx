'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Download, IndianRupee, DollarSign, Play, ExternalLink } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getPremiumTemplates } from '@/lib/templateData';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [hasIntersected, options]);

    return { elementRef, isIntersecting, hasIntersected };
};

// Premium Template Card Component
const PremiumTemplateCard = ({ template, index }) => {
    const { elementRef, hasIntersected } = useIntersectionObserver({
        threshold: 0.1,
        rootMargin: '100px',
    });

    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    const renderStars = (rating) => {
        const stars = [];
        const fullStars = Math.floor(rating);
        const hasHalfStar = rating % 1 !== 0;

        for (let i = 0; i < fullStars; i++) {
            stars.push(
                <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
            );
        }

        if (hasHalfStar) {
            stars.push(
                <div key="half" className="relative">
                    <Star className="w-4 h-4 text-gray-400" />
                    <div className="absolute top-0 left-0 w-1/2 overflow-hidden">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                </div>
            );
        }

        return stars;
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6, delay: index * 0.1 }
        }
    };

    return (
        <motion.div
            ref={elementRef}
            className="relative group cursor-pointer"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <div
                className="relative rounded-2xl border border-white/20 overflow-hidden shadow-xl transition-all duration-300 group-hover:shadow-orange-500/20 group-hover:border-orange-500/30 h-[400px] flex flex-col"
                style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                    backdropFilter: 'blur(20px)',
                }}
            >
                {/* Premium Badge */}
                <div className="absolute top-4 right-4 z-20">
                    <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full">
                        Premium
                    </div>
                </div>

                {/* Rating Badge */}
                <div className="absolute top-4 left-4 z-20">
                    <div className="flex items-center gap-1 px-2 py-1 bg-black/50 backdrop-blur-sm rounded-lg">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span className="text-xs text-white font-medium">{template.rating}</span>
                    </div>
                </div>

                {/* Template Preview Image */}
                <div className="relative h-48 overflow-hidden flex-shrink-0">
                    {/* Loading Placeholder */}
                    {!imageLoaded && !imageError && (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                            <div className="w-8 h-8 border-2 border-orange-500/30 border-t-orange-500 rounded-full animate-spin"></div>
                        </div>
                    )}

                    {/* Error Placeholder */}
                    {imageError && (
                        <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                            <div className="text-gray-400 text-center">
                                <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded-lg flex items-center justify-center">
                                    <ExternalLink className="w-6 h-6" />
                                </div>
                                <p className="text-sm">Preview</p>
                            </div>
                        </div>
                    )}

                    {/* Actual Image */}
                    {template.previewImage && hasIntersected && (
                        <Image
                            src={template.previewImage}
                            alt={template.title}
                            fill
                            className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                }`}
                            onLoad={handleImageLoad}
                            onError={handleImageError}
                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        />
                    )}

                    {/* Hover Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                        <div className="flex gap-3">
                            <Link href={`/templates/${template.id}`}>
                                <motion.button
                                    className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <Eye className="w-4 h-4" />
                                    View
                                </motion.button>
                            </Link>
                            {template.liveDemoUrl && (
                                <motion.button
                                    className="px-4 py-2 bg-orange-500/20 backdrop-blur-sm rounded-lg text-orange-400 font-medium hover:bg-orange-500/30 transition-colors duration-300 flex items-center gap-2"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open(template.liveDemoUrl, '_blank')}
                                >
                                    <Play className="w-4 h-4" />
                                    Demo
                                </motion.button>
                            )}
                        </div>
                    </div>
                </div>

                {/* Template Info */}
                <div className="p-4 flex flex-col flex-grow">
                    {/* Category & Type */}
                    <div className="flex items-center gap-2 mb-2">
                        <span className="px-2 py-1 bg-orange-500/20 text-orange-400 rounded text-xs font-medium">
                            {template.category}
                        </span>
                        {template.type === 'Animated' && (
                            <span className="px-2 py-1 bg-purple-500/20 text-purple-400 rounded text-xs font-medium">
                                Animated
                            </span>
                        )}
                    </div>

                    {/* Title */}
                    <h3 className="text-lg font-bold text-white mb-2 line-clamp-2">
                        {template.title}
                    </h3>

                    {/* Description */}
                    <p className="text-gray-400 text-sm mb-3 line-clamp-2 flex-grow">
                        {template.shortDescription}
                    </p>

                    {/* Rating & Reviews */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {renderStars(template.rating)}
                        </div>
                        <span className="text-sm text-gray-300">{template.rating}</span>
                        <span className="text-xs text-gray-500">({template.totalRatings})</span>
                    </div>

                    {/* Developer & Price */}
                    <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-400">
                            by {template.developerName}
                        </div>
                        <div className="flex items-center gap-2">
                            {template.planType === 'Paid' ? (
                                <div className="flex items-center gap-1">
                                    <IndianRupee className="w-4 h-4 text-orange-400" />
                                    <span className="text-lg font-bold text-orange-400">₹{template.pricing.inr}</span>
                                </div>
                            ) : (
                                <span className="text-lg font-bold text-green-400">Free</span>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

// Main Component
const PremiumTemplateShowcase = () => {
    const premiumTemplates = getPremiumTemplates();

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6
            }
        }
    };

    return (
        <section className="py-20 px-6 md:px-8 bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Premium{' '}
                        <span className="bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                            Templates
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Handpicked high-quality templates with excellent ratings from our community
                    </p>
                </motion.div>

                {/* Premium Templates Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                >
                    {premiumTemplates.map((template, index) => (
                        <PremiumTemplateCard key={template.id} template={template} index={index} />
                    ))}
                </motion.div>

                {/* View All Button */}
                <motion.div
                    className="text-center mt-12"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <Link href="/templates">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 rounded-xl font-semibold text-white transition-all duration-300 hover:from-orange-700 hover:to-red-700 hover:scale-105 shadow-lg hover:shadow-orange-500/25 flex items-center gap-2 mx-auto"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <ExternalLink className="w-5 h-5" />
                            View All Templates
                        </motion.button>
                    </Link>
                </motion.div>
            </div>
        </section>
    );
};

export default PremiumTemplateShowcase;
