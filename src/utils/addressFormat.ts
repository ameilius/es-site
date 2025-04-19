
export function formatAddress(nominatimAddress: string): string {
  // Split the address into components
  const parts = nominatimAddress.split(', ');
  
  // Find the street number and name
  let streetNumber = '';
  let streetName = '';
  
  // Look for parts that might be street numbers/names
  const streetPart = parts.find(p => /\d+.*(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Court|Ct|Drive|Dr|Way|Place|Pl)/i.test(p));
  if (streetPart) {
    const match = streetPart.match(/^(\d+)\s+(.+)$/);
    if (match) {
      streetNumber = match[1];
      streetName = match[2];
    }
  }

  // If no street found in expected format, use first two parts
  if (!streetNumber && !streetName) {
    streetNumber = parts[0];
    streetName = parts[1] || '';
  }

  // Find city (Sylva)
  const city = 'Sylva';
  
  // Find zip code
  const zip = parts.find(p => /^28779$/.test(p)) || '28779';
  
  // State
  const state = 'NC';

  // Combine into desired format
  return `${streetNumber} ${streetName}, ${city}, ${state} ${zip}`.replace(/\s+/g, ' ').trim();
}
