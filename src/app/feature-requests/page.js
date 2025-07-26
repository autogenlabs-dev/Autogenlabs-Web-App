'use client';
import { motion } from 'framer-motion';
import { Lightbulb, ThumbsUp, MessageSquare, Clock, CheckCircle, XCircle, Users, TrendingUp, Filter, Search, Plus, ArrowRight, Star, Zap, Code, Cpu } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function FeatureRequestsPage() {
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const requestStats = [
    {
      number: "1,250+",
      label: "Total Requests",
      description: "Community-submitted features",
      icon: <Lightbulb className="w-6 h-6" />
    },
    {
      number: "180",
      label: "In Development",
      description: "Currently being built",
      icon: <Code className="w-6 h-6" />
    },
    {
      number: "95",
      label: "Completed",
      description: "Released features",
      icon: <CheckCircle className="w-6 h-6" />
    },
    {
      number: "5,000+",
      label: "Total Votes",
      description: "Community engagement",
      icon: <ThumbsUp className="w-6 h-6" />
    }
  ];

  const filterOptions = [
    { value: 'all', label: 'All Requests', count: '1,250' },
    { value: 'popular', label: 'Most Popular', count: '45' },
    { value: 'recent', label: 'Recent', count: '30' },
    { value: 'in-progress', label: 'In Progress', count: '180' },
    { value: 'completed', label: 'Completed', count: '95' },
    { value: 'planned', label: 'Planned', count: '120' }
  ];

  const featuredRequests = [
    {
      id: 1,
      title: "Advanced Code Refactoring AI",
      description: "AI-powered tool that can automatically refactor legacy code to modern standards while maintaining functionality.",
      category: "AI Enhancement",
      status: "In Progress",
      votes: 245,
      comments: 18,
      author: "Sarah Chen",
      created: "2 weeks ago",
      priority: "high",
      tags: ["AI", "Refactoring", "Code Quality"]
    },
    {
      id: 2,
      title: "Real-time Collaborative Coding",
      description: "Enable multiple developers to work on the same codebase simultaneously with live conflict resolution.",
      category: "Collaboration",
      status: "Under Review",
      votes: 189,
      comments: 24,
      author: "Mike Rodriguez",
      created: "1 month ago",
      priority: "medium",
      tags: ["Collaboration", "Real-time", "Team"]
    },
    {
      id: 3,
      title: "Custom AI Model Training",
      description: "Allow users to train custom AI models on their specific codebase and coding patterns.",
      category: "AI Models",
      status: "Planned",
      votes: 156,
      comments: 12,
      author: "Alex Kim",
      created: "3 weeks ago",
      priority: "high",
      tags: ["AI", "Training", "Customization"]
    },
    {
      id: 4,
      title: "Visual Workflow Designer",
      description: "Drag-and-drop interface for creating complex automation workflows without writing code.",
      category: "UI/UX",
      status: "Completed",
      votes: 134,
      comments: 31,
      author: "Emily Watson",
      created: "2 months ago",
      priority: "medium",
      tags: ["Visual", "Workflow", "No-code"]
    },
    {
      id: 5,
      title: "Mobile App Development Kit",
      description: "Comprehensive toolkit for generating mobile applications with AI assistance.",
      category: "Mobile",
      status: "In Progress",
      votes: 112,
      comments: 15,
      author: "David Brown",
      created: "1 week ago",
      priority: "high",
      tags: ["Mobile", "AI", "Development"]
    },
    {
      id: 6,
      title: "Advanced Security Scanning",
      description: "AI-powered security vulnerability detection and automatic fix suggestions.",
      category: "Security",
      status: "Under Review",
      votes: 98,
      comments: 9,
      author: "Lisa Chang",
      created: "5 days ago",
      priority: "high",
      tags: ["Security", "AI", "Automation"]
    }
  ];

  const developmentProcess = [
    {
      step: 1,
      title: "Community Submission",
      description: "Community members submit feature requests with detailed descriptions and use cases.",
      icon: <Plus className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      step: 2,
      title: "Community Voting",
      description: "Other community members vote and comment on submissions to gauge interest and provide feedback.",
      icon: <ThumbsUp className="w-6 h-6" />,
      color: "from-purple-500 to-pink-500"
    },
    {
      step: 3,
      title: "Team Review",
      description: "Our product team reviews popular requests for feasibility, alignment, and technical requirements.",
      icon: <Users className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      step: 4,
      title: "Development",
      description: "Approved features enter development phase with regular updates and community involvement.",
      icon: <Code className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    },
    {
      step: 5,
      title: "Release",
      description: "Completed features are released to the community with documentation and celebration.",
      icon: <CheckCircle className="w-6 h-6" />,
      color: "from-indigo-500 to-purple-500"
    }
  ];

  const topCategories = [
    {
      name: "AI Enhancements",
      count: 285,
      description: "Improvements to AI capabilities and intelligence",
      icon: <Cpu className="w-6 h-6" />,
      color: "from-purple-500 to-indigo-500"
    },
    {
      name: "User Interface",
      count: 156,
      description: "UI/UX improvements and new interface features",
      icon: <Star className="w-6 h-6" />,
      color: "from-blue-500 to-cyan-500"
    },
    {
      name: "Integrations",
      count: 142,
      description: "Third-party tool and service integrations",
      icon: <Zap className="w-6 h-6" />,
      color: "from-green-500 to-emerald-500"
    },
    {
      name: "Performance",
      count: 98,
      description: "Speed and efficiency improvements",
      icon: <TrendingUp className="w-6 h-6" />,
      color: "from-orange-500 to-red-500"
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'In Progress':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'Planned':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'Under Review':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      case 'medium':
        return 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20';
      case 'low':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredRequests = featuredRequests.filter(request => {
    if (selectedFilter === 'all') return true;
    if (selectedFilter === 'popular') return request.votes > 150;
    if (selectedFilter === 'in-progress') return request.status === 'In Progress';
    if (selectedFilter === 'completed') return request.status === 'Completed';
    if (selectedFilter === 'planned') return request.status === 'Planned';
    return true;
  });

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white">
      {/* Hero Section */}
      <section className="relative pt-32 pb-20">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900/20 to-blue-900/20"></div>
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="text-center"
          >
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-white via-purple-200 to-blue-400 bg-clip-text text-transparent"
            >
              Feature Requests
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Shape the future of AutoGen by submitting and voting on feature requests. 
              Your ideas drive our development roadmap.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="#submit-request"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Submit Request
              </Link>
              <Link 
                href="#browse-requests"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Browse Requests
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {requestStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-purple-400 mb-3 flex justify-center">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Development Process */}
      <section className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">How It Works</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              From idea to implementation, here&apos;s how community feature requests become reality.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-purple-500/30 hidden lg:block"></div>
            <div className="space-y-12">
              {developmentProcess.map((process, index) => (
                <motion.div
                  key={index}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`flex items-center gap-8 ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'}`}
                >
                  <div className={`flex-1 ${index % 2 === 0 ? 'lg:text-right' : 'lg:text-left'}`}>
                    <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors">
                      <div className="text-purple-400 font-bold text-lg mb-2">Step {process.step}</div>
                      <h3 className="text-xl font-bold mb-3">{process.title}</h3>
                      <p className="text-gray-300">{process.description}</p>
                    </div>
                  </div>
                  <div className={`w-16 h-16 bg-gradient-to-r ${process.color} rounded-full flex items-center justify-center text-white relative z-10 flex-shrink-0`}>
                    {process.icon}
                  </div>
                  <div className="flex-1 lg:block hidden"></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Top Categories */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Popular Categories</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore feature requests by category to find the areas that interest you most.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {topCategories.map((category, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 cursor-pointer"
              >
                <div className={`w-12 h-12 bg-gradient-to-r ${category.color} rounded-lg flex items-center justify-center text-white mb-4`}>
                  {category.icon}
                </div>
                <h3 className="text-lg font-bold mb-2">{category.name}</h3>
                <p className="text-gray-300 text-sm mb-3">{category.description}</p>
                <div className="text-purple-400 font-semibold">{category.count} requests</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Requests */}
      <section id="browse-requests" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Requests</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Vote on your favorite feature requests and help us prioritize what to build next.
            </p>
          </motion.div>

          {/* Filters */}
          <div className="flex flex-wrap gap-2 mb-8 justify-center">
            {filterOptions.map((filter) => (
              <button
                key={filter.value}
                onClick={() => setSelectedFilter(filter.value)}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  selectedFilter === filter.value
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
                }`}
              >
                {filter.label} ({filter.count})
              </button>
            ))}
          </div>

          {/* Requests Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRequests.map((request, index) => (
              <motion.div
                key={request.id}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getStatusColor(request.status)}`}>
                    {request.status}
                  </span>
                  <span className={`px-2 py-1 rounded text-xs font-medium border ${getPriorityColor(request.priority)}`}>
                    {request.priority} priority
                  </span>
                </div>

                <h3 className="text-lg font-bold mb-3 hover:text-purple-400 transition-colors cursor-pointer">
                  {request.title}
                </h3>
                <p className="text-gray-300 text-sm mb-4 leading-relaxed">{request.description}</p>

                <div className="flex flex-wrap gap-1 mb-4">
                  {request.tags.map((tag, tagIndex) => (
                    <span key={tagIndex} className="bg-gray-800 text-gray-300 px-2 py-1 rounded text-xs">
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex items-center justify-between text-sm text-gray-400 mb-4">
                  <span>by {request.author}</span>
                  <span>{request.created}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <button className="flex items-center gap-1 text-purple-400 hover:text-purple-300 transition-colors">
                      <ThumbsUp className="w-4 h-4" />
                      {request.votes}
                    </button>
                    <div className="flex items-center gap-1 text-gray-400">
                      <MessageSquare className="w-4 h-4" />
                      {request.comments}
                    </div>
                  </div>
                  <button className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium">
                    View Details
                  </button>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              href="/feature-requests/all"
              className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              View All Requests <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Submit Request Section */}
      <section id="submit-request" className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Have an Idea?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Submit your feature request and help shape the future of AutoGen. Every great feature starts with a great idea.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="/feature-requests/submit"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Plus className="w-5 h-5" />
                Submit Feature Request
              </Link>
              <Link 
                href="/community"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Join Community
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
