'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ArrowLeft, ArrowRight } from 'lucide-react';
import CodeEditor from './CodeEditor';

// Component type options with icons (similar to uiverse.io)
const componentTypes = [
  {
    id: 'button',
    name: 'Button',
    icon: '🔲',
    description: 'Interactive buttons and CTAs'
  },
  {
    id: 'card',
    name: 'Card',
    icon: '📋',
    description: 'Content cards and containers'
  },
  {
    id: 'form',
    name: 'Form',
    icon: '📝',
    description: 'Forms and input fields'
  },
  {
    id: 'navigation',
    name: 'Navigation',
    icon: '🧭',
    description: 'Navbars and menus'
  },
  {
    id: 'loader',
    name: 'Loader',
    icon: '⏳',
    description: 'Loading animations'
  },
  {
    id: 'modal',
    name: 'Modal',
    icon: '🪟',
    description: 'Dialogs and overlays'
  },
  {
    id: 'input',
    name: 'Input',
    icon: '📤',
    description: 'Text inputs and fields'
  },
  {
    id: 'toggle',
    name: 'Toggle',
    icon: '🔘',
    description: 'Switches and toggles'
  },
  {
    id: 'checkbox',
    name: 'Checkbox',
    icon: '☑️',
    description: 'Checkboxes and selections'
  },
  {
    id: 'tooltip',
    name: 'Tooltip',
    icon: '💬',
    description: 'Tooltips and popovers'
  },
  {
    id: 'pattern',
    name: 'Pattern',
    icon: '🎨',
    description: 'Backgrounds and patterns'
  },
  {
    id: 'radio',
    name: 'Radio',
    icon: '🔘',
    description: 'Radio buttons'
  }
];

// Technology options
const technologies = [
  {
    id: 'tailwind',
    name: 'Tailwind CSS',
    icon: '🎨',
    color: 'from-cyan-500 to-blue-500'
  },
  {
    id: 'css',
    name: 'CSS',
    icon: '🎭',
    color: 'from-blue-500 to-purple-500'
  },
  {
    id: 'bootstrap',
    name: 'Bootstrap',
    icon: '🅱️',
    color: 'from-purple-500 to-pink-500'
  }
];

