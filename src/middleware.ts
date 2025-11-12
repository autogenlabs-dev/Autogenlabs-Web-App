import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

// Production-safe public routes
const isPublicRoute = createRouteMatcher([
  '/',
  '/sign-in(.*)',
  '/sign-up(.*)',
  '/api/webhooks(.*)',
  '/api/templates(.*)',
  '/about(.*)',
  '/about-us(.*)',
  '/blogs(.*)',
  '/careers(.*)',
  '/contact(.*)',
  '/components(.*)',
  '/docs(.*)',
  '/pricing(.*)',
  '/templates(.*)',
  '/comparison(.*)',
  '/community(.*)',
  '/events(.*)',
  '/feature-requests(.*)',
  '/java-compiler(.*)',
  '/partnerships(.*)',
  '/security(.*)',
  '/seo-analytics(.*)',
  '/template-test(.*)',
  '/test-routing(.*)',
  '/changelog(.*)',
  '/api/auth/provision-user(.*)',
  '/api/extension(.*)',
  '/api/mcp(.*)',
  '/api/seo(.*)',
  '/api/user/api-key(.*)',
  '/api/templates/categories(.*)',
  '/api/templates/stats(.*)',
]);

export default clerkMiddleware((auth, req) => {
  try {
    // Only protect routes that are not public
    if (!isPublicRoute(req)) {
      auth.protect();
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // Don't throw the error, let the request continue
  }
});

export const config = {
  matcher: [
    // Skip all internal paths (_next) and static files
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ]
};
