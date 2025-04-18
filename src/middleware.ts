import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { JWT } from "next-auth/jwt";

export default withAuth(
  function middleware(req: NextRequest) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }: { token: JWT | null; req: NextRequest }) => {
        // Allow access to login page without authentication
        if (req.nextUrl.pathname === '/admin/login') {
          return true;
        }
        return token?.role === "admin";
      },
    },
  }
);

export const config = {
  matcher: ["/admin/:path*"],
}; 