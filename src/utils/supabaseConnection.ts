import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

// Log the values (without exposing the full key)
console.log('Supabase URL from env:', supabaseUrl);
console.log('Supabase Key available:', supabaseKey ? 'Yes (key is present)' : 'No (key is missing)');

// Create a single Supabase client instance to use throughout the app
export const supabase = createClient(supabaseUrl, supabaseKey);

// Test function to check connection
export const testConnection = async () => {
  try {
    console.log('Testing Supabase connection...');
    
    // Try a simple query
    const { data, error } = await supabase.from('chat_sessions').select('count(*)');
    
    if (error) {
      console.error('Supabase connection test failed:', error);
      return {
        success: false,
        error: error,
        message: error.message,
        details: {
          url: supabaseUrl,
          keyAvailable: !!supabaseKey
        }
      };
    }
    
    console.log('Supabase connection test successful:', data);
    return {
      success: true,
      data: data
    };
  } catch (err) {
    console.error('Unexpected error during connection test:', err);
    return {
      success: false,
      error: err,
      message: err instanceof Error ? err.message : 'Unknown error',
      details: {
        url: supabaseUrl,
        keyAvailable: !!supabaseKey
      }
    };
  }
};
