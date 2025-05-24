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

// Define the goal options
const GOAL_OPTIONS = [
  { id: 'cut', label: 'Cut', description: 'Lose fat while maintaining muscle mass' },
  { id: 'maintain', label: 'Maintain', description: 'Maintain current weight and body composition' },
  { id: 'bulk', label: 'Bulk', description: 'Gain muscle while minimizing fat gain' },
];

type OnboardingStackParamList = {
  DefineGoal: undefined;
  ConnectToAppleHealth: undefined;
  UserInfo: undefined;
};

type DefineGoalScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'DefineGoal'>;
};

const DefineGoalScreen: React.FC<DefineGoalScreenProps> = ({ navigation }) => {
  const [selectedGoal, setSelectedGoal] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleGoalSelection = (goalId: string) => {
    setSelectedGoal(goalId);
    setError(null);
  };

  const handleNext = async () => {
    if (!selectedGoal) {
      setError('Please select a goal to continue');
      return;
    }

    setIsLoading(true);
    try {
      // Save the selected goal to the API
      await ApiService.onboarding.saveGoal({ goal: selectedGoal });
      
      // Navigate to the next screen
      navigation.navigate('ConnectToAppleHealth');
    } catch (error) {
      console.error('Error saving goal:', error);
      setError('Failed to save your goal. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Define Your Goal</Text>
          <Text style={styles.subtitle}>
            Let us help you reach your nutrition and fitness goals
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.goalsContainer}>
          {GOAL_OPTIONS.map((goal) => (
            <View 
              key={goal.id} 
              style={[
                styles.goalOption,
                selectedGoal === goal.id && styles.goalOptionSelected
              ]}
            >
              <Button
                title={goal.label}
                onPress={() => handleGoalSelection(goal.id)}
                variant={selectedGoal === goal.id ? 'primary' : 'outline'}
                fullWidth
              />
              <Text style={styles.goalDescription}>{goal.description}</Text>
            </View>
          ))}
        </View>

        <View style={styles.buttonContainer}>
          <Button
            title="Next"
            onPress={handleNext}
            loading={isLoading}
            fullWidth
            disabled={!selectedGoal}
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 1 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '11%' }]} />
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
  goalsContainer: {
    marginBottom: theme.spacing.xl,
  },
  goalOption: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  goalOptionSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  goalDescription: {
    marginTop: theme.spacing.sm,
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  buttonContainer: {
    marginBottom: theme.spacing.xl,
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

export default DefineGoalScreen; 