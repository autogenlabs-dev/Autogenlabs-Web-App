import BlogsPage from '../../components/pages/blogs/BlogsPage';

export const metadata = {
  title: 'Codemurf Blog - Infrastructure Insights & Tutorials',
  description: 'Discover the latest insights, tutorials, and updates from Codemurf. Learn about infrastructure automation, deployment strategies, and platform best practices.',
  keywords: 'Codemurf, infrastructure, blog, tutorials, DevOps, automation, deployment, platform updates',
  openGraph: {
    title: 'Codemurf Blog - Infrastructure Insights & Tutorials',
    description: 'Discover the latest insights, tutorials, and updates from Codemurf. Learn about infrastructure automation, deployment strategies, and platform best practices.',
    url: 'https://codemurf.com/blogs',
    siteName: 'Codemurf',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop',
        width: 1200,
        height: 630,
        alt: 'Codemurf Blog',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Codemurf Blog - Infrastructure Insights & Tutorials',
    description: 'Discover the latest insights, tutorials, and updates from Codemurf.',
    images: ['https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=630&fit=crop'],
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function BlogsPageRoute() {
  return <BlogsPage />;
}
