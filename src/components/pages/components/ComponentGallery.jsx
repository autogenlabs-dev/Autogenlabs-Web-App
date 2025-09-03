'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Grid3X3, List, Star, Download, Eye, Heart, Code, Filter, Trash2, Edit, MessageSquare } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { marketplaceApi } from '../../../lib/marketplaceApi';
import { useAuth } from '../../../contexts/AuthContext';
import { useNotification } from '../../../contexts/NotificationContext';
import LiveComponentPreview from '../../ui/LiveComponentPreview';

const ComponentGallery = () => {
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification();
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
  const [showFilters, setShowFilters] = useState(false);
  const [expandedPreview, setExpandedPreview] = useState(null);
  const [showMyContent, setShowMyContent] = useState(false);

  // Check if user can create components (developer or admin)
  const canCreateComponents = user?.role === 'developer' || user?.role === 'admin';
  
  // Check if user can see My Components section (developer or admin)
  const canSeeMyComponents = user?.role === 'developer' || user?.role === 'admin';
  
  // Helper function to check if edit/delete icons should be shown
  const shouldShowEditDelete = (component) => {
    const isAdmin = user?.role === 'admin';
    const isDeveloper = user?.role === 'developer';
    const isUser = user?.role === 'user' || !user?.role;
    
    // Users can never edit/delete
    if (isUser) return false;
    
    // Admin can edit/delete any component
    if (isAdmin) return true;
    
    // Developer can only edit/delete their own components if not approved
    if (isDeveloper) {
      const componentUserId = component.user_id || component.userId || component.creator_id;
      const currentUserId = user?.id || user?._id;
      const isOwnComponent = String(componentUserId) === String(currentUserId);
      const isApproved = component.status === 'approved' || component.approval_status === 'approved';
      
      // Developer can edit/delete own components only if not approved
      return isOwnComponent && !isApproved;
    }
    
    return false;
  };
  
  // Debug logging
  console.log('🔍 ComponentGallery Debug:', {
    user,
    userRole: user?.role,
    canCreateComponents,
    canSeeMyComponents,
    showMyContent,
    isAdmin: user?.role === 'admin',
    isDeveloper: user?.role === 'developer'
  });

  // Component categories
  const componentCategories = [
    'Navigation',
    'Layout',
    'Forms',
    'Buttons',
    'Cards',
    'Data Display',
    'User Interface',
    'Content',
    'Media',
    'Interactive',
    'Widgets',
    'Sections',
    'Animations',
    'Charts',
    'Tables',
    'Modals',
    'Headers',
    'Footers',
    'Other'
  ];

  // Simple fallback component for LivePreviewModal
  const LivePreviewModal = ({ isOpen, onClose, component }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
        <div className="bg-gray-800 p-6 rounded-lg max-w-2xl w-full mx-4" onClick={e => e.stopPropagation()}>
          <h3 className="text-xl font-bold text-white mb-4">{component?.title}</h3>
          <div className="bg-gradient-to-br from-blue-600/20 to-purple-600/20 h-64 flex items-center justify-center rounded-lg">
            <div className="text-center text-white/60">
              <Code className="w-12 h-12 mx-auto mb-2" />
              <p>Component Preview</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Close
          </button>
        </div>
      </div>
    );
  };

  // Live Component Preview Component - matches detail page logic
  const LiveComponentCard = ({ component, className = "" }) => {
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

    // Check for different possible code field names (like detail page)
    const hasCode = component?.code || component?.html || component?.content || component?.htmlCode;
    
    // Use live component preview if code is available (like detail page)
    if (hasCode) {
      try {
        return (
          <LiveComponentPreview
            component={component}
            width="100%"
            height="100%"
            className={className}
            theme="dark"
            showFallback={true}
            showExpandButton={false}
            onExpand={() => setExpandedPreview(component)}
          />
        );
      } catch (error) {
        console.error('Error rendering live preview:', error);
        // Fall through to static image logic
      }
    }

    // Check for preview images in different field name variations (like detail page)
    const previewImages = component?.previewImages || component?.preview_images;
    
    // Use first preview image if available
    if (previewImages && Array.isArray(previewImages) && previewImages.length > 0) {
      const imageSrc = previewImages[0];
      if (imageSrc) {
        return (
          <Image
            src={imageSrc}
            alt={component?.title || component?.name || 'Component Preview'}
            fill
            className={`${className} object-cover transition-all duration-700 group-hover:scale-110`}
            sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            onError={(e) => {
              e.target.src = getCategoryFallback(component.category);
            }}
          />
        );
      }
    }

    // Fallback to category image
    return (
      <Image
        src={getCategoryFallback(component.category)}
        alt={component?.title || component?.name || 'Component Preview'}
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
      console.log('🔍 Fetching components from API...');
      console.log('🔍 showMyContent:', showMyContent);
      console.log('🔍 canSeeMyComponents:', canSeeMyComponents);
      console.log('🔍 user:', user);
      
      let response;
      if (showMyContent && canSeeMyComponents) {
        console.log('🔍 Using getUserComponents endpoint');
        // Use dedicated endpoint for user's own components
        response = await marketplaceApi.getUserComponents({
          limit: 100,
          skip: 0
        });
      } else {
        console.log('🔍 Using getComponents endpoint');
        // Use main endpoint for all approved components
        response = await marketplaceApi.getComponents({
          limit: 100,
          sort_by: 'popular'
        });
      }
      
      console.log('✅ API Response:', response);
      console.log('📦 Components count:', response.components?.length || 0);
      
      setComponents(response.components || []);
      setFilteredComponents(response.components || []);
    } catch (err) {
      console.error('❌ Failed to fetch components:', err);
      setError('Failed to load components. Please try again.');
      setComponents([]);
      setFilteredComponents([]);
    } finally {
      setLoading(false);
    }
  };

  // Refetch when showMyContent changes
  useEffect(() => {
    if (mounted) {
      fetchComponents();
    }
  }, [showMyContent]);

  // Filter and sort components
  useEffect(() => {
    let filtered = components.filter(component => {
      // Handle different field name variations from backend
      const title = component.title || component.name || '';
      const description = component.shortDescription || component.short_description || component.description || '';
      const category = component.category || '';
      const difficulty = component.difficultyLevel || component.difficulty_level || '';
      const type = component.type || '';
      const planType = component.planType || component.plan_type || '';
      
      const matchesSearch = title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           description.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'All' || category === selectedCategory;
      const matchesDifficulty = selectedDifficulty === 'All' || difficulty === selectedDifficulty;
      const matchesType = selectedType === 'All' || type === selectedType;
      const matchesPlan = selectedPlan === 'All' || planType === selectedPlan;

      return matchesSearch && matchesCategory && matchesDifficulty && matchesType && matchesPlan;
    });

    // Sort components
    switch (sortBy) {
      case 'popular':
        filtered.sort((a, b) => (b.downloads || 0) - (a.downloads || 0));
        break;
      case 'rating':
        filtered.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'newest':
        filtered.sort((a, b) => new Date(b.createdAt || b.created_at || 0) - new Date(a.createdAt || a.created_at || 0));
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

  const handleDelete = async (componentId) => {
    if (!window.confirm('Are you sure you want to delete this component?')) {
      return;
    }

    try {
      await marketplaceApi.deleteComponent(componentId);
      // Refresh the components list
      fetchComponents();
      showSuccess('Component deleted successfully!');
    } catch (error) {
      console.error('Failed to delete component:', error);
      showError('Failed to delete component. Please try again.');
    }
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
          <div className="flex flex-col items-center justify-between mb-6 md:flex-row">
            <div className="text-center md:text-left mb-4 md:mb-0">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                {showMyContent ? 'My ' : ''}Component{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-cyan-400 bg-clip-text text-transparent">
                  Library
                </span>
              </h2>
              <p className="text-lg text-gray-400 max-w-2xl">
                {showMyContent 
                  ? 'Manage your submitted components and track their approval status'
                  : 'Discover our curated collection of beautiful, modern UI components with advanced filtering'
                }
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-3">
              {/* Components/My Components Toggle for Developers and Admins */}
              {canSeeMyComponents && (
                <div className="flex rounded-lg bg-white/10 p-1">
                  <button
                    onClick={() => setShowMyContent(false)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      !showMyContent 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    Components
                  </button>
                  <button
                    onClick={() => setShowMyContent(true)}
                    className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${
                      showMyContent 
                        ? 'bg-emerald-600 text-white' 
                        : 'text-gray-300 hover:text-white'
                    }`}
                  >
                    My Components
                  </button>
                </div>
              )}
              
              {/* Create Component Button - Only for Developers and Admins */}
              {canCreateComponents && (
                <Link href="/components/create">
                  <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                    </svg>
                    Create Component
                  </button>
                </Link>
              )}
            </div>
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
                  key={String(component.id || component._id)}
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
                    
                    {/* Component Info Overlay - Bottom - ONLY ICONS */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 z-10">
                      {shouldShowEditDelete(component) ? (
                        /* Show Edit/Delete icons for authorized users */
                        <div className="flex items-center justify-end gap-2">
                          {/* View Icon */}
                          <Link href={`/components/${String(component.id || component._id)}`}>
                            <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                          </Link>
                          {/* Edit Icon */}
                          <Link href={`/components/${String(component.id || component._id)}/edit`}>
                            <button className="p-3 bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                              <Edit className="w-5 h-5 text-blue-300" />
                            </button>
                          </Link>
                          {/* Delete Icon */}
                          <button 
                            onClick={() => handleDelete(component.id || component._id)}
                            className="p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5 text-red-300" />
                          </button>
                        </div>
                      ) : (
                        /* Show only View icon */
                        <div className="flex items-center justify-end">
                          {/* View Icon Only */}
                          <Link href={`/components/${String(component.id || component._id)}`}>
                            <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                          </Link>
                        </div>
                      )}
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
                key={String(component.id || component._id)}
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

                  {/* Action Icons for List View */}
                  <div className="flex-1 flex items-center justify-end">
                    <div className="flex items-center gap-2">
                      {shouldShowEditDelete(component) ? (
                        /* Show Edit/Delete icons for authorized users */
                        <>
                          {/* View Icon */}
                          <Link href={`/components/${String(component.id || component._id)}`}>
                            <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                              <Eye className="w-5 h-5 text-white" />
                            </button>
                          </Link>
                          {/* Edit Icon */}
                          <Link href={`/components/${String(component.id || component._id)}/edit`}>
                            <button className="p-3 bg-blue-500/20 hover:bg-blue-500/30 backdrop-blur-sm border border-blue-500/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                              <Edit className="w-5 h-5 text-blue-300" />
                            </button>
                          </Link>
                          {/* Delete Icon */}
                          <button 
                            onClick={() => handleDelete(component.id || component._id)}
                            className="p-3 bg-red-500/20 hover:bg-red-500/30 backdrop-blur-sm border border-red-500/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer"
                          >
                            <Trash2 className="w-5 h-5 text-red-300" />
                          </button>
                        </>
                      ) : (
                        /* Show only View icon */
                        <Link href={`/components/${String(component.id || component._id)}`}>
                          <button className="p-3 bg-white/20 hover:bg-white/30 backdrop-blur-sm border border-white/30 rounded-full transition-all duration-300 hover:scale-110 cursor-pointer">
                            <Eye className="w-5 h-5 text-white" />
                          </button>
                        </Link>
                      )}
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

