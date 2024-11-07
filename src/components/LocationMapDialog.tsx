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

interface LocationMapDialogProps {
  title: string;
  onOpenChange: (open: boolean) => void;
  onSelectLocation: () => void;
  onCurrentLocation: () => void;
  tempCoordinates: { lat: number; lng: number } | null;
}

const LocationMapDialog = ({
  title,
  onOpenChange,
  onSelectLocation,
  onCurrentLocation,
  tempCoordinates,
}: LocationMapDialogProps) => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery) return;

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ address: searchQuery }, (results, status) => {
      if (status === 'OK' && results && results[0]) {
        const location = results[0].geometry.location;
        const mapIframe = document.getElementById('location-map') as HTMLIFrameElement;
        if (mapIframe) {
          mapIframe.src = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${location.lat()},${location.lng()}&zoom=15`;
        }
      }
    });
  };

  return (
    <Dialog onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon">
          <MapPin className="h-4 w-4" />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
        </DialogHeader>
        
        <div className="space-y-4">
          {/* Search Form */}
          <form onSubmit={handleSearch} className="flex gap-2">
            <Input
              type="text"
              placeholder="Search location..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" variant="secondary">
              <Search className="h-4 w-4" />
            </Button>
          </form>

          {/* Action Buttons - Now positioned above the map */}
          <div className="flex gap-2">
            <Button onClick={onSelectLocation} variant="secondary" className="flex-1">
              <MapPin className="h-4 w-4 mr-2" />
              Select Pin Location
            </Button>
            <Button onClick={onCurrentLocation} variant="outline" className="flex-1">
              <Crosshair className="h-4 w-4 mr-2" />
              Use Current Location
            </Button>
          </div>

          {/* Map Container */}
          <div className="aspect-video rounded-lg overflow-hidden border">
            <iframe
              id="location-map"
              src="https://www.google.com/maps/embed/v1/view?key=YOUR_API_KEY&center=20.5937,78.9629&zoom=5"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>

          {/* Coordinates Display */}
          {tempCoordinates && (
            <p className="text-sm text-muted-foreground">
              Selected coordinates: {tempCoordinates.lat.toFixed(6)}, {tempCoordinates.lng.toFixed(6)}
            </p>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LocationMapDialog;