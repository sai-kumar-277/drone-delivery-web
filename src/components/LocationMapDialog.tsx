import React from 'react';
import { Button } from './ui/button';
import { Crosshair, MapPin } from 'lucide-react';
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
        <div className="flex gap-2 mb-4">
          <Button onClick={onSelectLocation} variant="secondary">
            Select Pin Location
          </Button>
          <Button onClick={onCurrentLocation} variant="outline">
            <Crosshair className="h-4 w-4 mr-2" />
            Use Current Location
          </Button>
        </div>
        <div className="aspect-video">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d387193.30596073366!2d-74.25986548248784!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1709655733346!5m2!1sen!2sus"
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />
        </div>
        {tempCoordinates && (
          <p className="text-sm text-muted-foreground mt-2">
            Selected coordinates: {tempCoordinates.lat.toFixed(6)}, {tempCoordinates.lng.toFixed(6)}
          </p>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default LocationMapDialog;