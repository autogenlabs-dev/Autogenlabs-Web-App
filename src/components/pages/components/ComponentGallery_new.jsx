'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, SlidersHorizontal, Grid3X3, List, Star, Download, Eye, Heart, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import Masonry from 'react-masonry-css';
import { sampleComponents, componentCategories } from '@/lib/componentData';

const ComponentGallery = () => {
  const [mounted, setMounted] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPlan, setSelectedPlan] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredComponents, setFilteredComponents] = useState(sampleComponents);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Filter and sort components
  React.useEffect(() => {
    let filtered = sampleComponents.filter(component => {
      const matchesSearch = component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           component.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || component.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || component.difficultyLevel === selectedDifficulty;
      const matchesType = selectedType === 'All' || component.type === selectedType;
      const matchesPlan = selectedPlan === 'All' || component.planType === selectedPlan;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesPlan;
    });

    // Sort components
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => b.downloads - a.downloads);
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        break;
      case 'price':
        filtered.sort((a, b) => a.pricingUSD - b.pricingUSD);
        break;
      default:
        break;
    }

    setFilteredComponents(filtered);
  }, [searchTerm, selectedCategory, selectedDifficulty, selectedType, selectedPlan, sortBy]);

  const getDifficultyColor = (level) => {
    switch (level) {
      case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'Tough': return 'bg-red-500/20 text-red-400 border-red-500/30';
      default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    }
  };

  const getPlanColor = (planType) => {
    return planType === 'Free' 
      ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
      : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
  };

  // Generate random but consistent heights for masonry effect
  const getCardConfig = (index, componentId) => {
    const configs = [
      { image: 'aspect-[4/3]', minHeight: 'min-h-[400px]' },
      { image: 'aspect-[3/2]', minHeight: 'min-h-[480px]' },
      { image: 'aspect-[16/9]', minHeight: 'min-h-[420px]' },
      { image: 'aspect-[5/4]', minHeight: 'min-h-[500px]' },
      { image: 'aspect-[3/4]', minHeight: 'min-h-[550px]' },
      { image: 'aspect-[1/1]', minHeight: 'min-h-[450px]' },
    ];
    const seed = (componentId || index) % configs.length;
    return configs[seed];
  };

  // Masonry breakpoint configuration
  const breakpointCols = {
    default: 4,
    2048: 4,
    1536: 3,
    1024: 2,
    768: 1
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading components...</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white py-20">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Component{' '}
            <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
              Library
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our curated collection of beautiful, modern UI components with advanced filtering
          </p>
        </motion.div>

        {/* Search and Filters */}
        <motion.div
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          {/* Search Bar */}
          <div className="relative mb-6">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search components..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
            />
          </div>

          {/* Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4 mb-6">
            {/* Category Filter */}
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="All" className="bg-gray-800">All Categories</option>
              {componentCategories.map(category => (
                <option key={category} value={category} className="bg-gray-800">
                  {category}
                </option>
              ))}
            </select>

            {/* Difficulty Filter */}
            <select
              value={selectedDifficulty}
              onChange={(e) => setSelectedDifficulty(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="All" className="bg-gray-800">All Levels</option>
              <option value="Easy" className="bg-gray-800">Easy</option>
              <option value="Medium" className="bg-gray-800">Medium</option>
              <option value="Tough" className="bg-gray-800">Tough</option>
            </select>

            {/* Type Filter */}
            <select
              value={selectedType}
              onChange={(e) => setSelectedType(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="All" className="bg-gray-800">All Types</option>
              <option value="React" className="bg-gray-800">React</option>
              <option value="Vue" className="bg-gray-800">Vue</option>
              <option value="Angular" className="bg-gray-800">Angular</option>
              <option value="HTML/CSS" className="bg-gray-800">HTML/CSS</option>
            </select>

            {/* Plan Filter */}
            <select
              value={selectedPlan}
              onChange={(e) => setSelectedPlan(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="All" className="bg-gray-800">All Plans</option>
              <option value="Free" className="bg-gray-800">Free</option>
              <option value="Paid" className="bg-gray-800">Paid</option>
            </select>

            {/* Sort Filter */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
            >
              <option value="popular" className="bg-gray-800">Most Popular</option>
              <option value="rating" className="bg-gray-800">Highest Rated</option>
              <option value="newest" className="bg-gray-800">Newest</option>
              <option value="price" className="bg-gray-800">Price: Low to High</option>
            </select>

            {/* View Mode Toggle */}
            <div className="flex gap-2">
              <button
                onClick={() => setViewMode('grid')}
                className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'grid' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
                }`}
              >
                <Grid3X3 className="w-5 h-5 mx-auto" />
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`flex-1 p-3 rounded-xl transition-all duration-300 ${
                  viewMode === 'list' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-white/10 text-gray-400 hover:bg-white/15'
                }`}
              >
                <List className="w-5 h-5 mx-auto" />
              </button>
            </div>
          </div>

          {/* Results Count */}
          <div className="text-sm text-gray-400">
            Showing {filteredComponents.length} component{filteredComponents.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Components Grid/List */}
        {viewMode === 'grid' ? (
          <Masonry
            breakpointCols={breakpointCols}
            className="masonry-grid"
            columnClassName="masonry-grid-column"
          >
            {filteredComponents.map((component, index) => {
              const cardConfig = getCardConfig(index, component.id);
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  className="mb-6"
                >
                  <Link href={`/components/${component.id}`} className="block">
                    {/* Modern Masonry Card - Supahero.io Style */}
                    <div className={`relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 flex flex-col group ${cardConfig.minHeight}`}>
                      
                      {/* Preview Image with Dynamic Aspect Ratio */}
                      <div className={`relative ${cardConfig.image} bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden flex-shrink-0`}>
                        {component.previewImages && component.previewImages.length > 0 ? (
                          <Image
                            src={component.previewImages[0]}
                            alt={component.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                          />
                        ) : (
                          <div className="flex items-center justify-center h-full text-gray-500">
                            <Code className="w-12 h-12 opacity-50" />
                          </div>
                        )}
                        
                        {/* Status Badges */}
                        <div className="absolute top-4 left-4 flex gap-2">
                          {component.featured && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                              Featured
                            </span>
                          )}
                          {component.popular && (
                            <span className="px-3 py-1.5 bg-gradient-to-r from-pink-500 to-purple-600 text-white text-xs font-bold rounded-full shadow-lg backdrop-blur-sm">
                              Popular
                            </span>
                          )}
                        </div>

                        {/* Plan Type Badge */}
                        <div className="absolute top-4 right-4">
                          <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${getPlanColor(component.planType)}`}>
                            {component.planType}
                          </span>
                        </div>

                        {/* Hover Overlay */}
                        <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <div className="flex items-center justify-center h-full">
                            <div className="flex items-center gap-3 text-white">
                              <Eye className="w-5 h-5" />
                              <span className="text-sm font-medium">View Details</span>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Card Content - Flexible Height */}
                      <div className="p-6 flex-1 flex flex-col">
                        {/* Title & Description */}
                        <div className="mb-4 flex-1">
                          <h3 className="font-bold text-lg text-white mb-2 group-hover:text-emerald-400 transition-colors duration-300 line-clamp-2">
                            {component.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-3 leading-relaxed">
                            {component.shortDescription}
                          </p>
                        </div>

                        {/* Stats */}
                        <div className="flex items-center justify-between mb-4 text-xs text-gray-400">
                          <div className="flex items-center gap-1">
                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-current" />
                            <span className="font-medium">{component.rating}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Download className="w-3.5 h-3.5" />
                            <span>{component.downloads}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Heart className="w-3.5 h-3.5" />
                            <span>{component.likes}</span>
                          </div>
                        </div>

                        {/* Tags */}
                        <div className="flex gap-2 flex-wrap mb-4">
                          <span className={`px-2.5 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(component.difficultyLevel)}`}>
                            {component.difficultyLevel}
                          </span>
                          <span className="px-2.5 py-1 text-xs font-medium rounded-full border border-emerald-500/30 bg-emerald-500/10 text-emerald-400">
                            {component.type}
                          </span>
                        </div>

                        {/* Price for Paid Components */}
                        {component.planType === 'Paid' && (
                          <div className="mt-auto pt-4 border-t border-white/10">
                            <div className="flex items-center justify-between">
                              <span className="text-sm text-gray-400">Price</span>
                              <div className="text-right">
                                <div className="text-lg font-bold text-white">
                                  ${component.pricingUSD}
                                </div>
                                <div className="text-xs text-gray-400">
                                  ₹{component.pricingINR}
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </Masonry>
        ) : (
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="group"
              >
                <Link href={`/components/${component.id}`} className="block">
                  {/* List View */}
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/10 flex gap-6 p-6">
                    
                    {/* Component Preview */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden w-48 h-32 flex-shrink-0 rounded-xl">
                      {component.previewImages && component.previewImages.length > 0 ? (
                        <Image
                          src={component.previewImages[0]}
                          alt={component.title}
                          fill
                          className="object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                      ) : (
                        <div className="flex items-center justify-center h-full text-gray-500">
                          No Preview
                        </div>
                      )}
                    </div>

                    {/* Component Info */}
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors">
                            {component.title}
                          </h3>
                          <p className="text-sm text-gray-400 line-clamp-2">
                            {component.shortDescription}
                          </p>
                        </div>
                        {component.planType === 'Paid' && (
                          <div className="text-right ml-4">
                            <div className="text-lg font-semibold text-white">
                              ${component.pricingUSD}
                            </div>
                            <div className="text-sm text-gray-400">
                              ₹{component.pricingINR}
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-400">
                        <div className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-400 fill-current" />
                          <span>{component.rating}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Download className="w-4 h-4" />
                          <span>{component.downloads}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Heart className="w-4 h-4" />
                          <span>{component.likes}</span>
                        </div>
                      </div>

                      {/* Tags */}
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(component.difficultyLevel)}`}>
                          {component.difficultyLevel}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full border border-blue-500/30 bg-blue-500/20 text-blue-400">
                          {component.type}
                        </span>
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getPlanColor(component.planType)}`}>
                          {component.planType}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {filteredComponents.length === 0 && (
          <motion.div
            className="text-center py-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="w-24 h-24 bg-white/10 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-gray-400" />
            </div>
            <h3 className="text-2xl font-bold text-white mb-4">No Components Found</h3>
            <p className="text-gray-400 mb-8">Try adjusting your search criteria or filters</p>
            <button 
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('All');
                setSelectedDifficulty('All');
                setSelectedType('All');
                setSelectedPlan('All');
              }}
              className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
            >
              Clear All Filters
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
};

export default ComponentGallery;
