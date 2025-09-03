export const metadata = {
  title: 'Blog',
  description: 'Stay updated with the latest insights, tutorials, and news from CodeMurf. Explore AI development trends, coding tips, and platform updates.',
  keywords: 'blog, AI development, coding tutorials, software development, programming tips, CodeMurf news',
  openGraph: {
    title: 'Blog - CodeMurf',
    description: 'Stay updated with the latest insights, tutorials, and news from CodeMurf.',
    url: 'https://codemurf.com/blogs',
  },
  twitter: {
    title: 'Blog - CodeMurf',
    description: 'Stay updated with the latest insights, tutorials, and news from CodeMurf.',
  },
  alternates: {
    canonical: '/blogs',
  },
};

export default function BlogsLayout({ children }) {
  return children;
}

