
# Explore Sylva Business Directory

A Next.js application showcasing local businesses in Sylva, NC with an interactive map interface and administrative capabilities.

## Features

- Interactive map showing business locations
- Category-based business filtering
- Business details including hours, contact info, and descriptions
- Mobile-responsive design
- Admin dashboard for managing business listings
- Secure authentication for admin access

## Tech Stack

- Next.js 14 with App Router
- TypeScript
- Tailwind CSS
- Leaflet for maps
- NextAuth.js for authentication
- JSON file-based data storage

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables in `.env`:
   ```
   NEXTAUTH_URL=your-app-url
   NEXTAUTH_SECRET=your-secret
   ADMIN_USERNAME=your-admin-username
   ADMIN_PASSWORD=your-admin-password
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Usage

- Visit `/` to view the business directory and map
- Visit `/admin` to access the admin dashboard (requires authentication)
- Visit `/add-business` to submit a new business listing

## Categories

The directory currently supports these business categories:
- Restaurants
- Breweries
- Bars
- Shopping
- Services
- Entertainment
- Outdoors
- Lodging
- Arts & Culture

## Deployment

This application is deployed on Replit. The deployment process is automated via GitHub Actions and handles both the build and deployment steps.

## License

MIT License
