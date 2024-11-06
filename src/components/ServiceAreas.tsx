import React from 'react';
import { MapPin } from 'lucide-react';

const ServiceAreas = () => {
  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-8">Coverage Areas</h2>
      <div className="bg-secondary/50 p-8 rounded-lg backdrop-blur-sm">
        <div className="flex items-center justify-center gap-4 mb-6">
          <MapPin className="text-neon-blue h-6 w-6" />
          <span className="text-xl">Currently serving major metropolitan areas</span>
        </div>
        <div className="aspect-video rounded-lg overflow-hidden">
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
      </div>
    </section>
  );
};

export default ServiceAreas;