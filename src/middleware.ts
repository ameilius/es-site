import { auth } from '@/auth';
import { NextResponse } from 'next/server';

export default auth((req) => {
  const isAdminRoute = req.nextUrl.pathname.startsWith('/admin');
  const isAuthRoute = req.nextUrl.pathname.startsWith('/admin/login');

  if (isAdminRoute && !isAuthRoute) {
    const session = req.auth;
    if (session?.user?.role !== 'admin') {
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ['/admin/:path*'],
}; 