// Starter code templates
const starterTemplates = {
  button: {
    tailwind: `<button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
  Click me
</button>`,
    css: `<button class="custom-button">Click me</button>

<style>
.custom-button {
  padding: 12px 24px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: background-color 0.2s;
}

.custom-button:hover {
  background-color: #2563eb;
}
</style>`,
    bootstrap: `<button type="button" class="btn btn-primary">Click me</button>`
  },
  card: {
    tailwind: `<div class="max-w-sm bg-white border border-gray-200 rounded-lg shadow-md p-6">
  <h5 class="mb-2 text-2xl font-bold tracking-tight text-gray-900">Card title</h5>
  <p class="mb-3 font-normal text-gray-700">Card content goes here.</p>
  <button class="px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800">
    Read more
  </button>
</div>`,
    css: `<div class="card">
  <h5 class="card-title">Card title</h5>
  <p class="card-text">Card content goes here.</p>
  <button class="card-button">Read more</button>
</div>

<style>
.card {
  max-width: 384px;
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  padding: 24px;
}

.card-title {
  margin-bottom: 8px;
  font-size: 24px;
  font-weight: bold;
  color: #111827;
}

.card-text {
  margin-bottom: 12px;
  color: #374151;
}

.card-button {
  padding: 8px 12px;
  background-color: #1d4ed8;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
}
</style>`,
    bootstrap: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Card content goes here.</p>
    <a href="#" class="btn btn-primary">Read more</a>
  </div>
</div>`
  },
  form: {
    tailwind: `<form class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
      Username
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="Username">
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
      Password
    </label>
    <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" id="password" type="password" placeholder="******************">
  </div>
  <div class="flex items-center justify-between">
    <button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
      Sign In
    </button>
  </div>
</form>`,
    css: `<form class="login-form">
  <div class="form-group">
    <label for="username">Username</label>
    <input type="text" id="username" placeholder="Username">
  </div>
  <div class="form-group">
    <label for="password">Password</label>
    <input type="password" id="password" placeholder="******************">
  </div>
  <button type="submit">Sign In</button>
</form>

<style>
.login-form {
  max-width: 400px;
  margin: 0 auto;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  color: #374151;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}

.form-group input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 4px;
  font-size: 16px;
}

.login-form button {
  background-color: #3b82f6;
  color: white;
  padding: 8px 16px;
  border: none;
  border-radius: 4px;
  font-weight: bold;
  cursor: pointer;
}
</style>`,
    bootstrap: `<form>
  <div class="mb-3">
    <label for="exampleInputEmail1" class="form-label">Email address</label>
    <input type="email" class="form-control" id="exampleInputEmail1">
  </div>
  <div class="mb-3">
    <label for="exampleInputPassword1" class="form-label">Password</label>
    <input type="password" class="form-control" id="exampleInputPassword1">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`
  },
  // Add more component types as needed
  navigation: {
    tailwind: `<nav class="bg-white shadow-lg">
  <div class="max-w-7xl mx-auto px-4">
    <div class="flex justify-between">
      <div class="flex space-x-7">
        <div>
          <a href="#" class="flex items-center py-4 px-2">
            <span class="font-semibold text-gray-500 text-lg">Brand</span>
          </a>
        </div>
        <div class="hidden md:flex items-center space-x-1">
          <a href="#" class="py-4 px-2 text-green-500 border-b-4 border-green-500 font-semibold">Home</a>
          <a href="#" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">About</a>
          <a href="#" class="py-4 px-2 text-gray-500 font-semibold hover:text-green-500 transition duration-300">Contact</a>
        </div>
      </div>
    </div>
  </div>
</nav>`,
    css: `<nav class="navbar">
  <div class="nav-container">
    <a href="#" class="nav-brand">Brand</a>
    <ul class="nav-menu">
      <li class="nav-item">
        <a href="#" class="nav-link active">Home</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">About</a>
      </li>
      <li class="nav-item">
        <a href="#" class="nav-link">Contact</a>
      </li>
    </ul>
  </div>
</nav>

<style>
.navbar {
  background-color: white;
  box-shadow: 0 2px 4px rgba(0,0,0,0.1);
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  font-size: 18px;
  font-weight: 600;
  color: #6b7280;
  text-decoration: none;
  padding: 16px 8px;
}

.nav-menu {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-link {
  padding: 16px 8px;
  text-decoration: none;
  color: #6b7280;
  font-weight: 600;
  transition: color 0.3s;
}

.nav-link:hover,
.nav-link.active {
  color: #10b981;
  border-bottom: 4px solid #10b981;
}
</style>`,
    bootstrap: `<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <div class="container-fluid">
    <a class="navbar-brand" href="#">Brand</a>
    <div class="navbar-nav">
      <a class="nav-link active" href="#">Home</a>
      <a class="nav-link" href="#">About</a>
      <a class="nav-link" href="#">Contact</a>
    </div>
  </div>
</nav>`
  },
  loader: {
    tailwind: `<div class="flex justify-center items-center">
  <div class="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
</div>`,
    css: `<div class="loader-container">
  <div class="loader"></div>
</div>

<style>
.loader-container {
  display: flex;
  justify-content: center;
  align-items: center;
}

.loader {
  border: 4px solid #f3f3f3;
  border-top: 4px solid #3498db;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  animation: spin 2s linear infinite;
}

@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
</style>`,
    bootstrap: `<div class="d-flex justify-content-center">
  <div class="spinner-border" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
  }
};

const ComponentCreationModal = ({ isOpen, onClose, onComplete }) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [selectedType, setSelectedType] = useState(null);
  const [selectedTech, setSelectedTech] = useState(null);
  const [code, setCode] = useState('');
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
    previewImages: []
  });

  const resetModal = () => {
    setCurrentStep(1);
    setSelectedType(null);
    setSelectedTech(null);
    setCode('');
    setFormData({
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
      previewImages: []
    });
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  const handleTypeSelect = (type) => {
    setSelectedType(type);
  };

  const handleTechSelect = (tech) => {
    setSelectedTech(tech);
    // Set initial code based on selection
    const template = starterTemplates[selectedType.id]?.[tech.id] || '';
    setCode(template);
  };

  const handleContinueFromSelection = () => {
    if (selectedType && selectedTech) {
      setCurrentStep(3);
    }
  };

  const handleSaveCode = () => {
    setCurrentStep(4);
  };

  const handleFormInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmitComponent = async () => {
    try {
      const completeData = {
        ...formData,
        code: code,
        componentType: selectedType.id,
        technology: selectedTech.id,
        // Map component type to category
        category: getCategoryFromType(selectedType.id),
        type: selectedType.id,
        language: selectedTech.id === 'tailwind' ? 'HTML/Tailwind' : 
                 selectedTech.id === 'css' ? 'HTML/CSS' : 'HTML/Bootstrap'
      };
      
      await onComplete(completeData);
      handleClose();
    } catch (error) {
      console.error('Error submitting component:', error);
    }
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

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={handleClose}
      >
        <motion.div
          className="bg-gray-900 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden"
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.9, opacity: 0 }}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-gray-700">
            <div className="flex items-center gap-4">
              {currentStep > 1 && (
                <button
                  onClick={() => setCurrentStep(currentStep - 1)}
                  className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
                >
                  <ArrowLeft size={20} className="text-gray-400" />
                </button>
              )}
              <h2 className="text-2xl font-bold text-white">
                {currentStep === 1 && "What are you making?"}
                {currentStep === 2 && "Choose Technology"}
                {currentStep === 3 && "Code Editor"}
                {currentStep === 4 && "Component Details"}
              </h2>
            </div>
            <button
              onClick={handleClose}
              className="p-2 hover:bg-gray-800 rounded-lg transition-colors"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>

          {/* Content */}
          <div className="p-6 overflow-y-auto max-h-[calc(90vh-200px)]">
            {/* Step 1: Component Type Selection */}
            {currentStep === 1 && (
              <div className="space-y-6">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                  {componentTypes.map((type) => (
                    <motion.button
                      key={type.id}
                      onClick={() => handleTypeSelect(type)}
                      className={`p-6 rounded-xl border-2 transition-all ${
                        selectedType?.id === type.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-3xl mb-2">{type.icon}</div>
                      <h3 className="font-semibold text-white mb-1">{type.name}</h3>
                      <p className="text-sm text-gray-400">{type.description}</p>
                    </motion.button>
                  ))}
                </div>
                {selectedType && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Continue
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 2: Technology Selection */}
            {currentStep === 2 && (
              <div className="space-y-6">
                <div className="text-center mb-8">
                  <p className="text-gray-400">
                    You're creating a <span className="text-white font-semibold">{selectedType?.name}</span>
                  </p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {technologies.map((tech) => (
                    <motion.button
                      key={tech.id}
                      onClick={() => handleTechSelect(tech)}
                      className={`p-8 rounded-xl border-2 transition-all ${
                        selectedTech?.id === tech.id
                          ? 'border-blue-500 bg-blue-500/10'
                          : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="text-4xl mb-4">{tech.icon}</div>
                      <h3 className="text-xl font-semibold text-white">{tech.name}</h3>
                      <div className={`h-1 rounded-full mt-4 bg-gradient-to-r ${tech.color}`}></div>
                    </motion.button>
                  ))}
                </div>
                {selectedTech && (
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-center"
                  >
                    <button
                      onClick={handleContinueFromSelection}
                      className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg transition-colors"
                    >
                      Continue
                      <ArrowRight size={20} />
                    </button>
                  </motion.div>
                )}
              </div>
            )}

            {/* Step 3: Code Editor */}
            {currentStep === 3 && (
              <div className="space-y-4">
                <div className="text-center mb-4">
                  <p className="text-gray-400">
                    Creating a <span className="text-white font-semibold">{selectedType?.name}</span> with{' '}
                    <span className="text-white font-semibold">{selectedTech?.name}</span>
                  </p>
                </div>
                
                {/* Enhanced Code Editor with Live Preview */}
                <CodeEditor
                  initialCode={code}
                  language={selectedTech?.id === 'tailwind' ? 'html' : selectedTech?.id}
                  onCodeChange={setCode}
                  showPreview={true}
                  height="500px"
                />
                
                <div className="flex justify-center">
                  <button
                    onClick={handleSaveCode}
                    className="flex items-center gap-2 px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Save & Continue
                    <ArrowRight size={20} />
                  </button>
                </div>
              </div>
            )}

            {/* Step 4: Component Details Form - This will be imported from existing form */}
            {currentStep === 4 && (
              <div className="space-y-6">
                <div className="text-center mb-6">
                  <p className="text-gray-400">
                    Almost done! Add some details about your{' '}
                    <span className="text-white font-semibold">{selectedType?.name}</span>
                  </p>
                </div>
                {/* This will be the simplified form without Git URL and Git Clone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Title *</label>
                    <input
                      type="text"
                      value={formData.title}
                      onChange={(e) => handleFormInputChange('title', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Enter component title"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Difficulty Level *</label>
                    <select
                      value={formData.difficultyLevel}
                      onChange={(e) => handleFormInputChange('difficultyLevel', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select difficulty</option>
                      <option value="Beginner">Beginner</option>
                      <option value="Intermediate">Intermediate</option>
                      <option value="Advanced">Advanced</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Developer Name *</label>
                    <input
                      type="text"
                      value={formData.developerName}
                      onChange={(e) => handleFormInputChange('developerName', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      placeholder="Your name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Experience Level *</label>
                    <select
                      value={formData.developerExperience}
                      onChange={(e) => handleFormInputChange('developerExperience', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select experience</option>
                      <option value="Junior">Junior (0-2 years)</option>
                      <option value="Mid-level">Mid-level (2-5 years)</option>
                      <option value="Senior">Senior (5+ years)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">Plan Type *</label>
                    <select
                      value={formData.planType}
                      onChange={(e) => handleFormInputChange('planType', e.target.value)}
                      className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="">Select plan</option>
                      <option value="Free">Free</option>
                      <option value="Premium">Premium</option>
                    </select>
                  </div>
                  {formData.planType === 'Premium' && (
                    <>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Price (INR)</label>
                        <input
                          type="number"
                          value={formData.pricingINR}
                          onChange={(e) => handleFormInputChange('pricingINR', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Price in INR"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">Price (USD)</label>
                        <input
                          type="number"
                          value={formData.pricingUSD}
                          onChange={(e) => handleFormInputChange('pricingUSD', e.target.value)}
                          className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                          placeholder="Price in USD"
                        />
                      </div>
                    </>
                  )}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Short Description *</label>
                  <textarea
                    value={formData.shortDescription}
                    onChange={(e) => handleFormInputChange('shortDescription', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="3"
                    placeholder="Brief description of your component"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Full Description</label>
                  <textarea
                    value={formData.fullDescription}
                    onChange={(e) => handleFormInputChange('fullDescription', e.target.value)}
                    className="w-full px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                    rows="5"
                    placeholder="Detailed description, usage instructions, etc."
                  />
                </div>
                <div className="flex justify-center">
                  <button
                    onClick={handleSubmitComponent}
                    className="px-8 py-3 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition-colors"
                  >
                    Submit Component
                  </button>
                </div>
              </div>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};

export default ComponentCreationModal;

