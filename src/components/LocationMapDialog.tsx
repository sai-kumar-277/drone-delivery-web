import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Crosshair, MapPin, Search } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import { LocationConfirmDialog } from './LocationConfirmDialog';
import { useGoogleMapsApi } from '../hooks/useGoogleMapsApi';
import { useToast } from './ui/use-toast';
import LocationMap from './LocationMap';
import { reverseGeocode, updateMapIframe, type Coordinates } from '@/utils/mapUtils';

interface LocationMapDialogProps {
  title: string;
  onOpenChange: (open: boolean) => void;
  onSelectLocation: (address: string, coordinates: Coordinates) => void;
  onCurrentLocation: () => void;
  tempCoordinates: Coordinates | null;
  selectedAddress: string;
}

const LocationMapDialog = ({
  title,
  onOpenChange,
  onSelectLocation,
  tempCoordinates,
  selectedAddress,
}: LocationMapDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [currentAddress, setCurrentAddress] = useState('');
  const [localCoordinates, setLocalCoordinates] = useState<Coordinates | null>(null);
  const isGoogleMapsLoaded = useGoogleMapsApi();
  const { toast } = useToast();

  useEffect(() => {
    const handleCoordinatesUpdate = async () => {
      if (tempCoordinates) {
        setLocalCoordinates(tempCoordinates);
        updateMapIframe(tempCoordinates);
        const address = await reverseGeocode(tempCoordinates);
        if (address) {
          setCurrentAddress(address);
        }
      }
    };

    handleCoordinatesUpdate();
  }, [tempCoordinates]);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery || !isGoogleMapsLoaded) {
      toast({
        title: "Error",
        description: isGoogleMapsLoaded ? "Please enter a search query" : "Google Maps is still loading",
        variant: "destructive"
      });
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        const coords = {
          lat: location.lat(),
          lng: location.lng()
        };
        updateMapIframe(coords);
        setCurrentAddress(results[0].formatted_address);
        setLocalCoordinates(coords);
      } else {
        toast({
          title: "Error",
          description: "Location not found. Please try a different search.",
          variant: "destructive"
        });
      }
    });
  };

  const handleDone = () => {
    if (!localCoordinates || !currentAddress) {
      toast({
        title: "Error",
        description: "Please select a location first",
        variant: "destructive"
      });
      return;
    }
    setShowConfirmDialog(true);
  };

  return (
    <>
      <Dialog onOpenChange={onOpenChange}>
        <DialogTrigger asChild>
          <Button variant="outline" size="icon" className="h-10 w-10">
            <MapPin className="h-4 w-4" />
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>{title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            <form onSubmit={handleSearch} className="flex gap-2">
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
                onClick={() => {
                  if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(
                      async (position) => {
                        const coords = {
                          lat: position.coords.latitude,
                          lng: position.coords.longitude
                        };
                        setLocalCoordinates(coords);
                        updateMapIframe(coords);
                        const address = await reverseGeocode(coords);
                        if (address) {
                          setCurrentAddress(address);
                        }
                      },
                      (error) => {
                        toast({
                          title: "Error",
                          description: "Unable to retrieve your location",
                          variant: "destructive"
                        });
                      }
                    );
                  }
                }} 
                variant="outline" 
                className="w-full"
              >
                <Crosshair className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>
            </div>

            <LocationMap coordinates={localCoordinates} />

            {localCoordinates && currentAddress && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Selected address: {currentAddress}
                </p>
                <Button onClick={handleDone} className="w-full">
                  Done
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      <LocationConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        selectedAddress={currentAddress}
        onConfirm={() => {
          if (localCoordinates) {
            onSelectLocation(currentAddress, localCoordinates);
            setShowConfirmDialog(false);
            onOpenChange(false);
          }
        }}
      />
    </>
  );
};

export default LocationMapDialog;