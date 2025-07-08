'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Star, Download, Eye, Heart, Code, ExternalLink, Filter } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { sampleComponents, componentCategories, getFeaturedComponents } from '@/lib/componentData';

const ComponentShowcase = () => {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [filteredComponents, setFilteredComponents] = useState(sampleComponents);
  const [hoveredComponent, setHoveredComponent] = useState(null);

  const handleCategoryFilter = (category) => {
    setSelectedCategory(category);
    if (category === 'All') {
      setFilteredComponents(sampleComponents);
    } else {
      setFilteredComponents(sampleComponents.filter(comp => comp.category === category));
    }
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
      transition: { duration: 0.6 }
    }
  };

  const cardVariants = {
    initial: { scale: 1 },
    hover: { 
      scale: 1.02,
      transition: { duration: 0.3, ease: "easeOut" }
    }
  };

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

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#09080D_0%,#0D0B12_100%)] text-white py-20">
      
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-40 left-1/5 w-64 h-64 bg-gradient-to-r from-blue-500/5 to-cyan-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-40 right-1/5 w-80 h-80 bg-gradient-to-r from-purple-500/5 to-pink-500/5 rounded-full blur-3xl" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
        
        {/* Section Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Featured{' '}
            <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
              Components
            </span>
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Discover our hand-picked collection of premium UI components
          </p>
        </motion.div>

        {/* Category Filter */}
        <motion.div
          className="flex flex-wrap justify-center gap-3 mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <button
            onClick={() => handleCategoryFilter('All')}
            className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
              selectedCategory === 'All'
                ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white border border-white/20'
            }`}
          >
            All Components
          </button>
          {componentCategories.map((category) => (
            <button
              key={category}
              onClick={() => handleCategoryFilter(category)}
              className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                selectedCategory === category
                  ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white shadow-lg'
                  : 'bg-white/10 text-gray-300 hover:bg-white/15 hover:text-white border border-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </motion.div>

        {/* Components Grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {filteredComponents.slice(0, 8).map((component) => (
            <motion.div
              key={component.id}
              variants={itemVariants}
              whileHover="hover"
              onMouseEnter={() => setHoveredComponent(component.id)}
              onMouseLeave={() => setHoveredComponent(null)}
              className="group"
            >
              <Link href={`/components/${component.id}`}>
                <motion.div
                  className="relative bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl overflow-hidden h-full cursor-pointer"
                  variants={cardVariants}
                  style={{
                    background: hoveredComponent === component.id 
                      ? `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`
                      : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                    backdropFilter: "blur(10px)",
                  }}
                >
                  
                  {/* Component Preview */}
                  <div className="relative h-48 bg-gradient-to-br from-gray-800 to-gray-900 overflow-hidden">
                    <Image
                      src={component.previewImages[0]}
                      alt={component.title}
                      fill
                      className="object-cover transition-transform duration-300 group-hover:scale-110"
                    />
                    
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                      <div className="flex gap-3">
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Eye className="w-5 h-5 text-white" />
                        </div>
                        <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                          <Code className="w-5 h-5 text-white" />
                        </div>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="absolute top-3 left-3 flex gap-2">
                      {component.featured && (
                        <span className="px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs font-semibold rounded-full">
                          Featured
                        </span>
                      )}
                      {component.popular && (
                        <span className="px-2 py-1 bg-gradient-to-r from-pink-500 to-red-500 text-white text-xs font-semibold rounded-full">
                          Popular
                        </span>
                      )}
                    </div>

                    <div className="absolute top-3 right-3">
                      <span className={`px-3 py-1 text-xs font-medium rounded-full border ${getPlanColor(component.planType)}`}>
                        {component.planType}
                      </span>
                    </div>
                  </div>

                  {/* Component Info */}
                  <div className="p-6">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="font-semibold text-lg text-white mb-1 group-hover:text-blue-400 transition-colors">
                          {component.title}
                        </h3>
                        <p className="text-sm text-gray-400 line-clamp-2">
                          {component.shortDescription}
                        </p>
                      </div>
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
                    <div className="flex items-center justify-between">
                      <div className="flex gap-2">
                        <span className={`px-2 py-1 text-xs font-medium rounded-full border ${getDifficultyColor(component.difficultyLevel)}`}>
                          {component.difficultyLevel}
                        </span>
                        <span className="px-2 py-1 text-xs font-medium rounded-full border border-blue-500/30 bg-blue-500/20 text-blue-400">
                          {component.type}
                        </span>
                      </div>

                      {/* Price */}
                      {component.planType === 'Paid' && (
                        <div className="text-right">
                          <div className="text-sm font-semibold text-white">
                            ${component.pricingUSD}
                          </div>
                          <div className="text-xs text-gray-400">
                            ₹{component.pricingINR}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Hover Effect Overlay */}
                  {hoveredComponent === component.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      style={{
                        background: `linear-gradient(135deg, 
                          rgba(59,130,246,0.1) 0%, 
                          rgba(147,197,253,0.05) 25%, 
                          transparent 50%, 
                          rgba(147,197,253,0.05) 75%, 
                          rgba(59,130,246,0.1) 100%)`
                      }}
                    />
                  )}
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Button */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/components">
            <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 flex items-center gap-2 mx-auto">
              View All Components
              <ExternalLink className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};

export default ComponentShowcase;
