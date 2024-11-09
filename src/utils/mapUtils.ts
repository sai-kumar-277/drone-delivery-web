import { toast } from "@/components/ui/use-toast";

export interface Coordinates {
  lat: number;
  lng: number;
}

export const reverseGeocode = async (coords: Coordinates): Promise<string | null> => {
  const geocoder = new google.maps.Geocoder();
  try {
    const result = await new Promise<google.maps.GeocoderResult[]>((resolve, reject) => {
      geocoder.geocode({ location: { lat: coords.lat, lng: coords.lng } }, (results, status) => {
        if (status === 'OK' && results && results.length > 0) {
          resolve(results);
        } else {
          reject(new Error('Geocoding failed'));
        }
      });
    });
    
    if (result[0]) {
      return result[0].formatted_address;
    }
    throw new Error('No address found');
  } catch (error) {
    console.error('Reverse geocoding error:', error);
    return null;
  }
};

export const updateMapIframe = (coords: Coordinates) => {
  const mapIframe = document.getElementById('location-map') as HTMLIFrameElement;
  if (mapIframe) {
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${coords.lat},${coords.lng}&zoom=15`;
  }
};