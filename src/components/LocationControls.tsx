import React from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Crosshair, MapPin, Search } from 'lucide-react';
import { toast } from './ui/use-toast';
import { Coordinates, reverseGeocode, updateMapIframe } from '@/utils/mapUtils';

interface LocationControlsProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  onSearch: (e: React.FormEvent) => void;
  setCurrentAddress: (address: string) => void;
  setLocalCoordinates: (coords: Coordinates) => void;
  localCoordinates: Coordinates | null;
  handleDone: () => void;
}

const LocationControls: React.FC<LocationControlsProps> = ({
  searchQuery,
  setSearchQuery,
  onSearch,
  setCurrentAddress,
  setLocalCoordinates,
  localCoordinates,
  handleDone,
}) => {
  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const coords = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setLocalCoordinates(coords);
          updateMapIframe(coords);
          try {
            const address = await reverseGeocode(coords);
            if (address) {
              setCurrentAddress(address);
            } else {
              throw new Error('No address found');
            }
          } catch (error) {
            toast({
              title: "Error",
              description: "Failed to get address for your location",
              variant: "destructive"
            });
          }
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to retrieve your location. Please check your browser permissions.",
            variant: "destructive"
          });
        },
        {
          enableHighAccuracy: true,
          timeout: 5000,
          maximumAge: 0
        }
      );
    } else {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
    }
  };

  return (
    <div className="space-y-4">
      <form onSubmit={onSearch} className="flex gap-2">
        <Input
          type="text"
          placeholder="Search location..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="flex-1"
        />
        <Button type="submit" variant="secondary" size="icon" className="h-10 w-10">
          <Search className="h-4 w-4" />
        </Button>
      </form>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        <Button 
          onClick={handleDone}
          variant="secondary" 
          className="w-full"
          disabled={!localCoordinates}
        >
          <MapPin className="h-4 w-4 mr-2" />
          Select Pin Location
        </Button>
        <Button 
          onClick={handleCurrentLocation} 
          variant="outline" 
          className="w-full"
        >
          <Crosshair className="h-4 w-4 mr-2" />
          Use Current Location
        </Button>
      </div>
    </div>
  );
};

export default LocationControls;