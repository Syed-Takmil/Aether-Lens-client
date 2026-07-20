import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/app/lib/auth"; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const session = await auth.api.getSession({
    headers: request.headers,
  });

  const user = session?.user;
  const isLoggedIn = !!user;

  // Define route classifications based on your app structure
  const isAuthRoute = pathname.startsWith('/login') || pathname.startsWith('/register');
  const isProtectedItemRoute = pathname.startsWith('/items/');

  // Rule 1: If user is logged in, block them from visiting /login or /register and send them home
  if (isLoggedIn && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rule 2: If user is logged out, block them from /items/* pages and send them to /login
  if (!isLoggedIn && isProtectedItemRoute) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/login',
    '/register',
    '/items/:path*',
  ],
};