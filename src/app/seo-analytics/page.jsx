'use client';

import { useState, useEffect } from 'react';
import { ChartBarIcon, MagnifyingGlassIcon, LinkIcon, TrendingUpIcon } from '@heroicons/react/24/outline';

export default function SEOAnalytics() {
  const [activeTab, setActiveTab] = useState('keywords');
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({});
  const [domain, setDomain] = useState('autogenlabs.com');
  const [keywords, setKeywords] = useState(['AI automation', 'workflow automation', 'business automation']);

  const tabs = [
    { id: 'keywords', name: 'Keyword Research', icon: MagnifyingGlassIcon },
    { id: 'backlinks', name: 'Backlink Analysis', icon: LinkIcon },
    { id: 'competitors', name: 'Competitor Analysis', icon: ChartBarIcon },
    { id: 'trends', name: 'SEO Trends', icon: TrendingUpIcon },
  ];

  const handleKeywordAnalysis = async () => {
    setLoading(true);
    try {
      // This would call your API that uses the DataForSEO MCP tools
      const response = await fetch('/api/seo/keyword-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ keywords, location: 'United States' }),
      });
      const result = await response.json();
      setData(prev => ({ ...prev, keywords: result }));
    } catch (error) {
      console.error('Error analyzing keywords:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBacklinkAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/backlink-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const result = await response.json();
      setData(prev => ({ ...prev, backlinks: result }));
    } catch (error) {
      console.error('Error analyzing backlinks:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCompetitorAnalysis = async () => {
    setLoading(true);
    try {
      const response = await fetch('/api/seo/competitor-analysis', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ domain }),
      });
      const result = await response.json();
      setData(prev => ({ ...prev, competitors: result }));
    } catch (error) {
      console.error('Error analyzing competitors:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">SEO Analytics Dashboard</h1>
          <p className="mt-2 text-gray-600">
            Comprehensive SEO analysis powered by DataForSEO
          </p>
        </div>

        {/* Input Section */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="domain" className="block text-sm font-medium text-gray-700 mb-2">
                Domain to Analyze
              </label>
              <input
                type="text"
                id="domain"
                value={domain}
                onChange={(e) => setDomain(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="example.com"
              />
            </div>
            <div>
              <label htmlFor="keywords" className="block text-sm font-medium text-gray-700 mb-2">
                Keywords (comma-separated)
              </label>
              <input
                type="text"
                id="keywords"
                value={keywords.join(', ')}
                onChange={(e) => setKeywords(e.target.value.split(',').map(k => k.trim()))}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="keyword1, keyword2, keyword3"
              />
            </div>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="bg-white rounded-lg shadow">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8 px-6">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`
                      group inline-flex items-center py-4 px-1 border-b-2 font-medium text-sm
                      ${
                        activeTab === tab.id
                          ? 'border-blue-500 text-blue-600'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                      }
                    `}
                  >
                    <Icon className="w-5 h-5 mr-2" />
                    {tab.name}
                  </button>
                );
              })}
            </nav>
          </div>

          <div className="p-6">
            {activeTab === 'keywords' && (
              <KeywordAnalysis
                data={data.keywords}
                loading={loading}
                onAnalyze={handleKeywordAnalysis}
              />
            )}
            {activeTab === 'backlinks' && (
              <BacklinkAnalysis
                data={data.backlinks}
                loading={loading}
                onAnalyze={handleBacklinkAnalysis}
              />
            )}
            {activeTab === 'competitors' && (
              <CompetitorAnalysis
                data={data.competitors}
                loading={loading}
                onAnalyze={handleCompetitorAnalysis}
              />
            )}
            {activeTab === 'trends' && (
              <TrendsAnalysis data={data.trends} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function KeywordAnalysis({ data, loading, onAnalyze }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Keyword Research & Analysis</h2>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Keywords'}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Search Volume</h3>
            <p className="text-2xl font-bold text-blue-600">
              {data.totalSearchVolume?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Avg. CPC</h3>
            <p className="text-2xl font-bold text-green-600">
              ${data.avgCPC?.toFixed(2) || '0.00'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Competition</h3>
            <p className="text-2xl font-bold text-orange-600">
              {data.avgCompetition || 'Low'}
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium mb-4">Keyword Opportunities</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            Use the DataForSEO keyword tools to discover high-volume, low-competition keywords
            for your content strategy.
          </p>
        </div>
      </div>
    </div>
  );
}

function BacklinkAnalysis({ data, loading, onAnalyze }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Backlink Profile Analysis</h2>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Backlinks'}
        </button>
      </div>

      {data && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Total Backlinks</h3>
            <p className="text-2xl font-bold text-blue-600">
              {data.totalBacklinks?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Referring Domains</h3>
            <p className="text-2xl font-bold text-green-600">
              {data.referringDomains?.toLocaleString() || '0'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Domain Rank</h3>
            <p className="text-2xl font-bold text-purple-600">
              {data.domainRank || '0'}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-lg">
            <h3 className="font-medium mb-2">Spam Score</h3>
            <p className="text-2xl font-bold text-red-600">
              {data.spamScore || '0'}%
            </p>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium mb-4">Link Building Opportunities</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            Analyze your backlink profile to identify toxic links, find link building opportunities,
            and monitor your domain authority growth.
          </p>
        </div>
      </div>
    </div>
  );
}

function CompetitorAnalysis({ data, loading, onAnalyze }) {
  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">Competitor Analysis</h2>
        <button
          onClick={onAnalyze}
          disabled={loading}
          className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 disabled:opacity-50"
        >
          {loading ? 'Analyzing...' : 'Analyze Competitors'}
        </button>
      </div>

      {data && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Top Competitors</h3>
              <p className="text-2xl font-bold text-blue-600">
                {data.competitorCount || '0'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Shared Keywords</h3>
              <p className="text-2xl font-bold text-green-600">
                {data.sharedKeywords || '0'}
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-medium mb-2">Gap Opportunities</h3>
              <p className="text-2xl font-bold text-orange-600">
                {data.gapOpportunities || '0'}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="mt-6">
        <h3 className="font-medium mb-4">Competitive Intelligence</h3>
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-gray-600">
            Discover what keywords your competitors rank for that you don't, analyze their
            backlink strategies, and find content gaps to exploit.
          </p>
        </div>
      </div>
    </div>
  );
}

function TrendsAnalysis({ data }) {
  return (
    <div>
      <h2 className="text-xl font-semibold mb-6">SEO Trends & Insights</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium mb-4">Keyword Trends</h3>
          <p className="text-gray-600">
            Monitor how your target keywords are trending over time and adjust
            your content strategy accordingly.
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium mb-4">Search Intent Analysis</h3>
          <p className="text-gray-600">
            Understand the search intent behind your keywords to create more
            targeted and effective content.
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium mb-4">SERP Features</h3>
          <p className="text-gray-600">
            Track featured snippets, local packs, and other SERP features
            for your target keywords.
          </p>
        </div>
        
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="font-medium mb-4">Content Gaps</h3>
          <p className="text-gray-600">
            Identify content opportunities based on trending topics and
            competitor analysis.
          </p>
        </div>
      </div>
    </div>
  );
}
