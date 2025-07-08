'use client';
import React, { useEffect } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';

export default function TemplateTestPage() {
  const { templates, loading, error, loadTemplates } = useTemplate();

  useEffect(() => {
    console.log('Templates:', templates);
    console.log('Loading:', loading);
    console.log('Error:', error);
  }, [templates, loading, error]);

  if (loading) {
    return <div className="p-8 text-white">Loading templates...</div>;
  }

  if (error) {
    return <div className="p-8 text-red-500">Error: {error}</div>;
  }

  return (
    <div className="p-8 text-white">
      <h1 className="text-2xl font-bold mb-4">Template Test</h1>
      <p className="mb-4">Found {templates.length} templates</p>
      
      <div className="space-y-4">
        {templates.map((template) => (
          <div key={template.id} className="bg-gray-800 p-4 rounded-lg">
            <h3 className="font-bold">{template.title}</h3>
            <p className="text-gray-400">{template.short_description || template.shortDescription}</p>
            <div className="flex gap-4 mt-2 text-sm text-gray-500">
              <span>Category: {template.category}</span>
              <span>Type: {template.type}</span>
              <span>Likes: {template.likes}</span>
              <span>Downloads: {template.downloads}</span>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={() => loadTemplates()}
        className="mt-8 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Refresh Templates
      </button>
    </div>
  );
}
