/**
 * Templates API route
 */

import { NextResponse } from 'next/server';

// Mock data for templates
const mockTemplates = [
  {
    id: 1,
    title: "Modern Dashboard",
    category: "Dashboard",
    type: "React Component",
    language: "JavaScript",
    difficulty_level: "Intermediate",
    plan_type: "Free",
    short_description: "A modern dashboard template with charts and analytics",
    full_description: "A comprehensive dashboard template with various charts, analytics, and data visualization components built with React and Tailwind CSS.",
    preview_images: [],
    git_repo_url: "https://github.com/example/dashboard",
    live_demo_url: "https://example.com/dashboard",
    dependencies: ["react", "chart.js", "tailwindcss"],
    tags: ["dashboard", "analytics", "charts"],
    developer_name: "John Doe",
    developer_experience: "5 years",
    is_available_for_dev: true,
    featured: true,
    popular: true,
    code: null,
    readme_content: null,
    user_id: 1,
    created_at: "2023-01-01T00:00:00Z",
    updated_at: "2023-01-01T00:00:00Z",
    rating: 4.5,
    downloads: 1250,
    views: 5400,
    likes: 320
  },
  {
    id: 2,
    title: "E-commerce Product Page",
    category: "E-commerce",
    type: "React Component",
    language: "JavaScript",
    difficulty_level: "Beginner",
    plan_type: "Free",
    short_description: "A responsive e-commerce product page with image gallery",
    full_description: "A fully responsive e-commerce product page template featuring image gallery, product details, reviews, and shopping cart functionality.",
    preview_images: [],
    git_repo_url: "https://github.com/example/ecommerce",
    live_demo_url: "https://example.com/ecommerce",
    dependencies: ["react", "swiper", "tailwindcss"],
    tags: ["ecommerce", "product", "shopping"],
    developer_name: "Jane Smith",
    developer_experience: "3 years",
    is_available_for_dev: true,
    featured: false,
    popular: true,
    code: null,
    readme_content: null,
    user_id: 2,
    created_at: "2023-01-15T00:00:00Z",
    updated_at: "2023-01-15T00:00:00Z",
    rating: 4.2,
    downloads: 890,
    views: 3200,
    likes: 210
  }
];

// GET /api/templates - Get all templates with optional filtering
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // Parse query parameters
    const skip = parseInt(searchParams.get('skip')) || 0;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const category = searchParams.get('category');
    const type = searchParams.get('type');
    const plan_type = searchParams.get('plan_type');
    const featured = searchParams.get('featured');
    const popular = searchParams.get('popular');
    const search = searchParams.get('search');
    
    // Filter templates based on query parameters
    let filteredTemplates = [...mockTemplates];
    
    if (category && category !== 'All') {
      filteredTemplates = filteredTemplates.filter(t => t.category === category);
    }
    
    if (type && type !== 'All') {
      filteredTemplates = filteredTemplates.filter(t => t.type === type);
    }
    
    if (plan_type && plan_type !== 'All') {
      filteredTemplates = filteredTemplates.filter(t => t.plan_type === plan_type);
    }
    
    if (featured === 'true') {
      filteredTemplates = filteredTemplates.filter(t => t.featured === true);
    }
    
    if (popular === 'true') {
      filteredTemplates = filteredTemplates.filter(t => t.popular === true);
    }
    
    if (search) {
      const searchLower = search.toLowerCase();
      filteredTemplates = filteredTemplates.filter(t => 
        t.title.toLowerCase().includes(searchLower) ||
        t.short_description.toLowerCase().includes(searchLower) ||
        t.tags.some(tag => tag.toLowerCase().includes(searchLower))
      );
    }
    
    // Apply pagination
    const startIndex = skip;
    const endIndex = startIndex + limit;
    const paginatedTemplates = filteredTemplates.slice(startIndex, endIndex);
    
    return NextResponse.json({
      templates: paginatedTemplates,
      total: filteredTemplates.length,
      skip,
      limit
    });
  } catch (error) {
    console.error('Error fetching templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch templates' },
      { status: 500 }
    );
  }
}

// POST /api/templates - Create a new template
export async function POST(request) {
  try {
    const templateData = await request.json();
    
    // In a real app, you would save to a database
    const newTemplate = {
      id: mockTemplates.length + 1,
      ...templateData,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
      downloads: 0,
      views: 0,
      likes: 0,
      rating: 0
    };
    
    mockTemplates.push(newTemplate);
    
    return NextResponse.json(newTemplate, { status: 201 });
  } catch (error) {
    console.error('Error creating template:', error);
    return NextResponse.json(
      { error: 'Failed to create template' },
      { status: 500 }
    );
  }
}