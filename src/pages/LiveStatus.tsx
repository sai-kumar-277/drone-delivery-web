import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Plane, ArrowLeft } from 'lucide-react';
import { useNavigate, useLocation } from 'react-router-dom';

const LiveStatus = () => {
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
          <h1 className="text-4xl font-bold">Live Status</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Plane className="h-6 w-6" />
              Drone Status
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-muted-foreground">Current Status</p>
                <p className="font-medium">{packageData.status}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Estimated Time</p>
                <p className="font-medium">{packageData.estimated_time} minutes</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Current Speed</p>
                <p className="font-medium">{packageData.current_speed || '35'} km/h</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Distance Remaining</p>
                <p className="font-medium">{packageData.distance_remaining || '8.5'} km</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LiveStatus;