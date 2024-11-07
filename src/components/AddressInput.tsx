import React from 'react';
import { Input } from './ui/input';
import LocationMapDialog from './LocationMapDialog';

interface AddressInputProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
  onOpenMapChange: (open: boolean) => void;
  onSelectLocation: () => void;
  onCurrentLocation: () => void;
  tempCoordinates: { lat: number; lng: number } | null;
  dialogTitle: string;
}

const AddressInput = ({
  label,
  value,
  onChange,
  onOpenMapChange,
  onSelectLocation,
  onCurrentLocation,
  tempCoordinates,
  dialogTitle,
}: AddressInputProps) => {
  return (
    <div>
      <label className="block text-sm font-medium mb-2">{label}</label>
      <div className="flex gap-2">
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
          onCurrentLocation={onCurrentLocation}
          tempCoordinates={tempCoordinates}
        />
      </div>
    </div>
  );
};

export default AddressInput;