import { Business } from '../types/business';
import { geocodeAddress } from '../utils/geocode';
import fetch from 'node-fetch';

const sylvaBusinesses = [
  {
    name: "Innovation Brewing",
    category: "restaurant",
    description: "Local brewery and taproom offering craft beers and pub fare in a relaxed atmosphere.",
    address: "414 W Main St, Sylva, NC 28779",
    phone: "(828) 586-9678",
    website: "https://www.innovation-brewing.com",
    hours: {
      monday: "2:00 PM - 10:00 PM",
      tuesday: "2:00 PM - 10:00 PM",
      wednesday: "2:00 PM - 10:00 PM",
      thursday: "2:00 PM - 10:00 PM",
      friday: "2:00 PM - 11:00 PM",
      saturday: "12:00 PM - 11:00 PM",
      sunday: "12:00 PM - 8:00 PM"
    }
  },
  {
    name: "City Lights Cafe",
    category: "restaurant",
    description: "Cozy cafe serving coffee, breakfast, sandwiches, and local craft beer with occasional live music.",
    address: "3 E Jackson St, Sylva, NC 28779",
    phone: "(828) 587-2233",
    website: "https://www.citylightscafe.com",
    hours: {
      monday: "7:30 AM - 8:00 PM",
      tuesday: "7:30 AM - 8:00 PM",
      wednesday: "7:30 AM - 8:00 PM",
      thursday: "7:30 AM - 8:00 PM",
      friday: "7:30 AM - 8:00 PM",
      saturday: "8:00 AM - 8:00 PM",
      sunday: "9:00 AM - 3:00 PM"
    }
  },
  {
    name: "Lulu's on Main",
    category: "restaurant",
    description: "Eclectic restaurant serving creative American cuisine with vegetarian options in an artistic setting.",
    address: "612 W Main St, Sylva, NC 28779",
    phone: "(828) 586-8989",
    hours: {
      monday: "Closed",
      tuesday: "11:30 AM - 9:00 PM",
      wednesday: "11:30 AM - 9:00 PM",
      thursday: "11:30 AM - 9:00 PM",
      friday: "11:30 AM - 9:00 PM",
      saturday: "11:30 AM - 9:00 PM",
      sunday: "Closed"
    }
  },
  {
    name: "O'Malley's Pub and Grill",
    category: "restaurant",
    description: "Irish pub offering traditional pub fare, craft beers, and sports viewing.",
    address: "701 W Main St, Sylva, NC 28779",
    phone: "(828) 631-0554",
    hours: {
      monday: "11:00 AM - 12:00 AM",
      tuesday: "11:00 AM - 12:00 AM",
      wednesday: "11:00 AM - 12:00 AM",
      thursday: "11:00 AM - 12:00 AM",
      friday: "11:00 AM - 2:00 AM",
      saturday: "11:00 AM - 2:00 AM",
      sunday: "12:00 PM - 12:00 AM"
    }
  },
  {
    name: "White Moon Cafe",
    category: "restaurant",
    description: "Coffee shop and cafe offering breakfast, lunch, and specialty coffee drinks.",
    address: "545 Mill St, Sylva, NC 28779",
    phone: "(828) 631-0591",
    website: "https://www.whitemooncafe.com",
    hours: {
      monday: "7:00 AM - 5:00 PM",
      tuesday: "7:00 AM - 5:00 PM",
      wednesday: "7:00 AM - 5:00 PM",
      thursday: "7:00 AM - 5:00 PM",
      friday: "7:00 AM - 5:00 PM",
      saturday: "8:00 AM - 3:00 PM",
      sunday: "Closed"
    }
  },
  {
    name: "Guadalupe Cafe",
    category: "restaurant",
    description: "Caribbean-inspired restaurant serving tropical fusion cuisine in a historic building.",
    address: "606 W Main St, Sylva, NC 28779",
    phone: "(828) 586-9877",
    website: "https://www.guadalupecafe.com",
    hours: {
      monday: "Closed",
      tuesday: "11:30 AM - 9:00 PM",
      wednesday: "11:30 AM - 9:00 PM",
      thursday: "11:30 AM - 9:00 PM",
      friday: "11:30 AM - 9:00 PM",
      saturday: "11:30 AM - 9:00 PM",
      sunday: "Closed"
    }
  },
  {
    name: "Mad Batter Food & Film",
    category: "restaurant",
    description: "Unique restaurant combining dining with movie screenings, serving American cuisine and craft beer.",
    address: "617 W Main St, Sylva, NC 28779",
    phone: "(828) 586-3555",
    website: "https://www.madbatterfoodandfilm.com",
    hours: {
      monday: "Closed",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 10:00 PM",
      saturday: "11:00 AM - 10:00 PM",
      sunday: "11:00 AM - 3:00 PM"
    }
  },
  {
    name: "Cosmic Carryout",
    category: "restaurant",
    description: "Late-night takeout spot offering burgers, sandwiches, and comfort food.",
    address: "646 W Main St, Sylva, NC 28779",
    phone: "(828) 586-2345",
    hours: {
      monday: "11:00 AM - 9:00 PM",
      tuesday: "11:00 AM - 9:00 PM",
      wednesday: "11:00 AM - 9:00 PM",
      thursday: "11:00 AM - 9:00 PM",
      friday: "11:00 AM - 3:00 AM",
      saturday: "11:00 AM - 3:00 AM",
      sunday: "Closed"
    }
  }
];

async function addBusinesses() {
  for (const business of sylvaBusinesses) {
    try {
      // Geocode the address
      const coordinates = await geocodeAddress(business.address);
      
      if (!coordinates) {
        console.error(`Could not find coordinates for ${business.name}`);
        continue;
      }

      // Create the business object
      const businessToAdd: Business = {
        id: Date.now().toString(),
        name: business.name,
        category: business.category,
        description: business.description,
        address: business.address,
        phone: business.phone,
        website: business.website,
        hours: business.hours,
        coordinates
      };

      // Submit to API
      const response = await fetch('http://localhost:3000/api/businesses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(businessToAdd),
      });

      if (!response.ok) {
        throw new Error(`Failed to add ${business.name}`);
      }

      console.log(`Successfully added ${business.name}`);
      // Add a small delay between requests to avoid rate limiting
      await new Promise(resolve => setTimeout(resolve, 1000));
    } catch (error) {
      console.error(`Error adding ${business.name}:`, error);
    }
  }
}

// Run the script
addBusinesses().catch(console.error); 