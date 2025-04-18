import { NextResponse } from 'next/server';
import { Business } from '@/types/business';
import { getBusinesses, addBusiness, clearBusinesses } from '@/lib/businessStore';

export async function POST(request: Request) {
  try {
    const business: Business = await request.json();
    console.log('Received business to save:', business);
    
    await addBusiness(business);
    console.log('Business added successfully');
    
    return NextResponse.json({ success: true, business }, { status: 201 });
  } catch (error) {
    console.error('Error saving business:', error);
    return NextResponse.json(
      { error: 'Failed to save business' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const businesses = await getBusinesses();
    console.log('Returning businesses:', businesses);
    return NextResponse.json(businesses);
  } catch (error) {
    console.error('Error reading businesses:', error);
    return NextResponse.json(
      { error: 'Failed to fetch businesses' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    await clearBusinesses();
    console.log('All businesses cleared');
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error clearing businesses:', error);
    return NextResponse.json(
      { error: 'Failed to clear businesses' },
      { status: 500 }
    );
  }
} 