import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  Dimensions,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  NutritionalGoals: undefined;
  Budget: undefined;
  Allergies: undefined;
};

type BudgetScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'Budget'>;
};

const BudgetScreen: React.FC<BudgetScreenProps> = ({ navigation }) => {
  const [budgetRange, setBudgetRange] = useState([300, 500]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const sliderWidth = Dimensions.get('window').width - 80; // Account for padding

  const handleSliderChange = (values: number[]) => {
    setBudgetRange(values);
    setError(null);
  };

  const handleNext = async () => {
    if (budgetRange[0] >= budgetRange[1]) {
      setError('Minimum budget cannot be greater than or equal to maximum budget');
      return;
    }

    setIsLoading(true);
    try {
      // Convert to integers before saving budget data to API
      await ApiService.onboarding.saveBudget({
        minBudget: Math.round(budgetRange[0]),
        maxBudget: Math.round(budgetRange[1])
      });
      
      // Navigate to the next screen
      navigation.navigate('Allergies');
    } catch (error) {
      console.error('Error saving budget data:', error);
      setError('Failed to save your budget preferences. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  // Custom marker for the slider
  const CustomMarker = () => {
    return (
      <View style={styles.customMarker} />
    );
  };

  // Format value to show "1000+" if value is exactly 1000
  const formatValue = (value: number) => {
    return value === 1000 ? "1000+" : `$${value}`;
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
        <View style={styles.header}>
          <Text style={styles.title}>Weekly Grocery Budget</Text>
          <Text style={styles.subtitle}>
            Let us know your grocery budget range to tailor meal recommendations
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.budgetContainer}>
          <Text style={styles.sectionTitle}>Weekly Grocery Budget Range</Text>
          
          <View style={styles.sliderContainer}>
            <View style={styles.sliderValueContainer}>
              <Text style={styles.sliderValue}>{formatValue(budgetRange[0])}</Text>
              <Text style={styles.sliderValue}>{formatValue(budgetRange[1])}</Text>
            </View>
            
            <MultiSlider
              values={budgetRange}
              min={0}
              max={1000}
              step={10}
              sliderLength={sliderWidth}
              onValuesChange={handleSliderChange}
              selectedStyle={{
                backgroundColor: theme.colors.primary,
              }}
              unselectedStyle={{
                backgroundColor: theme.colors.neutralDark,
              }}
              containerStyle={styles.sliderTrack}
              markerStyle={styles.marker}
              enabledOne={true}
              enabledTwo={true}
              customMarker={CustomMarker}
            />
            
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>$0</Text>
              <Text style={styles.sliderLabelText}>$1000+</Text>
            </View>
          </View>
          
          <Text style={styles.budgetDescription}>
            Slide to select your ideal weekly budget range for groceries
          </Text>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoTitle}>How we'll use this information:</Text>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Recommend meals and ingredients that fit within your budget
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Help you allocate your grocery spending more effectively
            </Text>
          </View>
          <View style={styles.infoItem}>
            <Text style={styles.bulletPoint}>•</Text>
            <Text style={styles.infoText}>
              Suggest cost-saving tips while maintaining nutritional quality
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
          <Text style={styles.progressText}>Step 7 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '77%' }]} />
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
  budgetContainer: {
    marginBottom: theme.spacing.xl,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
    padding: theme.spacing.md,
  },
  sectionTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.md,
  },
  sliderContainer: {
    marginVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.sm,
  },
  sliderValueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: theme.spacing.md,
  },
  sliderValue: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.bold as any,
    color: theme.colors.primary,
  },
  sliderTrack: {
    height: 40,
    alignItems: 'center',
  },
  marker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  customMarker: {
    height: 24,
    width: 24,
    borderRadius: 12,
    backgroundColor: theme.colors.primary,
    borderWidth: 2,
    borderColor: theme.colors.surface,
    shadowColor: theme.colors.textPrimary,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 1,
    elevation: 2,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  sliderLabelText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  budgetDescription: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    marginTop: theme.spacing.md,
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
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
    marginRight: theme.spacing.xs,
  },
  infoText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    flex: 1,
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

export default BudgetScreen; 