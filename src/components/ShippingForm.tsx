import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
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

  const handleSelectLocation = (address: string, coordinates: Coordinates) => {
    if (mapType === 'pickup') {
      setPickup({ address, coordinates });
    } else if (mapType === 'delivery') {
      setDelivery({ address, coordinates });
    }
    setTempCoordinates(null);
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
    if (!packageDescription || !weight || !date) {
      toast({
        title: "Error",
        description: "Please fill in all required fields",
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
            <div className="relative">
              <Input 
                type="date" 
                className="bg-background pr-10"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
              <Calendar 
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                size={20} 
              />
            </div>
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