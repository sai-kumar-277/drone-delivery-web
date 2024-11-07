import React from 'react';
import ShippingForm from '@/components/ShippingForm';

const Ship = () => {
  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8">Ship Now</h1>
        <ShippingForm />
      </div>
    </div>
  );
};

export default Ship;