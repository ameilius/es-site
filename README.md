# Explore Sylva

A modern web application for showcasing local businesses in Sylva, NC and surrounding areas, featuring an interactive map and list view.

## Features

- Interactive map using OpenStreetMap
- Toggle between map and list views
- Search and filter businesses
- Category-based filtering
- Responsive design
- Business details with contact information

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Adding Businesses

To add new businesses, edit the `src/data/businesses.ts` file. Each business should follow this structure:

```typescript
{
  id: string;
  name: string;
  description: string;
  category: string;
  address: string;
  phone: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  hours?: {
    [key: string]: string;
  };
  imageUrl?: string;
}
```

## Technologies Used

- Next.js
- TypeScript
- Tailwind CSS
- Leaflet (for maps)
- React Leaflet

## Contributing

Feel free to submit issues and enhancement requests! 