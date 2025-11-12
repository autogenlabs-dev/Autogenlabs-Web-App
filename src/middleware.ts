import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Define public routes that don't require authentication
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/extension/sign-in(.*)',
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
  '/robots.txt',
  '/sitemap.xml',
]);

export default clerkMiddleware((auth, req) => {
  // Only protect non-public routes
  if (!isPublicRoute(req)) {
    auth.protect();
  }
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};