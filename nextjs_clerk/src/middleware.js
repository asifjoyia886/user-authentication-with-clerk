import { clerkMiddleware } from '@clerk/nextjs/server';
import { NextResponse } from 'next/server';

// Protect these base paths
const protectedRoutes = ['/dashboard(.*)', '/contact(.*)','/posts(.*)'];

export default clerkMiddleware((auth, req) => {
  const pathname = req.nextUrl?.pathname || '';

  const requiresAuth = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  if (requiresAuth) {
    return auth.protect();
  }

  return NextResponse.next();
});

export const config = {
  matcher: [
    '/((?!_next|.*\\..*|favicon.ico).*)',
    '/(api|trpc)(.*)',
  ],
};
