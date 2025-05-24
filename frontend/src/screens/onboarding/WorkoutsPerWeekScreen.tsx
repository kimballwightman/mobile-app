import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  UserInfo: undefined;
  WorkoutsPerWeek: undefined;
  BodyFat: undefined;
};

type WorkoutsPerWeekScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'WorkoutsPerWeek'>;
};

const WORKOUT_OPTIONS = [
  { value: 0, label: '0 (None)' },
  { value: 1, label: '1 day / week' },
  { value: 2, label: '2 days / week' },
  { value: 3, label: '3 days / week' },
  { value: 4, label: '4 days / week' },
  { value: 5, label: '5 days / week' },
  { value: 6, label: '6 days / week' },
  { value: 7, label: '7 days / week' },
];

const WorkoutsPerWeekScreen: React.FC<WorkoutsPerWeekScreenProps> = ({ navigation }) => {
  const [selectedValue, setSelectedValue] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (value: number) => {
    setSelectedValue(value);
    setError(null);
  };

  const handleNext = async () => {
    if (selectedValue === null) {
      setError('Please select how many times you work out per week');
      return;
    }

    setIsLoading(true);
    try {
      // Save workout frequency to API
      await ApiService.onboarding.saveWorkoutFrequency({ workoutsPerWeek: selectedValue });
      
      // Navigate to the next screen
      navigation.navigate('BodyFat');
    } catch (error) {
      console.error('Error saving workout frequency:', error);
      setError('Failed to save your workout frequency. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>How Often Do You Work Out?</Text>
          <Text style={styles.subtitle}>
            This helps us calculate your caloric needs accurately
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {WORKOUT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.optionItem,
                selectedValue === option.value && styles.optionItemSelected
              ]}
              onPress={() => handleSelect(option.value)}
            >
              <Text 
                style={[
                  styles.optionText,
                  selectedValue === option.value && styles.optionTextSelected
                ]}
              >
                {option.label}
              </Text>
            </TouchableOpacity>
          ))}
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
          <Text style={styles.progressText}>Step 4 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '44%' }]} />
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
  optionsContainer: {
    marginBottom: theme.spacing.xl,
  },
  optionItem: {
    padding: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  optionItemSelected: {
    borderColor: theme.colors.primary,
    backgroundColor: `${theme.colors.primary}10`,
  },
  optionText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
  },
  optionTextSelected: {
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.primary,
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

export default WorkoutsPerWeekScreen; 