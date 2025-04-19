import { NextResponse } from 'next/server';
import { Business } from '@/types/business';
import { readBusinesses } from '@/utils/businessUtils';
import fs from 'fs/promises';
import path from 'path';

// Placeholder for geocoding function - needs implementation
async function geocodeAddress(address: string): Promise<any | null> {
  // Implement geocoding logic here using a service like Google Maps Geocoding API or similar.
  // This example returns a placeholder.  Replace with actual geocoding.
  console.log("Geocoding address:", address);
  return { latitude: 34.0522, longitude: -118.2437 }; //Example coordinates
}


export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const businesses = await readBusinesses();
    const business = businesses.find((b: Business) => b.id === params.id);

    if (!business) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    return NextResponse.json(business);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch business' },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const businesses = await readBusinesses();
    const index = businesses.findIndex((b: Business) => b.id === params.id);

    if (index === -1) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const updatedBusiness = await request.json();

    // If address is being updated, get new coordinates
    if (updatedBusiness.address) {
      const coordinates = await geocodeAddress(updatedBusiness.address);
      if (coordinates) {
        updatedBusiness.coordinates = coordinates;
      }
    }

    const mergedBusiness = { ...businesses[index], ...updatedBusiness };
    businesses[index] = mergedBusiness;

    const filePath = path.join(process.cwd(), 'src', 'data', 'businesses.json');
    await fs.writeFile(filePath, JSON.stringify(businesses, null, 2));

    return NextResponse.json(mergedBusiness);
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to update business' },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const businesses = await readBusinesses();
    const filteredBusinesses = businesses.filter(b => b.id !== params.id);

    if (filteredBusinesses.length === businesses.length) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'businesses.json');
    await fs.writeFile(filePath, JSON.stringify(filteredBusinesses, null, 2));

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting business:', error);
    return NextResponse.json(
      { error: 'Failed to delete business' },
      { status: 500 }
    );
  }
}