
import { NextResponse } from 'next/server';
import { Business } from '@/types/business';
import { readBusinesses } from '@/utils/businessUtils';
import fs from 'fs/promises';
import path from 'path';
import { geocodeAddress } from '@/utils/geocode';

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
    const filePath = path.join(process.cwd(), 'src', 'data', 'businesses.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const businesses = JSON.parse(fileData);
    
    const index = businesses.findIndex((b: Business) => b.id === params.id);
    if (index === -1) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    const updatedBusiness = await request.json();
    if (updatedBusiness.address && updatedBusiness.address !== businesses[index].address) {
      const coordinates = await geocodeAddress(updatedBusiness.address);
      if (coordinates) {
        updatedBusiness.coordinates = coordinates;
      }
    }

    businesses[index] = { ...businesses[index], ...updatedBusiness };
    await fs.writeFile(filePath, JSON.stringify(businesses, null, 2));

    return NextResponse.json(businesses[index]);
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
    const filePath = path.join(process.cwd(), 'src', 'data', 'businesses.json');
    const fileData = await fs.readFile(filePath, 'utf-8');
    const businesses = JSON.parse(fileData);
    
    const filteredBusinesses = businesses.filter((b: Business) => b.id !== params.id);

    if (filteredBusinesses.length === businesses.length) {
      return NextResponse.json({ error: 'Business not found' }, { status: 404 });
    }

    await fs.writeFile(filePath, JSON.stringify(filteredBusinesses, null, 2));

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error deleting business:', error);
    return NextResponse.json(
      { error: 'Failed to delete business' },
      { status: 500 }
    );
  }
}
