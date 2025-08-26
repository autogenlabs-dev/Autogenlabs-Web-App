'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import {                         {template.featured && (
                            <div className="px-2 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 text-yellow-400 rounded-lg text-xs font-bold border border-yellow-500/30">
                                Featured
                            </div>
                        )}ownload, IndianRupee, DollarSign, Clock, Code, User } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const TemplateCard = ({ template, user = null, cardHeight = 450 }) => {
    const [imageLoaded, setImageLoaded] = useState(false);
    const [imageError, setImageError] = useState(false);

    const handleImageLoad = () => {
        setImageLoaded(true);
    };

    const handleImageError = () => {
        setImageError(true);
    };

    // Get rating stars
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

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <Star key={`empty-${i}`} className="w-4 h-4 text-gray-400" />
            );
        }

        return stars;
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Tough': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getCategoryColor = (category) => {
        const colors = {
            'Admin Panel': 'bg-purple-500/20 text-purple-400',
            'Portfolio': 'bg-blue-500/20 text-blue-400',
            'E-commerce': 'bg-green-500/20 text-green-400',
            'Dashboard': 'bg-orange-500/20 text-orange-400',
            'Blog': 'bg-pink-500/20 text-pink-400',
            'Landing Page': 'bg-cyan-500/20 text-cyan-400',
            'SaaS Tool': 'bg-indigo-500/20 text-indigo-400',
            'Learning Management System': 'bg-red-500/20 text-red-400'
        };
        return colors[category] || 'bg-gray-500/20 text-gray-400';
    };

    return (
        <motion.div
            className="relative group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
            layout
        >
            <div
                className="relative rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-purple-500/20 group-hover:border-purple-500/30 flex flex-col"
                style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                    backdropFilter: 'blur(20px)',
                    height: `${cardHeight}px`,
                }}
            >
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                    <div className="flex gap-2 flex-wrap">
                        {/* Category Badge */}
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(template.category)}`}>
                            {template.category}
                        </div>
                        {/* Type Badge */}
                        {template.type === 'Animated' && (
                            <div className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-lg text-xs font-medium border border-purple-500/30">
                                Animated
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {/* Featured Badge */}
                        {template.featured && (
                            <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-lg">
                                Featured
                            </div>
                        )}
                        {/* Plan Type Badge */}
                        <div className={`px-2 py-1 rounded-lg text-xs font-bold ${template.planType === 'Free'
                                ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                                : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            }`}>
                            {template.planType}
                        </div>
                    </div>
                </div>

                {/* Template Preview Image */}
                <div 
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ height: `${Math.floor(cardHeight * 0.55)}px` }}
                >
                    {/* Only show image if previewImages exists and has content */}
                    {template.previewImages && template.previewImages.length > 0 && template.previewImages[0] ? (
                        <>
                            {/* Loading Placeholder */}
                            {!imageLoaded && !imageError && (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                                    <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                                </div>
                            )}

                            {/* Error Placeholder */}
                            {imageError && (
                                <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
                                    <div className="text-gray-400 text-center">
                                        <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded-lg flex items-center justify-center">
                                            <Code className="w-6 h-6" />
                                        </div>
                                        <p className="text-sm">Preview</p>
                                    </div>
                                </div>
                            )}

                            {/* Actual Image */}
                            <Image
                                src={template.previewImages[0]}
                                alt={template.title}
                                fill
                                className={`object-cover transition-opacity duration-300 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                                    }`}
                                onLoad={handleImageLoad}
                                onError={handleImageError}
                                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                            />
                        </>
                    ) : (
                        /* Show blank space when no image exists */
                        <div className="w-full h-full bg-transparent"></div>
                    )}

                    {/* Hover Overlay - only show if image exists */}
                    {template.previewImages && template.previewImages.length > 0 && template.previewImages[0] && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-3">
                                <Link href={`/templates/${template.id}`}>
                                    <motion.button
                                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </motion.button>
                                </Link>
                                {template.liveDemoUrl && (
                                    <motion.button
                                        className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-lg text-purple-400 font-medium hover:bg-purple-500/30 transition-colors duration-300 flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(template.liveDemoUrl, '_blank')}
                                    >
                                        <Download className="w-4 h-4" />
                                        Demo
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Template Info */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {template.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {template.shortDescription || ''}
                    </p>

                    {/* Developer Info */}
                    <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{template.developerName}</span>
                        <span className="text-xs text-gray-500">({template.developerExperience}y exp)</span>
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {renderStars(template.rating)}
                        </div>
                        <span className="text-sm text-gray-300">{template.rating}</span>
                        <span className="text-xs text-gray-500">({template.totalRatings} reviews)</span>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{template.views || 0}</span>
                        </div>
                    </div>

                    {/* Tech & Difficulty */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">Technology</span>
                            <span className="text-sm text-gray-300 font-medium">{template.language}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(template.difficultyLevel)}`}>
                            {template.difficultyLevel}
                        </div>
                    </div>

                    {/* Free Template */}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-400">Free</span>

                        {/* Available Status */}
                        {template.isAvailableForDev && (
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                <span className="text-xs text-green-400">Available</span>
                            </div>
                        )}
                    </div>
                </div>

                {/* Glassmorphism Shine Effect */}
                <div
                    className="absolute inset-0 rounded-3xl pointer-events-none"
                    style={{
                        background: `linear-gradient(135deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.05) 25%,
              transparent 50%,
              rgba(255,255,255,0.05) 75%,
              rgba(255,255,255,0.1) 100%)`
                    }}
                />
            </div>
        </motion.div>
    );
};

export default TemplateCard;
