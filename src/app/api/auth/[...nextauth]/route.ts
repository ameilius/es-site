import NextAuth from 'next-auth';
import { authOptions } from '@/lib/auth';

// Hardcoded credentials for testing (remove in production)
const ADMIN_CREDENTIALS = {
  username: 'admin',
  password: 'babaram'
};

const handler = NextAuth(authOptions);

export const GET = handler;
export const POST = handler; 