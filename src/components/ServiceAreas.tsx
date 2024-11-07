import React from 'react';
import { MapPin } from 'lucide-react';
import { Button } from './ui/button';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from './ui/sheet';

const ServiceAreas = () => {
  const coveredCities = [
    'New York City, NY',
    'Los Angeles, CA',
    'Chicago, IL',
    'Houston, TX',
    'Phoenix, AZ',
    'Philadelphia, PA',
    'San Antonio, TX',
    'San Diego, CA',
    'Dallas, TX',
    'San Jose, CA'
  ];

  return (
    <section className="section-container">
      <h2 className="text-4xl font-bold mb-8">Coverage Areas</h2>
      <div className="bg-secondary/50 p-8 rounded-lg backdrop-blur-sm">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
          <div className="flex items-center gap-4">
            <MapPin className="text-neon-blue h-6 w-6" />
            <span className="text-xl">Currently serving major metropolitan areas</span>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" className="border-neon-blue text-neon-blue hover:bg-neon-blue/10 w-full md:w-auto">
                View Covered Cities
              </Button>
            </SheetTrigger>
            <SheetContent>
              <SheetHeader>
                <SheetTitle>Covered Cities</SheetTitle>
              </SheetHeader>
              <div className="mt-6">
                <ul className="space-y-2">
                  {coveredCities.map((city, index) => (
                    <li key={index} className="flex items-center gap-2">
                      <MapPin className="h-4 w-4 text-neon-blue" />
                      {city}
                    </li>
                  ))}
                </ul>
              </div>
            </SheetContent>
          </Sheet>
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