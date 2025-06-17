'use client';
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Plus, Loader2 } from 'lucide-react';
import Image from 'next/image';
import TemplateCard from '@/components/ui/TemplateCard';
import { getInitialTemplates, getLoadMoreTemplates, sampleTemplates, mockUser } from '@/lib/templateData';

// Custom hook for intersection observer
const useIntersectionObserver = (options = {}) => {
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const elementRef = useRef(null);

    useEffect(() => {
        const element = elementRef.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsIntersecting(entry.isIntersecting);
                if (entry.isIntersecting && !hasIntersected) {
                    setHasIntersected(true);
                }
            },
            {
                threshold: 0.1,
                rootMargin: '50px',
                ...options,
            }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [hasIntersected, options]);

    return { elementRef, isIntersecting, hasIntersected };
};

const HeroSectionGallery = () => {
    const [displayedTemplates, setDisplayedTemplates] = useState(getInitialTemplates());
    const [isLoading, setIsLoading] = useState(false);
    const [hasMoreTemplates, setHasMoreTemplates] = useState(true);

    const user = mockUser;

    const handleLoadMore = async () => {
        setIsLoading(true);

        // Simulate loading delay
        await new Promise(resolve => setTimeout(resolve, 1000));

        const currentCount = displayedTemplates.length;
        const moreTemplates = getLoadMoreTemplates(currentCount);

        if (moreTemplates.length === 0) {
            setHasMoreTemplates(false);
        } else {
            setDisplayedTemplates(prev => [...prev, ...moreTemplates]);

            // Check if we've loaded all templates
            if (currentCount + moreTemplates.length >= sampleTemplates.length) {
                setHasMoreTemplates(false);
            }
        }

        setIsLoading(false);
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
            transition: { duration: 0.6 }
        }
    };

    return (
        <section className="py-20 px-6 md:px-8 bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">
            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <motion.div
                    className="text-center mb-16"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h2 className="text-4xl md:text-5xl font-bold mb-6">
                        Template{' '}
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Gallery
                        </span>
                    </h2>
                    <p className="text-xl text-gray-400 max-w-3xl mx-auto">
                        Browse our complete collection of professional templates designed to accelerate your development
                    </p>
                </motion.div>

                {/* Templates Grid */}
                <motion.div
                    className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                >
                    <AnimatePresence>
                        {displayedTemplates.map((template, index) => (
                            <motion.div
                                key={template.id}
                                variants={itemVariants}
                                initial="hidden"
                                animate="visible"
                                exit="hidden"
                                layout
                            >
                                <TemplateCard template={template} user={user} />
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>

                {/* Load More Section */}
                {hasMoreTemplates && (
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                    >
                        <button
                            onClick={handleLoadMore}
                            disabled={isLoading}
                            className="group relative px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25 disabled:opacity-70 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-3"
                        >
                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    Loading More Templates...
                                </>
                            ) : (
                                <>
                                    <Plus className="w-5 h-5" />
                                    Load More Templates
                                    <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                                </>
                            )}
                        </button>

                        <p className="text-gray-400 text-sm mt-4">
                            Showing {displayedTemplates.length} of {sampleTemplates.length} templates
                        </p>
                    </motion.div>
                )}

                {/* All Templates Loaded */}
                {!hasMoreTemplates && displayedTemplates.length > 12 && (
                    <motion.div
                        className="text-center mt-16"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-xl text-gray-400">
                            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                            You've seen all our templates! Check back later for new additions.
                        </div>
                    </motion.div>
                )}

                {/* Stats Section */}
                <motion.div
                    className="border-t border-white/10 pt-16 mt-20"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                        {[
                            { number: sampleTemplates.length, label: 'Total Templates', suffix: '+' },
                            { number: sampleTemplates.filter(t => t.planType === 'Free').length, label: 'Free Templates', suffix: '' },
                            { number: sampleTemplates.filter(t => t.featured).length, label: 'Featured', suffix: '' },
                            { number: sampleTemplates.filter(t => t.rating >= 4.5).length, label: 'High Rated', suffix: '+' }
                        ].map((stat, index) => (
                            <motion.div
                                key={index}
                                className="space-y-2"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.6, delay: index * 0.1 }}
                                viewport={{ once: true }}
                            >
                                <div className="text-3xl md:text-4xl font-bold text-white">
                                    {stat.number}{stat.suffix}
                                </div>
                                <div className="text-gray-400 text-sm">
                                    {stat.label}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* Call to Action */}
                <motion.div
                    className="text-center mt-16 p-12 rounded-2xl border border-white/10"
                    style={{
                        background: `linear-gradient(135deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)`,
                        backdropFilter: 'blur(20px)',
                    }}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                >
                    <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">
                        Can't Find What You're Looking For?
                    </h3>
                    <p className="text-gray-400 text-lg mb-8 max-w-2xl mx-auto">
                        Browse our complete collection with advanced filters or request a custom template
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                        <motion.button
                            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-xl font-semibold text-white transition-all duration-300 hover:from-purple-700 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => window.location.href = '/templates'}
                        >
                            Browse All Templates
                        </motion.button>
                        <motion.button
                            className="px-8 py-4 bg-white/10 border border-white/20 rounded-xl font-semibold text-white hover:bg-white/15 transition-all duration-300"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            Request Custom Template
                        </motion.button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default HeroSectionGallery;
