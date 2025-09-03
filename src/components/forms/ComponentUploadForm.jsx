/**
 * Component Upload Form
 * Form for developers to upload new UI components to the marketplace
 */

'use client';
import React, { useState, useRef } from 'react';
import { motion } from 'framer-motion';
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
    Package,
    Eye,
    Download
} from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { developerApi } from '../lib/developerApi';

const ComponentUploadForm = ({ onSuccess, onCancel }) => {
    const { user } = useAuth();
    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        subcategory: '',
        complexity: '',
        plan_type: 'Free',
        tags: [],
        preview_images: [],
        component_files: null,
        demo_url: '',
        documentation: '',
        installation_guide: '',
        usage_examples: [''],
        framework_compatibility: [],
        css_framework: '',
        dependencies: [''],
        customizable_options: [''],
        accessibility_features: [],
        performance_optimized: true,
        responsive: true,
        dark_mode_support: false
    });

    const [newTag, setNewTag] = useState('');
    const [previewUrls, setPreviewUrls] = useState([]);
    const [codePreview, setCodePreview] = useState('');
    const fileInputRef = useRef(null);
    const componentFilesRef = useRef(null);

    const categories = [
        'Navigation', 'Forms', 'Buttons', 'Cards', 'Modals', 
        'Data Display', 'Layout', 'Input Controls', 'Feedback',
        'Charts', 'Media', 'Typography', 'Icons', 'Overlays'
    ];

    const subcategories = {
        'Navigation': ['Navbar', 'Sidebar', 'Breadcrumbs', 'Pagination', 'Menu', 'Tabs'],
        'Forms': ['Input Fields', 'Selects', 'Checkboxes', 'Radio Buttons', 'Form Layouts', 'Validation'],
        'Buttons': ['Primary', 'Secondary', 'Icon Buttons', 'Button Groups', 'Toggle Buttons'],
        'Cards': ['Basic Cards', 'Product Cards', 'Profile Cards', 'Image Cards', 'Info Cards'],
        'Modals': ['Dialog Boxes', 'Popups', 'Overlays', 'Drawers', 'Bottom Sheets'],
        'Data Display': ['Tables', 'Lists', 'Grids', 'Timelines', 'Statistics', 'Badges'],
        'Layout': ['Grids', 'Flexbox', 'Containers', 'Dividers', 'Spacers'],
        'Input Controls': ['Sliders', 'Date Pickers', 'File Upload', 'Rich Text', 'Search'],
        'Feedback': ['Alerts', 'Progress Bars', 'Loading Spinners', 'Toasts', 'Notifications'],
        'Charts': ['Line Charts', 'Bar Charts', 'Pie Charts', 'Area Charts', 'Dashboards'],
        'Media': ['Image Gallery', 'Video Players', 'Carousels', 'Lightboxes'],
        'Typography': ['Headings', 'Paragraphs', 'Code Blocks', 'Quotes', 'Highlights'],
        'Icons': ['Icon Sets', 'Animated Icons', 'Custom Icons', 'Icon Fonts'],
        'Overlays': ['Tooltips', 'Popovers', 'Dropdowns', 'Context Menus']
    };

    const complexityLevels = ['Simple', 'Moderate', 'Complex', 'Advanced'];
    const frameworks = ['React', 'Vue.js', 'Angular', 'Svelte', 'Vanilla JS', 'Next.js', 'Nuxt.js'];
    const cssFrameworks = ['Tailwind CSS', 'Bootstrap', 'Material UI', 'Chakra UI', 'Styled Components', 'CSS Modules', 'SCSS', 'CSS-in-JS'];
    const accessibilityFeatures = [
        'Screen Reader Support', 'Keyboard Navigation', 'ARIA Labels', 
        'High Contrast Support', 'Focus Management', 'Color Blind Friendly'
    ];

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
            alert('Maximum 5 images allowed');
            return;
        }

        const newImages = [...formData.preview_images, ...files];
        setFormData(prev => ({ ...prev, preview_images: newImages }));

        const newUrls = files.map(file => URL.createObjectURL(file));
        setPreviewUrls(prev => [...prev, ...newUrls]);
    };

    const removeImage = (index) => {
        const newImages = formData.preview_images.filter((_, i) => i !== index);
        const newUrls = previewUrls.filter((_, i) => i !== index);
        
        setFormData(prev => ({ ...prev, preview_images: newImages }));
        setPreviewUrls(newUrls);
    };

    const handleComponentFilesUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            if (file.size > 25 * 1024 * 1024) { // 25MB limit for components
                alert('File size must be less than 25MB');
                return;
            }
            setFormData(prev => ({ ...prev, component_files: file }));
            
            // Read file content for preview if it's a zip
            if (file.type === 'application/zip' || file.name.endsWith('.zip')) {
                setCodePreview('ZIP file uploaded - contents will be extracted on server');
            }
        }
    };

    const validateStep = (step) => {
        switch (step) {
            case 1:
                return formData.title && formData.description && formData.category && formData.subcategory;
            case 2:
                return formData.complexity && formData.tags.length > 0;
            case 3:
                return formData.preview_images.length > 0 && formData.component_files;
            case 4:
                return formData.framework_compatibility.length > 0 && 
                       formData.usage_examples.filter(ex => ex.trim()).length > 0;
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

            const submitData = new FormData();
            
            Object.keys(formData).forEach(key => {
                if (key === 'preview_images') {
                    formData.preview_images.forEach((file, index) => {
                        submitData.append(`preview_image_${index}`, file);
                    });
                } else if (key === 'component_files') {
                    if (formData.component_files) {
                        submitData.append('component_files', formData.component_files);
                    }
                } else if (Array.isArray(formData[key])) {
                    submitData.append(key, JSON.stringify(formData[key].filter(item => 
                        typeof item === 'string' ? item.trim() : item
                    )));
                } else {
                    submitData.append(key, formData[key]);
                }
            });

            const progressInterval = setInterval(() => {
                setUploadProgress(prev => {
                    if (prev >= 90) {
                        clearInterval(progressInterval);
                        return prev;
                    }
                    return prev + Math.random() * 10;
                });
            }, 500);

            const response = await developerApi.uploadComponent(submitData);
            
            clearInterval(progressInterval);
            setUploadProgress(100);
            
            setTimeout(() => {
                if (onSuccess) onSuccess(response);
            }, 1000);

        } catch (error) {
            console.error('Upload failed:', error);
            alert('Upload failed. Please try again.');
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
                            <label className="block text-white text-sm font-medium mb-2">Component Title *</label>
                            <input
                                type="text"
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                placeholder="e.g., Animated Progress Bar"
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Description *</label>
                            <textarea
                                value={formData.description}
                                onChange={(e) => handleInputChange('description', e.target.value)}
                                placeholder="Describe your component, its functionality, and use cases..."
                                rows={4}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Category *</label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => {
                                        handleInputChange('category', e.target.value);
                                        handleInputChange('subcategory', ''); // Reset subcategory
                                    }}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select a category</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Subcategory *</label>
                                <select
                                    value={formData.subcategory}
                                    onChange={(e) => handleInputChange('subcategory', e.target.value)}
                                    disabled={!formData.category}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 disabled:opacity-50"
                                >
                                    <option value="">Select a subcategory</option>
                                    {formData.category && subcategories[formData.category]?.map(subcat => (
                                        <option key={subcat} value={subcat}>{subcat}</option>
                                    ))}
                                </select>
                            </div>
                        </div>

                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Demo URL</label>
                            <input
                                type="url"
                                value={formData.demo_url}
                                onChange={(e) => handleInputChange('demo_url', e.target.value)}
                                placeholder="https://your-component-demo.com"
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                            />
                        </div>
                    </div>
                )}

                {/* Step 2: Pricing & Tags */}
                {currentStep === 2 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Pricing & Tags</h3>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-white text-sm font-medium mb-2">Complexity Level *</label>
                                <select
                                    value={formData.complexity}
                                    onChange={(e) => handleInputChange('complexity', e.target.value)}
                                    className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                                >
                                    <option value="">Select complexity</option>
                                    {complexityLevels.map(level => (
                                        <option key={level} value={level}>{level}</option>
                                    ))}
                                </select>
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

                        {/* Component Features */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Component Features</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.responsive}
                                        onChange={(e) => handleInputChange('responsive', e.target.checked)}
                                        className="rounded"
                                    />
                                    <span className="text-white">Responsive Design</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.dark_mode_support}
                                        onChange={(e) => handleInputChange('dark_mode_support', e.target.checked)}
                                        className="rounded"
                                    />
                                    <span className="text-white">Dark Mode Support</span>
                                </label>
                                <label className="flex items-center space-x-2 cursor-pointer">
                                    <input
                                        type="checkbox"
                                        checked={formData.performance_optimized}
                                        onChange={(e) => handleInputChange('performance_optimized', e.target.checked)}
                                        className="rounded"
                                    />
                                    <span className="text-white">Performance Optimized</span>
                                </label>
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
                                Preview Images * (Max 5, showing component in action)
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

                        {/* Component Files */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">
                                Component Files * (ZIP file containing component code)
                            </label>
                            <div className="border-2 border-dashed border-gray-600 rounded-lg p-6 text-center">
                                {formData.component_files ? (
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-center space-x-2 text-green-400">
                                            <CheckCircle className="w-5 h-5" />
                                            <span>{formData.component_files.name}</span>
                                            <button
                                                onClick={() => handleInputChange('component_files', null)}
                                                className="text-red-400 hover:text-red-300"
                                            >
                                                <X className="w-4 h-4" />
                                            </button>
                                        </div>
                                        {codePreview && (
                                            <div className="text-left bg-gray-800 rounded p-3 text-sm text-gray-300">
                                                {codePreview}
                                            </div>
                                        )}
                                    </div>
                                ) : (
                                    <div>
                                        <Package className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                                        <button
                                            onClick={() => componentFilesRef.current?.click()}
                                            className="text-blue-400 hover:text-blue-300"
                                        >
                                            Click to upload component files (ZIP)
                                        </button>
                                        <p className="text-gray-400 text-sm mt-2">Max file size: 25MB</p>
                                    </div>
                                )}
                            </div>
                            <input
                                ref={componentFilesRef}
                                type="file"
                                accept=".zip"
                                onChange={handleComponentFilesUpload}
                                className="hidden"
                            />
                        </div>
                    </div>
                )}

                {/* Step 4: Technical Details */}
                {currentStep === 4 && (
                    <div className="space-y-6">
                        <h3 className="text-xl font-semibold text-white mb-6">Technical Details</h3>
                        
                        {/* Framework Compatibility */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Framework Compatibility *</label>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                                {frameworks.map(framework => (
                                    <label key={framework} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.framework_compatibility.includes(framework)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleInputChange('framework_compatibility', [...formData.framework_compatibility, framework]);
                                                } else {
                                                    handleInputChange('framework_compatibility', formData.framework_compatibility.filter(f => f !== framework));
                                                }
                                            }}
                                            className="rounded"
                                        />
                                        <span className="text-white">{framework}</span>
                                    </label>
                                ))}
                            </div>
                        </div>

                        {/* CSS Framework */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">CSS Framework/Library</label>
                            <select
                                value={formData.css_framework}
                                onChange={(e) => handleInputChange('css_framework', e.target.value)}
                                className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500"
                            >
                                <option value="">Select CSS framework (optional)</option>
                                {cssFrameworks.map(css => (
                                    <option key={css} value={css}>{css}</option>
                                ))}
                            </select>
                        </div>

                        {/* Usage Examples */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Usage Examples *</label>
                            {formData.usage_examples.map((example, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <textarea
                                        value={example}
                                        onChange={(e) => handleArrayChange('usage_examples', index, e.target.value)}
                                        placeholder="Show how to use this component with code example..."
                                        rows={2}
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('usage_examples', index)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('usage_examples')}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                + Add Usage Example
                            </button>
                        </div>

                        {/* Dependencies */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Dependencies</label>
                            {formData.dependencies.map((dep, index) => (
                                <div key={index} className="flex space-x-2 mb-2">
                                    <input
                                        type="text"
                                        value={dep}
                                        onChange={(e) => handleArrayChange('dependencies', index, e.target.value)}
                                        placeholder="e.g., react, framer-motion@6.x"
                                        className="flex-1 bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white placeholder-gray-400 focus:outline-none focus:border-blue-500"
                                    />
                                    <button
                                        onClick={() => removeArrayItem('dependencies', index)}
                                        className="p-2 text-red-400 hover:text-red-300"
                                    >
                                        <X className="w-4 h-4" />
                                    </button>
                                </div>
                            ))}
                            <button
                                onClick={() => addArrayItem('dependencies')}
                                className="text-blue-400 hover:text-blue-300 text-sm"
                            >
                                + Add Dependency
                            </button>
                        </div>

                        {/* Accessibility Features */}
                        <div>
                            <label className="block text-white text-sm font-medium mb-2">Accessibility Features</label>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                                {accessibilityFeatures.map(feature => (
                                    <label key={feature} className="flex items-center space-x-2 cursor-pointer">
                                        <input
                                            type="checkbox"
                                            checked={formData.accessibility_features.includes(feature)}
                                            onChange={(e) => {
                                                if (e.target.checked) {
                                                    handleInputChange('accessibility_features', [...formData.accessibility_features, feature]);
                                                } else {
                                                    handleInputChange('accessibility_features', formData.accessibility_features.filter(f => f !== feature));
                                                }
                                            }}
                                            className="rounded"
                                        />
                                        <span className="text-white text-sm">{feature}</span>
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
                                    <span className="text-white ml-2">{formData.category} → {formData.subcategory}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Plan Type:</span>
                                    <span className="text-white ml-2">Free</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Complexity:</span>
                                    <span className="text-white ml-2">{formData.complexity}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Images:</span>
                                    <span className="text-white ml-2">{formData.preview_images.length} uploaded</span>
                                </div>
                                <div>
                                    <span className="text-gray-400">Component File:</span>
                                    <span className="text-white ml-2">{formData.component_files ? '✓ Uploaded' : '✗ Missing'}</span>
                                </div>
                            </div>
                            
                            <div>
                                <span className="text-gray-400">Framework Support:</span>
                                <div className="flex flex-wrap gap-1 mt-1">
                                    {formData.framework_compatibility.map(framework => (
                                        <span key={framework} className="px-2 py-1 bg-green-600 text-white text-xs rounded">
                                            {framework}
                                        </span>
                                    ))}
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
                                    <span className="text-blue-400">Uploading component...</span>
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
                                <span>{isSubmitting ? 'Uploading...' : 'Submit Component'}</span>
                            </button>
                        )}
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ComponentUploadForm;

