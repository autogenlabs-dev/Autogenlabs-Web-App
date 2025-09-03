'use client';
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowLeft, ArrowRight, Palette, Code, Eye, Save, CheckCircle, AlertCircle, Plus, X } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { componentApi } from '../../../lib/componentApi';
import CodeEditor from '../../ui/CodeEditor';
import DualCodeEditor from '../../ui/DualCodeEditor';

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
// Starter templates
const starterTemplates = {
  button: {
    tailwind: `<button class="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-200">
  Click me
</button>`,
    css: {
      html: `<button class="custom-btn">Click me</button>`,
      css: `.custom-btn {
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
}`
    },
    bootstrap: `<button type="button" class="btn btn-primary">Primary Button</button>`
  },
  card: {
    tailwind: `<div class="max-w-sm mx-auto bg-white rounded-xl shadow-md overflow-hidden">
  <div class="p-6">
    <h3 class="text-xl font-semibold text-gray-900 mb-2">Card Title</h3>
    <p class="text-gray-600">This is a beautiful card component with Tailwind CSS.</p>
    <button class="mt-4 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600">Learn More</button>
  </div>
</div>`,
    css: {
      html: `<div class="card">
  <div class="card-content">
    <h3 class="card-title">Card Title</h3>
    <p class="card-text">This is a beautiful card component with custom CSS.</p>
    <button class="card-btn">Learn More</button>
  </div>
</div>`,
      css: `.card {
  max-width: 384px;
  margin: 0 auto;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}
.card-content {
  padding: 24px;
}
.card-title {
  font-size: 20px;
  font-weight: 600;
  color: #111827;
  margin-bottom: 8px;
}
.card-text {
  color: #6b7280;
  margin-bottom: 16px;
}
.card-btn {
  padding: 8px 16px;
  background-color: #3b82f6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.card-btn:hover {
  background-color: #2563eb;
}`
    },
    bootstrap: `<div class="card" style="width: 18rem;">
  <div class="card-body">
    <h5 class="card-title">Card title</h5>
    <p class="card-text">Some quick example text to build on the card title.</p>
    <a href="#" class="btn btn-primary">Go somewhere</a>
  </div>
</div>`
  },
  form: {
    tailwind: `<form class="max-w-md mx-auto bg-white p-6 rounded-lg shadow-md">
  <div class="mb-4">
    <label class="block text-gray-700 text-sm font-bold mb-2">Email</label>
    <input type="email" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your email">
  </div>
  <div class="mb-6">
    <label class="block text-gray-700 text-sm font-bold mb-2">Password</label>
    <input type="password" class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your password">
  </div>
  <button type="submit" class="w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-md">Submit</button>
</form>`,
    css: {
      html: `<form class="form-container">
  <div class="form-group">
    <label class="form-label">Email</label>
    <input type="email" class="form-input" placeholder="Enter your email">
  </div>
  <div class="form-group">
    <label class="form-label">Password</label>
    <input type="password" class="form-input" placeholder="Enter your password">
  </div>
  <button type="submit" class="form-submit">Submit</button>
</form>`,
      css: `.form-container {
  max-width: 384px;
  margin: 0 auto;
  background: white;
  padding: 24px;
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
}
.form-group {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  color: #374151;
  font-size: 14px;
  font-weight: bold;
  margin-bottom: 8px;
}
.form-input {
  width: 100%;
  padding: 8px 12px;
  border: 1px solid #d1d5db;
  border-radius: 6px;
  outline: none;
  transition: border-color 0.2s;
}
.form-input:focus {
  border-color: #3b82f6;
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
}
.form-submit {
  width: 100%;
  background-color: #3b82f6;
  color: white;
  font-weight: bold;
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s;
}
.form-submit:hover {
  background-color: #2563eb;
}`
    },
    bootstrap: `<form>
  <div class="mb-3">
    <label for="email" class="form-label">Email</label>
    <input type="email" class="form-control" id="email" placeholder="Enter your email">
  </div>
  <div class="mb-3">
    <label for="password" class="form-label">Password</label>
    <input type="password" class="form-control" id="password" placeholder="Enter your password">
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>`
  },
  loader: {
    tailwind: `<div class="flex items-center justify-center">
  <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
</div>`,
    css: {
      html: `<div class="loader-container">
  <div class="loader"></div>
</div>`,
      css: `.loader-container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.loader {
  width: 48px;
  height: 48px;
  border: 2px solid #f3f3f3;
  border-top: 2px solid #3b82f6;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}
@keyframes spin {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}`
    },
    bootstrap: `<div class="d-flex justify-content-center">
  <div class="spinner-border text-primary" role="status">
    <span class="visually-hidden">Loading...</span>
  </div>
</div>`
  }
};

