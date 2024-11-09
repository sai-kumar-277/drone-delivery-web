import React from 'react';
import { Coordinates } from '@/utils/mapUtils';

interface LocationMapProps {
  coordinates: Coordinates | null;
}

const LocationMap: React.FC<LocationMapProps> = () => {
  return (
    <div className="aspect-video rounded-lg overflow-hidden border">
      <iframe
        id="location-map"
        src={`https://www.google.com/maps/embed/v1/view?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&center=20.5937,78.9629&zoom=5`}
        width="100%"
        height="100%"
        style={{ border: 0 }}
        allowFullScreen
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default LocationMap;