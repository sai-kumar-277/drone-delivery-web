import { supabase } from '@/integrations/supabase/client';

export const generateTrackingId = () => {
  return Math.random().toString(36).substring(2, 15).toUpperCase();
};

export const submitShipmentToSupabase = async (
  trackingId: string,
  pickup: string,
  delivery: string,
  date: string
) => {
  const { error } = await supabase
    .from('packages')
    .insert({
      tracking_id: trackingId,
      status: 'processing',
      estimated_delivery: date,
      current_location: pickup,
      destination: delivery,
    });

  if (error) throw error;
};