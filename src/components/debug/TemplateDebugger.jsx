'use client';
import React, { useEffect } from 'react';
import { useTemplate } from '@/contexts/TemplateContext';
import { useAuth } from '@/contexts/AuthContext';

const TemplateDebugger = () => {
  const { templates, myTemplates, loading, error } = useTemplate();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    console.log('🔍 Template Debugger - Current State:');
    console.log('  📊 Templates:', templates);
    console.log('  👤 My Templates:', myTemplates);
    console.log('  ⏳ Loading:', loading);
    console.log('  ❌ Error:', error);
    console.log('  🔐 User:', user);
    console.log('  ✅ Authenticated:', isAuthenticated);
  }, [templates, myTemplates, loading, error, user, isAuthenticated]);

  return (
    <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg max-w-sm text-xs z-50">
      <h3 className="font-bold mb-2">Template Debug Info</h3>
      <div className="space-y-1">
        <div>Templates: {templates?.length || 0}</div>
        <div>My Templates: {myTemplates?.length || 0}</div>
        <div>Loading: {loading ? 'Yes' : 'No'}</div>
        <div>Error: {error ? 'Yes' : 'No'}</div>
        <div>Authenticated: {isAuthenticated ? 'Yes' : 'No'}</div>
      </div>
    </div>
  );
};

export default TemplateDebugger;
