'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus, Github, Globe, IndianRupee, DollarSign, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { componentCategories, difficultyLevels, componentTypes, planTypes } from '@/lib/componentData';

const CreateComponentForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        gitRepoUrl: '',
        liveDemoUrl: '',
        difficultyLevel: '',
        type: '',
        language: '',
        developerName: '',
        developerExperience: '',
        isAvailableForDev: true,
        planType: '',
        pricingINR: '',
        pricingUSD: '',
        shortDescription: '',
        fullDescription: '',
        dependencies: [],
        tags: [],
        previewImages: []
    });

    const [newDependency, setNewDependency] = useState('');
    const [newTag, setNewTag] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleAddDependency = () => {
        if (newDependency.trim() && !formData.dependencies.includes(newDependency.trim())) {
            setFormData(prev => ({
                ...prev,
                dependencies: [...prev.dependencies, newDependency.trim()]
            }));
            setNewDependency('');
        }
    };

    const handleRemoveDependency = (index) => {
        setFormData(prev => ({
            ...prev,
            dependencies: prev.dependencies.filter((_, i) => i !== index)
        }));
    };

    const handleAddTag = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const handleRemoveTag = (index) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter((_, i) => i !== index)
        }));
    };

    const handleImageUpload = (files) => {
        if (files && files.length > 0) {
            const imageFiles = Array.from(files).slice(0, 5); // Limit to 5 images
            setFormData(prev => ({
                ...prev,
                previewImages: [...prev.previewImages, ...imageFiles].slice(0, 5)
            }));
        }
    };

    const handleRemoveImage = (index) => {
        setFormData(prev => ({
            ...prev,
            previewImages: prev.previewImages.filter((_, i) => i !== index)
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            // Simulate API call
            await new Promise(resolve => setTimeout(resolve, 2000));

            // In real app, this would make an API call to create the component
            console.log('Component data to submit:', formData);

            alert('Component submitted successfully! It will be reviewed and published soon.');

            // Reset form or redirect
            // window.location.href = '/components';

        } catch (error) {
            console.error('Error submitting component:', error);
            alert('Error submitting component. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    const isFormValid = () => {
        const requiredFields = [
            'title', 'category', 'gitRepoUrl', 'difficultyLevel', 'type',
            'language', 'developerName', 'developerExperience', 'planType',
            'shortDescription'
        ];

        const hasRequiredFields = requiredFields.every(field => formData[field]);
        const hasPricing = formData.planType === 'Free' || (formData.pricingINR && formData.pricingUSD);
        const hasImages = formData.previewImages.length > 0;

        return hasRequiredFields && hasPricing && hasImages;
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/components">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Components
                        </button>
                    </Link>

                    <div className="flex items-center gap-4">
                        <button
                            onClick={() => setShowPreview(!showPreview)}
                            className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/15 transition-all duration-300"
                        >
                            <Eye className="w-5 h-5" />
                            Preview
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-6 py-12">

                {/* Title */}
                <motion.div
                    className="text-center mb-12"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <h1 className="text-4xl font-bold mb-4">
                        Create New{' '}
                        <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                            Component
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Share your amazing UI components with the community and help others build better interfaces
                    </p>
                </motion.div>

                {/* Form */}
                <motion.form
                    onSubmit={handleSubmit}
                    className="space-y-8"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >

                    {/* Basic Information */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Basic Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Component Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Component Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Modern Navigation Bar"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    required
                                />
                            </div>

                            {/* Category */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category *
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Category</option>
                                    {componentCategories.map(category => (
                                        <option key={category} value={category} className="bg-gray-800">
                                            {category}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Difficulty Level */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Difficulty Level *
                                </label>
                                <select
                                    value={formData.difficultyLevel}
                                    onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Difficulty</option>
                                    {difficultyLevels.map(level => (
                                        <option key={level} value={level} className="bg-gray-800">
                                            {level}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Component Type *
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Type</option>
                                    {componentTypes.map(type => (
                                        <option key={type} value={type} className="bg-gray-800">
                                            {type}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Language */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Language/Framework Used *
                                </label>
                                <input
                                    type="text"
                                    value={formData.language}
                                    onChange={(e) => handleInputChange('language', e.target.value)}
                                    placeholder="e.g., React + TypeScript"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    required
                                />
                            </div>
                        </div>
                    </div>

                    {/* Developer Information */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Developer Information</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Developer Name */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Developer Name *
                                </label>
                                <input
                                    type="text"
                                    value={formData.developerName}
                                    onChange={(e) => handleInputChange('developerName', e.target.value)}
                                    placeholder="Your name"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    required
                                />
                            </div>

                            {/* Experience */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Experience (Years) *
                                </label>
                                <input
                                    type="number"
                                    value={formData.developerExperience}
                                    onChange={(e) => handleInputChange('developerExperience', e.target.value)}
                                    placeholder="5"
                                    min="0"
                                    max="50"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    required
                                />
                            </div>

                            {/* Availability Toggle */}
                            <div className="md:col-span-2">
                                <label className="flex items-center gap-3 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.isAvailableForDev}
                                        onChange={(e) => handleInputChange('isAvailableForDev', e.target.checked)}
                                        className="w-5 h-5 rounded bg-white/10 border border-white/20 text-blue-500 focus:ring-blue-500/50"
                                    />
                                    <span className="text-gray-300">I am available for development work</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* URLs */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Repository & Demo Links</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Git Repository URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <Github className="w-4 h-4 inline mr-2" />
                                    Git Repository URL *
                                </label>
                                <input
                                    type="url"
                                    value={formData.gitRepoUrl}
                                    onChange={(e) => handleInputChange('gitRepoUrl', e.target.value)}
                                    placeholder="https://github.com/username/component"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    required
                                />
                            </div>

                            {/* Live Demo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    <Globe className="w-4 h-4 inline mr-2" />
                                    Live Demo URL
                                </label>
                                <input
                                    type="url"
                                    value={formData.liveDemoUrl}
                                    onChange={(e) => handleInputChange('liveDemoUrl', e.target.value)}
                                    placeholder="https://component-demo.vercel.app"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Pricing</h2>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {/* Plan Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Type *
                                </label>
                                <select
                                    value={formData.planType}
                                    onChange={(e) => handleInputChange('planType', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-blue-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Plan</option>
                                    {planTypes.map(plan => (
                                        <option key={plan} value={plan} className="bg-gray-800">
                                            {plan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Pricing INR */}
                            {formData.planType === 'Paid' && (
                                <>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <IndianRupee className="w-4 h-4 inline mr-2" />
                                            Price (INR) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.pricingINR}
                                            onChange={(e) => handleInputChange('pricingINR', e.target.value)}
                                            placeholder="499"
                                            min="0"
                                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                            required={formData.planType === 'Paid'}
                                        />
                                    </div>

                                    {/* Pricing USD */}
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            <DollarSign className="w-4 h-4 inline mr-2" />
                                            Price (USD) *
                                        </label>
                                        <input
                                            type="number"
                                            value={formData.pricingUSD}
                                            onChange={(e) => handleInputChange('pricingUSD', e.target.value)}
                                            placeholder="6"
                                            min="0"
                                            step="0.01"
                                            className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                            required={formData.planType === 'Paid'}
                                        />
                                    </div>
                                </>
                            )}
                        </div>
                    </div>

                    {/* Descriptions */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Descriptions</h2>

                        <div className="space-y-6">
                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Short Description (Max 150 characters) *
                                </label>
                                <textarea
                                    value={formData.shortDescription}
                                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                    placeholder="Brief description of your component..."
                                    maxLength="150"
                                    rows="3"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 resize-none"
                                    required
                                />
                                <div className="text-right text-sm text-gray-400 mt-1">
                                    {formData.shortDescription.length}/150
                                </div>
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Description
                                </label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                    placeholder="Detailed description of your component, its features, and usage..."
                                    rows="6"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50 resize-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Dependencies</h2>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newDependency}
                                    onChange={(e) => setNewDependency(e.target.value)}
                                    placeholder="e.g., react, tailwindcss, framer-motion"
                                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDependency())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddDependency}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>

                            {formData.dependencies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.dependencies.map((dep, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-blue-500/20 text-blue-300 rounded-lg text-sm border border-blue-500/30"
                                        >
                                            {dep}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDependency(index)}
                                                className="text-blue-300 hover:text-white"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Tags */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Tags</h2>

                        <div className="space-y-4">
                            <div className="flex gap-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    placeholder="e.g., responsive, animated, modern"
                                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-blue-500/50"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddTag}
                                    className="px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors flex items-center gap-2"
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </button>
                            </div>

                            {formData.tags.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.tags.map((tag, index) => (
                                        <span
                                            key={index}
                                            className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/20 text-green-300 rounded-lg text-sm border border-green-500/30"
                                        >
                                            {tag}
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveTag(index)}
                                                className="text-green-300 hover:text-white"
                                            >
                                                <X className="w-3 h-3" />
                                            </button>
                                        </span>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Image Upload */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Component Images *</h2>
                        <p className="text-gray-400 mb-6">Upload up to 5 images showcasing your component (PNG, JPG, JPEG)</p>

                        <div className="space-y-6">
                            {/* Upload Area */}
                            <div className="border-2 border-dashed border-white/20 rounded-xl p-8 text-center">
                                <input
                                    type="file"
                                    id="images"
                                    multiple
                                    accept="image/*"
                                    onChange={(e) => handleImageUpload(e.target.files)}
                                    className="hidden"
                                />
                                <label htmlFor="images" className="cursor-pointer">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-lg font-medium text-white mb-2">
                                        Click to upload images
                                    </p>
                                    <p className="text-sm text-gray-400">
                                        PNG, JPG up to 10MB each (Max 5 images)
                                    </p>
                                </label>
                            </div>

                            {/* Uploaded Images Preview */}
                            {formData.previewImages.length > 0 && (
                                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                                    {formData.previewImages.map((file, index) => (
                                        <div key={index} className="relative group">
                                            <div className="aspect-square bg-gray-800 rounded-lg overflow-hidden">
                                                <img
                                                    src={URL.createObjectURL(file)}
                                                    alt={`Preview ${index + 1}`}
                                                    className="w-full h-full object-cover"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveImage(index)}
                                                className="absolute -top-2 -right-2 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className={`px-8 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
                                isFormValid() && !isSubmitting
                                    ? 'bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25'
                                    : 'bg-gray-600 text-gray-300 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Submit Component
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default CreateComponentForm;
