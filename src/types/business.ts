export interface Business {
  id: string;
  name: string;
  description?: string;
  categories: string[];
  address: string;
  phone: string;
  website?: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  imageUrl?: string;
  hours?: {
    [key: string]: string;
  };
}

export type BusinessCategory = {
  id: string;
  name: string;
  icon: string;
};