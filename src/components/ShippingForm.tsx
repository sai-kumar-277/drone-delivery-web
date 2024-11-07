import React, { useState } from 'react';
import GhostButton from './ui/GhostButton';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import AddressInput from './AddressInput';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from './ui/alert-dialog';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();
  const [pickup, setPickup] = useState<Location>({ address: '', coordinates: null });
  const [delivery, setDelivery] = useState<Location>({ address: '', coordinates: null });
  const [mapType, setMapType] = useState<'pickup' | 'delivery' | null>(null);
  const [tempCoordinates, setTempCoordinates] = useState<Coordinates | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [packageDescription, setPackageDescription] = useState('');
  const [weight, setWeight] = useState('');
  const [date, setDate] = useState('');

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
        } else if (mapType === 'delivery') {
          setDelivery({ address, coordinates: tempCoordinates });
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
              } else if (mapType === 'delivery') {
                setDelivery({ address, coordinates });
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
    setShowConfirmDialog(true);
  };

  const handleConfirmShipment = () => {
    setShowConfirmDialog(false);
    toast({
      title: "Success",
      description: "Shipping request submitted successfully",
    });
    // Here you would typically make an API call to save the shipment
    navigate('/track');
  };

  return (
    <>
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
          <Textarea 
            placeholder="Describe your package" 
            className="bg-background"
            value={packageDescription}
            onChange={(e) => setPackageDescription(e.target.value)}
          />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2">Weight (kg)</label>
            <Input 
              type="number" 
              placeholder="Package weight" 
              className="bg-background"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Preferred Date</label>
            <Input 
              type="date" 
              className="bg-background"
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
        </div>
        <GhostButton type="submit" className="w-full">
          Schedule Pickup
        </GhostButton>
      </form>

      <AlertDialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirm Shipment Details</AlertDialogTitle>
            <AlertDialogDescription className="space-y-4">
              <div className="space-y-2">
                <h4 className="font-semibold">Pickup Address:</h4>
                <p className="text-sm bg-secondary/50 p-2 rounded">{pickup.address}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Delivery Address:</h4>
                <p className="text-sm bg-secondary/50 p-2 rounded">{delivery.address}</p>
              </div>
              <div className="space-y-2">
                <h4 className="font-semibold">Package Details:</h4>
                <p className="text-sm bg-secondary/50 p-2 rounded">
                  Description: {packageDescription}<br />
                  Weight: {weight} kg<br />
                  Preferred Date: {date}
                </p>
              </div>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleConfirmShipment}>Confirm Shipment</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default ShippingForm;