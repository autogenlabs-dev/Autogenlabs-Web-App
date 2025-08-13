'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, Save, X, Upload, Code, Eye, AlertCircle, Copy, IndianRupee } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { marketplaceApi } from '@/lib/marketplaceApi';
import { useAuth } from '@/contexts/AuthContext';
import CodeEditor from '@/components/ui/CodeEditor';

const ComponentEditPage = ({ componentId }) => {
  const router = useRouter();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [component, setComponent] = useState(null);
  const [error, setError] = useState(null);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    type: '',
    language: '',
    difficulty_level: '',
    plan_type: '',
    pricing_inr: 0,
    pricing_usd: 0,
    short_description: '',
    full_description: '',
    dependencies: [],
    tags: [],
    developer_name: '',
    developer_experience: '',
    code: '',
    readme_content: '',
    preview_images: []
  });

  // Component categories and options
  const componentCategories = [
    'Navigation', 'Layout', 'Forms', 'Buttons', 'Cards', 'Data Display',
    'User Interface', 'Content', 'Media', 'Interactive', 'Widgets',
    'Sections', 'Animations', 'Charts', 'Tables', 'Modals', 'Headers', 'Footers', 'Other'
  ];

  const difficultyLevels = ['Easy', 'Medium', 'Tough'];
  const planTypes = ['Free', 'Premium'];
  const componentTypes = ['React', 'Vue', 'Angular', 'HTML/CSS', 'JavaScript'];
  const languages = ['JavaScript', 'TypeScript', 'HTML', 'CSS', 'React', 'Vue', 'Angular'];

  useEffect(() => {
    if (componentId) {
      fetchComponent();
    }
  }, [componentId]);

  const fetchComponent = async () => {
    try {
      setLoading(true);
      setError(null);
      const componentData = await marketplaceApi.getComponent(componentId);
      
      setComponent(componentData);
      
      // Pre-fill form with existing data
      setFormData({
        title: componentData.title || '',
        category: componentData.category || '',
        type: componentData.type || '',
        language: componentData.language || '',
        difficulty_level: componentData.difficulty_level || '',
        plan_type: componentData.plan_type || '',
        pricing_inr: componentData.pricing_inr || 0,
        pricing_usd: componentData.pricing_usd || 0,
        short_description: componentData.short_description || '',
        full_description: componentData.full_description || '',
        dependencies: componentData.dependencies || [],
        tags: componentData.tags || [],
        developer_name: componentData.developer_name || '',
        developer_experience: componentData.developer_experience || '',
        code: componentData.code || '',
        readme_content: componentData.readme_content || '',
        preview_images: componentData.preview_images || []
      });
    } catch (err) {
      console.error('Failed to fetch component:', err);
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

  const handleArrayInput = (field, value) => {
    const array = value.split(',').map(item => item.trim()).filter(item => item);
    setFormData(prev => ({
      ...prev,
      [field]: array
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.title || !formData.category || !formData.short_description) {
      alert('Please fill in all required fields');
      return;
    }

    try {
      setSaving(true);
      
      // Update component with form data
      await marketplaceApi.updateComponent(componentId, formData);
      
      alert('Component updated successfully!');
      router.push('/components');
    } catch (error) {
      console.error('Failed to update component:', error);
      alert('Failed to update component. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full animate-spin mx-auto mb-4">
            <div className="w-full h-full rounded-full border-2 border-white/20 border-t-white"></div>
          </div>
          <p className="text-gray-400">Loading component...</p>
        </div>
      </div>
    );
  }

  if (error || !component) {
    return (
      <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Component Not Found</h1>
          <p className="text-gray-400 mb-8">{error || "The component you're looking for doesn't exist."}</p>
          <Link href="/components">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-xl font-semibold transition-all duration-300 hover:scale-105">
              Back to Components
            </button>
          </Link>
        </div>
      </div>
    );
  }

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
            <Link href={`/components/${componentId}`}>
              <button className="flex items-center gap-2 px-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white hover:bg-white/15 transition-all duration-300">
                <Eye className="w-5 h-5" />
                Preview
              </button>
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-3xl font-bold mb-2">Edit Component</h1>
          <p className="text-gray-400 mb-8">Update your component details and code</p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Basic Information */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-2">
                    Component Title <span className="text-red-400">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Enter component title"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">
                    Category <span className="text-red-400">*</span>
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => handleInputChange('category', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                    required
                  >
                    <option value="">Select Category</option>
                    {componentCategories.map(cat => (
                      <option key={cat} value={cat} className="bg-gray-900">{cat}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Type</label>
                  <select
                    value={formData.type}
                    onChange={(e) => handleInputChange('type', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Type</option>
                    {componentTypes.map(type => (
                      <option key={type} value={type} className="bg-gray-900">{type}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Language</label>
                  <select
                    value={formData.language}
                    onChange={(e) => handleInputChange('language', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Language</option>
                    {languages.map(lang => (
                      <option key={lang} value={lang} className="bg-gray-900">{lang}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Difficulty Level</label>
                  <select
                    value={formData.difficulty_level}
                    onChange={(e) => handleInputChange('difficulty_level', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Difficulty</option>
                    {difficultyLevels.map(level => (
                      <option key={level} value={level} className="bg-gray-900">{level}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Plan Type</label>
                  <select
                    value={formData.plan_type}
                    onChange={(e) => handleInputChange('plan_type', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white focus:border-blue-500 focus:outline-none"
                  >
                    <option value="">Select Plan</option>
                    {planTypes.map(plan => (
                      <option key={plan} value={plan} className="bg-gray-900">{plan}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">Price (INR)</label>
                  <div className="relative">
                    <IndianRupee className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                    <input
                      type="number"
                      value={formData.price_inr || 0}
                      onChange={(e) => handleInputChange('price_inr', parseInt(e.target.value) || 0)}
                      className="w-full pl-12 pr-4 py-2 bg-white/10 border border-white/20 rounded-lg text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="0 for free"
                      min="0"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-4">
                <label className="block text-sm font-medium mb-2">
                  Short Description <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.short_description}
                  onChange={(e) => handleInputChange('short_description', e.target.value)}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                  placeholder="Brief description of the component"
                  required
                />
              </div>
            </div>

            {/* Component Code Section - Same as Detail Page */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
                <Code className="w-5 h-5 text-blue-400" />
                Component Code
              </h2>
              
              {/* Professional Code Editor with Live Preview - Same as Detail Page */}
              <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-xl overflow-hidden">
                <CodeEditor
                  initialCode={formData.code || ''}
                  language={formData.language === 'React' || formData.language === 'React TypeScript' ? 'javascript' : 'html'}
                  onCodeChange={(newCode) => handleInputChange('code', newCode)}
                  showPreview={true}
                  previewBackground="#1f2937"
                  height="500px"
                  theme="dark"
                  readOnly={false}
                />
              </div>
              
              {/* Code Stats */}
              <div className="flex items-center justify-between mt-4">
                <div className="flex items-center gap-4">
                  <span className="text-xs text-gray-400">
                    Lines: {(formData.code || '').split('\n').length} | 
                    Characters: {(formData.code || '').length}
                  </span>
                  <span className="text-xs text-gray-400">
                    Language: {formData.language || 'HTML/CSS'}
                  </span>
                </div>
                <div className="text-xs text-blue-400">
                  Live Preview Enabled ✨
                </div>
              </div>
            </div>

            {/* Additional Details */}
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-semibold mb-4">Additional Details</h2>
              
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Description</label>
                  <textarea
                    value={formData.full_description}
                    onChange={(e) => handleInputChange('full_description', e.target.value)}
                    className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                    placeholder="Detailed description of the component"
                    rows={4}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Developer Name</label>
                    <input
                      type="text"
                      value={formData.developer_name}
                      onChange={(e) => handleInputChange('developer_name', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Developer Experience</label>
                    <input
                      type="text"
                      value={formData.developer_experience}
                      onChange={(e) => handleInputChange('developer_experience', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., 3 years"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Dependencies</label>
                    <input
                      type="text"
                      value={formData.dependencies.join(', ')}
                      onChange={(e) => handleArrayInput('dependencies', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., React, Framer Motion (comma separated)"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium mb-2">Tags</label>
                    <input
                      type="text"
                      value={formData.tags.join(', ')}
                      onChange={(e) => handleArrayInput('tags', e.target.value)}
                      className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:border-blue-500 focus:outline-none"
                      placeholder="e.g., button, animation (comma separated)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="flex justify-end gap-4">
              <Link href="/components">
                <button
                  type="button"
                  className="px-6 py-3 bg-gray-600 hover:bg-gray-700 text-white rounded-xl font-semibold transition-all duration-300"
                >
                  Cancel
                </button>
              </Link>
              
              <button
                type="submit"
                disabled={saving}
                className="px-6 py-3 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white rounded-xl font-semibold transition-all duration-300 hover:scale-105 flex items-center gap-2 disabled:opacity-50"
              >
                {saving ? (
                  <>
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    Updating...
                  </>
                ) : (
                  <>
                    <Save className="w-5 h-5" />
                    Update Component
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

export default ComponentEditPage;
