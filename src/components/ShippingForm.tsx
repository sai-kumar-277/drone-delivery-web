import React, { useState } from 'react';
import GhostButton from './ui/GhostButton';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';

interface MapClickEvent {
  latLng?: google.maps.LatLng;
}

const ShippingForm = () => {
  const [pickupAddress, setPickupAddress] = useState('');
  const [deliveryAddress, setDeliveryAddress] = useState('');
  const [mapType, setMapType] = useState<'pickup' | 'delivery' | null>(null);

  const handleMapClick = (e: MapClickEvent) => {
    if (!e.latLng) return;
    
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ location: e.latLng }, (results, status) => {
      if (status === 'OK' && results?.[0]) {
        const address = results[0].formatted_address;
        if (mapType === 'pickup') {
          setPickupAddress(address);
        } else if (mapType === 'delivery') {
          setDeliveryAddress(address);
        }
      }
    });
  };

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-8">Schedule a Pickup</h2>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6 bg-secondary/50 p-8 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Pickup Address</label>
              <div className="flex gap-2">
                <Input 
                  value={pickupAddress}
                  onChange={(e) => setPickupAddress(e.target.value)}
                  placeholder="Enter pickup address" 
                  className="bg-background flex-1" 
                />
                <Dialog onOpenChange={(open) => {
                  if (open) setMapType('pickup');
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Select Pickup Location</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video mt-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d387193.30596073366!2d-74.25986548248784!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1709655733346!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Delivery Address</label>
              <div className="flex gap-2">
                <Input 
                  value={deliveryAddress}
                  onChange={(e) => setDeliveryAddress(e.target.value)}
                  placeholder="Enter delivery address" 
                  className="bg-background flex-1" 
                />
                <Dialog onOpenChange={(open) => {
                  if (open) setMapType('delivery');
                }}>
                  <DialogTrigger asChild>
                    <Button variant="outline" size="icon">
                      <MapPin className="h-4 w-4" />
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-3xl">
                    <DialogHeader>
                      <DialogTitle>Select Delivery Location</DialogTitle>
                    </DialogHeader>
                    <div className="aspect-video mt-4">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m14!1m12!1m3!1d387193.30596073366!2d-74.25986548248784!3d40.69714941932609!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!5e0!3m2!1sen!2sus!4v1709655733346!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                      />
                    </div>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Package Description</label>
            <Textarea placeholder="Describe your package" className="bg-background" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Weight (kg)</label>
              <Input type="number" placeholder="Package weight" className="bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Preferred Date</label>
              <Input type="date" className="bg-background" />
            </div>
          </div>
          <GhostButton type="submit" className="w-full">
            Schedule Pickup
          </GhostButton>
        </form>
      </div>
    </section>
  );
};

export default ShippingForm;