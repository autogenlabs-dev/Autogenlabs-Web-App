'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Music, Twitter, MessageCircle, Linkedin, Bot, Youtube } from 'lucide-react';
import LazySpline from '../ui/LazySpline';
import AnimatedLogo from '../ui/AnimatedLogo';

const Footer = () => {
  const socialLinks = [
    { icon: Mail, href: '#', label: 'Email', type: 'component' },
    { icon: Instagram, href: '#', label: 'Instagram', type: 'component' },
    { icon: Music, href: '#', label: 'TikTok', type: 'component' },
    { icon: Twitter, href: '#', label: 'X (Twitter)', type: 'component' },
    { icon: MessageCircle, href: '#', label: 'Discord', type: 'component' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', type: 'component' },
    { icon: Bot, href: '#', label: 'Reddit', type: 'component' },
    { icon: Youtube, href: '#', label: 'YouTube', type: 'component' }
  ];

  const footerSections = {
    product: {
      title: 'Product',
      links: [
        'Codemurf Platform',
        'Infrastructure Plugins',
        'Service Reviews',
        'Pricing',
        'Codemurf for Enterprise'
      ]
    },
    capabilities: {
      title: 'Capabilities',
      links: [
        'Auto-Deploy',
        'Service Mesh',
        'Real-time Monitoring',
        'CI/CD Pipeline'
      ]
    },
    company: {
      title: 'Company',
      links: [
        'About Us',
        'Blog',
        'Careers',
        'Compare',
        'Contact',
        'Partnerships',
        'Terms of Service',
        'Privacy Policy',
        'Security',
        'Codemurf for Government'
      ]
    },
    resources: {
      title: 'Resources',
      links: [
        'Documentation',
        'Changelog',
        'Releases',
        'FAQ',
        'Support',
        'Brand Guidelines',
        'Referrals',
        'Feature Requests',
        'Developer Directory'
      ]
    },
    connect: {
      title: 'Connect',
      links: [
        'Contact',
        'Events',
        'Hackathons',
        'Community',
        'Students'
      ]
    }
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


  const GlobeFallback = () => (
    <div className="w-full h-full relative overflow-hidden">

      <div
        className="absolute inset-0 rounded-full opacity-30"
        style={{
          background: `
            radial-gradient(circle at 30% 30%, rgba(139,92,246,0.4) 0%, transparent 30%),
            radial-gradient(circle at 70% 60%, rgba(6,182,212,0.3) 0%, transparent 35%),
            radial-gradient(circle at 40% 80%, rgba(236,72,153,0.2) 0%, transparent 40%),
            conic-gradient(from 0deg, 
              rgba(139,92,246,0.1), 
              rgba(6,182,212,0.1), 
              rgba(236,72,153,0.1), 
              rgba(139,92,246,0.1)
            )
          `
        }}
      />


      <div
        className="absolute inset-0 opacity-20 animate-spin"
        style={{
          animationDuration: '60s',
          backgroundImage: `
            radial-gradient(circle at center, transparent 40%, rgba(255,255,255,0.1) 41%, rgba(255,255,255,0.1) 42%, transparent 43%),
            conic-gradient(from 0deg, transparent 0deg, rgba(255,255,255,0.1) 20deg, transparent 40deg, rgba(255,255,255,0.1) 60deg, transparent 80deg, rgba(255,255,255,0.1) 100deg, transparent 120deg)
          `
        }}
      />

      {/* Pulsing dots */}
      <div className="absolute inset-0">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-purple-400/40 rounded-full animate-pulse"
            style={{
              top: `${20 + (i * 10)}%`,
              left: `${30 + (i * 8)}%`,
              animationDelay: `${i * 0.5}s`,
              animationDuration: '3s'
            }}
          />
        ))}
      </div>
    </div>
  );

  return (
    <footer className="relative bg-[#0A090E] border-t border-white/10 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-full blur-3xl" />

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

        {/* Glassmorphism accent line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-purple-500/50 to-transparent z-0"></div>
      </div>

      {/* Lazy-loaded Globe Background - Least Critical */}
      <div className="absolute inset-0 flex items-center justify-center opacity-20 z-10">
        <div className="w-[600px] h-[600px] md:w-[800px] md:h-[800px]">
          <LazySpline
            src="https://my.spline.design/worldplanet-Ycw6lsObSLXkBssv9Cw7gr7i/"
            fallback={<GlobeFallback />}
            delay={10000} // Load after 10 seconds (very low priority)
            className="w-full h-full"
            style={{ pointerEvents: 'none' }}
            title="3D Globe Background"
            intersectionDelay={3000} // Wait 3 seconds after in view
          />
        </div>
      </div>

      <div className="relative z-20 max-w-[1864px] mx-auto px-5 pt-16">
        <motion.div
          className="flex flex-col lg:flex-row gap-16"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Left Sidebar */}
          <motion.div
            className="lg:w-80 space-y-8"
            variants={itemVariants}
          >
            {/* Logo & Brand */}
            <div className="space-y-4">
              <AnimatedLogo size={30} />
              <p className="text-gray-400 text-sm leading-relaxed">
                Built to keep your infrastructure in perfect state.
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="space-y-3">
              <div className="grid grid-cols-4 gap-3 w-fit">
                {socialLinks.map((social, index) => {
                  const IconComponent = social.icon;
                  return (
                    <motion.a
                      key={index}
                      href={social.href}
                      className="w-10 h-10 bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-300"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      title={social.label}
                    >
                      <IconComponent size={18} />
                    </motion.a>
                  );
                })}
              </div>
            </div>
          </motion.div>

          {/* Footer Links Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
              {Object.entries(footerSections).map(([key, section], sectionIndex) => (
                <motion.div
                  key={key}
                  className="space-y-4"
                  variants={itemVariants}
                  transition={{ delay: sectionIndex * 0.1 }}
                >
                  <h4 className="text-white font-semibold text-sm uppercase tracking-wide">
                    {section.title}
                  </h4>
                  <ul className="space-y-3">
                    {section.links.map((link, linkIndex) => (
                      <li key={linkIndex}>
                        <a
                          href="#"
                          className="text-gray-400 hover:text-white text-sm transition-colors duration-200 block"
                        >
                          {link}
                        </a>
                      </li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Bottom Section */}
        <motion.div
          className="mt-16 pt-8 pb-16 relative z-10"
          variants={itemVariants}
        >
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400 text-sm">
              © 2024 Codemurf. All rights reserved.
            </div>
            {/* Additional Legal Links */}
            <div className="flex flex-wrap gap-6 text-sm">
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Status
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Cookies
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition-colors">
                Accessibility
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </footer>
  );
};

export default Footer;