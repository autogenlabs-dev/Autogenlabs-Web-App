// Template data structure for the application
export const templateCategories = [
    'Admin Panel',
    'Portfolio',
    'E-commerce',
    'Dashboard',
    'Blog',
    'Landing Page',
    'SaaS Tool',
    'Learning Management System'
];

export const difficultyLevels = [
    'Easy',
    'Medium',
    'Tough'
];

export const templateTypes = [
    'Animated',
    'Normal'
];

export const planTypes = [
    'Free',
    'Paid'
];

// Sample template data with 24 templates
export const sampleTemplates = [
    {
        id: 1, title: 'Modern Admin Dashboard',
        category: 'Admin Panel',
        previewImage: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
        videoPreview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
        developerName: 'John Doe',
        pricing: { inr: 2999, usd: 35 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'React + TypeScript',
        rating: 4.9,
        totalRatings: 156,
        gitRepoUrl: 'https://github.com/example/admin-dashboard',
        liveDemoUrl: 'https://admin-demo.example.com',
        dependencies: ['React', 'TypeScript', 'Tailwind CSS', 'Chart.js'],
        developerExperience: 5,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Complete admin dashboard with analytics and user management',
        fullDescription: 'A comprehensive admin dashboard built with React and TypeScript...'
    },
    {
        id: 2,
        title: 'Portfolio Website Template',
        category: 'Portfolio',
        previewImage: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Jane Smith',
        pricing: { inr: 0, usd: 0 },
        planType: 'Free',
        difficultyLevel: 'Easy',
        type: 'Normal',
        language: 'HTML + CSS + JavaScript',
        rating: 4.2,
        totalRatings: 89,
        gitRepoUrl: 'https://github.com/example/portfolio',
        liveDemoUrl: 'https://portfolio-demo.example.com',
        dependencies: ['HTML5', 'CSS3', 'JavaScript', 'AOS'],
        developerExperience: 3,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Clean and minimal portfolio website template',
        fullDescription: 'A responsive portfolio website template perfect for developers...'
    },
    {
        id: 3, title: 'E-commerce Store',
        category: 'E-commerce',
        previewImage: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&h=600&fit=crop',
        videoPreview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
        developerName: 'Mike Johnson',
        pricing: { inr: 4999, usd: 60 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Animated',
        language: 'Next.js + TypeScript',
        rating: 4.9,
        totalRatings: 234,
        gitRepoUrl: 'https://github.com/example/ecommerce',
        liveDemoUrl: 'https://shop-demo.example.com',
        dependencies: ['Next.js', 'TypeScript', 'Stripe', 'Prisma'],
        developerExperience: 7,
        isAvailableForDev: false,
        featured: true,
        shortDescription: 'Full-featured e-commerce store with payment integration',
        fullDescription: 'Complete e-commerce solution with product management, cart functionality...'
    },
    {
        id: 4,
        title: 'Analytics Dashboard',
        category: 'Dashboard',
        previewImage: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Sarah Wilson',
        pricing: { inr: 1999, usd: 25 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'Vue.js + TypeScript',
        rating: 4.8,
        totalRatings: 112,
        gitRepoUrl: 'https://github.com/example/analytics',
        liveDemoUrl: 'https://analytics-demo.example.com',
        dependencies: ['Vue.js', 'TypeScript', 'Chart.js', 'Vuetify'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Beautiful analytics dashboard with real-time data',
        fullDescription: 'Modern analytics dashboard with interactive charts and real-time updates...'
    },
    {
        id: 5,
        title: 'Blog Template',
        category: 'Blog',
        previewImage: 'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'David Brown',
        pricing: { inr: 0, usd: 0 },
        planType: 'Free',
        difficultyLevel: 'Easy',
        type: 'Normal',
        language: 'Gatsby + React',
        rating: 4.3,
        totalRatings: 67,
        gitRepoUrl: 'https://github.com/example/blog',
        liveDemoUrl: 'https://blog-demo.example.com',
        dependencies: ['Gatsby', 'React', 'GraphQL', 'Markdown'],
        developerExperience: 2,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Clean blog template with markdown support',
        fullDescription: 'Static blog template built with Gatsby, perfect for content creators...'
    },
    {
        id: 6, title: 'SaaS Landing Page',
        category: 'Landing Page',
        previewImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
        videoPreview: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
        developerName: 'Emily Davis',
        pricing: { inr: 1499, usd: 18 },
        planType: 'Paid',
        difficultyLevel: 'Easy',
        type: 'Animated',
        language: 'React + Tailwind CSS',
        rating: 4.9,
        totalRatings: 198,
        gitRepoUrl: 'https://github.com/example/saas-landing',
        liveDemoUrl: 'https://saas-demo.example.com',
        dependencies: ['React', 'Tailwind CSS', 'Framer Motion', 'React Router'],
        developerExperience: 3,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'High-converting SaaS landing page template',
        fullDescription: 'Professional SaaS landing page with modern design and animations...'
    },
    {
        id: 7,
        title: 'Learning Management System',
        category: 'Learning Management System',
        previewImage: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Alex Rivera',
        pricing: { inr: 5999, usd: 70 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Animated',
        language: 'MERN Stack',
        rating: 4.8,
        totalRatings: 145,
        gitRepoUrl: 'https://github.com/example/lms',
        liveDemoUrl: 'https://lms-demo.example.com',
        dependencies: ['MongoDB', 'Express', 'React', 'Node.js', 'Socket.io'],
        developerExperience: 6,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Complete LMS with course management and video streaming',
        fullDescription: 'Full-featured learning management system with course creation, video streaming...'
    },
    {
        id: 8,
        title: 'Restaurant Website',
        category: 'Landing Page',
        previewImage: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Maria Garcia',
        pricing: { inr: 1299, usd: 15 },
        planType: 'Paid',
        difficultyLevel: 'Easy',
        type: 'Animated',
        language: 'React + Styled Components',
        rating: 4.6,
        totalRatings: 78,
        gitRepoUrl: 'https://github.com/example/restaurant',
        liveDemoUrl: 'https://restaurant-demo.example.com',
        dependencies: ['React', 'Styled Components', 'AOS', 'Swiper'],
        developerExperience: 3,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Modern restaurant website with online ordering',
        fullDescription: 'Beautiful restaurant website with menu display and online ordering...'
    },
    {
        id: 9,
        title: 'Crypto Trading Dashboard',
        category: 'Dashboard',
        previewImage: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'James Wilson',
        pricing: { inr: 3999, usd: 48 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Animated',
        language: 'React + TypeScript',
        rating: 4.7,
        totalRatings: 189,
        gitRepoUrl: 'https://github.com/example/crypto-dashboard',
        liveDemoUrl: 'https://crypto-demo.example.com',
        dependencies: ['React', 'TypeScript', 'Chart.js', 'WebSocket'],
        developerExperience: 5,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Real-time crypto trading dashboard with live charts',
        fullDescription: 'Professional crypto trading dashboard with real-time data and charts...'
    },
    {
        id: 10,
        title: 'Medical Clinic Website',
        category: 'Landing Page',
        previewImage: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Dr. Lisa Chen',
        pricing: { inr: 2299, usd: 28 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Normal',
        language: 'Next.js + Tailwind',
        rating: 4.5,
        totalRatings: 92,
        gitRepoUrl: 'https://github.com/example/medical-clinic',
        liveDemoUrl: 'https://clinic-demo.example.com',
        dependencies: ['Next.js', 'Tailwind CSS', 'React Hook Form'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Professional medical clinic website with appointment booking',
        fullDescription: 'Modern medical clinic website with online appointment booking system...'
    },
    {
        id: 11,
        title: 'Fashion E-commerce',
        category: 'E-commerce',
        previewImage: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'Sophie Martin',
        pricing: { inr: 3499, usd: 42 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'Vue.js + Nuxt',
        rating: 4.8,
        totalRatings: 156,
        gitRepoUrl: 'https://github.com/example/fashion-store',
        liveDemoUrl: 'https://fashion-demo.example.com',
        dependencies: ['Vue.js', 'Nuxt.js', 'Vuex', 'Stripe'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Elegant fashion e-commerce with AR try-on feature',
        fullDescription: 'Modern fashion e-commerce platform with virtual try-on capabilities...'
    },
    {
        id: 12,
        title: 'Developer Portfolio',
        category: 'Portfolio',
        previewImage: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Ryan Kumar',
        pricing: { inr: 0, usd: 0 },
        planType: 'Free',
        difficultyLevel: 'Easy',
        type: 'Animated',
        language: 'React + Three.js',
        rating: 4.4,
        totalRatings: 123,
        gitRepoUrl: 'https://github.com/example/dev-portfolio',
        liveDemoUrl: 'https://dev-portfolio-demo.example.com',
        dependencies: ['React', 'Three.js', 'Framer Motion', 'Tailwind CSS'],
        developerExperience: 3,
        isAvailableForDev: true,
        featured: false,
        shortDescription: '3D animated developer portfolio with interactive elements',
        fullDescription: 'Creative developer portfolio with 3D animations and interactive elements...'
    },
    // Additional 12 templates for load more functionality
    {
        id: 13,
        title: 'Real Estate Platform',
        category: 'Landing Page',
        previewImage: 'https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Michael Torres',
        pricing: { inr: 2799, usd: 33 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Normal',
        language: 'Angular + TypeScript',
        rating: 4.6,
        totalRatings: 87,
        gitRepoUrl: 'https://github.com/example/real-estate',
        liveDemoUrl: 'https://realestate-demo.example.com',
        dependencies: ['Angular', 'TypeScript', 'Google Maps API'],
        developerExperience: 5,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Modern real estate platform with property search',
        fullDescription: 'Complete real estate platform with advanced property search and filters...'
    },
    {
        id: 14,
        title: 'Fitness Tracking App',
        category: 'SaaS Tool',
        previewImage: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'Amanda Foster',
        pricing: { inr: 1999, usd: 24 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'React Native',
        rating: 4.7,
        totalRatings: 134,
        gitRepoUrl: 'https://github.com/example/fitness-app',
        liveDemoUrl: 'https://fitness-demo.example.com',
        dependencies: ['React Native', 'Expo', 'Firebase', 'Chart.js'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Complete fitness tracking app with workout plans',
        fullDescription: 'Comprehensive fitness app with workout tracking and nutrition planning...'
    },
    {
        id: 15,
        title: 'News & Media Website',
        category: 'Blog',
        previewImage: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Chris Anderson',
        pricing: { inr: 1799, usd: 21 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Normal',
        language: 'WordPress + PHP',
        rating: 4.3,
        totalRatings: 76,
        gitRepoUrl: 'https://github.com/example/news-website',
        liveDemoUrl: 'https://news-demo.example.com',
        dependencies: ['WordPress', 'PHP', 'MySQL', 'Bootstrap'],
        developerExperience: 6,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Professional news and media website template',
        fullDescription: 'Modern news website with article management and media gallery...'
    },
    {
        id: 16,
        title: 'Travel Booking Platform',
        category: 'E-commerce',
        previewImage: 'https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'Elena Rodriguez',
        pricing: { inr: 4299, usd: 52 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Animated',
        language: 'Django + React',
        rating: 4.8,
        totalRatings: 167,
        gitRepoUrl: 'https://github.com/example/travel-booking',
        liveDemoUrl: 'https://travel-demo.example.com',
        dependencies: ['Django', 'React', 'PostgreSQL', 'Stripe'],
        developerExperience: 7,
        isAvailableForDev: false,
        featured: true,
        shortDescription: 'Full-featured travel booking platform with payments',
        fullDescription: 'Complete travel booking system with hotel and flight reservations...'
    },
    {
        id: 17,
        title: 'Task Management Tool',
        category: 'SaaS Tool',
        previewImage: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Kevin Park',
        pricing: { inr: 2499, usd: 30 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'Vue.js + Laravel',
        rating: 4.5,
        totalRatings: 98,
        gitRepoUrl: 'https://github.com/example/task-manager',
        liveDemoUrl: 'https://tasks-demo.example.com',
        dependencies: ['Vue.js', 'Laravel', 'MySQL', 'Pusher'],
        developerExperience: 5,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Collaborative task management tool with real-time updates',
        fullDescription: 'Professional task management platform with team collaboration features...'
    },
    {
        id: 18,
        title: 'Photography Portfolio',
        category: 'Portfolio',
        previewImage: 'https://images.unsplash.com/photo-1452587925148-ce544e77e70d?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Isabella White',
        pricing: { inr: 0, usd: 0 },
        planType: 'Free',
        difficultyLevel: 'Easy',
        type: 'Normal',
        language: 'HTML + CSS + JS',
        rating: 4.1,
        totalRatings: 54,
        gitRepoUrl: 'https://github.com/example/photo-portfolio',
        liveDemoUrl: 'https://photo-demo.example.com',
        dependencies: ['HTML5', 'CSS3', 'JavaScript', 'Lightbox'],
        developerExperience: 2,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Elegant photography portfolio with lightbox gallery',
        fullDescription: 'Beautiful photography portfolio with responsive image gallery...'
    },
    {
        id: 19,
        title: 'Corporate Business Website',
        category: 'Landing Page',
        previewImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Robert Johnson',
        pricing: { inr: 1899, usd: 23 },
        planType: 'Paid',
        difficultyLevel: 'Easy',
        type: 'Normal',
        language: 'Bootstrap + jQuery',
        rating: 4.4,
        totalRatings: 112,
        gitRepoUrl: 'https://github.com/example/corporate-website',
        liveDemoUrl: 'https://corporate-demo.example.com',
        dependencies: ['Bootstrap', 'jQuery', 'AOS', 'Contact Form'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Professional corporate website with modern design',
        fullDescription: 'Clean corporate website perfect for business presentations...'
    },
    {
        id: 20,
        title: 'Music Streaming App',
        category: 'SaaS Tool',
        previewImage: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'Taylor Swift',
        pricing: { inr: 3799, usd: 45 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Animated',
        language: 'React + Node.js',
        rating: 4.9,
        totalRatings: 203,
        gitRepoUrl: 'https://github.com/example/music-app',
        liveDemoUrl: 'https://music-demo.example.com',
        dependencies: ['React', 'Node.js', 'MongoDB', 'Web Audio API'],
        developerExperience: 6,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Advanced music streaming app with playlist management',
        fullDescription: 'Full-featured music streaming platform with audio processing...'
    },
    {
        id: 21,
        title: 'Event Management System',
        category: 'SaaS Tool',
        previewImage: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Jessica Lee',
        pricing: { inr: 2999, usd: 36 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'React + Firebase',
        rating: 4.6,
        totalRatings: 89,
        gitRepoUrl: 'https://github.com/example/event-management',
        liveDemoUrl: 'https://events-demo.example.com',
        dependencies: ['React', 'Firebase', 'Material-UI', 'Calendar API'],
        developerExperience: 4,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Complete event management system with ticketing',
        fullDescription: 'Professional event management platform with booking and ticketing...'
    },
    {
        id: 22,
        title: 'Social Media Dashboard',
        category: 'Dashboard',
        previewImage: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=600&fit=crop',
        videoPreview: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
        developerName: 'Mark Thompson',
        pricing: { inr: 2299, usd: 28 },
        planType: 'Paid',
        difficultyLevel: 'Medium',
        type: 'Animated',
        language: 'Angular + TypeScript',
        rating: 4.7,
        totalRatings: 145,
        gitRepoUrl: 'https://github.com/example/social-dashboard',
        liveDemoUrl: 'https://social-demo.example.com',
        dependencies: ['Angular', 'TypeScript', 'Chart.js', 'Social APIs'],
        developerExperience: 5,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Social media analytics dashboard with API integrations',
        fullDescription: 'Comprehensive social media management dashboard with analytics...'
    },
    {
        id: 23,
        title: 'Recipe Sharing Platform',
        category: 'Blog',
        previewImage: 'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Chef Gordon',
        pricing: { inr: 1599, usd: 19 },
        planType: 'Paid',
        difficultyLevel: 'Easy',
        type: 'Normal',
        language: 'Next.js + Sanity',
        rating: 4.3,
        totalRatings: 67,
        gitRepoUrl: 'https://github.com/example/recipe-platform',
        liveDemoUrl: 'https://recipes-demo.example.com',
        dependencies: ['Next.js', 'Sanity CMS', 'Tailwind CSS'],
        developerExperience: 3,
        isAvailableForDev: true,
        featured: false,
        shortDescription: 'Recipe sharing platform with ingredient calculator',
        fullDescription: 'Modern recipe sharing platform with cooking timers and nutrition info...'
    },
    {
        id: 24,
        title: 'Inventory Management',
        category: 'Admin Panel',
        previewImage: 'https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=800&h=600&fit=crop',
        videoPreview: null,
        developerName: 'Sarah Connor',
        pricing: { inr: 3299, usd: 40 },
        planType: 'Paid',
        difficultyLevel: 'Tough',
        type: 'Normal',
        language: 'Laravel + Vue.js',
        rating: 4.8,
        totalRatings: 134,
        gitRepoUrl: 'https://github.com/example/inventory-system',
        liveDemoUrl: 'https://inventory-demo.example.com',
        dependencies: ['Laravel', 'Vue.js', 'MySQL', 'PDF Generator'],
        developerExperience: 6,
        isAvailableForDev: true,
        featured: true,
        shortDescription: 'Advanced inventory management system with reporting',
        fullDescription: 'Complete inventory management solution with barcode scanning and reports...'
    }
];

// User roles for role-based functionality
export const userRoles = {
    ADMIN: 'admin',
    USER: 'user',
    DEVELOPER: 'developer'
};

// Mock user data (since backend is not ready)
export const mockUser = {
    id: 1,
    name: 'John Doe',
    email: 'john@example.com',
    role: userRoles.DEVELOPER, // ✅ USER se DEVELOPER change karein
    isLoggedIn: true // ✅ false se true change karein
};

// Payment providers
export const paymentProviders = {
    STRIPE: 'stripe',
    RAZORPAY: 'razorpay'
};

// Helper functions for template management
export const getPremiumTemplates = () => {
    return sampleTemplates
        .filter(template => template.rating >= 4.7) // High rating templates
        .sort((a, b) => b.rating - a.rating)
        .slice(0, 8); // Top 8 premium templates
};

export const getInitialTemplates = () => {
    return sampleTemplates.slice(0, 12); // First 12 templates
};

export const getLoadMoreTemplates = (currentCount) => {
    return sampleTemplates.slice(currentCount, currentCount + 12); // Next 12 templates
};

export const getTemplateById = (id) => {
    return sampleTemplates.find(template => template.id === parseInt(id));
};

export const getTemplatesByCategory = (category) => {
    if (category === 'All') return sampleTemplates;
    return sampleTemplates.filter(template => template.category === category);
};

export const getFeaturedTemplates = () => {
    return sampleTemplates.filter(template => template.featured);
};

// Additional helper functions for better template management
export const getTemplatesByFilter = (filters) => {
    return sampleTemplates.filter(template => {
        const { category, difficulty, planType, search } = filters;

        const matchesCategory = !category || category === 'All' || template.category === category;
        const matchesDifficulty = !difficulty || difficulty === 'All' || template.difficultyLevel === difficulty;
        const matchesPlanType = !planType || planType === 'All' || template.planType === planType;
        const matchesSearch = !search ||
            template.title.toLowerCase().includes(search.toLowerCase()) ||
            template.shortDescription.toLowerCase().includes(search.toLowerCase()) ||
            template.category.toLowerCase().includes(search.toLowerCase());

        return matchesCategory && matchesDifficulty && matchesPlanType && matchesSearch;
    });
};

export const getRandomTemplates = (count = 8) => {
    const shuffled = [...sampleTemplates].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const getTemplateStats = () => {
    return {
        total: sampleTemplates.length,
        free: sampleTemplates.filter(t => t.planType === 'Free').length,
        premium: sampleTemplates.filter(t => t.planType === 'Paid').length,
        categories: templateCategories.length,
        avgRating: (sampleTemplates.reduce((sum, t) => sum + t.rating, 0) / sampleTemplates.length).toFixed(1)
    };
};
