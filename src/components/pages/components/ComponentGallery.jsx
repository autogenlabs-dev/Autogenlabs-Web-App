'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, Star, Download, Eye, Heart, Code } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { componentApi } from '@/lib/componentApi';
import { componentCategories } from '@/lib/componentData';
import { generateDynamicPreview, generateComponentTypePreview } from '@/utils/dynamicPreviewGenerator';
import LiveComponentPreview from '@/components/ui/LiveComponentPreview';
import LivePreviewModal from '@/components/ui/LivePreviewModal';

const ComponentGallery = () => {
  const [mounted, setMounted] = useState(false);
  const [components, setComponents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedType, setSelectedType] = useState('All');
  const [selectedPlan, setSelectedPlan] = useState('All');
  const [sortBy, setSortBy] = useState('popular');
  const [viewMode, setViewMode] = useState('grid');
  const [filteredComponents, setFilteredComponents] = useState([]);
  const [previewCache, setPreviewCache] = useState({});
  const [expandedPreview, setExpandedPreview] = useState(null);

  // Live Component Preview Component - replaces static image previews
  const LiveComponentCard = ({ component, className = "" }) => {
    // Check for different possible code field names
    const hasCode = component.code || component.html || component.content || component.htmlCode;
    
    // If component has code, use live preview
    if (hasCode) {
      return (
        <LiveComponentPreview
          component={component}
          width="100%"
          height="100%"
          className={className}
          theme="dark"
          showFallback={true}
          showExpandButton={true}
          onExpand={() => setExpandedPreview(component)}
        />
      );
    }

    // Fallback to static preview image if no code
    const getCategoryFallback = (category) => {
      const fallbackMap = {
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
      return fallbackMap[category] || '/components/navbar-preview.svg';
    };

    // Check for existing preview images
    if (component.previewImages && component.previewImages.length > 0) {
      return (
        <Image
          src={component.previewImages[0]}
          alt={component.title}
          fill
          className={`${className} object-cover transition-all duration-700 group-hover:scale-110`}
          sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
          onError={(e) => {
            e.target.src = getCategoryFallback(component.category);
          }}
        />
      );
    }

    // Final fallback to category image
    return (
      <Image
        src={getCategoryFallback(component.category)}
        alt={component.title}
        fill
        className={`${className} object-cover transition-all duration-700 group-hover:scale-110`}
        sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
        onError={(e) => {
          e.target.src = '/components/navbar-preview.svg';
        }}
      />
    );
  };

  useEffect(() => {
    setMounted(true);
    fetchComponents();
    
    // Add window focus listener to refresh components when user returns to page
    const handleFocus = () => {
      fetchComponents();
    };
    
    window.addEventListener('focus', handleFocus);
    
    // Also listen for visibility change
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        fetchComponents();
      }
    };
    
    document.addEventListener('visibilitychange', handleVisibilityChange);
    
    return () => {
      window.removeEventListener('focus', handleFocus);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const fetchComponents = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await componentApi.getComponents();
      
      const transformedComponents = response.components.map(component => 
        componentApi.transformComponentData(component)
      );
      
      setComponents(transformedComponents);
      setFilteredComponents(transformedComponents);
    } catch (err) {
      setError(err.message);
      // Fallback to empty array
      setComponents([]);
      setFilteredComponents([]);
    } finally {
      setLoading(false);
    }
  };

  // Filter and sort components
  useEffect(() => {
    let filtered = components.filter(component => {
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
  }, [components, searchTerm, selectedCategory, selectedDifficulty, selectedType, selectedPlan, sortBy]);

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
            <p className="text-gray-400 mt-4">Loading components...</p>
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
            <p className="text-gray-400 mt-4">Loading components...</p>
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
            <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to load components</h3>
            <p className="text-gray-400 mb-4">{error}</p>
            <button 
              onClick={fetchComponents}
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
        </motion.div>        {/* Components Layout - TRUE MASONRY using CSS Columns */}
        {viewMode === 'grid' ? (
          <div className="masonry-grid-container columns-1 md:columns-2 lg:columns-3 xl:columns-4 gap-6 space-y-0">
            {filteredComponents.map((component, index) => {
              const cardHeight = getCardHeight(index);
              
              return (
                <motion.div
                  key={component.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ duration: 0.6, delay: (index % 8) * 0.1 }}
                  whileHover={{ scale: 1.02, y: -5 }}
                  className="group break-inside-avoid mb-6 inline-block w-full"
                >
                  <div 
                    className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-3xl overflow-hidden transition-all duration-500 hover:bg-white/10 hover:border-white/20 hover:shadow-2xl hover:shadow-blue-500/10 group"
                    style={{ height: `${cardHeight}px` }}
                  >
                    
                    {/* Full Card Background Preview */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                      <LiveComponentCard 
                        component={component}
                        className="absolute inset-0 w-full h-full"
                      />
                    </div>

                    {/* Dark Overlay for Better Text Visibility */}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/60 transition-all duration-300"></div>
                    
                    {/* Status Badges */}
                    <div className="absolute top-4 left-4 flex gap-2 z-10">
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

                    {/* Plan Type Badge - Left Side */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className={`px-3 py-1.5 text-xs font-bold rounded-full backdrop-blur-sm shadow-lg ${getPlanColor(component.planType)}`}>
                        {component.planType}
                      </span>
                    </div>

                    {/* Clickable View Icon - Top Right */}
                    <div className="absolute top-4 right-4 z-20">
                      <Link href={`/components/${component.id}`}>
                        <button className="p-2 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                          <Eye className="w-4 h-4 text-white" />
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
            {filteredComponents.map((component, index) => (
              <motion.div
                key={component.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                whileHover={{ scale: 1.01 }}
                className="group"
              >
                <div className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden transition-all duration-300 hover:bg-white/10 flex gap-6 p-6">
                  
                  {/* Component Preview */}
                  <div className="relative bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden w-48 h-32 flex-shrink-0 rounded-xl">
                    <LiveComponentCard 
                      component={component}
                      className="w-full h-full"
                    />
                  </div>

                  {/* Simplified Component Info - Only Basic Info */}
                  <div className="flex-1 flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-xl text-white mb-2 group-hover:text-blue-400 transition-colors">
                        {component.title}
                      </h3>
                      <div className="flex items-center gap-3">
                        <span className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30">
                          {component.category}
                        </span>
                        <span className={`px-3 py-1 text-sm font-medium rounded-full border ${getPlanColor(component.planType)}`}>
                          {component.planType}
                        </span>
                      </div>
                    </div>
                    
                    {/* Clickable View Icon */}
                    <div className="ml-6">
                      <Link href={`/components/${component.id}`}>
                        <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                          <Eye className="w-5 h-5 text-white" />
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
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

      {/* Live Preview Modal */}
      <LivePreviewModal
        isOpen={!!expandedPreview}
        onClose={() => setExpandedPreview(null)}
        component={expandedPreview}
      />
    </section>
  );
};

export default ComponentGallery;
