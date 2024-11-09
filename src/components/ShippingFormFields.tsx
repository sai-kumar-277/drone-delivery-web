import React from 'react';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Calendar } from './ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { format } from 'date-fns';
import AddressInput from './AddressInput';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Button } from './ui/button';
import { cn } from '@/lib/utils';

interface ShippingFormFieldsProps {
  pickup: { address: string; coordinates: { lat: number; lng: number } | null };
  delivery: { address: string; coordinates: { lat: number; lng: number } | null };
  packageDescription: string;
  weight: string;
  date: string;
  calendarDate: Date | undefined;
  onPickupChange: (value: any) => void;
  onDeliveryChange: (value: any) => void;
  onDescriptionChange: (value: string) => void;
  onWeightChange: (value: string) => void;
  onDateSelect: (date: Date | undefined) => void;
  onDateChange: (value: string) => void;
  onMapTypeChange: (open: boolean, type: 'pickup' | 'delivery') => void;
  onLocationSelect: (address: string, coordinates: { lat: number; lng: number }) => void;
  tempCoordinates: { lat: number; lng: number } | null;
}

const ShippingFormFields: React.FC<ShippingFormFieldsProps> = ({
  pickup,
  delivery,
  packageDescription,
  weight,
  date,
  calendarDate,
  onPickupChange,
  onDeliveryChange,
  onDescriptionChange,
  onWeightChange,
  onDateSelect,
  onDateChange,
  onMapTypeChange,
  onLocationSelect,
  tempCoordinates,
}) => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AddressInput
          label="Pickup Address"
          value={pickup.address}
          onChange={(value) => onPickupChange({ ...pickup, address: value })}
          onOpenMapChange={(open) => onMapTypeChange(open, 'pickup')}
          onSelectLocation={onLocationSelect}
          tempCoordinates={tempCoordinates}
          dialogTitle="Select Pickup Location"
        />
        <AddressInput
          label="Delivery Address"
          value={delivery.address}
          onChange={(value) => onDeliveryChange({ ...delivery, address: value })}
          onOpenMapChange={(open) => onMapTypeChange(open, 'delivery')}
          onSelectLocation={onLocationSelect}
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
          onChange={(e) => onDescriptionChange(e.target.value)}
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
            onChange={(e) => onWeightChange(e.target.value)}
          />
        </div>
        <div className="space-y-2">
          <label className="block text-sm font-medium">Preferred Date</label>
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="outline"
                className={cn(
                  "w-full justify-start text-left font-normal",
                  !date && "text-muted-foreground"
                )}
              >
                <CalendarIcon className="mr-2 h-4 w-4" />
                {date ? format(new Date(date), "PPP") : <span>Pick a date</span>}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={calendarDate}
                onSelect={onDateSelect}
                initialFocus
              />
            </PopoverContent>
          </Popover>
        </div>
      </div>
    </>
  );
};

export default ShippingFormFields;