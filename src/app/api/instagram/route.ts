
import { NextResponse } from 'next/server';
import axios from 'axios';

const INSTAGRAM_API_URL = 'https://graph.instagram.com/v12.0';

export async function GET() {
  try {
    const response = await axios.get(`${INSTAGRAM_API_URL}/${process.env.INSTAGRAM_BUSINESS_ACCOUNT_ID}/media`, {
      params: {
        fields: 'id,caption,media_type,media_url,permalink,thumbnail_url,timestamp',
        access_token: process.env.INSTAGRAM_ACCESS_TOKEN,
      },
    });

    if (!response.data || !Array.isArray(response.data.data)) {
      console.error('Invalid Instagram API response:', response.data);
      return NextResponse.json({ error: 'Invalid API response format' }, { status: 500 });
    }

    const posts = response.data.data.slice(0, 9).map((post: any) => ({
      id: post.id,
      media_url: post.media_url,
      caption: post.caption || '',
      permalink: post.permalink,
      timestamp: post.timestamp,
    }));

    return NextResponse.json(posts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json({ error: 'Failed to fetch Instagram posts' }, { status: 500 });
  }
}
