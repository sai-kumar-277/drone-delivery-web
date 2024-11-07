import React, { useState } from 'react';
import GhostButton from './ui/GhostButton';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { useToast } from './ui/use-toast';
import AddressInput from './AddressInput';
import { ShipmentConfirmDialog } from './ShipmentConfirmDialog';
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

  const handleSelectLocation = () => {
    if (!tempCoordinates) return;

    if (mapType === 'pickup') {
      setPickup(prev => ({ ...prev, coordinates: tempCoordinates }));
    } else if (mapType === 'delivery') {
      setDelivery(prev => ({ ...prev, coordinates: tempCoordinates }));
    }
  };

  const getCurrentLocation = () => {
    if (!navigator.geolocation) {
      toast({
        title: "Error",
        description: "Geolocation is not supported by your browser",
        variant: "destructive"
      });
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const coords = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };
        setTempCoordinates(coords);
      },
      (error) => {
        toast({
          title: "Error",
          description: "Unable to retrieve your location",
          variant: "destructive"
        });
      }
    );
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
    navigate('/track');
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/50 p-4 sm:p-8 rounded-lg backdrop-blur-sm">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
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

        <div className="space-y-2">
          <label className="block text-sm font-medium">Package Description</label>
          <Textarea 
            placeholder="Describe your package" 
            className="bg-background resize-none"
            value={packageDescription}
            onChange={(e) => setPackageDescription(e.target.value)}
          />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium">Weight (kg)</label>
            <Input 
              type="number" 
              placeholder="Package weight" 
              className="bg-background"
              value={weight}
              onChange={(e) => setWeight(e.target.value)}
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium">Preferred Date</label>
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

      <ShipmentConfirmDialog
        open={showConfirmDialog}
        onOpenChange={setShowConfirmDialog}
        details={{
          pickup: pickup.address,
          delivery: delivery.address,
          packageDescription,
          weight,
          date,
        }}
        onConfirm={handleConfirmShipment}
      />
    </>
  );
};

export default ShippingForm;