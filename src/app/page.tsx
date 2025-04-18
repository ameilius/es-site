'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import Link from 'next/link';
import { categories } from '@/data/businesses';
import { Business } from '@/types/business';

// Dynamically import the Map component to avoid SSR issues with Leaflet
const Map = dynamic(() => import('@/components/Map'), {
  ssr: false,
  loading: () => <p>Loading map...</p>,
});

export default function Home() {
  const [view, setView] = useState<'map' | 'list'>('map');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBusinesses = async () => {
      try {
        const response = await fetch('/api/businesses');
        if (!response.ok) {
          throw new Error('Failed to fetch businesses');
        }
        const data = await response.json();
        setBusinesses(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const filteredBusinesses = businesses.filter((business) => {
    const matchesCategory = selectedCategory === 'all' || business.category === selectedCategory;
    const matchesSearch = business.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      business.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (isLoading) {
    return (
      <main className="min-h-screen p-4">
        <div className="flex justify-center items-center h-[50vh]">
          <p>Loading businesses...</p>
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="min-h-screen p-4">
        <div className="flex justify-center items-center h-[50vh]">
          <p className="text-red-500">Error: {error}</p>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen p-4">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-4xl font-bold">Explore Sylva</h1>
        <Link
          href="/add-business"
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Business
        </Link>
      </div>
      
      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search businesses..."
            className="w-full p-2 border rounded"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <select
            className="p-2 border rounded"
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((category) => (
              <option key={category.id} value={category.id}>
                {category.icon} {category.name}
              </option>
            ))}
          </select>
          <button
            className={`px-4 py-2 rounded ${view === 'map' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setView('map')}
          >
            Map View
          </button>
          <button
            className={`px-4 py-2 rounded ${view === 'list' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
            onClick={() => setView('list')}
          >
            List View
          </button>
        </div>
      </div>

      {filteredBusinesses.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">No businesses found matching your criteria.</p>
        </div>
      ) : view === 'map' ? (
        <div className="h-[600px] w-full">
          <Map businesses={filteredBusinesses} />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredBusinesses.map((business) => (
            <BusinessCard key={business.id} business={business} />
          ))}
        </div>
      )}
    </main>
  );
}

function BusinessCard({ business }: { business: Business }) {
  return (
    <div className="border rounded-lg p-4 hover:shadow-lg transition-shadow">
      <h2 className="text-xl font-semibold mb-2">{business.name}</h2>
      <p className="text-gray-600 mb-2">{business.description}</p>
      <p className="text-sm text-gray-500 mb-2">{business.address}</p>
      <p className="text-sm text-gray-500">{business.phone}</p>
      {business.website && (
        <a
          href={business.website}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline text-sm"
        >
          Visit Website
        </a>
      )}
    </div>
  );
} 