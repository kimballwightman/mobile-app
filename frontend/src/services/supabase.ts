import 'react-native-url-polyfill/auto';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { createClient } from '@supabase/supabase-js';
import { Platform } from 'react-native';

// Local development Supabase URL and anon key
// In production, these would be environment variables
const supabaseUrl = 'http://localhost:54321';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0';

// Create a custom storage adapter using AsyncStorage
const supabaseStorage = {
  getItem: (key: string) => {
    return AsyncStorage.getItem(key);
  },
  setItem: (key: string, value: string) => {
    return AsyncStorage.setItem(key, value);
  },
  removeItem: (key: string) => {
    return AsyncStorage.removeItem(key);
  },
};

// Initialize the Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: supabaseStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Helper to check if we're running in a web browser
export const isWeb = () => {
  return Platform.OS === 'web';
};

// Helper to handle the OAuth URL on native platforms
export const handleOAuthUrl = (url: string) => {
  if (!isWeb()) {
    // Parse the URL and look for access_token and refresh_token
    // This can be used in a deep link handler
    return supabase.auth.setSession({
      access_token: url.split('access_token=')[1]?.split('&')[0] || '',
      refresh_token: url.split('refresh_token=')[1]?.split('&')[0] || '',
    });
  }
  return Promise.resolve({ data: null, error: new Error('Not implemented on web') });
};

export default supabase; 