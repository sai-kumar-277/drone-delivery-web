// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const supabaseUrl = "https://dwdddlglqdbmscfejoru.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3ZGRkbGdscWRibXNjZmVqb3J1Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzExNDEwMDIsImV4cCI6MjA0NjcxNzAwMn0.JFZMc617EvG0XFEU7CRICQgaXUVJfx59dF_ioJOfPlA";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(supabaseUrl, supabaseKey);