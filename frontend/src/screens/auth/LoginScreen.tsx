import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import ApiService from '../../services/api';

// Define the navigation props
type AuthStackParamList = {
  Login: undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type LoginScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Login'>;
};

const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const validateInputs = (): boolean => {
    // Email validation
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    // Password validation
    if (!password) {
      setError('Password is required');
      return false;
    }
    
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }
    
    return true;
  };

  const handleLogin = async () => {
    // Validate inputs
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Attempt to login using API service
      try {
        const response = await ApiService.auth.login(email, password);
        
        // In a real app, you would store the tokens using secure storage
        console.log('Login successful', response.data);
        
        // TODO: Store tokens and navigate to the main app
        
      } catch (apiError: any) {
        // Handle specific API errors
        if (apiError.response) {
          // Server responded with a status code outside of 2xx range
          switch (apiError.response.status) {
            case 401:
              setError('Invalid email or password');
              break;
            case 404:
              setError('Account not found');
              break;
            case 429:
              setError('Too many login attempts. Please try again later.');
              break;
            default:
              setError('Login failed. Please try again.');
          }
        } else if (apiError.request) {
          // No response received
          setError('Server not responding. Check your connection.');
        } else {
          // Something else happened while setting up the request
          setError('Login error. Please try again.');
        }
        console.error('API error:', apiError);
      }
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Login error:', err);
    }
  };

  const handleGoogleLogin = () => {
    // TODO: Implement Google OAuth login
    Alert.alert('Google Login', 'Google login not implemented yet');
  };

  const handleAppleLogin = () => {
    // TODO: Implement Apple OAuth login
    Alert.alert('Apple Login', 'Apple login not implemented yet');
  };

  const navigateToSignup = () => {
    navigation.navigate('Signup');
  };

  const navigateToForgotPassword = () => {
    navigation.navigate('ForgotPassword');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="handled"
        >
          {/* Logo */}
          <View style={styles.logoContainer}>
            <Text style={styles.logo}>NutriPlan</Text>
            <Text style={styles.tagline}>Your Nutrition & Meal Planning Solution</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <InputField
              label="Email"
              value={email}
              onChangeText={(text) => {
                setEmail(text);
                setError(null); // Clear error when user types
              }}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
              textContentType="emailAddress"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null); // Clear error when user types
              }}
              placeholder="Enter your password"
              secureTextEntry
              autoCapitalize="none"
              textContentType="password"
            />

            <TouchableOpacity
              onPress={navigateToForgotPassword}
              style={styles.forgotPasswordLink}
            >
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>

            <Button
              title="Log In"
              onPress={handleLogin}
              loading={isLoading}
              fullWidth
              style={styles.loginButton}
            />

            <View style={styles.dividerContainer}>
              <View style={styles.divider} />
              <Text style={styles.dividerText}>OR</Text>
              <View style={styles.divider} />
            </View>

            <Button
              title="Continue with Google"
              onPress={handleGoogleLogin}
              variant="outline"
              fullWidth
              style={styles.socialButton}
            />

            <Button
              title="Continue with Apple"
              onPress={handleAppleLogin}
              variant="outline"
              fullWidth
              style={styles.socialButton}
            />
          </View>

          {/* Sign up link */}
          <View style={styles.signupContainer}>
            <Text style={styles.signupText}>Don't have an account?</Text>
            <TouchableOpacity onPress={navigateToSignup}>
              <Text style={styles.signupLink}>Sign up</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: theme.colors.surface,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    flexGrow: 1,
    paddingHorizontal: theme.spacing.lg,
    paddingTop: theme.spacing.xl,
    paddingBottom: theme.spacing.lg,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  logo: {
    fontSize: theme.typography.headingSizes.h1,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  tagline: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
  },
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  errorContainer: {
    backgroundColor: `${theme.colors.error}20`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
  },
  errorText: {
    color: theme.colors.error,
    fontSize: theme.typography.bodyText.small,
  },
  forgotPasswordLink: {
    alignSelf: 'flex-end',
    marginBottom: theme.spacing.md,
  },
  forgotPasswordText: {
    color: theme.colors.primary,
    fontSize: theme.typography.bodyText.small,
  },
  loginButton: {
    marginBottom: theme.spacing.lg,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.lg,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: theme.colors.neutralDark,
  },
  dividerText: {
    marginHorizontal: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.bodyText.small,
  },
  socialButton: {
    marginBottom: theme.spacing.md,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  signupLink: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
});

export default LoginScreen; 