import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { supabase } from './supabase';
import { Session } from '@supabase/supabase-js';
import { createClient } from '@supabase/supabase-js';

// Storage keys
const TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const USER_KEY = '@user_data';

// Define API base URL
const BASE_URL = 'http://localhost:8000'; // Update for production or different environments

// Direct database operations without using service role client (avoids dependencies issues)
const createUserDbRecord = async (userId: string, email: string) => {
  try {
    // Use direct fetch API call with service role token to avoid URL parsing issues
    const response = await fetch('http://127.0.0.1:54321/rest/v1/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify({
        user_id: userId,
        email: email,
        password_hash: 'MANAGED_BY_SUPABASE_AUTH',
        created_at: new Date().toISOString()
      })
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error creating database user record:', errorData);
      return { error: errorData };
    }
    
    return { data: true };
  } catch (error) {
    console.error('Error creating database user record:', error);
    return { error };
  }
};

const getUserProfile = async (userId: string) => {
  try {
    // Use direct fetch API call with anon token to avoid URL parsing issues
    const response = await fetch(`http://127.0.0.1:54321/rest/v1/users?user_id=eq.${userId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0'
      }
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error getting user profile:', errorData);
      return { error: errorData };
    }
    
    const data = await response.json();
    return { data: data[0] || null };
  } catch (error) {
    console.error('Error getting user profile:', error);
    return { error };
  }
};

const updateUserProfile = async (userId: string, profileData: any) => {
  try {
    // Use direct fetch API call with service role token to avoid URL parsing issues
    const response = await fetch(`http://127.0.0.1:54321/rest/v1/users?user_id=eq.${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImV4cCI6MTk4MzgxMjk5Nn0.EGIM96RAZx35lJzdJsyH-qQwv8Hdp7fsn3W0YpN81IU',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(profileData)
    });
    
    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error updating user profile:', errorData);
      return { error: errorData };
    }
    
    return { data: true };
  } catch (error) {
    console.error('Error updating user profile:', error);
    return { error };
  }
};

// Helper function to get authentication headers
const getAuthHeaders = async (): Promise<Record<string, string>> => {
  try {
    const token = await AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      return {
        'Authorization': `Bearer ${token}`
      };
    }
    return {};
  } catch (error) {
    console.error('Error getting auth token for headers:', error);
    return {};
  }
};

