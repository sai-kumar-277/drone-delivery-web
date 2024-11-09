import React from 'react';
import { Input } from './ui/input';
import LocationMapDialog from './LocationMapDialog';

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onOpenMapChange: (open: boolean) => void;
  onSelectLocation: (address: string, coordinates: { lat: number; lng: number }) => void;
  tempCoordinates: { lat: number; lng: number } | null;
  dialogTitle: string;
}

const AddressInput = ({
  label,
  value,
  onChange,
  onOpenMapChange,
  onSelectLocation,
  tempCoordinates,
  dialogTitle,
}: AddressInputProps) => {
  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium">{label}</label>
      <div className="flex gap-2 items-start">
        <Input 
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={`Enter ${label.toLowerCase()}`}
          className="bg-background flex-1" 
        />
        <LocationMapDialog
          title={dialogTitle}
          onOpenChange={onOpenMapChange}
          onSelectLocation={onSelectLocation}
          tempCoordinates={tempCoordinates}
          selectedAddress={value}
        />
      </div>
    </div>
  );
};

export default AddressInput;