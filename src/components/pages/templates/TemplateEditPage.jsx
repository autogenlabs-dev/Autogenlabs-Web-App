'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, X, Plus, Github, Globe, IndianRupee, DollarSign, Save, Eye } from 'lucide-react';
import Link from 'next/link';
import { templateCategories, difficultyLevels, templateTypes, planTypes } from '../lib/templateData';
import { useTemplate } from '../contexts/TemplateContext';
import { useAuth } from '../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { marketplaceApi } from '../lib/marketplaceApi';

const TemplateEditPage = ({ templateId }) => {
  const { loading: updateLoading, error: updateError } = useTemplate();
  const { user, isAuthenticated } = useAuth();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [template, setTemplate] = useState(null);
  const [error, setError] = useState(null);
  
  // Form data matching the create form structure
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
    templateImage: null
  });

  const [dependency, setDependency] = useState('');

  // Check if user is authenticated
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Authentication Required</h1>
          <p className="text-gray-400 mb-6">Please log in to edit templates.</p>
          <Link href="/auth" className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors">
            Go to Login
          </Link>
        </div>
      </div>
    );
  }

  useEffect(() => {
    if (templateId) {
      fetchTemplate();
    }
  }, [templateId]);

  const fetchTemplate = async () => {
    try {
      setLoading(true);
      setError(null);
      const templateData = await marketplaceApi.getTemplate(templateId);
      
      setTemplate(templateData);
      
      // Pre-fill form with existing data using the same field names as create form
      setFormData({
        title: templateData.title || '',
        category: templateData.category || '',
        gitRepoUrl: templateData.git_repo_url || templateData.gitRepoUrl || '',
        liveDemoUrl: templateData.live_demo_url || templateData.liveDemoUrl || '',
        difficultyLevel: templateData.difficulty_level || templateData.difficultyLevel || '',
        type: templateData.type || '',
        language: templateData.language || '',
        developerName: templateData.developer_name || templateData.developerName || '',
        developerExperience: templateData.developer_experience || templateData.developerExperience || '',
        isAvailableForDev: templateData.is_available_for_dev !== undefined ? templateData.is_available_for_dev : true,
        planType: templateData.plan_type || templateData.planType || '',
        pricingINR: templateData.price_inr || templateData.pricingINR || '',
        pricingUSD: templateData.price_usd || templateData.pricingUSD || '',
        shortDescription: templateData.short_description || templateData.shortDescription || templateData.description || '',
        fullDescription: templateData.full_description || templateData.fullDescription || '',
        dependencies: templateData.dependencies || [],
        templateImage: null
      });
    } catch (err) {
      console.error('Failed to fetch template:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleAddDependency = () => {
    if (dependency.trim() && !formData.dependencies.includes(dependency.trim())) {
      setFormData(prev => ({
        ...prev,
        dependencies: [...prev.dependencies, dependency.trim()]
      }));
      setDependency('');
    }
  };

  const handleRemoveDependency = (index) => {
    setFormData(prev => ({
      ...prev,
      dependencies: prev.dependencies.filter((_, i) => i !== index)
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        templateImage: file
      }));
    }
  };

  const isFormValid = () => {
    return formData.title.trim() && formData.category && formData.shortDescription.trim();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isFormValid()) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setLoading(true);
      
      // Prepare template data for API (convert to backend field names)
      const templateData = {
        title: formData.title,
        category: formData.category,
        type: formData.type,
        language: formData.language,
        difficulty_level: formData.difficultyLevel,
        plan_type: formData.planType,
        short_description: formData.shortDescription,
        full_description: formData.fullDescription,
        git_repo_url: formData.gitRepoUrl,
        live_demo_url: formData.liveDemoUrl,
        dependencies: formData.dependencies,
        developer_name: formData.developerName,
        developer_experience: formData.developerExperience,
        is_available_for_dev: formData.isAvailableForDev
      };
      
      // Update template
      await marketplaceApi.updateTemplate(templateId, templateData);
      
      alert('Template updated successfully!');
      router.push('/templates');
    } catch (error) {
      console.error('Failed to update template:', error);
      alert('Failed to update template. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto mb-4">
            <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
          </div>
          <p className="text-gray-400">Loading template...</p>
        </div>
      </div>
    );
  }

  if (error || !template) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Template Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The template you're looking for doesn't exist."}</p>
          <Link href="/templates">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Back
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center gap-4 mb-8">
            <button 
              onClick={() => window.history.back()}
              className="text-purple-400 hover:text-purple-300 transition-colors"
            >
              <ArrowLeft className="w-6 h-6" />
            </button>
            <div>
              <h1 className="text-3xl font-bold">Edit Template</h1>
              <p className="text-gray-400">Update your template details and information</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Basic Information</h2>
              
              {/* Template Title */}
              <div className="mb-6">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                    type="text"
                    value={formData.developerExperience}
                    onChange={(e) => handleInputChange('developerExperience', e.target.value)}
                    placeholder="5"
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
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={dependency}
                    onChange={(e) => setDependency(e.target.value)}
                    placeholder="e.g., React, Tailwind CSS"
                    className="flex-1 p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddDependency())}
                  />
                  <button
                    type="button"
                    onClick={handleAddDependency}
                    className="px-4 py-3 bg-purple-600 text-white rounded-xl hover:bg-purple-700 transition-colors flex items-center gap-2"
                  >
                    <Plus className="w-4 h-4" />
                    Add
                  </button>
                </div>

                {/* Dependencies List */}
                {formData.dependencies.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {formData.dependencies.map((dep, index) => (
                      <span
                        key={index}
                        className="inline-flex items-center gap-2 px-3 py-1 bg-purple-600/20 text-purple-300 rounded-lg text-sm"
                      >
                        {dep}
                        <button
                          type="button"
                          onClick={() => handleRemoveDependency(index)}
                          className="text-purple-400 hover:text-red-400 transition-colors"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Pricing */}
            <div className="bg-white/5 rounded-2xl p-8 border border-white/10">
              <h2 className="text-2xl font-bold mb-6">Pricing</h2>
              
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Plan Type
                </label>
                <select
                  value={formData.planType}
                  onChange={(e) => handleInputChange('planType', e.target.value)}
                  className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:border-purple-500/50"
                >
                  <option value="Free" className="bg-gray-800">Free</option>
                </select>
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
                    placeholder="A brief description of your template (max 150 characters)"
                    maxLength={150}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50"
                    required
                  />
                  <p className="text-xs text-gray-400 mt-1">
                    {formData.shortDescription.length}/150 characters
                  </p>
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
                    rows={6}
                    className="w-full p-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-purple-500/50 resize-none"
                  />
                </div>
              </div>
            </div>

            {/* Submit Buttons */}
            <div className="flex justify-end gap-4">
              <Link href="/templates">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </Link>
              
              <button
                type="submit"
                disabled={loading || !isFormValid()}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
              >
                {loading ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Template
                  </>
                )}
              </button>
            </div>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default TemplateEditPage;

