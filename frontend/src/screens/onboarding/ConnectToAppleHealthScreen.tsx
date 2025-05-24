import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Switch,
  Platform,
  Image,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  DefineGoal: undefined;
  ConnectToAppleHealth: undefined;
  UserInfo: undefined;
};

type ConnectToAppleHealthScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'ConnectToAppleHealth'>;
};

const ConnectToAppleHealthScreen: React.FC<ConnectToAppleHealthScreenProps> = ({ navigation }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const toggleConnection = async (value: boolean) => {
    if (Platform.OS !== 'ios') {
      // Only available on iOS
      return;
    }

    setIsLoading(true);
    try {
      setIsConnected(value);
      // In a real implementation, this would connect to Apple Health API
      if (value) {
        await ApiService.onboarding.saveHealthData({ appleHealthConnected: true });
      }
    } catch (error) {
      console.error('Error connecting to Apple Health:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNext = async () => {
    // Navigate to next screen regardless of connection state
    navigation.navigate('UserInfo');
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Connect to Apple Health</Text>
          <Text style={styles.subtitle}>
            Connect to Apple Health to automatically import your health data and streamline your experience
          </Text>
        </View>

        <View style={styles.connectionContainer}>
          <View style={styles.iconContainer}>
            {/* Placeholder for Apple Health logo */}
            <View style={styles.healthIcon}>
              <Text style={styles.healthIconText}>❤️</Text>
            </View>
          </View>

          <View style={styles.connectionContent}>
            <View style={styles.switchRow}>
              <Text style={styles.connectionText}>Connect to Apple Health</Text>
              <Switch
                value={isConnected}
                onValueChange={toggleConnection}
                disabled={isLoading || Platform.OS !== 'ios'}
                trackColor={{ false: theme.colors.neutralDark, true: theme.colors.primary }}
              />
            </View>

            <Text style={styles.connectionInfo}>
              {isConnected
                ? 'Your data will be automatically imported from Apple Health'
                : 'You can manually enter your information in the next steps'}
            </Text>
            
            {Platform.OS !== 'ios' && (
              <Text style={styles.notAvailableText}>
                Apple Health is only available on iOS devices
              </Text>
            )}
          </View>
        </View>

        <View style={styles.benefitsContainer}>
          <Text style={styles.benefitsTitle}>What data we'll import:</Text>
          
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Height and weight</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Activity data</Text>
          </View>
          
          <View style={styles.benefitItem}>
            <Text style={styles.benefitIcon}>✓</Text>
            <Text style={styles.benefitText}>Workout history</Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Back"
            onPress={handleBack}
            variant="outline"
            style={styles.backButton}
          />
          <Button
            title="Next"
            onPress={handleNext}
            loading={isLoading}
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 2 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '22%' }]} />
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
  },
  title: {
    fontSize: theme.typography.headingSizes.h2,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  subtitle: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
  },
  connectionContainer: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.xl,
  },
  iconContainer: {
    marginRight: theme.spacing.md,
    justifyContent: 'center',
  },
  healthIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#FF2D55',
    justifyContent: 'center',
    alignItems: 'center',
  },
  healthIconText: {
    fontSize: 24,
  },
  connectionContent: {
    flex: 1,
  },
  switchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  connectionText: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
  },
  connectionInfo: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  notAvailableText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.error,
    marginTop: theme.spacing.sm,
  },
  benefitsContainer: {
    marginBottom: theme.spacing.xl,
  },
  benefitsTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  benefitItem: {
    flexDirection: 'row',
    marginBottom: theme.spacing.sm,
  },
  benefitIcon: {
    color: theme.colors.success,
    fontSize: theme.typography.bodyText.regular,
    marginRight: theme.spacing.sm,
    fontWeight: theme.typography.fontWeight.bold as any,
  },
  benefitText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
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
  },
});

export default ConnectToAppleHealthScreen; 