// Create a singleton instance of axios
const api = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// Add a request interceptor for authentication tokens
api.interceptors.request.use(
  async (config: InternalAxiosRequestConfig) => {
    try {
      // Get token from AsyncStorage
      const token = await AsyncStorage.getItem(TOKEN_KEY);
      
      // If token exists, add to headers
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
        console.log('Adding auth token to request:', config.url);
      } else {
        console.warn('No auth token found for request:', config.url);
      }
      
      // Log request details for debugging
      console.log('API Request:', {
        url: config.url,
        method: config.method,
        hasAuthHeader: !!config.headers.Authorization
      });
    } catch (error) {
      console.error('Error getting token:', error);
    }
    
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Add a response interceptor for error handling and token refresh
api.interceptors.response.use(
  (response: AxiosResponse) => {
    return response;
  },
  async (error: AxiosError) => {
    const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };
    
    // Handle 401 Unauthorized errors (token expired)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      
      try {
        // Get the Supabase session and refresh it
        const { data: { session } } = await supabase.auth.refreshSession();
        
        if (session) {
          // Update tokens in AsyncStorage
          await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
          
          // Update the Authorization header
          if (originalRequest && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${session.access_token}`;
          }
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure
        await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
        
        // Navigate to login (would use your navigation service here)
        console.error('Session expired. Please log in again.');
        
        return Promise.reject(refreshError);
      }
    }
    
    // Handle network errors
    if (!error.response) {
      console.error('Network error. Please check your connection.');
    }
    
    return Promise.reject(error);
  }
);

// Helper function to parse Supabase session data
const processSession = async (session: Session | null) => {
  if (!session) {
    throw new Error('Authentication failed');
  }
  
  // Store tokens in AsyncStorage
  await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
  await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
  
  // Return formatted response to match our API structure
  return {
    data: {
      access_token: session.access_token,
      refresh_token: session.refresh_token,
      user: session.user
    }
  };
};

// Define API service methods
const ApiService = {
  // Auth endpoints
  auth: {
    login: async (email: string, password: string) => {
      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password
        });
        
        if (error) throw error;
        
        return processSession(data.session);
      } catch (error: any) {
        console.error('Login API error:', error);
        throw error;
      }
    },
    signup: async (userData: any) => {
      try {
        // Create the authentication user
        const { data, error } = await supabase.auth.signUp({
          email: userData.email,
          password: userData.password,
          options: {
            data: {
              name: userData.full_name || userData.email.split('@')[0],
            }
          }
        });
        
        if (error) throw error;
        
        // If Auth was successful and we have a session and user
        if (data.session && data.user) {
          // Sync the user with our backend database
          try {
            await fetch(`http://localhost:8000/api/user/sync`, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${data.session.access_token}`
              },
              body: JSON.stringify({
                user_id: data.user.id,
                email: userData.email
              })
            });
          } catch (syncError) {
            console.error('Error syncing user data with backend:', syncError);
            // Non-critical error, continue with authentication
          }
        }
        
        return processSession(data.session);
      } catch (error: any) {
        console.error('Signup API error:', error);
        throw error;
      }
    },
    googleLogin: async () => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'google',
          options: {
            skipBrowserRedirect: true,
            redirectTo: 'nutriplan://auth/callback',
          },
        });

        if (error) {
          console.error('Google login error:', error);
          throw error;
        }

        return data.url;
      } catch (error) {
        console.error('Google login error:', error);
        throw error;
      }
    },
    appleLogin: async () => {
      try {
        const { data, error } = await supabase.auth.signInWithOAuth({
          provider: 'apple',
          options: {
            skipBrowserRedirect: true,
            redirectTo: 'nutriplan://auth/callback',
          },
        });

        if (error) {
          console.error('Apple login error:', error);
          throw error;
        }

        return data.url;
      } catch (error) {
        console.error('Apple login error:', error);
        throw error;
      }
    },
    forgotPassword: async (email: string) => {
      try {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
          redirectTo: 'nutriplan://auth/reset-password',
        });
        
        if (error) throw error;
        
        return { data: { message: 'Password reset email sent' } };
      } catch (error: any) {
        console.error('Forgot password error:', error);
        throw error;
      }
    },
    resetPassword: async (password: string) => {
      try {
        const { error } = await supabase.auth.updateUser({
          password
        });
        
        if (error) throw error;
        
        return { data: { message: 'Password reset successful' } };
      } catch (error: any) {
        console.error('Reset password error:', error);
        throw error;
      }
    },
    refreshToken: async () => {
      try {
        const { data, error } = await supabase.auth.refreshSession();
        
        if (error) throw error;
        
        return processSession(data.session);
      } catch (error: any) {
        console.error('Token refresh API error:', error);
        throw error;
      }
    },
    logout: async () => {
      try {
        const { error } = await supabase.auth.signOut();
        
        if (error) throw error;
        
        // Clear tokens from AsyncStorage
        await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY]);
        
        return { data: { message: 'Logout successful' } };
      } catch (error: any) {
        console.error('Logout API error:', error);
        throw error;
      }
    },
  },
  
  // User endpoints
  user: {
    verifyUserExists: async () => {
      try {
        // Get the current user's ID
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user?.id) {
          return { data: { exists: false } };
        }
        
        // Try to fetch the user profile
        try {
          const response = await fetch(`${BASE_URL}/api/user/verify`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              user_id: session.user.id
            })
          });
          
          if (!response.ok) {
            console.error(`Error verifying user: ${response.status} ${response.statusText}`);
            return { data: { exists: false } };
          }
          
          const data = await response.json();
          return { data };
        } catch (fetchError) {
          console.error('Error fetching user verification:', fetchError);
          
          // Fallback: Try to check directly with Supabase if the backend is down
          try {
            // Get user profile via direct API call
            const { data, error } = await getUserProfile(session.user.id);
            return { data: { exists: !!data } };
          } catch (directError) {
            return { data: { exists: false } };
          }
        }
      } catch (error) {
        console.error('Error verifying user exists:', error);
        return { data: { exists: false } };
      }
    },
    getProfile: async () => {
      try {
        // Get the current user's ID
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user?.id) {
          throw new Error('User not authenticated');
        }
        
        // Fetch the user record using direct API call
        const { data, error } = await getUserProfile(session.user.id);
        
        if (error) throw error;
        
        return { data };
      } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
      }
    },
    updateProfile: async (profileData: any) => {
      try {
        // Get the current user's ID
        const { data: { session } } = await supabase.auth.getSession();
        
        if (!session?.user?.id) {
          throw new Error('User not authenticated');
        }
        
        // Update the user record using direct API call
        const { data, error } = await updateUserProfile(session.user.id, profileData);
        
        if (error) throw error;
        
        return { data };
      } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
      }
    },
    updateGoals: (goalsData: any) => 
      api.patch('/user/goals', goalsData),
    updatePreferences: (preferencesData: any) => 
      api.patch('/user/preferences', preferencesData),
  },
  
  // Onboarding endpoints
  onboarding: {
    getGoal: () => 
      api.get('/api/onboarding/goal'),
    saveGoal: async (goalData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveGoal');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend without JWT
        const response = await fetch(`${BASE_URL}/api/onboarding/goal`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...goalData,
            user_id: userId  // Pass user ID in request body
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving goal: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveGoal:', error);
        throw error;
      }
    },
    saveHealthData: async (healthData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveHealthData');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/health-data`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...healthData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving health data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveHealthData:', error);
        throw error;
      }
    },
    saveUserInfo: async (userInfoData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveUserInfo');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/user-info`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...userInfoData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving user info: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveUserInfo:', error);
        throw error;
      }
    },
    saveWorkoutFrequency: async (workoutData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveWorkoutFrequency');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/workout-frequency`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...workoutData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving workout frequency: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveWorkoutFrequency:', error);
        throw error;
      }
    },
    saveBodyFat: async (bodyFatData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveBodyFat');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/body-fat`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...bodyFatData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving body fat data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveBodyFat:', error);
        throw error;
      }
    },
    saveNutritionalGoals: async (nutritionData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveNutritionalGoals');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/nutritional-goals`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...nutritionData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving nutritional goals: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveNutritionalGoals:', error);
        throw error;
      }
    },
    saveBudget: async (budgetData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveBudget');
          throw new Error('Authentication required');
        }
        
        // Ensure budget values are integers
        const payload = {
          ...budgetData,
          minBudget: Math.round(Number(budgetData.minBudget)),
          maxBudget: Math.round(Number(budgetData.maxBudget)),
          user_id: userId
        };
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/budget`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload)
        });
        
        if (!response.ok) {
          throw new Error(`Error saving budget data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveBudget:', error);
        throw error;
      }
    },
    saveAllergies: async (allergiesData: any) => {
      try {
        // Get current user ID from Supabase
        const { data: { session } } = await supabase.auth.getSession();
        const userId = session?.user?.id;
        
        if (!userId) {
          console.error('No user ID available for saveAllergies');
          throw new Error('Authentication required');
        }
        
        // Make direct HTTP request to backend
        const response = await fetch(`${BASE_URL}/api/onboarding/allergies`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            ...allergiesData,
            user_id: userId
          })
        });
        
        if (!response.ok) {
          throw new Error(`Error saving allergies data: ${response.status} ${response.statusText}`);
        }
        
        const data = await response.json();
        return { data };
      } catch (error) {
        console.error('Error in saveAllergies:', error);
        throw error;
      }
    },
    debugOnboardingState: () =>
      api.get('/api/onboarding/debug-state'),
    completeOnboarding: async (userId: string) => {
      try {
        console.log(`Completing onboarding for user ID: ${userId}`);
        
        // Get authentication headers
        const authHeaders = await getAuthHeaders();
        
        // Make direct HTTP request to backend
        const headers: Record<string, string> = {
          'Content-Type': 'application/json',
        };
        
        // Add auth header if available
        if (authHeaders.Authorization) {
          headers.Authorization = authHeaders.Authorization;
        }
        
        try {
          const response = await fetch(`${BASE_URL}/api/onboarding/complete`, {
            method: 'PUT',
            headers,
            body: JSON.stringify({ user_id: userId })
          });
          
          // Check if response is ok (status in 200-299 range)
          if (!response.ok) {
            const errorText = await response.text();
            console.error(`Error completing onboarding: ${response.status} ${response.statusText}`, errorText);
            
            // Return an object with error details but don't throw
            // This allows the calling code to continue
            return { 
              data: null, 
              status: response.status, 
              error: `${response.status} ${response.statusText}: ${errorText}`,
              partial: true
            };
          }
          
          const data = await response.json();
          return { data, status: response.status };
        } catch (fetchError) {
          console.error('Network error completing onboarding:', fetchError);
          // Return partial success to allow frontend to continue
          return { 
            data: null, 
            status: 0, 
            error: `Network error: ${fetchError}`,
            partial: true
          };
        }
      } catch (error) {
        console.error('Error in completeOnboarding API method:', error);
        // Return partial success to allow frontend to continue
        return { 
          data: null, 
          status: 0, 
          error: `${error}`,
          partial: true
        };
      }
    },
  },
  
  // Dashboard endpoints
  dashboard: {
    getData: (date: string) => 
      api.get(`/dashboard/data?date=${date}`),
    getWeeklyMetrics: (startDate: string, endDate: string) => 
      api.get(`/dashboard/weekly-metrics?start_date=${startDate}&end_date=${endDate}`),
    logMeal: (mealData: any) => 
      api.post('/dashboard/log-meal', mealData),
    logWorkout: (workoutData: any) => 
      api.post('/dashboard/log-workout', workoutData),
  },
  
  // Explore (Meal Discovery) endpoints
  explore: {
    getMeals: (page: number = 1, limit: number = 20) => 
      api.get(`/recipes/feed?page=${page}&limit=${limit}`),
    searchMeals: (query: string, filters: any = {}) => 
      api.get('/recipes/search', { params: { query, ...filters } }),
    getMealDetails: (mealId: string) => 
      api.get(`/recipes/${mealId}`),
  },
  
  // Meal Planning endpoints
  mealPlan: {
    getUserMealPlan: (startDate: string, endDate: string) => 
      api.get(`/user-meal-plan?start_date=${startDate}&end_date=${endDate}`),
    addToMealPlan: (mealPlanData: any) => 
      api.post('/user-meal-plan', mealPlanData),
    updateMealPlan: (mealPlanId: string, updateData: any) => 
      api.patch(`/user-meal-plan/${mealPlanId}`, updateData),
    deleteMealPlan: (mealPlanId: string) => 
      api.delete(`/user-meal-plan/${mealPlanId}`),
  },
  
  // Shopping Cart endpoints
  cart: {
    getCartItems: () => 
      api.get('/cart'),
    addToCart: (itemData: any) => 
      api.post('/cart', itemData),
    updateCartItem: (itemId: string, updateData: any) => 
      api.patch(`/cart/${itemId}`, updateData),
    removeFromCart: (itemId: string) => 
      api.delete(`/cart/${itemId}`),
    checkout: () => 
      api.post('/cart/checkout'),
  },
  
  // Pantry endpoints
  pantry: {
    getPantryItems: () => 
      api.get('/pantry'),
    addToPantry: (itemData: any) => 
      api.post('/pantry', itemData),
    updatePantryItem: (itemId: string, updateData: any) => 
      api.patch(`/pantry/${itemId}`, updateData),
    removeFromPantry: (itemId: string) => 
      api.delete(`/pantry/${itemId}`),
  },
};

export default ApiService; 