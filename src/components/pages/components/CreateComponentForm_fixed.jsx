'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Sun, Moon, Palette, Code, Eye, Save, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { componentApi } from '@/lib/componentApi';
import CodeEditor from '@/components/ui/CodeEditor';

// Component types
const componentTypes = [
  { id: 'button', name: 'Button', icon: '🔲', description: 'Interactive buttons and CTAs' },
  { id: 'card', name: 'Card', icon: '📋', description: 'Content cards and containers' },
  { id: 'form', name: 'Form', icon: '📝', description: 'Forms and input fields' },
  { id: 'navigation', name: 'Navigation', icon: '🧭', description: 'Navbars and menus' },
  { id: 'loader', name: 'Loader', icon: '⏳', description: 'Loading animations' },
  { id: 'modal', name: 'Modal', icon: '🪟', description: 'Dialogs and overlays' },
  { id: 'input', name: 'Input', icon: '📤', description: 'Text inputs and fields' },
  { id: 'toggle', name: 'Toggle', icon: '🔘', description: 'Switches and toggles' },
  { id: 'checkbox', name: 'Checkbox', icon: '☑️', description: 'Checkboxes and selections' },
  { id: 'tooltip', name: 'Tooltip', icon: '💬', description: 'Tooltips and popovers' },
  { id: 'pattern', name: 'Pattern', icon: '🎨', description: 'Backgrounds and patterns' },
  { id: 'radio', name: 'Radio', icon: '🔘', description: 'Radio buttons' }
];

// Technologies
const technologies = [
  { id: 'tailwind', name: 'Tailwind CSS', icon: '🎨', color: 'from-cyan-500 to-blue-500' },
  { id: 'css', name: 'CSS', icon: '🎭', color: 'from-blue-500 to-purple-500' },
  { id: 'bootstrap', name: 'Bootstrap', icon: '🅱️', color: 'from-purple-500 to-pink-500' }
];

