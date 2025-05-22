import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  SafeAreaView,
  Alert,
  Keyboard,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import ApiService from '../../services/api';

// Define the navigation props
type AuthStackParamList = {
  Login: { animation?: string } | undefined;
  Signup: undefined;
  ForgotPassword: undefined;
};

type SignupScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'Signup'>;
};

const SignupScreen: React.FC<SignupScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [fullName, setFullName] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Ensure any keyboard dismissal due to navigation is handled
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      Keyboard.dismiss();
    });

    return unsubscribe;
  }, [navigation]);

  const validateInputs = (): boolean => {
    // Full name validation
    if (!fullName.trim()) {
      setError('Full name is required');
      return false;
    }
    
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
    
    // Confirm password validation
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    
    return true;
  };

  const handleSignup = async () => {
    // Validate inputs
    if (!validateInputs()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Attempt to signup using API service
      try {
        const response = await ApiService.auth.signup({
          email,
          password,
          full_name: fullName,
        });
        
        // In a real app, you would store the tokens using secure storage
        console.log('Signup successful', response.data);
        
        // Navigate to onboarding flow or main app
        Alert.alert(
          "Account Created",
          "Your account has been created successfully!",
          [
            {
              text: "OK",
              onPress: () => navigation.navigate('Login'),
            }
          ]
        );
        
      } catch (apiError: any) {
        // Handle specific API errors
        if (apiError.response) {
          // Server responded with a status code outside of 2xx range
          switch (apiError.response.status) {
            case 400:
              setError(apiError.response.data?.detail || 'Email is already registered');
              break;
            case 422:
              setError('Invalid input data');
              break;
            default:
              setError('Signup failed. Please try again.');
          }
        } else if (apiError.request) {
          // No response received
          setError('Server not responding. Check your connection.');
        } else {
          // Something else happened while setting up the request
          setError('Signup error. Please try again.');
        }
        console.error('API error:', apiError);
      }
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Signup error:', err);
    }
  };

  const navigateToLogin = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.container}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 0}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          keyboardShouldPersistTaps="always"
          keyboardDismissMode="interactive"
        >
          {/* Back Button */}
          <TouchableOpacity 
            style={styles.backButton}
            onPress={navigateToLogin}
          >
            <Text style={styles.backButtonText}>← Back to Login</Text>
          </TouchableOpacity>

          {/* Header */}
          <View style={styles.header}>
            <Text style={styles.title}>Create Account</Text>
            <Text style={styles.subtitle}>Sign up to get started with NutriPlan</Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            <InputField
              label="Full Name"
              value={fullName}
              onChangeText={(text) => {
                setFullName(text);
                setError(null); // Clear error when user types
              }}
              placeholder="Enter your full name"
              autoCapitalize="words"
              textContentType="name"
              autoFocus={true}
              returnKeyType="next"
            />

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
              returnKeyType="next"
            />

            <InputField
              label="Password"
              value={password}
              onChangeText={(text) => {
                setPassword(text);
                setError(null); // Clear error when user types
              }}
              placeholder="Create a password (min 6 characters)"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
              returnKeyType="next"
            />

            <InputField
              label="Confirm Password"
              value={confirmPassword}
              onChangeText={(text) => {
                setConfirmPassword(text);
                setError(null); // Clear error when user types
              }}
              placeholder="Confirm your password"
              secureTextEntry
              autoCapitalize="none"
              textContentType="newPassword"
              returnKeyType="done"
              onSubmitEditing={handleSignup}
            />

            <Button
              title="Create Account"
              onPress={handleSignup}
              loading={isLoading}
              fullWidth
              style={styles.signupButton}
            />
          </View>

          {/* Login link */}
          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account?</Text>
            <TouchableOpacity onPress={navigateToLogin}>
              <Text style={styles.loginLink}>Log in</Text>
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
  backButton: {
    marginBottom: theme.spacing.lg,
  },
  backButtonText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.medium as any,
  },
  header: {
    marginBottom: theme.spacing.xl,
  },
  title: {
    fontSize: theme.typography.headingSizes.h3,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
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
  signupButton: {
    marginTop: theme.spacing.lg,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.xs,
  },
  loginLink: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
});

export default SignupScreen; 