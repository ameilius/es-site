import { NextResponse } from 'next/server';
import { Business } from '@/types/business';
import { readBusinesses } from '@/utils/businessUtils';
import fs from 'fs/promises';
import path from 'path';

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
    businesses[index] = { ...businesses[index], ...updatedBusiness };

    const filePath = path.join(process.cwd(), 'data', 'businesses.json');
    await fs.writeFile(filePath, JSON.stringify(businesses, null, 2));

    return NextResponse.json(businesses[index]);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update business' },
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

    const filePath = path.join(process.cwd(), 'data', 'businesses.json');
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