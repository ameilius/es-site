'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Business } from '@/types/business';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/admin/login');
    }
  }, [status, router]);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchBusinesses();
    }
  }, [status]);

  const fetchBusinesses = async () => {
    try {
      const response = await fetch('/api/businesses');
      if (!response.ok) throw new Error('Failed to fetch businesses');
      const data = await response.json();
      setBusinesses(data);
    } catch (error) {
      setError('Failed to load businesses');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/businesses/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete business');
      setBusinesses(businesses.filter(b => b.id !== id));
      setSelectedBusinesses(selectedBusinesses.filter(b => b !== id));
    } catch (error) {
      setError('Failed to delete business');
    }
  };

  const handleBulkDelete = async () => {
    try {
      const response = await fetch('/api/businesses/bulk', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ids: selectedBusinesses }),
      });
      if (!response.ok) throw new Error('Failed to delete businesses');
      setBusinesses(businesses.filter(b => !selectedBusinesses.includes(b.id)));
      setSelectedBusinesses([]);
    } catch (error) {
      setError('Failed to delete businesses');
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedBusinesses(prev =>
      prev.includes(id)
        ? prev.filter(b => b !== id)
        : [...prev, id]
    );
  };

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'unauthenticated') {
    return null;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <button
          onClick={handleBulkDelete}
          disabled={selectedBusinesses.length === 0}
          className="bg-red-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          Delete Selected ({selectedBusinesses.length})
        </button>
      </div>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      <div className="grid gap-4">
        {businesses.map(business => (
          <div
            key={business.id}
            className="border rounded-lg p-4 flex items-center justify-between"
          >
            <div className="flex items-center space-x-4">
              <input
                type="checkbox"
                checked={selectedBusinesses.includes(business.id)}
                onChange={() => toggleSelect(business.id)}
                className="h-4 w-4"
              />
              <div>
                <h2 className="text-xl font-semibold">{business.name}</h2>
                <p className="text-gray-600">{business.address}</p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(business.id)}
              className="text-red-500 hover:text-red-700"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
} 