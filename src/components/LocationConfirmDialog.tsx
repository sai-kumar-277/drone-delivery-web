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

interface LocationConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  selectedAddress: string;
  onConfirm: () => void;
}

export const LocationConfirmDialog = ({
  open,
  onOpenChange,
  selectedAddress,
  onConfirm,
}: LocationConfirmDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Location</AlertDialogTitle>
          <AlertDialogDescription>
            Is this your selected address?
            <div className="mt-2 p-4 bg-secondary/50 rounded-lg">
              {selectedAddress}
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:space-x-2">
          <AlertDialogCancel className="mt-0">Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onConfirm}>Confirm</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};