'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Grid3X3, List, SortDesc } from 'lucide-react';
import TemplateCard from '@/components/ui/TemplateCard';
import { templateCategories, difficultyLevels, planTypes } from '@/lib/templateData';
import { useAuth } from '@/contexts/AuthContext';
import { useTemplate } from '@/contexts/TemplateContext';

const TemplateListingSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedPlanType, setSelectedPlanType] = useState('All');
    const [sortBy, setSortBy] = useState('rating'); // rating, price, newest
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const [showFilters, setShowFilters] = useState(false);

    const { user, isAuthenticated } = useAuth();
    const { templates, loading, error } = useTemplate();

    // Filter and sort templates
    const filteredAndSortedTemplates = useMemo(() => {
        let filtered = templates.filter(template => {
            const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                (template.short_description || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.developer_name.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
            const matchesDifficulty = selectedDifficulty === 'All' || template.difficulty_level === selectedDifficulty;
            const matchesPlanType = selectedPlanType === 'All' || template.plan_type === selectedPlanType;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesPlanType;
        });

        // Sort templates
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return (b.rating || 0) - (a.rating || 0);
                case 'price':
                    return (a.pricing_inr || 0) - (b.pricing_inr || 0);
                case 'newest':
                    return new Date(b.created_at || 0) - new Date(a.created_at || 0);
                default:
                    return 0;
            }
        });

        // Premium templates should rank higher
        return filtered.sort((a, b) => {
            if (a.plan_type === 'Paid' && b.plan_type === 'Free') return -1;
            if (a.plan_type === 'Free' && b.plan_type === 'Paid') return 1;
            return 0;
        });
    }, [templates, searchTerm, selectedCategory, selectedDifficulty, selectedPlanType, sortBy]);

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1,
                duration: 0.6
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="py-20 px-6 md:px-8 bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <motion.h2
                        className="text-4xl md:text-5xl font-bold mb-6"
                        variants={itemVariants}
                    >
                        Explore Our{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Template Library
                        </span>
                    </motion.h2>
                    <motion.p
                        className="text-xl text-gray-400 max-w-3xl mx-auto"
                        variants={itemVariants}
                    >
                        Discover professionally crafted templates to accelerate your development process
                    </motion.p>
                </motion.div>

                {/* Controls */}
                <motion.div
                    className="mb-12"
                    variants={itemVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <div className="flex flex-col lg:flex-row gap-6 items-center justify-between mb-6">

                        {/* Search Bar */}
                        <div className="relative flex-1 max-w-md">
                            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search templates..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300"
                            />
                        </div>

                        {/* Right Controls */}
                        <div className="flex items-center gap-4">

                            {/* Developer Create Button */}
                            {user && user.role === userRoles.DEVELOPER && (
                                <motion.button
                                    className="px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 rounded-xl font-semibold text-white transition-all duration-300 hover:from-green-700 hover:to-emerald-700 hover:scale-105 shadow-lg hover:shadow-green-500/25 flex items-center gap-2"
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() => {
                                        // Navigate to create template form
                                        window.location.href = '/templates/create';
                                    }}
                                >
                                    <Plus className="w-5 h-5" />
                                    Create Template
                                </motion.button>
                            )}

                            {/* Filter Toggle */}
                            <button
                                onClick={() => setShowFilters(!showFilters)}
                                className={`p-3 rounded-xl border transition-all duration-300 flex items-center gap-2 ${showFilters
                                    ? 'bg-purple-500/20 text-purple-400 border-purple-500/30'
                                    : 'bg-white/10 text-gray-400 border-white/20 hover:bg-white/15'
                                    }`}
                            >
                                <Filter className="w-5 h-5" />
                                <span className="hidden sm:inline">Filters</span>
                            </button>

                            {/* View Mode Toggle */}
                            <div className="flex items-center bg-white/10 rounded-xl p-1">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'grid'
                                        ? 'bg-purple-500/30 text-purple-400'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 rounded-lg transition-all duration-300 ${viewMode === 'list'
                                        ? 'bg-purple-500/30 text-purple-400'
                                        : 'text-gray-400 hover:text-white'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Filters Panel */}
                    {showFilters && (
                        <motion.div
                            className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10"
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">

                                {/* Category Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Category</label>
                                    <select
                                        value={selectedCategory}
                                        onChange={(e) => setSelectedCategory(e.target.value)}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    >
                                        <option value="All" className="bg-gray-800">All Categories</option>
                                        {templateCategories.map(category => (
                                            <option key={category} value={category} className="bg-gray-800">
                                                {category}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Difficulty Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty</label>
                                    <select
                                        value={selectedDifficulty}
                                        onChange={(e) => setSelectedDifficulty(e.target.value)}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    >
                                        <option value="All" className="bg-gray-800">All Levels</option>
                                        {difficultyLevels.map(level => (
                                            <option key={level} value={level} className="bg-gray-800">
                                                {level}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Plan Type Filter */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Plan Type</label>
                                    <select
                                        value={selectedPlanType}
                                        onChange={(e) => setSelectedPlanType(e.target.value)}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    >
                                        <option value="All" className="bg-gray-800">All Plans</option>
                                        {planTypes.map(plan => (
                                            <option key={plan} value={plan} className="bg-gray-800">
                                                {plan}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Sort By */}
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">Sort By</label>
                                    <select
                                        value={sortBy}
                                        onChange={(e) => setSortBy(e.target.value)}
                                        className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    >
                                        <option value="rating" className="bg-gray-800">Highest Rated</option>
                                        <option value="price" className="bg-gray-800">Price: Low to High</option>
                                        <option value="newest" className="bg-gray-800">Newest First</option>
                                    </select>
                                </div>
                            </div>
                        </motion.div>
                    )}

                    {/* Results Count */}
                    <div className="flex items-center justify-between mt-6">
                        <p className="text-gray-400">
                            Showing {filteredAndSortedTemplates.length} templates
                        </p>
                    </div>
                </motion.div>

                {/* Templates Grid/List */}
                <motion.div
                    className={viewMode === 'grid' 
                        ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-6 mt-8"
                        : "space-y-4 mt-8"
                    }
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    {filteredAndSortedTemplates.map((template, index) => (
                        <motion.div
                            key={template.id}
                            variants={itemVariants}
                            whileHover={{ scale: viewMode === 'grid' ? 1.03 : 1 }}
                            className="group h-full"
                        >
                            {viewMode === 'grid' ? (
                                /* Modern Grid Card - Supahero.io Style */
                                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-purple-500/10 h-full flex flex-col group">
                                    
                                    {/* Preview Image */}
                                    <div className="relative aspect-[4/3] bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                                        {template.previewImages && template.previewImages.length > 0 ? (
                                            <img
                                                src={template.previewImages[0]}
                                                alt={template.title}
                                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110"
                                            />
                                        ) : (
                                            <div className="flex items-center justify-center h-full text-gray-500">
                                                <div className="w-12 h-12 opacity-50">📄</div>
                                            </div>
                                        )}
                                        
                                        {/* Status Badges */}
                                        <div className="absolute top-4 left-4 flex gap-2">
                                            {template.featured && (
                                                <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                                                    Featured
                                                </span>
                                            )}
                                            {template.popular && (
                                                <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                                                    Popular
                                                </span>
                                            )}
                                        </div>

                                        {/* Plan Type Badge */}
                                        <div className="absolute top-4 right-4">
                                            <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${
                                                template.planType === 'Free' 
                                                    ? 'bg-green-500/20 border border-green-500/50 text-green-400'
                                                    : 'bg-gradient-to-r from-purple-500 to-pink-500 text-white'
                                            }`}>
                                                {template.planType}
                                            </span>
                                        </div>

                                        {/* Hover Overlay */}
                                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                            <div className="flex items-center justify-center h-full">
                                                <div className="flex items-center gap-3 text-white">
                                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                                                    </svg>
                                                    <span className="text-sm font-medium">View Details</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Card Content */}
                                    <div className="p-6 flex-1 flex flex-col">
                                        {/* Title & Description */}
                                        <div className="mb-4 flex-1">
                                            <h3 className="font-bold text-lg text-white mb-2 group-hover:text-purple-400 transition-colors duration-300 line-clamp-2">
                                                {template.title}
                                            </h3>
                                            <p className="text-sm text-gray-400 line-clamp-2 leading-relaxed">
                                                {template.shortDescription}
                                            </p>
                                        </div>

                                        {/* Developer */}
                                        <div className="mb-4">
                                            <p className="text-xs text-gray-500">
                                                by <span className="text-purple-400 font-medium">{template.developerName}</span>
                                            </p>
                                        </div>

                                        {/* Stats */}
                                        <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                                            <div className="flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                                                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                                </svg>
                                                <span className="font-medium">{template.rating}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                                </svg>
                                                <span>{template.likes || 0}</span>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                                                </svg>
                                                <span>{template.downloads || 0}</span>
                                            </div>
                                        </div>

                                        {/* Tags */}
                                        <div className="flex gap-2 flex-wrap mb-4">
                                            <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${
                                                template.difficultyLevel === 'Beginner' ? 'border-green-500/30 bg-green-500/10 text-green-400' :
                                                template.difficultyLevel === 'Intermediate' ? 'border-yellow-500/30 bg-yellow-500/10 text-yellow-400' :
                                                'border-red-500/30 bg-red-500/10 text-red-400'
                                            }`}>
                                                {template.difficultyLevel}
                                            </span>
                                            <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-400">
                                                {template.category}
                                            </span>
                                        </div>

                                        {/* Price for Paid Templates */}
                                        {template.planType === 'Paid' && (
                                            <div className="mt-auto pt-4 border-t border-white/10">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-sm text-gray-400">Price</span>
                                                    <div className="text-right">
                                                        <div className="text-lg font-bold text-white">
                                                            ${template.pricingUSD || template.pricing_usd || 'N/A'}
                                                        </div>
                                                        <div className="text-xs text-gray-400">
                                                            ₹{template.pricingINR || template.pricing_inr || 'N/A'}
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            ) : (
                                /* List View */
                                <TemplateCard template={template} user={user} />
                            )}
                        </motion.div>
                    ))}
                </motion.div>

            </div>
        </section>
    );
};

export default TemplateListingSection;
