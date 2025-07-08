'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Upload, X, Plus, Github, Globe, IndianRupee, DollarSign, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { templateCategories, difficultyLevels, templateTypes, planTypes } from '@/lib/templateData';
import { useTemplate } from '@/contexts/TemplateContext';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';

const CreateTemplateForm = () => {
    const { createTemplate, loading, error } = useTemplate();
    const { user, isAuthenticated } = useAuth(); // Use isAuthenticated instead of accessToken
    const router = useRouter();
    
    // Debug authentication state
    console.log('CreateTemplateForm: User:', user);
    console.log('CreateTemplateForm: Is Authenticated:', isAuthenticated);
    console.log('CreateTemplateForm: Access Token:', localStorage.getItem('access_token') ? 'Present' : 'Missing');
    
    // Check if user is authenticated
    if (!isAuthenticated) {
        return (
            <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
                    <p className="text-gray-400 mb-6">Please log in to create a template.</p>
                    <Link href="/auth" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
                        Go to Login
                    </Link>
                </div>
            </div>
        );
    }
    
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
        previewImage: null,
        gifVideo: null
    });

    const [newDependency, setNewDependency] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPreview, setShowPreview] = useState(false);
    const [submitError, setSubmitError] = useState(null);
    const [submitSuccess, setSubmitSuccess] = useState(false);

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

    const handleFileUpload = (field, file) => {
        setFormData(prev => ({
            ...prev,
            [field]: file
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log('🚀 Form submission started!');
        console.log('🔍 User:', user);
        console.log('🔍 Is Authenticated:', isAuthenticated);
        console.log('🔍 Form Data:', formData);
        console.log('🔍 Form Valid:', isFormValid());
        
        setIsSubmitting(true);
        setSubmitError(null);
        setSubmitSuccess(false);

        try {
            console.log('🔍 About to validate form...');
            
            if (!isFormValid()) {
                console.log('❌ Form is not valid, stopping submission');
                alert('Please fill in all required fields');
                return;
            }
            
            console.log('✅ Form validation passed');
            
            // Prepare template data for API
            const templateData = {
                title: formData.title,
                category: formData.category,
                type: formData.type,
                language: formData.language,
                difficulty_level: formData.difficultyLevel,
                plan_type: formData.planType,
                pricing_inr: parseInt(formData.pricingINR) || 0,
                pricing_usd: parseInt(formData.pricingUSD) || 0,
                short_description: formData.shortDescription,
                full_description: formData.fullDescription,
                preview_images: formData.previewImage ? [URL.createObjectURL(formData.previewImage)] : [], // Only add image if uploaded
                git_repo_url: formData.gitRepoUrl,
                live_demo_url: formData.liveDemoUrl,
                dependencies: formData.dependencies,
                tags: [], // You can add tags if needed
                developer_name: formData.developerName,
                developer_experience: formData.developerExperience,
                is_available_for_dev: formData.isAvailableForDev,
                code: formData.fullDescription, // Use description as code for now
                readme_content: `# ${formData.title}\n\n${formData.fullDescription}\n\n## Dependencies\n${formData.dependencies.join(', ')}`,
                featured: false,
                popular: false
            };

            console.log('📦 Template data to submit:', templateData);
            console.log('🔄 About to call createTemplate function...');
            
            if (!createTemplate) {
                console.error('❌ createTemplate function is not available!');
                throw new Error('Template creation function not available');
            }
            
            console.log('✅ createTemplate function is available, calling it now...');

            // Use the createTemplate function from context
            const result = await createTemplate(templateData);

            console.log('Template created successfully:', result);
            setSubmitSuccess(true);
            
            // Show success message
            alert('Template created successfully!');
            
            // Redirect to templates page after a short delay
            setTimeout(() => {
                router.push('/templates');
            }, 1500);

        } catch (error) {
            console.error('Error creating template:', error);
            const errorMessage = error.message || 'Failed to create template. Please try again.';
            setSubmitError(errorMessage);
            alert(`Error creating template: ${errorMessage}`);
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

        if (hasRequiredFields && hasPricing) {
            return true;
        }
        return false;
    };

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">

            {/* Header */}
            <div className="sticky top-0 z-50 bg-black/50 backdrop-blur-sm border-b border-white/10">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <Link href="/templates">
                        <button className="flex items-center gap-2 text-gray-400 hover:text-white transition-colors">
                            <ArrowLeft className="w-5 h-5" />
                            Back to Templates
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
                        <span className="bg-gradient-to-r from-purple-400 to-cyan-400 bg-clip-text text-transparent">
                            Template
                        </span>
                    </h1>
                    <p className="text-xl text-gray-400 max-w-2xl mx-auto">
                        Share your amazing work with the community and earn from your templates
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
                            {/* Template Title */}
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Template Title *
                                </label>
                                <input
                                    type="text"
                                    value={formData.title}
                                    onChange={(e) => handleInputChange('title', e.target.value)}
                                    placeholder="e.g., Modern Admin Dashboard"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
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
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Category</option>
                                    {templateCategories.map(category => (
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
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
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
                                    Template Type *
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => handleInputChange('type', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Type</option>
                                    {templateTypes.map(type => (
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
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
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
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
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
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
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
                                        className="w-5 h-5 rounded bg-white/10 border border-white/20 text-purple-500 focus:ring-purple-500/50"
                                    />
                                    <span className="text-gray-300">I am available for development work</span>
                                </label>
                            </div>
                        </div>
                    </div>

                    {/* Links */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Links</h2>

                        <div className="space-y-4">
                            {/* Git Repository */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Git Repository URL *
                                </label>
                                <div className="relative">
                                    <Github className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="url"
                                        value={formData.gitRepoUrl}
                                        onChange={(e) => handleInputChange('gitRepoUrl', e.target.value)}
                                        placeholder="https://github.com/username/repo"
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Live Demo URL */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Live Demo URL (Optional)
                                </label>
                                <div className="relative">
                                    <Globe className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                    <input
                                        type="url"
                                        value={formData.liveDemoUrl}
                                        onChange={(e) => handleInputChange('liveDemoUrl', e.target.value)}
                                        placeholder="https://demo.example.com"
                                        className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Dependencies</h2>

                        <div className="space-y-4">
                            {/* Add Dependency */}
                            <div className="flex gap-3">
                                <input
                                    type="text"
                                    value={newDependency}
                                    onChange={(e) => setNewDependency(e.target.value)}
                                    placeholder="e.g., React, Tailwind CSS"
                                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDependency())}
                                />
                                <button
                                    type="button"
                                    onClick={handleAddDependency}
                                    className="px-6 py-3 bg-purple-500/20 border border-purple-500/30 rounded-xl text-purple-400 hover:bg-purple-500/30 transition-all duration-300 flex items-center gap-2"
                                >
                                    <Plus className="w-5 h-5" />
                                    Add
                                </button>
                            </div>

                            {/* Dependencies List */}
                            {formData.dependencies.length > 0 && (
                                <div className="flex flex-wrap gap-2">
                                    {formData.dependencies.map((dep, index) => (
                                        <div
                                            key={index}
                                            className="flex items-center gap-2 px-3 py-1 bg-white/10 border border-white/20 rounded-lg text-gray-300"
                                        >
                                            <span>{dep}</span>
                                            <button
                                                type="button"
                                                onClick={() => handleRemoveDependency(index)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Pricing */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Pricing</h2>

                        <div className="space-y-6">
                            {/* Plan Type */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Plan Type *
                                </label>
                                <select
                                    value={formData.planType}
                                    onChange={(e) => handleInputChange('planType', e.target.value)}
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                                    required
                                >
                                    <option value="" className="bg-gray-800">Select Plan Type</option>
                                    {planTypes.map(plan => (
                                        <option key={plan} value={plan} className="bg-gray-800">
                                            {plan}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            {/* Pricing Fields - Only show if Paid */}
                            {formData.planType === 'Paid' && (
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Price in INR *
                                        </label>
                                        <div className="relative">
                                            <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="number"
                                                value={formData.pricingINR}
                                                onChange={(e) => handleInputChange('pricingINR', e.target.value)}
                                                placeholder="2999"
                                                min="0"
                                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                                required={formData.planType === 'Paid'}
                                            />
                                        </div>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-300 mb-2">
                                            Price in USD *
                                        </label>
                                        <div className="relative">
                                            <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                                            <input
                                                type="number"
                                                value={formData.pricingUSD}
                                                onChange={(e) => handleInputChange('pricingUSD', e.target.value)}
                                                placeholder="35"
                                                min="0"
                                                className="w-full pl-12 pr-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                                required={formData.planType === 'Paid'}
                                            />
                                        </div>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Description</h2>

                        <div className="space-y-6">
                            {/* Short Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Short Description *
                                </label>
                                <input
                                    type="text"
                                    value={formData.shortDescription}
                                    onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                    placeholder="A brief description of your template (max 100 characters)"
                                    maxLength="100"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                                    required
                                />
                                <div className="text-right text-sm text-gray-400 mt-1">
                                    {formData.shortDescription.length}/100
                                </div>
                            </div>

                            {/* Full Description */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Description (Optional)
                                </label>
                                <textarea
                                    value={formData.fullDescription}
                                    onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                    placeholder="Detailed description of your template, features, and use cases..."
                                    rows="6"
                                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-vertical"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Media Upload */}
                    <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
                        <h2 className="text-2xl font-bold mb-6">Media</h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {/* Preview Image */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Preview Image
                                </label>
                                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors duration-300">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-400 mb-4">Click to upload or drag and drop</p>
                                    <input
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => handleFileUpload('previewImage', e.target.files[0])}
                                        className="hidden"
                                        id="preview-image"
                                    />
                                    <label
                                        htmlFor="preview-image"
                                        className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer"
                                    >
                                        Choose Image
                                    </label>
                                    {formData.previewImage && (
                                        <p className="text-green-400 text-sm mt-2">
                                            ✓ {formData.previewImage.name}
                                        </p>
                                    )}
                                </div>
                            </div>

                            {/* GIF Video */}
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-3">
                                    Short GIF/Video Preview (Optional)
                                </label>
                                <div className="border-2 border-dashed border-white/20 rounded-xl p-6 text-center hover:border-purple-500/30 transition-colors duration-300">
                                    <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                                    <p className="text-gray-400 mb-4">GIF or short video (max 10MB)</p>
                                    <input
                                        type="file"
                                        accept="image/gif,video/*"
                                        onChange={(e) => handleFileUpload('gifVideo', e.target.files[0])}
                                        className="hidden"
                                        id="gif-video"
                                    />
                                    <label
                                        htmlFor="gif-video"
                                        className="px-4 py-2 bg-purple-500/20 border border-purple-500/30 rounded-lg text-purple-400 hover:bg-purple-500/30 transition-all duration-300 cursor-pointer"
                                    >
                                        Choose File
                                    </label>
                                    {formData.gifVideo && (
                                        <p className="text-green-400 text-sm mt-2">
                                            ✓ {formData.gifVideo.name}
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center pt-8">
                        <button
                            type="submit"
                            disabled={!isFormValid() || isSubmitting}
                            className={`px-12 py-4 rounded-xl font-bold text-lg transition-all duration-300 flex items-center gap-3 ${
                                isFormValid() && !isSubmitting
                                    ? 'bg-gradient-to-r from-purple-600 to-cyan-600 text-white hover:from-purple-700 hover:to-cyan-700 hover:scale-105 shadow-lg hover:shadow-purple-500/25'
                                    : 'bg-gray-600 text-gray-400 cursor-not-allowed'
                            }`}
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-gray-400 border-t-white rounded-full animate-spin"></div>
                                    Submitting...
                                </>
                            ) : (
                                <>
                                    <Save className="w-5 h-5" />
                                    Submit Template
                                </>
                            )}
                        </button>
                    </div>
                </motion.form>
            </div>
        </div>
    );
};

export default CreateTemplateForm;
