'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, Star, Download, Eye, Heart, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { templateApi } from '@/lib/apiTemplates';
import { templateCategories } from '@/lib/templateData';

const TemplateGallery = () => {
  const [mounted, setMounted] = useState(false);
  const [templates, setTemplates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPlan, setSelectedPlan] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredTemplates, setFilteredTemplates] = useState([]);

  useEffect(() => {
    setMounted(true);
    fetchTemplates();
  }, []);

  const fetchTemplates = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await templateApi.getAllTemplates({
        limit: 100
      });
      
      const transformedTemplates = response.templates.map(template => 
        templateApi.transformTemplateData(template)
      );
      
      setTemplates(transformedTemplates);
      setFilteredTemplates(transformedTemplates);
    } catch (err) {
      console.error('Failed to fetch templates:', err);
      setError(err.message);
      // Fallback to empty array
      setTemplates([]);
      setFilteredTemplates([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort templates
  useEffect(() => {
    let filtered = templates.filter(template => {
      const matchesSearch = template.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           template.shortDescription.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || template.category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || template.difficultyLevel === selectedDifficulty;
      const matchesType = selectedType === 'All' || template.type === selectedType;
      const matchesPlan = selectedPlan === 'All' || template.planType === selectedPlan;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesPlan;
    });

    // Sort templates
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

    setFilteredTemplates(filtered);
  }, [templates, searchTerm, selectedCategory, selectedDifficulty, selectedType, selectedPlan, sortBy]);

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

  // Generate varied heights like supahero.io - true masonry effect
  const getCardHeight = (index) => {
    const heights = [280, 320, 360, 400, 440, 300, 380, 350, 420, 310];
    return heights[index % heights.length];
  };

  // Prevent hydration mismatch
  if (!mounted) {
    return (
      <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gray-300 rounded-full animate-pulse mx-auto"></div>
            <p className="text-gray-400 mt-4">Loading templates...</p>
          </div>
        </div>
      </section>
    );
  }

  // Loading state
  if (loading) {
    return (
      <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto">
              <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
            </div>
            <p className="text-gray-400 mt-4">Loading templates...</p>
          </div>
        </div>
      </section>
    );
  }

  // Error state
  if (error) {
    return (
      <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white py-20">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center">
            <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
              <span className="text-red-400 text-2xl">⚠</span>
            </div>
            <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to load templates</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={fetchTemplates}
              className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
            >
              Try Again
            </button>
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
          <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Template{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Library
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                Discover our curated collection of beautiful, modern UI templates with advanced filtering
              </p>
            </div>
            
            {/* Create Template Button */}
            <Link href="/templates/create">
              <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Template
              </button>
            </Link>
          </div>
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
              placeholder="Search templates..."
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
              {templateCategories.map(category => (
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
            Showing {filteredTemplates.length} template{filteredTemplates.length !== 1 ? 's' : ''}
          </div>
        </motion.div>

        {/* Templates Layout - TRUE MASONRY using CSS Columns */}
        {viewMode === 'grid' ? (
          <div className="masonry-grid-container columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-0">
            {filteredTemplates.map((template, index) => {
              const cardHeight = getCardHeight(index);
              
              return (
                <motion.div
                  key={template.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group break-inside-avoid mb-6 inline-block w-full"
                >
                  <div 
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden cursor-pointer transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 group"
                    style={{ height: `${cardHeight}px` }}
                  >
                    
                    {/* Full Card Background Image */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      {(() => {
                        // Get fallback image based on category
                        const getCategoryImage = (category) => {
                          const categoryImageMap = {
                            'Navigation': '/components/navbar-preview.svg',
                            'Layout': '/components/sidebar-preview.svg',
                            'Forms': '/components/contact-form-preview.svg',
                            'Data Display': '/components/data-table-preview.svg',
                            'User Interface': '/components/modal-dialog-preview.svg',
                            'Content': '/components/pricing-cards-preview.svg',
                            'Media': '/components/image-gallery-preview.svg',
                            'Interactive': '/components/hero-section-preview.svg',
                            'Widgets': '/components/sidebar-preview.svg',
                            'Sections': '/components/hero-section-preview.svg'
                          };
                          return categoryImageMap[category] || '/components/navbar-preview.svg';
                        };

                        const imageSource = (template.previewImages && template.previewImages.length > 0) 
                          ? template.previewImages[0] 
                          : getCategoryImage(template.category);

                        return (
                          <Image
                            src={imageSource}
                            alt={template.title}
                            fill
                            className="object-cover transition-all duration-700 group-hover:scale-110"
                            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
                            onError={(e) => {
                              // Fallback to default image if original fails to load
                              e.target.src = '/components/navbar-preview.svg';
                            }}
                          />
                        );
                      })()}
                    </div>

                    {/* Dark Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                    
                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
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
                    <div className="absolute top-4 right-4 z-10">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${getPlanColor(template.planType)}`}>
                        {template.planType}
                      </span>
                    </div>

                    {/* View Details Button - Centered */}
                    <div className="absolute inset-0 flex items-center justify-center z-10">
                      <Link href={`/templates/${template.id}`}>
                        <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-105 transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100">
                          <Eye className="w-5 h-5 inline-block mr-2" />
                          View Details
                        </button>
                      </Link>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        ) : (
          /* List View */
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {filteredTemplates.map((template, index) => (
              <motion.div
                key={template.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <Link href={`/templates/${template.id}`} className="block">
                  <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden cursor-pointer transition-all duration-300 hover:bg-white/10 flex gap-6 p-6">
                    
                    {/* Template Preview */}
                    <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden w-48 h-32 flex-shrink-0 rounded-xl">
                      {(() => {
                        // Get fallback image based on category
                        const getCategoryImage = (category) => {
                          const categoryImageMap = {
                            'Navigation': '/components/navbar-preview.svg',
                            'Layout': '/components/sidebar-preview.svg',
                            'Forms': '/components/contact-form-preview.svg',
                            'Data Display': '/components/data-table-preview.svg',
                            'User Interface': '/components/modal-dialog-preview.svg',
                            'Content': '/components/pricing-cards-preview.svg',
                            'Media': '/components/image-gallery-preview.svg',
                            'Interactive': '/components/hero-section-preview.svg',
                            'Widgets': '/components/sidebar-preview.svg',
                            'Sections': '/components/hero-section-preview.svg'
                          };
                          return categoryImageMap[category] || '/components/navbar-preview.svg';
                        };

                        const imageSource = (template.previewImages && template.previewImages.length > 0) 
                          ? template.previewImages[0] 
                          : getCategoryImage(template.category);

                        return (
                          <Image
                            src={imageSource}
                            alt={template.title}
                            fill
                            className="object-cover transition-transform duration-300 group-hover:scale-110"
                            onError={(e) => {
                              // Fallback to default image if original fails to load
                              e.target.src = '/components/navbar-preview.svg';
                            }}
                          />
                        );
                      })()}
                    </div>

                    {/* Simplified Template Info - Only Basic Info */}
                    <div className="flex-1 flex items-center justify-between">
                      <div className="flex-1">
                        <h3 className="font-semibold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                          {template.title}
                        </h3>
                        <div className="flex items-center gap-3">
                          <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30">
                            {template.category}
                          </span>
                          <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPlanColor(template.planType)}`}>
                            {template.planType}
                          </span>
                        </div>
                      </div>
                      
                      {/* View Details Button */}
                      <div className="ml-6">
                        <button className="px-6 py-3 bg-white/20 backdrop-blur-md border border-white/30 text-white font-semibold rounded-full transition-all duration-300 hover:bg-white/30 hover:scale-105 flex items-center gap-2">
                          <Eye className="w-5 h-5" />
                          View Details
                        </button>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* No Results */}
        {filteredTemplates.length === 0 && (
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
            <h3 className="text-2xl font-bold text-white mb-4">No Templates Found</h3>
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

export default TemplateGallery;
