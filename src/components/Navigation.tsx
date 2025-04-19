
'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useTheme } from './ThemeProvider';

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="bg-white/80 backdrop-blur-md w-full shadow-sm dark:bg-gradient-to-b dark:from-indigo-900 dark:to-purple-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex">
            <div className="flex-shrink-0 flex items-center text-gray-900 dark:text-white">
              <Link href="/" className="flex items-center cursor-pointer">
                <img 
                  src="/images/eslogo-small.png" 
                  alt="Explore Sylva" 
                  className="h-16 w-auto transform hover:scale-105 transition-transform duration-200 cursor-pointer rounded-lg bg-white/90 p-2 dark:bg-white/95 dark:shadow-[0_0_15px_rgba(255,255,255,0.2)] dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.3)]" 
                  onError={(e) => {
                    console.error('Failed to load logo');
                  }}
                />
              </Link>
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center sm:space-x-8">
            <button
              onClick={useTheme().toggleTheme}
              className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              aria-label="Toggle theme"
            >
              {useTheme().theme === 'light' ? (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                </svg>
              ) : (
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                </svg>
              )}
            </button>
            <Link
              href="/"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                isActive('/') 
                  ? 'text-indigo-400 dark:text-indigo-300 border-b-2 border-indigo-400 dark:border-indigo-300'
                  : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/add-business"
              className={`inline-flex items-center px-1 pt-1 text-sm font-medium transition-all duration-200 ${
                isActive('/add-business')
                  ? 'text-indigo-400 dark:text-indigo-300 border-b-2 border-indigo-400 dark:border-indigo-300'
                  : 'text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-300'
              }`}
            >
              Add Business
            </Link>
          </div>
          <div className="sm:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
            >
              <span className="sr-only">Open main menu</span>
              {!isOpen ? (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>
      {isOpen && (
        <div className="sm:hidden fixed top-20 left-0 right-0 z-50 bg-white/95 backdrop-blur-md shadow-lg dark:bg-gray-800/95">
          <div className="p-6 space-y-4">
            <Link
              href="/"
              onClick={() => setIsOpen(false)}
              className={`block text-center px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
                isActive('/')
                  ? 'text-white bg-indigo-600 dark:text-white dark:bg-indigo-500'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-indigo-300'
              }`}
            >
              Home
            </Link>
            <Link
              href="/add-business"
              onClick={() => setIsOpen(false)}
              className={`block text-center px-6 py-4 text-lg font-medium rounded-xl transition-all duration-200 ${
                isActive('/add-business')
                  ? 'text-white bg-indigo-600 dark:text-white dark:bg-indigo-500'
                  : 'text-gray-700 hover:bg-gray-100 hover:text-indigo-600 dark:text-gray-200 dark:hover:bg-gray-700 dark:hover:text-indigo-300'
              }`}
            >
              Add Business
            </Link>
            <div className="border-t border-gray-200 dark:border-gray-700 my-3"></div>
            <button
              onClick={() => {
                useTheme().toggleTheme();
                setIsOpen(false);
              }}
              className="w-full flex items-center justify-between px-4 py-3 text-base font-medium text-gray-700 hover:bg-gray-50 rounded-lg dark:text-gray-200 dark:hover:bg-gray-700/50"
            >
              <span>Theme</span>
              {useTheme().theme === 'light' ? (
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
      )}
    </nav>
  );
}
