'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Eye, Download, IndianRupee, DollarSign, Clock, Code, User, Globe, Github, Heart, Share2, ExternalLink, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { sampleComponents, mockUser } from '@/lib/componentData';
import PaymentModal from '@/components/ui/PaymentModal';
import SafeRatingSection from '@/components/ui/SafeRatingSection';

const ComponentDetailPage = ({ componentId }) => {
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('inr');
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Find component by ID
    const component = sampleComponents.find(c => c.id === parseInt(componentId));
    const user = mockUser;

    if (!mounted) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="animate-pulse">
                    <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                </div>
            </div>
        );
    }

    if (!component) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Component Not Found</h1>
                    <p className="text-gray-400 mb-8">The component you're looking for doesn't exist.</p>
                    <Link href="/components">
                        <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                            Back to Components
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Get rating stars
    const renderStars = (rating, interactive = false, onStarClick = null) => {
        const stars = [];

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <button
                    key={i}
                    onClick={() => interactive && onStarClick && onStarClick(i)}
                    className={`${interactive ? 'cursor-pointer hover:scale-110' : 'cursor-default'} transition-transform`}
                    disabled={!interactive}
                >
                    <Star
                        className={`w-5 h-5 ${i <= rating
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-400'
                            }`}
                    />
                </button>
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

    const handlePurchase = () => {
        if (component.planType === 'Free') {
            // Handle free download
            alert('Free component download started!');
        } else {
            // Show payment modal
            setShowPaymentModal(true);
        }
    };

    const handleRatingSubmit = (rating) => {
        setUserRating(rating);
        // In real app, this would make an API call
        alert(`Thank you for rating this component ${rating} stars!`);
    };

    // Image navigation with extensive safety
    const nextImage = () => {
        try {
            if (!component?.previewImages?.length) return;
            setSelectedImageIndex((prev) => {
                const newIndex = prev === component.previewImages.length - 1 ? 0 : prev + 1;
                return Math.max(0, Math.min(newIndex, component.previewImages.length - 1));
            });
        } catch (error) {
            console.error('Error in nextImage:', error);
        }
    };

    const prevImage = () => {
        try {
            if (!component?.previewImages?.length) return;
            setSelectedImageIndex((prev) => {
                const newIndex = prev === 0 ? component.previewImages.length - 1 : prev - 1;
                return Math.max(0, Math.min(newIndex, component.previewImages.length - 1));
            });
        } catch (error) {
            console.error('Error in prevImage:', error);
        }
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/components">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Components
                        </button>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-all duration-300 ${
                                isLiked 
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30' 
                                    : 'bg-white/10 text-gray-400 border border-white/20 hover:bg-white/15'
                            }`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                            {component.likes + (isLiked ? 1 : 0)}
                        </button>

                        <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/15 transition-all duration-300">
                            <Share2 className="w-5 h-5" />
                            Share
                        </button>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

                    {/* Left Side - Component Gallery & Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Component Gallery */}
                        <motion.div
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                        >
                            {/* Main Image */}
                            <div className="relative h-96 bg-gray-900">
                                {(() => {
                                    try {
                                        const images = component?.previewImages;
                                        if (!images || !Array.isArray(images) || images.length === 0) {
                                            return (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    <div className="text-center">
                                                        <div className="w-16 h-16 bg-gray-700 rounded-lg mx-auto mb-2"></div>
                                                        <p>No preview available</p>
                                                    </div>
                                                </div>
                                            );
                                        }

                                        const safeIndex = Math.max(0, Math.min(selectedImageIndex, images.length - 1));
                                        const imageSrc = images[safeIndex] || images[0];

                                        if (!imageSrc) {
                                            return (
                                                <div className="flex items-center justify-center h-full text-gray-400">
                                                    Invalid image source
                                                </div>
                                            );
                                        }

                                        return (
                                            <Image
                                                src={imageSrc}
                                                alt={component?.title || 'Component preview'}
                                                fill
                                                className="object-cover"
                                                onError={() => console.warn('Image failed to load:', imageSrc)}
                                            />
                                        );
                                    } catch (error) {
                                        console.error('Error rendering image:', error);
                                        return (
                                            <div className="flex items-center justify-center h-full text-gray-400">
                                                Error loading image
                                            </div>
                                        );
                                    }
                                })()}

                                {/* Navigation Arrows */}
                                {component?.previewImages?.length > 1 && (
                                    <>
                                        <button
                                            onClick={prevImage}
                                            className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronLeft className="w-6 h-6" />
                                        </button>
                                        <button
                                            onClick={nextImage}
                                            className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 bg-black/50 backdrop-blur-sm text-white rounded-full flex items-center justify-center hover:bg-black/70 transition-colors"
                                        >
                                            <ChevronRight className="w-6 h-6" />
                                        </button>
                                    </>
                                )}

                                {/* Image Counter */}
                                {component?.previewImages?.length > 1 && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                                        {Math.max(1, selectedImageIndex + 1)} / {component.previewImages.length}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {component?.previewImages?.length > 1 && (
                                <div className="p-4 bg-white/5">
                                    <div className="flex gap-2 overflow-x-auto">
                                        {component.previewImages.map((image, index) => (
                                            <button
                                                key={`thumb-${index}`}
                                                onClick={() => {
                                                    try {
                                                        if (component?.previewImages && index >= 0 && index < component.previewImages.length) {
                                                            setSelectedImageIndex(index);
                                                        }
                                                    } catch (error) {
                                                        console.error('Error setting image index:', error);
                                                    }
                                                }}
                                                className={`relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 border-2 transition-colors ${
                                                    selectedImageIndex === index 
                                                        ? 'border-blue-500' 
                                                        : 'border-white/20 hover:border-white/40'
                                                }`}
                                            >
                                                {image ? (
                                                    <Image
                                                        src={image}
                                                        alt={`Preview ${index + 1}`}
                                                        fill
                                                        className="object-cover"
                                                        onError={() => console.warn('Thumbnail failed to load:', image)}
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full bg-gray-700">
                                                        <span className="text-xs text-gray-400">{index + 1}</span>
                                                    </div>
                                                )}
                                            </button>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </motion.div>

                        {/* Component Details */}
                        <motion.div
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, delay: 0.2 }}
                        >
                            <h2 className="text-2xl font-bold mb-6">About This Component</h2>
                            
                            <div className="space-y-6">
                                {/* Description */}
                                <div>
                                    <p className="text-gray-300 leading-relaxed">
                                        {component.fullDescription || component.shortDescription}
                                    </p>
                                </div>

                                {/* Dependencies */}
                                {component.dependencies && component.dependencies.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Dependencies</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {component.dependencies.map((dep, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
                                                >
                                                    {dep}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Tags */}
                                {component.tags && component.tags.length > 0 && (
                                    <div>
                                        <h3 className="text-lg font-semibold mb-3">Tags</h3>
                                        <div className="flex flex-wrap gap-2">
                                            {component.tags.map((tag, index) => (
                                                <span
                                                    key={index}
                                                    className="px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30"
                                                >
                                                    {tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Links */}
                                <div className="flex flex-wrap gap-4 pt-4">
                                    {component.gitRepoUrl && (
                                        <a
                                            href={component.gitRepoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                                        >
                                            <Github className="w-5 h-5" />
                                            View Code
                                        </a>
                                    )}
                                    {component.liveDemoUrl && (
                                        <a
                                            href={component.liveDemoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Live Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </motion.div>

                        {/* Rating Section */}
                        <SafeRatingSection
                            template={component}
                            user={user}
                        />
                    </div>

                    {/* Right Side - Component Info & Purchase */}
                    <div className="space-y-6">

                        {/* Component Info Card */}
                        <motion.div
                            className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 sticky top-24"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.6, delay: 0.3 }}
                        >
                            {/* Title and Category */}
                            <div className="mb-6">
                                <h1 className="text-2xl font-bold mb-2">{component.title}</h1>
                                <div className="flex items-center gap-2 mb-3">
                                    <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30">
                                        {component.category}
                                    </span>
                                    <span className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-lg text-sm border border-purple-500/30">
                                        {component.type}
                                    </span>
                                </div>
                                <p className="text-gray-400">{component.shortDescription}</p>
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-3 mb-6">
                                <div className="flex">{renderStars(component.rating)}</div>
                                <span className="text-yellow-400 font-semibold">{component.rating}</span>
                                <span className="text-gray-400">({component.downloads} downloads)</span>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-2 gap-4 mb-6">
                                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                                        <Eye className="w-4 h-4" />
                                        <span className="text-sm">Views</span>
                                    </div>
                                    <div className="text-white font-semibold">{component.views}</div>
                                </div>
                                <div className="text-center p-3 bg-white/5 rounded-lg border border-white/10">
                                    <div className="flex items-center justify-center gap-2 text-gray-400 mb-1">
                                        <Download className="w-4 h-4" />
                                        <span className="text-sm">Downloads</span>
                                    </div>
                                    <div className="text-white font-semibold">{component.downloads}</div>
                                </div>
                            </div>

                            {/* Meta Information */}
                            <div className="space-y-3 mb-6">
                                <div className="flex items-center gap-3">
                                    <Layers className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <span className="text-gray-400">Difficulty: </span>
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(component.difficultyLevel)}`}>
                                            {component.difficultyLevel}
                                        </span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Code className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <span className="text-gray-400">Language: </span>
                                        <span className="text-white">{component.language}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <span className="text-gray-400">Developer: </span>
                                        <span className="text-white">{component.developerName}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <span className="text-gray-400">Experience: </span>
                                        <span className="text-white">{component.developerExperience}+ years</span>
                                    </div>
                                </div>
                            </div>

                            {/* Pricing */}
                            <div className="border-t border-white/10 pt-6">
                                {component.planType === 'Free' ? (
                                    <div className="text-center mb-6">
                                        <div className="text-3xl font-bold text-green-400 mb-2">Free</div>
                                        <p className="text-gray-400">No cost to download</p>
                                    </div>
                                ) : (
                                    <div className="text-center mb-6">
                                        <div className="flex items-center justify-center gap-4 mb-4">
                                            <button
                                                onClick={() => setSelectedCurrency('inr')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                                    selectedCurrency === 'inr'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white/10 text-gray-400 hover:bg-white/15'
                                                }`}
                                            >
                                                <IndianRupee className="w-4 h-4" />
                                                INR
                                            </button>
                                            <button
                                                onClick={() => setSelectedCurrency('usd')}
                                                className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                                                    selectedCurrency === 'usd'
                                                        ? 'bg-blue-600 text-white'
                                                        : 'bg-white/10 text-gray-400 hover:bg-white/15'
                                                }`}
                                            >
                                                <DollarSign className="w-4 h-4" />
                                                USD
                                            </button>
                                        </div>
                                        <div className="text-3xl font-bold text-white mb-2">
                                            {selectedCurrency === 'inr' ? `₹${component.pricingINR}` : `$${component.pricingUSD}`}
                                        </div>
                                        <p className="text-gray-400">One-time purchase</p>
                                    </div>
                                )}

                                {/* Purchase Button */}
                                <button
                                    onClick={handlePurchase}
                                    className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                                        component.planType === 'Free'
                                            ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25'
                                            : 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25'
                                    }`}
                                >
                                    <Download className="w-5 h-5" />
                                    {component.planType === 'Free' ? 'Download Free' : 'Purchase Component'}
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Payment Modal */}
            {showPaymentModal && (
                <PaymentModal
                    isOpen={showPaymentModal}
                    onClose={() => setShowPaymentModal(false)}
                    itemType="component"
                    item={component}
                    currency={selectedCurrency}
                />
            )}
        </div>
    );
};

export default ComponentDetailPage;
