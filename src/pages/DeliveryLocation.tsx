import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MapPin, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const DeliveryLocation = () => {
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
          <h1 className="text-4xl font-bold">Delivery Location</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <MapPin className="h-6 w-6" />
              Delivery Address
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Street Address</p>
                <p className="font-medium">{packageData.delivery_address}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">City</p>
                <p className="font-medium">{packageData.delivery_city}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">State</p>
                <p className="font-medium">{packageData.delivery_state}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">ZIP Code</p>
                <p className="font-medium">{packageData.delivery_zip}</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DeliveryLocation;