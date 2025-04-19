'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const pathname = usePathname();
  const { theme, toggleTheme } = useTheme();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md w-full shadow-sm dark:bg-gradient-to-b dark:from-indigo-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20 space-x-4">
          <Link href="/" className="flex-shrink-0 flex items-center">
            <img 
              src="/images/eslogo-small.png" 
              alt="Explore Sylva" 
              className="h-16 w-auto transform hover:scale-105 transition-transform duration-200 cursor-pointer rounded-lg bg-white/90 p-2 dark:bg-white/95 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
              onError={(e) => {
                console.error('Failed to load logo');
              }}
            />
          </Link>

          <div className="flex items-center space-x-4">
            <Link
              href="/"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-indigo-400 dark:text-indigo-300'
                  : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/add-business"
              className={`text-sm font-medium transition-all duration-200 ${
                isActive('/add-business')
                  ? 'text-indigo-400 dark:text-indigo-300'
                  : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              Add Business
            </Link>
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {theme === 'light' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}