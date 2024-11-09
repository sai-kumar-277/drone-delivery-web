import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Plane, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useNavigate } from 'react-router-dom';

const Track = () => {
  const [trackingId, setTrackingId] = useState('');
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId) {
      toast({
        title: "Error",
        description: "Please enter a tracking ID",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Package Status",
      description: "Your package is currently in transit",
    });
  };

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-3xl mx-auto space-y-8">
        <h1 className="text-4xl font-bold text-center mb-8">Track Your Package</h1>
        
        <form onSubmit={handleTracking} className="space-y-4">
          <div className="flex gap-4">
            <Input
              value={trackingId}
              onChange={(e) => setTrackingId(e.target.value)}
              placeholder="Enter your tracking ID"
              className="flex-1"
            />
            <Button type="submit">Track Package</Button>
          </div>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
          <Button
            variant="secondary"
            className="bg-secondary/50 p-6 h-auto flex flex-col items-center gap-4 hover:bg-secondary/60"
            onClick={() => navigate('/package-details')}
          >
            <Package className="text-primary h-12 w-12" />
            <h3 className="text-xl font-bold">Package Details</h3>
            <p className="text-gray-400 text-center">View package information</p>
          </Button>

          <Button
            variant="secondary"
            className="bg-secondary/50 p-6 h-auto flex flex-col items-center gap-4 hover:bg-secondary/60"
            onClick={() => navigate('/live-status')}
          >
            <Plane className="text-primary h-12 w-12" />
            <h3 className="text-xl font-bold">Live Status</h3>
            <p className="text-gray-400 text-center">Real-time tracking updates</p>
          </Button>

          <Button
            variant="secondary"
            className="bg-secondary/50 p-6 h-auto flex flex-col items-center gap-4 hover:bg-secondary/60"
            onClick={() => navigate('/delivery-location')}
          >
            <MapPin className="text-primary h-12 w-12" />
            <h3 className="text-xl font-bold">Delivery Location</h3>
            <p className="text-gray-400 text-center">View delivery address</p>
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Track;