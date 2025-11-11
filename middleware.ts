import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Define public routes (accessible without authentication)
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/extension/sign-in(.*)', // For VS Code extension OAuth
  '/api/webhooks(.*)',
  '/about(.*)',
  '/about-us(.*)',
  '/blogs(.*)',
  '/careers(.*)',
  '/changelog(.*)',
  '/community(.*)',
  '/comparison(.*)',
  '/contact(.*)',
  '/docs(.*)',
  '/events(.*)',
  '/feature-requests(.*)',
  '/partnerships(.*)',
  '/pricing(.*)',
  '/security(.*)',
  '/seo-analytics(.*)',
  '/templates(.*)',
  '/api/public(.*)',
]);

export default clerkMiddleware((auth, req) => {
  const { pathname } = req.nextUrl;

  // Protect dashboard and profile routes
  if (!isPublicRoute(req)) {
    auth.protect();
  }

  // SEO-friendly redirects for common patterns
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/', req.url), 301);
  }

  // Ensure trailing slashes for better SEO consistency (optional)
  if (
    !pathname.endsWith('/') &&
    !pathname.includes('.') &&
    pathname !== '/' &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`${pathname}/`, req.url), 301);
  }

  // Block access to development/test routes in production
  if (process.env.NODE_ENV === 'production') {
    if (pathname.startsWith('/test-') || pathname === '/template-test') {
      return NextResponse.redirect(new URL('/', req.url), 301);
    }
  }

  // Security headers for better SEO and security
  const response = NextResponse.next();
  
  // Add security headers
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  
  // Add canonical header for better SEO
  if (!pathname.startsWith('/api') && !pathname.startsWith('/_next')) {
    const canonicalUrl = new URL(pathname === '/' ? '/' : pathname.replace(/\/$/, ''), req.url);
    response.headers.set('Link', `<${canonicalUrl.toString()}>; rel="canonical"`);
  }

  return response;
}, {
  // Clerk public routes configuration
  debug: process.env.NODE_ENV === 'development',
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
