"use client";

import React, { useState } from 'react';
import { ChevronRightIcon, ChevronDownIcon, BookOpenIcon, RocketLaunchIcon, CogIcon, QuestionMarkCircleIcon, CodeBracketIcon, SparklesIcon, CloudIcon, CreditCardIcon } from '@heroicons/react/24/outline';

const DocsPage = () => {
    const [activeSection, setActiveSection] = useState('getting-started');
    const [openSections, setOpenSections] = useState({
        'getting-started': true,
    });

    const toggleSection = (section) => {
        setOpenSections(prev => ({
            ...prev,
            [section]: !prev[section]
        }));
    };

    const sidebarSections = [
        {
            id: 'getting-started',
            title: 'Getting Started',
            icon: RocketLaunchIcon,
            items: [
                { id: 'installation', title: 'Installation' },
                { id: 'setup', title: 'Setup & Configuration' },
                { id: 'first-project', title: 'Your First Project' },
            ]
        },
        {
            id: 'features',
            title: 'Core Features',
            icon: SparklesIcon,
            items: [
                { id: 'ai-assistance', title: 'AI Code Assistant' },
                { id: 'smart-completion', title: 'Smart Code Completion' },
                { id: 'project-generator', title: 'Project Generator' },
                { id: 'real-time-collab', title: 'Real-time Collaboration' },
            ]
        },
        {
            id: 'integrations',
            title: 'Integrations',
            icon: CloudIcon,
            items: [
                { id: 'requesty', title: 'Requesty API Testing' },
                { id: 'openrouter', title: 'OpenRouter AI Models' },
                { id: 'free-credits', title: 'Free Credits Program' },
            ]
        },
        {
            id: 'development',
            title: 'Development',
            icon: CodeBracketIcon,
            items: [
                { id: 'extensions', title: 'Extensions' },
                { id: 'themes', title: 'Themes & Customization' },
                { id: 'shortcuts', title: 'Keyboard Shortcuts' },
            ]
        },
        {
            id: 'configuration',
            title: 'Advanced Configuration',
            icon: CogIcon,
            items: [
                { id: 'settings', title: 'IDE Settings' },
                { id: 'workspace', title: 'Workspace Configuration' },
                { id: 'debugging', title: 'Debugging Tools' },
            ]
        },
        {
            id: 'support',
            title: 'Help & Support',
            icon: QuestionMarkCircleIcon,
            items: [
                { id: 'troubleshooting', title: 'Troubleshooting' },
                { id: 'faq', title: 'FAQ' },
                { id: 'community', title: 'Community' },
            ]
        }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'installation':
                return (
                    <div className="space-y-8">            <div>
                        <h1 className="text-4xl font-bold text-white mb-4">Installation Guide</h1>
                        <p className="text-gray-300 text-lg mb-8">Get started with Codemurf IDE in just a few simple steps.</p>
                    </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">1</span>
                                System Requirements
                            </h2>
                            <div className="space-y-4">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Minimum Requirements:</h4>
                                    <ul className="text-gray-300 space-y-1 ml-4">
                                        <li>• Operating System: Windows 10/11, macOS 10.14+, or Linux (Ubuntu 18.04+)</li>
                                        <li>• RAM: 4GB (8GB recommended)</li>
                                        <li>• Storage: 2GB available space</li>
                                        <li>• Internet connection for AI features</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">2</span>
                                Download Codemurf IDE
                            </h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-center">
                                    <h4 className="text-lg font-semibold text-white mb-2">Windows</h4>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition-colors">
                                        Download for Windows
                                    </button>
                                    <p className="text-sm text-gray-400 mt-2">Windows 10/11 (64-bit)</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-center">
                                    <h4 className="text-lg font-semibold text-white mb-2">macOS</h4>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition-colors">
                                        Download for macOS
                                    </button>
                                    <p className="text-sm text-gray-400 mt-2">macOS 10.14+ (Intel & Apple Silicon)</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 text-center">
                                    <h4 className="text-lg font-semibold text-white mb-2">Linux</h4>
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg w-full transition-colors">
                                        Download for Linux
                                    </button>
                                    <p className="text-sm text-gray-400 mt-2">Ubuntu 18.04+ / Debian / RHEL</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4 flex items-center">
                                <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold mr-3">3</span>
                                Installation Process
                            </h2>
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Windows Installation:</h4>
                                    <ol className="text-gray-300 space-y-2 ml-4">
                                        <li>1. Run the downloaded <code className="bg-gray-700 px-2 py-1 rounded text-sm">Codemurf LabsIDE-Setup.exe</code></li>
                                        <li>2. Follow the installation wizard</li>
                                        <li>3. Choose installation directory (default recommended)</li>
                                        <li>4. Select additional components (Git integration, Shell integration)</li>
                                        <li>5. Complete the installation and launch Codemurf IDE</li>
                                    </ol>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">macOS Installation:</h4>
                                    <ol className="text-gray-300 space-y-2 ml-4">
                                        <li>1. Open the downloaded <code className="bg-gray-700 px-2 py-1 rounded text-sm">Codemurf LabsIDE.dmg</code></li>
                                        <li>2. Drag Codemurf IDE to Applications folder</li>
                                        <li>3. Launch from Applications or Spotlight</li>
                                        <li>4. Allow necessary permissions when prompted</li>
                                    </ol>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Linux Installation:</h4>
                                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                        <code className="text-green-400 text-sm">
                                            # Using .deb package (Ubuntu/Debian)<br />
                                            sudo dpkg -i Codemurf-ide_*.deb<br />
                                            <br />
                                            # Using .rpm package (RHEL/Fedora)<br />
                                            sudo rpm -i Codemurf-ide-*.rpm<br />
                                            <br />
                                            # Using Snap<br />
                                            sudo snap install Codemurf-ide
                                        </code>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'setup':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Setup & Configuration</h1>
                            <p className="text-gray-300 text-lg mb-8">Configure Codemurf IDE for optimal performance and personalization.</p>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">              <h2 className="text-2xl font-semibold text-white mb-4">Initial Setup Wizard</h2>
                            <p className="text-gray-300 mb-4">When you first launch Codemurf IDE, you'll be guided through a setup process:</p>
                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">1</span>
                                    <div>
                                        <h4 className="text-white font-semibold">Choose Your Setup Flow</h4>
                                        <p className="text-gray-300 text-sm">Import settings from VS Code, WebStorm, or start fresh</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">2</span>
                                    <div>
                                        <h4 className="text-white font-semibold">Select Your Theme</h4>
                                        <p className="text-gray-300 text-sm">Choose from Dark Pro, Light Mode, or High Contrast themes</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">3</span>
                                    <div>
                                        <h4 className="text-white font-semibold">Configure AI Assistant</h4>
                                        <p className="text-gray-300 text-sm">Set up your AI preferences and API keys</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <span className="bg-blue-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm font-bold mt-0.5">4</span>
                                    <div>
                                        <h4 className="text-white font-semibold">Install Extensions</h4>
                                        <p className="text-gray-300 text-sm">Choose from recommended language packs and tools</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">              <h2 className="text-2xl font-semibold text-white mb-4">Account Setup</h2>
                            <p className="text-gray-300 mb-4">Create your Codemurf account to access cloud features and sync settings.</p>
                            <div className="bg-yellow-900/20 border border-yellow-600 rounded-lg p-4 mb-4">
                                <p className="text-yellow-200 text-sm">
                                    <strong>Free Credits Included:</strong> New accounts receive $10 in API credits for Requesty testing and OpenRouter AI models.
                                </p>
                            </div>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                Create Account
                            </button>
                        </div>
                    </div>
                );

            case 'requesty':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Requesty API Testing Integration</h1>
                            <p className="text-gray-300 text-lg mb-8">Built-in API testing and development tools powered by Requesty.</p>
                        </div>

                        <div className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-xl p-6 mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <CreditCardIcon className="w-8 h-8 text-purple-400" />
                                <h2 className="text-2xl font-semibold text-white">Free API Testing Credits</h2>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Every Codemurf IDE user gets <strong className="text-purple-400">$5 worth of free Requesty credits</strong> for API testing and development.
                            </p>
                            <ul className="text-gray-300 space-y-2 mb-4">
                                <li>• Test REST APIs, GraphQL, and WebSocket connections</li>
                                <li>• Automated testing workflows</li>
                                <li>• Request/Response validation</li>
                                <li>• Mock server capabilities</li>
                            </ul>
                            <button className="bg-purple-600 hover:bg-purple-700 text-white px-6 py-2 rounded-lg transition-colors">
                                Activate Free Credits
                            </button>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Getting Started with Requesty</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">1. Enable Requesty Integration</h3>
                                    <p className="text-gray-300 mb-2">Open Codemurf IDE settings and navigate to Extensions → Requesty</p>
                                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                        <code className="text-green-400 text-sm">
                                            Settings → Extensions → Requesty → Enable Integration
                                        </code>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">2. Create Your First API Test</h3>
                                    <ol className="text-gray-300 space-y-2 ml-4">
                                        <li>1. Open the Requesty panel (Ctrl+Shift+R)</li>
                                        <li>2. Click "New Request"</li>
                                        <li>3. Enter your API endpoint and method</li>
                                        <li>4. Add headers, parameters, and body if needed</li>
                                        <li>5. Click "Send" to test your API</li>
                                    </ol>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">3. Advanced Features</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Environment Variables</h4>
                                            <p className="text-gray-300 text-sm">Set up different environments for development, staging, and production.</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Test Automation</h4>
                                            <p className="text-gray-300 text-sm">Create automated test suites with assertions and workflows.</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Mock Servers</h4>
                                            <p className="text-gray-300 text-sm">Create mock endpoints for frontend development.</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Team Collaboration</h4>
                                            <p className="text-gray-300 text-sm">Share API collections and test results with your team.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'openrouter':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">OpenRouter AI Models Integration</h1>
                            <p className="text-gray-300 text-lg mb-8">Access 400+ AI models from 60+ providers directly in Codemurf IDE.</p>
                        </div>

                        <div className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border border-emerald-600 rounded-xl p-6 mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <SparklesIcon className="w-8 h-8 text-emerald-400" />
                                <h2 className="text-2xl font-semibold text-white">Free AI Model Credits</h2>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Codemurf IDE users receive <strong className="text-emerald-400">$10 in OpenRouter credits</strong> to experiment with premium AI models.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Available Models:</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• GPT-4 & GPT-4 Turbo</li>
                                        <li>• Claude 3.5 Sonnet & Haiku</li>
                                        <li>• Gemini Pro & Ultra</li>
                                        <li>• Llama 3 & Code Llama</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Use Cases:</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Code generation & completion</li>
                                        <li>• Bug fixing & optimization</li>
                                        <li>• Documentation generation</li>
                                        <li>• Code review & analysis</li>
                                    </ul>
                                </div>
                            </div>
                            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-2 rounded-lg transition-colors">
                                Claim Free Credits
                            </button>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Setting Up OpenRouter</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">1. Connect Your OpenRouter Account</h3>
                                    <p className="text-gray-300 mb-2">Link your OpenRouter account to access AI models:</p>
                                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                        <code className="text-green-400 text-sm">
                                            Codemurf Settings → AI Assistant → OpenRouter → Connect Account
                                        </code>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">2. Choose Your AI Models</h3>
                                    <p className="text-gray-300 mb-4">Select from different model categories based on your needs:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">🚀 Fast Models</h4>
                                            <p className="text-gray-300 text-sm mb-2">Quick responses for basic tasks</p>
                                            <ul className="text-gray-400 text-xs space-y-1">
                                                <li>• Llama 3.2 3B</li>
                                                <li>• Mistral 7B</li>
                                                <li>• Phi-3 Mini</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">⚖️ Balanced Models</h4>
                                            <p className="text-gray-300 text-sm mb-2">Good performance and cost</p>
                                            <ul className="text-gray-400 text-xs space-y-1">
                                                <li>• GPT-3.5 Turbo</li>
                                                <li>• Claude 3 Haiku</li>
                                                <li>• Gemini Pro</li>
                                            </ul>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">🧠 Premium Models</h4>
                                            <p className="text-gray-300 text-sm mb-2">Best quality for complex tasks</p>
                                            <ul className="text-gray-400 text-xs space-y-1">
                                                <li>• GPT-4 Turbo</li>
                                                <li>• Claude 3.5 Sonnet</li>
                                                <li>• Gemini Ultra</li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">3. Using AI in Your Workflow</h3>
                                    <div className="space-y-4">
                                        <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Code Completion</h4>
                                            <p className="text-gray-300 text-sm">AI-powered code suggestions as you type (Ctrl+Space)</p>
                                        </div>
                                        <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Chat Assistant</h4>
                                            <p className="text-gray-300 text-sm">Ask questions about your code (Ctrl+Shift+A)</p>
                                        </div>
                                        <div className="bg-gray-700/20 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">Code Generation</h4>
                                            <p className="text-gray-300 text-sm">Generate functions, classes, and documentation</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'free-credits':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Free Credits Program</h1>
                            <p className="text-gray-300 text-lg mb-8">Get started with premium features at no cost - $15 total value for new users.</p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="bg-gradient-to-br from-purple-900/20 to-pink-900/20 border border-purple-600 rounded-xl p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-purple-600 rounded-lg p-2">
                                        <CogIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">Requesty Credits</h3>
                                        <p className="text-purple-300 text-sm">API Testing & Development</p>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-purple-400 mb-2">$5.00</div>
                                <ul className="text-gray-300 text-sm space-y-1 mb-4">
                                    <li>• 1,000 API requests</li>
                                    <li>• Mock server hosting</li>
                                    <li>• Test automation runs</li>
                                    <li>• Team collaboration features</li>
                                </ul>
                                <div className="bg-purple-600/20 border border-purple-500 rounded-lg p-3">
                                    <p className="text-purple-200 text-xs">
                                        Perfect for testing REST APIs, GraphQL endpoints, and building mock servers for development.
                                    </p>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-emerald-900/20 to-blue-900/20 border border-emerald-600 rounded-xl p-6">
                                <div className="flex items-center space-x-3 mb-4">
                                    <div className="bg-emerald-600 rounded-lg p-2">
                                        <SparklesIcon className="w-6 h-6 text-white" />
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-semibold text-white">OpenRouter Credits</h3>
                                        <p className="text-emerald-300 text-sm">AI Models & ML Services</p>
                                    </div>
                                </div>
                                <div className="text-3xl font-bold text-emerald-400 mb-2">$10.00</div>
                                <ul className="text-gray-300 text-sm space-y-1 mb-4">
                                    <li>• 400+ AI models access</li>
                                    <li>• GPT-4, Claude, Gemini</li>
                                    <li>• Code generation</li>
                                    <li>• Smart completions</li>
                                </ul>
                                <div className="bg-emerald-600/20 border border-emerald-500 rounded-lg p-3">
                                    <p className="text-emerald-200 text-xs">
                                        Experiment with premium AI models for code generation, debugging, and intelligent assistance.
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">How to Claim Your Credits</h2>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="text-center">
                                    <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-lg">1</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Create Account</h3>
                                    <p className="text-gray-300 text-sm">Sign up for Codemurf IDE and verify your email address</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-lg">2</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Complete Setup</h3>
                                    <p className="text-gray-300 text-sm">Finish the initial IDE setup and configuration process</p>
                                </div>
                                <div className="text-center">
                                    <div className="bg-blue-600 rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                                        <span className="text-white font-bold text-lg">3</span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white mb-2">Activate Credits</h3>
                                    <p className="text-gray-300 text-sm">Credits are automatically added to your account within 24 hours</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-yellow-900/20 border border-yellow-600 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-yellow-200 mb-2">Terms & Conditions</h3>
                            <ul className="text-yellow-100 text-sm space-y-1">
                                <li>• Free credits are available for new Codemurf IDE accounts only</li>
                                <li>• Credits expire 90 days after activation</li>
                                <li>• One free credit package per user/organization</li>
                                <li>• Credits cannot be transferred or refunded</li>
                                <li>• Additional usage will be charged at standard rates</li>
                            </ul>
                        </div>
                    </div>
                );

            case 'ai-assistance':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">AI Code Assistant</h1>
                            <p className="text-gray-300 text-lg mb-8">Experience the power of AI-driven development with Codemurf IDE's intelligent coding assistant.</p>
                        </div>

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-xl p-6 mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <SparklesIcon className="w-8 h-8 text-blue-400" />
                                <h2 className="text-2xl font-semibold text-white">Intelligent Code Generation</h2>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Our AI assistant understands context, patterns, and best practices to generate high-quality code in real-time.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <h4 className="text-white font-semibold mb-2">Supported Languages:</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• JavaScript/TypeScript</li>
                                        <li>• Python</li>
                                        <li>• Java</li>
                                        <li>• C/C++</li>
                                        <li>• Go</li>
                                        <li>• Rust</li>
                                        <li>• PHP</li>
                                        <li>• Ruby</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-white font-semibold mb-2">AI Capabilities:</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Context-aware completions</li>
                                        <li>• Function generation</li>
                                        <li>• Bug detection & fixes</li>
                                        <li>• Code optimization</li>
                                        <li>• Documentation generation</li>
                                        <li>• Unit test creation</li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Using the AI Assistant</h2>
                            <div className="space-y-6">
                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">1. Inline Code Completion</h3>
                                    <p className="text-gray-300 mb-2">Get intelligent suggestions as you type:</p>
                                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                        <code className="text-green-400 text-sm">
                      // Type: "function calculateTax"<br />
                      // AI suggests: function calculateTax(amount, rate) {'{'}<br />
                      //   return amount * (rate / 100);<br />
                      // {'}'}
                                        </code>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">2. Chat-based Assistance</h3>
                                    <p className="text-gray-300 mb-2">Ask questions and get explanations:</p>
                                    <div className="bg-gray-900/50 border border-gray-600 rounded-lg p-4">
                                        <div className="space-y-2">
                                            <div className="text-blue-400">You: "How do I optimize this React component?"</div>
                                            <div className="text-green-400">AI: "I'll help you optimize this component by implementing useMemo, useCallback, and React.memo..."</div>
                                        </div>
                                    </div>
                                </div>

                                <div>
                                    <h3 className="text-xl font-semibold text-white mb-2">3. Code Actions</h3>
                                    <p className="text-gray-300 mb-2">Right-click on code to access AI-powered actions:</p>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">🔧 Refactor Code</h4>
                                            <p className="text-gray-300 text-sm">Improve code structure and performance</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">📝 Generate Docs</h4>
                                            <p className="text-gray-300 text-sm">Create comprehensive documentation</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">🧪 Create Tests</h4>
                                            <p className="text-gray-300 text-sm">Generate unit and integration tests</p>
                                        </div>
                                        <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                            <h4 className="text-white font-semibold mb-2">🐛 Fix Bugs</h4>
                                            <p className="text-gray-300 text-sm">Identify and suggest bug fixes</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ); case 'troubleshooting':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Troubleshooting</h1>
                            <p className="text-gray-300 text-lg mb-8">Common issues and solutions for Codemurf IDE.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Installation Issues</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">❌ "Installation Failed" Error</h4>
                                        <p className="text-gray-300 text-sm mb-2">If installation fails, try these steps:</p>
                                        <ol className="text-gray-300 text-sm space-y-1 ml-4">
                                            <li>1. Run installer as Administrator (Windows)</li>
                                            <li>2. Check available disk space (minimum 2GB required)</li>
                                            <li>3. Temporarily disable antivirus software</li>
                                            <li>4. Clear temporary files and retry</li>
                                        </ol>
                                    </div>

                                    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">❌ "Cannot Connect to Server" During Setup</h4>
                                        <p className="text-gray-300 text-sm mb-2">Network connectivity issues:</p>
                                        <ol className="text-gray-300 text-sm space-y-1 ml-4">
                                            <li>1. Check your internet connection</li>
                                            <li>2. Configure proxy settings if behind corporate firewall</li>
                                            <li>3. Try using mobile hotspot temporarily</li>
                                            <li>4. Contact IT department for firewall whitelist</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">AI Assistant Issues</h2>
                                <div className="space-y-4">
                                    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">❌ AI Suggestions Not Working</h4>
                                        <p className="text-gray-300 text-sm mb-2">If AI completions aren't appearing:</p>
                                        <ol className="text-gray-300 text-sm space-y-1 ml-4">
                                            <li>1. Check AI Assistant is enabled in Settings</li>
                                            <li>2. Verify your API key is valid</li>
                                            <li>3. Check internet connectivity</li>
                                            <li>4. Restart Codemurf IDE</li>
                                            <li>5. Clear AI cache in Settings → AI → Clear Cache</li>
                                        </ol>
                                    </div>

                                    <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                        <h4 className="text-white font-semibold mb-2">❌ "API Rate Limit Exceeded"</h4>
                                        <p className="text-gray-300 text-sm mb-2">When you've used up your API quota:</p>
                                        <ol className="text-gray-300 text-sm space-y-1 ml-4">
                                            <li>1. Wait for quota reset (usually 1 hour)</li>
                                            <li>2. Upgrade to a paid plan for higher limits</li>
                                            <li>3. Use different AI model with lower cost</li>
                                            <li>4. Enable AI request throttling in settings</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-blue-900/20 border border-blue-600 rounded-xl p-6">
                                <h3 className="text-lg font-semibold text-blue-200 mb-2">Need More Help?</h3>
                                <p className="text-blue-100 text-sm mb-4">
                                    If you're still experiencing issues, here are additional resources:
                                </p>
                                <div className="flex flex-wrap gap-3">
                                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                        Contact Support
                                    </button>
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                        Community Forum
                                    </button>
                                    <button className="bg-gray-700 hover:bg-gray-600 text-white px-4 py-2 rounded-lg text-sm transition-colors">
                                        GitHub Issues
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'first-project':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Your First Project</h1>
                            <p className="text-gray-300 text-lg mb-8">Create your first project with Codemurf IDE's powerful AI-assisted development.</p>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Project Creation Wizard</h2>
                            <p className="text-gray-300 mb-4">Codemurf IDE offers intelligent project templates for popular frameworks:</p>

                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">🚀 Next.js</h4>
                                    <p className="text-gray-300 text-sm">Full-stack React framework with TypeScript</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">⚛️ React</h4>
                                    <p className="text-gray-300 text-sm">Modern React app with Vite and TypeScript</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">🐍 Python</h4>
                                    <p className="text-gray-300 text-sm">FastAPI or Django project with virtual environment</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">🟢 Node.js</h4>
                                    <p className="text-gray-300 text-sm">Express.js API with TypeScript and ESLint</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">🦄 Vue.js</h4>
                                    <p className="text-gray-300 text-sm">Vue 3 with Composition API and Pinia</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4 hover:bg-gray-700/50 transition-colors cursor-pointer">
                                    <h4 className="text-white font-semibold mb-2">📱 Flutter</h4>
                                    <p className="text-gray-300 text-sm">Cross-platform mobile app with Dart</p>
                                </div>
                            </div>

                            <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-colors">
                                Start New Project
                            </button>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">AI-Powered Development</h2>
                            <p className="text-gray-300 mb-4">Experience the power of AI assistance from day one:</p>

                            <div className="space-y-4">
                                <div className="flex items-start space-x-3">
                                    <SparklesIcon className="w-6 h-6 text-blue-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Smart Code Completion</h4>
                                        <p className="text-gray-300 text-sm">AI suggests entire functions, classes, and code blocks as you type</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <SparklesIcon className="w-6 h-6 text-green-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Intelligent Error Detection</h4>
                                        <p className="text-gray-300 text-sm">Catch bugs before they happen with AI-powered code analysis</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <SparklesIcon className="w-6 h-6 text-purple-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Automated Documentation</h4>
                                        <p className="text-gray-300 text-sm">Generate comprehensive docs and comments automatically</p>
                                    </div>
                                </div>
                                <div className="flex items-start space-x-3">
                                    <SparklesIcon className="w-6 h-6 text-orange-400 mt-1" />
                                    <div>
                                        <h4 className="text-white font-semibold">Code Refactoring</h4>
                                        <p className="text-gray-300 text-sm">Improve code quality with AI-suggested optimizations</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'smart-completion':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Smart Code Completion</h1>
                            <p className="text-gray-300 text-lg mb-8">Experience intelligent, context-aware code completions that understand your project.</p>
                        </div>

                        <div className="bg-gradient-to-r from-green-900/20 to-blue-900/20 border border-green-600 rounded-xl p-6 mb-8">
                            <div className="flex items-center space-x-3 mb-4">
                                <SparklesIcon className="w-8 h-8 text-green-400" />
                                <h2 className="text-2xl font-semibold text-white">Intelligent Completions</h2>
                            </div>
                            <p className="text-gray-300 mb-4">
                                Codemurf IDE's smart completion goes beyond simple word matching - it understands context, patterns, and intent.
                            </p>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">🧠 Context-Aware</h4>
                                    <p className="text-gray-300 text-sm">Suggests based on surrounding code, project structure, and imports</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">⚡ Real-time</h4>
                                    <p className="text-gray-300 text-sm">Instant suggestions as you type with minimal latency</p>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">🎯 Precise</h4>
                                    <p className="text-gray-300 text-sm">High accuracy with personalized suggestions based on your code style</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Completion Types</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Code Elements</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-blue-400 rounded-full mr-3"></span>
                                            Variables and constants
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-green-400 rounded-full mr-3"></span>
                                            Functions and methods
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-purple-400 rounded-full mr-3"></span>
                                            Classes and interfaces
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-orange-400 rounded-full mr-3"></span>
                                            Import statements
                                        </li>
                                    </ul>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Smart Features</h3>
                                    <ul className="space-y-2">
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-red-400 rounded-full mr-3"></span>
                                            Whole line completions
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-yellow-400 rounded-full mr-3"></span>
                                            Multi-line code blocks
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-cyan-400 rounded-full mr-3"></span>
                                            Documentation strings
                                        </li>
                                        <li className="flex items-center text-gray-300 text-sm">
                                            <span className="w-2 h-2 bg-pink-400 rounded-full mr-3"></span>
                                            Error corrections
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Keyboard Shortcuts</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Completion Controls</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Trigger completion</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl+Space</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Accept suggestion</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Tab / Enter</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Next suggestion</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">↓</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-300 text-sm">Previous suggestion</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">↑</kbd>
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white mb-3">Advanced Features</h3>
                                    <div className="space-y-2">
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Force AI completion</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl+Alt+Space</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Show documentation</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl+I</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                            <span className="text-gray-300 text-sm">Toggle suggestions</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Ctrl+Shift+Space</kbd>
                                        </div>
                                        <div className="flex justify-between items-center py-2">
                                            <span className="text-gray-300 text-sm">Dismiss suggestions</span>
                                            <kbd className="bg-gray-700 px-2 py-1 rounded text-xs text-gray-300">Esc</kbd>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                            <h2 className="text-2xl font-semibold text-white mb-4">Customization Options</h2>
                            <p className="text-gray-300 mb-4">Tailor the completion experience to your preferences:</p>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">Behavior Settings</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Auto-completion delay</li>
                                        <li>• Suggestion ranking preferences</li>
                                        <li>• Maximum suggestions shown</li>
                                        <li>• Case sensitivity options</li>
                                    </ul>
                                </div>
                                <div className="bg-gray-700/30 border border-gray-600 rounded-lg p-4">
                                    <h4 className="text-white font-semibold mb-2">AI Model Selection</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Fast models for instant completions</li>
                                        <li>• Premium models for complex suggestions</li>
                                        <li>• Hybrid mode for balanced performance</li>
                                        <li>• Custom model configurations</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            case 'shortcuts':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Keyboard Shortcuts</h1>
                            <p className="text-gray-300 text-lg mb-8">Master Codemurf IDE with these essential keyboard shortcuts for faster development.</p>
                        </div>

                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Essential Shortcuts</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Command Palette</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+P</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Quick Open File</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+P</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Save File</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+S</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Save All</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+K S</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Close File</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+W</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-300">New File</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+N</kbd>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">AI Assistant</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Open AI Chat</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+A</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Trigger Completion</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Space</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Generate Code</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+G</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Explain Code</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+E</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Fix Code</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+F</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-300">Refactor Code</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+R</kbd>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">Navigation</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Go to Definition</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">F12</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Go to Symbol</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+O</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Go to Line</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+G</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Go Back</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Alt+←</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Go Forward</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Alt+→</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-300">Peek Definition</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Alt+F12</kbd>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-4">API Testing</h2>
                                <div className="space-y-3">
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Open Requesty Panel</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+R</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">New API Request</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Alt+N</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Send Request</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Enter</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Save Request</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Alt+S</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2 border-b border-gray-700">
                                        <span className="text-gray-300">Toggle Environment</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+Env</kbd>
                                    </div>
                                    <div className="flex justify-between items-center py-2">
                                        <span className="text-gray-300">Run Test Suite</span>
                                        <kbd className="bg-gray-700 px-3 py-1 rounded text-sm text-gray-300">Ctrl+Shift+T</kbd>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-900/20 border border-blue-600 rounded-xl p-6">
                            <h3 className="text-lg font-semibold text-blue-200 mb-2">💡 Pro Tips</h3>
                            <ul className="text-blue-100 text-sm space-y-1">
                                <li>• Customize shortcuts in Settings → Keyboard Shortcuts</li>
                                <li>• Use Ctrl+K Ctrl+S to open the shortcuts editor</li>
                                <li>• Create custom key bindings for frequently used commands</li>
                                <li>• Import shortcuts from VS Code, Sublime, or other editors</li>
                            </ul>
                        </div>
                    </div>
                );

            case 'faq':
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Frequently Asked Questions</h1>
                            <p className="text-gray-300 text-lg mb-8">Find answers to common questions about Codemurf IDE.</p>
                        </div>

                        <div className="space-y-6">
                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-6">General Questions</h2>
                                <div className="space-y-4">
                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            What makes Codemurf IDE different from other code editors?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Codemurf IDE is built AI-first with integrated API testing (Requesty), access to 400+ AI models (OpenRouter),
                                                and intelligent code assistance. Unlike other editors, we provide a complete development ecosystem with built-in
                                                collaboration tools, free credits for premium features, and seamless integration with modern development workflows.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Is Codemurf IDE free to use?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Yes! Codemurf IDE is free to download and use. We also provide $15 in free credits ($5 for Requesty API testing + $10 for OpenRouter AI models)
                                                for new users. Additional premium features and higher usage limits are available with paid plans starting at $9/month.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Can I import my existing VS Code settings and extensions?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Absolutely! Codemurf IDE supports importing settings, themes, keybindings, and compatible extensions from VS Code,
                                                Cursor, and other popular editors. Use the import wizard during setup or access it later via Settings → Import Configuration.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-6">AI Features</h2>
                                <div className="space-y-4">
                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            How accurate are the AI code suggestions?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Our AI achieves 85-90% accuracy for code completions by using context from your entire project, understanding patterns,
                                                and leveraging multiple state-of-the-art models. The accuracy improves as the AI learns your coding style and project patterns.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Which AI models can I use with my free credits?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Your $10 OpenRouter credit gives you access to all 400+ models including GPT-4, Claude 3.5 Sonnet, Gemini Pro,
                                                Llama 3, and more. Fast models like Llama 3.2 3B cost ~$0.001 per request, while premium models like GPT-4 cost ~$0.05 per request.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Does the AI send my code to external servers?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Only the code context you're actively working on is sent for AI suggestions. We use encrypted connections,
                                                don't store your code permanently, and you can configure privacy settings to limit what data is shared.
                                                Enterprise users get on-premise AI options for maximum security.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-6">Integrations & API Testing</h2>
                                <div className="space-y-4">
                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            How does the built-in API testing compare to Postman?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Our Requesty integration offers similar functionality to Postman but with deeper IDE integration.
                                                You can test APIs directly from your code, generate requests from your API definitions,
                                                and create mock servers without leaving the editor. The $5 free credits cover 1,000+ API requests.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Can I use my own API keys for AI models?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Yes! You can configure your own OpenAI, Anthropic, Google, or other provider API keys in Settings → AI → API Keys.
                                                This bypasses our credit system and bills directly to your account with those providers.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            What happens when I run out of free credits?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                When free credits are exhausted, you can: 1) Purchase additional credits, 2) Upgrade to a paid plan with monthly credits,
                                                3) Use your own API keys, or 4) Continue using the IDE with basic features (syntax highlighting, debugging, etc.) for free.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </div>

                            <div className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6">
                                <h2 className="text-2xl font-semibold text-white mb-6">Technical Support</h2>
                                <div className="space-y-4">
                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Which programming languages are supported?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Codemurf IDE supports 50+ programming languages with first-class support for JavaScript/TypeScript, Python, Java,
                                                C/C++, Go, Rust, PHP, Ruby, Swift, Kotlin, and more. AI assistance quality is best for popular languages.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            Can I use Codemurf IDE offline?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Core IDE features (editing, debugging, syntax highlighting) work offline. AI features, API testing,
                                                and cloud sync require internet connection. We're working on offline AI capabilities for future releases.
                                            </p>
                                        </div>
                                    </details>

                                    <details className="bg-gray-700/30 border border-gray-600 rounded-lg">
                                        <summary className="p-4 cursor-pointer text-white font-semibold hover:bg-gray-700/50">
                                            How do I report bugs or request features?
                                        </summary>
                                        <div className="p-4 pt-0">
                                            <p className="text-gray-300 text-sm">
                                                Use Help → Report Issue in the IDE, visit our GitHub repository, or contact support@Codemurf.dev.
                                                For feature requests, use our community forum where you can vote on proposals and discuss with other users.
                                            </p>
                                        </div>
                                    </details>
                                </div>
                            </div>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="space-y-8">
                        <div>
                            <h1 className="text-4xl font-bold text-white mb-4">Getting Started with Codemurf IDE</h1>              <p className="text-gray-300 text-lg mb-8">
                                Welcome to Codemurf IDE - the next-generation development environment powered by AI.
                                Get productive faster with intelligent code assistance, integrated API testing, and seamless collaboration tools.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer"
                                onClick={() => setActiveSection('installation')}
                            >
                                <RocketLaunchIcon className="w-12 h-12 text-blue-400 mb-4" />                <h3 className="text-xl font-semibold text-white mb-2">Quick Installation</h3>
                                <p className="text-gray-300 text-sm mb-4">Get Codemurf IDE up and running in minutes across Windows, macOS, and Linux.</p>
                                <span className="text-blue-400 text-sm font-medium">Start Installation →</span>
                            </div>

                            <div
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer"
                                onClick={() => setActiveSection('first-project')}
                            >
                                <CodeBracketIcon className="w-12 h-12 text-green-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Create Your First Project</h3>
                                <p className="text-gray-300 text-sm mb-4">Build your first app with AI-powered project templates and smart assistance.</p>
                                <span className="text-green-400 text-sm font-medium">Start Building →</span>
                            </div>

                            <div
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer"
                                onClick={() => setActiveSection('free-credits')}
                            >
                                <CreditCardIcon className="w-12 h-12 text-purple-400 mb-4" />
                                <h3 className="text-xl font-semibold text-white mb-2">Free Credits Program</h3>
                                <p className="text-gray-300 text-sm mb-4">Get $15 in free credits for API testing and premium AI models.</p>
                                <span className="text-purple-400 text-sm font-medium">Claim Credits →</span>
                            </div>

                            <div
                                className="bg-gray-800/50 backdrop-blur-sm border border-gray-700 rounded-xl p-6 hover:bg-gray-800/70 transition-colors cursor-pointer"
                                onClick={() => setActiveSection('setup')}
                            >
                                <CogIcon className="w-12 h-12 text-orange-400 mb-4" />                <h3 className="text-xl font-semibold text-white mb-2">Configure IDE</h3>
                                <p className="text-gray-300 text-sm mb-4">Customize Codemurf IDE with themes, extensions, and integrations.</p>
                                <span className="text-orange-400 text-sm font-medium">Setup Guide →</span>
                            </div>
                        </div>

                        <div className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border border-blue-600 rounded-xl p-8">
                            <h2 className="text-2xl font-semibold text-white mb-4">🚀 What Makes Codemurf IDE Special?</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">AI-First Development</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Intelligent code completion and generation</li>
                                        <li>• Automated bug detection and fixing</li>
                                        <li>• Smart refactoring suggestions</li>
                                        <li>• Natural language to code conversion</li>
                                    </ul>
                                </div>
                                <div>
                                    <h4 className="text-lg font-semibold text-white mb-2">Integrated Toolchain</h4>
                                    <ul className="text-gray-300 text-sm space-y-1">
                                        <li>• Built-in API testing with Requesty</li>
                                        <li>• Access to 400+ AI models via OpenRouter</li>
                                        <li>• Real-time collaboration features</li>
                                        <li>• Cloud sync and backup</li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                );
        }
    }; return (
        <div className="min-h-screen bg-[linear-gradient(180deg,_#040406_50%,_#09080D_100%)] text-white">
            {/* Navbar Spacer */}
            <div className="h-16 w-full"></div>
            <div className="flex">
                {/* Sidebar */}        <div className="w-80 bg-gray-900/50 backdrop-blur-sm border-r border-gray-700 min-h-screen sticky top-16">          <div className="p-6 pt-8 border-b border-gray-700">              <h1 className="text-2xl font-bold text-white flex items-center">
                    <BookOpenIcon className="w-8 h-8 mr-3 text-blue-400" />
                    Codemurf Docs
                </h1>
                </div>
                    <nav className="p-4">
                        {sidebarSections.map((section) => (
                            <div key={section.id} className="mb-4">
                                <button
                                    className="flex items-center justify-between w-full text-left p-3 rounded-lg hover:bg-gray-800/50 transition-colors"
                                    onClick={() => toggleSection(section.id)}
                                >
                                    <div className="flex items-center">
                                        <section.icon className="w-5 h-5 mr-3 text-gray-400" />
                                        <span className="text-white font-medium">{section.title}</span>
                                    </div>
                                    {openSections[section.id] ? (
                                        <ChevronDownIcon className="w-4 h-4 text-gray-400" />
                                    ) : (
                                        <ChevronRightIcon className="w-4 h-4 text-gray-400" />
                                    )}
                                </button>                {openSections[section.id] && (
                                    <div className="ml-4 mt-2 space-y-1">
                                        {section.items.map((item) => (
                                            <button
                                                key={item.id}
                                                className={`flex items-center w-full text-left p-3 rounded-lg text-sm transition-colors ${activeSection === item.id
                                                        ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30'
                                                        : 'text-gray-300 hover:text-white hover:bg-gray-800/50'
                                                    }`}
                                                onClick={() => setActiveSection(item.id)}
                                            >
                                                <span className="w-2 h-2 bg-gray-500 rounded-full mr-3 flex-shrink-0"></span>
                                                {item.title}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                    </nav>
                </div>        {/* Main Content */}
                <div className="flex-1 p-8 pt-8 max-w-4xl">
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default DocsPage;

