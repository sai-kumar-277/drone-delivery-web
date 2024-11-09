import React, { useState } from 'react';
import { useToast } from './ui/use-toast';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';
import GhostButton from './ui/GhostButton';
import { ShipmentConfirmDialog } from './ShipmentConfirmDialog';
import ShippingFormFields from './ShippingFormFields';
import { generateTrackingId, submitShipmentToSupabase } from '@/utils/shippingUtils';

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
  const [calendarDate, setCalendarDate] = useState<Date>();

  const handleSelectLocation = (address: string, coordinates: Coordinates) => {
    if (mapType === 'pickup') {
      setPickup({ address, coordinates });
    } else if (mapType === 'delivery') {
      setDelivery({ address, coordinates });
    }
    setTempCoordinates(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
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

  const handleConfirmShipment = async () => {
    try {
      const trackingId = generateTrackingId();
      await submitShipmentToSupabase(
        trackingId,
        pickup.address,
        delivery.address,
        date
      );

      setShowConfirmDialog(false);
      toast({
        title: "Success",
        description: "Shipping request submitted successfully",
      });
      navigate('/track');
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to submit shipping request",
        variant: "destructive"
      });
    }
  };

  const handleDateSelect = (selectedDate: Date | undefined) => {
    setCalendarDate(selectedDate);
    if (selectedDate) {
      setDate(format(selectedDate, 'yyyy-MM-dd'));
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6 bg-secondary/50 p-4 sm:p-8 rounded-lg backdrop-blur-sm">
        <ShippingFormFields
          pickup={pickup}
          delivery={delivery}
          packageDescription={packageDescription}
          weight={weight}
          date={date}
          calendarDate={calendarDate}
          onPickupChange={setPickup}
          onDeliveryChange={setDelivery}
          onDescriptionChange={setPackageDescription}
          onWeightChange={setWeight}
          onDateSelect={handleDateSelect}
          onDateChange={setDate}
          onMapTypeChange={(open, type) => {
            if (open) {
              setMapType(type);
              setTempCoordinates(null);
            }
          }}
          onLocationSelect={handleSelectLocation}
          tempCoordinates={tempCoordinates}
        />

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