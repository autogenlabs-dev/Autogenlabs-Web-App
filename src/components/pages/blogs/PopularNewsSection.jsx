'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Flame, ArrowRight, ChevronLeft, ChevronRight, Eye } from 'lucide-react';
import { formatDate, formatViews, blogCategories } from '../../../lib/blogData';
import Link from 'next/link';

const PopularNewsSection = ({ posts }) => {
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
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-red-500/20 to-orange-500/20 border border-red-500/30 rounded-full">
                <Flame size={16} className="text-red-400" />
                <span className="text-red-400 text-sm font-medium">POPULAR NEWS</span>
              </div>
            </div>
            
            <div className="flex items-center gap-4">
              <Link href="/blogs?sort=popular">
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

          {/* Horizontal Scrolling Cards */}
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
                        {/* Image */}
                        <div className="relative h-40 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                          
                          {/* View Count Badge */}
                          <div className="absolute top-3 right-3">
                            <div className="flex items-center gap-1 px-2 py-1 bg-black/60 backdrop-blur-sm rounded text-white text-xs">
                              <Eye size={12} />
                              <span>{formatViews(post.views)}</span>
                            </div>
                          </div>

                          {/* Category Badge */}
                          <div className="absolute bottom-3 left-3">
                            <span className="px-2 py-1 bg-red-600/80 backdrop-blur-sm text-white text-xs rounded">
                              {blogCategories.find(c => c.id === post.category)?.name}
                            </span>
                          </div>
                        </div>

                        {/* Content */}
                        <div className="p-4 flex flex-col h-40">
                          {/* Title */}
                          <h3 className="text-sm font-semibold text-white line-clamp-3 group-hover:text-red-300 transition-colors mb-3 flex-1">
                            {post.title}
                          </h3>

                          {/* Meta Info */}
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

                        {/* Hover Effect */}
                        <div className="absolute inset-0 bg-gradient-to-t from-red-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        
                        {/* Glassmorphism Shine Effect */}
                        <div
                          className="absolute inset-0 rounded-xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
                        ? 'bg-red-400 w-6' 
                        : 'bg-white/30 hover:bg-white/50'
                    }`}
                  />
                ))}
              </div>
            )}
          </motion.div>
        </motion.div>
      </div>

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

export default PopularNewsSection;
