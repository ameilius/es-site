export interface Business {
  id: string;
  name: string;
  description: string;
  categories: string[];
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

export type BusinessCategory = {
  id: string;
  name: string;
  icon: string;
}; 