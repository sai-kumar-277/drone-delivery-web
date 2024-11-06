import React from 'react';
import GhostButton from './ui/GhostButton';
import { Package } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute w-full h-full">
        <svg 
          className="w-96 h-96 absolute animate-float opacity-70"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="1"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {/* Drone body */}
          <path d="M12 8L8 12L12 16L16 12L12 8" className="text-neon-blue" />
          {/* Drone arms */}
          <line x1="8" y1="12" x2="4" y2="12" className="text-neon-blue" />
          <line x1="16" y1="12" x2="20" y2="12" className="text-neon-blue" />
          {/* Propellers */}
          <circle cx="4" cy="12" r="2" className="text-neon-blue animate-spin" />
          <circle cx="20" cy="12" r="2" className="text-neon-blue animate-spin" />
        </svg>
      </div>
      
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