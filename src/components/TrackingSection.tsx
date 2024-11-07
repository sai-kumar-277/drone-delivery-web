import React from 'react';
import { Package, Plane, Truck } from 'lucide-react';
import GhostButton from './ui/GhostButton';
import { useNavigate } from 'react-router-dom';

const TrackingSection = () => {
  const navigate = useNavigate();

  const handleTrackDelivery = () => {
    navigate('/track');
  };

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-8">Real-Time Tracking</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
          <Package className="text-neon-blue h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Package Processing</h3>
          <p className="text-gray-400">Your package is being prepared for drone delivery</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
          <Plane className="text-neon-blue h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">In Transit</h3>
          <p className="text-gray-400">Drone is navigating to your location</p>
        </div>
        <div className="bg-secondary/50 p-6 rounded-lg backdrop-blur-sm">
          <Truck className="text-neon-blue h-12 w-12 mx-auto mb-4" />
          <h3 className="text-xl font-bold mb-2">Delivery</h3>
          <p className="text-gray-400">Package will be delivered to your specified location</p>
        </div>
      </div>
      <div className="mt-8">
        <GhostButton onClick={handleTrackDelivery}>Track Your Delivery</GhostButton>
      </div>
    </section>
  );
};

export default TrackingSection;