import React from 'react';
import GhostButton from './ui/GhostButton';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';

const ShippingForm = () => {
  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-8">Schedule a Pickup</h2>
      <div className="max-w-2xl mx-auto">
        <form className="space-y-6 bg-secondary/50 p-8 rounded-lg backdrop-blur-sm">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Pickup Address</label>
              <Input placeholder="Enter pickup address" className="bg-background" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Delivery Address</label>
              <Input placeholder="Enter delivery address" className="bg-background" />
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