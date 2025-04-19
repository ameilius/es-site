
'use client';

import { useEffect, useRef } from 'react';
import { useTheme } from './ThemeProvider';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import MarkerClusterGroup from '@changey/react-leaflet-markercluster';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import '@changey/react-leaflet-markercluster/dist/styles.min.css';
import { Business } from '@/types/business';
import { categories } from '@/data/businesses';

const DefaultIcon = L.icon({
  iconUrl: '/images/marker-icon.png',
  iconRetinaUrl: '/images/marker-icon-2x.png',
  shadowUrl: '/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface MapProps {
  businesses: Business[];
}

export default function Map({ businesses }: MapProps) {
  const mapRef = useRef<L.Map>(null);

  useEffect(() => {
    if (mapRef.current && businesses.length > 0) {
      const bounds = L.latLngBounds(
        businesses.map((business) => [business.coordinates.lat, business.coordinates.lng])
      );
      mapRef.current.fitBounds(bounds);
    }
  }, [businesses]);

  return (
    <MapContainer
      center={[35.3732, -83.2226]}
      zoom={15}
      style={{ height: '100%', width: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MarkerClusterGroup
        chunkedLoading
        maxClusterRadius={40}
        spiderfyOnMaxZoom={true}
        showCoverageOnHover={false}
      >
        {businesses.map((business) => (
          <Marker
            key={business.id}
            position={[business.coordinates.lat, business.coordinates.lng]}
          >
            <Popup>
              <div>
                <h3 className="font-bold">{business.name}</h3>
                <div className="flex flex-wrap gap-2 items-center text-sm text-gray-500 my-2">
                  {business.categories?.map(catId => {
                    const category = categories.find(cat => cat.id === catId);
                    return category ? (
                      <div key={catId} className="flex items-center bg-gray-100 px-2 py-1 rounded">
                        <span className="mr-1">{category.icon}</span>
                        <span>{category.name}</span>
                      </div>
                    ) : null;
                  })}
                </div>
                <p>{business.address}</p>
                <p>{business.phone}</p>
                {business.website && (
                  <a
                    href={business.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-500 hover:underline"
                  >
                    Visit Website
                  </a>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
      </MarkerClusterGroup>
    </MapContainer>
  );
}
