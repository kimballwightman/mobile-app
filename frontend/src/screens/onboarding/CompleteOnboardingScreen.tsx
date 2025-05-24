import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';
import { useAuth } from '../../context/AuthContext';

type OnboardingStackParamList = {
  Allergies: undefined;
  CompleteOnboarding: undefined;
};

type CompleteOnboardingScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'CompleteOnboarding'>;
};

const CompleteOnboardingScreen: React.FC<CompleteOnboardingScreenProps> = ({ navigation }) => {
  const { completeOnboarding } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleFinish = async () => {
    setIsLoading(true);
    try {
      // Call API to mark onboarding as complete
      await completeOnboarding();
    } catch (error) {
      console.error('Error completing onboarding:', error);
      setError('Failed to complete onboarding. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>All Set Up!</Text>
          <Text style={styles.subtitle}>
            Your profile is complete and we're ready to help you reach your fitness goals
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.successContainer}>
          <View style={styles.checkmarkContainer}>
            <Text style={styles.checkmark}>✓</Text>
          </View>
          <Text style={styles.successText}>Profile Setup Complete</Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>What's Next?</Text>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Dashboard: Track your daily progress and nutrition
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Explore: Discover recipes tailored to your goals
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Plan: Create and customize your meal plans
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Pantry: Keep track of your ingredients and grocery lists
            </Text>
          </View>
        </View>

        <View style={styles.ctaContainer}>
          <Text style={styles.ctaText}>
            Click the button below to complete your onboarding and start using the app!
          </Text>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          <Button
            title="Let's Get Started!"
            onPress={handleFinish}
            loading={isLoading}
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 9 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '100%' }]} />
          </View>
        </View>
      </ScrollView>
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
  contentContainer: {
    padding: theme.spacing.lg,
  },
  header: {
    marginBottom: theme.spacing.xl,
    alignItems: 'center',
  },
  title: {
    fontSize: theme.typography.headingSizes.h1,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    textAlign: 'center',
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
  successContainer: {
    alignItems: 'center',
    marginVertical: theme.spacing.xl * 2,
  },
  checkmarkContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: theme.spacing.md,
  },
  checkmark: {
    fontSize: 40,
    color: theme.colors.surface,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
  successText: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
  },
  infoContainer: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: theme.borderRadius.md,
  },
  infoTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  infoItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.xs,
  },
  bulletPoint: {
    width: 15,
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
  },
  infoText: {
    flex: 1,
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  ctaContainer: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.success}20`,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.success,
  },
  ctaText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
    textAlign: 'center',
    fontWeight: theme.typography.fontWeight.medium as any,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.xl,
  },
  backButton: {
    marginRight: theme.spacing.md,
  },
  progressContainer: {
    marginBottom: theme.spacing.md,
  },
  progressText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.xs,
    textAlign: 'center',
  },
  progressBar: {
    height: 6,
    backgroundColor: theme.colors.neutralDark,
    borderRadius: 3,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: theme.colors.primary,
    borderRadius: 3,
  }
});

export default CompleteOnboardingScreen; 