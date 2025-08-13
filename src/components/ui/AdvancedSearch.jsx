/**
 * Advanced Search Component
 * Enhanced search with filters, sorting, and real-time results
 */

'use client';
import React, { useState, useEffect, useRef } from 'react';
import { Search, Filter, X, SlidersHorizontal, ChevronDown, Star, Download, IndianRupee, Calendar } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { marketplaceApi } from '@/lib/marketplaceApi';
import { useRouter } from 'next/navigation';

const AdvancedSearch = ({ onResults, placeholder = "Search templates and components...", initialType = 'all' }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [isSearching, setIsSearching] = useState(false);
    const [showFilters, setShowFilters] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [results, setResults] = useState([]);
    const [filters, setFilters] = useState({
        type: initialType, // 'all', 'template', 'component'
        category: '',
        priceRange: 'all', // 'all', 'free', 'premium', 'custom'
        customPriceMin: '',
        customPriceMax: '',
        rating: 0,
        sortBy: 'relevance', // 'relevance', 'popular', 'newest', 'price_low', 'price_high', 'rating'
        difficulty: '',
        tags: []
    });
    
    const searchRef = useRef(null);
    const resultsRef = useRef(null);
    const router = useRouter();

    // Categories for different content types
    const categories = {
        template: ['Landing Page', 'Dashboard', 'E-commerce', 'Portfolio', 'Blog', 'Admin Panel', 'SaaS'],
        component: ['Navigation', 'Forms', 'Cards', 'Buttons', 'Modals', 'Data Display', 'Layout'],
        all: ['Landing Page', 'Dashboard', 'Navigation', 'Forms', 'Cards', 'E-commerce', 'Portfolio']
    };

    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const sortOptions = [
        { value: 'relevance', label: 'Most Relevant' },
        { value: 'popular', label: 'Most Popular' },
        { value: 'newest', label: 'Newest First' },
        { value: 'rating', label: 'Highest Rated' },
        { value: 'price_low', label: 'Price: Low to High' },
        { value: 'price_high', label: 'Price: High to Low' }
    ];

    // Debounced search effect
    useEffect(() => {
        const delayedSearch = setTimeout(() => {
            if (searchTerm.trim().length > 0) {
                performSearch();
            } else {
                setResults([]);
                setShowResults(false);
            }
        }, 300);

        return () => clearTimeout(delayedSearch);
    }, [searchTerm, filters]);

    // Close results when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                searchRef.current && 
                !searchRef.current.contains(event.target) &&
                resultsRef.current &&
                !resultsRef.current.contains(event.target)
            ) {
                setShowResults(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const performSearch = async () => {
        if (!searchTerm.trim()) return;

        try {
            setIsSearching(true);
            
            // Build search parameters
            const searchParams = {
                q: searchTerm,
                limit: 20,
                sort_by: filters.sortBy === 'relevance' ? 'popular' : filters.sortBy
            };

            // Add filters
            if (filters.category) searchParams.category = filters.category;
            if (filters.difficulty) searchParams.difficulty = filters.difficulty;
            if (filters.rating > 0) searchParams.min_rating = filters.rating;

            // Price filtering
            if (filters.priceRange === 'free') {
                searchParams.price_max = 0;
            } else if (filters.priceRange === 'premium') {
                searchParams.price_min = 1;
            } else if (filters.priceRange === 'custom') {
                if (filters.customPriceMin) searchParams.price_min = parseInt(filters.customPriceMin);
                if (filters.customPriceMax) searchParams.price_max = parseInt(filters.customPriceMax);
            }

            let searchResults = [];

            // Search based on type
            if (filters.type === 'all' || filters.type === 'template') {
                const templateResults = await marketplaceApi.searchTemplates(searchParams);
                searchResults = [...searchResults, ...(templateResults.templates || []).map(item => ({ ...item, type: 'template' }))];
            }

            if (filters.type === 'all' || filters.type === 'component') {
                const componentResults = await marketplaceApi.searchComponents(searchParams);
                searchResults = [...searchResults, ...(componentResults.components || []).map(item => ({ ...item, type: 'component' }))];
            }

            // Sort results if needed
            if (filters.sortBy === 'relevance') {
                // Simple relevance scoring based on title match
                searchResults.sort((a, b) => {
                    const aScore = a.title.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 1;
                    const bScore = b.title.toLowerCase().includes(searchTerm.toLowerCase()) ? 2 : 1;
                    return bScore - aScore;
                });
            }

            setResults(searchResults.slice(0, 10)); // Limit display results
            setShowResults(true);
            
            // Call parent callback if provided
            if (onResults) {
                onResults(searchResults);
            }

        } catch (error) {
            console.error('Search failed:', error);
            setResults([]);
        } finally {
            setIsSearching(false);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({
            ...prev,
            [key]: value
        }));
    };

    const clearFilters = () => {
        setFilters({
            type: initialType,
            category: '',
            priceRange: 'all',
            customPriceMin: '',
            customPriceMax: '',
            rating: 0,
            sortBy: 'relevance',
            difficulty: '',
            tags: []
        });
    };

    const hasActiveFilters = () => {
        return filters.category || 
               filters.priceRange !== 'all' || 
               filters.rating > 0 || 
               filters.difficulty ||
               filters.sortBy !== 'relevance';
    };

    const navigateToItem = (item) => {
        const path = item.type === 'template' ? `/templates/${item.id}` : `/components/${item.id}`;
        router.push(path);
        setShowResults(false);
    };

    const formatPrice = (price) => {
        return price === 0 ? 'Free' : `₹${price}`;
    };

    return (
        <div className="relative w-full max-w-4xl mx-auto">
            {/* Search Input */}
            <div ref={searchRef} className="relative">
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                        type="text"
                        placeholder={placeholder}
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onFocus={() => searchTerm && setShowResults(true)}
                        className="w-full bg-white/10 border border-white/20 rounded-xl pl-12 pr-20 py-4 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20"
                    />
                    
                    {/* Filter Toggle & Search Button */}
                    <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-2">
                        <button
                            onClick={() => setShowFilters(!showFilters)}
                            className={`p-2 rounded-lg transition-colors ${
                                hasActiveFilters() || showFilters
                                    ? 'bg-blue-600 text-white'
                                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                            }`}
                        >
                            <SlidersHorizontal className="w-4 h-4" />
                        </button>
                        
                        {isSearching && (
                            <div className="w-8 h-8 border-2 border-blue-500/20 border-t-blue-500 rounded-full animate-spin"></div>
                        )}
                    </div>
                </div>

                {/* Active Filters Display */}
                {hasActiveFilters() && (
                    <div className="mt-2 flex flex-wrap gap-2">
                        {filters.category && (
                            <span className="px-2 py-1 bg-blue-600 text-white text-xs rounded-full flex items-center">
                                {filters.category}
                                <button
                                    onClick={() => handleFilterChange('category', '')}
                                    className="ml-1 hover:bg-blue-700 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.priceRange !== 'all' && (
                            <span className="px-2 py-1 bg-green-600 text-white text-xs rounded-full flex items-center">
                                {filters.priceRange === 'free' ? 'Free' : 
                                 filters.priceRange === 'premium' ? 'Premium' : 'Custom Price'}
                                <button
                                    onClick={() => handleFilterChange('priceRange', 'all')}
                                    className="ml-1 hover:bg-green-700 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        {filters.rating > 0 && (
                            <span className="px-2 py-1 bg-yellow-600 text-white text-xs rounded-full flex items-center">
                                {filters.rating}+ Stars
                                <button
                                    onClick={() => handleFilterChange('rating', 0)}
                                    className="ml-1 hover:bg-yellow-700 rounded-full p-0.5"
                                >
                                    <X className="w-3 h-3" />
                                </button>
                            </span>
                        )}
                        <button
                            onClick={clearFilters}
                            className="px-2 py-1 bg-red-600 hover:bg-red-700 text-white text-xs rounded-full"
                        >
                            Clear All
                        </button>
                    </div>
                )}
            </div>

            {/* Advanced Filters Panel */}
            <AnimatePresence>
                {showFilters && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-20 mt-2 w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-2xl"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {/* Content Type */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Content Type</label>
                                <select
                                    value={filters.type}
                                    onChange={(e) => handleFilterChange('type', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="all">All Types</option>
                                    <option value="template">Templates</option>
                                    <option value="component">Components</option>
                                </select>
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Category</label>
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="">All Categories</option>
                                    {categories[filters.type === 'all' ? 'all' : filters.type].map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Price Range */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Price Range</label>
                                <select
                                    value={filters.priceRange}
                                    onChange={(e) => handleFilterChange('priceRange', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="all">All Prices</option>
                                    <option value="free">Free</option>
                                    <option value="premium">Premium</option>
                                    <option value="custom">Custom Range</option>
                                </select>
                                
                                {filters.priceRange === 'custom' && (
                                    <div className="mt-2 flex space-x-2">
                                        <input
                                            type="number"
                                            placeholder="Min ₹"
                                            value={filters.customPriceMin}
                                            onChange={(e) => handleFilterChange('customPriceMin', e.target.value)}
                                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                                        />
                                        <input
                                            type="number"
                                            placeholder="Max ₹"
                                            value={filters.customPriceMax}
                                            onChange={(e) => handleFilterChange('customPriceMax', e.target.value)}
                                            className="flex-1 bg-gray-800 border border-gray-600 rounded px-2 py-1 text-white text-sm"
                                        />
                                    </div>
                                )}
                            </div>

                            {/* Rating */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Minimum Rating</label>
                                <div className="flex space-x-1">
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <button
                                            key={star}
                                            onClick={() => handleFilterChange('rating', star === filters.rating ? 0 : star)}
                                            className="focus:outline-none"
                                        >
                                            <Star
                                                className={`w-6 h-6 transition-colors ${
                                                    star <= filters.rating
                                                        ? 'text-yellow-400 fill-current'
                                                        : 'text-gray-400'
                                                }`}
                                            />
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Difficulty */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Difficulty</label>
                                <select
                                    value={filters.difficulty}
                                    onChange={(e) => handleFilterChange('difficulty', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    <option value="">All Levels</option>
                                    {difficulties.map(diff => (
                                        <option key={diff} value={diff}>{diff}</option>
                                    ))}
                                </select>
                            </div>

                            {/* Sort By */}
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Sort By</label>
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-3 py-2 text-white"
                                >
                                    {sortOptions.map(option => (
                                        <option key={option.value} value={option.value}>
                                            {option.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        {/* Filter Actions */}
                        <div className="mt-6 flex justify-between">
                            <button
                                onClick={clearFilters}
                                className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
                            >
                                Clear All Filters
                            </button>
                            <button
                                onClick={() => setShowFilters(false)}
                                className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                            >
                                Apply Filters
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Search Results Dropdown */}
            <AnimatePresence>
                {showResults && results.length > 0 && (
                    <motion.div
                        ref={resultsRef}
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute z-30 mt-2 w-full bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl shadow-2xl max-h-96 overflow-y-auto"
                    >
                        {results.map((item, index) => (
                            <button
                                key={`${item.type}-${item.id}`}
                                onClick={() => navigateToItem(item)}
                                className="w-full p-4 hover:bg-white/10 transition-colors border-b border-white/10 last:border-b-0 text-left"
                            >
                                <div className="flex items-center space-x-4">
                                    {/* Item Preview */}
                                    <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg flex items-center justify-center flex-shrink-0">
                                        <span className="text-white font-bold">
                                            {item.title.charAt(0).toUpperCase()}
                                        </span>
                                    </div>

                                    {/* Item Details */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center space-x-2 mb-1">
                                            <h4 className="text-white font-medium truncate">{item.title}</h4>
                                            <span className={`px-2 py-0.5 text-xs rounded-full ${
                                                item.type === 'template' 
                                                    ? 'bg-green-500/20 text-green-400'
                                                    : 'bg-blue-500/20 text-blue-400'
                                            }`}>
                                                {item.type}
                                            </span>
                                        </div>
                                        
                                        <div className="flex items-center space-x-4 text-sm text-gray-400">
                                            <span>{item.category}</span>
                                            <div className="flex items-center">
                                                <Star className="w-3 h-3 text-yellow-400 mr-1" />
                                                {item.average_rating || 0}
                                            </div>
                                            <div className="flex items-center">
                                                <Download className="w-3 h-3 mr-1" />
                                                {item.download_count || 0}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="text-right">
                                        <span className={`font-medium ${
                                            (item.price_inr || item.pricing_inr) === 0 
                                                ? 'text-green-400' 
                                                : 'text-blue-400'
                                        }`}>
                                            {formatPrice(item.price_inr || item.pricing_inr || 0)}
                                        </span>
                                    </div>
                                </div>
                            </button>
                        ))}

                        {results.length >= 10 && (
                            <div className="p-4 text-center border-t border-white/10">
                                <button
                                    onClick={() => {
                                        // Navigate to full search results page
                                        router.push(`/search?q=${encodeURIComponent(searchTerm)}`);
                                        setShowResults(false);
                                    }}
                                    className="text-blue-400 hover:text-blue-300 text-sm font-medium"
                                >
                                    View all results →
                                </button>
                            </div>
                        )}
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default AdvancedSearch;
