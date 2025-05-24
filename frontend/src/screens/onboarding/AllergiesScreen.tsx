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
  Budget: undefined;
  Allergies: undefined;
  CompleteOnboarding: undefined;
};

type AllergiesScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Allergies'>;
};

const ALLERGY_OPTIONS = [
  { id: 'gluten', label: 'Gluten' },
  { id: 'dairy', label: 'Dairy' },
  { id: 'eggs', label: 'Eggs' },
  { id: 'fish', label: 'Fish' },
  { id: 'shellfish', label: 'Shellfish' },
  { id: 'peanuts', label: 'Peanuts' },
  { id: 'tree_nuts', label: 'Tree Nuts' },
  { id: 'soy', label: 'Soy' },
  { id: 'sesame', label: 'Sesame' },
  { id: 'wheat', label: 'Wheat' },
  { id: 'mustard', label: 'Mustard' },
  { id: 'celery', label: 'Celery' },
  { id: 'sulfites', label: 'Sulfites' },
];

const DIET_OPTIONS = [
  { id: 'vegetarian', label: 'Vegetarian' },
  { id: 'vegan', label: 'Vegan' },
  { id: 'pescatarian', label: 'Pescatarian' },
  { id: 'keto', label: 'Keto' },
  { id: 'paleo', label: 'Paleo' },
  { id: 'low_carb', label: 'Low Carb' },
  { id: 'low_fat', label: 'Low Fat' },
  { id: 'halal', label: 'Halal' },
  { id: 'kosher', label: 'Kosher' },
];

const AllergiesScreen: React.FC<AllergiesScreenProps> = ({ navigation }) => {
  const [selectedAllergies, setSelectedAllergies] = useState<string[]>([]);
  const [selectedDiets, setSelectedDiets] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleAllergy = (allergyId: string) => {
    setSelectedAllergies(prev => {
      if (prev.includes(allergyId)) {
        return prev.filter(id => id !== allergyId);
      } else {
        return [...prev, allergyId];
      }
    });
    setError(null);
  };

  const toggleDiet = (dietId: string) => {
    setSelectedDiets(prev => {
      if (prev.includes(dietId)) {
        return prev.filter(id => id !== dietId);
      } else {
        return [...prev, dietId];
      }
    });
    setError(null);
  };

  const handleNext = async () => {
    setIsLoading(true);
    try {
      // Save allergies data to API
      await ApiService.onboarding.saveAllergies({
        allergies: selectedAllergies,
        diets: selectedDiets
      });
      
      // Navigate to the CompleteOnboarding screen
      navigation.navigate('CompleteOnboarding');
      console.log("Navigating to CompleteOnboarding screen");
    } catch (error) {
      console.error('Error saving allergies and diet data:', error);
      setError('Failed to save your allergies and diet preferences. Please try again.');
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
          <Text style={styles.title}>Dietary Restrictions</Text>
          <Text style={styles.subtitle}>
            Select any food allergies or dietary preferences you have so we can customize your meal plans
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Food Allergies</Text>
          <View style={styles.optionsContainer}>
            {ALLERGY_OPTIONS.map((allergy) => (
              <TouchableOpacity
                key={allergy.id}
                style={[
                  styles.optionButton,
                  selectedAllergies.includes(allergy.id) && styles.selectedOption
                ]}
                onPress={() => toggleAllergy(allergy.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedAllergies.includes(allergy.id) && styles.selectedOptionText
                  ]}
                >
                  {allergy.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dietary Preferences</Text>
          <View style={styles.optionsContainer}>
            {DIET_OPTIONS.map((diet) => (
              <TouchableOpacity
                key={diet.id}
                style={[
                  styles.optionButton,
                  selectedDiets.includes(diet.id) && styles.selectedOption
                ]}
                onPress={() => toggleDiet(diet.id)}
              >
                <Text
                  style={[
                    styles.optionText,
                    selectedDiets.includes(diet.id) && styles.selectedOptionText
                  ]}
                >
                  {diet.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>Why this matters:</Text>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Ensures your meal plans don't include foods you can't or don't want to eat
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Helps us find suitable alternatives that meet your nutritional needs
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              You can update these preferences anytime in your profile settings
            </Text>
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
          <Text style={styles.progressText}>Step 8 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '88%' }]} />
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
  section: {
    marginBottom: theme.spacing.xl,
  },
  sectionTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  optionsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  optionButton: {
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
  },
  selectedOption: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  optionText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  selectedOptionText: {
    color: theme.colors.surface,
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

export default AllergiesScreen; 