import React, { useEffect, useRef } from 'react';
import GhostButton from './ui/GhostButton';
import { Package } from 'lucide-react';
import Header from './Header';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const droneRef = useRef<SVGSVGElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      if (droneRef.current) {
        const scrollY = window.scrollY;
        const movement = scrollY * 0.5;
        const opacity = Math.max(0.2 - (Math.abs(movement) / 1000), 0);
        droneRef.current.style.transform = `translateX(${movement}px)`;
        droneRef.current.style.opacity = opacity.toString();
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <>
      <Header />
      <section className="min-h-screen flex items-center justify-center relative overflow-hidden">
        <div className="absolute w-full h-full flex items-center justify-center">
          <svg 
            ref={droneRef}
            className="w-[600px] h-[600px]"
            viewBox="0 0 100 100"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            {/* Main body */}
            <path d="M40 50 L60 50 L55 60 L45 60 Z" className="text-neon-blue fill-neon-blue/20" />
            
            {/* Camera/Sensor housing */}
            <circle cx="50" cy="55" r="3" className="text-neon-blue fill-neon-blue/20" />
            
            {/* Arms */}
            <line x1="40" y1="50" x2="20" y2="50" className="text-neon-blue" strokeWidth="2" />
            <line x1="60" y1="50" x2="80" y2="50" className="text-neon-blue" strokeWidth="2" />
            <line x1="45" y1="45" x2="35" y2="35" className="text-neon-blue" strokeWidth="2" />
            <line x1="55" y1="45" x2="65" y2="35" className="text-neon-blue" strokeWidth="2" />
            
            {/* Propellers - now horizontal */}
            <g>
              <line x1="20" y1="45" x2="20" y2="55" className="text-neon-blue animate-spin origin-[20px_50px]" />
              <line x1="80" y1="45" x2="80" y2="55" className="text-neon-blue animate-spin origin-[80px_50px]" />
              <line x1="35" y1="30" x2="35" y2="40" className="text-neon-blue animate-spin origin-[35px_35px]" transform="rotate(-45, 35, 35)" />
              <line x1="65" y1="30" x2="65" y2="40" className="text-neon-blue animate-spin origin-[65px_35px]" transform="rotate(45, 65, 35)" />
            </g>
            
            {/* Landing gear */}
            <line x1="45" y1="60" x2="43" y2="65" className="text-neon-blue" />
            <line x1="55" y1="60" x2="57" y2="65" className="text-neon-blue" />
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
            <GhostButton onClick={() => navigate('/track')}>
              <Package className="mr-2 h-4 w-4" />
              Track Package
            </GhostButton>
            <GhostButton onClick={() => navigate('/ship')}>
              Ship Now
            </GhostButton>
          </div>
        </div>
      </section>
    </>
  );
};

export default HeroSection;