// Background options
const backgroundOptions = [
  { id: 'white', name: 'White', value: '#ffffff', class: 'bg-white' },
  { id: 'light-gray', name: 'Light Gray', value: '#f3f4f6', class: 'bg-gray-100' },
  { id: 'dark-gray', name: 'Dark Gray', value: '#374151', class: 'bg-gray-700' },
  { id: 'black', name: 'Black', value: '#000000', class: 'bg-black' },
  { id: 'blue', name: 'Blue', value: '#3b82f6', class: 'bg-blue-500' },
  { id: 'purple', name: 'Purple', value: '#8b5cf6', class: 'bg-purple-500' },
  { id: 'green', name: 'Green', value: '#10b981', class: 'bg-green-500' },
  { id: 'gradient', name: 'Gradient', value: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', class: 'bg-gradient-to-br from-blue-500 to-purple-600' }
];

// Starter templates
const starterTemplates = {
  button: {
    tailwind: `<button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
  Click me
</button>`,
    css: `<button class="custom-btn">Click me</button>

<style>
.custom-btn {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}
.custom-btn:hover {
  background-color: #2563eb;
}
</style>`,
    bootstrap: `<button type="button" class="btn btn-primary">Primary Button</button>`
  }
};

const CreateComponentForm = () => {
    const router = useRouter();
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTech, setSelectedTech] = useState(null);
    const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(null);
    const [submitMessage, setSubmitMessage] = useState('');
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
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
        previewImages: [],
        code: '',
        componentType: '',
        technology: '',
        background: ''
    });

    const [newDependency, setNewDependency] = useState('');
    const [newTag, setNewTag] = useState('');

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        setFormData(prev => ({ ...prev, componentType: type.id, type: type.id }));
    };

    const handleTechSelect = (tech) => {
        setSelectedTech(tech);
        setFormData(prev => ({ 
            ...prev, 
            technology: tech.id,
            language: tech.id === 'tailwind' ? 'HTML/Tailwind' : 
                     tech.id === 'css' ? 'HTML/CSS' : 'HTML/Bootstrap'
        }));
        
        // Set initial template code
        const template = starterTemplates[selectedType?.id]?.[tech.id] || '';
        setCode(template);
        setFormData(prev => ({ ...prev, code: template }));
    };

    const handleBackgroundSelect = (bg) => {
        setSelectedBackground(bg);
        setFormData(prev => ({ ...prev, background: bg.id }));
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleCodeChange = (newCode) => {
        setCode(newCode);
        setFormData(prev => ({ ...prev, code: newCode }));
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

    const getCategoryFromType = (type) => {
        const categoryMap = {
            'button': 'User Interface',
            'card': 'Layout',
            'form': 'Forms',
            'navigation': 'Navigation',
            'loader': 'Interactive',
            'modal': 'User Interface',
            'input': 'Forms',
            'toggle': 'User Interface',
            'checkbox': 'Forms',
            'tooltip': 'User Interface',
            'pattern': 'Content',
            'radio': 'Forms'
        };
        return categoryMap[type] || 'User Interface';
    };

    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage('');

        try {
            const completeData = {
                ...formData,
                category: getCategoryFromType(selectedType?.id),
                code: code
            };
            
            console.log('🚀 Creating component with data:', completeData);
            
            const backendData = await componentApi.transformFormDataToBackend(completeData);
            console.log('📤 Transformed data:', backendData);
            
            const response = await componentApi.createComponent(backendData);
            console.log('✅ Component created successfully:', response);
            
            setSubmitStatus('success');
            setSubmitMessage('Component created successfully! Redirecting...');
            
            setTimeout(() => {
                router.push(`/components/${response.id}`);
            }, 2000);

        } catch (error) {
            console.error('❌ Component creation error:', error);
            setSubmitStatus('error');
            
            if (error.status === 422) {
                if (error.details && error.details.detail) {
                    const validationErrors = error.details.detail.map(err => `${err.loc.join('.')}: ${err.msg}`).join(', ');
                    setSubmitMessage(`Validation error: ${validationErrors}`);
                } else {
                    setSubmitMessage('Please check your form data - some fields have invalid values.');
                }
            } else if (error.status === 400) {
                setSubmitMessage('Please check your form data and try again');
            } else {
                setSubmitMessage(error.message || 'Failed to create component. Please try again.');
            }
        } finally {
            setIsSubmitting(false);
        }
    };

    const theme = isDarkMode ? 'dark' : 'light';
    const bgClass = isDarkMode ? 'bg-gray-900' : 'bg-gray-50';
    const textClass = isDarkMode ? 'text-white' : 'text-gray-900';
    const cardBgClass = isDarkMode ? 'bg-gray-800' : 'bg-white';
    const borderClass = isDarkMode ? 'border-gray-700' : 'border-gray-200';

    return (
        <div className={`min-h-screen ${bgClass} ${textClass} transition-colors duration-300`}>
            {/* Header */}
            <div className={`sticky top-0 z-50 ${cardBgClass} border-b ${borderClass} backdrop-blur-sm`}>
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <Link href="/components">
                            <button className={`flex items-center gap-2 ${isDarkMode ? 'text-gray-400 hover:text-white' : 'text-gray-600 hover:text-gray-900'} transition-colors`}>
                                <ArrowLeft className="w-5 h-5" />
                                Back to Components
                            </button>
                        </Link>
                        
                        {/* Step Indicator */}
                        <div className="hidden md:flex items-center gap-2 ml-8">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                        currentStep >= step
                                            ? 'bg-blue-500 text-white'
                                            : isDarkMode
                                            ? 'bg-gray-700 text-gray-400'
                                            : 'bg-gray-200 text-gray-600'
                                    }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
                        {/* Dark/Light Mode Toggle */}
                        <button
                            onClick={() => setIsDarkMode(!isDarkMode)}
                            className={`p-2 rounded-lg transition-colors ${
                                isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                            }`}
                        >
                            {isDarkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
                        </button>
                        
                        {currentStep > 1 && (
                            <button
                                onClick={() => setCurrentStep(currentStep - 1)}
                                className="px-4 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg transition-colors"
                            >
                                Previous
                            </button>
                        )}
                    </div>
                </div>
            </div>
            <div className="max-w-6xl mx-auto px-6 py-8">
                
                {/* Step 1: Component Type Selection */}
                {currentStep === 1 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">What are you making?</h1>
                            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Choose the type of component you want to create
                            </p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                            {componentTypes.map((type) => (
                                <motion.button
                                    key={type.id}
                                    onClick={() => handleTypeSelect(type)}
                                    className={`p-6 rounded-xl border-2 transition-all duration-200 ${
                                        selectedType?.id === type.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : isDarkMode
                                            ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                                            : 'border-gray-300 hover:border-gray-400 bg-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="text-4xl mb-3">{type.icon}</div>
                                    <h3 className="font-semibold text-lg mb-2">{type.name}</h3>
                                    <p className={`text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                        {type.description}
                                    </p>
                                </motion.button>
                            ))}
                        </div>

                        {selectedType && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-center pt-8"
                            >
                                <button
                                    onClick={() => setCurrentStep(2)}
                                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Step 2: Technology Selection */}
                {currentStep === 2 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h1 className="text-4xl font-bold mb-4">Choose Technology</h1>
                            <p className={`text-lg ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                You're creating a <span className="font-semibold text-blue-500">{selectedType?.name}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {technologies.map((tech) => (
                                <motion.button
                                    key={tech.id}
                                    onClick={() => handleTechSelect(tech)}
                                    className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                                        selectedTech?.id === tech.id
                                            ? 'border-blue-500 bg-blue-500/10'
                                            : isDarkMode
                                            ? 'border-gray-600 hover:border-gray-500 bg-gray-700/50'
                                            : 'border-gray-300 hover:border-gray-400 bg-white'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="text-5xl mb-4">{tech.icon}</div>
                                    <h3 className="text-xl font-semibold mb-2">{tech.name}</h3>
                                    <div className={`h-1 rounded-full bg-gradient-to-r ${tech.color}`}></div>
                                </motion.button>
                            ))}
                        </div>

                        {selectedTech && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="flex justify-center pt-8"
                            >
                                <button
                                    onClick={() => setCurrentStep(3)}
                                    className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                                >
                                    Continue
                                    <ArrowRight className="w-5 h-5" />
                                </button>
                            </motion.div>
                        )}
                    </motion.div>
                )}

                {/* Step 3: Code Editor */}
                {currentStep === 3 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-6"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">Code Editor</h1>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Creating a <span className="font-semibold text-blue-500">{selectedType?.name}</span> with{' '}
                                <span className="font-semibold text-purple-500">{selectedTech?.name}</span>
                            </p>
                        </div>

                        {/* Background Selection */}
                        <div className={`${cardBgClass} border ${borderClass} rounded-xl p-6`}>
                            <div className="flex items-center gap-3 mb-4">
                                <Palette className="w-5 h-5 text-blue-500" />
                                <h3 className="text-lg font-semibold">Preview Background</h3>
                            </div>
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-3">
                                {backgroundOptions.map((bg) => (
                                    <button
                                        key={bg.id}
                                        onClick={() => handleBackgroundSelect(bg)}
                                        className={`w-12 h-12 rounded-lg border-2 transition-all duration-200 ${
                                            selectedBackground?.id === bg.id
                                                ? 'border-blue-500 ring-2 ring-blue-200'
                                                : 'border-gray-300 hover:border-gray-400'
                                        } ${bg.class}`}
                                        title={bg.name}
                                        style={bg.id === 'gradient' ? { background: bg.value } : {}}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* Code Editor */}
                        <div className={`${cardBgClass} border ${borderClass} rounded-xl overflow-hidden`}>
                            <CodeEditor
                                initialCode={code}
                                language={selectedTech?.id === 'tailwind' ? 'html' : selectedTech?.id}
                                onCodeChange={handleCodeChange}
                                showPreview={true}
                                previewBackground={selectedBackground?.value}
                                height="600px"
                                theme={isDarkMode ? 'dark' : 'light'}
                            />
                        </div>

                        <div className="flex justify-center pt-4">
                            <button
                                onClick={() => setCurrentStep(4)}
                                className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                            >
                                Save & Continue
                                <ArrowRight className="w-5 h-5" />
                            </button>
                        </div>
                    </motion.div>
                )}

                {/* Step 4: Component Details */}
                {currentStep === 4 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="space-y-8"
                    >
                        <div className="text-center">
                            <h1 className="text-3xl font-bold mb-2">Component Details</h1>
                            <p className={`${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                                Add details about your {selectedType?.name} component
                            </p>
                        </div>

                        <div className={`${cardBgClass} border ${borderClass} rounded-xl p-8`}>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Component Title */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Component Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Enter component title"
                                    />
                                </div>

                                {/* Difficulty Level */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Difficulty Level *
                                    </label>
                                    <select
                                        value={formData.difficultyLevel}
                                        onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        <option value="">Select difficulty</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Plan Type */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Plan Type *
                                    </label>
                                    <select
                                        value={formData.planType}
                                        onChange={(e) => handleInputChange('planType', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        <option value="">Select plan</option>
                                        <option value="Free">Free</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>

                                {/* Pricing */}
                                {formData.planType === 'Premium' && (
                                    <>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Price (INR)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.pricingINR}
                                                onChange={(e) => handleInputChange('pricingINR', e.target.value)}
                                                className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Price in INR"
                                            />
                                        </div>
                                        <div>
                                            <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                                Price (USD)
                                            </label>
                                            <input
                                                type="number"
                                                value={formData.pricingUSD}
                                                onChange={(e) => handleInputChange('pricingUSD', e.target.value)}
                                                className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                                placeholder="Price in USD"
                                            />
                                        </div>
                                    </>
                                )}

                                {/* Developer Name */}
                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Developer Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.developerName}
                                        onChange={(e) => handleInputChange('developerName', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Experience Level *
                                    </label>
                                    <select
                                        value={formData.developerExperience}
                                        onChange={(e) => handleInputChange('developerExperience', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    >
                                        <option value="">Select experience</option>
                                        <option value="Junior">Junior (0-2 years)</option>
                                        <option value="Mid-level">Mid-level (2-5 years)</option>
                                        <option value="Senior">Senior (5+ years)</option>
                                    </select>
                                </div>

                                {/* Short Description */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Short Description *
                                    </label>
                                    <textarea
                                        value={formData.shortDescription}
                                        onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows="3"
                                        placeholder="Brief description of your component"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Full Description
                                    </label>
                                    <textarea
                                        value={formData.fullDescription}
                                        onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                        className={`w-full px-4 py-3 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                        rows="5"
                                        placeholder="Detailed description, usage instructions, etc."
                                    />
                                </div>

                                {/* Dependencies */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Dependencies
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newDependency}
                                            onChange={(e) => setNewDependency(e.target.value)}
                                            className={`flex-1 px-4 py-2 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Add dependency"
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddDependency()}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddDependency}
                                            className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.dependencies.map((dep, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {dep}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveDependency(index)}
                                                    className="hover:text-blue-600"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>

                                {/* Tags */}
                                <div className="md:col-span-2">
                                    <label className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                                        Tags
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            className={`flex-1 px-4 py-2 border ${borderClass} rounded-lg ${isDarkMode ? 'bg-gray-700 text-white' : 'bg-white text-gray-900'} focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                            placeholder="Add tag"
                                            onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                                        />
                                        <button
                                            type="button"
                                            onClick={handleAddTag}
                                            className="px-4 py-2 bg-purple-500 hover:bg-purple-600 text-white rounded-lg transition-colors"
                                        >
                                            <Plus className="w-4 h-4" />
                                        </button>
                                    </div>
                                    <div className="flex flex-wrap gap-2">
                                        {formData.tags.map((tag, index) => (
                                            <span
                                                key={index}
                                                className="inline-flex items-center gap-1 px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm"
                                            >
                                                {tag}
                                                <button
                                                    type="button"
                                                    onClick={() => handleRemoveTag(index)}
                                                    className="hover:text-purple-600"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Submit Status */}
                            {submitStatus && (
                                <div className={`mt-6 p-4 rounded-lg flex items-center gap-3 ${
                                    submitStatus === 'success' 
                                        ? 'bg-green-100 text-green-800 border border-green-200' 
                                        : 'bg-red-100 text-red-800 border border-red-200'
                                }`}>
                                    {submitStatus === 'success' ? (
                                        <CheckCircle className="w-5 h-5 flex-shrink-0" />
                                    ) : (
                                        <AlertCircle className="w-5 h-5 flex-shrink-0" />
                                    )}
                                    <span>{submitMessage}</span>
                                </div>
                            )}

                            {/* Submit Button */}
                            <div className="flex justify-center pt-8">
                                <button
                                    onClick={handleSubmit}
                                    disabled={isSubmitting}
                                    className={`flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 disabled:bg-gray-400 text-white font-semibold rounded-lg transition-colors ${
                                        isSubmitting ? 'cursor-not-allowed' : ''
                                    }`}
                                >
                                    {isSubmitting ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                            Creating...
                                        </>
                                    ) : (
                                        <>
                                            <Save className="w-5 h-5" />
                                            Submit Component
                                        </>
                                    )}
                                </button>
                            </div>
                        </div>
                    </motion.div>
                )}
            </div>
        </div>
    );
};

export default CreateComponentForm;
