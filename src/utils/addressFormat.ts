export function formatAddress(nominatimAddress: string): string {
  // Split the address into components
  const parts = nominatimAddress.split(', ');

  // Find the street number and name
  let streetAddress = '';

  // Look for parts that might be street numbers/names
  const streetPart = parts.find(p => /\d+.*(?:Street|St|Road|Rd|Avenue|Ave|Lane|Ln|Court|Ct|Drive|Dr|Way|Place|Pl)/i.test(p));
  if (streetPart) {
    streetAddress = streetPart;
  } else {
    // If no street found in expected format, use first two parts
    streetAddress = `${parts[0]} ${parts[1] || ''}`.trim();
  }

  // Fixed values for Sylva addresses
  const city = 'Sylva';
  const state = 'NC';
  const zip = '28779';

  // Combine into desired format: "Street Address, City, 2 Letter State Zip Code"
  return `${streetAddress}, ${city}, ${state} ${zip}`.replace(/\s+/g, ' ').trim();
}