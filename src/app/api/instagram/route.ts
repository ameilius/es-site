
import { NextResponse } from 'next/server';
import cheerio from 'cheerio';

export async function GET() {
  try {
    const response = await fetch('https://www.instagram.com/exploresylva/');
    const html = await response.text();
    const $ = cheerio.load(html);

    // Find script tags containing shared data
    const scripts = $('script[type="text/javascript"]').get();
    const sharedData = scripts.find(script => 
      $(script).html()?.includes('window._sharedData')
    );

    if (!sharedData) {
      return NextResponse.json([]);
    }

    const jsonData = $(sharedData).html()
      ?.replace('window._sharedData = ', '')
      .replace(/;$/, '');

    if (!jsonData) {
      return NextResponse.json([]);
    }

    const data = JSON.parse(jsonData);
    const posts = data.entry_data?.ProfilePage?.[0]?.graphql?.user?.edge_owner_to_timeline_media?.edges || [];

    const formattedPosts = posts.slice(0, 9).map((post: any) => ({
      imageUrl: post.node.display_url,
      caption: post.node.edge_media_to_caption?.edges?.[0]?.node?.text || '',
      link: `https://www.instagram.com/p/${post.node.shortcode}/`
    }));

    return NextResponse.json(formattedPosts);
  } catch (error) {
    console.error('Error fetching Instagram posts:', error);
    return NextResponse.json([]);
  }
}
