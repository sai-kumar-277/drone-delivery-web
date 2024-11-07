import React, { useState } from 'react';
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

interface LocationMapDialogProps {
  title: string;
  onOpenChange: (open: boolean) => void;
  onSelectLocation: () => void;
  onCurrentLocation: () => void;
  tempCoordinates: { lat: number; lng: number } | null;
  selectedAddress: string;
}

const LocationMapDialog = ({
  title,
  onOpenChange,
  onSelectLocation,
  onCurrentLocation,
  tempCoordinates,
  selectedAddress,
}: LocationMapDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const isGoogleMapsLoaded = useGoogleMapsApi();
  const { toast } = useToast();

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    if (!isGoogleMapsLoaded) {
      toast({
        title: "Error",
        description: "Google Maps is still loading. Please try again in a moment.",
        variant: "destructive"
      });
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        const mapIframe = document.getElementById('location-map') as HTMLIFrameElement;
        if (mapIframe) {
          mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=${import.meta.env.VITE_GOOGLE_MAPS_API_KEY}&q=${location.lat()},${location.lng()}&zoom=15`;
        }
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
    if (!tempCoordinates || !selectedAddress) {
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
              <Button onClick={onSelectLocation} variant="secondary" className="w-full">
                <MapPin className="h-4 w-4 mr-2" />
                Select Pin Location
              </Button>
              <Button onClick={onCurrentLocation} variant="outline" className="w-full">
                <Crosshair className="h-4 w-4 mr-2" />
                Use Current Location
              </Button>
            </div>

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

            {tempCoordinates && (
              <div className="space-y-2">
                <p className="text-sm text-muted-foreground">
                  Selected coordinates: {tempCoordinates.lat.toFixed(6)}, {tempCoordinates.lng.toFixed(6)}
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
        selectedAddress={selectedAddress}
        onConfirm={() => {
          onSelectLocation();
          setShowConfirmDialog(false);
          onOpenChange(false);
        }}
      />
    </>
  );
};

export default LocationMapDialog;