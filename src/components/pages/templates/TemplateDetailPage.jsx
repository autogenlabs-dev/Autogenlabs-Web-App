'use client';
import React, { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Star, Eye, Download, Clock, Code, User, Globe, Github, Play, Heart, ExternalLink, MessageCircle } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { useAuth } from '@/contexts/AuthContext';
import { generateMultipleScreenshots, getBestPreviewImage } from '@/utils/livePreviewUtils';
import { useTemplate } from '@/contexts/TemplateContext';
import ComponentErrorBoundary from '@/components/ui/ComponentErrorBoundary';
import CommentSystem from '@/components/ui/CommentSystem';

const TemplateDetailPage = ({ templateId }) => {
    // All hooks must be called at the top level, in the same order every time
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [userRating, setUserRating] = useState(0);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [template, setTemplate] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const mountedRef = useRef(true);

    const { user, isAuthenticated } = useAuth();
    const { getTemplateById, toggleTemplateLike } = useTemplate();

    // Cleanup on unmount
    useEffect(() => {
        return () => {
            mountedRef.current = false;
        };
    }, []);

    // Generate gallery images from live URL with fallback to any existing preview images
    const galleryImages = useMemo(() => {
        try {
            if (!template) return [];
            const images = [];
            
            // Priority 1: Use live demo URL for multiple sizes
            if (template.liveDemoUrl) {
                const screenshots = generateMultipleScreenshots(template.liveDemoUrl);
                if (screenshots.large) images.push(screenshots.large);
                if (screenshots.medium) images.push(screenshots.medium);
                if (screenshots.mobile) images.push(screenshots.mobile);
            }
            
            // Priority 2: Add any existing preview images as backup
            if (template.previewImages && Array.isArray(template.previewImages) && template.previewImages.length > 0) {
                const validImages = template.previewImages.filter(img => img && typeof img === 'string' && img.trim() !== '');
                images.push(...validImages);
            } else if (template.preview_images && Array.isArray(template.preview_images) && template.preview_images.length > 0) {
                const validImages = template.preview_images.filter(img => img && typeof img === 'string' && img.trim() !== '');
                images.push(...validImages);
            }
            
            return images; // Return live URL + any existing images
        } catch (error) {
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
            setSelectedImageIndex(0);
        }
    }, [galleryImages.length]);

    // Load template data (simplified and more robust)
    useEffect(() => {
        let isCancelled = false;
        
        const loadTemplate = async () => {
            if (!templateId) {
                if (!isCancelled) {
                    setLoading(false);
                    setError('No template ID provided');
                }
                return;
            }
            
            // Validate templateId format (should be 24 characters for MongoDB ObjectId)
            if (typeof templateId !== 'string' || templateId.length !== 24) {
                if (!isCancelled) {
                    setLoading(false);
                    setError('Invalid template ID format');
                }
                return;
            }
            
            // Set loading to true and reset error state
            if (!isCancelled) {
                setLoading(true);
                setTemplate(null);
                setError(null);
            }
            
            try {
                const templateData = await getTemplateById(templateId);
                console.log('📄 Template data received:', templateData); // Debug log
                
                if (!isCancelled) {
                    if (templateData && templateData.id) {
                        setTemplate(templateData);
                        setIsLiked(templateData.liked || false);
                        setLikeCount(templateData.likes || templateData.total_likes || 0);
                        setError(null);
                        console.log('💖 Like status set:', templateData.liked);
                        console.log('🔢 Like count set:', templateData.likes || templateData.total_likes || 0);
                        console.log('💬 Comments count:', templateData.comments_count || templateData.total_comments || 0);
                    } else {
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
                            Back
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

    const handleRatingSubmit = (rating) => {
        setUserRating(rating);
        alert(`Thank you for rating this template ${rating} stars!`);
    };

    const handleToggleLike = async () => {
        if (!isAuthenticated) {
            alert('Please login to like templates');
            return;
        }

        // Store original values for potential rollback
        const originalLiked = isLiked;
        const originalCount = likeCount;

        try {
            // Optimistic update
            setIsLiked(!isLiked);
            setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
            
            const response = await toggleTemplateLike(templateId);
            console.log('Like response:', response); // Debug log
            
            // Update with server response (in case of any discrepancy)
            setIsLiked(response.liked);
            setLikeCount(response.total_likes);
            
            // Update the template object as well
            setTemplate(prev => ({
                ...prev,
                liked: response.liked,
                likes: response.total_likes,
                total_likes: response.total_likes
            }));
        } catch (error) {
            console.error('Failed to toggle like:', error);
            // Revert optimistic update
            setIsLiked(originalLiked);
            setLikeCount(originalCount);
            alert('Failed to update like status');
        }
    };

    return (
        <ComponentErrorBoundary>
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <button 
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-5 h-5" />
                        Back
                    </button>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={handleToggleLike}
                            className={`p-3 rounded-lg transition-all duration-300 ${isLiked
                                    ? 'bg-red-500/20 text-red-400 border border-red-500/30'
                                    : 'bg-white/10 text-gray-400 border border-white/20 hover:bg-white/15'
                                }`}
                            aria-label={`${isLiked ? 'Unlike' : 'Like'} this template (${likeCount} likes)`}
                            title={`${isLiked ? 'Unlike' : 'Like'} this template (${likeCount} likes)`}
                        >
                            <Heart className={`w-5 h-5 ${isLiked ? 'fill-current' : ''}`} />
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-6 py-12">
                
                {/* Full Width Live Preview - Direct Iframe */}
                <div className="w-full mb-16">
                    <div className="relative w-full h-[70vh] min-h-[600px] rounded-3xl overflow-hidden border border-white/20 bg-gradient-to-br from-gray-900 to-black shadow-2xl">
                        {template.liveDemoUrl ? (
                            <>
                                {/* Direct Live Preview - No Static Image */}
                                <iframe
                                    src={template.liveDemoUrl}
                                    className="w-full h-full border-0 rounded-3xl"
                                    title="Live Template Preview"
                                    loading="eager"
                                    sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-pointer-lock"
                                />

                                {/* Floating Action Buttons */}
                                <div className="absolute top-6 right-6 flex gap-3">
                                    <a
                                        href={template.liveDemoUrl}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 bg-blue-600/90 backdrop-blur-sm hover:bg-blue-700 text-white px-4 py-2 rounded-xl transition-all duration-300 hover:scale-105 shadow-lg"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                        Open in New Tab
                                    </a>
                                </div>

                                {/* Live Status Indicator */}
                                <div className="absolute top-6 left-6 flex items-center gap-2 bg-green-500/90 backdrop-blur-sm text-white px-3 py-2 rounded-xl shadow-lg">
                                    <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                    <span className="text-sm font-medium">Live Preview</span>
                                </div>
                            </>
                        ) : (
                            /* Fallback when no live URL */
                            <div className="w-full h-full bg-gradient-to-br from-gray-800 to-gray-900 flex items-center justify-center">
                                <div className="text-gray-400 text-center">
                                    <Globe className="w-20 h-20 mx-auto mb-6 opacity-50" />
                                    <h3 className="text-2xl font-semibold mb-2">No Live Preview Available</h3>
                                    <p className="text-lg">This template doesn't have a live demo URL</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Template Details - Modern Card Layout */}
                <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl p-8 md:p-12">
                    
                    {/* Header Section */}
                    <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-8 mb-12">
                        
                        {/* Left - Title & Description */}
                        <div className="flex-1">
                            <div className="flex items-center gap-4 mb-6">
                                <h1 className="text-4xl lg:text-5xl font-bold text-white leading-tight">
                                    {template.title || 'Untitled Template'}
                                </h1>
                                {template.featured && (
                                    <div className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white text-sm font-bold rounded-xl">
                                        ⭐ Featured
                                    </div>
                                )}
                            </div>
                            
                            <p className="text-xl lg:text-2xl text-gray-300 leading-relaxed mb-8">
                                {template.short_description || template.shortDescription || 'No description available'}
                            </p>

                            {/* Developer Info Card */}
                            <div className="bg-white/5 border border-white/10 rounded-2xl p-6 mb-8">
                                <div className="flex items-center justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-r from-purple-500 to-cyan-500 rounded-full flex items-center justify-center">
                                            <User className="w-6 h-6 text-white" />
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-semibold text-white">
                                                {template.developer_name || template.developerName || 'Unknown Developer'}
                                            </h3>
                                            <p className="text-gray-400">
                                                {template.developer_experience || template.developerExperience || '0'} years experience
                                            </p>
                                        </div>
                                    </div>
                                    {(template.is_available_for_dev || template.isAvailableForDev) && (
                                        <div className="flex items-center gap-2 bg-green-500/20 border border-green-500/30 px-3 py-2 rounded-lg">
                                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                                            <span className="text-sm text-green-400 font-medium">Available for hire</span>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="flex flex-wrap items-center gap-6 mb-8">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Heart className="w-5 h-5" />
                                    <span>{template.likes || template.total_likes || 0} likes</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <MessageCircle className="w-5 h-5" />
                                    <span>{template.comments_count || template.total_comments || 0} comments</span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Eye className="w-5 h-5" />
                                    <span>{template.views || 0} views</span>
                                </div>
                            </div>
                        </div>

                        {/* Right - Extension Download Card */}
                        <div className="lg:w-80">
                            <div className="bg-gradient-to-br from-purple-500/10 to-cyan-500/10 border border-purple-500/20 rounded-2xl p-8 sticky top-24">
                                <h3 className="text-2xl font-bold mb-6 text-center">Get Codemurf Extension</h3>
                                
                                <div className="text-center mb-8">
                                    <div className="text-3xl font-bold text-blue-400 mb-3">
                                        Free
                                    </div>
                                    <p className="text-gray-400 text-lg">Download this template with our VS Code extension</p>
                                </div>

                                {/* Extension Download Button */}
                                <motion.button
                                    className="w-full py-4 px-6 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 hover:shadow-2xl flex items-center justify-center gap-3 bg-gradient-to-r from-purple-500 to-cyan-500 text-white shadow-lg shadow-purple-500/25"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={() => window.open(
                                        'https://marketplace.visualstudio.com/items?itemName=AutoGenCodeBuilder.auto-gen-code-builder',
                                        '_blank'
                                    )}
                                >
                                    <Code className="w-6 h-6" />
                                    Get VS Code Extension
                                </motion.button>

                                {/* Action Buttons */}
                                <div className="flex gap-3 mt-6">
                                    {(template.git_repo_url || template.gitRepoUrl) && (
                                        <a
                                            href={template.git_repo_url || template.gitRepoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-gray-700/50 hover:bg-gray-600/50 text-white rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <Github className="w-5 h-5" />
                                            Code
                                        </a>
                                    )}
                                    {(template.live_demo_url || template.liveDemoUrl) && (
                                        <a
                                            href={template.live_demo_url || template.liveDemoUrl}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex-1 flex items-center justify-center gap-2 px-4 py-3 bg-blue-600/50 hover:bg-blue-500/50 text-white rounded-xl transition-all duration-300 hover:scale-105"
                                        >
                                            <ExternalLink className="w-5 h-5" />
                                            Demo
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Technical Specifications */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12">
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <Code className="w-8 h-8 text-blue-400 mx-auto mb-3" />
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Category</h4>
                            <span className="text-white font-semibold text-lg">{template.category || 'Uncategorized'}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <div className="w-8 h-8 mx-auto mb-3 flex items-center justify-center">
                                <div className={`w-6 h-6 rounded-full ${
                                    (template.difficulty_level || template.difficultyLevel) === 'Easy' ? 'bg-green-400' :
                                    (template.difficulty_level || template.difficultyLevel) === 'Medium' ? 'bg-yellow-400' : 'bg-red-400'
                                }`}></div>
                            </div>
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Difficulty</h4>
                            <span className="text-white font-semibold text-lg">{template.difficulty_level || template.difficultyLevel || 'Easy'}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <Globe className="w-8 h-8 text-purple-400 mx-auto mb-3" />
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Technology</h4>
                            <span className="text-white font-semibold text-lg">{template.language || 'Not specified'}</span>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-center">
                            <Star className="w-8 h-8 text-yellow-400 mx-auto mb-3" />
                            <h4 className="text-sm font-medium text-gray-400 mb-2">Type</h4>
                            <span className="text-white font-semibold text-lg">{template.type || 'Template'}</span>
                        </div>
                    </div>

                    {/* Dependencies */}
                    {template.dependencies && template.dependencies.length > 0 && (
                        <div className="mb-12">
                            <h3 className="text-2xl font-bold mb-6">Dependencies</h3>
                            <div className="flex flex-wrap gap-3">
                                {template.dependencies.map((dep, index) => (
                                    <span
                                        key={index}
                                        className="px-4 py-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-500/30 text-blue-300 rounded-xl text-sm font-medium"
                                    >
                                        {dep}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Full Description */}
                    <div>
                        <h2 className="text-3xl font-bold mb-6">About This Template</h2>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
                            <p className="text-gray-300 text-lg leading-relaxed">
                                {template.full_description || template.fullDescription || template.short_description || template.shortDescription || 'No detailed description available for this template.'}
                            </p>
                        </div>
                    </div>
                </div>

                {/* Comments Section */}
                <div className="mt-16">
                    <CommentSystem 
                        itemId={templateId}
                        itemType="template"
                        itemTitle={template?.title}
                    />
                </div>
            </div>
        </div>
        </ComponentErrorBoundary>
    );
};

export default TemplateDetailPage;
