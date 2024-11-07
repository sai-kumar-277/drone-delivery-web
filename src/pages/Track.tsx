import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Package, Plane, MapPin } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Track = () => {
  const [trackingId, setTrackingId] = useState('');
  const { toast } = useToast();

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
    // Here you would typically make an API call to fetch tracking data
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
          <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
            <Package className="text-primary h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">Package Details</h3>
            <p className="text-gray-400 text-center mt-2">View package information</p>
          </div>
          <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
            <Plane className="text-primary h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">Live Status</h3>
            <p className="text-gray-400 text-center mt-2">Real-time tracking updates</p>
          </div>
          <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
            <MapPin className="text-primary h-12 w-12 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-center">Delivery Location</h3>
            <p className="text-gray-400 text-center mt-2">View delivery address</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Track;