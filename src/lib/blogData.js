export const blogCategories = [
  { id: 'all', name: 'All', color: 'from-purple-500 to-cyan-500' },
  { id: 'infrastructure', name: 'Infrastructure', color: 'from-blue-500 to-purple-500' },
  { id: 'platform-updates', name: 'Platform Updates', color: 'from-green-500 to-blue-500' },
  { id: 'tutorials', name: 'Tutorials', color: 'from-orange-500 to-red-500' },
  { id: 'devops', name: 'DevOps', color: 'from-pink-500 to-purple-500' },
  { id: 'ai-ml', name: 'AI/ML', color: 'from-cyan-500 to-blue-500' },
  { id: 'analytics', name: 'Analytics', color: 'from-violet-500 to-purple-500' },
];

export const mockBlogPosts = [
  {
    id: 1,
    slug: 'codemurf-labs-unveils-ai-infrastructure-catalyst',
    title: 'Codemurf Unveils AI Infrastructure Catalyst That Could Trigger Nearly 50% Performance Boost for Deployments',
    excerpt: 'Revolutionary AI-powered infrastructure optimization that automatically scales and optimizes your deployment pipeline for maximum efficiency.',
    content: `# Codemurf Unveils AI Infrastructure Catalyst

Codemurf has announced a groundbreaking advancement in AI-powered infrastructure management that promises to revolutionize how developers deploy and scale applications.

## The Catalyst Technology

Our new AI Infrastructure Catalyst uses machine learning algorithms to:
- Automatically optimize resource allocation
- Predict scaling needs before bottlenecks occur
- Reduce deployment times by up to 50%
- Minimize infrastructure costs through intelligent resource management

## Key Features

### Predictive Scaling
The catalyst analyzes usage patterns and automatically adjusts resources before demand spikes occur.

### Cost Optimization
Smart algorithms ensure you're only paying for resources you actually need.

### Zero-Downtime Deployments
Seamless deployment strategies that maintain 100% uptime during updates.

This represents a major step forward in making infrastructure management truly intelligent and developer-friendly.`,
    author: {
      name: 'Alex Chen',
      role: 'Lead Infrastructure Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    category: 'infrastructure',
    tags: ['AI', 'Infrastructure', 'Performance', 'Automation'],
    publishedAt: '2024-01-15T10:00:00Z',
    readTime: '5 min read',
    featured: true,
    trending: true,
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    views: 12500,
    likes: 324
  },
  {
    id: 2,
    slug: 'devops-pipeline-optimization-guide',
    title: 'Complete Guide to DevOps Pipeline Optimization with Codemurf',
    excerpt: 'Learn how to optimize your CI/CD pipelines for maximum efficiency and reliability using Codemurf platform.',
    content: `# Complete Guide to DevOps Pipeline Optimization

Optimizing your DevOps pipeline is crucial for maintaining development velocity while ensuring reliability.

## Pipeline Fundamentals

### Build Optimization
- Parallel execution strategies
- Cache optimization
- Resource allocation

### Testing Strategies
- Automated testing integration
- Quality gates implementation
- Performance testing

## Codemurf Integration

Our platform provides seamless integration with popular CI/CD tools and offers intelligent optimization suggestions.`,
    author: {
      name: 'Sarah Johnson',
      role: 'DevOps Specialist',
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face'
    },
    category: 'devops',
    tags: ['DevOps', 'CI/CD', 'Optimization', 'Pipelines'],
    publishedAt: '2024-01-14T14:30:00Z',
    readTime: '8 min read',
    featured: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1556075798-4825dfaaf498?w=800&h=600&fit=crop',
    views: 8750,
    likes: 156
  },
  {
    id: 3,
    slug: 'kubernetes-deployment-strategies',
    title: 'Advanced Kubernetes Deployment Strategies for Production',
    excerpt: 'Master advanced Kubernetes deployment patterns including blue-green, canary, and rolling deployments.',
    content: `# Advanced Kubernetes Deployment Strategies

Kubernetes offers multiple deployment strategies, each with its own advantages and use cases.

## Blue-Green Deployments

Blue-green deployments involve maintaining two identical production environments.

## Canary Deployments

Canary deployments allow you to release changes to a small subset of users first.

## Rolling Updates

Rolling updates gradually replace old versions with new ones.`,
    author: {
      name: 'Michael Rodriguez',
      role: 'Kubernetes Expert',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: 'tutorials',
    tags: ['Kubernetes', 'Deployment', 'Production', 'Strategies'],
    publishedAt: '2024-01-13T09:15:00Z',
    readTime: '12 min read',
    featured: true,
    trending: false,
    image: 'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=800&h=600&fit=crop',
    views: 15200,
    likes: 412
  },
  {
    id: 4,
    slug: 'machine-learning-infrastructure-scaling',
    title: 'Scaling Machine Learning Infrastructure: Best Practices and Patterns',
    excerpt: 'Discover how to build scalable ML infrastructure that grows with your data science team and model complexity.',
    content: `# Scaling Machine Learning Infrastructure

Building ML infrastructure that scales requires careful planning and the right architectural decisions.

## Infrastructure Requirements

### Compute Resources
- GPU optimization for training
- Auto-scaling for inference
- Cost management strategies

### Data Pipeline Management
- ETL optimization
- Real-time data processing
- Data versioning and lineage

## Codemurf ML Features

Our platform provides specialized tools for ML workloads including automated model deployment and monitoring.`,
    author: {
      name: 'Dr. Emily Watson',
      role: 'ML Infrastructure Lead',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face'
    },
    category: 'ai-ml',
    tags: ['Machine Learning', 'Scaling', 'Infrastructure', 'Best Practices'],
    publishedAt: '2024-01-12T16:45:00Z',
    readTime: '10 min read',
    featured: false,
    trending: true,
    image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&h=600&fit=crop',
    views: 9870,
    likes: 287
  },
  {
    id: 5,
    slug: 'monitoring-observability-best-practices',
    title: 'Monitoring and Observability: Essential Practices for Modern Applications',
    excerpt: 'Implement comprehensive monitoring and observability to ensure your applications run smoothly in production.',
    content: `# Monitoring and Observability Best Practices

Modern applications require comprehensive monitoring and observability to maintain reliability and performance.

## The Three Pillars

### Metrics
- Application performance metrics
- Infrastructure monitoring
- Business metrics

### Logs
- Structured logging
- Log aggregation
- Search and analysis

### Traces
- Distributed tracing
- Request flow analysis
- Performance bottleneck identification`,
    author: {
      name: 'David Park',
      role: 'Site Reliability Engineer',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face'
    },
    category: 'analytics',
    tags: ['Monitoring', 'Observability', 'SRE', 'Performance'],
    publishedAt: '2024-01-11T11:20:00Z',
    readTime: '7 min read',
    featured: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    views: 6540,
    likes: 143
  },
  {
    id: 6,
    slug: 'codemurf-platform-january-updates',
    title: 'Codemurf Platform January 2024 Updates: New Features and Improvements',
    excerpt: 'Explore the latest platform updates including enhanced AI capabilities, improved dashboard, and new integration options.',
    content: `# Codemurf Platform January 2024 Updates

We're excited to share the latest updates to the Codemurf platform, packed with new features and improvements.

## New Features

### Enhanced AI Dashboard
- Real-time performance insights
- Predictive analytics
- Custom metric visualization

### Improved Integrations
- Native GitHub Actions support
- Enhanced Docker registry integration
- New monitoring tool connectors

### Performance Improvements
- 40% faster deployment times
- Reduced resource overhead
- Optimized scaling algorithms`,
    author: {
      name: 'Codemurf Team',
      role: 'Product Updates',
      avatar: 'https://images.unsplash.com/photo-1551808525-51a94da548ce?w=150&h=150&fit=crop&crop=face'
    },
    category: 'platform-updates',
    tags: ['Platform', 'Updates', 'Features', 'Improvements'],
    publishedAt: '2024-01-10T08:00:00Z',
    readTime: '4 min read',
    featured: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
    views: 4320,
    likes: 89
  },
  {
    id: 7,
    slug: 'docker-container-optimization-tips',
    title: 'Docker Container Optimization: 10 Tips for Production Ready Images',
    excerpt: 'Learn essential Docker optimization techniques to create lightweight, secure, and efficient container images.',
    content: `# Docker Container Optimization Tips

Creating optimized Docker containers is crucial for production deployments.

## Image Size Optimization

### Multi-stage Builds
Use multi-stage builds to reduce final image size by excluding build dependencies.

### Base Image Selection
Choose minimal base images like Alpine Linux or distroless images.

### Layer Optimization
Minimize the number of layers and combine RUN commands where possible.

## Security Best Practices

### Non-root Users
Always run containers as non-root users for better security.

### Vulnerability Scanning
Regularly scan images for security vulnerabilities.`,
    author: {
      name: 'James Wilson',
      role: 'Container Specialist',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
    },
    category: 'tutorials',
    tags: ['Docker', 'Containers', 'Optimization', 'Security'],
    publishedAt: '2024-01-09T13:30:00Z',
    readTime: '6 min read',
    featured: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1605810230434-7631ac76ec81?w=800&h=600&fit=crop',
    views: 7890,
    likes: 201
  },
  {
    id: 8,
    slug: 'infrastructure-as-code-terraform-guide',
    title: 'Infrastructure as Code with Terraform: Complete Beginner Guide',
    excerpt: 'Master Infrastructure as Code using Terraform with practical examples and best practices for cloud deployments.',
    content: `# Infrastructure as Code with Terraform

Terraform enables you to define and provision infrastructure using a declarative configuration language.

## Getting Started

### Installation
Install Terraform CLI and configure your cloud provider credentials.

### Basic Concepts
- Resources
- Providers
- Variables
- Outputs

## Best Practices

### State Management
- Use remote state storage
- Enable state locking
- Implement proper access controls

### Module Organization
- Create reusable modules
- Follow naming conventions
- Document your code`,
    author: {
      name: 'Lisa Chang',
      role: 'Infrastructure Architect',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face'
    },
    category: 'infrastructure',
    tags: ['Terraform', 'IaC', 'Cloud', 'Automation'],
    publishedAt: '2024-01-08T10:15:00Z',
    readTime: '9 min read',
    featured: false,
    trending: false,
    image: 'https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=800&h=600&fit=crop',
    views: 5670,
    likes: 134
  }
];

// Helper functions
export const getBlogPosts = () => mockBlogPosts;

export const getFeaturedPost = () => mockBlogPosts.find(post => post.featured && post.id === 1);

export const getTrendingPosts = () => mockBlogPosts.filter(post => post.trending);

export const getLatestPosts = (limit = 5) => 
  mockBlogPosts
    .sort((a, b) => new Date(b.publishedAt) - new Date(a.publishedAt))
    .slice(0, limit);

export const getPopularPosts = (limit = 5) => 
  mockBlogPosts
    .sort((a, b) => b.views - a.views)
    .slice(0, limit);

export const getBestOfMonth = (limit = 5) => 
  mockBlogPosts
    .sort((a, b) => b.likes - a.likes)
    .slice(0, limit);

export const getPostBySlug = (slug) => mockBlogPosts.find(post => post.slug === slug);

export const getPostsByCategory = (categoryId) => {
  if (categoryId === 'all') return mockBlogPosts;
  return mockBlogPosts.filter(post => post.category === categoryId);
};

export const searchPosts = (query) => {
  const lowercaseQuery = query.toLowerCase();
  return mockBlogPosts.filter(post => 
    post.title.toLowerCase().includes(lowercaseQuery) ||
    post.excerpt.toLowerCase().includes(lowercaseQuery) ||
    post.content.toLowerCase().includes(lowercaseQuery) ||
    post.tags.some(tag => tag.toLowerCase().includes(lowercaseQuery))
  );
};

export const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const formatViews = (views) => {
  if (views >= 1000000) return `${(views / 1000000).toFixed(1)}M`;
  if (views >= 1000) return `${(views / 1000).toFixed(1)}K`;
  return views.toString();
};
