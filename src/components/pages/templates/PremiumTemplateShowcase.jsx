'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Star, Eye, Download, IndianRupee, DollarSign, Play, Heart, Trash2, Edit } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useTemplate } from '@/contexts/TemplateContext';
import { useAuth } from '@/contexts/AuthContext';
import SimpleModal from '@/components/ui/SimpleModal';

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
const LazyTemplateCard = ({ template, index, onVideoPreview, isOwner = false, onEdit, onDelete }) => {
  const { elementRef, hasIntersected } = useIntersectionObserver({
    threshold: 0.1,
    rootMargin: '100px', // Start loading 100px before the element is visible
  });

  const [imageLoaded, setImageLoaded] = useState(false);
  const [imageError, setImageError] = useState(false);
  const { toggleTemplateLike } = useTemplate();
  const { user } = useAuth();

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleVideoPreview = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onVideoPreview(template);
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) return;
    
    try {
      await toggleTemplateLike(template.id);
    } catch (error) {
      console.error('Failed to like template:', error);
    }
  };

  const handleEdit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onEdit && onEdit(template);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    e.stopPropagation();
    onDelete && onDelete(template);
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  // Get the first preview image
  const previewImage = template.previewImages && template.previewImages.length > 0 
    ? template.previewImages[0] 
    : template.preview_image || 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop';

  return (
    <motion.div
      ref={elementRef}
      className="relative group cursor-pointer"
      variants={itemVariants}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
    >
      {/* Template Card */}
      <div
        className="relative rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-300 group-hover:shadow-purple-500/20 group-hover:border-purple-500/30 h-[380px] flex flex-col"
        style={{
          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
          backdropFilter: 'blur(20px)',
        }}
      >
        {/* Top Row - Badges */}
        <div className="absolute top-4 left-4 right-4 z-30 flex items-start justify-between">
          {/* Rating Badge */}
          {template.rating && (
            <div className="px-2 py-1 bg-black/60 backdrop-blur-sm text-white text-xs font-medium rounded-full flex items-center gap-1 shadow-lg">
              <Star size={12} className="fill-yellow-400 text-yellow-400" />
              {template.rating}
            </div>
          )}

          {/* Right side badges */}
          <div className="flex items-center gap-2">
            {/* Owner Actions */}
            {isOwner && (
              <>
                <button
                  onClick={handleEdit}
                  className="w-8 h-8 bg-blue-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-blue-600/80 transition-colors shadow-lg"
                  title="Edit template"
                >
                  <Edit size={14} className="text-white" />
                </button>
                <button
                  onClick={handleDelete}
                  className="w-8 h-8 bg-red-500/80 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-red-600/80 transition-colors shadow-lg"
                  title="Delete template"
                >
                  <Trash2 size={14} className="text-white" />
                </button>
              </>
            )}

            {/* Video Preview Icon */}
            {template.videoPreview && (
              <button
                onClick={handleVideoPreview}
                className="w-8 h-8 bg-black/60 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-black/80 transition-colors shadow-lg"
              >
                <Play size={14} className="text-white fill-white ml-0.5" />
              </button>
            )}

            {/* Premium Badge */}
            {template.planType === 'Paid' && (
              <div className="px-3 py-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-bold rounded-full shadow-lg">
                Premium
              </div>
            )}
          </div>
        </div>

        {/* Template Preview Image Container */}
        <div className="relative h-40 overflow-hidden flex-shrink-0">
          {/* Loading Placeholder */}
          {!hasIntersected && (
            <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
              <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
            </div>
          )}

          {/* Image Error Placeholder */}
          {imageError && hasIntersected && (
            <div className="w-full h-full bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center">
              <div className="text-gray-400 text-center">
                <div className="w-8 h-8 mx-auto mb-1 bg-gray-600 rounded-lg flex items-center justify-center">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z" clipRule="evenodd" />
                  </svg>
                </div>
                <p className="text-xs">Failed to load</p>
              </div>
            </div>
          )}

          {/* Actual Image */}
          {hasIntersected && !imageError && (
            <>
              {/* Loading overlay */}
              {!imageLoaded && (
                <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50 flex items-center justify-center z-10">
                  <div className="w-6 h-6 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin"></div>
                </div>
              )}
              <Image
                src={previewImage}
                alt={template.title}
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                className={`object-cover transition-all duration-300 group-hover:scale-105 ${
                  imageLoaded ? 'opacity-100' : 'opacity-0'
                }`}
                onLoad={handleImageLoad}
                onError={handleImageError}
                priority={index < 2} // Prioritize first 2 images
                quality={85}
                placeholder="blur"
                blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
              />

              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
            </>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3 flex-1 flex flex-col">
          <h3 className="text-sm font-bold text-white leading-tight line-clamp-2">
            {template.title}
          </h3>
          <p className="text-gray-400 text-xs leading-relaxed flex-1 line-clamp-4">
            {template.shortDescription || template.short_description}
          </p>

          {/* Stats and Actions */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Rating */}
              <div className="flex items-center gap-1">
                <Star size={12} className="fill-yellow-400 text-yellow-400" />
                <span className="text-xs text-gray-300">{template.rating || 0}</span>
              </div>
              
              {/* Likes */}
              <button 
                onClick={handleLike}
                className={`flex items-center gap-1 hover:text-red-400 transition-colors ${
                  template.liked ? 'text-red-400' : 'text-gray-400'
                }`}
              >
                <Heart size={12} className={template.liked ? 'fill-current' : ''} />
                <span className="text-xs">{template.likes || 0}</span>
              </button>
              
              {/* Downloads */}
              <div className="flex items-center gap-1 text-gray-400">
                <Download size={12} />
                <span className="text-xs">{template.downloads || 0}</span>
              </div>
            </div>
            
            <div className="text-xs text-purple-400 font-medium">
              {template.planType === 'Free' || template.plan_type === 'Free' 
                ? 'Free' 
                : `₹${template.pricingINR || template.pricing_inr || 0}`
              }
            </div>
          </div>

          {/* Action Button */}
          <Link href={`/templates/${template.id}`}>
            <button className="text-purple-400 hover:text-purple-300 font-medium text-xs transition-colors self-start">
              View Template →
            </button>
          </Link>
        </div>

        {/* Glassmorphism Shine Effect */}
        <div
          className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          style={{
            background: `linear-gradient(135deg,
              rgba(255,255,255,0.1) 0%,
              rgba(255,255,255,0.05) 25%,
              transparent 50%,
              rgba(255,255,255,0.05) 75%,
              rgba(255,255,255,0.1) 100%)`
          }}
        />
      </div>
    </motion.div>
  );
};

const PremiumTemplateShowcase = ({ showMyTemplates = false }) => {
  const { templates, myTemplates, loading, updateFilters } = useTemplate();
  const { user } = useAuth();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isTemplateModalOpen, setIsTemplateModalOpen] = useState(false);
  const [templateModalMode, setTemplateModalMode] = useState('create');
  const [editingTemplate, setEditingTemplate] = useState(null);

  // Choose which templates to show
  const displayTemplates = showMyTemplates ? (myTemplates || []) : (templates || []);
  
  // Filter for premium templates if not showing user templates
  const premiumTemplates = showMyTemplates 
    ? displayTemplates 
    : displayTemplates.filter(template => 
        (template.rating && template.rating >= 4.7) || template.featured
      ).slice(0, 4); // Show only 4 highly rated templates

  // Handle video preview
  const handleVideoPreview = (template) => {
    setSelectedTemplate(template);
    setIsVideoModalOpen(true);
  };

  // Handle template edit
  const handleEdit = (template) => {
    setEditingTemplate(template);
    setTemplateModalMode('edit');
    setIsTemplateModalOpen(true);
  };

  // Handle template delete
  const handleDelete = (template) => {
    setEditingTemplate(template);
    setTemplateModalMode('delete');
    setIsTemplateModalOpen(true);
  };

  // Handle create new template
  const handleCreateTemplate = () => {
    setEditingTemplate(null);
    setTemplateModalMode('create');
    setIsTemplateModalOpen(true);
  };

  // Close template modal
  const closeTemplateModal = () => {
    setIsTemplateModalOpen(false);
    setEditingTemplate(null);
  };

  useEffect(() => {
    // We don't need to update filters here since we're filtering on the frontend
    // The templates are already loaded by the TemplateContext
  }, [showMyTemplates]);

  // Partner/Technology logos
  const partners = [
    {
      name: "CloudBlox",
      description: "Ultimate infrastructure UI kit and prebuilt templates for developers",
      icon: "🔷"
    },
    {
      name: "DeployHub",
      description: "Deployment automation, CI/CD pipelines & Infrastructure Assets",
      icon: "🚀"
    },
    {
      name: "ScaleVault",
      description: "Build Better Infrastructure with Auto-scaling Feedback",
      icon: "⚡"
    },
    {
      name: "DevForge",
      description: "Learn Infrastructure Design and How to Build Scalable Applications",
      icon: "🔨"
    },
    {
      name: "AutoGen",
      description: "The AI platform for intelligent infrastructure management",
      icon: "🤖"
    },
    {
      name: "CloudSync",
      description: "Infrastructure management, get 20% off for 3 months",
      icon: "☁️"
    }
  ];

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

  if (loading && premiumTemplates.length === 0) {
    return (
      <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden">
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <div className="text-center text-white">
            <div className="w-8 h-8 border-2 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
            <p>Loading templates...</p>
          </div>
        </div>
      </section>
    );
  }

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
          className="mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
                {showMyTemplates ? 'My Templates' : 'Premium infrastructure sections'}
              </h2>
              {showMyTemplates && (
                <p className="text-gray-400 text-lg">
                  Manage and edit your created templates
                </p>
              )}
            </div>
            {showMyTemplates && (
              <button
                onClick={handleCreateTemplate}
                className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white font-semibold rounded-lg transition-all duration-300 flex items-center gap-2 shadow-lg hover:shadow-purple-500/25"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
                Create Template
              </button>
            )}
          </div>
        </motion.div>

        {/* Template Cards Grid */}
        {premiumTemplates.length > 0 ? (
          <motion.div
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false }}
          >
            {premiumTemplates.map((template, index) => (
              <LazyTemplateCard
                key={template.id}
                template={template}
                index={index}
                onVideoPreview={handleVideoPreview}
                isOwner={showMyTemplates && user && template.userId === user.id}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </motion.div>
        ) : (
          <div className="text-center text-gray-400 py-20">
            <p className="text-lg">
              {showMyTemplates ? 'No templates created yet.' : 'No premium templates available.'}
            </p>
            {showMyTemplates && (
              <button 
                onClick={handleCreateTemplate}
                className="inline-block mt-4 px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Create Your First Template
              </button>
            )}
          </div>
        )}

        {/* Partners/Technologies Section - Only show for public templates */}
        {!showMyTemplates && (
          <motion.div
            className="border-t border-white/10 pt-16"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: false }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {partners.map((partner, index) => (
                <motion.div
                  key={index}
                  className="flex items-start gap-4 group cursor-pointer"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.1 }}
                  viewport={{ once: false }}
                  whileHover={{ x: 5 }}
                >
                  {/* Partner Icon */}
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-purple-600/20 to-cyan-600/20 border border-white/10 flex items-center justify-center flex-shrink-0 group-hover:border-purple-500/30 transition-all duration-300">
                    <span className="text-xl">{partner.icon}</span>
                  </div>

                  {/* Partner Info */}
                  <div className="space-y-1">
                    <h4 className="text-white font-semibold group-hover:text-purple-400 transition-colors">
                      {partner.name}
                    </h4>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {partner.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </div>

      {/* Video Preview Modal */}
      <SimpleModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        title="Video Preview"
      >
        <div className="text-white">
          <p>Video preview for: {selectedTemplate?.title}</p>
          <div className="mt-4 p-4 bg-gray-800 rounded">
            Video player will be implemented here
          </div>
        </div>
      </SimpleModal>

      {/* Template CRUD Modal */}
      <SimpleModal
        isOpen={isTemplateModalOpen}
        onClose={closeTemplateModal}
        title={templateModalMode === 'create' ? 'Create Template' : templateModalMode === 'edit' ? 'Edit Template' : 'Delete Template'}
      >
        <div className="text-white">
          <p>Template {templateModalMode} functionality will be implemented here</p>
          <div className="mt-4 p-4 bg-gray-800 rounded">
            Form for template {templateModalMode} will be here
          </div>
        </div>
      </SimpleModal>

      {/* CSS for text truncation */}
      <style jsx>{`
        .line-clamp-2 {
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
        
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .line-clamp-4 {
          display: -webkit-box;
          -webkit-line-clamp: 4;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default PremiumTemplateShowcase;