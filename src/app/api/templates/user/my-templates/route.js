/**
 * User Templates API route
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
  },
  {
    id: 3,
    title: "Authentication Form",
    category: "Authentication",
    type: "React Component",
    language: "JavaScript",
    difficulty_level: "Beginner",
    plan_type: "Free",
    short_description: "A modern authentication form with login and signup",
    full_description: "A clean and modern authentication form template with login, signup, and password recovery functionality.",
    preview_images: [],
    git_repo_url: "https://github.com/example/auth",
    live_demo_url: "https://example.com/auth",
    dependencies: ["react", "tailwindcss"],
    tags: ["authentication", "form", "login"],
    developer_name: "John Doe",
    developer_experience: "5 years",
    is_available_for_dev: true,
    featured: false,
    popular: false,
    code: null,
    readme_content: null,
    user_id: 1,
    created_at: "2023-02-01T00:00:00Z",
    updated_at: "2023-02-01T00:00:00Z",
    rating: 4.0,
    downloads: 450,
    views: 1200,
    likes: 85
  }
];

// GET /api/templates/user/my-templates - Get templates for the current user
export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    
    // In a real app, you would get the user ID from authentication
    // For now, we'll use a mock user ID of 1
    const currentUserId = 1;
    
    // Parse query parameters
    const page = parseInt(searchParams.get('page')) || 1;
    const limit = parseInt(searchParams.get('limit')) || 10;
    const skip = (page - 1) * limit;
    
    // Filter templates by current user
    const userTemplates = mockTemplates.filter(t => t.user_id === currentUserId);
    
    // Apply pagination
    const startIndex = skip;
    const endIndex = startIndex + limit;
    const paginatedTemplates = userTemplates.slice(startIndex, endIndex);
    
    return NextResponse.json({
      templates: paginatedTemplates,
      total: userTemplates.length,
      page,
      limit,
      skip
    });
  } catch (error) {
    console.error('Error fetching user templates:', error);
    return NextResponse.json(
      { error: 'Failed to fetch user templates' },
      { status: 500 }
    );
  }
}