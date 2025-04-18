import NextAuth, { type NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { JWT } from 'next-auth/jwt';
import { Session } from 'next-auth';

// Hardcoded credentials for testing (remove in production)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'babaram'
};

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          if (!credentials?.username || !credentials?.password) {
            throw new Error('Please enter both username and password');
          }

          // First try environment variables
          const envUsername = process.env.ADMIN_USERNAME;
          const envPassword = process.env.ADMIN_PASSWORD;

          // If environment variables are set, use them
          if (envUsername && envPassword) {
            if (credentials.username === envUsername && 
                credentials.password === envPassword) {
              return {
                id: '1',
                name: 'Admin',
                email: 'admin@example.com',
                role: 'admin'
              };
            }
          }

          // Fallback to hardcoded credentials (remove in production)
          if (credentials.username === ADMIN_CREDENTIALS.username && 
              credentials.password === ADMIN_CREDENTIALS.password) {
            return {
              id: '1',
              name: 'Admin',
              email: 'admin@example.com',
              role: 'admin'
            };
          }

          throw new Error('Invalid credentials');
        } catch (error) {
          console.error('Authentication error:', error);
          throw error;
        }
      }
    })
  ],
  pages: {
    signIn: '/admin/login',
    error: '/auth/error',
  },
  session: {
    strategy: 'jwt' as const,
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async jwt({ token, user }: { token: JWT; user?: any }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      if (session.user) {
        session.user.role = token.role as string;
      }
      return session;
    }
  },
  secret: process.env.NEXTAUTH_SECRET || 'yGq4fOFooycN4RoeRu/Wm9MaoX6y5Dn4n+BqeMIlPEQ=',
  debug: process.env.NODE_ENV === 'development',
  session: {
    strategy: 'jwt',
  },
}; 