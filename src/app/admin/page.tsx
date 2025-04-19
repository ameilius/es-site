'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Business } from '@/types/business';
import { categories } from '@/data/businesses';

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [businesses, setBusinesses] = useState<Business[]>([]);
  const [selectedBusinesses, setSelectedBusinesses] = useState<string[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editingBusiness, setEditingBusiness] = useState<Business | null>(null);

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
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <a 
            href="/"
            className="text-blue-600 hover:text-blue-800 px-4 py-2 rounded-md border border-blue-600 hover:border-blue-800"
          >
            Return to Homepage
          </a>
        </div>
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
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          {successMessage}
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
            <div className="flex gap-2">
              <button
                onClick={() => setEditingBusiness(business)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Edit
              </button>
              <button
                onClick={() => handleDelete(business.id)}
                className="px-3 py-1.5 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {editingBusiness && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-6 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <h2 className="text-2xl font-bold mb-4">Edit Business</h2>
            <form onSubmit={async (e) => {
              e.preventDefault();
              setError(null);
              try {
                const response = await fetch(`/api/businesses/${editingBusiness.id}`, {
                  method: 'PUT',
                  headers: { 'Content-Type': 'application/json' },
                  body: JSON.stringify(editingBusiness),
                });

                const data = await response.json();

                if (!response.ok) {
                  throw new Error(data.error || 'Failed to update business');
                }

                setBusinesses(businesses.map(b => 
                  b.id === data.id ? data : b
                ));
                setEditingBusiness(null);
                setSuccessMessage('Business updated successfully!');
                setTimeout(() => setSuccessMessage(null), 3000);
                // Refresh the businesses list
                fetchBusinesses();
              } catch (error) {
                setError(error instanceof Error ? error.message : 'Failed to update business');
                console.error('Update error:', error);
              }
            }}>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-200">Categories</label>
                  <div className="mt-1 grid grid-cols-2 gap-2">
                    {categories.map((category) => (
                      <label key={category.id} className="inline-flex items-center">
                        <input
                          type="checkbox"
                          checked={editingBusiness.categories?.includes(category.id)}
                          onChange={(e) => {
                            const newCategories = e.target.checked
                              ? [...(editingBusiness.categories || []), category.id]
                              : editingBusiness.categories?.filter(c => c !== category.id) || [];
                            setEditingBusiness({...editingBusiness, categories: newCategories});
                          }}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                        />
                        <span className="ml-2">{category.icon} {category.name}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Name</label>
                  <input
                    type="text"
                    value={editingBusiness.name}
                    onChange={e => setEditingBusiness({...editingBusiness, name: e.target.value})}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Description</label>
                  <textarea
                    value={editingBusiness.description}
                    onChange={e => setEditingBusiness({...editingBusiness, description: e.target.value})}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Address</label>
                  <input
                    type="text"
                    value={editingBusiness.address}
                    onChange={e => setEditingBusiness({...editingBusiness, address: e.target.value})}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Phone</label>
                  <input
                    type="text"
                    value={editingBusiness.phone}
                    onChange={e => setEditingBusiness({...editingBusiness, phone: e.target.value})}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:bg-gray-600"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700">Website</label>
                  <input
                    type="text"
                    value={editingBusiness.website || ''}
                    onChange={e => setEditingBusiness({...editingBusiness, website: e.target.value})}
                    className="mt-1 block w-full rounded-md border-2 border-gray-300 bg-gray-50 px-4 py-2 text-gray-900 shadow-sm focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-500 sm:text-sm dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:bg-gray-600"
                  />
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setEditingBusiness(null)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}