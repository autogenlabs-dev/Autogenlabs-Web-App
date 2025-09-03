'use client';
import { useState, useEffect } from 'react';
import { Save } from 'lucide-react';
import { useTemplate } from '../contexts/TemplateContext';

const TemplateForm = ({ template = null, onSubmit, onCancel, isEditing = false }) => {
    const { categories, loading } = useTemplate();
    
    const [formData, setFormData] = useState({
        title: '',
        category: '',
        type: 'React',
        language: 'JavaScript',
        difficulty_level: 'Easy',
        plan_type: 'Free',
        short_description: '',
        full_description: '',
        preview_images: [],
        git_repo_url: '',
        live_demo_url: '',
        dependencies: [],
        tags: [],
        developer_name: '',
        developer_experience: '',
        is_available_for_dev: true,
        featured: false,
        popular: false,
        code: '',
        readme_content: ''
    });

    const [imageInput, setImageInput] = useState('');
    const [dependencyInput, setDependencyInput] = useState('');
    const [tagInput, setTagInput] = useState('');
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Component types and other options
    const componentTypes = ['React', 'Vue', 'Angular', 'HTML/CSS', 'Svelte', 'Flutter'];
    const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'C++', 'Go', 'Rust'];
    const difficultyLevels = ['Easy', 'Medium', 'Tough'];
    const planTypes = ['Free']; // Only Free templates allowed
    const experienceLevels = ['1+ years', '2+ years', '3+ years', '4+ years', '5+ years', '6+ years', '7+ years', '8+ years', '9+ years', '10+ years'];

    // Initialize form with template data if editing
    useEffect(() => {
        if (template && isEditing) {
            setFormData({
                title: template.title || '',
                category: template.category || '',
                type: template.type || 'React',
                language: template.language || 'JavaScript',
                difficulty_level: template.difficultyLevel || 'Easy',
                plan_type: template.planType || 'Free',
                short_description: template.shortDescription || '',
                full_description: template.fullDescription || '',
                preview_images: template.previewImages || [],
                git_repo_url: template.gitRepoUrl || '',
                live_demo_url: template.liveDemoUrl || '',
                dependencies: template.dependencies || [],
                tags: template.tags || [],
                developer_name: template.developerName || '',
                developer_experience: template.developerExperience || '',
                is_available_for_dev: template.isAvailableForDev !== undefined ? template.isAvailableForDev : true,
                featured: template.featured || false,
                popular: template.popular || false,
                code: template.code || '',
                readme_content: template.readmeContent || ''
            });
        }
    }, [template, isEditing]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : type === 'number' ? Number(value) : value
        }));
        
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    const addItem = (listName, input, setInput) => {
        const value = input.trim();
        if (value && !formData[listName].includes(value)) {
            setFormData(prev => ({
                ...prev,
                [listName]: [...prev[listName], value]
            }));
            setInput('');
        }
    };

    const removeItem = (listName, index) => {
        setFormData(prev => ({
            ...prev,
            [listName]: prev[listName].filter((_, i) => i !== index)
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) newErrors.title = 'Title is required';
        if (!formData.category) newErrors.category = 'Category is required';
        if (!formData.short_description.trim()) newErrors.short_description = 'Short description is required';
        if (!formData.full_description.trim()) newErrors.full_description = 'Full description is required';
        if (!formData.developer_name.trim()) newErrors.developer_name = 'Developer name is required';
        if (!formData.developer_experience) newErrors.developer_experience = 'Developer experience is required';

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);
        try {
            await onSubmit(formData);
        } catch (error) {
            console.error('Error submitting template:', error);
        } finally {
            setIsSubmitting(false);
        }
    };

    const defaultCategories = [
        'Navigation', 'Layout', 'Forms', 'Data Display', 
        'User Interface', 'Content', 'Media', 'Interactive', 
        'Widgets', 'Sections'
    ];

    const categoryOptions = categories.length > 0 ? categories : defaultCategories;

    const inputClassName = (error) => `w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 border-gray-600 text-white placeholder-gray-400 ${error ? 'border-red-500' : 'border-gray-600'}`;
    const selectClassName = `w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 border-gray-600 text-white`;
    const textareaClassName = (error) => `w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 border-gray-600 text-white placeholder-gray-400 resize-none ${error ? 'border-red-500' : 'border-gray-600'}`;
    const labelClassName = "block text-sm font-medium text-gray-300 mb-2";

    return (
        <div className="p-6">
            <form onSubmit={handleSubmit} className="space-y-6">
                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className={labelClassName}>
                            Title *
                        </label>
                        <input
                            type="text"
                            name="title"
                            value={formData.title}
                            onChange={handleInputChange}
                            className={inputClassName(errors.title)}
                            placeholder="Enter template title"
                        />
                        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
                    </div>

                    <div>
                        <label className={labelClassName}>
                            Category *
                        </label>
                        <select
                            name="category"
                            value={formData.category}
                            onChange={handleInputChange}
                            className={`${selectClassName} ${errors.category ? 'border-red-500' : ''}`}
                        >
                            <option value="">Select a category</option>
                            {categoryOptions.map((cat) => (
                                <option key={typeof cat === 'string' ? cat : cat.name} value={typeof cat === 'string' ? cat : cat.name}>
                                    {typeof cat === 'string' ? cat : cat.display_name || cat.name}
                                </option>
                            ))}
                        </select>
                        {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                            Type
                        </label>
                        <select
                            name="type"
                            value={formData.type}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:border-purple-500 bg-gray-800 border-gray-600 text-white"
                        >
                            {componentTypes.map(type => (
                                <option key={type} value={type}>{type}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Language
                        </label>
                        <select
                            name="language"
                            value={formData.language}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            {languages.map(lang => (
                                <option key={lang} value={lang}>{lang}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Difficulty Level
                        </label>
                        <select
                            name="difficulty_level"
                            value={formData.difficulty_level}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                        >
                            {difficultyLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                    </div>

                    {/* Hidden Plan Type - Always Free */}
                    <input type="hidden" name="plan_type" value="Free" />
                </div>

                {/* Descriptions */}
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Short Description *
                    </label>
                    <input
                        type="text"
                        name="short_description"
                        value={formData.short_description}
                        onChange={handleInputChange}
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                            errors.short_description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Brief description of the template"
                    />
                    {errors.short_description && <p className="text-red-500 text-sm mt-1">{errors.short_description}</p>}
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Description *
                    </label>
                    <textarea
                        name="full_description"
                        value={formData.full_description}
                        onChange={handleInputChange}
                        rows="4"
                        className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                            errors.full_description ? 'border-red-500' : 'border-gray-300'
                        }`}
                        placeholder="Detailed description of the template, its features, and use cases"
                    />
                    {errors.full_description && <p className="text-red-500 text-sm mt-1">{errors.full_description}</p>}
                </div>

                {/* URLs */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Git Repository URL
                        </label>
                        <input
                            type="url"
                            name="git_repo_url"
                            value={formData.git_repo_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            placeholder="https://github.com/username/repo"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Live Demo URL
                        </label>
                        <input
                            type="url"
                            name="live_demo_url"
                            value={formData.live_demo_url}
                            onChange={handleInputChange}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            placeholder="https://example.com/demo"
                        />
                    </div>
                </div>

                {/* Developer Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Developer Name *
                        </label>
                        <input
                            type="text"
                            name="developer_name"
                            value={formData.developer_name}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                                errors.developer_name ? 'border-red-500' : 'border-gray-300'
                            }`}
                            placeholder="Your name"
                        />
                        {errors.developer_name && <p className="text-red-500 text-sm mt-1">{errors.developer_name}</p>}
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Developer Experience *
                        </label>
                        <select
                            name="developer_experience"
                            value={formData.developer_experience}
                            onChange={handleInputChange}
                            className={`w-full px-3 py-2 border rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white ${
                                errors.developer_experience ? 'border-red-500' : 'border-gray-300'
                            }`}
                        >
                            <option value="">Select experience level</option>
                            {experienceLevels.map(level => (
                                <option key={level} value={level}>{level}</option>
                            ))}
                        </select>
                        {errors.developer_experience && <p className="text-red-500 text-sm mt-1">{errors.developer_experience}</p>}
                    </div>
                </div>

                {/* Lists (Images, Dependencies, Tags) */}
                <div className="space-y-4">
                    {/* Preview Images */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Preview Images
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={imageInput}
                                onChange={(e) => setImageInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Enter image URL"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('preview_images', imageInput, setImageInput)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.preview_images.map((image, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-md text-sm"
                                >
                                    {image}
                                    <button
                                        type="button"
                                        onClick={() => removeItem('preview_images', index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Dependencies */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Dependencies
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={dependencyInput}
                                onChange={(e) => setDependencyInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Enter dependency name"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('dependencies', dependencyInput, setDependencyInput)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.dependencies.map((dep, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-md text-sm"
                                >
                                    {dep}
                                    <button
                                        type="button"
                                        onClick={() => removeItem('dependencies', index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Tags */}
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Tags
                        </label>
                        <div className="flex gap-2 mb-2">
                            <input
                                type="text"
                                value={tagInput}
                                onChange={(e) => setTagInput(e.target.value)}
                                className="flex-1 px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                                placeholder="Enter tag"
                            />
                            <button
                                type="button"
                                onClick={() => addItem('tags', tagInput, setTagInput)}
                                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:ring-2 focus:ring-blue-500"
                            >
                                Add
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {formData.tags.map((tag, index) => (
                                <span
                                    key={index}
                                    className="inline-flex items-center px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 rounded-md text-sm"
                                >
                                    {tag}
                                    <button
                                        type="button"
                                        onClick={() => removeItem('tags', index)}
                                        className="ml-2 text-red-500 hover:text-red-700"
                                    >
                                        ×
                                    </button>
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Code and README */}
                <div className="grid grid-cols-1 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            Code Content
                        </label>
                        <textarea
                            name="code"
                            value={formData.code}
                            onChange={handleInputChange}
                            rows="8"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white font-mono text-sm"
                            placeholder="Paste your template code here..."
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                            README Content
                        </label>
                        <textarea
                            name="readme_content"
                            value={formData.readme_content}
                            onChange={handleInputChange}
                            rows="6"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
                            placeholder="Documentation and usage instructions..."
                        />
                    </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-3">
                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="is_available_for_dev"
                            checked={formData.is_available_for_dev}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Available for development services</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="featured"
                            checked={formData.featured}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Featured template</span>
                    </label>

                    <label className="flex items-center">
                        <input
                            type="checkbox"
                            name="popular"
                            checked={formData.popular}
                            onChange={handleInputChange}
                            className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <span className="text-sm text-gray-700 dark:text-gray-300">Popular template</span>
                    </label>
                </div>

                {/* Submit Buttons */}
                <div className="flex justify-end space-x-4 pt-6 border-t border-gray-800 bg-gray-900/95 backdrop-blur-sm sticky bottom-0 -mx-6 px-6 py-4">
                    <button
                        type="button"
                        onClick={onCancel}
                        className="px-6 py-2 border border-gray-600 text-gray-300 rounded-md hover:bg-gray-800 hover:border-gray-500 focus:ring-2 focus:ring-purple-500 transition-all"
                        disabled={isSubmitting}
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={isSubmitting || loading}
                        className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-md focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center gap-2"
                    >
                        {isSubmitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                                {isEditing ? 'Updating...' : 'Creating...'}
                            </>
                        ) : (
                            <>
                                <Save size={16} />
                                {isEditing ? 'Update Template' : 'Create Template'}
                            </>
                        )}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TemplateForm;
