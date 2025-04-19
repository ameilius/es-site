// Geocoding functionality removed 
export async function geocodeAddress(address: string) {
  try {
    const response = await fetch(`/api/nominatim?address=${encodeURIComponent(address)}`);
    const data = await response.json();
    
    if (!data.lat || !data.lng) {
      throw new Error('Could not geocode address');
    }
    
    return {
      lat: parseFloat(data.lat),
      lng: parseFloat(data.lng)
    };
  } catch (error) {
    console.error('Geocoding error:', error);
    throw error;
  }
}
