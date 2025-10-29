/**
 * Template Stats API route
 */

import { NextResponse } from 'next/server';

// Mock data for template statistics
const mockStats = {
  total_templates: 150,
  total_downloads: 25000,
  total_views: 125000,
  total_likes: 8500,
  categories_count: 20,
  featured_templates: 25,
  popular_templates: 40,
  free_templates: 100,
  paid_templates: 50,
  recent_growth: {
    downloads_this_month: 2500,
    views_this_month: 12500,
    new_templates_this_month: 12
  }
};

// GET /api/templates/stats - Get template statistics
export async function GET() {
  try {
    return NextResponse.json(mockStats);
  } catch (error) {
    console.error('Error fetching template stats:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template statistics' },
      { status: 500 }
    );
  }
}