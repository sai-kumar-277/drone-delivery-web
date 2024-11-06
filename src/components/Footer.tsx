import React from 'react';
import { Instagram, MessageSquare } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-secondary/50 backdrop-blur-sm mt-16">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">DroneDelivery</h3>
            <p className="text-gray-400">
              The future of autonomous delivery is here. Fast, reliable, and contact-free.
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <p className="text-gray-400">
              Email: support@dronedelivery.com<br />
              Phone: +1 (555) 123-4567
            </p>
          </div>
          <div>
            <h3 className="text-xl font-bold mb-4">Follow Us</h3>
            <div className="flex gap-4">
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                className="text-gray-400 hover:text-neon-blue transition-colors">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="https://t.me/dronedelivery" target="_blank" rel="noopener noreferrer"
                className="text-gray-400 hover:text-neon-blue transition-colors">
                <MessageSquare className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 DroneDelivery. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;