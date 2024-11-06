import React from 'react';
import GhostButton from './ui/GhostButton';
import { Package } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-32 h-32 bg-[url('https://images.unsplash.com/photo-1487887235947-a955ef187fcc')] bg-contain bg-no-repeat bg-center animate-drone-fly" />
      
      <div className="section-container relative z-10">
        <h1 className="text-6xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
          Future of Delivery
        </h1>
        <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
          Experience lightning-fast autonomous drone deliveries with real-time tracking and unprecedented convenience.
        </p>
        <div className="flex gap-4 justify-center">
          <GhostButton onClick={() => console.log("Track")}>
            <Package className="mr-2 h-4 w-4" />
            Track Package
          </GhostButton>
          <GhostButton onClick={() => console.log("Ship")}>
            Ship Now
          </GhostButton>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;