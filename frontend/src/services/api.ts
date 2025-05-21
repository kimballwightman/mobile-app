import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from 'axios';

// Define API base URL
const BASE_URL = 'http://localhost:8000'; // Update for production or different environments

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
  (config: InternalAxiosRequestConfig) => {
    // Get token from storage - in React Native, would use AsyncStorage or a secure storage solution
    // For demo purposes, using localStorage here
    const token = null; // Replace with secure storage
    
    // If token exists, add to headers
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
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
        // Attempt to refresh token - would use secure storage in real app
        const refreshToken = null; // Replace with secure storage
        
        if (refreshToken) {
          const response = await axios.post(`${BASE_URL}/auth/refresh`, {
            refresh_token: refreshToken,
          });
          
          const { token, refresh_token } = response.data;
          
          // Update tokens in storage - would use secure storage in real app
          
          // Update the Authorization header
          if (originalRequest && originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${token}`;
          }
          
          // Retry the original request
          return api(originalRequest);
        }
      } catch (refreshError) {
        // Handle refresh token failure - would use secure storage in real app
        
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

// Define API service methods
const ApiService = {
  // Auth endpoints
  auth: {
    login: (email: string, password: string) => 
      api.post('/auth/login', { email, password }),
    signup: (userData: any) => 
      api.post('/auth/signup', userData),
    forgotPassword: (email: string) => 
      api.post('/auth/forgot-password', { email }),
    resetPassword: (token: string, password: string) => 
      api.post('/auth/reset-password', { token, password }),
    refreshToken: (refreshToken: string) => 
      api.post('/auth/refresh', { refresh_token: refreshToken }),
    logout: () => 
      api.post('/auth/logout'),
  },
  
  // User endpoints
  user: {
    getProfile: () => 
      api.get('/user/profile'),
    updateProfile: (profileData: any) => 
      api.patch('/user/profile', profileData),
    updateGoals: (goalsData: any) => 
      api.patch('/user/goals', goalsData),
    updatePreferences: (preferencesData: any) => 
      api.patch('/user/preferences', preferencesData),
  },
  
  // Onboarding endpoints
  onboarding: {
    saveGoal: (goalData: any) => 
      api.post('/onboarding/goal', goalData),
    saveHealthData: (healthData: any) => 
      api.post('/onboarding/health-data', healthData),
    saveUserInfo: (userInfo: any) => 
      api.post('/onboarding/user-info', userInfo),
    saveWorkoutFrequency: (workoutData: any) => 
      api.post('/onboarding/workout-frequency', workoutData),
    saveBodyFat: (bodyFatData: any) => 
      api.post('/onboarding/body-fat', bodyFatData),
    saveNutritionalGoals: (nutritionData: any) => 
      api.post('/onboarding/nutritional-goals', nutritionData),
    saveBudget: (budgetData: any) => 
      api.post('/onboarding/budget', budgetData),
    saveAllergies: (allergiesData: any) => 
      api.post('/onboarding/allergies', allergiesData),
    completeOnboarding: () => 
      api.post('/onboarding/complete'),
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