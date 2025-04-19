
'use client';

import { useEffect, useState } from 'react';

interface InstagramPost {
  id: string;
  media_url: string;
  caption: string;
  permalink: string;
  timestamp: string;
}

export default function InstagramPage() {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('/api/instagram');
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error('Error fetching Instagram posts:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPosts();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center">
            <h1 className="text-3xl font-extrabold text-gray-900 mb-8">Loading Instagram Feed...</h1>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-gray-900">Our Instagram</h1>
          <p className="mt-4 text-lg text-gray-500">
            Follow us <a href="https://instagram.com/exploresylva" className="text-indigo-600 hover:text-indigo-500">@exploresylva</a> for the latest updates!
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <a
              key={post.id}
              href={post.permalink}
              target="_blank"
              rel="noopener noreferrer"
              className="block group"
            >
              <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
                <img
                  src={post.media_url}
                  alt={post.caption}
                  className="object-cover w-full h-full transform group-hover:scale-105 transition-transform duration-200"
                />
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-10 transition-opacity duration-200" />
              </div>
              <p className="mt-2 text-sm text-gray-500 line-clamp-2">{post.caption}</p>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
