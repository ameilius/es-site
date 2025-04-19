
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const query = searchParams.get('q');

  if (!query) {
    return NextResponse.json({ error: 'Query parameter required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${query}&countrycodes=us&limit=5`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Nominatim');
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error('Nominatim proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch addresses' }, { status: 500 });
  }
}
