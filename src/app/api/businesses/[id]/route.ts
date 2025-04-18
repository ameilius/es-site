import { NextResponse } from 'next/server';
import { getBusinesses, clearBusinesses, addBusiness } from '@/lib/businessStore';

export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const businesses = await getBusinesses();
    const filteredBusinesses = businesses.filter(b => b.id !== params.id);
    
    // Clear all businesses and save the filtered list
    await clearBusinesses();
    for (const business of filteredBusinesses) {
      await addBusiness(business);
    }
    
    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    console.error('Error deleting business:', error);
    return NextResponse.json(
      { error: 'Failed to delete business' },
      { status: 500 }
    );
  }
} 