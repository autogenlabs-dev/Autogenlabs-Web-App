'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, User, Eye, Heart } from 'lucide-react';
import { formatDate, formatViews, blogCategories } from '../../../lib/blogData';
import Link from 'next/link';

const BlogHero = ({ post }) => {
  if (!post) return null;

  const category = blogCategories.find(c => c.id === post.category);

  return (
    <section className="relative w-full py-16 px-6 md:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Featured Badge */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mb-6"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
              <div className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              <span className="text-orange-400 text-sm font-medium">FEATURED NEWS</span>
            </div>
          </motion.div>

          {/* Main Hero Content */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            
            {/* Left Content */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="space-y-6"
            >
              {/* Meta Information */}
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <span 
                    className={`px-3 py-1 rounded-full text-white bg-gradient-to-r ${category?.color}`}
                  >
                    {category?.name}
                  </span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Clock size={14} />
                  <span>{post.readTime}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-400">
                  <Eye size={14} />
                  <span>{formatViews(post.views)}</span>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              <p className="text-lg text-gray-300 leading-relaxed">
                {post.excerpt}
              </p>

              {/* Author and Date */}
              <div className="flex items-center justify-between pt-4 border-t border-white/10">
                <div className="flex items-center gap-3">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-10 h-10 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <p className="text-white font-medium">{post.author.name}</p>
                    <p className="text-gray-400 text-sm">{post.author.role}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-gray-400 text-sm">{formatDate(post.publishedAt)}</p>
                  <div className="flex items-center gap-2 mt-1">
                    <div className="flex items-center gap-1 text-gray-400">
                      <Heart size={14} />
                      <span className="text-sm">{post.likes}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Read Article Button */}
              <Link href={`/blogs/${post.slug}`}>
                <motion.button
                  className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 rounded-xl font-semibold transition-all duration-300"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Read article
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </motion.button>
              </Link>
            </motion.div>

            {/* Right Image */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="relative"
            >
              <div
                className="relative rounded-3xl overflow-hidden border border-white/20 shadow-2xl"
                style={{
                  background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Main Image */}
                <div className="relative h-80 md:h-96 overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-full object-cover"
                  />
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                  
                  {/* Floating Author Badge */}
                  <div className="absolute bottom-4 left-4">
                    <div
                      className="flex items-center gap-3 px-4 py-2 rounded-xl border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0.6) 100%)`,
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-8 h-8 rounded-full"
                      />
                      <div>
                        <p className="text-white text-sm font-medium">{post.author.name}</p>
                        <p className="text-gray-300 text-xs">{formatDate(post.publishedAt)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Glassmorphism Shine Effect */}
                <div
                  className="absolute inset-0 rounded-3xl pointer-events-none"
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

              {/* Decorative Elements */}
              <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-r from-purple-600/20 to-cyan-600/20 rounded-full blur-xl" />
              <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-gradient-to-r from-pink-600/20 to-purple-600/20 rounded-full blur-lg" />
            </motion.div>

          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default BlogHero;
