'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, TrendingUp, ArrowRight } from 'lucide-react';
import { formatDate, blogCategories } from '../../../lib/blogData.js';
import Link from 'next/link';

const TrendingSection = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  const mainPost = posts[0];
  const gridPosts = posts.slice(1, 5); // Get next 4 posts for the grid

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
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-orange-500/20 to-red-500/20 border border-orange-500/30 rounded-full">
                <TrendingUp size={16} className="text-orange-400" />
                <span className="text-orange-400 text-sm font-medium">TRENDING NOW</span>
              </div>
            </div>
            <Link href="/blogs?category=trending">
              <motion.button
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                whileHover={{ x: 5 }}
              >
                View more
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Main Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-fit">
            
            {/* Left Large Article */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <Link href={`/blogs/${mainPost.slug}`}>
                <motion.article
                  className="group cursor-pointer h-full"
                  whileHover={{ y: -5 }}
                  transition={{ duration: 0.3 }}
                >
                  <div
                    className="relative rounded-3xl border border-white/20 overflow-hidden h-full min-h-[400px]"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    {/* Background Image */}
                    <div className="absolute inset-0">
                      <img
                        src={mainPost.image}
                        alt={mainPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      {/* Category and Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-purple-600/80 backdrop-blur-sm text-white text-sm rounded-full">
                          {blogCategories.find(c => c.id === mainPost.category)?.name}
                        </span>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Clock size={14} />
                          <span className="text-sm">{mainPost.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-purple-300 transition-colors">
                        {mainPost.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-300 mb-6 line-clamp-3">
                        {mainPost.excerpt}
                      </p>

                      {/* Author and Date */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={mainPost.author.avatar}
                            alt={mainPost.author.name}
                            className="w-8 h-8 rounded-full"
                          />
                          <div>
                            <p className="text-white text-sm font-medium">{mainPost.author.name}</p>
                            <p className="text-gray-400 text-xs">{formatDate(mainPost.publishedAt)}</p>
                          </div>
                        </div>
                        
                        <motion.div
                          className="flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-lg opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <span className="text-white text-sm">Read article</span>
                          <ArrowRight size={14} className="text-white" />
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
            </motion.div>

            {/* Right Grid of 4 Articles */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 h-full">
                {gridPosts.map((post, index) => (
                  <motion.div
                    key={post.id}
                    variants={itemVariants}
                    className="h-full"
                  >
                    <Link href={`/blogs/${post.slug}`}>
                      <motion.article
                        className="group cursor-pointer h-full"
                        whileHover={{ y: -3 }}
                        transition={{ duration: 0.2 }}
                      >
                        <div
                          className="relative rounded-xl border border-white/20 overflow-hidden h-full min-h-[180px]"
                          style={{
                            background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                            backdropFilter: 'blur(20px)',
                          }}
                        >
                          {/* Background Image */}
                          <div className="absolute inset-0">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                          </div>

                          {/* Content */}
                          <div className="relative z-10 h-full flex flex-col justify-end p-4">
                            {/* Category */}
                            <div className="mb-2">
                              <span className="px-2 py-1 bg-purple-600/60 backdrop-blur-sm text-white text-xs rounded">
                                {blogCategories.find(c => c.id === post.category)?.name}
                              </span>
                            </div>

                            {/* Title */}
                            <h3 className="text-sm font-semibold text-white mb-2 leading-tight line-clamp-2 group-hover:text-purple-300 transition-colors">
                              {post.title}
                            </h3>

                            {/* Meta */}
                            <div className="flex items-center justify-between text-xs">
                              <div className="flex items-center gap-2">
                                <img
                                  src={post.author.avatar}
                                  alt={post.author.name}
                                  className="w-4 h-4 rounded-full"
                                />
                                <span className="text-gray-300">{post.author.name}</span>
                              </div>
                              <span className="text-gray-400">{formatDate(post.publishedAt)}</span>
                            </div>
                          </div>
                        </div>
                      </motion.article>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>

          </div>
        </motion.div>
      </div>

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
      `}</style>
    </section>
  );
};

export default TrendingSection;
