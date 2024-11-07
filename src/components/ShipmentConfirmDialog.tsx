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

interface ShipmentDetails {
  pickup: string;
  delivery: string;
  packageDescription: string;
  weight: string;
  date: string;
}

interface ShipmentConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: ShipmentDetails;
  onConfirm: () => void;
}

export const ShipmentConfirmDialog = ({
  open,
  onOpenChange,
  details,
  onConfirm,
}: ShipmentConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent className="max-w-lg">
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Shipment Details</AlertDialogTitle>
          <AlertDialogDescription className="space-y-4">
            <div className="space-y-2">
              <h4 className="font-semibold">Pickup Address:</h4>
              <p className="text-sm bg-secondary/50 p-3 rounded-lg">{details.pickup}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Delivery Address:</h4>
              <p className="text-sm bg-secondary/50 p-3 rounded-lg">{details.delivery}</p>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">Package Details:</h4>
              <div className="text-sm bg-secondary/50 p-3 rounded-lg space-y-1">
                <p><span className="font-medium">Description:</span> {details.packageDescription}</p>
                <p><span className="font-medium">Weight:</span> {details.weight} kg</p>
                <p><span className="font-medium">Preferred Date:</span> {details.date}</p>
              </div>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-2">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm Shipment</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};