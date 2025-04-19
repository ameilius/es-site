
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: 'Address parameter required' }, { status: 400 });
  }

  try {
    const response = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}&countrycodes=us&limit=1`
    );
    
    if (!response.ok) {
      throw new Error('Failed to fetch from Nominatim');
    }

    const data = await response.json();
    
    if (data && data.length > 0) {
      return NextResponse.json({
        lat: data[0].lat,
        lng: data[0].lon
      });
    } else {
      return NextResponse.json({ error: 'Address not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Nominatim proxy error:', error);
    return NextResponse.json({ error: 'Failed to fetch coordinates' }, { status: 500 });
  }
}
