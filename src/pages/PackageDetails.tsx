import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const PackageDetails = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" onClick={() => navigate('/track')} className="p-2">
            <ArrowLeft className="h-6 w-6" />
          </Button>
          <h1 className="text-4xl font-bold">Package Details</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Package className="h-6 w-6" />
              Package Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Tracking Number</p>
                <p className="font-medium">DRN-123456789</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Weight</p>
                <p className="font-medium">2.5 kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Dimensions</p>
                <p className="font-medium">30cm x 20cm x 15cm</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Type</p>
                <p className="font-medium">Standard Delivery</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageDetails;