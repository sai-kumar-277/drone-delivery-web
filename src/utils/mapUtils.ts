import { toast } from "@/components/ui/use-toast";

export interface Coordinates {
  lat: number;
  lng: number;
}

export const reverseGeocode = async (coords: Coordinates): Promise<string | null> => {
  const geocoder = new google.maps.Geocoder();
  try {
    const result = await geocoder.geocode({
      location: { lat: coords.lat, lng: coords.lng }
    });
    
    if (result.results[0]) {
      return result.results[0].formatted_address;
    }
    return null;
  } catch (error) {
    toast({
      title: "Error",
      description: "Failed to get address for selected location",
      variant: "destructive"
    });
    return null;
  }
};

export const updateMapIframe = (coords: Coordinates) => {
  const mapIframe = document.getElementById('location-map') as HTMLIFrameElement;
  if (mapIframe) {
    mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${coords.lat},${coords.lng}&zoom=15`;
  }
};