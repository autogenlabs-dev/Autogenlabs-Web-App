'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

const AboutUsSection = () => {
  return (
    <section className="relative w-full bg-[linear-gradient(180deg,#07060B_50%,#0A090E_100%)] py-20 overflow-hidden min-h-screen" id='aboutus'>

      {/* Background Elements */}
      <div className="absolute inset-0">
        {/* Glassmorphism background orbs */}
        <div className="absolute top-20 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-500/15 to-pink-500/15 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-gradient-to-r from-cyan-500/15 to-blue-500/15 rounded-full blur-3xl" />
        
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
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-8">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            About Us
          </h2>
          <p className="text-lg text-gray-400 max-w-2xl mx-auto">
            Learn about our journey to revolutionize infrastructure management
          </p>
        </motion.div>
        
        {/* Main Intro */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            At Codemurf, we're redefining how developers interact with their infrastructure.
          </p>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-6">
            Born out of a need for smarter, more intuitive deployment tools, <span className="text-cyan-400 font-semibold">Codemurf</span> is an intelligent infrastructure platform that lives right inside your 
            favorite workflow. It helps you deploy, scale, monitor, and manage applications through seamless automation, making development 
            faster, easier, and a lot more reliable.
          </p>
          
          <p className="text-gray-300 text-lg leading-relaxed mb-8">
            We designed Codemurf for developers who want full control with zero complexity. Every action it suggests—from scaling services to 
            optimizing deployments—requires your approval, ensuring a safe and transparent workflow. And with support for any framework, 
            multiple deployment strategies, and a powerful observability suite under the hood, <span className="text-cyan-400 font-semibold">Codemurf</span> adapts to your needs, whether you're shipping a new 
            feature or architecting an entire system.
          </p>
        </motion.div>

        {/* Large Highlighted Text */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-cyan-400">Let Codemurf</span>{" "}
            <span className="text-white">take care of the infrastructure, so you can focus on building amazing things.</span>
          </h2>
        </motion.div>

        {/* Our Mission Section */}
        <motion.div 
          className="mb-16"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: false }}
        >
          <div className="text-center mb-8">
            <div className="w-16 h-0.5 bg-gradient-to-r from-cyan-400 to-purple-400 mx-auto mb-6"></div>
            <h3 className="text-3xl font-bold text-cyan-400 mb-8">Our Mission</h3>
          </div>
          
          <div className="flex flex-col lg:flex-row items-center gap-12">
            {/* Illustration/Icon */}
            <div className="lg:w-1/3">
              <div className="relative">
                {/* Glass container */}
                <div 
                  className="relative rounded-2xl border border-white/20 p-8 backdrop-blur-sm overflow-hidden"
                  style={{
                    background: `linear-gradient(135deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.05) 100%)`,
                  }}
                >
                  {/* Infrastructure illustration */}
                  <div className="flex flex-col items-center space-y-4">
                     <DotLottieReact
                      src="/ai.lottie"
                      loop={true}
                      autoplay={true}
                      style={{ width: '100%', height: '100%' }}
                    />
                  
                  </div>
                  
                  {/* Glassmorphism shine effect */}
                  <div 
                    className="absolute inset-0 rounded-2xl pointer-events-none"
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
              </div>
            </div>
            
            {/* Mission Text */}
            <div className="lg:w-2/3 space-y-6">
              <p className="text-gray-300 text-lg leading-relaxed">
                At Codemurf, our mission is to make infrastructure management 
                smarter, faster, and more intuitive—without sacrificing developer control.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                We believe that automation should empower developers, not replace 
                them. That's why Codemurf is built to work with you, not for you. 
                Our AI assistant listens carefully, acts transparently, and 
                helps you focus on what truly matters: solving problems and 
                building great software.
              </p>
              
              <p className="text-gray-300 text-lg leading-relaxed">
                Through intelligent tools, contextual awareness, and a 
                conversation-first approach, we're transforming the way 
                developers interact with infrastructure—one smart deployment at a 
                time.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Our Team Section */}
        <motion.div 
          className="text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          viewport={{ once: false }}
        >
          <div className="w-16 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 mx-auto mb-6"></div>
          <h3 className="text-3xl font-bold text-cyan-400 mb-8">Our Team</h3>
          
          <div className="max-w-3xl mx-auto space-y-6">
            <p className="text-gray-300 text-lg leading-relaxed">
              Behind Codemurf is a small but passionate team of developers, designers, and infrastructure enthusiasts 
              driven by one goal: to build tools that genuinely make deployment better.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              We're a curious, fast-moving crew who believe in learning by shipping. Every line of code we 
              write, every feature we build, and every design decision we make is rooted in our 
              commitment to helping developers deploy faster, with more confidence.
            </p>
            
            <p className="text-gray-300 text-lg leading-relaxed">
              We don't just build infrastructure—we live with it. And just like our users, we're constantly iterating, 
              experimenting, and refining our work.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutUsSection;
