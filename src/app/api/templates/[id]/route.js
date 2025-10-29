/**
 * Single Template API route
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

// GET /api/templates/[id] - Get a specific template by ID
export async function GET(request, { params }) {
  try {
    const { id } = params;
    const templateId = parseInt(id);
    
    // Find the template by ID
    const template = mockTemplates.find(t => t.id === templateId);
    
    if (!template) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ template });
  } catch (error) {
    console.error('Error fetching template:', error);
    return NextResponse.json(
      { error: 'Failed to fetch template' },
      { status: 500 }
    );
  }
}

// PUT /api/templates/[id] - Update a template
export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const templateId = parseInt(id);
    const updateData = await request.json();
    
    // Find the template by ID
    const templateIndex = mockTemplates.findIndex(t => t.id === templateId);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Update the template
    const updatedTemplate = {
      ...mockTemplates[templateIndex],
      ...updateData,
      updated_at: new Date().toISOString()
    };
    
    mockTemplates[templateIndex] = updatedTemplate;
    
    return NextResponse.json(updatedTemplate);
  } catch (error) {
    console.error('Error updating template:', error);
    return NextResponse.json(
      { error: 'Failed to update template' },
      { status: 500 }
    );
  }
}

// DELETE /api/templates/[id] - Delete a template
export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const templateId = parseInt(id);
    
    // Find the template by ID
    const templateIndex = mockTemplates.findIndex(t => t.id === templateId);
    
    if (templateIndex === -1) {
      return NextResponse.json(
        { error: 'Template not found' },
        { status: 404 }
      );
    }
    
    // Remove the template
    mockTemplates.splice(templateIndex, 1);
    
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting template:', error);
    return NextResponse.json(
      { error: 'Failed to delete template' },
      { status: 500 }
    );
  }
}