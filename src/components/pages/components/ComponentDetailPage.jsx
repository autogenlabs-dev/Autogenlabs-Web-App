'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Eye, Download, Clock, Code, User, Globe, Github, Heart, Share2, ExternalLink, ChevronLeft, ChevronRight, Layers } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { mockUser } from '@/lib/componentData';
import { componentApi } from '@/lib/componentApi';
import SafeRatingSection from '@/components/ui/SafeRatingSection';
import CodeViewerModal from '@/components/ui/CodeViewerModal';
import LiveComponentPreview from '@/components/ui/LiveComponentPreview';

const ComponentDetailPage = ({ componentId }) => {
    const [component, setComponent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [mounted, setMounted] = useState(false);
    const [showCodeModal, setShowCodeModal] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (componentId) {
            fetchComponent();
        }
    }, [componentId]);

    const fetchComponent = async () => {
        try {
            setLoading(true);
            setError(null);
            const component = await componentApi.getComponent(componentId);
           
           
            setComponent(component);
        } catch (err) {
            console.error('Failed to fetch component:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

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

    if (loading) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto mb-4">
                        <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
                    </div>
                    <p className="text-gray-400">Loading component...</p>
                </div>
            </div>
        );
    }

    if (error || !component) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Component Not Found</h1>
                    <p className="text-gray-400 mb-8">{error || "The component you're looking for doesn't exist."}</p>
                    <div className="flex gap-4 justify-center">
                        <Link href="/components">
                            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                                Back to Components
                            </button>
                        </Link>
                        <button 
                            onClick={fetchComponent}
                            className="px-6 py-3 bg-gray-600 hover:bg-gray-700 rounded-xl font-semibold transition-all duration-300"
                        >
                            Try Again
                        </button>
                    </div>
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

    const handleDownload = () => {
        alert('Download started!');
        // Add actual download logic here
    };

    const handleRatingSubmit = (rating) => {
        setUserRating(rating);
        // In real app, this would make an API call
        alert(`Thank you for rating this component ${rating} stars!`);
    };

    // Image navigation with extensive safety
    const nextImage = () => {
        try {
            const images = component?.previewImages || component?.preview_images;
            if (!images?.length) return;
            setSelectedImageIndex((prev) => {
                const newIndex = prev === images.length - 1 ? 0 : prev + 1;
                return Math.max(0, Math.min(newIndex, images.length - 1));
            });
        } catch (error) {
            console.error('Error in nextImage:', error);
        }
    };

    const prevImage = () => {
        try {
            const images = component?.previewImages || component?.preview_images;
            if (!images?.length) return;
            setSelectedImageIndex((prev) => {
                const newIndex = prev === 0 ? images.length - 1 : prev - 1;
                return Math.max(0, Math.min(newIndex, images.length - 1));
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
                            {/* Main Preview */}
                            <div className="relative h-[500px] bg-gray-900 rounded-xl overflow-hidden group">
                                {(() => {
                                    try {
                                        
                                        // Check for different possible code field names
                                        const hasCode = component?.code || component?.html || component?.content || component?.htmlCode;
                                        
                                        // Use live component preview if code is available
                                        if (hasCode) {
                                            return (
                                                <>
                                                    <LiveComponentPreview 
                                                        component={component}
                                                        width="100%"
                                                        height="100%"
                                                        className="w-full h-full"
                                                        theme="dark"
                                                        showFallback={true}
                                                    />
                                                    {/* Code Button Overlay */}
                                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                        <button
                                                            onClick={() => setShowCodeModal(true)}
                                                            className="opacity-0 group-hover:opacity-100 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-all duration-300 flex items-center gap-2"
                                                        >
                                                            <Code className="w-4 h-4" />
                                                            View Code
                                                        </button>
                                                    </div>
                                                </>
                                            );
                                        }

                                        // Fallback to static images
                                        const images = component?.previewImages || component?.preview_images;
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
                                            <>
                                                <Image
                                                    src={imageSrc}
                                                    alt={component?.title || 'Component preview'}
                                                    fill
                                                    className="object-cover"
                                                    onError={() => console.warn('Image failed to load:', imageSrc)}
                                                />
                                                {/* Code Button Overlay */}
                                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                                                    <button
                                                        onClick={() => setShowCodeModal(true)}
                                                        className="opacity-0 group-hover:opacity-100 transform scale-90 group-hover:scale-100 transition-all duration-300 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold flex items-center gap-2 shadow-2xl"
                                                    >
                                                        <Code className="w-5 h-5" />
                                                        View Code
                                                    </button>
                                                </div>
                                            </>
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
                                {((component?.previewImages?.length || component?.preview_images?.length) > 1) && (
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
                                {((component?.previewImages?.length || component?.preview_images?.length) > 1) && (
                                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 px-3 py-1 bg-black/50 backdrop-blur-sm text-white text-sm rounded-full">
                                        {Math.max(1, selectedImageIndex + 1)} / {(component?.previewImages || component?.preview_images)?.length}
                                    </div>
                                )}
                            </div>

                            {/* Thumbnail Strip */}
                            {((component?.previewImages?.length || component?.preview_images?.length) > 1) && (
                                <div className="p-4 bg-white/5">
                                    <div className="flex gap-2 overflow-x-auto">
                                        {(component?.previewImages || component?.preview_images)?.map((image, index) => (
                                            <button
                                                key={`thumb-${index}`}
                                                onClick={() => {
                                                    try {
                                                        const images = component?.previewImages || component?.preview_images;
                                                        if (images && index >= 0 && index < images.length) {
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
                                        {component.fullDescription || component.full_description || component.shortDescription || component.short_description || 'No description available.'}
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
                                                    className="px-3 py-1 bg-gray-700 text-gray-300 rounded-lg text-sm"
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
                                                    #{tag}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Code Button */}
                                <div className="flex flex-wrap gap-3">
                                    <button
                                        onClick={() => setShowCodeModal(true)}
                                        className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                                    >
                                        <Code className="w-5 h-5" />
                                        View Code
                                    </button>
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
                                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(component.difficultyLevel || component.difficulty_level)}`}>
                                            {component.difficultyLevel || component.difficulty_level}
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
                                        <span className="text-white">{component.developerName || component.developer_name || 'Unknown Developer'}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-3">
                                    <Clock className="w-5 h-5 text-gray-400" />
                                    <div>
                                        <span className="text-gray-400">Experience: </span>
                                        <span className="text-white">{component.developerExperience || component.developer_experience || '0'} years</span>
                                    </div>
                                </div>
                            </div>

                            {/* Download Section */}
                            <div className="border-t border-white/10 pt-6">
                                <div className="text-center mb-6">
                                    <div className="text-2xl font-bold text-blue-400 mb-2">
                                        {(component.planType === 'Premium' || component.plan_type === 'Premium') ? 'Premium' : 'Free'}
                                    </div>
                                    <p className="text-gray-400">Component available for download</p>
                                </div>

                                {/* Download Button */}
                                <button
                                    onClick={handleDownload}
                                    className="w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-blue-500/25"
                                >
                                    <Download className="w-5 h-5" />
                                    Download Component
                                </button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>

            {/* Code Viewer Modal */}
            <CodeViewerModal
                isOpen={showCodeModal}
                onClose={() => setShowCodeModal(false)}
                component={component}
            />
        </div>
    );
};

export default ComponentDetailPage;
