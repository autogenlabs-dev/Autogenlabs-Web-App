'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, ChevronLeft, ChevronRight } from 'lucide-react';
import { 
  getBlogPosts, 
  getFeaturedPost, 
  getTrendingPosts, 
  getLatestPosts, 
  getPopularPosts, 
  getBestOfMonth,
  blogCategories,
  getPostsByCategory,
  searchPosts 
} from '../../../lib/blogData.js';
import BlogHero from './BlogHero';
import TrendingSection from './TrendingSection';
import LatestNewsSection from './LatestNewsSection';
import PopularNewsSection from './PopularNewsSection';
import BestOfMonthSection from './BestOfMonthSection';

const BlogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const [filteredPosts, setFilteredPosts] = useState([]);
  
  const postsPerPage = 6;
  const featuredPost = getFeaturedPost();
  const trendingPosts = getTrendingPosts();
  const latestPosts = getLatestPosts();
  const popularPosts = getPopularPosts();
  const bestOfMonth = getBestOfMonth();

  // Filter posts based on search and category
  useEffect(() => {
    let posts = getBlogPosts();
    
    if (searchQuery) {
      posts = searchPosts(searchQuery);
    } else if (selectedCategory !== 'all') {
      posts = getPostsByCategory(selectedCategory);
    }
    
    setFilteredPosts(posts);
    setCurrentPage(1);
  }, [searchQuery, selectedCategory]);

  // Pagination
  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);
  const currentPosts = filteredPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
    setSelectedCategory('all');
  };

  const handleCategoryChange = (categoryId) => {
    setSelectedCategory(categoryId);
    setSearchQuery('');
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
    <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />
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

      <div className="relative z-10">
        {/* Header with Navigation */}
        <div className="pt-32 pb-8 px-6 md:px-8">
          <div className="max-w-7xl mx-auto">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="text-center mb-8"
            >
              <motion.h1 
                variants={itemVariants}
                className="text-4xl md:text-5xl font-bold text-white mb-4"
              >
                Codemurf Blog
              </motion.h1>
              <motion.p 
                variants={itemVariants}
                className="text-lg text-gray-400 max-w-2xl mx-auto"
              >
                Insights, tutorials, and updates from the world of intelligent infrastructure
              </motion.p>
            </motion.div>

            {/* Search and Filter Bar */}
            <motion.div 
              variants={itemVariants}
              className="mb-12"
            >
              <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
                {/* Search Bar */}
                <div className="relative w-full lg:w-96">
                  <div
                    className="relative rounded-xl border border-white/20 overflow-hidden"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="flex items-center p-3">
                      <Search className="w-5 h-5 text-gray-400 mr-3" />
                      <input
                        type="text"
                        placeholder="Search articles, tutorials, and guides..."
                        value={searchQuery}
                        onChange={handleSearch}
                        className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                      />
                    </div>
                  </div>
                </div>

                {/* Category Filter */}
                <div className="flex flex-wrap gap-2">
                  {blogCategories.map((category) => (
                    <motion.button
                      key={category.id}
                      onClick={() => handleCategoryChange(category.id)}
                      className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 ${
                        selectedCategory === category.id
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                          : 'bg-white/10 text-gray-400 hover:text-white hover:bg-white/20 border border-white/20'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {category.name}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Blog Hero Section */}
        {!searchQuery && selectedCategory === 'all' && (
          <BlogHero post={featuredPost} />
        )}

        {/* Main Content */}
        <div className="px-6 md:px-8 py-8">
          <div className="max-w-7xl mx-auto space-y-16">
            
            {/* Trending Section - Only show when not filtering */}
            {!searchQuery && selectedCategory === 'all' && (
              <TrendingSection posts={trendingPosts} />
            )}

            {/* Latest News Section - Only show when not filtering */}
            {!searchQuery && selectedCategory === 'all' && (
              <LatestNewsSection posts={latestPosts} />
            )}

            {/* Search/Filter Results */}
            {(searchQuery || selectedCategory !== 'all') && (
              <motion.section
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="space-y-8"
              >
                <motion.div variants={itemVariants}>
                  <h2 className="text-3xl font-bold text-white mb-2">
                    {searchQuery ? `Search Results for "${searchQuery}"` : `${blogCategories.find(c => c.id === selectedCategory)?.name} Articles`}
                  </h2>
                  <p className="text-gray-400">
                    {filteredPosts.length} {filteredPosts.length === 1 ? 'article' : 'articles'} found
                  </p>
                </motion.div>

                {/* Results Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {currentPosts.map((post, index) => (
                    <motion.article
                      key={post.id}
                      variants={itemVariants}
                      className="group cursor-pointer"
                      whileHover={{ y: -5 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div
                        className="relative rounded-2xl border border-white/20 overflow-hidden h-full"
                        style={{
                          background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                          backdropFilter: 'blur(20px)',
                        }}
                      >
                        {/* Image */}
                        <div className="relative h-48 overflow-hidden">
                          <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                        </div>

                        {/* Content */}
                        <div className="p-6 space-y-3">
                          <div className="flex items-center gap-2 text-xs">
                            <span className="px-2 py-1 bg-purple-600/20 text-purple-400 rounded">
                              {blogCategories.find(c => c.id === post.category)?.name}
                            </span>
                            <span className="text-gray-400">{post.readTime}</span>
                          </div>

                          <h3 className="text-lg font-semibold text-white line-clamp-2 group-hover:text-purple-400 transition-colors">
                            {post.title}
                          </h3>

                          <p className="text-gray-400 text-sm line-clamp-3">
                            {post.excerpt}
                          </p>

                          <div className="flex items-center justify-between pt-3 border-t border-white/10">
                            <div className="flex items-center gap-2">
                              <img
                                src={post.author.avatar}
                                alt={post.author.name}
                                className="w-6 h-6 rounded-full"
                              />
                              <span className="text-sm text-gray-400">{post.author.name}</span>
                            </div>
                            <span className="text-xs text-gray-500">
                              {new Date(post.publishedAt).toLocaleDateString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </motion.article>
                  ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                  <div className="flex items-center justify-center gap-4 pt-8">
                    <button
                      onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                      disabled={currentPage === 1}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      <ChevronLeft size={16} />
                      Previous
                    </button>

                    <div className="flex items-center gap-2">
                      {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                        <button
                          key={page}
                          onClick={() => setCurrentPage(page)}
                          className={`w-10 h-10 rounded-lg transition-colors ${
                            currentPage === page
                              ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white'
                              : 'bg-white/10 hover:bg-white/20 text-gray-400'
                          }`}
                        >
                          {page}
                        </button>
                      ))}
                    </div>

                    <button
                      onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                      disabled={currentPage === totalPages}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 hover:bg-white/20 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg transition-colors"
                    >
                      Next
                      <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </motion.section>
            )}

            {/* Popular News Section - Only show when not filtering */}
            {!searchQuery && selectedCategory === 'all' && (
              <PopularNewsSection posts={popularPosts} />
            )}

            {/* Best of Month Section - Only show when not filtering */}
            {!searchQuery && selectedCategory === 'all' && (
              <BestOfMonthSection posts={bestOfMonth} />
            )}

          </div>
        </div>
      </div>

      {/* Custom CSS for line-clamp */}
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
    </div>
  );
};

export default BlogsPage;
