'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Clock, Eye, Heart, Share2, Calendar, User, Tag, Twitter, Facebook, Linkedin, Copy, Check } from 'lucide-react';
import { getPostBySlug, getBlogPosts, formatDate, formatViews, blogCategories } from '../../../lib/blogData.js';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const BlogPostPage = ({ params }) => {
  const [post, setPost] = useState(null);
  const [relatedPosts, setRelatedPosts] = useState([]);
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);
  const [isShareMenuOpen, setIsShareMenuOpen] = useState(false);
  const [copySuccess, setCopySuccess] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPost = async () => {
      const slug = params.slug;
      const foundPost = getPostBySlug(slug);
      
      if (!foundPost) {
        router.push('/blogs');
        return;
      }

      setPost(foundPost);
      setLikes(foundPost.likes);

      // Get related posts from the same category
      const allPosts = getBlogPosts();
      const related = allPosts
        .filter(p => p.id !== foundPost.id && p.category === foundPost.category)
        .slice(0, 3);
      setRelatedPosts(related);
    };

    fetchPost();
  }, [params.slug, router]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikes(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleShare = (platform) => {
    const url = window.location.href;
    const title = post.title;
    
    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'linkedin':
        window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`, '_blank');
        break;
      case 'copy':
        navigator.clipboard.writeText(url);
        setCopySuccess(true);
        setTimeout(() => setCopySuccess(false), 2000);
        break;
    }
    setIsShareMenuOpen(false);
  };

  if (!post) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500/30 border-t-purple-500 rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading article...</p>
        </div>
      </div>
    );
  }

  const category = blogCategories.find(c => c.id === post.category);

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
        {/* Header */}
        <div className="pt-32 pb-8 px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            {/* Back Button */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-8"
            >
              <Link href="/blogs">
                <motion.button
                  className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                  whileHover={{ x: -5 }}
                >
                  <ArrowLeft size={20} />
                  Back to articles
                </motion.button>
              </Link>
            </motion.div>

            {/* Article Header */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Category and Meta */}
              <div className="flex flex-wrap items-center gap-4">
                <span 
                  className={`px-4 py-2 rounded-full text-white bg-gradient-to-r ${category?.color}`}
                >
                  {category?.name}
                </span>
                <div className="flex items-center gap-4 text-sm text-gray-400">
                  <div className="flex items-center gap-1">
                    <Calendar size={16} />
                    <span>{formatDate(post.publishedAt)}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock size={16} />
                    <span>{post.readTime}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Eye size={16} />
                    <span>{formatViews(post.views)} views</span>
                  </div>
                </div>
              </div>

              {/* Title */}
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
                {post.title}
              </h1>

              {/* Author and Actions */}
              <div className="flex items-center justify-between pt-6 border-t border-white/10">
                <div className="flex items-center gap-4">
                  <img
                    src={post.author.avatar}
                    alt={post.author.name}
                    className="w-12 h-12 rounded-full border-2 border-white/20"
                  />
                  <div>
                    <p className="text-white font-semibold">{post.author.name}</p>
                    <p className="text-gray-400 text-sm">{post.author.role}</p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex items-center gap-3">
                  <motion.button
                    onClick={handleLike}
                    className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${
                      isLiked 
                        ? 'bg-red-600/20 border-red-500/50 text-red-400' 
                        : 'bg-white/10 border-white/20 text-gray-400 hover:text-white hover:bg-white/20'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Heart size={16} fill={isLiked ? 'currentColor' : 'none'} />
                    <span>{likes}</span>
                  </motion.button>

                  <div className="relative">
                    <motion.button
                      onClick={() => setIsShareMenuOpen(!isShareMenuOpen)}
                      className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-gray-400 hover:text-white hover:bg-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Share2 size={16} />
                      <span>Share</span>
                    </motion.button>

                    {/* Share Menu */}
                    {isShareMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        className="absolute top-full right-0 mt-2 p-3 bg-gray-900/90 backdrop-blur-sm border border-white/20 rounded-lg shadow-xl z-10"
                      >
                        <div className="flex flex-col gap-2">
                          <button
                            onClick={() => handleShare('twitter')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <Twitter size={16} />
                            Twitter
                          </button>
                          <button
                            onClick={() => handleShare('facebook')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <Facebook size={16} />
                            Facebook
                          </button>
                          <button
                            onClick={() => handleShare('linkedin')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            <Linkedin size={16} />
                            LinkedIn
                          </button>
                          <button
                            onClick={() => handleShare('copy')}
                            className="flex items-center gap-2 px-3 py-2 hover:bg-white/10 rounded text-sm text-gray-300 hover:text-white transition-colors"
                          >
                            {copySuccess ? <Check size={16} /> : <Copy size={16} />}
                            {copySuccess ? 'Copied!' : 'Copy Link'}
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Featured Image */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="px-6 md:px-8 mb-12"
        >
          <div className="max-w-4xl mx-auto">
            <div className="relative rounded-3xl overflow-hidden border border-white/20">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-64 md:h-96 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
          </div>
        </motion.div>

        {/* Article Content */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="px-6 md:px-8 pb-16"
        >
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              
              {/* Main Content */}
              <div className="lg:col-span-3">
                <div
                  className="prose prose-invert prose-lg max-w-none"
                  style={{
                    lineHeight: '1.8',
                  }}
                >
                  <div 
                    className="text-gray-300 space-y-6"
                    dangerouslySetInnerHTML={{ 
                      __html: post.content.replace(/\n/g, '<br>').replace(/# /g, '<h2 class="text-2xl font-bold text-white mt-8 mb-4">').replace(/## /g, '<h3 class="text-xl font-semibold text-white mt-6 mb-3">').replace(/### /g, '<h4 class="text-lg font-medium text-white mt-4 mb-2">')
                    }}
                  />
                </div>

                {/* Tags */}
                <div className="mt-12 pt-8 border-t border-white/10">
                  <div className="flex items-center gap-2 mb-4">
                    <Tag size={16} className="text-gray-400" />
                    <span className="text-gray-400 text-sm">Tags:</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white/10 text-gray-300 text-sm rounded-full border border-white/20"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-32">
                  {/* Author Card */}
                  <div
                    className="p-6 rounded-2xl border border-white/20 mb-8"
                    style={{
                      background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                      backdropFilter: 'blur(20px)',
                    }}
                  >
                    <div className="text-center">
                      <img
                        src={post.author.avatar}
                        alt={post.author.name}
                        className="w-16 h-16 rounded-full mx-auto mb-4 border-2 border-white/20"
                      />
                      <h3 className="text-white font-semibold mb-1">{post.author.name}</h3>
                      <p className="text-gray-400 text-sm mb-4">{post.author.role}</p>
                      <motion.button
                        className="w-full py-2 px-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-lg text-white font-medium transition-all duration-300 hover:from-purple-700 hover:to-cyan-700"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        Follow
                      </motion.button>
                    </div>
                  </div>

                  {/* Related Articles */}
                  {relatedPosts.length > 0 && (
                    <div
                      className="p-6 rounded-2xl border border-white/20"
                      style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                        backdropFilter: 'blur(20px)',
                      }}
                    >
                      <h3 className="text-white font-semibold mb-4">Related Articles</h3>
                      <div className="space-y-4">
                        {relatedPosts.map((relatedPost) => (
                          <Link key={relatedPost.id} href={`/blogs/${relatedPost.slug}`}>
                            <motion.article
                              className="group cursor-pointer"
                              whileHover={{ x: 5 }}
                            >
                              <div className="flex gap-3">
                                <img
                                  src={relatedPost.image}
                                  alt={relatedPost.title}
                                  className="w-12 h-12 rounded-lg object-cover flex-shrink-0"
                                />
                                <div className="min-w-0">
                                  <h4 className="text-sm font-medium text-white line-clamp-2 group-hover:text-purple-300 transition-colors">
                                    {relatedPost.title}
                                  </h4>
                                  <p className="text-xs text-gray-400 mt-1">{relatedPost.readTime}</p>
                                </div>
                              </div>
                            </motion.article>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

            </div>
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
      `}</style>
    </div>
  );
};

export default BlogPostPage;
