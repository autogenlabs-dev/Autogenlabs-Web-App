// Component Categories
export const componentCategories = [
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

// Difficulty Levels
export const difficultyLevels = ['Easy', 'Medium', 'Tough'];

// Component Types
export const componentTypes = ['React', 'Vue', 'Angular', 'HTML/CSS', 'Svelte', 'Flutter'];

// Plan Types
export const planTypes = ['Free', 'Paid'];

// User Roles
export const userRoles = {
  ADMIN: 'admin',
  PREMIUM: 'premium',
  FREE: 'free'
};

// Mock User
export const mockUser = {
  id: 1,
  name: 'John Doe',
  email: 'john@example.com',
  role: userRoles.PREMIUM,
  avatar: '/logoAuto.webp',
  joinedDate: '2024-01-15'
};

// Sample Components Data
export const sampleComponents = [
  {
    id: 1,
    title: 'Modern Navigation Bar',
    category: 'Navigation',
    type: 'React',
    language: 'TypeScript',
    difficultyLevel: 'Easy',
    planType: 'Free',
    pricingINR: 0,
    pricingUSD: 0,
    rating: 4.8,
    downloads: 1250,
    views: 3400,
    likes: 89,
    shortDescription: 'Responsive navigation bar with dropdown menus and mobile hamburger menu',
    fullDescription: 'A fully responsive navigation component built with React and Tailwind CSS. Features include dropdown menus, mobile hamburger menu, smooth animations, and accessibility support. Perfect for modern web applications.',
    previewImages: ['/components/navbar-preview.svg', '/components/hero-section-preview.svg', '/components/modal-dialog-preview.svg'],
    gitRepoUrl: 'https://github.com/example/navbar',
    liveDemoUrl: 'https://navbar-demo.vercel.app',
    dependencies: ['react', 'tailwindcss', 'framer-motion'],
    tags: ['responsive', 'accessible', 'animated'],
    developerName: 'Sarah Johnson',
    developerExperience: '5+ years',
    isAvailableForDev: true,
    featured: true,
    popular: true,
    createdAt: '2024-01-15'
  },
  {
    id: 2,
    title: 'Dashboard Sidebar',
    category: 'Layout',
    type: 'React',
    language: 'JavaScript',
    difficultyLevel: 'Medium',
    planType: 'Paid',
    pricingINR: 499,
    pricingUSD: 6,
    rating: 4.9,
    downloads: 890,
    views: 2200,
    likes: 156,
    shortDescription: 'Collapsible sidebar with navigation icons and smooth animations',
    fullDescription: 'A modern dashboard sidebar component with collapsible functionality, icon navigation, and smooth transitions. Built with React and includes dark/light theme support.',
    previewImages: ['/components/sidebar-preview.svg', '/components/data-table-preview.svg', '/components/navbar-preview.svg'],
    gitRepoUrl: 'https://github.com/example/sidebar',
    liveDemoUrl: 'https://sidebar-demo.vercel.app',
    dependencies: ['react', 'tailwindcss', 'lucide-react'],
    tags: ['dashboard', 'collapsible', 'animated'],
    developerName: 'Mike Chen',
    developerExperience: '7+ years',
    isAvailableForDev: true,
    featured: true,
    popular: false,
    createdAt: '2024-01-20'
  },
  {
    id: 3,
    title: 'Contact Form',
    category: 'Forms',
    type: 'React',
    language: 'TypeScript',
    difficultyLevel: 'Easy',
    planType: 'Free',
    pricingINR: 0,
    pricingUSD: 0,
    rating: 4.6,
    downloads: 2100,
    views: 4800,
    likes: 134,
    shortDescription: 'Beautiful contact form with validation and email integration',
    fullDescription: 'A responsive contact form component with built-in validation, error handling, and email integration. Features glassmorphism design and smooth animations.',
    previewImages: ['/components/contact-form-preview.svg', '/components/modal-dialog-preview.svg', '/components/pricing-cards-preview.svg'],
    gitRepoUrl: 'https://github.com/example/contact-form',
    liveDemoUrl: 'https://contact-form-demo.vercel.app',
    dependencies: ['react', 'react-hook-form', 'yup', 'nodemailer'],
    tags: ['form', 'validation', 'email'],
    developerName: 'Emma Davis',
    developerExperience: '4+ years',
    isAvailableForDev: true,
    featured: false,
    popular: true,
    createdAt: '2024-01-25'
  },
  {
    id: 4,
    title: 'Data Table',
    category: 'Data Display',
    type: 'React',
    language: 'TypeScript',
    difficultyLevel: 'Tough',
    planType: 'Paid',
    pricingINR: 799,
    pricingUSD: 10,
    rating: 4.7,
    downloads: 567,
    views: 1890,
    likes: 78,
    shortDescription: 'Advanced data table with sorting, filtering, and pagination',
    fullDescription: 'A comprehensive data table component with advanced features including sorting, filtering, pagination, row selection, and export functionality. Perfect for admin dashboards.',
    previewImages: ['/components/data-table-preview.svg', '/components/sidebar-preview.svg', '/components/image-gallery-preview.svg'],
    gitRepoUrl: 'https://github.com/example/data-table',
    liveDemoUrl: 'https://data-table-demo.vercel.app',
    dependencies: ['react', 'react-table', 'tailwindcss', 'xlsx'],
    tags: ['table', 'sorting', 'filtering', 'pagination'],
    developerName: 'Alex Rodriguez',
    developerExperience: '6+ years',
    isAvailableForDev: true,
    featured: true,
    popular: false,
    createdAt: '2024-02-01'
  },
  {
    id: 5,
    title: 'Hero Section',
    category: 'Sections',
    type: 'React',
    language: 'JavaScript',
    difficultyLevel: 'Easy',
    planType: 'Free',
    pricingINR: 0,
    pricingUSD: 0,
    rating: 4.5,
    downloads: 3200,
    views: 6500,
    likes: 245,
    shortDescription: 'Modern hero section with gradient backgrounds and animations',
    fullDescription: 'A stunning hero section component with gradient backgrounds, parallax effects, and smooth animations. Includes call-to-action buttons and responsive design.',
    previewImages: ['/components/hero-section-preview.svg', '/components/pricing-cards-preview.svg', '/components/navbar-preview.svg'],
    gitRepoUrl: 'https://github.com/example/hero-section',
    liveDemoUrl: 'https://hero-demo.vercel.app',
    dependencies: ['react', 'framer-motion', 'tailwindcss'],
    tags: ['hero', 'landing', 'animated'],
    developerName: 'Lisa Wang',
    developerExperience: '3+ years',
    isAvailableForDev: true,
    featured: false,
    popular: true,
    createdAt: '2024-02-05'
  },
  {
    id: 6,
    title: 'Modal Dialog',
    category: 'User Interface',
    type: 'React',
    language: 'TypeScript',
    difficultyLevel: 'Medium',
    planType: 'Paid',
    pricingINR: 299,
    pricingUSD: 4,
    rating: 4.8,
    downloads: 1560,
    views: 3200,
    likes: 98,
    shortDescription: 'Customizable modal dialog with backdrop blur and animations',
    fullDescription: 'A versatile modal dialog component with backdrop blur, smooth animations, and multiple size options. Includes accessibility features and keyboard navigation.',
    previewImages: ['/components/modal-dialog-preview.svg', '/components/contact-form-preview.svg', '/components/hero-section-preview.svg'],
    gitRepoUrl: 'https://github.com/example/modal',
    liveDemoUrl: 'https://modal-demo.vercel.app',
    dependencies: ['react', 'framer-motion', 'focus-trap-react'],
    tags: ['modal', 'dialog', 'accessible'],
    developerName: 'David Kim',
    developerExperience: '5+ years',
    isAvailableForDev: true,
    featured: false,
    popular: false,
    createdAt: '2024-02-10'
  },
  {
    id: 7,
    title: 'Pricing Cards',
    category: 'Content',
    type: 'React',
    language: 'JavaScript',
    difficultyLevel: 'Easy',
    planType: 'Free',
    pricingINR: 0,
    pricingUSD: 0,
    rating: 4.7,
    downloads: 2800,
    views: 5600,
    likes: 187,
    shortDescription: 'Beautiful pricing cards with hover effects and glassmorphism',
    fullDescription: 'Elegant pricing card components with glassmorphism design, hover effects, and responsive layout. Perfect for SaaS and subscription-based websites.',
    previewImages: ['/components/pricing-cards-preview.svg', '/components/sidebar-preview.svg', '/components/data-table-preview.svg'],
    gitRepoUrl: 'https://github.com/example/pricing-cards',
    liveDemoUrl: 'https://pricing-demo.vercel.app',
    dependencies: ['react', 'tailwindcss', 'framer-motion'],
    tags: ['pricing', 'cards', 'glassmorphism'],
    developerName: 'Rachel Green',
    developerExperience: '4+ years',
    isAvailableForDev: true,
    featured: true,
    popular: true,
    createdAt: '2024-02-15'
  },
  {
    id: 8,
    title: 'Image Gallery',
    category: 'Media',
    type: 'React',
    language: 'TypeScript',
    difficultyLevel: 'Medium',
    planType: 'Paid',
    pricingINR: 599,
    pricingUSD: 7,
    rating: 4.6,
    downloads: 890,
    views: 2100,
    likes: 112,
    shortDescription: 'Responsive image gallery with lightbox and lazy loading',
    fullDescription: 'A responsive image gallery component with lightbox functionality, lazy loading, and masonry layout. Includes zoom, navigation, and thumbnail features.',
    previewImages: ['/components/image-gallery-preview.svg', '/components/hero-section-preview.svg', '/components/contact-form-preview.svg'],
    gitRepoUrl: 'https://github.com/example/image-gallery',
    liveDemoUrl: 'https://gallery-demo.vercel.app',
    dependencies: ['react', 'react-image-gallery', 'intersection-observer'],
    tags: ['gallery', 'lightbox', 'lazy-loading'],
    developerName: 'Tom Wilson',
    developerExperience: '6+ years',
    isAvailableForDev: true,
    featured: false,
    popular: false,
    createdAt: '2024-02-20'
  }
];

// Get components by category
export const getComponentsByCategory = (category) => {
  if (!category) return sampleComponents;
  return sampleComponents.filter(component => component.category === category);
};

// Get featured components
export const getFeaturedComponents = () => {
  return sampleComponents.filter(component => component.featured);
};

// Get popular components
export const getPopularComponents = () => {
  return sampleComponents.filter(component => component.popular);
};

