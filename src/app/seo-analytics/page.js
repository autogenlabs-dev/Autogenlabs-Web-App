'use client';

import { useState, useEffect } from 'react';

export default function SEOAnalytics() {
  const [keywordData, setKeywordData] = useState(null);
  const [competitorData, setCompetitorData] = useState(null);
  const [backlinksData, setBacklinksData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadSEOData();
  }, []);

  const loadSEOData = async () => {
    try {
      const [keywords, competitors, backlinks] = await Promise.all([
        fetch('/api/seo/keywords').then(r => r.json()),
        fetch('/api/seo/competitors').then(r => r.json()),
        fetch('/api/seo/backlinks').then(r => r.json())
      ]);
      
      setKeywordData(keywords);
      setCompetitorData(competitors);
      setBacklinksData(backlinks);
    } catch (error) {
      console.error('Failed to load SEO data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
          <p>Loading SEO Analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-center">
          CodeMurf SEO Analytics Dashboard
        </h1>
        
        {/* Keywords Section */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🎯 Target Keywords Performance</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {keywordData?.popularKeywords?.map((keyword, index) => (
              <div key={index} className="p-6 border border-gray-700 rounded-lg bg-gray-800">
                <h3 className="font-semibold text-lg mb-2">{keyword}</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Search Volume:</span>
                    <span className="text-green-400">
                      {keyword === 'AI code assistant' ? '9,900' :
                       keyword === 'AI coding tools' ? '2,400' :
                       keyword === 'VS Code extension' ? '1,000' :
                       keyword === 'cursor ai alternative' ? '480' :
                       keyword === 'MCP integration' ? '60' : '100+'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Competition:</span>
                    <span className="text-yellow-400">
                      {keyword.includes('MCP') ? 'Low' : 
                       keyword.includes('cursor') ? 'Medium' : 'Low'}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Trend:</span>
                    <span className="text-green-400">↗ Growing</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Competitor Analysis */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🏆 Competitor Analysis</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-700 rounded-lg bg-gray-800">
              <h3 className="text-xl font-semibold mb-4">Top Competitors</h3>
              <div className="space-y-4">
                {competitorData?.topCompetitors?.map((competitor, index) => (
                  <div key={index} className="flex justify-between items-center p-3 bg-gray-700 rounded">
                    <span className="font-medium">{competitor}</span>
                    <span className="text-sm text-gray-300">#{index + 1}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 rounded-lg bg-gray-800">
              <h3 className="text-xl font-semibold mb-4">Key Opportunities</h3>
              <div className="space-y-3">
                {competitorData?.keyOpportunities?.map((opportunity, index) => (
                  <div key={index} className="flex items-center p-3 bg-green-900/20 rounded border-l-4 border-green-500">
                    <span className="text-green-400 mr-2">✓</span>
                    <span>{opportunity}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Backlink Strategy */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">🔗 Backlink Strategy</h2>
          <div className="grid lg:grid-cols-2 gap-8">
            <div className="p-6 border border-gray-700 rounded-lg bg-gray-800">
              <h3 className="text-xl font-semibold mb-4">Quick Wins</h3>
              <div className="space-y-3">
                {backlinksData?.quickWins?.map((win, index) => (
                  <div key={index} className="flex items-center p-3 bg-blue-900/20 rounded">
                    <span className="text-blue-400 mr-2">🚀</span>
                    <span>{win}</span>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="p-6 border border-gray-700 rounded-lg bg-gray-800">
              <h3 className="text-xl font-semibold mb-4">Long-term Strategy</h3>
              <div className="space-y-3">
                {backlinksData?.longTermStrategy?.map((strategy, index) => (
                  <div key={index} className="flex items-center p-3 bg-purple-900/20 rounded">
                    <span className="text-purple-400 mr-2">📈</span>
                    <span>{strategy}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* SEO Recommendations */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">📊 SEO Recommendations</h2>
          <div className="p-6 border border-gray-700 rounded-lg bg-gradient-to-r from-blue-900/20 to-purple-900/20">
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="text-lg font-semibold mb-4 text-blue-400">Content Strategy</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Create &quot;Cursor AI vs CodeMurf&quot; comparison page</li>
                  <li>• Write &quot;Best Free AI Extensions for VS Code&quot; blog post</li>
                  <li>• Develop MCP integration tutorials</li>
                  <li>• Build template showcase with SEO-friendly URLs</li>
                </ul>
              </div>
              <div>
                <h3 className="text-lg font-semibold mb-4 text-green-400">Technical SEO</h3>
                <ul className="space-y-2 text-sm">
                  <li>• Optimize page speed (target &lt;3s load time)</li>
                  <li>• Add structured data for software listings</li>
                  <li>• Create XML sitemap for all pages</li>
                  <li>• Implement breadcrumb navigation</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Action Items */}
        <section>
          <h2 className="text-2xl font-bold mb-6">✅ Action Items</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="p-4 border border-red-500 rounded-lg bg-red-900/20">
              <h3 className="font-semibold text-red-400 mb-2">High Priority</h3>
              <ul className="text-sm space-y-1">
                <li>• VS Code Marketplace submission</li>
                <li>• GitHub repository setup</li>
                <li>• Basic competitor comparison page</li>
              </ul>
            </div>
            <div className="p-4 border border-yellow-500 rounded-lg bg-yellow-900/20">
              <h3 className="font-semibold text-yellow-400 mb-2">Medium Priority</h3>
              <ul className="text-sm space-y-1">
                <li>• Dev.to tutorial series</li>
                <li>• ProductHunt preparation</li>
                <li>• Social media setup</li>
              </ul>
            </div>
            <div className="p-4 border border-green-500 rounded-lg bg-green-900/20">
              <h3 className="font-semibold text-green-400 mb-2">Long Term</h3>
              <ul className="text-sm space-y-1">
                <li>• Community building</li>
                <li>• Conference speaking</li>
                <li>• Partnership development</li>
              </ul>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
