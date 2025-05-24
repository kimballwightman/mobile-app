import React, { createContext, useState, useContext, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ApiService from '../services/api';
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
          // Verify the user exists in the database before proceeding
          try {
            const response = await ApiService.user.verifyUserExists();
            
            if (response.data.exists) {
              setIsAuthenticated(true);
              setUser(session.user);
              
              // Store session info in AsyncStorage
              await AsyncStorage.setItem(TOKEN_KEY, session.access_token);
              await AsyncStorage.setItem(REFRESH_TOKEN_KEY, session.refresh_token);
              if (session.user) {
                await AsyncStorage.setItem(USER_KEY, JSON.stringify(session.user));
              }
              
              // Check if user has completed onboarding
              const onboardingStatus = await checkOnboardingStatus();
              setIsOnboarded(onboardingStatus);
            } else {
              // User doesn't exist in database, sign out
              console.log('User not found in database, signing out');
              await performLogout();
            }
          } catch (verifyError) {
            console.error('Error verifying user exists:', verifyError);
            // If we can't verify, assume user doesn't exist and sign out
            await performLogout();
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
            
            // For brand new users who just created an account, force onboarding regardless of backend status
            const isNewUser = (event === 'SIGNED_UP' as any) || 
                           ((event === 'SIGNED_IN' as any) && 
                            session.user?.app_metadata?.provider === 'email' && 
                            session.user?.created_at && 
                            (new Date().getTime() - new Date(session.user.created_at).getTime() < 60000)); // Within last minute
            
            if (isNewUser) {
              console.log("New user detected, forcing onboarding flow");
              await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'false');
              setIsOnboarded(false);
            } else {
              // Check existing users normally
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
      // First check AsyncStorage for faster response
      const storageStatus = await AsyncStorage.getItem(ONBOARDING_COMPLETE_KEY);
      if (storageStatus === 'true') {
        return true;
      }
      
      // If not in AsyncStorage, check the database
      if (isAuthenticated) {
        try {
          // Get user profile from database
          const response = await ApiService.user.getProfile();
          console.log("Onboarding API response:", response?.data);
          
          // Check if onboarding_completed is true in the response
          const isCompleted = response?.data?.onboarding_completed === true;
          
          if (isCompleted) {
            // Update AsyncStorage for future checks
            await AsyncStorage.setItem(ONBOARDING_COMPLETE_KEY, 'true');
            return true;
          }
        } catch (error) {
          console.error('Error checking onboarding status from API:', error);
          // Continue to return false if API call fails
        }
      }
      
      return false;
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
      
      // Clear local state
      setIsAuthenticated(false);
      setUser(null);
      setIsOnboarded(false);
      
      // Clear stored tokens
      await AsyncStorage.multiRemove([TOKEN_KEY, REFRESH_TOKEN_KEY, USER_KEY, ONBOARDING_COMPLETE_KEY]);
      
      console.log('User logged out');
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