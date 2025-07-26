'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Eye, Download, IndianRupee, DollarSign, Clock, Code, User, Globe, Github, Play, Heart, Share2, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplate } from '@/contexts/TemplateContext';
import PaymentModal from '@/components/ui/PaymentModal';
import SafeRatingSection from '@/components/ui/SafeRatingSection';
import ComponentErrorBoundary from '@/components/ui/ComponentErrorBoundary';

const TemplateDetailPage = ({ templateId }) => {
    // All hooks must be called at the top level, in the same order every time
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [showPaymentModal, setShowPaymentModal] = useState(false);
    const [selectedCurrency, setSelectedCurrency] = useState('inr');
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);

    const { user, isAuthenticated } = useAuth();
    const { getTemplateById } = useTemplate();

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Mock additional images for gallery - with error handling
    const galleryImages = useMemo(() => {
        try {
            if (!template) return [];
            const images = [];
            
            // Only add preview images if they exist and are not empty
            if (template.previewImages && Array.isArray(template.previewImages) && template.previewImages.length > 0) {
                const validImages = template.previewImages.filter(img => img && typeof img === 'string' && img.trim() !== '');
                images.push(...validImages);
            } else if (template.preview_images && Array.isArray(template.preview_images) && template.preview_images.length > 0) {
                const validImages = template.preview_images.filter(img => img && typeof img === 'string' && img.trim() !== '');
                images.push(...validImages);
            } else if (template.previewImage && typeof template.previewImage === 'string' && template.previewImage.trim() !== '') {
                images.push(template.previewImage);
            }
            
            console.log('Gallery images created:', images);
            return images; // Return only actual uploaded images
        } catch (error) {
            console.error('Error creating gallery images:', error);
            return [];
        }
    }, [template]);

    // Safe image navigation
    const handleImageNavigation = useCallback((index) => {
        try {
            if (index >= 0 && index < galleryImages.length) {
                setSelectedImageIndex(index);
            }
        } catch (error) {
            console.error('Error navigating images:', error);
            setSelectedImageIndex(0);
        }
    }, [galleryImages.length]);

    // Load template data (simplified and more robust)
    useEffect(() => {
        let isCancelled = false;
        
        const loadTemplate = async () => {
            if (!templateId) {
                console.log('❌ No templateId provided');
                if (!isCancelled) {
                    setLoading(false);
                    setError('No template ID provided');
                }
                return;
            }
            
            // Validate templateId format (should be 24 characters for MongoDB ObjectId)
            if (typeof templateId !== 'string' || templateId.length !== 24) {
                console.log('❌ Invalid templateId format:', templateId, 'length:', templateId?.length);
                if (!isCancelled) {
                    setLoading(false);
                    setError('Invalid template ID format');
                }
                return;
            }
            
            console.log('🔄 Starting to load template:', templateId);
            console.log('🔄 Template ID type:', typeof templateId);
            console.log('🔄 Template ID length:', templateId.length);
            
            // Set loading to true and reset error state
            if (!isCancelled) {
                setLoading(true);
                setTemplate(null);
                setError(null);
            }
            
            try {
                console.log('🌐 Calling getTemplateById with ID:', templateId);
                const templateData = await getTemplateById(templateId);
                console.log('📦 Template data received:', templateData);
                console.log('📦 Template data type:', typeof templateData);
                console.log('📦 Template has ID?', templateData && templateData.id);
                
                if (!isCancelled) {
                    if (templateData && templateData.id) {
                        setTemplate(templateData);
                        setError(null);
                        console.log('✅ Template set successfully:', templateData.title);
                    } else {
                        console.warn('❌ Invalid template data received:', templateData);
                        console.warn('❌ Data exists but no ID:', !!templateData);
                        setTemplate(null);
                        setError('Template not found');
                    }
                    setLoading(false);
                }
            } catch (error) {
                console.error('❌ Error loading template:', error);
                console.error('❌ Error details:', error.message);
                console.error('❌ Error status:', error.status);
                if (!isCancelled) {
                    setTemplate(null);
                    setError(error.message || 'Failed to load template');
                    setLoading(false);
                }
            }
        };

        loadTemplate();
        
        return () => {
            isCancelled = true;
        };
    }, [templateId]); // Remove getTemplateById from dependencies since it's memoized

    // Ensure selected index is within bounds
    useEffect(() => {
        if (selectedImageIndex >= galleryImages.length && galleryImages.length > 0) {
            setSelectedImageIndex(0);
        }
    }, [selectedImageIndex, galleryImages.length]);

    // Early returns after all hooks are called
    console.log('TemplateDetailPage render - loading:', loading, 'template:', !!template, 'templateId:', templateId, 'error:', error);
    
    if (loading) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <div className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                    <p className="text-gray-400">Loading template...</p>
                </div>
            </div>
        );
    }

    // Show error or not found only if we have an error or confirmed no template
    if (!loading && (error || !template)) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
                    <p className="text-gray-400 mb-8">
                        {error || "The template you're looking for doesn't exist."}
                    </p>
                    <Link href="/templates">
                        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                            Back to Templates
                        </button>
                    </Link>
                </div>
            </div>
        );
    }

    // Helper functions
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
        if (template.plan_type === 'Free' || template.planType === 'Free') {
            alert('Free template download started!');
        } else {
            setShowPaymentModal(true);
        }
    };

    const handleRatingSubmit = (rating) => {
        setUserRating(rating);
        alert(`Thank you for rating this template ${rating} stars!`);
    };

    return (
        <ComponentErrorBoundary>
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/templates">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Templates
                        </button>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setIsLiked(!isLiked)}
                            className={`p-2 rounded-lg transition-all duration-300 ${isLiked
                                    ? 'bg-red-500/20 text-red-400'
                                    : 'bg-white/10 text-gray-400 hover:text-red-400'
                                }`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                        <button className="p-2 rounded-lg bg-white/10 text-gray-400 hover:text-white transition-colors">
                            <Share2 className="w-5 h-5" />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

                    {/* Left Column - Images */}
                    <div className="space-y-6">
                        {/* Main Image */}
                        <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/20">
                            {galleryImages.length > 0 && selectedImageIndex < galleryImages.length && galleryImages[selectedImageIndex] ? (
                                <Image
                                    src={galleryImages[selectedImageIndex]}
                                    alt={template.title}
                                    fill
                                    className="object-cover"
                                    unoptimized={true}
                                    onError={(e) => {
                                        console.warn('Image failed to load:', galleryImages[selectedImageIndex]);
                                    }}
                                />
                            ) : (
                                /* Show blank space when no image exists */
                                <div className="w-full h-full bg-transparent flex items-center justify-center">
                                    <div className="text-gray-500 text-center">
                                        <p className="text-sm">No preview image available</p>
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Thumbnail Gallery */}
                        {galleryImages.length > 1 && (
                            <div className="flex gap-3 overflow-x-auto pb-2">
                                {galleryImages.filter(Boolean).map((image, index) => (
                                    image ? (
                                        <button
                                            key={index}
                                            onClick={() => handleImageNavigation(index)}
                                            className={`relative flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all duration-300 ${selectedImageIndex === index
                                                    ? 'border-purple-500 scale-105'
                                                    : 'border-white/20 hover:border-white/40'
                                                }`}
                                        >
                                            <Image
                                                src={image}
                                                alt={`Preview ${index + 1}`}
                                                fill
                                                className="object-cover"
                                                unoptimized={true}
                                                onError={(e) => {
                                                    console.warn(`Thumbnail ${index} failed to load:`, image);
                                                }}
                                            />
                                        </button>
                                    ) : null
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Right Column - Details */}
                    <div className="space-y-8">

                        {/* Title and Basic Info */}
                        <div>
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex-1">
                                    <h1 className="text-4xl font-bold mb-4">{template.title || 'Untitled Template'}</h1>
                                    <p className="text-xl text-gray-400 mb-4">{template.short_description || template.shortDescription || 'No description available'}</p>
                                </div>

                                {/* Featured Badge */}
                                {template.featured && (
                                    <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-lg">
                                        Featured
                                    </div>
                                )}
                            </div>

                            {/* Developer Info */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <User className="w-5 h-5 text-gray-400" />
                                    <span className="text-gray-300">{template.developer_name || template.developerName || 'Unknown Developer'}</span>
                                    <span className="text-sm text-gray-500">({template.developer_experience || template.developerExperience || '0'} years experience)</span>
                                </div>
                                {(template.is_available_for_dev || template.isAvailableForDev) && (
                                    <div className="flex items-center gap-1">
                                        <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                                        <span className="text-sm text-green-400">Available for hire</span>
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            <div className="flex items-center gap-6 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="flex items-center gap-1">
                                        {renderStars(template.rating || 0)}
                                    </div>
                                    <span className="text-lg font-semibold">{template.rating || 0}</span>
                                    <span className="text-gray-400">({template.total_ratings || template.totalRatings || 0} reviews)</span>
                                </div>
                            </div>
                        </div>

                        {/* Technical Details */}
                        <div className="grid grid-cols-2 gap-6">
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Category</h3>
                                <span className="text-white font-medium">{template.category || 'Uncategorized'}</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Difficulty</h3>
                                <span className={`px-3 py-1 rounded-lg text-sm font-medium border ${getDifficultyColor(template.difficulty_level || template.difficultyLevel || 'Easy')}`}>
                                    {template.difficulty_level || template.difficultyLevel || 'Easy'}
                                </span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Technology</h3>
                                <span className="text-white font-medium">{template.language || 'Not specified'}</span>
                            </div>
                            <div>
                                <h3 className="text-sm font-medium text-gray-400 mb-2">Type</h3>
                                <span className="text-white font-medium">{template.type || 'Template'}</span>
                            </div>
                        </div>

                        {/* Dependencies */}
                        {template.dependencies && template.dependencies.length > 0 && (
                            <div>
                                <h3 className="text-lg font-semibold mb-3">Dependencies</h3>
                                <div className="flex flex-wrap gap-2">
                                    {template.dependencies.map((dep, index) => (
                                        <span
                                            key={index}
                                            className="px-3 py-1 bg-white/10 text-gray-300 rounded-lg text-sm border border-white/20"
                                        >
                                            {dep}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Pricing */}
                        <div className="bg-white/5 rounded-2xl p-6 border border-white/10">
                            <h3 className="text-2xl font-bold mb-4">Pricing</h3>
                            {(template.plan_type === 'Free' || template.planType === 'Free') ? (
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
                                                    ? 'bg-purple-600 text-white'
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
                                                    ? 'bg-purple-600 text-white'
                                                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
                                            }`}
                                        >
                                            <DollarSign className="w-4 h-4" />
                                            USD
                                        </button>
                                    </div>
                                    <div className="text-3xl font-bold text-white mb-2">
                                        {selectedCurrency === 'inr' 
                                            ? `₹${template.pricing_inr || template.pricingINR || 0}` 
                                            : `$${template.pricing_usd || template.pricingUSD || 0}`}
                                    </div>
                                    <p className="text-gray-400">One-time purchase</p>
                                </div>
                            )}

                            {/* Purchase Button */}
                            <button
                                onClick={handlePurchase}
                                className={`w-full py-3 px-6 rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center justify-center gap-2 ${
                                    (template.plan_type === 'Free' || template.planType === 'Free')
                                        ? 'bg-gradient-to-r from-green-600 to-emerald-600 text-white hover:shadow-lg hover:shadow-green-500/25'
                                        : 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:shadow-lg hover:shadow-purple-500/25'
                                }`}
                            >
                                <Download className="w-5 h-5" />
                                {(template.plan_type === 'Free' || template.planType === 'Free') ? 'Download Free' : 'Purchase Template'}
                            </button>
                        </div>

                        {/* Action Buttons */}
                        <div className="flex gap-4">
                            {(template.git_repo_url || template.gitRepoUrl) && (
                                <a
                                    href={template.git_repo_url || template.gitRepoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg transition-colors"
                                >
                                    <Github className="w-5 h-5" />
                                    View Code
                                </a>
                            )}
                            {(template.live_demo_url || template.liveDemoUrl) && (
                                <a
                                    href={template.live_demo_url || template.liveDemoUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-lg transition-colors"
                                >
                                    <ExternalLink className="w-5 h-5" />
                                    Live Demo
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Full Description */}
                <div className="mt-16 space-y-8">
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About This Template</h2>
                        <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {template.full_description || template.fullDescription || template.short_description || template.shortDescription || 'No description available.'}
                            </p>
                        </div>
                    </div>
                    
                    {/* Rating Section */}
                    <SafeRatingSection template={template} user={user} />
                </div>
            </div>

            {/* Payment Modal */}
            <PaymentModal
                isOpen={showPaymentModal}
                onClose={() => setShowPaymentModal(false)}
                template={template}
                selectedCurrency={selectedCurrency}
            />
        </div>
        </ComponentErrorBoundary>
    );
};

export default TemplateDetailPage;
