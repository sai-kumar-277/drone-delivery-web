import React, { useState } from 'react';
import GhostButton from './ui/GhostButton';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin, Crosshair } from 'lucide-react';
import { Button } from './ui/button';
import { useToast } from './ui/use-toast';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface Coordinates {
  lat: number;
  lng: number;
}

interface Location {
  address: string;
  coordinates: Coordinates | null;
}

const ShippingForm = () => {
  const { toast } = useToast();
  const [pickup, setPickup] = useState<Location>({ address: '', coordinates: null });
  const [delivery, setDelivery] = useState<Location>({ address: '', coordinates: null });
  const [mapType, setMapType] = useState<'pickup' | 'delivery' | null>(null);
  const [tempCoordinates, setTempCoordinates] = useState<Coordinates | null>(null);

  const handleMapClick = (e: google.maps.MapMouseEvent) => {
    if (!e.latLng) return;
    
    const coordinates = {
      lat: e.latLng.lat(),
      lng: e.latLng.lng()
    };
    setTempCoordinates(coordinates);
  };

  const handleSelectLocation = () => {
    if (!tempCoordinates) {
      toast({
        title: "Error",
        description: "Please drop a pin on the map first",
        variant: "destructive"
      });
      return;
    }

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: tempCoordinates }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const address = results[0].formatted_address;
        if (mapType === 'pickup') {
          setPickup({ address, coordinates: tempCoordinates });
          toast({
            title: "Pickup location set",
            description: `Coordinates: ${tempCoordinates.lat.toFixed(6)}, ${tempCoordinates.lng.toFixed(6)}`,
          });
        } else if (mapType === 'delivery') {
          setDelivery({ address, coordinates: tempCoordinates });
          toast({
            title: "Delivery location set",
            description: `Coordinates: ${tempCoordinates.lat.toFixed(6)}, ${tempCoordinates.lng.toFixed(6)}`,
          });
        }
      }
    });
  };

  const getCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const coordinates = {
            lat: position.coords.latitude,
            lng: position.coords.longitude
          };
          setTempCoordinates(coordinates);
          
          const geocoder = new google.maps.Geocoder();
          geocoder.geocode({ location: coordinates }, (results, status) => {
            if (status === 'OK' && results?.[0]) {
              const address = results[0].formatted_address;
              if (mapType === 'pickup') {
                setPickup({ address, coordinates });
                toast({
                  title: "Current location set as pickup",
                  description: `Coordinates: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
                });
              } else if (mapType === 'delivery') {
                setDelivery({ address, coordinates });
                toast({
                  title: "Current location set as delivery",
                  description: `Coordinates: ${coordinates.lat.toFixed(6)}, ${coordinates.lng.toFixed(6)}`,
                });
              }
            }
          });
        },
        (error) => {
          toast({
            title: "Error",
            description: "Unable to get current location: " + error.message,
            variant: "destructive"
          });
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!pickup.coordinates || !delivery.coordinates) {
      toast({
        title: "Error",
        description: "Please select both pickup and delivery locations on the map",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Success",
      description: "Shipping request submitted successfully",
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/50 p-8 rounded-lg backdrop-blur-sm">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Pickup Address</label>
          <div className="flex gap-2">
            <Input 
              value={pickup.address}
              onChange={(e) => setPickup({ ...pickup, address: e.target.value })}
              placeholder="Enter pickup address" 
              className="bg-background flex-1" 
            />
            <Dialog onOpenChange={(open) => {
              if (open) {
                setMapType('pickup');
                setTempCoordinates(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Select Pickup Location</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mb-4">
                  <Button onClick={handleSelectLocation} variant="secondary">
                    Select Pin Location
                  </Button>
                  <Button onClick={getCurrentLocation} variant="outline">
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
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Delivery Address</label>
          <div className="flex gap-2">
            <Input 
              value={delivery.address}
              onChange={(e) => setDelivery({ ...delivery, address: e.target.value })}
              placeholder="Enter delivery address" 
              className="bg-background flex-1" 
            />
            <Dialog onOpenChange={(open) => {
              if (open) {
                setMapType('delivery');
                setTempCoordinates(null);
              }
            }}>
              <DialogTrigger asChild>
                <Button variant="outline" size="icon">
                  <MapPin className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl">
                <DialogHeader>
                  <DialogTitle>Select Delivery Location</DialogTitle>
                </DialogHeader>
                <div className="flex gap-2 mb-4">
                  <Button onClick={handleSelectLocation} variant="secondary">
                    Select Pin Location
                  </Button>
                  <Button onClick={getCurrentLocation} variant="outline">
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
          </div>
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium mb-2">Package Description</label>
        <Textarea placeholder="Describe your package" className="bg-background" />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">Weight (kg)</label>
          <Input type="number" placeholder="Package weight" className="bg-background" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Preferred Date</label>
          <Input type="date" className="bg-background" />
        </div>
      </div>
      <GhostButton type="submit" className="w-full">
        Schedule Pickup
      </GhostButton>
    </form>
  );
};

export default ShippingForm;