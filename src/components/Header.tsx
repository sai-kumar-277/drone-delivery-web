import React from 'react';
import { Package } from 'lucide-react';

const Header = () => {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-sm border-b border-border">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Package className="h-6 w-6 text-neon-blue" />
          <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-neon-blue to-neon-purple">
            DroneDelivery
          </span>
        </div>
      </div>
    </header>
  );
};

export default Header;