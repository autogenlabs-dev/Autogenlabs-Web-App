'use client';
import { motion } from 'framer-motion';
import { Users, MessageCircle, Github, MessageSquareText, Twitter, Heart, Zap, Trophy, Globe, Calendar, ArrowRight, ExternalLink, Star, Code, BookOpen, HelpCircle } from 'lucide-react';
import Link from 'next/link';

export default function CommunityPage() {
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

  const communityStats = [
    {
      number: "25,000+",
      label: "Community Members",
      description: "Active developers worldwide"
    },
    {
      number: "500+",
      label: "Daily Discussions",
      description: "Questions, tips, and solutions"
    },
    {
      number: "150+",
      label: "Open Source Contributors",
      description: "Contributing to our ecosystem"
    },
    {
      number: "50+",
      label: "Community Events",
      description: "Workshops, meetups, and webinars"
    }
  ];

  const communityChannels = [
    {
      name: "Discord Community",
      description: "Join our vibrant Discord server for real-time discussions, support, and collaboration with fellow developers.",
      icon: <MessageSquareText className="w-8 h-8" />,
      members: "15,000+ members",
      link: "https://discord.gg/autogen",
      color: "from-indigo-500 to-purple-500",
      features: ["Real-time chat", "Voice channels", "Screen sharing", "Community events"]
    },
    {
      name: "GitHub Discussions",
      description: "Participate in technical discussions, feature requests, and contribute to our open-source projects.",
      icon: <Github className="w-8 h-8" />,
      members: "8,000+ developers",
      link: "https://github.com/autogenlabs/discussions",
      color: "from-gray-600 to-gray-800",
      features: ["Technical discussions", "Feature requests", "Bug reports", "Code reviews"]
    },
    {
      name: "Reddit Community",
      description: "Share your projects, get feedback, and discover amazing AI-powered applications built by our community.",
      icon: <MessageCircle className="w-8 h-8" />,
      members: "12,000+ subscribers",
      link: "https://reddit.com/r/autogenlabs",
      color: "from-orange-500 to-red-500",
      features: ["Project showcases", "Tutorials", "Community feedback", "AMAs"]
    },
    {
      name: "Twitter/X Community",
      description: "Follow us for the latest updates, tips, and announcements from the AutoGen Labs team.",
      icon: <Twitter className="w-8 h-8" />,
      members: "20,000+ followers",
      link: "https://twitter.com/autogenlabs",
      color: "from-blue-400 to-blue-600",
      features: ["News & updates", "Quick tips", "Community highlights", "Live threads"]
    }
  ];

  const communityPrograms = [
    {
      title: "AutoGen Ambassadors",
      description: "Become a community leader and help shape the future of AI-powered development tools.",
      icon: <Trophy className="w-6 h-6" />,
      benefits: ["Exclusive access to beta features", "Direct line to our team", "Speaking opportunities", "Special recognition"],
      apply: "/ambassadors"
    },
    {
      title: "Open Source Contributors",
      description: "Contribute to our open-source projects and help build the tools that millions of developers use.",
      icon: <Code className="w-6 h-6" />,
      benefits: ["GitHub contributor status", "Swag and rewards", "Mentorship opportunities", "Resume boost"],
      apply: "/contribute"
    },
    {
      title: "Community Mentors",
      description: "Share your expertise and help fellow developers learn and grow in their AI development journey.",
      icon: <BookOpen className="w-6 h-6" />,
      benefits: ["Mentor badge", "Priority support", "Exclusive workshops", "Networking events"],
      apply: "/mentorship"
    },
    {
      title: "Beta Testers",
      description: "Get early access to new features and help us improve AutoGen before official releases.",
      icon: <Zap className="w-6 h-6" />,
      benefits: ["Early feature access", "Direct feedback channel", "Bug bounty rewards", "Beta tester recognition"],
      apply: "/beta"
    }
  ];

  const upcomingEvents = [
    {
      title: "AutoGen Developer Conference 2025",
      date: "March 15-17, 2025",
      type: "Virtual Conference",
      description: "Join us for our biggest event of the year featuring workshops, keynotes, and networking.",
      attendees: "5,000+ expected",
      status: "Early Bird"
    },
    {
      title: "AI Code Generation Workshop",
      date: "February 28, 2025",
      type: "Online Workshop",
      description: "Learn advanced techniques for AI-powered code generation and optimization.",
      attendees: "500 spots",
      status: "Registration Open"
    },
    {
      title: "Community Showcase",
      date: "February 14, 2025",
      type: "Virtual Meetup",
      description: "Community members present their amazing projects built with AutoGen tools.",
      attendees: "1,000+ participants",
      status: "Free Event"
    },
    {
      title: "Open Source Contribution Day",
      date: "January 30, 2025",
      type: "Global Event",
      description: "Worldwide event where we contribute to open-source projects together.",
      attendees: "2,000+ contributors",
      status: "Join Anytime"
    }
  ];

  const featuredMembers = [
    {
      name: "Alex Chen",
      role: "Community Leader",
      bio: "Full-stack developer who has built 20+ projects using AutoGen. Active mentor and contributor.",
      contributions: ["100+ forum answers", "5 open-source contributions", "Workshop organizer"],
      avatar: "AC"
    },
    {
      name: "Sarah Rodriguez",
      role: "AI Researcher",
      bio: "PhD in Machine Learning, shares cutting-edge AI development techniques with the community.",
      contributions: ["50+ technical posts", "Research paper author", "Beta tester"],
      avatar: "SR"
    },
    {
      name: "David Kim",
      role: "Open Source Contributor",
      bio: "Senior engineer who has contributed significantly to our core libraries and documentation.",
      contributions: ["Major code contributions", "Documentation improvements", "Bug fixes"],
      avatar: "DK"
    },
    {
      name: "Emily Watson",
      role: "Content Creator",
      bio: "Creates amazing tutorials and educational content to help developers learn AutoGen.",
      contributions: ["Video tutorials", "Blog posts", "Live streaming"],
      avatar: "EW"
    }
  ];

  const communityResources = [
    {
      title: "Getting Started Guide",
      description: "Everything you need to know to join and participate in our community.",
      icon: <BookOpen className="w-5 h-5" />,
      link: "/community/getting-started"
    },
    {
      title: "Community Guidelines",
      description: "Our code of conduct and guidelines for respectful community participation.",
      icon: <Heart className="w-5 h-5" />,
      link: "/community/guidelines"
    },
    {
      title: "FAQ",
      description: "Frequently asked questions about community participation and programs.",
      icon: <HelpCircle className="w-5 h-5" />,
      link: "/community/faq"
    },
    {
      title: "Contribution Guide",
      description: "Learn how to contribute to our open-source projects and community initiatives.",
      icon: <Code className="w-5 h-5" />,
      link: "/community/contribute"
    }
  ];

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
              Join Our Community
            </motion.h1>
            <motion.p 
              variants={fadeInUp}
              className="text-xl md:text-2xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            >
              Connect with thousands of developers building the future with AI. Share knowledge, 
              get support, and contribute to the growing AutoGen ecosystem.
            </motion.p>
            <motion.div 
              variants={fadeInUp}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link 
                href="https://discord.gg/autogen"
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <MessageSquareText className="w-5 h-5" />
                Join Discord
              </Link>
              <Link 
                href="#channels"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Explore Channels
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Community Stats */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community at a Glance</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Our vibrant community continues to grow every day with passionate developers from around the world.
            </p>
          </motion.div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {communityStats.map((stat, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="text-center bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">{stat.number}</div>
                <div className="text-lg font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-sm text-gray-400">{stat.description}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Channels */}
      <section id="channels" className="py-20 bg-black/30">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Where We Connect</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Choose your preferred platform to engage with our community and get the support you need.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityChannels.map((channel, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-8 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
              >
                <div className={`w-16 h-16 bg-gradient-to-r ${channel.color} rounded-xl flex items-center justify-center text-white mb-6`}>
                  {channel.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{channel.name}</h3>
                <p className="text-gray-300 mb-4 leading-relaxed">{channel.description}</p>
                <div className="text-purple-400 font-medium mb-4">{channel.members}</div>
                <div className="space-y-2 mb-6">
                  {channel.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <div className="w-1.5 h-1.5 bg-purple-400 rounded-full"></div>
                      {feature}
                    </div>
                  ))}
                </div>
                <Link 
                  href={channel.link}
                  className="inline-flex items-center gap-2 text-purple-400 hover:text-purple-300 transition-colors font-medium"
                >
                  Join Community <ExternalLink className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Programs */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community Programs</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Take your community involvement to the next level with our special programs and initiatives.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {communityPrograms.map((program, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="p-3 bg-purple-500/10 rounded-full border border-purple-500/20">
                    <div className="text-purple-400">{program.icon}</div>
                  </div>
                  <h3 className="text-xl font-bold">{program.title}</h3>
                </div>
                <p className="text-gray-300 mb-6 leading-relaxed">{program.description}</p>
                <div className="space-y-2 mb-6">
                  {program.benefits.map((benefit, benefitIndex) => (
                    <div key={benefitIndex} className="flex items-center gap-2 text-sm text-gray-400">
                      <Star className="w-4 h-4 text-purple-400" />
                      {benefit}
                    </div>
                  ))}
                </div>
                <Link 
                  href={program.apply}
                  className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                >
                  Apply Now <ArrowRight className="w-4 h-4" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Upcoming Events</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Join our community events to learn, network, and showcase your projects with fellow developers.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {upcomingEvents.map((event, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{event.title}</h3>
                    <div className="flex items-center gap-4 text-sm text-gray-400 mb-2">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {event.date}
                      </div>
                      <div className="flex items-center gap-1">
                        <Globe className="w-4 h-4" />
                        {event.type}
                      </div>
                    </div>
                  </div>
                  <span className="bg-green-500/10 text-green-400 px-2 py-1 rounded text-xs font-medium">
                    {event.status}
                  </span>
                </div>
                <p className="text-gray-300 mb-4 leading-relaxed">{event.description}</p>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1 text-sm text-purple-400">
                    <Users className="w-4 h-4" />
                    {event.attendees}
                  </div>
                  <Link 
                    href="/events"
                    className="text-purple-400 hover:text-purple-300 transition-colors text-sm font-medium"
                  >
                    Learn More
                  </Link>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Members */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Featured Community Members</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Meet some of our most active and influential community members who are helping shape the future of AutoGen.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredMembers.map((member, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105 text-center"
              >
                <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-xl font-bold mx-auto mb-4">
                  {member.avatar}
                </div>
                <h3 className="text-lg font-bold mb-1">{member.name}</h3>
                <p className="text-purple-400 font-medium text-sm mb-3">{member.role}</p>
                <p className="text-gray-300 text-sm leading-relaxed mb-4">{member.bio}</p>
                <div className="space-y-1">
                  {member.contributions.map((contribution, contribIndex) => (
                    <div key={contribIndex} className="text-xs text-gray-400 bg-gray-800 rounded px-2 py-1">
                      {contribution}
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Community Resources */}
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
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Community Resources</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Everything you need to know about participating in our community and making the most of your experience.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {communityResources.map((resource, index) => (
              <motion.div
                key={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={fadeInUp}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Link 
                  href={resource.link}
                  className="block bg-gray-900/50 border border-gray-800 rounded-xl p-6 hover:border-purple-500/50 transition-all duration-300 hover:transform hover:scale-105"
                >
                  <div className="text-purple-400 mb-4">{resource.icon}</div>
                  <h3 className="text-lg font-bold mb-2">{resource.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{resource.description}</p>
                  <div className="flex items-center gap-1 text-purple-400 text-sm mt-4">
                    Learn More <ArrowRight className="w-3 h-3" />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="max-w-4xl mx-auto px-6 md:px-8 text-center">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeInUp}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to Join?</h2>
            <p className="text-xl text-gray-300 mb-8">
              Become part of the most innovative AI development community. Connect, learn, and build amazing things together.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link 
                href="https://discord.gg/autogen"
                className="bg-indigo-600 hover:bg-indigo-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2"
              >
                <MessageSquareText className="w-5 h-5" />
                Join Discord Community
              </Link>
              <Link 
                href="/contact"
                className="border border-gray-600 hover:border-purple-500 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:bg-purple-600/10"
              >
                Contact Us
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
