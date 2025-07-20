'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Plus, Search, Edit, Trash2, Eye, Download, Star, ExternalLink } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import { componentApi } from '@/lib/componentApi';

const MyComponentsPage = () => {
    const [components, setComponents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filteredComponents, setFilteredComponents] = useState([]);
    const [isDeleting, setIsDeleting] = useState(null);

    useEffect(() => {
        fetchUserComponents();
    }, []);

    useEffect(() => {
        // Filter components based on search term
        const filtered = components.filter(component =>
            component.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
            component.shortDescription.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredComponents(filtered);
    }, [components, searchTerm]);

    const fetchUserComponents = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await componentApi.getUserComponents();
            const transformedComponents = response.components.map(component =>
                componentApi.transformComponentData(component)
            );
            setComponents(transformedComponents);
        } catch (err) {
            console.error('Failed to fetch user components:', err);
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const handleDeleteComponent = async (componentId) => {
        if (!confirm('Are you sure you want to delete this component? This action cannot be undone.')) {
            return;
        }

        try {
            setIsDeleting(componentId);
            await componentApi.deleteComponent(componentId);
            
            // Remove from local state
            setComponents(prev => prev.filter(c => c.id !== componentId));
            
            // Show success message
            alert('Component deleted successfully');
        } catch (err) {
            console.error('Failed to delete component:', err);
            alert('Failed to delete component: ' + err.message);
        } finally {
            setIsDeleting(null);
        }
    };

    const getDifficultyColor = (level) => {
        switch (level) {
            case 'Easy': return 'bg-green-500/20 text-green-400 border-green-500/30';
            case 'Medium': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
            case 'Tough': return 'bg-red-500/20 text-red-400 border-red-500/30';
            default: return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        }
    };

    const getPlanColor = (planType) => {
        return planType === 'Free'
            ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
            : 'bg-purple-500/20 text-purple-400 border-purple-500/30';
    };

    if (loading) {
        return (
            <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white min-h-screen py-20">
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto">
                            <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
                        </div>
                        <p className="text-gray-400 mt-4">Loading your components...</p>
                    </div>
                </div>
            </section>
        );
    }

    if (error) {
        return (
            <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white min-h-screen py-20">
                <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
                    <div className="text-center">
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                            <span className="text-red-400 text-2xl">⚠</span>
                        </div>
                        <h3 className="text-xl font-semibold text-red-400 mb-2">Failed to load components</h3>
                        <p className="text-gray-400 mb-4">{error}</p>
                        <button 
                            onClick={fetchUserComponents}
                            className="px-6 py-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                </div>
            </section>
        );
    }

    return (
        <section className="relative w-full bg-[linear-gradient(180deg,#0D0B12_0%,#040406_100%)] text-white min-h-screen py-20">
            {/* Background Elements */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-emerald-500/5 to-teal-500/5 rounded-full blur-3xl" />
                <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-gradient-to-r from-indigo-500/5 to-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-8">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-12"
                >
                    <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent mb-6">
                        My Components
                    </h1>
                    <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
                        Manage and track your component library
                    </p>

                    {/* Action Bar */}
                    <div className="flex flex-col md:flex-row gap-4 items-center justify-center mb-8">
                        <Link href="/components/create">
                            <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-emerald-500/25 flex items-center gap-2">
                                <Plus className="w-5 h-5" />
                                Create New Component
                            </button>
                        </Link>
                        
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="text"
                                placeholder="Search your components..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="pl-10 pr-4 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors w-80"
                            />
                        </div>
                    </div>
                </motion.div>

                {/* Components Grid */}
                {filteredComponents.length === 0 ? (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center py-20"
                    >
                        <div className="w-24 h-24 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                            <Plus className="w-8 h-8 text-gray-400" />
                        </div>
                        <h3 className="text-2xl font-semibold text-gray-300 mb-4">
                            {components.length === 0 ? 'No components yet' : 'No matching components'}
                        </h3>
                        <p className="text-gray-400 mb-8">
                            {components.length === 0 
                                ? 'Start building your component library by creating your first component'
                                : 'Try adjusting your search terms'
                            }
                        </p>
                        {components.length === 0 && (
                            <Link href="/components/create">
                                <button className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105">
                                    Create Your First Component
                                </button>
                            </Link>
                        )}
                    </motion.div>
                ) : (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredComponents.map((component, index) => (
                            <motion.div
                                key={component.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.1 }}
                                className="group bg-gray-900/50 backdrop-blur-sm border border-gray-800 rounded-2xl overflow-hidden hover:border-emerald-500/50 transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-emerald-500/10"
                            >
                                {/* Component Image */}
                                <div className="relative h-48 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                                    {(() => {
                                        // Get fallback image based on category
                                        const getCategoryImage = (category) => {
                                            const categoryImageMap = {
                                                'Navigation': '/components/navbar-preview.svg',
                                                'Layout': '/components/sidebar-preview.svg',
                                                'Forms': '/components/contact-form-preview.svg',
                                                'Data Display': '/components/data-table-preview.svg',
                                                'User Interface': '/components/modal-dialog-preview.svg',
                                                'Content': '/components/pricing-cards-preview.svg',
                                                'Media': '/components/image-gallery-preview.svg',
                                                'Interactive': '/components/hero-section-preview.svg',
                                                'Widgets': '/components/sidebar-preview.svg',
                                                'Sections': '/components/hero-section-preview.svg'
                                            };
                                            return categoryImageMap[category] || '/components/navbar-preview.svg';
                                        };

                                        const imageSource = (component.previewImages && component.previewImages.length > 0) 
                                            ? component.previewImages[0] 
                                            : getCategoryImage(component.category);

                                        return (
                                            <Image
                                                src={imageSource}
                                                alt={component.title}
                                                fill
                                                className="object-cover group-hover:scale-110 transition-transform duration-300"
                                                onError={(e) => {
                                                    // Fallback to default image if original fails to load
                                                    e.target.src = '/components/navbar-preview.svg';
                                                }}
                                            />
                                        );
                                    })()}
                                    
                                    {/* Overlay Actions */}
                                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
                                        <Link href={`/components/${component.id}`}>
                                            <button className="p-2 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors">
                                                <Eye className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <Link href={`/components/${component.id}/edit`}>
                                            <button className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                                                <Edit className="w-4 h-4" />
                                            </button>
                                        </Link>
                                        <button 
                                            onClick={() => handleDeleteComponent(component.id)}
                                            disabled={isDeleting === component.id}
                                            className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            {isDeleting === component.id ? (
                                                <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            ) : (
                                                <Trash2 className="w-4 h-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Component Info */}
                                <div className="p-6">
                                    <div className="flex items-start justify-between mb-3">
                                        <h3 className="text-xl font-semibold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                                            {component.title}
                                        </h3>
                                    </div>

                                    <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                                        {component.shortDescription}
                                    </p>

                                    {/* Tags */}
                                    <div className="flex flex-wrap gap-2 mb-4">
                                        <span className={`px-2 py-1 text-xs rounded-lg border ${getDifficultyColor(component.difficultyLevel)}`}>
                                            {component.difficultyLevel}
                                        </span>
                                        <span className={`px-2 py-1 text-xs rounded-lg border ${getPlanColor(component.planType)}`}>
                                            {component.planType}
                                        </span>
                                        <span className="px-2 py-1 text-xs rounded-lg border bg-gray-700/20 text-gray-300 border-gray-600/30">
                                            {component.type}
                                        </span>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center justify-between text-sm text-gray-400">
                                        <div className="flex items-center gap-4">
                                            <span className="flex items-center gap-1">
                                                <Eye className="w-4 h-4" />
                                                {component.views || 0}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Download className="w-4 h-4" />
                                                {component.downloads || 0}
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                                {component.rating || 0}
                                            </span>
                                        </div>
                                        
                                        {component.gitRepoUrl && (
                                            <a 
                                                href={component.gitRepoUrl}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-emerald-400 transition-colors"
                                            >
                                                <ExternalLink className="w-4 h-4" />
                                            </a>
                                        )}
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </motion.div>
                )}
            </div>
        </section>
    );
};

export default MyComponentsPage;
