'use client';
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Plus, Minus, Filter, Zap, Shield, Settings, DollarSign, HelpCircle } from 'lucide-react';

const FAQSection = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [expandedFAQ, setExpandedFAQ] = useState(null);
  const [hoveredCard, setHoveredCard] = useState(null);

  const categories = [
    { id: 'all', name: 'All Questions', icon: HelpCircle, color: 'from-purple-500 to-pink-500' },
    { id: 'getting-started', name: 'Getting Started', icon: Zap, color: 'from-cyan-500 to-blue-500' },
    { id: 'deployment', name: 'Deployment', icon: Settings, color: 'from-purple-500 to-cyan-500' },
    { id: 'pricing', name: 'Pricing', icon: DollarSign, color: 'from-green-500 to-emerald-500' },
    { id: 'security', name: 'Security', icon: Shield, color: 'from-red-500 to-pink-500' }
  ];

  const faqs = [
    {
      id: 1,
      category: 'getting-started',
      question: 'What is Codemurf and how does it work?',
      answer: 'Codemurf is an intelligent infrastructure platform that automates deployment and scaling. It uses advanced AI to optimize your infrastructure configurations, manage deployments, and provide real-time monitoring across multiple environments.'
    },
    {
      id: 2,
      category: 'getting-started',
      question: 'How quickly can I deploy my first application?',
      answer: 'With Codemurf, you can deploy your first application in under 5 minutes. Simply connect your repository, configure your settings, and let our platform handle the rest. No complex setup or manual configuration required.'
    },
    {
      id: 3,
      category: 'deployment',
      question: 'What frameworks and languages does Codemurf support?',
      answer: 'Codemurf supports all major frameworks including React, Node.js, Python, Ruby, Go, PHP, and more. Our platform automatically detects your technology stack and configures the optimal deployment strategy.'
    },
    {
      id: 4,
      category: 'deployment',
      question: 'Can I deploy to multiple environments simultaneously?',
      answer: 'Yes! Codemurf supports multi-environment deployments. You can deploy to staging, production, and custom environments with different configurations, all managed from a single dashboard.'
    },
    {
      id: 5,
      category: 'pricing',
      question: 'Do you offer a free tier?',
      answer: 'Yes, we offer a generous free tier that includes up to 3 applications, basic monitoring, and community support. Perfect for personal projects and getting started with Codemurf.'
    },
    {
      id: 6,
      category: 'pricing',
      question: 'What happens if I exceed my plan limits?',
      answer: "We'll notify you before you reach your limits. You can upgrade your plan at any time, and we offer flexible billing to ensure your applications continue running smoothly without interruption."
    },
    {
      id: 7,
      category: 'security',
      question: 'How secure is my data with Codemurf?',
      answer: 'Security is our top priority. We use enterprise-grade encryption, SOC 2 compliance, and follow industry best practices. Your code and data are protected with end-to-end encryption and isolated environments.'
    },
    {
      id: 8,
      category: 'security',
      question: 'Do you provide SSL certificates?',
      answer: 'Yes, we automatically provision and manage SSL certificates for all your deployments. This includes automatic renewal and support for custom domains with zero configuration required.'
    }
  ];

  const filteredFAQs = faqs.filter(faq => {
    const matchesSearch = faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const toggleFAQ = (faqId) => {
    setExpandedFAQ(expandedFAQ === faqId ? null : faqId);
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
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    },
    hover: {
      y: -4,
      transition: { duration: 0.2 }
    }
  };

  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden" id='faq'>
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r from-purple-600/10 to-pink-600/10 rounded-full blur-3xl" />
        
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

        {/* Floating particles */}
        <div className="absolute inset-0 overflow-hidden">
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-2 h-2 bg-purple-400/30 rounded-full"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 3) * 20}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.3, 0.8, 0.3],
              }}
              transition={{
                duration: 4 + i,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            />
          ))}
        </div>
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Frequently Asked Questions
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-400 max-w-2xl mx-auto"
            variants={itemVariants}
          >
            Everything you need to know about Codemurf infrastructure platform
          </motion.p>
        </motion.div>

        {/* Search and Filter Controls */}
        <motion.div 
          className="mb-12"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          {/* Search Bar */}
          <motion.div 
            className="relative mb-8"
            variants={itemVariants}
          >
            <div 
              className="relative rounded-2xl border border-white/20 overflow-hidden"
              style={{
                background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                backdropFilter: 'blur(20px)',
              }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/10 via-transparent to-cyan-500/10" />
              <div className="relative flex items-center p-4">
                <Search className="w-5 h-5 text-gray-400 mr-3" />
                <input
                  type="text"
                  placeholder="Search frequently asked questions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="flex-1 bg-transparent text-white placeholder-gray-400 focus:outline-none"
                />
              </div>
            </div>
          </motion.div>

          {/* Category Filter */}
          <motion.div 
            className="flex flex-wrap gap-3 justify-center"
            variants={itemVariants}
          >
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <motion.button
                  key={category.id}
                  onClick={() => setSelectedCategory(category.id)}
                  className={`relative flex items-center gap-2 px-6 py-3 rounded-xl border transition-all duration-300 ${
                    selectedCategory === category.id
                      ? 'border-purple-500/50 text-white'
                      : 'border-white/20 text-gray-400 hover:text-white hover:border-white/30'
                  }`}
                  style={{
                    background: selectedCategory === category.id
                      ? `linear-gradient(135deg, rgba(139,92,246,0.2) 0%, rgba(6,182,212,0.2) 100%)`
                      : `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                    backdropFilter: 'blur(10px)',
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <IconComponent size={16} />
                  <span className="text-sm font-medium">{category.name}</span>
                  {selectedCategory === category.id && (
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/20 to-cyan-500/20 opacity-20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 0.2 }}
                    />
                  )}
                </motion.button>
              );
            })}
          </motion.div>
        </motion.div>

        {/* FAQ Grid */}
        <motion.div 
          className="grid gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
        >
          <AnimatePresence mode="popLayout">
            {filteredFAQs.map((faq, index) => (
              <motion.div
                key={faq.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                whileHover="hover"
                layout
                transition={{ delay: index * 0.05 }}
                onMouseEnter={() => setHoveredCard(faq.id)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div 
                  className={`relative rounded-2xl border overflow-hidden cursor-pointer transition-all duration-300 ${
                    expandedFAQ === faq.id ? 'border-purple-500/50' : 'border-white/20 hover:border-white/30'
                  }`}
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                    backdropFilter: 'blur(20px)',
                  }}
                  onClick={() => toggleFAQ(faq.id)}
                >
                  {/* Gradient border effect on hover */}
                  {hoveredCard === faq.id && (
                    <motion.div
                      className="absolute inset-0 rounded-2xl bg-gradient-to-r from-purple-500/20 via-cyan-500/20 to-pink-500/20"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                    />
                  )}

                  <div className="relative p-6">
                    {/* Question Header */}
                    <div className="flex items-center justify-between">
                      <h3 className="text-lg font-semibold text-white pr-4 leading-relaxed">
                        {faq.question}
                      </h3>
                      <motion.div
                        className="flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center"
                        animate={{ rotate: expandedFAQ === faq.id ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {expandedFAQ === faq.id ? (
                          <Minus size={16} className="text-white" />
                        ) : (
                          <Plus size={16} className="text-white" />
                        )}
                      </motion.div>
                    </div>

                    {/* Answer */}
                    <AnimatePresence>
                      {expandedFAQ === faq.id && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: 'easeInOut' }}
                          className="overflow-hidden"
                        >
                          <div className="pt-4 border-t border-white/10 mt-4">
                            <p className="text-gray-300 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  {/* Glassmorphism shine effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none opacity-0 hover:opacity-100 transition-opacity duration-300"
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
            ))}
          </AnimatePresence>
        </motion.div>

        {/* No Results Message */}
        {filteredFAQs.length === 0 && (
          <motion.div
            className="text-center py-12"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="text-gray-400 text-lg mb-4">
              No questions found matching your search.
            </div>
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
              className="text-purple-400 hover:text-purple-300 font-medium transition-colors"
            >
              Clear filters and show all questions
            </button>
          </motion.div>
        )}

        {/* Contact Support CTA */}
        <motion.div 
          className="text-center mt-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <div 
            className="inline-block rounded-2xl border border-white/20 p-8"
            style={{
              background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
              backdropFilter: 'blur(10px)',
            }}
          >
            <h3 className="text-xl font-semibold text-white mb-3">
              Still have questions?
            </h3>
            <p className="text-gray-400 mb-6">
              Our team is here to help you get the most out of Codemurf.
            </p>
            <motion.button
              className="px-6 py-3 bg-gradient-to-r from-purple-600 to-cyan-600 text-white font-semibold rounded-xl transition-all duration-300 hover:from-purple-700 hover:to-cyan-700"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Contact Support
            </motion.button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;