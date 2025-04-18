import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

export default withAuth(
  function middleware(req: NextRequest) {
    try {
      return NextResponse.next();
    } catch (error) {
      console.error('Middleware error:', error);
      return NextResponse.redirect(new URL('/admin/login', req.url));
    }
  },
  {
    callbacks: {
      authorized: ({ token, req }: { token: JWT | null; req: NextRequest }): boolean => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        
        // Ensure token exists and has admin role
        return Boolean(token?.role === "admin");
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
}; 