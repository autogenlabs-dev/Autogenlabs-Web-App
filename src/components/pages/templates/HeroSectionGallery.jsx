'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Star, Play, Eye, Search, Filter, Plus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { getInitialTemplates, getLoadMoreTemplates, templateCategories, difficultyLevels, planTypes, userRoles, mockUser, sampleTemplates } from '@/lib/templateData';
import VideoPreviewModal from '@/components/ui/VideoPreviewModal';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(false);
  const [hasIntersected, setHasIntersected] = useState(false);
  const elementRef = useRef(null);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        if (entry.isIntersecting && !hasIntersected) {
          setHasIntersected(true);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '50px',
        ...options,
      }
    );

    observer.observe(element);

    return () => {
      observer.unobserve(element);
    };
  }, [hasIntersected, options]);

  return { elementRef, isIntersecting, hasIntersected };
};

// Lazy loaded template card component
const LazyTemplateCard = ({ template, index, onVideoPreview }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px',
  });
  const router = useRouter();
  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);

  const handleImageLoad = () => {
    setImageLoaded(true);
  };
  const handleImageError = () => {
    setImageError(true);
  };

  const handleVideoPreview = (e) => {
    console.log('Video button clicked, preventing default navigation');
    e.preventDefault();
    e.stopPropagation();
    onVideoPreview(template);
  };

  const handleCardClick = (e) => {
    // Check if the click is on the video preview button or its children
    const videoButton = e.target.closest('[data-video-preview="true"]');
    if (videoButton) {
      console.log('Click detected on video button, preventing navigation');
      return; // Don't navigate if video preview button was clicked
    }
    console.log('Navigating to template detail page');
    // Navigate to template detail page using Next.js router
    router.push(`/templates/${template.id}`);
  };

  return (
    <motion.div
      ref={elementRef}
      className="relative group cursor-pointer h-full"
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      layout
      onClick={handleCardClick}
    >
      {/* Template Card */}
      <div className="relative w-full h-80 rounded-3xl overflow-hidden border border-white/10 group-hover:border-white/30 transition-all duration-300">        {/* Video Preview Icon */}
        {template.videoPreview && (
          <button
            data-video-preview="true"
            onClick={handleVideoPreview}
            className="absolute top-4 right-4 z-30 w-10 h-10 bg-black/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/90 transition-colors"
            title="Preview Video"
          >
            <Play size={16} className="text-white fill-white ml-0.5" />
          </button>
        )}

        {/* Rating Badge */}
        {template.rating && (
          <div className="absolute top-4 left-4 z-20">
            <div className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {template.rating}
            </div>
          </div>
        )}

        {/* Loading Placeholder */}
        {!hasIntersected && (
          <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
            <div className="w-12 h-12 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
          </div>
        )}

        {/* Image Error Placeholder */}
        {imageError && hasIntersected && (
          <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
            <div className="text-gray-400 text-center">
              <div className="w-12 h-12 mx-auto mb-2 bg-gray-600 rounded-lg flex items-center justify-center">
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                </svg>
              </div>
              <p className="text-sm">Failed to load</p>
            </div>
          </div>
        )}

        {/* Actual Image */}
        {hasIntersected && !imageError && (
          <>
            {/* Loading overlay */}
            {!imageLoaded && (
              <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center z-10">
                <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
              </div>
            )}

            <Image
              src={template.previewImage}
              alt={template.title}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
              className={`object-cover transition-all duration-500 group-hover:scale-105 ${imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              priority={index < 4}
              quality={85}
              placeholder="blur"
              blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
            />
          </>
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end z-20">
          <div className="p-6 w-full">
            <div className="flex items-center justify-between mb-2">
              <h3 className="text-white font-semibold text-lg">
                {template.title}
              </h3>
              <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                <Eye size={16} className="text-white" />
              </div>
            </div>
            <p className="text-gray-300 text-sm mb-2">{template.category}</p>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Star size={14} className="fill-yellow-400 text-yellow-400" />
                <span className="text-white text-sm">{template.rating}</span>
                <span className="text-gray-400">({template.totalRatings})</span>
              </div>
              <span className="text-purple-400 font-medium">
                {template.planType === 'Free' ? 'Free' : `₹${template.pricing.inr}`}
              </span>
            </div>
          </div>
        </div>          {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-10" />
      </div>
    </motion.div>
  );
};

const HeroSectionsGallery = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const [selectedPlanType, setSelectedPlanType] = useState('All');
  const [sortBy, setSortBy] = useState('rating');
  const [displayedTemplates, setDisplayedTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  // Mock user for Create Template button
  const user = mockUser;

  // Initialize with first 12 templates
  useEffect(() => {
    const initialTemplates = getInitialTemplates();
    setDisplayedTemplates(initialTemplates);
    setHasMore(initialTemplates.length === 12);
  }, []);

  // Filter and sort templates
  const filteredAndSortedTemplates = React.useMemo(() => {
    let filtered = displayedTemplates.filter(template => {
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
          return b.id - a.id;
        default:
          return 0;
      }
    });

    return filtered;
  }, [displayedTemplates, searchTerm, selectedCategory, selectedDifficulty, selectedPlanType, sortBy]);

  // Load more templates
  const loadMoreTemplates = async () => {
    setLoading(true);

    // Simulate loading delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    const moreTemplates = getLoadMoreTemplates(displayedTemplates.length);
    if (moreTemplates.length > 0) {
      setDisplayedTemplates(prev => [...prev, ...moreTemplates]);
      setHasMore(moreTemplates.length === 12);
    } else {
      setHasMore(false);
    }

    setLoading(false);
  };
  // Handle video preview
  const handleVideoPreview = (template) => {
    console.log('Video preview clicked for template:', template.title);
    setSelectedTemplate(template);
    setIsVideoModalOpen(true);
  };

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

        {/* Grid pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="w-full h-full" style={{
            backgroundImage: `
              linear-gradient(rgba(139,92,246,0.3) 1px, transparent 1px),
              linear-gradient(90deg, rgba(139,92,246,0.3) 1px, transparent 1px)
            `,
            backgroundSize: '60px 60px'
          }} />
        </div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        {/* Section Header */}
        <motion.div
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
            Hero sections
          </h2>          {/* Search and Filter Bar */}
          <div className="flex flex-col gap-6 mb-8">
            {/* Search Bar */}
            <div className="relative max-w-md">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-2xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 focus:bg-white/15 transition-all duration-300 backdrop-blur-sm"
              />
            </div>

            {/* Modern Filter Pills */}
            <div className="space-y-4">
              {/* Category Pills */}
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-300">Categories</label>
                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => setSelectedCategory('All')}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === 'All'
                        ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                        : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                      }`}
                  >
                    All
                  </button>
                  {templateCategories.map(category => (
                    <button
                      key={category}
                      onClick={() => setSelectedCategory(category)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${selectedCategory === category
                          ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-lg shadow-purple-500/25'
                          : 'bg-white/10 text-gray-300 hover:bg-white/20 hover:text-white border border-white/20'
                        }`}
                    >
                      {category}
                    </button>
                  ))}
                </div>
              </div>

              {/* Quick Filters Row */}
              <div className="flex flex-wrap items-center gap-4">
                {/* Difficulty Pills */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400">Difficulty:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedDifficulty('All')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${selectedDifficulty === 'All'
                          ? 'bg-cyan-600 text-white'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                      All
                    </button>
                    {difficultyLevels.map(level => (
                      <button
                        key={level}
                        onClick={() => setSelectedDifficulty(level)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${selectedDifficulty === level
                            ? level === 'Easy' ? 'bg-green-600 text-white' :
                              level === 'Medium' ? 'bg-yellow-600 text-white' :
                                'bg-red-600 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                          }`}
                      >
                        {level}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Plan Type Pills */}
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium text-gray-400">Plan:</span>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedPlanType('All')}
                      className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${selectedPlanType === 'All'
                          ? 'bg-indigo-600 text-white'
                          : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                        }`}
                    >
                      All
                    </button>
                    {planTypes.map(type => (
                      <button
                        key={type}
                        onClick={() => setSelectedPlanType(type)}
                        className={`px-3 py-1 rounded-full text-xs font-medium transition-all duration-300 ${selectedPlanType === type
                            ? type === 'Free' ? 'bg-green-600 text-white' : 'bg-orange-600 text-white'
                            : 'bg-white/10 text-gray-400 hover:bg-white/20 hover:text-white'
                          }`}
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Sort Dropdown - Modern Style */}
                <div className="flex items-center gap-2 ml-auto">
                  <span className="text-sm font-medium text-gray-400">Sort:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="px-3 py-1 bg-white/10 border border-white/20 rounded-full text-white text-xs focus:outline-none focus:border-purple-500/50 transition-all duration-300 cursor-pointer hover:bg-white/20"
                  >
                    <option value="rating" className="bg-gray-800 text-white">⭐ Highest Rated</option>
                    <option value="price" className="bg-gray-800 text-white">💰 Price: Low to High</option>
                    <option value="newest" className="bg-gray-800 text-white">🆕 Newest First</option>
                  </select>
                </div>

                {/* Create Template Button - Only for developers */}
                {user.isLoggedIn && user.role === userRoles.DEVELOPER && (
                  <Link href="/templates/create">
                    <motion.button
                      className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-full transition-all duration-300 shadow-lg hover:shadow-green-500/25 text-sm"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Plus size={16} />
                      Create Template
                    </motion.button>
                  </Link>
                )}
              </div>
            </div>
          </div></motion.div>        {/* Templates Grid */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 auto-rows-fr"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence mode="popLayout">
            {filteredAndSortedTemplates.map((template, index) => (
              <LazyTemplateCard
                key={template.id}
                template={template}
                index={index}
                onVideoPreview={handleVideoPreview}
              />
            ))}
          </AnimatePresence>
        </motion.div>        {/* Load more button */}
        {(hasMore || loading) && (
          <motion.div
            className="text-center mt-16"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: false }}
          >
            <motion.button
              onClick={loadMoreTemplates}
              disabled={loading}
              className="px-8 py-4 bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 rounded-xl text-white font-medium transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-3 mx-auto"
              whileHover={{ scale: loading ? 1 : 1.02 }}
              whileTap={{ scale: loading ? 1 : 0.98 }}
            >
              {loading && (
                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              )}
              {loading ? 'Loading...' : 'Load more templates'}
            </motion.button>
          </motion.div>
        )}
      </div>

      {/* Video Preview Modal */}
      <VideoPreviewModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        template={selectedTemplate}
      />
    </section>
  );
};

export default HeroSectionsGallery;