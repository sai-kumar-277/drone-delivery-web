import React from 'react';
import HeroSection from '../components/HeroSection';
import ServiceAreas from '../components/ServiceAreas';
import TrackingSection from '../components/TrackingSection';
import ShippingForm from '../components/ShippingForm';
import Footer from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <HeroSection />
      <ServiceAreas />
      <TrackingSection />
      <ShippingForm />
      <Footer />
    </div>
  );
};

export default Index;