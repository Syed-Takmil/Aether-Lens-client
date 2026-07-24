import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from "@/app/lib/auth"; 

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Explicitly forward incoming cookies to the auth headers
  const session = await auth.api.getSession({
    headers: {
      cookie: request.headers.get("cookie") || "",
    },
  });

  const user = session?.user;

  const isAuthRoute = pathname === '/login' || pathname === '/register';
  const isProtectedItemRoute = pathname.startsWith('/items/');

  // Rule 1: Logged-in users cannot access login/signup -> Redirect to home
  if (user && isAuthRoute) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // Rule 2: Logged-out users cannot access item pages -> Redirect to login
  if (!user && isProtectedItemRoute) {
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