'use client';

import { useSearchParams } from 'next/navigation';

// This page needs to be dynamic since it uses useSearchParams
export const dynamic = 'force-dynamic';

export default function ErrorPage() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            Authentication Error
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {error === 'CredentialsSignin' && 'Invalid username or password'}
            {error !== 'CredentialsSignin' && 'An error occurred during authentication'}
          </p>
        </div>
        <div className="text-center">
          <a
            href="/admin/login"
            className="font-medium text-indigo-600 hover:text-indigo-500"
          >
            Return to login
          </a>
        </div>
      </div>
    </div>
  );
} 