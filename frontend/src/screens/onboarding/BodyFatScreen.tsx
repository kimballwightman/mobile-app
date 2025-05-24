import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Image,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  WorkoutsPerWeek: undefined;
  BodyFat: undefined;
  NutritionalGoals: undefined;
};

type BodyFatScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'BodyFat'>;
};

const BODY_FAT_OPTIONS = [
  { 
    id: 'essential',
    label: 'Essential',
    maleRange: '3-5%',
    femaleRange: '10-13%',
    description: 'Essential fat necessary for basic body functions.'
  },
  { 
    id: 'athlete',
    label: 'Athletic',
    maleRange: '6-13%',
    femaleRange: '14-20%',
    description: 'Typical for competitive athletes with visible muscle definition.'
  },
  { 
    id: 'fitness',
    label: 'Fitness',
    maleRange: '14-17%',
    femaleRange: '21-24%',
    description: 'Lean with some definition, typical for someone who exercises regularly.'
  },
  { 
    id: 'average',
    label: 'Average',
    maleRange: '18-24%',
    femaleRange: '25-31%',
    description: 'Average body fat level with less visible muscle definition.'
  },
  { 
    id: 'above_average',
    label: 'Above Average',
    maleRange: '25+%',
    femaleRange: '32+%',
    description: 'Higher body fat level with minimal visible muscle definition.'
  }
];

const BodyFatScreen: React.FC<BodyFatScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [bodyFatPercentage, setBodyFatPercentage] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setError(null);
  };

  const handlePercentageChange = (text: string) => {
    // Allow only numbers and decimal point
    const filtered = text.replace(/[^0-9.]/g, '');
    setBodyFatPercentage(filtered);
    setError(null);
  };

  const handleNext = async () => {
    if (!selectedCategory) {
      setError('Please select an estimated body fat category');
      return;
    }

    // Validate percentage if entered
    if (bodyFatPercentage) {
      const percentage = parseFloat(bodyFatPercentage);
      if (isNaN(percentage) || percentage < 1 || percentage > 70) {
        setError('Please enter a valid body fat percentage (1-70%)');
        return;
      }
    }

    setIsLoading(true);
    try {
      // Save body fat data to API
      const bodyFatData = {
        category: selectedCategory,
        percentage: bodyFatPercentage ? parseFloat(bodyFatPercentage) : null
      };
      
      console.log("Sending body fat data:", JSON.stringify(bodyFatData));
      await ApiService.onboarding.saveBodyFat(bodyFatData);
      
      // Navigate to the next screen
      navigation.navigate('NutritionalGoals');
    } catch (error) {
      console.error('Error saving body fat data:', error);
      setError('Failed to save your body fat data. Please try again.');
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
          <Text style={styles.title}>Estimate Your Body Fat</Text>
          <Text style={styles.subtitle}>
            Select the category that most closely resembles your body composition
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.optionsContainer}>
          {BODY_FAT_OPTIONS.map((option) => (
            <TouchableOpacity
              key={option.id}
              style={[
                styles.optionItem,
                selectedCategory === option.id && styles.optionItemSelected
              ]}
              onPress={() => handleSelect(option.id)}
            >
              <View style={styles.optionContent}>
                <View style={styles.optionInfo}>
                  <Text style={styles.optionLabel}>{option.label}</Text>
                  <Text style={styles.optionRanges}>
                    Male: {option.maleRange} | Female: {option.femaleRange}
                  </Text>
                  <Text style={styles.optionDescription}>{option.description}</Text>
                </View>
                <View style={styles.optionImageContainer}>
                  {/* Placeholder for actual body fat percentage images */}
                  <View style={styles.optionImagePlaceholder}>
                    <Text style={styles.optionImagePlaceholderText}>
                      {option.label[0]}
                    </Text>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.percentageInputContainer}>
          <Text style={styles.percentageInputLabel}>
            If you know your exact body fat percentage, enter it here (optional):
          </Text>
          <View style={styles.percentageInputWrapper}>
            <TextInput
              style={styles.percentageInput}
              value={bodyFatPercentage}
              onChangeText={handlePercentageChange}
              keyboardType="decimal-pad"
              placeholder="0.0"
            />
            <Text style={styles.percentageSymbol}>%</Text>
          </View>
        </View>

        <View style={styles.disclaimerContainer}>
          <Text style={styles.disclaimerText}>
            Note: This is just an estimate to help personalize your nutrition plan. You don't need to be precise.
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
            title="Next"
            onPress={handleNext}
            loading={isLoading}
          />
        </View>

        <View style={styles.progressContainer}>
          <Text style={styles.progressText}>Step 5 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '55%' }]} />
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
  optionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  optionInfo: {
    flex: 3,
  },
  optionLabel: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: 4,
  },
  optionRanges: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.primary,
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  optionImageContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImagePlaceholder: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: theme.colors.neutralDark,
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionImagePlaceholderText: {
    fontSize: 20,
    color: theme.colors.surface,
  },
  disclaimerContainer: {
    marginBottom: theme.spacing.lg,
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: theme.borderRadius.md,
  },
  disclaimerText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    fontStyle: 'italic',
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
  percentageInputContainer: {
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  percentageInputLabel: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  percentageInputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  percentageInput: {
    flex: 1,
    height: 40,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
  },
  percentageSymbol: {
    marginLeft: theme.spacing.sm,
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
    width: 20,
  },
});

export default BodyFatScreen; 