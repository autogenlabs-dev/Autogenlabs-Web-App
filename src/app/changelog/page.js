'use client';
import { motion } from 'framer-motion';
import { Calendar, Tag, GitBranch, Star, Bug, Zap, Shield, Plus, ArrowRight, ExternalLink, CheckCircle, AlertCircle, Info, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';

export default function ChangelogPage() {
  const [selectedVersion, setSelectedVersion] = useState('all');

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

  const changelogStats = [
    {
      number: "50+",
      label: "Releases",
      description: "Major and minor versions",
      icon: <GitBranch className="w-6 h-6" />
    },
    {
      number: "200+",
      label: "New Features",
      description: "Features added this year",
      icon: <Sparkles className="w-6 h-6" />
    },
    {
      number: "150+",
      label: "Bug Fixes",
      description: "Issues resolved",
      icon: <Bug className="w-6 h-6" />
    },
    {
      number: "99.9%",
      label: "Uptime",
      description: "Service reliability",
      icon: <Shield className="w-6 h-6" />
    }
  ];

  const releases = [
    {
      version: "v2.8.0",
      date: "January 25, 2025",
      type: "major",
      title: "Advanced AI Code Refactoring",
      description: "Major update introducing AI-powered code refactoring capabilities with smart suggestions and automated optimization.",
      changes: [
        {
          type: "feature",
          title: "AI Code Refactoring Engine",
          description: "Intelligent code analysis and refactoring suggestions with 90% accuracy"
        },
        {
          type: "feature",
          title: "Smart Code Optimization",
          description: "Automatic performance optimization for JavaScript, Python, and TypeScript"
        },
        {
          type: "feature",
          title: "Bulk Code Transformation",
          description: "Apply refactoring changes across multiple files simultaneously"
        },
        {
          type: "improvement",
          title: "Enhanced Code Analysis",
          description: "Improved static analysis with better error detection and warnings"
        },
        {
          type: "fix",
          title: "Fixed Memory Leaks",
          description: "Resolved memory leak issues in long-running code generation sessions"
        }
      ],
      stats: {
        downloads: "50,000+",
        improvements: "15 new features",
        fixes: "8 bug fixes"
      }
    },
    {
      version: "v2.7.5",
      date: "January 15, 2025",
      type: "minor",
      title: "Performance & Security Updates",
      description: "Important security patches and performance improvements for better user experience.",
      changes: [
        {
          type: "security",
          title: "Enhanced Authentication",
          description: "Improved OAuth2 flow with additional security measures"
        },
        {
          type: "improvement",
          title: "Faster Code Generation",
          description: "25% improvement in code generation speed for large projects"
        },
        {
          type: "fix",
          title: "Template Loading Issues",
          description: "Fixed issues with template loading in certain edge cases"
        },
        {
          type: "fix",
          title: "UI Responsiveness",
          description: "Improved mobile and tablet interface responsiveness"
        }
      ],
      stats: {
        downloads: "35,000+",
        improvements: "5 improvements",
        fixes: "12 bug fixes"
      }
    },
    {
      version: "v2.7.0",
      date: "December 20, 2024",
      type: "major",
      title: "Visual Workflow Designer",
      description: "Introducing the new visual workflow designer for creating complex automation workflows without code.",
      changes: [
        {
          type: "feature",
          title: "Drag & Drop Workflow Builder",
          description: "Visual interface for creating complex automation workflows"
        },
        {
          type: "feature",
          title: "Pre-built Workflow Templates",
          description: "50+ ready-to-use workflow templates for common use cases"
        },
        {
          type: "feature",
          title: "Workflow Sharing",
          description: "Share and import workflows with the community"
        },
        {
          type: "improvement",
          title: "Better Error Handling",
          description: "Improved error messages and debugging capabilities"
        },
        {
          type: "fix",
          title: "Export Functionality",
          description: "Fixed issues with exporting large projects"
        }
      ],
      stats: {
        downloads: "80,000+",
        improvements: "20 new features",
        fixes: "6 bug fixes"
      }
    },
    {
      version: "v2.6.8",
      date: "December 5, 2024",
      type: "patch",
      title: "Critical Bug Fixes",
      description: "Emergency patch addressing critical issues affecting code generation reliability.",
      changes: [
        {
          type: "fix",
          title: "Code Generation Timeout",
          description: "Fixed timeout issues for complex code generation requests"
        },
        {
          type: "fix",
          title: "API Rate Limiting",
          description: "Resolved rate limiting issues affecting premium users"
        },
        {
          type: "security",
          title: "XSS Vulnerability",
          description: "Patched potential XSS vulnerability in code preview"
        }
      ],
      stats: {
        downloads: "25,000+",
        improvements: "0 new features",
        fixes: "8 critical fixes"
      }
    },
    {
      version: "v2.6.0",
      date: "November 15, 2024",
      type: "major",
      title: "Mobile Development Kit",
      description: "Comprehensive toolkit for generating mobile applications with AI assistance for iOS and Android.",
      changes: [
        {
          type: "feature",
          title: "React Native Code Generation",
          description: "AI-powered React Native component and screen generation"
        },
        {
          type: "feature",
          title: "Flutter Support",
          description: "Added support for Flutter app development with Dart code generation"
        },
        {
          type: "feature",
          title: "Mobile UI Components",
          description: "Extensive library of mobile-optimized UI components"
        },
        {
          type: "feature",
          title: "App Store Optimization",
          description: "Tools for generating app store descriptions and metadata"
        },
        {
          type: "improvement",
          title: "Cross-platform Testing",
          description: "Automated testing tools for mobile applications"
        }
      ],
      stats: {
        downloads: "120,000+",
        improvements: "25 new features",
        fixes: "10 bug fixes"
      }
    },
    {
      version: "v2.5.2",
      date: "October 30, 2024",
      type: "minor",
      title: "Integration Improvements",
      description: "Enhanced integrations with popular development tools and improved API stability.",
      changes: [
        {
          type: "feature",
          title: "GitHub Copilot Integration",
          description: "Seamless integration with GitHub Copilot for enhanced code suggestions"
        },
        {
          type: "feature",
          title: "VS Code Extension Updates",
          description: "Major improvements to the VS Code extension with new features"
        },
        {
          type: "improvement",
          title: "API Response Times",
          description: "40% improvement in API response times across all endpoints"
        },
        {
          type: "fix",
          title: "Webhook Reliability",
          description: "Improved webhook delivery reliability and retry logic"
        }
      ],
      stats: {
        downloads: "45,000+",
        improvements: "8 improvements",
        fixes: "5 bug fixes"
      }
    }
  ];

  const getChangeTypeIcon = (type) => {
    switch (type) {
      case 'feature':
        return <Plus className="w-4 h-4 text-green-400" />;
      case 'improvement':
        return <Zap className="w-4 h-4 text-blue-400" />;
      case 'fix':
        return <Bug className="w-4 h-4 text-orange-400" />;
      case 'security':
        return <Shield className="w-4 h-4 text-red-400" />;
      default:
        return <Info className="w-4 h-4 text-gray-400" />;
    }
  };

  const getChangeTypeColor = (type) => {
    switch (type) {
      case 'feature':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      case 'improvement':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'fix':
        return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
      case 'security':
        return 'bg-red-500/10 text-red-400 border-red-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const getVersionTypeColor = (type) => {
    switch (type) {
      case 'major':
        return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
      case 'minor':
        return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
      case 'patch':
        return 'bg-green-500/10 text-green-400 border-green-500/20';
      default:
        return 'bg-gray-500/10 text-gray-400 border-gray-500/20';
    }
  };

  const filteredReleases = releases.filter(release => {
    if (selectedVersion === 'all') return true;
    return release.type === selectedVersion;
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
              Changelog
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Stay up to date with all the latest features, improvements, and bug fixes 
              in Codemurf. We ship updates regularly to improve your experience.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="#latest-release"
                className="bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <Star className="w-5 h-5" />
                Latest Release
              </Link>
              <Link 
                href="#subscribe"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Subscribe to Updates
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {changelogStats.map((stat, index) => (
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

      {/* Filter Section */}
      <section className="py-10 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <div className="flex flex-wrap gap-2 justify-center">
            <button
              onClick={() => setSelectedVersion('all')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedVersion === 'all'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              All Releases
            </button>
            <button
              onClick={() => setSelectedVersion('major')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedVersion === 'major'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Major Releases
            </button>
            <button
              onClick={() => setSelectedVersion('minor')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedVersion === 'minor'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Minor Updates
            </button>
            <button
              onClick={() => setSelectedVersion('patch')}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selectedVersion === 'patch'
                  ? 'bg-purple-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              Patches
            </button>
          </div>
        </div>
      </section>

      {/* Releases Timeline */}
      <section id="latest-release" className="py-20">
        <div className="max-w-5xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Release History</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Detailed changelog of all Codemurf releases with features, improvements, and fixes.
            </p>
          </motion.div>

          <div className="relative">
            <div className="absolute left-6 top-0 bottom-0 w-px bg-gray-700"></div>
            
            <div className="space-y-12">
              {filteredReleases.map((release, index) => (
                <motion.div
                  key={release.version}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                  variants={fadeInUp}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="relative pl-16"
                >
                  <div className="absolute left-3 w-6 h-6 bg-purple-600 rounded-full border-4 border-gray-900 flex items-center justify-center">
                    <GitBranch className="w-3 h-3 text-white" />
                  </div>
                  
                  <div className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-colors">
                    {/* Release Header */}
                    <div className="flex flex-wrap items-center gap-4 mb-6">
                      <h3 className="text-2xl font-bold text-white">{release.version}</h3>
                      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getVersionTypeColor(release.type)}`}>
                        {release.type} release
                      </span>
                      <div className="flex items-center gap-2 text-gray-400 text-sm">
                        <Calendar className="w-4 h-4" />
                        {release.date}
                      </div>
                    </div>

                    <h4 className="text-xl font-semibold mb-3 text-purple-400">{release.title}</h4>
                    <p className="text-gray-300 mb-6 leading-relaxed">{release.description}</p>

                    {/* Release Stats */}
                    <div className="flex flex-wrap gap-6 mb-8 text-sm">
                      <div className="flex items-center gap-2 text-green-400">
                        <CheckCircle className="w-4 h-4" />
                        {release.stats.downloads} downloads
                      </div>
                      <div className="flex items-center gap-2 text-blue-400">
                        <Sparkles className="w-4 h-4" />
                        {release.stats.improvements}
                      </div>
                      <div className="flex items-center gap-2 text-orange-400">
                        <Bug className="w-4 h-4" />
                        {release.stats.fixes}
                      </div>
                    </div>

                    {/* Changes List */}
                    <div className="space-y-4">
                      <h5 className="text-lg font-semibold text-white mb-4">What&apos;s New</h5>
                      {release.changes.map((change, changeIndex) => (
                        <div key={changeIndex} className="flex items-start gap-3 p-4 bg-gray-800/50 rounded-lg">
                          <div className="flex-shrink-0 mt-0.5">
                            {getChangeTypeIcon(change.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <h6 className="font-medium text-white">{change.title}</h6>
                              <span className={`px-2 py-0.5 rounded text-xs font-medium border ${getChangeTypeColor(change.type)}`}>
                                {change.type}
                              </span>
                            </div>
                            <p className="text-gray-400 text-sm">{change.description}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Release Links */}
                    <div className="flex flex-wrap gap-4 mt-6 pt-6 border-t border-gray-700">
                      <Link 
                        href={`/releases/${release.version}`}
                        className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                      >
                        View Full Release Notes <ExternalLink className="w-3 h-3" />
                      </Link>
                      <Link 
                        href={`/downloads/${release.version}`}
                        className="inline-flex items-center gap-2 text-green-400 hover:text-green-300 transition-colors text-sm font-medium"
                      >
                        Download <ArrowRight className="w-3 h-3" />
                      </Link>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          <div className="text-center mt-16">
            <Link 
              href="/releases/archive"
              className="inline-flex items-center gap-2 bg-gray-800 hover:bg-gray-700 px-6 py-3 rounded-lg transition-colors font-medium"
            >
              View All Releases <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Subscribe Section */}
      <section id="subscribe" className="py-20 bg-black/30">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Stay Updated</h2>
            <p className="text-xl text-gray-300 mb-8">
              Never miss an update. Subscribe to our changelog to get notified about new releases, 
              features, and important updates.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email"
                className="flex-1 px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
              />
              <button className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition-colors whitespace-nowrap">
                Subscribe
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              You can unsubscribe at any time. No spam, only important updates.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Additional Resources */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Related Resources</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Explore more resources to help you stay informed about Codemurf updates and features.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              <Link 
                href="/docs"
                className="block bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-blue-400 mb-4">
                  <Info className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Documentation</h3>
                <p className="text-gray-300 mb-4">
                  Comprehensive guides and API documentation for all features.
                </p>
                <div className="flex items-center gap-1 text-blue-400 text-sm">
                  Read Docs <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Link 
                href="/feature-requests"
                className="block bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-green-400 mb-4">
                  <Sparkles className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Feature Requests</h3>
                <p className="text-gray-300 mb-4">
                  Submit ideas and vote on features you&apos;d like to see next.
                </p>
                <div className="flex items-center gap-1 text-green-400 text-sm">
                  Submit Request <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>

            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeInUp}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <Link 
                href="/community"
                className="block bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className="text-purple-400 mb-4">
                  <Calendar className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3">Community</h3>
                <p className="text-gray-300 mb-4">
                  Join discussions and get help from our developer community.
                </p>
                <div className="flex items-center gap-1 text-purple-400 text-sm">
                  Join Community <ArrowRight className="w-3 h-3" />
                </div>
              </Link>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
}
