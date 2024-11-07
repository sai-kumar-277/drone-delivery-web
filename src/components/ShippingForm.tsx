import React, { useState } from 'react';
import GhostButton from './ui/GhostButton';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import AddressInput from './AddressInput';

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
        <AddressInput
          label="Pickup Address"
          value={pickup.address}
          onChange={(value) => setPickup({ ...pickup, address: value })}
          onOpenMapChange={(open) => {
            if (open) {
              setMapType('pickup');
              setTempCoordinates(null);
            }
          }}
          onSelectLocation={handleSelectLocation}
          onCurrentLocation={getCurrentLocation}
          tempCoordinates={tempCoordinates}
          dialogTitle="Select Pickup Location"
        />
        <AddressInput
          label="Delivery Address"
          value={delivery.address}
          onChange={(value) => setDelivery({ ...delivery, address: value })}
          onOpenMapChange={(open) => {
            if (open) {
              setMapType('delivery');
              setTempCoordinates(null);
            }
          }}
          onSelectLocation={handleSelectLocation}
          onCurrentLocation={getCurrentLocation}
          tempCoordinates={tempCoordinates}
          dialogTitle="Select Delivery Location"
        />
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