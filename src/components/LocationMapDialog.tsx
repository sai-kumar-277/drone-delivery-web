import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { MapPin } from 'lucide-react';
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
import LocationControls from './LocationControls';
import { reverseGeocode, updateMapIframe, type Coordinates } from '@/utils/mapUtils';

interface LocationMapDialogProps {
  title: string;
  onOpenChange: (open: boolean) => void;
  onSelectLocation: (address: string, coordinates: Coordinates) => void;
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
        try {
          const address = await reverseGeocode(tempCoordinates);
          if (address) {
            setCurrentAddress(address);
          }
        } catch (error) {
          toast({
            title: "Error",
            description: "Failed to get address for selected location",
            variant: "destructive"
          });
        }
      }
    };

    handleCoordinatesUpdate();
  }, [tempCoordinates, toast]);

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
          
          <LocationControls
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            onSearch={handleSearch}
            setCurrentAddress={setCurrentAddress}
            setLocalCoordinates={setLocalCoordinates}
            localCoordinates={localCoordinates}
            handleDone={handleDone}
          />

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