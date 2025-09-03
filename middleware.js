import { NextResponse } from 'next/server';

export function middleware(request) {
  const { pathname } = request.nextUrl;

  // SEO-friendly redirects for common patterns
  if (pathname === '/home') {
    return NextResponse.redirect(new URL('/', request.url), 301);
  }

  // Ensure trailing slashes for better SEO consistency (optional)
  if (
    !pathname.endsWith('/') &&
    !pathname.includes('.') &&
    pathname !== '/' &&
    !pathname.startsWith('/api') &&
    !pathname.startsWith('/_next')
  ) {
    return NextResponse.redirect(new URL(`${pathname}/`, request.url), 301);
  }

  // Block access to development/test routes in production
  if (process.env.NODE_ENV === 'production') {
    if (pathname.startsWith('/test-') || pathname === '/template-test') {
      return NextResponse.redirect(new URL('/', request.url), 301);
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
    const canonicalUrl = new URL(pathname === '/' ? '/' : pathname.replace(/\/$/, ''), request.url);
    response.headers.set('Link', `<${canonicalUrl.toString()}>; rel="canonical"`);
  }

  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public files (images, etc.)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|public).*)',
  ],
};
