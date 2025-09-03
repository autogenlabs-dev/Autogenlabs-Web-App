/**
 * Template Upload Form
 * Form for developers to upload new templates to the marketplace
 */

'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import { useNotification } from '../contexts/NotificationContext';
import { 
    Upload, 
    FileText, 
    Image, 
    Code, 
    Tag, 
    IndianRupee, 
    X, 
    CheckCircle, 
    AlertCircle,
    Loader,
    Monitor,
    Smartphone,
    Tablet
} from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import { developerApi } from '../../lib/developerApi';

const TemplateUploadForm = ({ onSuccess, onCancel }) => {
    const { user } = useAuth();
    const { showSuccess, showError, showWarning } = useNotification();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        difficulty: '',
        tags: [],
        preview_images: [],
        template_files: null,
        demo_url: '',
        documentation: '',
        features: [''],
        technology_stack: [''],
        responsive_design: true,
        browser_compatibility: [],
        license_type: 'standard'
    });

    const [newTag, setNewTag] = useState('');
    const [previewUrls, setPreviewUrls] = useState([]);
    const fileInputRef = useRef(null);
    const templateFilesRef = useRef(null);

    const categories = [
        'Landing Page', 'Dashboard', 'E-commerce', 'Portfolio', 
        'Blog', 'Admin Panel', 'SaaS', 'Corporate', 'Agency',
        'Personal', 'Educational', 'Non-profit'
    ];

    const difficulties = ['Beginner', 'Intermediate', 'Advanced'];
    const licenseTypes = [
        { value: 'standard', label: 'Standard License', description: 'Single project use' },
        { value: 'extended', label: 'Extended License', description: 'Multiple projects, resale allowed' },
        { value: 'unlimited', label: 'Unlimited License', description: 'Unlimited use and distribution' }
    ];

    const browserOptions = ['Chrome', 'Firefox', 'Safari', 'Edge', 'Opera'];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleArrayChange = (field, index, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].map((item, i) => i === index ? value : item)
        }));
    };

    const addArrayItem = (field) => {
        setFormData(prev => ({
            ...prev,
            [field]: [...prev[field], '']
        }));
    };

    const removeArrayItem = (field, index) => {
        setFormData(prev => ({
            ...prev,
            [field]: prev[field].filter((_, i) => i !== index)
        }));
    };

    const handleTagAdd = () => {
        if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
            setFormData(prev => ({
                ...prev,
                tags: [...prev.tags, newTag.trim()]
            }));
            setNewTag('');
        }
    };

    const removeTag = (tagToRemove) => {
        setFormData(prev => ({
            ...prev,
            tags: prev.tags.filter(tag => tag !== tagToRemove)
        }));
    };

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length + formData.preview_images.length > 5) {
            showWarning('Maximum 5 images allowed');
            return;
        }

        const newImages = [...formData.preview_images, ...files];
        setFormData(prev => ({ ...prev, preview_images: newImages }));

        // Create preview URLs
        const newUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newUrls]);
    };

    const removeImage = (index) => {
        const newImages = formData.preview_images.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        
        setFormData(prev => ({ ...prev, preview_images: newImages }));
        setPreviewUrls(newUrls);
    };

    const handleTemplateFilesUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 50 * 1024 * 1024) { // 50MB limit
                showWarning('File size must be less than 50MB');
                return;
            }
            setFormData(prev => ({ ...prev, template_files: file }));
        }
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.title && formData.description && formData.category;
            case 2:
                return formData.difficulty && formData.price_inr !== '' && formData.tags.length > 0;
            case 3:
                return formData.preview_images.length > 0 && formData.template_files;
            case 4:
                return formData.technology_stack.filter(t => t.trim()).length > 0;
            default:
                return true;
        }
    };

    const nextStep = () => {
        if (validateStep(currentStep)) {
            setCurrentStep(prev => Math.min(prev + 1, 5));
        }
    };

    const prevStep = () => {
        setCurrentStep(prev => Math.max(prev - 1, 1));
    };

    const handleSubmit = async () => {
        if (!validateStep(4)) return;

        try {
            setIsSubmitting(true);
            setUploadProgress(0);

            // Create FormData for file upload
            const submitData = new FormData();
            
            // Add basic fields
            Object.keys(formData).forEach(key => {
                if (key === 'preview_images') {
                    formData.preview_images.forEach((file, index) => {
                        submitData.append(`preview_image_${index}`, file);
                    });
                } else if (key === 'template_files') {
                    if (formData.template_files) {
                        submitData.append('template_files', formData.template_files);
                    }
                } else if (Array.isArray(formData[key])) {
                    submitData.append(key, JSON.stringify(formData[key].filter(item => item.trim())));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            // Simulate upload progress
            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + Math.random() * 10;
                });
            }, 500);

            const response = await developerApi.uploadTemplate(submitData);
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            setTimeout(() => {
                if (onSuccess) onSuccess(response);
            }, 1000);

        } catch (error) {
            console.error('Upload failed:', error);
            showError('Upload failed. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Progress Steps */}
            <div className="mb-8">
                <div className="flex items-center justify-between mb-4">
                    {[1, 2, 3, 4, 5].map((step) => (
                        <div key={step} className="flex items-center">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                                step < currentStep ? 'bg-green-500 text-white' :
                                step === currentStep ? 'bg-blue-500 text-white' :
                                'bg-gray-600 text-gray-300'
                            }`}>
                                {step < currentStep ? <CheckCircle className="w-5 h-5" /> : step}
                            </div>
                            {step < 5 && (
                                <div className={`w-16 h-1 mx-2 ${
                                    step < currentStep ? 'bg-green-500' : 'bg-gray-600'
                                }`} />
                            )}
                        </div>
                    ))}
                </div>
                <div className="text-center text-gray-400 text-sm">
                    Step {currentStep} of 5: {
                        currentStep === 1 ? 'Basic Information' :
                        currentStep === 2 ? 'Pricing & Tags' :
                        currentStep === 3 ? 'Media & Files' :
                        currentStep === 4 ? 'Technical Details' :
                        'Review & Submit'
                    }
                </div>
            </div>

            <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20"
            >
                {/* Step 1: Basic Information */}
                {currentStep === 1 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Basic Information</h3>
                        
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Template Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="e.g., Modern SaaS Landing Page"
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe your template, its features, and what makes it special..."
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => handleInputChange('category', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Demo URL</label>
                                <input
                                    type="url"
                                    value={formData.demo_url}
                                    onChange={(e) => handleInputChange('demo_url', e.target.value)}
                                    placeholder="https://your-demo-site.com"
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Pricing & Tags */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Pricing & Tags</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Difficulty Level *</label>
                                <select
                                    value={formData.difficulty}
                                    onChange={(e) => handleInputChange('difficulty', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select difficulty</option>
                                    {difficulties.map(diff => (
                                        <option key={diff} value={diff}>{diff}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Price (₹) *</label>
                                <input
                                    type="number"
                                    min="0"
                                    value={formData.price_inr}
                                    onChange={(e) => handleInputChange('price_inr', e.target.value)}
                                    placeholder="0 for free"
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Tags * (Add relevant keywords)</label>
                            <div className="flex flex-wrap gap-2 mb-3">
                                {formData.tags.map((tag, index) => (
                                    <span key={index} className="px-3 py-1 bg-blue-600 text-white rounded-full text-sm flex items-center">
                                        {tag}
                                        <button
                                            onClick={() => removeTag(tag)}
                                            className="ml-2 hover:bg-blue-700 rounded-full p-0.5"
                                        >
                                            <X className="w-3 h-3" />
                                        </button>
                                    </span>
                                ))}
                            </div>
                            <div className="flex space-x-2">
                                <input
                                    type="text"
                                    value={newTag}
                                    onChange={(e) => setNewTag(e.target.value)}
                                    onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleTagAdd())}
                                    placeholder="Add a tag and press Enter"
                                    className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                />
                                <button
                                    onClick={handleTagAdd}
                                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                                >
                                    <Tag className="w-4 h-4" />
                                </button>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">License Type</label>
                            <div className="space-y-3">
                                {licenseTypes.map(license => (
                                    <label key={license.value} className="flex items-start space-x-3 cursor-pointer">
                                        <input
                                            type="radio"
                                            name="license_type"
                                            value={license.value}
                                            checked={formData.license_type === license.value}
                                            onChange={(e) => handleInputChange('license_type', e.target.value)}
                                            className="mt-1"
                                        />
                                        <div>
                                            <div className="text-white font-medium">{license.label}</div>
                                            <div className="text-gray-400 text-sm">{license.description}</div>
                                        </div>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 3: Media & Files */}
                {currentStep === 3 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Media & Files</h3>
                        
                        {/* Preview Images */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Preview Images * (Max 5, first image will be the main preview)
                            </label>
                            
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                                {previewUrls.map((url, index) => (
                                    <div key={index} className="relative">
                                        <img
                                            src={url}
                                            alt={`Preview ${index + 1}`}
                                            className="w-full h-32 object-cover rounded-lg"
                                        />
                                        <button
                                            onClick={() => removeImage(index)}
                                            className="absolute top-2 right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                        {index === 0 && (
                                            <span className="absolute bottom-2 left-2 bg-blue-500 text-white text-xs px-2 py-1 rounded">
                                                Main
                                            </span>
                                        )}
                                    </div>
                                ))}
                                
                                {formData.preview_images.length < 5 && (
                                    <button
                                        onClick={() => fileInputRef.current?.click()}
                                        className="h-32 border-2 border-dashed border-gray-600 rounded-lg flex flex-col items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-400 transition-colors"
                                    >
                                        <Image className="w-6 h-6 mb-2" />
                                        <span className="text-sm">Add Image</span>
                                    </button>
                                )}
                            </div>
                            
                            <input
                                ref={fileInputRef}
                                type="file"
                                multiple
                                accept="image/*"
                                onChange={handleImageUpload}
                                className="hidden"
                            />
                        </div>

                        {/* Template Files */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Template Files * (ZIP file containing all template files)
                            </label>
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                {formData.template_files ? (
                                    <div className="flex items-center justify-center space-x-2 text-green-400">
                                        <CheckCircle className="w-5 h-5" />
                                        <span>{formData.template_files.name}</span>
                                        <button
                                            onClick={() => handleInputChange('template_files', null)}
                                            className="text-red-400 hover:text-red-300"
                                        >
                                            <X className="w-4 h-4" />
                                        </button>
                                    </div>
                                ) : (
                                    <div>
                                        <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <button
                                            onClick={() => templateFilesRef.current?.click()}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            Click to upload template files (ZIP)
                                        </button>
                                        <p className="text-gray-400 text-sm mt-2">Max file size: 50MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={templateFilesRef}
                                type="file"
                                accept=".zip"
                                onChange={handleTemplateFilesUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Technical Details */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Technical Details</h3>
                        
                        {/* Technology Stack */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Technology Stack *</label>
                            {formData.technology_stack.map((tech, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={tech}
                                        onChange={(e) => handleArrayChange('technology_stack', index, e.target.value)}
                                        placeholder="e.g., React, Next.js, Tailwind CSS"
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('technology_stack', index)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('technology_stack')}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                + Add Technology
                            </button>
                        </div>

                        {/* Features */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Key Features</label>
                            {formData.features.map((feature, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={feature}
                                        onChange={(e) => handleArrayChange('features', index, e.target.value)}
                                        placeholder="e.g., Responsive design, Dark mode support"
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('features', index)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('features')}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                + Add Feature
                            </button>
                        </div>

                        {/* Device Compatibility */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Device Compatibility</label>
                            <div className="flex space-x-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.responsive_design}
                                        onChange={(e) => handleInputChange('responsive_design', e.target.checked)}
                                        className="rounded"
                                    />
                                    <Monitor className="w-4 h-4 text-blue-400" />
                                    <span className="text-white">Desktop</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.responsive_design}
                                        onChange={(e) => handleInputChange('responsive_design', e.target.checked)}
                                        className="rounded"
                                    />
                                    <Tablet className="w-4 h-4 text-blue-400" />
                                    <span className="text-white">Tablet</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.responsive_design}
                                        onChange={(e) => handleInputChange('responsive_design', e.target.checked)}
                                        className="rounded"
                                    />
                                    <Smartphone className="w-4 h-4 text-blue-400" />
                                    <span className="text-white">Mobile</span>
                                </label>
                            </div>
                        </div>

                        {/* Browser Compatibility */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Browser Compatibility</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {browserOptions.map(browser => (
                                    <label key={browser} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.browser_compatibility.includes(browser)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleInputChange('browser_compatibility', [...formData.browser_compatibility, browser]);
                                                } else {
                                                    handleInputChange('browser_compatibility', formData.browser_compatibility.filter(b => b !== browser));
                                                }
                                            }}
                                            className="rounded"
                                        />
                                        <span className="text-white">{browser}</span>
                                    </label>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 5: Review & Submit */}
                {currentStep === 5 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Review & Submit</h3>
                        
                        <div className="bg-gray-800/50 rounded-lg p-6 space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">Title:</span>
                                    <span className="text-white ml-2">{formData.title}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Category:</span>
                                    <span className="text-white ml-2">{formData.category}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Price:</span>
                                    <span className="text-white ml-2">
                                        {formData.price_inr === '0' || formData.price_inr === '' ? 'Free' : `₹${formData.price_inr}`}
                                    </span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Difficulty:</span>
                                    <span className="text-white ml-2">{formData.difficulty}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Images:</span>
                                    <span className="text-white ml-2">{formData.preview_images.length} uploaded</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Template File:</span>
                                    <span className="text-white ml-2">{formData.template_files ? '✓ Uploaded' : '✗ Missing'}</span>
                                </div>
                            </div>
                            
                            <div>
                                <span className="text-gray-400">Tags:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.tags.map(tag => (
                                        <span key={tag} className="px-2 py-1 bg-blue-600 text-white text-xs rounded">
                                            {tag}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>

                        {isSubmitting && (
                            <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                                <div className="flex items-center justify-between mb-2">
                                    <span className="text-blue-400">Uploading template...</span>
                                    <span className="text-blue-400">{Math.round(uploadProgress)}%</span>
                                </div>
                                <div className="w-full bg-blue-900/30 rounded-full h-2">
                                    <div 
                                        className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                                        style={{ width: `${uploadProgress}%` }}
                                    />
                                </div>
                            </div>
                        )}
                    </div>
                )}

                {/* Navigation Buttons */}
                <div className="flex justify-between mt-8">
                    <button
                        onClick={currentStep === 1 ? onCancel : prevStep}
                        className="px-6 py-3 text-gray-300 hover:text-white transition-colors"
                    >
                        {currentStep === 1 ? 'Cancel' : 'Previous'}
                    </button>
                    
                    <div className="flex space-x-4">
                        {currentStep < 5 ? (
                            <button
                                onClick={nextStep}
                                disabled={!validateStep(currentStep)}
                                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors"
                            >
                                Next Step
                            </button>
                        ) : (
                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !validateStep(4)}
                                className="px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white rounded-lg transition-colors flex items-center space-x-2"
                            >
                                {isSubmitting ? <Loader className="w-4 h-4 animate-spin" /> : <Upload className="w-4 h-4" />}
                                <span>{isSubmitting ? 'Uploading...' : 'Submit Template'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default TemplateUploadForm;

