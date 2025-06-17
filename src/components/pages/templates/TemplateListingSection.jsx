'use client';
import React, { useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Plus, Grid3X3, List, SortDesc } from 'lucide-react';
import TemplateCard from '@/components/ui/TemplateCard';
import { sampleTemplates, templateCategories, difficultyLevels, planTypes, userRoles, mockUser } from '@/lib/templateData';

const TemplateListingSection = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [selectedDifficulty, setSelectedDifficulty] = useState('All');
    const [selectedPlanType, setSelectedPlanType] = useState('All');
    const [sortBy, setSortBy] = useState('rating'); // rating, price, newest
    const [viewMode, setViewMode] = useState('grid'); // grid, list
    const [showFilters, setShowFilters] = useState(false);

    // Mock user - in real app, this would come from context/props
    const user = mockUser;

    // Filter and sort templates
    const filteredAndSortedTemplates = useMemo(() => {
        let filtered = sampleTemplates.filter(template => {
            const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
                template.developerName.toLowerCase().includes(searchTerm.toLowerCase());

            const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
            const matchesDifficulty = selectedDifficulty === 'All' || template.difficultyLevel === selectedDifficulty;
            const matchesPlanType = selectedPlanType === 'All' || template.planType === selectedPlanType;

            return matchesSearch && matchesCategory && matchesDifficulty && matchesPlanType;
        });

        // Sort templates
        filtered.sort((a, b) => {
            switch (sortBy) {
                case 'rating':
                    return b.rating - a.rating;
                case 'price':
                    return a.pricing.inr - b.pricing.inr;
                case 'newest':
                    return b.id - a.id; // Using ID as proxy for newest
                default:
                    return 0;
            }
        });

        // Premium templates should rank higher
        return filtered.sort((a, b) => {
            if (a.planType === 'Paid' && b.planType === 'Free') return -1;
            if (a.planType === 'Free' && b.planType === 'Paid') return 1;
            return 0;
        });
    }, [searchTerm, selectedCategory, selectedDifficulty, selectedPlanType, sortBy]);

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
                            {user.role === userRoles.DEVELOPER && (
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

                    {/* Results Count */}                    <div className="flex items-center justify-between mt-6">
                        <p className="text-gray-400">
                            Showing {filteredAndSortedTemplates.length} templates
                        </p>
                    </div>
                </motion.div>

            </div>
        </section>
    );
};

export default TemplateListingSection;
