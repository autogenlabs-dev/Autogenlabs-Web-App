/**
 * Template Categories API route
 */

import { NextResponse } from 'next/server';

// Mock data for template categories
const mockCategories = [
  'Navigation',
  'Layout', 
  'Forms',
  'Data Display',
  'User Interface',
  'Content',
  'Media',
  'Interactive',
  'Widgets',
  'Sections',
  'Dashboard',
  'E-commerce',
  'Authentication',
  'Landing Page',
  'Blog',
  'Portfolio',
  'Documentation',
  'Admin',
  'Social',
  'Business'
];

// GET /api/templates/categories - Get all template categories
export async function GET() {
  try {
    return NextResponse.json({
      categories: mockCategories
    });
  } catch (error) {
    console.error('Error fetching template categories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template categories' },
      { status: 500 }
    );
  }
}