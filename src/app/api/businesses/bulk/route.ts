import { NextResponse } from 'next/server';
import { getBusinesses, clearBusinesses, addBusiness } from '@/lib/businessStore';

export async function DELETE(request: Request) {
  try {
    const { ids } = await request.json();
    const businesses = await getBusinesses();
    const filteredBusinesses = businesses.filter(b => !ids.includes(b.id));
    
    // Clear all businesses and save the filtered list
    await clearBusinesses();
    for (const business of filteredBusinesses) {
      await addBusiness(business);
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting businesses:', error);
    return NextResponse.json(
      { error: 'Failed to delete businesses' },
      { status: 500 }
    );
  }
} 