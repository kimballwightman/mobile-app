import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService, { BASE_URL } from '../services/api';
import { supabase } from '../services/supabase';
import { Linking } from 'react-native';
import { User } from '@supabase/supabase-js';

// Define the shape of our auth context
interface AuthContextType {
  isAuthenticated: boolean;
  isLoading: boolean;
  isOnboarded: boolean;
  user: any | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  signUp: (userData: any) => Promise<void>;
  googleLogin: () => Promise<void>;
  appleLogin: () => Promise<void>;
  handleDeepLink: (url: string) => Promise<void>;
  checkOnboardingStatus: () => Promise<boolean>;
  setOnboardingComplete: () => Promise<void>;
  restartOnboarding: () => Promise<void>;
  completeOnboarding: () => Promise<void>;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  isAuthenticated: false,
  isLoading: true,
  isOnboarded: false,
  user: null,
  login: async () => {},
  logout: async () => {},
  signUp: async () => {},
  googleLogin: async () => {},
  appleLogin: async () => {},
  handleDeepLink: async () => {},
  checkOnboardingStatus: async () => false,
  setOnboardingComplete: async () => {},
  restartOnboarding: async () => {},
  completeOnboarding: async () => {},
});

// Storage keys
const TOKEN_KEY = '@auth_token';
const REFRESH_TOKEN_KEY = '@refresh_token';
const USER_KEY = '@user_data';
const ONBOARDING_COMPLETE_KEY = '@onboarding_complete';

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

