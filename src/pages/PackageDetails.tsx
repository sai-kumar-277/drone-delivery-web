import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Package, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const PackageDetails = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const packageData = location.state?.packageData;

  if (!packageData) {
    navigate('/track');
    return null;
  }

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/')} 
            className="p-2"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
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
                <p className="font-medium">{packageData.tracking_id}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Weight</p>
                <p className="font-medium">{packageData.weight} kg</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Description</p>
                <p className="font-medium">{packageData.description}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Package Type</p>
                <p className="font-medium">{packageData.type || 'Standard Delivery'}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default PackageDetails;