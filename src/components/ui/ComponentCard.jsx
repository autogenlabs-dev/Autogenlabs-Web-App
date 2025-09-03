'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Download, IndianRupee, DollarSign, Clock, Code, User, Play } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';

const ComponentCard = ({ component, user = null, cardHeight = 450 }) => {
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
                    <div className="absolute inset-0 overflow-hidden" style={{ width: `${(rating % 1) * 100}%` }}>
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                    </div>
                </div>
            );
        }

        const remainingStars = 5 - Math.ceil(rating);
        for (let i = 0; i < remainingStars; i++) {
            stars.push(
                <Star key={fullStars + i + 1} className="w-4 h-4 text-gray-400" />
            );
        }

        return stars;
    };

    // Get category color
    const getCategoryColor = (category) => {
        const colors = {
            'Navigation': 'bg-blue-500/20 text-blue-400 border-blue-500/30',
            'Layout': 'bg-green-500/20 text-green-400 border-green-500/30',
            'Forms': 'bg-purple-500/20 text-purple-400 border-purple-500/30',
            'UI Elements': 'bg-pink-500/20 text-pink-400 border-pink-500/30',
            'Media': 'bg-orange-500/20 text-orange-400 border-orange-500/30',
            'Animation': 'bg-cyan-500/20 text-cyan-400 border-cyan-500/30',
            'Data Display': 'bg-indigo-500/20 text-indigo-400 border-indigo-500/30',
        };
        return colors[category] || 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    // Get difficulty color
    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Tough': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ duration: 0.3 }}
            className="group"
        >
            <div
                className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 flex flex-col"
                style={{
                    height: `${cardHeight}px`,
                    background: `linear-gradient(135deg, 
            rgba(255,255,255,0.05) 0%, 
            rgba(255,255,255,0.02) 50%, 
            rgba(255,255,255,0.05) 100%)`
                }}
            >
                {/* Badges */}
                <div className="absolute top-4 left-4 right-4 z-20 flex justify-between items-start">
                    <div className="flex gap-2 flex-wrap">
                        {/* Category Badge */}
                        <div className={`px-2 py-1 rounded-lg text-xs font-medium ${getCategoryColor(component.category)}`}>
                            {component.category}
                        </div>
                        {/* Type Badge */}
                        {component.type === 'Animated' && (
                            <div className="px-2 py-1 bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-400 rounded-lg text-xs font-medium border border-purple-500/30">
                                Animated
                            </div>
                        )}
                    </div>

                    <div className="flex gap-2">
                        {/* Featured Badge */}
                        {component.featured && (
                            <div className="px-2 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-lg">
                                Featured
                            </div>
                        )}
                    </div>
                </div>

                {/* Component Preview Image */}
                <div 
                    className="relative overflow-hidden flex-shrink-0"
                    style={{ height: `${Math.floor(cardHeight * 0.55)}px` }}
                >
                    {/* Only show image if previewImages exists and has content */}
                    {component.previewImages && component.previewImages.length > 0 && component.previewImages[0] ? (
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
                                src={component.previewImages[0]}
                                alt={component.title}
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
                    {component.previewImages && component.previewImages.length > 0 && component.previewImages[0] && (
                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                            <div className="flex gap-3">
                                <Link href={`/components/${component.id}`}>
                                    <motion.button
                                        className="px-4 py-2 bg-white/20 backdrop-blur-sm rounded-lg text-white font-medium hover:bg-white/30 transition-colors duration-300 flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                    >
                                        <Eye className="w-4 h-4" />
                                        View Details
                                    </motion.button>
                                </Link>
                                {component.liveDemoUrl && (
                                    <motion.button
                                        className="px-4 py-2 bg-purple-500/20 backdrop-blur-sm rounded-lg text-purple-400 font-medium hover:bg-purple-500/30 transition-colors duration-300 flex items-center gap-2"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={() => window.open(component.liveDemoUrl, '_blank')}
                                    >
                                        <Play className="w-4 h-4" />
                                        Demo
                                    </motion.button>
                                )}
                            </div>
                        </div>
                    )}
                </div>

                {/* Component Info */}
                <div className="p-6 flex flex-col flex-grow">
                    {/* Title */}
                    <h3 className="text-xl font-bold text-white mb-2 line-clamp-2">
                        {component.title}
                    </h3>

                    {/* Short Description */}
                    <p className="text-gray-400 text-sm mb-4 line-clamp-2 flex-grow">
                        {component.shortDescription || ''}
                    </p>

                    {/* Developer Info */}
                    <div className="flex items-center gap-2 mb-3">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="text-sm text-gray-300">{component.developerName}</span>
                        <span className="text-xs text-gray-500">({component.developerExperience}y exp)</span>
                    </div>

                    {/* Rating and Stats */}
                    <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center gap-1">
                            {renderStars(component.rating)}
                        </div>
                        <span className="text-sm text-gray-300">{component.rating}</span>
                        <span className="text-xs text-gray-500">({component.totalRatings} reviews)</span>
                    </div>

                    {/* Engagement Stats */}
                    <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                            <Eye className="w-4 h-4" />
                            <span>{component.views || 0}</span>
                        </div>
                    </div>                    {/* Tech & Difficulty */}
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex flex-col gap-1">
                            <span className="text-xs text-gray-500">Technology</span>
                            <span className="text-sm text-gray-300 font-medium">{component.language}</span>
                        </div>
                        <div className={`px-3 py-1 rounded-full text-xs font-medium border ${getDifficultyColor(component.difficultyLevel)}`}>
                            {component.difficultyLevel}
                        </div>
                    </div>

                    {/* Free Component */}
                    <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-green-400">Free</span>

                        {/* Developer Availability */}
                        {component.isAvailableForDev && (
                            <div className="flex items-center gap-1">
                                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
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

export default ComponentCard;