const CreateComponentForm = () => {
    const router = useRouter();
    const [currentStep, setCurrentStep] = useState(1);
    const [selectedType, setSelectedType] = useState(null);
    const [selectedTech, setSelectedTech] = useState(null);
    const [selectedBackground, setSelectedBackground] = useState(backgroundOptions[0]);
    const [code, setCode] = useState('');
    const [htmlCode, setHtmlCode] = useState(''); // For CSS technology
    const [cssCode, setCssCode] = useState(''); // For CSS technology
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

    // Ensure title is set when selectedType is available
    useEffect(() => {
        if (selectedType) {
            setFormData(prev => ({
                ...prev,
                title: selectedType.name
            }));
        }
    }, [selectedType]);

    const handleTypeSelect = (type) => {
        setSelectedType(type);
        
        // Immediately update formData with the new title
        setFormData(prev => ({ 
            ...prev, 
            componentType: type.id, 
            type: type.id,
            title: type.name // Always set the title to the type name
        }));
        
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
        
        if (tech.id === 'css' && typeof template === 'object') {
            // For CSS technology, set HTML and CSS separately
            setHtmlCode(template.html || '');
            setCssCode(template.css || '');
            setFormData(prev => ({ 
                ...prev, 
                code: {
                    html: template.html || '',
                    css: template.css || ''
                }
            }));
        } else {
            // For other technologies, use single code editor
            setCode(template);
            setFormData(prev => ({ ...prev, code: template }));
        }
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

    const handleHtmlCodeChange = (newHtmlCode) => {
        setHtmlCode(newHtmlCode);
        setFormData(prev => ({ 
            ...prev, 
            code: {
                html: newHtmlCode,
                css: cssCode
            }
        }));
    };

    const handleCssCodeChange = (newCssCode) => {
        setCssCode(newCssCode);
        setFormData(prev => ({ 
            ...prev, 
            code: {
                html: htmlCode,
                css: newCssCode
            }
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

    const generatePreviewImage = async () => {
        try {
            
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;
            
            // Modern dark gradient background (like uiverse.io)
            const gradient = ctx.createLinearGradient(0, 0, 400, 300);
            gradient.addColorStop(0, '#0f0f1a');
            gradient.addColorStop(0.5, '#1a1a2e');
            gradient.addColorStop(1, '#16213e');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 300);
            
            // Add some noise/texture effect
            for (let i = 0; i < 100; i++) {
                ctx.fillStyle = `rgba(255, 255, 255, ${Math.random() * 0.02})`;
                ctx.fillRect(Math.random() * 400, Math.random() * 300, 1, 1);
            }
            
            // Component-specific modern rendering
            if (selectedType?.id === 'card') {
                // Modern glassmorphism card
                const cardGradient = ctx.createLinearGradient(0, 40, 0, 220);
                cardGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                cardGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
                ctx.fillStyle = cardGradient;
                ctx.fillRect(40, 40, 320, 180);
                
                // Glass border
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.strokeRect(40, 40, 320, 180);
                
                // Card header gradient
                const headerGradient = ctx.createLinearGradient(0, 40, 0, 100);
                headerGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                headerGradient.addColorStop(1, 'rgba(99, 102, 241, 0.1)');
                ctx.fillStyle = headerGradient;
                ctx.fillRect(40, 40, 320, 60);
                
                // Title with modern font
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 20px "Inter", system-ui';
                ctx.textAlign = 'left';
                ctx.fillText('Modern Card', 60, 75);
                
                // Subtitle
                ctx.fillStyle = 'rgba(255, 255, 255, 0.7)';
                ctx.font = '14px "Inter", system-ui';
                ctx.fillText('Beautiful glassmorphism design', 60, 95);
                
                // Content area
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.font = '12px "Inter", system-ui';
                ctx.fillText('• Advanced styling and animations', 60, 125);
                ctx.fillText('• Responsive and accessible', 60, 145);
                ctx.fillText('• Modern UI patterns', 60, 165);
                
                // Modern button with gradient
                const btnGradient = ctx.createLinearGradient(0, 185, 0, 210);
                btnGradient.addColorStop(0, '#6366f1');
                btnGradient.addColorStop(1, '#4f46e5');
                ctx.fillStyle = btnGradient;
                ctx.fillRect(60, 185, 120, 25);
                
                // Button text
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px "Inter", system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('View Details', 120, 200);
                
            } else if (selectedType?.id === 'button') {
                // Modern button with multiple variants
                const buttons = [
                    { x: 80, y: 100, w: 100, h: 40, color: '#6366f1', text: 'Primary' },
                    { x: 220, y: 100, w: 100, h: 40, color: '#10b981', text: 'Success' },
                    { x: 80, y: 160, w: 100, h: 40, color: '#f59e0b', text: 'Warning' },
                    { x: 220, y: 160, w: 100, h: 40, color: '#ef4444', text: 'Danger' }
                ];
                
                buttons.forEach(btn => {
                    // Button gradient
                    const btnGradient = ctx.createLinearGradient(0, btn.y, 0, btn.y + btn.h);
                    btnGradient.addColorStop(0, btn.color);
                    btnGradient.addColorStop(1, btn.color + '80');
                    ctx.fillStyle = btnGradient;
                    ctx.fillRect(btn.x, btn.y, btn.w, btn.h);
                    
                    // Button border glow
                    ctx.strokeStyle = btn.color;
                    ctx.lineWidth = 2;
                    ctx.strokeRect(btn.x, btn.y, btn.w, btn.h);
                    
                    // Button text
                    ctx.fillStyle = '#ffffff';
                    ctx.font = 'bold 14px "Inter", system-ui';
                    ctx.textAlign = 'center';
                    ctx.fillText(btn.text, btn.x + btn.w/2, btn.y + btn.h/2 + 5);
                });
                
            } else if (selectedType?.id === 'form') {
                // Modern form with glassmorphism
                const formGradient = ctx.createLinearGradient(0, 50, 0, 250);
                formGradient.addColorStop(0, 'rgba(255, 255, 255, 0.1)');
                formGradient.addColorStop(1, 'rgba(255, 255, 255, 0.05)');
                ctx.fillStyle = formGradient;
                ctx.fillRect(60, 50, 280, 200);
                
                // Form border
                ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
                ctx.lineWidth = 1;
                ctx.strokeRect(60, 50, 280, 200);
                
                // Form title
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 18px "Inter", system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('Contact Form', 200, 80);
                
                // Input fields with modern styling
                const fields = [
                    { label: 'Name', y: 110 },
                    { label: 'Email', y: 150 },
                    { label: 'Message', y: 190 }
                ];
                
                fields.forEach(field => {
                    // Field label
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
                    ctx.font = '12px "Inter", system-ui';
                    ctx.textAlign = 'left';
                    ctx.fillText(field.label, 80, field.y);
                    
                    // Input field
                    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
                    ctx.fillRect(80, field.y + 5, 240, 25);
                    ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
                    ctx.lineWidth = 1;
                    ctx.strokeRect(80, field.y + 5, 240, 25);
                });
                
                // Submit button
                const submitGradient = ctx.createLinearGradient(0, 220, 0, 240);
                submitGradient.addColorStop(0, '#6366f1');
                submitGradient.addColorStop(1, '#4f46e5');
                ctx.fillStyle = submitGradient;
                ctx.fillRect(200, 220, 100, 20);
                
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 12px "Inter", system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('Submit', 250, 232);
                
            } else if (selectedType?.id === 'loader') {
                // Modern animated loader visualization
                const centerX = 200;
                const centerY = 150;
                
                // Multiple spinning rings
                for (let i = 0; i < 3; i++) {
                    const radius = 30 + (i * 15);
                    const opacity = 0.8 - (i * 0.2);
                    
                    // Ring background
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity * 0.3})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
                    ctx.stroke();
                    
                    // Active arc
                    ctx.strokeStyle = `rgba(99, 102, 241, ${opacity})`;
                    ctx.lineWidth = 3;
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, Math.PI * (1 + i * 0.5));
                    ctx.stroke();
                }
                
                // Center glow
                const glowGradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, 30);
                glowGradient.addColorStop(0, 'rgba(99, 102, 241, 0.5)');
                glowGradient.addColorStop(1, 'rgba(99, 102, 241, 0)');
                ctx.fillStyle = glowGradient;
                ctx.fillRect(centerX - 30, centerY - 30, 60, 60);
                
            } else {
                // Generic modern component showcase
                const componentGradient = ctx.createLinearGradient(0, 80, 0, 220);
                componentGradient.addColorStop(0, 'rgba(99, 102, 241, 0.3)');
                componentGradient.addColorStop(0.5, 'rgba(168, 85, 247, 0.2)');
                componentGradient.addColorStop(1, 'rgba(236, 72, 153, 0.1)');
                ctx.fillStyle = componentGradient;
                ctx.fillRect(80, 80, 240, 140);
                
                // Border with glow effect
                ctx.strokeStyle = 'rgba(99, 102, 241, 0.5)';
                ctx.lineWidth = 2;
                ctx.strokeRect(80, 80, 240, 140);
                
                // Component icon/representation
                ctx.fillStyle = '#ffffff';
                ctx.font = 'bold 24px "Inter", system-ui';
                ctx.textAlign = 'center';
                ctx.fillText('⚡', 200, 130);
                
                // Component name
                ctx.fillStyle = 'rgba(255, 255, 255, 0.9)';
                ctx.font = 'bold 18px "Inter", system-ui';
                ctx.fillText(selectedType?.name || 'Component', 200, 160);
                
                // Tech indicator
                ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
                ctx.font = '14px "Inter", system-ui';
                ctx.fillText('Modern UI Component', 200, 180);
            }
            
            // Technology badge with modern styling
            const techColors = {
                'tailwind': ['#06b6d4', '#0891b2'],
                'css': ['#1572b6', '#0f62fe'], 
                'bootstrap': ['#7952b3', '#6f42c1']
            };
            
            const techColorPair = techColors[selectedTech?.id] || ['#6366f1', '#4f46e5'];
            const techGradient = ctx.createLinearGradient(0, 15, 0, 35);
            techGradient.addColorStop(0, techColorPair[0]);
            techGradient.addColorStop(1, techColorPair[1]);
            ctx.fillStyle = techGradient;
            ctx.fillRect(15, 15, 100, 25);
            
            // Tech badge border
            ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
            ctx.lineWidth = 1;
            ctx.strokeRect(15, 15, 100, 25);
            
            // Tech text
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 12px "Inter", system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(selectedTech?.name || 'CSS', 65, 30);
            
            // Component title at bottom with glow effect
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 16px "Inter", system-ui';
            ctx.textAlign = 'center';
            const title = formData.title || selectedType?.name || 'Modern Component';
            ctx.fillText(title, 200, 275);
            
            // Add subtle glow to title
            ctx.shadowColor = 'rgba(99, 102, 241, 0.5)';
            ctx.shadowBlur = 10;
            ctx.fillText(title, 200, 275);
            ctx.shadowBlur = 0;
            
            const dataURL = canvas.toDataURL('image/png', 0.95);
            
            return dataURL;
            
        } catch (error) {
            console.error('❌ Error generating preview image:', error);
            
            // Modern fallback
            const canvas = document.createElement('canvas');
            const ctx = canvas.getContext('2d');
            canvas.width = 400;
            canvas.height = 300;
            
            // Dark gradient background
            const gradient = ctx.createLinearGradient(0, 0, 400, 300);
            gradient.addColorStop(0, '#1e293b');
            gradient.addColorStop(1, '#0f172a');
            ctx.fillStyle = gradient;
            ctx.fillRect(0, 0, 400, 300);
            
            // Fallback content
            ctx.fillStyle = '#ffffff';
            ctx.font = 'bold 24px "Inter", system-ui';
            ctx.textAlign = 'center';
            ctx.fillText(selectedType?.name || 'Component', 200, 140);
            
            ctx.fillStyle = 'rgba(255, 255, 255, 0.6)';
            ctx.font = '16px "Inter", system-ui';
            ctx.fillText(selectedTech?.name || 'Preview', 200, 170);
            
            return canvas.toDataURL('image/png', 0.9);
        }
    };
    const handleSubmit = async () => {
        setIsSubmitting(true);
        setSubmitStatus(null);
        setSubmitMessage('');

        try {
            // Validate required fields
            const hasCode = selectedTech?.id === 'css' ? 
                (htmlCode.trim() && cssCode.trim()) : 
                code.trim();
                
            if (!selectedType || !selectedTech || !hasCode) {
                setSubmitStatus('error');
                setSubmitMessage('Please complete all steps before submitting.');
                return;
            }

            if (!formData.title.trim() || !formData.difficultyLevel || !formData.planType || 
                !formData.developerName.trim() || !formData.developerExperience || 
                !formData.shortDescription.trim()) {
                setSubmitStatus('error');
                setSubmitMessage('Please fill in all required fields (marked with *).');
                return;
            }

            // Generate preview image
            const previewImage = await generatePreviewImage();
            
            const completeData = {
                ...formData,
                category: getCategoryFromType(selectedType?.id),
                code: selectedTech?.id === 'css' ? { html: htmlCode, css: cssCode } : code.trim(),
                componentType: selectedType?.id,
                technology: selectedTech?.id,
                previewImages: previewImage ? [previewImage] : []
            };
            
            
            // Actually create the component using the backend API
            const backendData = await componentApi.transformFormDataToBackend(completeData);
            
            const response = await componentApi.createComponent(backendData);
            
            setSubmitStatus('success');
            setSubmitMessage('Component created successfully! Redirecting...');
            
            setTimeout(() => {
                router.push(`/components/${response.id}`);
            }, 2000);

            // Old simulation code (now disabled):
            /*
            setSubmitStatus('success');
            setSubmitMessage('Component created successfully! Redirecting...');
            
            setTimeout(() => {
                router.push('/components');
            }, 2000);
            */

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

    return (
        <div className="min-h-screen bg-[linear-gradient(180deg,#040406_50%,#09080D_100%)] text-white transition-colors duration-300">
            {/* Header */}
            <div className="sticky top-0 z-50 bg-slate-900/40 backdrop-blur-2xl border-b border-white/20">
                <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <button 
                            onClick={() => window.history.back()}
                            className="flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                            <ArrowLeft className="w-5 h-5" />
                            Back
                        </button>
                        
                        {/* Step Indicator */}
                        <div className="hidden md:flex items-center gap-2 ml-8">
                            {[1, 2, 3, 4].map((step) => (
                                <div
                                    key={step}
                                    className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-colors ${
                                        currentStep >= step
                                            ? 'bg-blue-500 text-white'
                                            : 'bg-gray-700 text-gray-400'
                                    }`}
                                >
                                    {step}
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="flex items-center gap-4">
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
                            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">What are you making?</h1>
                            <p className="text-lg text-gray-300">
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
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <div className="text-4xl mb-3">{type.icon}</div>
                                    <h3 className="font-semibold text-lg mb-2 text-white">{type.name}</h3>
                                    <p className="text-sm text-gray-300">
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
                            <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Choose Technology</h1>
                            <p className="text-lg text-gray-300">
                                You're creating a <span className="font-semibold text-blue-400">{selectedType?.name}</span>
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
                            {technologies.map((tech) => (
                                <motion.button
                                    key={tech.id}
                                    onClick={() => handleTechSelect(tech)}
                                    className={`p-8 rounded-xl border-2 transition-all duration-200 ${
                                        selectedTech?.id === tech.id
                                            ? 'border-blue-500 bg-blue-500/20'
                                            : 'border-gray-600 hover:border-gray-500 bg-gray-800/50'
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
                            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Code Editor</h1>
                            <p className="text-gray-300">
                                Creating a <span className="font-semibold text-blue-400">{selectedType?.name}</span> with{' '}
                                <span className="font-semibold text-purple-400">{selectedTech?.name}</span>
                            </p>
                        </div>

                        {/* Background Selection */}
                        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-xl p-6">
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
                        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-xl overflow-hidden">
                            {selectedTech?.id === 'css' ? (
                                <DualCodeEditor
                                    initialHtmlCode={htmlCode}
                                    initialCssCode={cssCode}
                                    onHtmlCodeChange={handleHtmlCodeChange}
                                    onCssCodeChange={handleCssCodeChange}
                                    showPreview={true}
                                    previewBackground={selectedBackground?.value}
                                    height="600px"
                                    theme="light"
                                />
                            ) : (
                                <CodeEditor
                                    initialCode={code}
                                    language={selectedTech?.id === 'tailwind' ? 'html' : selectedTech?.id}
                                    onCodeChange={handleCodeChange}
                                    showPreview={true}
                                    previewBackground={selectedBackground?.value}
                                    height="600px"
                                    theme="light"
                                />
                            )}
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
                            <h1 className="text-3xl font-bold mb-2 bg-gradient-to-r from-emerald-400 via-teal-400 to-cyan-400 bg-clip-text text-transparent">Component Details</h1>
                            <p className="text-gray-300">
                                Add details about your {selectedType?.name} component
                            </p>
                        </div>

                        <div className="bg-slate-900/40 backdrop-blur-2xl border border-white/20 rounded-xl p-8">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {/* Component Title */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Component Title *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.title || selectedType?.name || ''}
                                        onChange={(e) => handleInputChange('title', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder={selectedType ? selectedType.name : "Enter component title"}
                                    />
                                    {selectedType && !formData.title && (
                                        <p className="text-sm text-gray-400 mt-1">
                                            Auto-filled from selected type: {selectedType.name}
                                        </p>
                                    )}
                                </div>

                                {/* Difficulty Level */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Difficulty Level *
                                    </label>
                                    <select
                                        value={formData.difficultyLevel}
                                        onChange={(e) => handleInputChange('difficultyLevel', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select difficulty</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* Plan Type */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Plan Type *
                                    </label>
                                    <select
                                        value={formData.planType}
                                        onChange={(e) => handleInputChange('planType', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select plan</option>
                                        <option value="Free">Free</option>
                                        <option value="Premium">Premium</option>
                                    </select>
                                </div>

                                {/* Developer Name */}
                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Developer Name *
                                    </label>
                                    <input
                                        type="text"
                                        value={formData.developerName}
                                        onChange={(e) => handleInputChange('developerName', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        placeholder="Your name"
                                    />
                                </div>

                                <div>
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Experience Level *
                                    </label>
                                    <select
                                        value={formData.developerExperience}
                                        onChange={(e) => handleInputChange('developerExperience', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        <option value="">Select experience</option>
                                        <option value="Junior">Junior (0-2 years)</option>
                                        <option value="Mid-level">Mid-level (2-5 years)</option>
                                        <option value="Senior">Senior (5+ years)</option>
                                    </select>
                                </div>

                                {/* Short Description */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Short Description *
                                    </label>
                                    <textarea
                                        value={formData.shortDescription}
                                        onChange={(e) => handleInputChange('shortDescription', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="3"
                                        placeholder="Brief description of your component"
                                    />
                                </div>

                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Full Description
                                    </label>
                                    <textarea
                                        value={formData.fullDescription}
                                        onChange={(e) => handleInputChange('fullDescription', e.target.value)}
                                        className="w-full px-4 py-3 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        rows="5"
                                        placeholder="Detailed description, usage instructions, etc."
                                    />
                                </div>

                                {/* Dependencies */}
                                <div className="md:col-span-2">
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Dependencies
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newDependency}
                                            onChange={(e) => setNewDependency(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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
                                    <label className="block text-sm font-medium mb-2 text-gray-300">
                                        Tags
                                    </label>
                                    <div className="flex gap-2 mb-2">
                                        <input
                                            type="text"
                                            value={newTag}
                                            onChange={(e) => setNewTag(e.target.value)}
                                            className="flex-1 px-4 py-2 border border-gray-600 rounded-lg bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
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

