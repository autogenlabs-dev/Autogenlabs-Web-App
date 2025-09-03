'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Award, ArrowRight, ChevronLeft, ChevronRight, Heart, Star } from 'lucide-react';
import { formatDate, formatViews, blogCategories } from '../../../lib/blogData';
import Link from 'next/link';

const BestOfMonthSection = ({ posts }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(posts.length / itemsPerPage);

  if (!posts || posts.length === 0) return null;

  const currentPosts = posts.slice(currentIndex * itemsPerPage, (currentIndex + 1) * itemsPerPage);

  const nextPage = () => {
    setCurrentIndex((prev) => (prev + 1) % totalPages);
  };

  const prevPage = () => {
    setCurrentIndex((prev) => (prev - 1 + totalPages) % totalPages);
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
      transition: { duration: 0.5 }
    }
  };

  return (
    <section className="relative py-16">
      <div className="max-w-7xl mx-auto">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {/* Section Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center justify-between mb-8"
          >
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-full">
                <Award size={16} className="text-yellow-400" />
                <span className="text-yellow-400 text-sm font-medium">BEST OF THE MONTH</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/blogs?sort=best">
                <motion.button
                  className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                  whileHover={{ x: 5 }}
                >
                  View more
                  <ArrowRight size={16} />
                </motion.button>
              </Link>

              {/* Navigation Arrows */}
              {totalPages > 1 && (
                <div className="flex items-center gap-2">
                  <motion.button
                    onClick={prevPage}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronLeft size={16} className="text-white" />
                  </motion.button>
                  <motion.button
                    onClick={nextPage}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 border border-white/20 flex items-center justify-center transition-all duration-300"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <ChevronRight size={16} className="text-white" />
                  </motion.button>
                </div>
              )}
            </div>
          </motion.div>

          {/* Horizontal Cards Grid */}
          <motion.div
            variants={itemVariants}
            className="relative"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {currentPosts.map((post, index) => (
                <motion.div
                  key={`${post.id}-${currentIndex}`}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blogs/${post.slug}`}>
                    <motion.article
                      className="group cursor-pointer h-full"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="relative rounded-xl border border-white/20 overflow-hidden h-80"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        {/* Best Badge */}
                        <div className="absolute top-3 left-3 z-10">
                          <div className="flex items-center gap-1 px-2 py-1 bg-gradient-to-r from-yellow-500 to-orange-500 rounded text-white text-xs font-medium">
                            <Star size={12} fill="currentColor" />
                            <span>#{index + 1}</span>
                          </div>
                        </div>

                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                          
                          {/* Likes Badge */}
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs">
                              <Heart size={12} className="text-red-400" fill="currentColor" />
                              <span>{post.likes}</span>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2 py-1 bg-yellow-600/80 backdrop-blur-sm text-white text-xs rounded">
                              {blogCategories.find(c => c.id === post.category)?.name}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col h-40">
                          {/* Title */}
                          <h3 className="text-sm font-semibold text-white line-clamp-3 group-hover:text-yellow-300 transition-colors mb-3 flex-1">
                            {post.title}
                          </h3>

                          {/* Stats */}
                          <div className="flex items-center justify-between mb-2 text-xs">
                            <div className="flex items-center gap-3">
                              <div className="flex items-center gap-1 text-red-400">
                                <Heart size={12} />
                                <span>{post.likes}</span>
                              </div>
                              <div className="flex items-center gap-1 text-gray-400">
                                <span>{formatViews(post.views)} views</span>
                              </div>
                            </div>
                          </div>

                          {/* Author and Date */}
                          <div className="space-y-2 mt-auto">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-5 h-5 rounded-full"
                              />
                              <span className="text-gray-400 text-xs truncate">{post.author.name}</span>
                            </div>
                            
                            <div className="flex items-center justify-between text-xs">
                              <span className="text-gray-500">{formatDate(post.publishedAt)}</span>
                              <span className="text-gray-400">{post.readTime}</span>
                            </div>
                          </div>
                        </div>

                        {/* Golden Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-yellow-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Glassmorphism Shine Effect */}
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          style={{
                            background: `linear-gradient(135deg,
                              rgba(255,215,0,0.1) 0%,
                              rgba(255,215,0,0.05) 25%,
                              transparent 50%,
                              rgba(255,215,0,0.05) 75%,
                              rgba(255,215,0,0.1) 100%)`
                          }}
                        />

                        {/* Trophy Animation on Hover */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-20 transition-all duration-300">
                          <motion.div
                            initial={{ scale: 0, rotate: -30 }}
                            whileHover={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Award size={48} className="text-yellow-400" />
                          </motion.div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </div>

            {/* Page Indicators */}
            {totalPages > 1 && (
              <div className="flex items-center justify-center gap-2 mt-6">
                {Array.from({ length: totalPages }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      i === currentIndex 
                        ? 'bg-yellow-400 w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

      {/* Custom CSS for line-clamp */}
      <style jsx>{`
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }
      `}</style>
    </section>
  );
};

export default BestOfMonthSection;
