'use client';
import { motion } from 'framer-motion';
import Image from 'next/image';

export default function ThreeSteps() {
  const steps = [
    {
      id: 1,
      title: "Install Visual Studio 2022 – Build Smarter, Code Faster",
      description: "Unlock the power of Visual Studio 2022 with built-in GitHub Copilot support. From AI code generator to AI coding assistant, get intelligent tools that simplify workflows and help developers code with speed and confidence.",
      buttonText: "Download",
      hasDropdown: true,
      image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=400&h=250&fit=crop"
    },
    {
      id: 2,
      title: "Codemurf Brings You Free Copilot Access",
      description: "Get Copilot in Visual Studio at no cost. Explore its code automation tool features with support from Codemurf, no trial, no credit card, only smarter coding.",
      buttonText: "Get Started",
      hasDropdown: false,
      image: "https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=400&h=250&fit=crop"
    },
    {
      id: 3,
      title: "Enable Copilot with Your GitHub Account",
      description: "Add your GitHub account in Visual Studio to unlock Copilot. With Codemurf, you can turn it into an AI code generator and auto code builder for smarter development.",
      buttonText: "Learn more",
      hasDropdown: false,
      image: "https://images.unsplash.com/photo-1618477388954-7852f32655ec?w=400&h=250&fit=crop"
    }
  ];

  return (
    <section className="relative min-h-[120vh] bg-black overflow-hidden py-20">
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

      {/* Content - Centered */}
      <div className="relative z-30 max-w-7xl mx-auto px-8 h-full flex flex-col justify-center">
        
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: false }}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Get started in just 3 steps
          </h2>
        </motion.div>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 w-full">
          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              className="relative group"
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              viewport={{ once: false }}
            >
              {/* Glass Card */}
              <div 
                className="relative rounded-3xl border border-white/20 overflow-hidden shadow-2xl transition-all duration-300 hover:shadow-purple-500/20 hover:border-purple-500/30 h-[600px] flex flex-col"
                style={{
                  background: `linear-gradient(135deg, rgba(139,92,246,0.1) 0%, rgba(6,182,212,0.05) 50%, rgba(236,72,153,0.1) 100%)`,
                  backdropFilter: 'blur(20px)',
                }}
              >
                {/* Step Number */}
                <div className="absolute top-6 left-6 z-10">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-r from-purple-600 to-cyan-600 flex items-center justify-center">
                    <span className="text-white font-bold text-lg">{step.id}</span>
                  </div>
                </div>

                {/* Image */}
                <div className="relative h-64 overflow-hidden">
                  <Image
                    width={400}
                    height={256} 
                    src={step.image} 
                    alt={step.title}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    loading="lazy"
                    placeholder="blur"
                    blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                </div>

                {/* Content */}
                <div className="p-6 space-y-4 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold text-white leading-tight">
                    {step.title}
                  </h3>
                  
                  <p className="text-gray-300 text-sm leading-relaxed flex-1">
                    {step.description}
                  </p>
                  
                  {/* Button */}
                  <div className="pt-4 mt-auto">
                    <motion.button
                      className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                        step.id === 1 
                          ? 'bg-gradient-to-r from-purple-600 to-cyan-600 hover:from-purple-700 hover:to-cyan-700 text-white'
                          : 'bg-white/10 hover:bg-white/20 border border-white/20 hover:border-white/30 text-white'
                      }`}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => {
                        if (step.id === 1 || step.id === 2) {
                          // Download and Get Started buttons open VS Code extension
                          window.open('https://marketplace.visualstudio.com/items?itemName=CodeMurf.codemurf-tools', '_blank');
                        } else if (step.id === 3) {
                          // Learn more button opens docs
                          window.open('/docs', '_blank');
                        }
                      }}
                    >
                      {step.buttonText}
                      {step.hasDropdown && (
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                      )}
                    </motion.button>
                  </div>
                </div>

                {/* Glassmorphism shine effect */}
                <div 
                  className="absolute inset-0 rounded-3xl pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300"
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
        </div>
      </div>
    </section>
  );
}
