'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Clock, Newspaper, ArrowRight } from 'lucide-react';
import { formatDate, blogCategories } from '../../../lib/blogData';
import Link from 'next/link';

const LatestNewsSection = ({ posts }) => {
  if (!posts || posts.length === 0) return null;

  const featuredPost = posts[0];
  const sidebarPosts = posts.slice(1, 4); // Get 3 posts for sidebar

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
              <div className="flex items-center gap-2 px-3 py-1 bg-gradient-to-r from-blue-500/20 to-cyan-500/20 border border-blue-500/30 rounded-full">
                <Newspaper size={16} className="text-blue-400" />
                <span className="text-blue-400 text-sm font-medium">LATEST CODEMURF NEWS</span>
              </div>
            </div>
            <Link href="/blogs?category=platform-updates">
              <motion.button
                className="flex items-center gap-2 text-purple-400 hover:text-purple-300 font-medium transition-colors"
                whileHover={{ x: 5 }}
              >
                View more
                <ArrowRight size={16} />
              </motion.button>
            </Link>
          </motion.div>

          {/* Main Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            
            {/* Left Sidebar - Article List */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-1 space-y-4"
            >
              {sidebarPosts.map((post, index) => (
                <motion.div
                  key={post.id}
                  variants={itemVariants}
                  transition={{ delay: index * 0.1 }}
                >
                  <Link href={`/blogs/${post.slug}`}>
                    <motion.article
                      className="group cursor-pointer"
                      whileHover={{ x: 5 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div
                        className="flex gap-4 p-4 rounded-xl border border-white/10 hover:border-white/20 transition-all duration-300"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                          backdropFilter: 'blur(10px)',
                        }}
                      >
                        {/* Article Image */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-lg overflow-hidden">
                            <img
                              src={post.image}
                              alt={post.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        </div>

                        {/* Article Content */}
                        <div className="flex-1 min-w-0">
                          {/* Category and Date */}
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 text-xs rounded">
                              {blogCategories.find(c => c.id === post.category)?.name}
                            </span>
                            <span className="text-gray-500 text-xs">{formatDate(post.publishedAt)}</span>
                          </div>

                          {/* Title */}
                          <h3 className="text-sm font-semibold text-white line-clamp-2 group-hover:text-purple-300 transition-colors mb-1">
                            {post.title}
                          </h3>

                          {/* Read Time */}
                          <div className="flex items-center gap-1 text-gray-400">
                            <Clock size={12} />
                            <span className="text-xs">{post.readTime}</span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  </Link>
                </motion.div>
              ))}
            </motion.div>

            {/* Right Featured Article */}
            <motion.div
              variants={itemVariants}
              className="lg:col-span-2"
            >
              <Link href={`/blogs/${featuredPost.slug}`}>
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
                        src={featuredPost.image}
                        alt={featuredPost.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
                    </div>

                    {/* Content Overlay */}
                    <div className="relative z-10 h-full flex flex-col justify-end p-8">
                      {/* Category and Meta */}
                      <div className="flex items-center gap-3 mb-4">
                        <span className="px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-white text-sm rounded-full">
                          {blogCategories.find(c => c.id === featuredPost.category)?.name}
                        </span>
                        <div className="flex items-center gap-1 text-gray-300">
                          <Clock size={14} />
                          <span className="text-sm">{featuredPost.readTime}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h2 className="text-2xl md:text-3xl font-bold text-white mb-4 leading-tight group-hover:text-blue-300 transition-colors">
                        {featuredPost.title}
                      </h2>

                      {/* Excerpt */}
                      <p className="text-gray-300 mb-6 line-clamp-3 max-w-2xl">
                        {featuredPost.excerpt}
                      </p>

                      {/* Author and Read More */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                          <img
                            src={featuredPost.author.avatar}
                            alt={featuredPost.author.name}
                            className="w-10 h-10 rounded-full border-2 border-white/20"
                          />
                          <div>
                            <p className="text-white font-medium">{featuredPost.author.name}</p>
                            <p className="text-gray-400 text-sm">{formatDate(featuredPost.publishedAt)}</p>
                          </div>
                        </div>
                        
                        <motion.div
                          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 backdrop-blur-sm rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300"
                        >
                          <span className="text-white font-medium">Read article</span>
                          <ArrowRight size={16} className="text-white" />
                        </motion.div>
                      </div>
                    </div>

                    {/* Hover Effect Overlay */}
                    <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div
                        className="px-3 py-2 bg-white/10 backdrop-blur-sm rounded-lg border border-white/20"
                      >
                        <span className="text-white text-sm">Latest</span>
                      </div>
                    </div>
                  </div>
                </motion.article>
              </Link>
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

export default LatestNewsSection;
