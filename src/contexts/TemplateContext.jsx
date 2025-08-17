'use client';
import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import { templateApi } from '@/lib/apiTemplates';
import { useAuth } from './AuthContext';

const TemplateContext = createContext();

export const useTemplate = () => {
  const context = useContext(TemplateContext);
  if (!context) {
    throw new Error('useTemplate must be used within a TemplateProvider');
  }
  return context;
};

export const TemplateProvider = ({ children }) => {
  const { user, isAuthenticated } = useAuth();
  const [templates, setTemplates] = useState([]);
  const [myTemplates, setMyTemplates] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);
  const [stats, setStats] = useState(null);
  const [filters, setFilters] = useState({
    category: '',
    plan_type: '',
    difficulty_level: '',
    search: ''
    // Don't include featured: null - only set it when needed
  });

  // Use ref to access current filters without causing re-renders
  const filtersRef = useRef(filters);
  
  // Update ref whenever filters change
  useEffect(() => {
    filtersRef.current = filters;
  }, [filters]);

  // Load all templates
  const loadTemplates = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use current filters from ref to avoid stale closure
      const currentFilters = filtersRef.current;
      const mergedParams = { ...currentFilters, ...params };
      
      // Filter out null, undefined, and empty string values
      const cleanedParams = Object.entries(mergedParams).reduce((acc, [key, value]) => {
        if (value !== null && value !== undefined && value !== '') {
          acc[key] = value;
        }
        return acc;
      }, {});
      
      const response = await templateApi.getAllTemplates(cleanedParams);
      
      setTemplates(response.templates || []);
      return response;
    } catch (err) {
      const errorMessage = err.message || 'Failed to load templates';
      setError(errorMessage);
      setTemplates([]); // Clear templates on error
      return { templates: [] };
    } finally {
      setLoading(false);
    }
  }, []); // No dependencies to prevent infinite loop

  // Load user's templates
  const loadMyTemplates = useCallback(async (params = {}) => {
    if (!isAuthenticated) return;
    
    try {
      setLoading(true);
      setError(null);
      
      const response = await templateApi.getMyTemplates(params);
      setMyTemplates(response.templates || []);
      return response;
    } catch (err) {
      console.error('Error loading my templates:', err);
      setError(err.message || 'Failed to load your templates');
      return { templates: [] };
    } finally {
      setLoading(false);
    }
  }, [isAuthenticated]);

  // Create a new template
  const createTemplate = async (templateData) => {
    
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await templateApi.createTemplate(templateData);  // Fixed: removed accessToken parameter
      
      // Add to myTemplates if successful
      if (response) {
        setMyTemplates(prev => [response, ...prev]);
        // Also refresh all templates
        await loadTemplates();
      }
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to create template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Update a template
  const updateTemplate = async (templateId, templateData) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      setError(null);
      
      const response = await templateApi.updateTemplate(templateId, templateData);
      
      // Update in both templates and myTemplates
      setTemplates(prev => prev.map(t => t.id === templateId ? response : t));
      setMyTemplates(prev => prev.map(t => t.id === templateId ? response : t));
      
      return response;
    } catch (err) {
      console.error('Error updating template:', err);
      setError(err.message || 'Failed to update template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Delete a template
  const deleteTemplate = async (templateId) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      setLoading(true);
      setError(null);
      
      await templateApi.deleteTemplate(templateId);
      
      // Remove from both templates and myTemplates
      setTemplates(prev => prev.filter(t => t.id !== templateId));
      setMyTemplates(prev => prev.filter(t => t.id !== templateId));
      
      return true;
    } catch (err) {
      console.error('Error deleting template:', err);
      setError(err.message || 'Failed to delete template');
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Like/Unlike template
  const toggleTemplateLike = async (templateId) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      const response = await templateApi.toggleLike(templateId);
      
      // Update like count in templates
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, likes: response.total_likes, liked: response.liked }
          : t
      ));
      
      return response;
    } catch (err) {
      console.error('Error toggling like:', err);
      setError(err.message || 'Failed to like template');
      throw err;
    }
  };

  // Download template
  const downloadTemplate = async (templateId) => {
    if (!isAuthenticated) {
      throw new Error('Authentication required');
    }

    try {
      const response = await templateApi.downloadTemplate(templateId);
      
      // Update download count in templates
      setTemplates(prev => prev.map(t => 
        t.id === templateId 
          ? { ...t, downloads: response.total_downloads }
          : t
      ));
      
      return response;
    } catch (err) {
      console.error('Error downloading template:', err);
      setError(err.message || 'Failed to download template');
      throw err;
    }
  };

  // Load categories
  const loadCategories = async () => {
    try {
      const response = await templateApi.getTemplateCategories();
      setCategories(response.categories || []);
      return response.categories;
    } catch (err) {
      console.error('Error loading categories:', err);
      // Return default categories on error
      const defaultCategories = [
        'Navigation',
        'Layout', 
        'Forms',
        'Data Display',
        'User Interface',
        'Content',
        'Media',
        'Interactive',
        'Widgets',
        'Sections'
      ];
      setCategories(defaultCategories);
      return defaultCategories;
    }
  };

  // Load stats
  const loadStats = async () => {
    try {
      const response = await templateApi.getTemplateStats();
      setStats(response);
      return response;
    } catch (err) {
      console.error('Error loading stats:', err);
      return null;
    }
  };

  // Update filters
  const updateFilters = useCallback((newFilters) => {
    setFilters(prev => ({ ...prev, ...newFilters }));
  }, []);

  // Clear filters
  const clearFilters = useCallback(() => {
    setFilters({
      category: '',
      plan_type: '',
      difficulty_level: '',
      search: ''
      // Don't set featured: null
    });
  }, []);

  // Load initial data
  useEffect(() => {
    loadCategories();
    loadStats();
  }, []);

  // Load user templates when user changes
  useEffect(() => {
    if (user && isAuthenticated) {
      loadMyTemplates();
    } else {
      setMyTemplates([]);
    }
  }, [user, isAuthenticated, loadMyTemplates]);

  // Reload templates when filters change
  useEffect(() => {
    loadTemplates();
  }, [filters]);

  // Get template by ID (memoized to prevent unnecessary re-renders)
  const getTemplateById = useCallback(async (templateId) => {
    try {
      // Don't set global loading state for individual template fetches
      setError(null);
      
      const response = await templateApi.getTemplate(templateId);
      
      return response;
    } catch (err) {
      setError(err.message || 'Failed to load template');
      throw err;
    }
  }, []); // Empty dependency array since this function doesn't depend on any state

  const value = {
    // State
    templates,
    myTemplates,
    loading,
    error,
    categories,
    stats,
    filters,
    
    // Actions
    loadTemplates,
    loadMyTemplates,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    toggleTemplateLike,
    downloadTemplate,
    loadCategories,
    loadStats,
    updateFilters,
    clearFilters,
    getTemplateById,
    
    // Helpers
    setError
  };

  return (
    <TemplateContext.Provider value={value}>
      {children}
    </TemplateContext.Provider>
  );
};

export default TemplateProvider;