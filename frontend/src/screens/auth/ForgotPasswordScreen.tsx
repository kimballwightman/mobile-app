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

type ForgotPasswordScreenProps = {
  navigation: NativeStackNavigationProp<AuthStackParamList, 'ForgotPassword'>;
};

const ForgotPasswordScreen: React.FC<ForgotPasswordScreenProps> = ({ navigation }) => {
  const [email, setEmail] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [requestSent, setRequestSent] = useState<boolean>(false);

  // Ensure any keyboard dismissal due to navigation is handled
  useEffect(() => {
    const unsubscribe = navigation.addListener('blur', () => {
      Keyboard.dismiss();
    });

    return unsubscribe;
  }, [navigation]);

  const validateEmail = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Please enter a valid email address');
      return false;
    }
    
    return true;
  };

  const handleSubmit = async () => {
    if (!validateEmail()) return;

    try {
      setIsLoading(true);
      setError(null);

      // Call the forgot password API
      try {
        await ApiService.auth.forgotPassword(email);
        
        // Show success state
        setRequestSent(true);
        
      } catch (apiError: any) {
        // Handle specific API errors
        if (apiError.response) {
          switch (apiError.response.status) {
            case 404:
              // Don't reveal if user exists or not for security reasons
              setRequestSent(true); // Still show success to prevent user enumeration
              break;
            default:
              setError('Request failed. Please try again.');
          }
        } else if (apiError.request) {
          setError('Server not responding. Check your connection.');
        } else {
          setError('Error. Please try again.');
        }
        console.error('API error:', apiError);
      }
      
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      setError('An unexpected error occurred. Please try again.');
      console.error('Forgot password error:', err);
    }
  };

  const handleResend = () => {
    // Reset the request state and resubmit
    setRequestSent(false);
    handleSubmit();
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
            <Text style={styles.title}>Forgot Password</Text>
            <Text style={styles.subtitle}>
              {!requestSent 
                ? "Enter your email and we'll send you instructions to reset your password" 
                : "Check your email for a link to reset your password"
              }
            </Text>
          </View>

          {/* Form */}
          <View style={styles.formContainer}>
            {error && (
              <View style={styles.errorContainer}>
                <Text style={styles.errorText}>{error}</Text>
              </View>
            )}

            {!requestSent ? (
              <>
                <InputField
                  label="Email"
                  value={email}
                  onChangeText={(text) => {
                    setEmail(text);
                    setError(null);
                  }}
                  placeholder="Enter your email"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoComplete="email"
                  textContentType="emailAddress"
                  autoFocus={true}
                  returnKeyType="done"
                  onSubmitEditing={handleSubmit}
                />

                <Button
                  title="Send Reset Link"
                  onPress={handleSubmit}
                  loading={isLoading}
                  fullWidth
                  style={styles.submitButton}
                />
              </>
            ) : (
              <>
                <View style={styles.successContainer}>
                  <Text style={styles.successTitle}>Email Sent!</Text>
                  <Text style={styles.successText}>
                    We've sent an email to <Text style={styles.emailHighlight}>{email}</Text> with a 
                    link to reset your password.
                  </Text>
                </View>

                <Button
                  title="Resend Email"
                  onPress={handleResend}
                  variant="outline"
                  fullWidth
                  style={styles.resendButton}
                />

                <Button
                  title="Back to Login"
                  onPress={navigateToLogin}
                  variant="text"
                  fullWidth
                  style={styles.loginButton}
                />
              </>
            )}
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
    marginBottom: theme.spacing.sm,
  },
  subtitle: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    lineHeight: theme.typography.lineHeight.base * theme.typography.bodyText.regular,
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
  submitButton: {
    marginTop: theme.spacing.lg,
  },
  successContainer: {
    backgroundColor: `${theme.colors.success}10`,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.lg,
    marginBottom: theme.spacing.lg,
    alignItems: 'center',
  },
  successTitle: {
    fontSize: theme.typography.headingSizes.h5,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.success,
    marginBottom: theme.spacing.sm,
  },
  successText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    lineHeight: theme.typography.lineHeight.base * theme.typography.bodyText.regular,
  },
  emailHighlight: {
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.textPrimary,
  },
  resendButton: {
    marginBottom: theme.spacing.md,
  },
  loginButton: {
    marginTop: theme.spacing.xs,
  },
});

export default ForgotPasswordScreen; 