// Provider component that wraps the app and makes auth object available to any child component
export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isOnboarded, setIsOnboarded] = useState(false);
  const [user, setUser] = useState<any | null>(null);

  // Check if user is logged in on mount
  useEffect(() => {
    const loadUser = async () => {
      setIsLoading(true);
      try {
        // Get the current Supabase session
        const { data: { session } } = await supabase.auth.getSession();
        
        if (session) {
          // Ensure token is set in AsyncStorage BEFORE any API calls
          await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
          await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
          if (session.user) {
            await AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user));
          }
          
          console.log("Session retrieved with token:", session.access_token?.substring(0, 10));
          
          // Verify the session is valid by getting the current user
          try {
            // First ensure user record exists in database
            const verifyResponse = await ApiService.user.verifyUserExists();
            
            if (verifyResponse.data.exists) {
              setIsAuthenticated(true);
              setUser(session.user);
              
              // Check onboarding status sequence:
              // 1. Check AsyncStorage first (fastest)
              const storageStatus = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
              console.log("AsyncStorage onboarding status:", storageStatus);
              
              if (storageStatus === 'true') {
                console.log("Using cached onboarding status: completed");
                setIsOnboarded(true);
              } else {
                // 2. Try profile API with the newly set token (most accurate)
                try {
                  console.log("Making direct API call to check onboarding status");
                  const headers = {
                    'Authorization': `Bearer ${session.access_token}`,
                    'Content-Type': 'application/json'
                  };
                  
                  const onboardingResponse = await fetch(`${BASE_URL}/api/user/profile`, {
                    method: 'GET',
                    headers
                  });
                  
                  if (onboardingResponse.ok) {
                    const userData = await onboardingResponse.json();
                    console.log("Profile API response:", userData);
                    
                    // Check if user completed onboarding
                    if (userData && userData.onboarding_completed === true) {
                      console.log("Onboarding IS complete from profile API");
                      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
                      setIsOnboarded(true);
                    } else {
                      console.log("Onboarding is NOT complete from profile API");
                      setIsOnboarded(false);
                    }
                  } else {
                    console.log("Profile API error:", await onboardingResponse.text());
                    
                    // 3. Try dedicated onboarding status endpoint
                    const onboardingStatus = await checkOnboardingStatus();
                    setIsOnboarded(onboardingStatus);
                  }
                } catch (dbError) {
                  console.error("Error checking onboarding status directly:", dbError);
                  
                  // Fall back to regular check
                  const onboardingStatus = await checkOnboardingStatus();
                  setIsOnboarded(onboardingStatus);
                }
              }
            } else {
              console.log('User not found in database, signing out');
              await performLogout();
            }
          } catch (verifyError) {
            console.error('Error verifying user exists:', verifyError);
            
            // If token is invalid, try to refresh the session
            try {
              console.log("Attempting to refresh expired session");
              const { data } = await supabase.auth.refreshSession();
              if (data.session) {
                console.log("Session refreshed successfully");
                // Store the new tokens
                await AsyncStorage.setItem(TOKEN_KEY, data.session.access_token);
                await AsyncStorage.setItem(REFRESH_TOKEN_KEY, data.session.refresh_token);
                
                // Try verification again with new token
                const retryVerify = await ApiService.user.verifyUserExists();
                if (retryVerify.data.exists) {
                  console.log("User verified after token refresh");
                  setIsAuthenticated(true);
                  setUser(data.session.user);
                  
                  // Check onboarding with the new token
                  const onboardingStatus = await checkOnboardingStatus();
                  setIsOnboarded(onboardingStatus);
                } else {
                  await performLogout();
                }
              } else {
                await performLogout();
              }
            } catch (refreshError) {
              console.error("Session refresh failed:", refreshError);
              await performLogout();
            }
          }
        }
      } catch (error) {
        console.error('Auth check error:', error);
        // Clear any stored auth data to be safe
        await performLogout(false); // Don't call API, just clear local state
      } finally {
        setIsLoading(false);
      }
    };

    loadUser();

    // Set up deep link handling
    const handleInitialURL = async () => {
      const initialUrl = await Linking.getInitialURL();
      if (initialUrl) {
        console.log('Initial URL:', initialUrl);
        handleDeepLink(initialUrl);
      }
    };

    // Set up event listener for deep links
    const linkingSubscription = Linking.addEventListener('url', ({ url }) => {
      console.log('Got URL event:', url);
      handleDeepLink(url);
    });

    // Check for initial URL (app opened via deep link)
    handleInitialURL();

    // Set up Supabase auth state change listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event: string, session: any) => {
        if (event === 'SIGNED_IN' && session) {
          try {
            // Verify user exists in database
            const response = await ApiService.user.verifyUserExists();
            
            if (!response.data.exists) {
              console.log("User signed in but doesn't exist in database, logging out");
              await performLogout(false);
              return;
            }
            
            // User exists, proceed with authentication
            setIsAuthenticated(true);
            setUser(session.user);
            
            // Store session info in AsyncStorage
            await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
            if (session.user) {
              await AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user));
            }
            
            // Only force onboarding for actual new signups
            // Don't force onboarding for regular sign-ins
            if (event === 'SIGNED_UP' as any) {
              console.log("New signup detected, starting onboarding flow");
              await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'false');
              setIsOnboarded(false);
            } else {
              // Check existing users' onboarding status from backend
              const onboardingStatus = await checkOnboardingStatus();
              console.log(`User signed in, onboarding status from backend: ${onboardingStatus}`);
              setIsOnboarded(onboardingStatus);
            }
          } catch (error) {
            console.error("Error during SIGNED_IN event:", error);
            await performLogout(false);
          }
        } else if (event === 'SIGNED_OUT') {
          await performLogout(false);
        }
      }
    );

    // Cleanup
    return () => {
      subscription.unsubscribe();
      linkingSubscription.remove();
    };
  }, []);
  
  // Function to handle deep links (OAuth callbacks)
  const handleDeepLink = async (url: string) => {
    console.log('Handling deep link:', url);
    
    if (url.includes('auth/callback')) {
      try {
        setIsLoading(true);
        
        // Manual parsing of URL hash fragment
        // Format is typically: nutriplan://auth/callback#access_token=XXX&refresh_token=YYY
        let accessToken = '';
        let refreshToken = '';
        
        // Get the hash fragment (everything after #)
        const hashIndex = url.indexOf('#');
        if (hashIndex !== -1) {
          const hashFragment = url.substring(hashIndex + 1);
          const params = hashFragment.split('&');
          
          // Extract tokens from params
          for (const param of params) {
            const [key, value] = param.split('=');
            if (key === 'access_token') {
              accessToken = value;
            } else if (key === 'refresh_token') {
              refreshToken = value;
            }
          }
        }
        
        console.log('Tokens extracted from URL:', { accessToken: !!accessToken, refreshToken: !!refreshToken });
        
        if (accessToken && refreshToken) {
          // Set the session with the extracted tokens
          const { error } = await supabase.auth.setSession({
            access_token: accessToken,
            refresh_token: refreshToken,
          });
          
          if (error) {
            console.error('Error setting session:', error);
            throw error;
          }
          
          // Get user data from the new session
          const { data: { session } } = await supabase.auth.getSession();
          if (session) {
            setIsAuthenticated(true);
            setUser(session.user);
            
            // Store session info in AsyncStorage
            await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
            await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
            if (session.user) {
              await AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user));
            }
            
            console.log('User authenticated via OAuth');
          }
        } else {
          console.error('Missing tokens in OAuth callback URL');
        }
      } catch (error) {
        console.error('Deep link auth error:', error);
      } finally {
        setIsLoading(false);
      }
    }
  };

  // Login function
  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Call the login API
      const response = await ApiService.auth.login(email, password);
      
      // Extract user data
      const { user: userData, access_token, refresh_token } = response.data;
      
      console.log('Login successful, got tokens:', { 
        hasAccessToken: !!access_token,
        accessTokenLength: access_token?.length
      });
      
      // Ensure tokens are stored
      if (access_token) {
        await AsyncStorage.setItem(TOKEN_KEY, access_token);
      }
      if (refresh_token) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
      }
      
      setIsAuthenticated(true);
      setUser(userData);
      
      // Check onboarding status for returning user
      try {
        // First check AsyncStorage for fastest response
        const storageStatus = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
        console.log(`Login: AsyncStorage onboarding status: ${storageStatus}`);
        
        if (storageStatus === 'true') {
          console.log("Login: Using cached onboarding status (completed)");
          setIsOnboarded(true);
        } else {
          // Get onboarding status from backend
          const onboardingStatus = await checkOnboardingStatus();
          console.log(`Login: Backend onboarding status: ${onboardingStatus}`);
          setIsOnboarded(onboardingStatus);
        }
      } catch (onboardingError) {
        console.error('Error checking onboarding status during login:', onboardingError);
        // Default to checking with backend if there's an error
        const onboardingStatus = await checkOnboardingStatus();
        setIsOnboarded(onboardingStatus);
      }
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Logout function
  const logout = async () => {
    setIsLoading(true);
    try {
      await performLogout(true);
    } catch (error) {
      console.error('Logout error:', error);
      // Ensure we still clear local state even if API call fails
      await performLogout(false);
    } finally {
      setIsLoading(false);
    }
  };

  // Sign up function
  const signUp = async (userData: any) => {
    setIsLoading(true);
    try {
      // Call signup API
      const response = await ApiService.auth.signup(userData);
      
      // Extract user data
      const { user: newUser, access_token, refresh_token } = response.data;
      
      console.log('Signup successful, got tokens:', { 
        hasAccessToken: !!access_token,
        accessTokenLength: access_token?.length
      });
      
      // Ensure tokens are stored
      if (access_token) {
        await AsyncStorage.setItem(TOKEN_KEY, access_token);
      }
      if (refresh_token) {
        await AsyncStorage.setItem(REFRESH_TOKEN_KEY, refresh_token);
      }
      
      setIsAuthenticated(true);
      setUser(newUser);
      
      // New users should always start with onboarding = false
      setIsOnboarded(false);
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'false');
      
      console.log("Signup successful - user should start onboarding");
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Google login function
  const googleLogin = async () => {
    setIsLoading(true);
    try {
      // This will trigger OAuth flow and open browser
      await ApiService.auth.googleLogin();
      // Auth state will be updated by the deep link handler
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };
  
  // Apple login function
  const appleLogin = async () => {
    setIsLoading(true);
    try {
      // This will trigger OAuth flow and open browser
      await ApiService.auth.appleLogin();
      // Auth state will be updated by the deep link handler
    } catch (error) {
      console.error('Apple login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Check if user has completed onboarding
  const checkOnboardingStatus = async (): Promise<boolean> => {
    try {
      console.log("Checking onboarding status...");
      
      if (!isAuthenticated) {
        console.log("User not authenticated, returning false for onboarding status");
        return false;
      }
      
      // First check AsyncStorage for fastest response
      const storageStatus = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      console.log(`AsyncStorage onboarding status: ${storageStatus}`);
      
      if (storageStatus === 'true') {
        console.log("Using cached onboarding status (completed)");
        return true;
      }
      
      // Get current session to ensure we have the latest token
      const { data: { session } } = await supabase.auth.getSession();
      if (!session || !session.access_token) {
        console.log("No valid session found, forcing token refresh");
        const { data } = await supabase.auth.refreshSession();
        if (!data.session) {
          console.log("Unable to refresh session, returning false");
          return false;
        }
      }
      
      // Get the most current token
      const currentToken = session?.access_token || await AsyncStorage.getItem(TOKEN_KEY);
      
      if (!currentToken) {
        console.log("No auth token available, returning false");
        return false;
      }
      
      // Try direct API endpoint call with current token
      try {
        const headers = {
          'Authorization': `Bearer ${currentToken}`,
          'Content-Type': 'application/json'
        };
        
        console.log("Making direct API call to check onboarding status");
        const response = await fetch(`${BASE_URL}/api/user/profile`, {
          method: 'GET',
          headers
        });
        
        if (response.ok) {
          const data = await response.json();
          const isCompleted = data?.onboarding_completed === true;
          console.log(`Direct API check - Onboarding completed: ${isCompleted}`);
          
          // Update AsyncStorage to match backend for future checks
          await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, isCompleted ? 'true' : 'false');
          
          return isCompleted;
        } else {
          console.log(`Direct API check failed: ${response.status}`);
          // Continue to fallback method
        }
      } catch (directError) {
        console.error("Direct API call failed:", directError);
        // Continue to fallback method
      }
      
      // Fallback: Use dedicated API service endpoint
      try {
        console.log("Trying API service for onboarding status check");
        const response = await ApiService.user.checkOnboardingStatus();
        console.log("Onboarding API response:", response?.data);
        
        // Check if onboarding_completed is true in the response
        const isCompleted = response?.data?.onboarding_completed === true;
        console.log(`API service onboarding status: ${isCompleted}`);
        
        // Update AsyncStorage to match backend for future checks
        await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, isCompleted ? 'true' : 'false');
        
        return isCompleted;
      } catch (apiError) {
        console.error('Error checking onboarding status from API service:', apiError);
        
        // Final fallback - if we have a cached "true" value, trust it
        if (storageStatus === 'true') {
          console.log("Using AsyncStorage fallback: onboarding is complete");
          return true;
        }
        
        console.log("No reliable source available, assuming onboarding is NOT complete");
        return false;
      }
    } catch (error) {
      console.error('Error checking onboarding status:', error);
      return false;
    }
  };

  // Mark onboarding as complete
  const setOnboardingComplete = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      setIsOnboarded(true);
    } catch (error) {
      console.error('Error setting onboarding status:', error);
    }
  };

  // Restart onboarding
  const restartOnboarding = async (): Promise<void> => {
    try {
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'false');
      setIsOnboarded(false);
    } catch (error) {
      console.error('Error restarting onboarding:', error);
    }
  };

  // Mark onboarding as complete (alias for setOnboardingComplete for clarity)
  const completeOnboarding = async (): Promise<void> => {
    setIsLoading(true);
    try {
      if (!user) {
        console.error('Cannot complete onboarding - no user object available');
        throw new Error('User not available');
      }
      
      // Supabase users might have id or user_id property depending on context
      const userId = user.id || (user as any).user_id;
      
      if (!userId) {
        console.error('Cannot complete onboarding - no user ID found in user object', user);
        throw new Error('User ID not available');
      }
      
      console.log(`Attempting to complete onboarding for user ${userId}`);
      
      try {
        // Mark onboarding as complete in the backend
        const response = await ApiService.onboarding.completeOnboarding(userId);
        console.log('Onboarding completion API response:', response);
      } catch (apiError) {
        // Log the error but continue - we don't want to block the user
        console.error('Backend API error completing onboarding:', apiError);
        console.log('Continuing with local onboarding completion despite backend error');
      }
      
      // Always update local state regardless of backend success/failure
      // This ensures users can always proceed past onboarding
      setIsOnboarded(true);
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
      console.log('Onboarding marked as complete in local state');
    } catch (error) {
      console.error('Error in completeOnboarding:', error);
      
      // Even in case of error, ensure user isn't stuck in onboarding loop
      // This is a fallback to prevent users from getting stuck
      console.log('Forcing onboarding complete locally despite errors');
      setIsOnboarded(true);
      await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to handle logout logic
  const performLogout = async (callApi = true) => {
    try {
      // Only call the API if requested
      if (callApi) {
        try {
          await ApiService.auth.logout();
        } catch (apiError) {
          console.error('API logout error:', apiError);
          // Continue with local logout even if API fails
        }
      }
      
      // Get current onboarding status before clearing state
      const onboardingStatus = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      
      // Clear local state
      setIsAuthenticated(false);
      setUser(null);
      // Don't reset onboarding status, as we want to remember if user completed onboarding
      // setIsOnboarded(false);
      
      // Clear stored tokens but preserve onboarding status
      await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY]);
      
      // Make sure the onboarding status is preserved
      if (onboardingStatus) {
        await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, onboardingStatus);
      }
      
      console.log(`User logged out - preserved onboarding status: ${onboardingStatus}`);
    } catch (error) {
      console.error('Error during logout:', error);
    }
  };

  // Context value
  const value = {
    isAuthenticated,
    isLoading,
    isOnboarded,
    user,
    login,
    logout,
    signUp,
    googleLogin,
    appleLogin,
    handleDeepLink,
    checkOnboardingStatus,
    setOnboardingComplete,
    restartOnboarding,
    completeOnboarding,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext; 