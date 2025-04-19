
export function formatAddress(nominatimAddress: string): string {
  // Split the address into components
  const parts = nominatimAddress.split(', ');
  
  // Extract components (assuming Nominatim format)
  const streetNumber = parts[0];
  const streetName = parts[1];
  const city = parts.find(p => p === 'Sylva') || '';
  const state = 'NC';
  const zip = parts.find(p => p.match(/^\d{5}$/)) || '';

  // Combine street number and name
  const street = `${streetNumber} ${streetName}`;
  
  // Format in desired pattern
  return `${street}, ${city}, ${state} ${zip}`;
}
