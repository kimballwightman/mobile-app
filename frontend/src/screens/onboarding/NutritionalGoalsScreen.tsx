import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Keyboard,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import Slider from '@react-native-community/slider';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  BodyFat: undefined;
  NutritionalGoals: undefined;
  Budget: undefined;
};

type NutritionalGoalsScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'NutritionalGoals'>;
};

// Default macronutrient distribution
const DEFAULT_MACRO_PERCENTAGES = {
  protein: 30,
  carbs: 40,
  fat: 30
};

const NutritionalGoalsScreen: React.FC<NutritionalGoalsScreenProps> = ({ navigation }) => {
  // State for calorie target
  const [calorieTarget, setCalorieTarget] = useState('2000');
  
  // State for macros (in grams)
  const [proteinGrams, setProteinGrams] = useState('150');
  const [carbsGrams, setCarbsGrams] = useState('200');
  const [fatGrams, setFatGrams] = useState('67');
  
  // State for adherence percentage (default is 90%)
  const [adherencePercent, setAdherencePercent] = useState(90);
  
  // State for loading and errors
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate macro percentages based on grams
  const calculateMacroPercentages = () => {
    const protein = parseInt(proteinGrams) || 0;
    const carbs = parseInt(carbsGrams) || 0;
    const fat = parseInt(fatGrams) || 0;
    
    const proteinCalories = protein * 4; // 4 calories per gram of protein
    const carbsCalories = carbs * 4; // 4 calories per gram of carbs
    const fatCalories = fat * 9; // 9 calories per gram of fat
    
    const totalCalories = proteinCalories + carbsCalories + fatCalories;
    
    if (totalCalories === 0) return DEFAULT_MACRO_PERCENTAGES;
    
    return {
      protein: Math.round((proteinCalories / totalCalories) * 100),
      carbs: Math.round((carbsCalories / totalCalories) * 100),
      fat: Math.round((fatCalories / totalCalories) * 100),
    };
  };

  // Recalculate macros when calorie target changes
  const recalculateMacros = (newCalories: string) => {
    const calories = parseInt(newCalories) || 2000;
    
    // Use default distribution to calculate new macro grams
    const proteinCalories = calories * (DEFAULT_MACRO_PERCENTAGES.protein / 100);
    const carbsCalories = calories * (DEFAULT_MACRO_PERCENTAGES.carbs / 100);
    const fatCalories = calories * (DEFAULT_MACRO_PERCENTAGES.fat / 100);
    
    setProteinGrams(Math.round(proteinCalories / 4).toString());
    setCarbsGrams(Math.round(carbsCalories / 4).toString());
    setFatGrams(Math.round(fatCalories / 9).toString());
  };

  // Handle calorie input change
  const handleCalorieChange = (text: string) => {
    setCalorieTarget(text);
    if (text.trim() !== '' && !isNaN(parseInt(text))) {
      recalculateMacros(text);
    }
    setError(null);
  };

  // Handle adherence slider change
  const handleAdherenceChange = (value: number) => {
    setAdherencePercent(Math.round(value));
  };

  // Handle protein input change
  const handleProteinChange = (text: string) => {
    setProteinGrams(text);
    setError(null);
  };

  // Handle carbs input change
  const handleCarbsChange = (text: string) => {
    setCarbsGrams(text);
    setError(null);
  };

  // Handle fat input change
  const handleFatChange = (text: string) => {
    setFatGrams(text);
    setError(null);
  };

  // Validate inputs
  const validateInputs = (): boolean => {
    const calories = parseInt(calorieTarget);
    const protein = parseInt(proteinGrams);
    const carbs = parseInt(carbsGrams);
    const fat = parseInt(fatGrams);
    
    if (isNaN(calories) || calories < 500 || calories > 10000) {
      setError('Please enter a valid calorie target (500-10,000)');
      return false;
    }
    
    if (isNaN(protein) || protein < 0) {
      setError('Please enter a valid protein amount');
      return false;
    }
    
    if (isNaN(carbs) || carbs < 0) {
      setError('Please enter a valid carbohydrate amount');
      return false;
    }
    
    if (isNaN(fat) || fat < 0) {
      setError('Please enter a valid fat amount');
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    if (!validateInputs()) {
      return;
    }

    Keyboard.dismiss();
    setIsLoading(true);
    try {
      // Calculate macros in calories and percentages
      const macroPercentages = calculateMacroPercentages();
      
      // Prepare data to save
      const nutritionalGoals = {
        calorieTarget: parseInt(calorieTarget),
        proteinGrams: parseInt(proteinGrams),
        carbGrams: parseInt(carbsGrams), 
        fatGrams: parseInt(fatGrams),
        adherencePercent: adherencePercent
      };
      
      // Save nutritional goals to API
      await ApiService.onboarding.saveNutritionalGoals(nutritionalGoals);
      
      // Navigate to the next screen
      navigation.navigate('Budget');
    } catch (error) {
      console.error('Error saving nutritional goals:', error);
      setError('Failed to save your nutritional goals. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleBack = () => {
    Keyboard.dismiss();
    navigation.goBack();
  };

  const macroPercentages = calculateMacroPercentages();

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView 
        style={styles.container} 
        contentContainerStyle={styles.contentContainer}
        keyboardShouldPersistTaps="always"
        keyboardDismissMode="none"
        scrollEnabled={true}
        overScrollMode="always"
      >
        <View style={styles.header}>
          <Text style={styles.title}>Set Your Nutritional Goals</Text>
          <Text style={styles.subtitle}>
            Define your daily calorie target and macronutrient breakdown
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Daily Calorie Target</Text>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TextInput
              value={calorieTarget}
              onChangeText={handleCalorieChange}
              keyboardType="numeric"
              placeholder="2000"
              style={{
                width: '70%',
                height: 50,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                backgroundColor: 'white',
                marginRight: 10
              }}
            />
            <Text>calories</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Target Adherence</Text>
          <Text style={styles.adherenceLabel}>
            How strict do you want to be on these targets?
          </Text>
          <View style={styles.sliderContainer}>
            <Text style={styles.sliderValue}>
              {adherencePercent}%
            </Text>
            <Slider
              style={styles.slider}
              minimumValue={50}
              maximumValue={100}
              step={1}
              value={adherencePercent}
              onValueChange={handleAdherenceChange}
              minimumTrackTintColor={theme.colors.primary}
              maximumTrackTintColor={theme.colors.neutralDark}
              thumbTintColor={theme.colors.primary}
            />
            <View style={styles.sliderLabels}>
              <Text style={styles.sliderLabelText}>Flexible</Text>
              <Text style={styles.sliderLabelText}>Strict</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Macronutrient Distribution</Text>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
            <View style={{flex: 2}}>
              <Text>Protein</Text>
              <Text style={{color: theme.colors.primary}}>{macroPercentages.protein}%</Text>
            </View>
            <TextInput
              value={proteinGrams}
              onChangeText={handleProteinChange}
              keyboardType="numeric"
              placeholder="150"
              style={{
                width: 100,
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                backgroundColor: 'white'
              }}
            />
            <Text style={{marginLeft: 10}}>g</Text>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
            <View style={{flex: 2}}>
              <Text>Carbohydrates</Text>
              <Text style={{color: theme.colors.primary}}>{macroPercentages.carbs}%</Text>
            </View>
            <TextInput
              value={carbsGrams}
              onChangeText={handleCarbsChange}
              keyboardType="numeric"
              placeholder="200"
              style={{
                width: 100,
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                backgroundColor: 'white'
              }}
            />
            <Text style={{marginLeft: 10}}>g</Text>
          </View>
          
          <View style={{flexDirection: 'row', alignItems: 'center', marginBottom: 15}}>
            <View style={{flex: 2}}>
              <Text>Fat</Text>
              <Text style={{color: theme.colors.primary}}>{macroPercentages.fat}%</Text>
            </View>
            <TextInput
              value={fatGrams}
              onChangeText={handleFatChange}
              keyboardType="numeric"
              placeholder="67"
              style={{
                width: 100,
                height: 40,
                borderWidth: 1,
                borderColor: '#ccc',
                padding: 10,
                backgroundColor: 'white'
              }}
            />
            <Text style={{marginLeft: 10}}>g</Text>
          </View>
        </View>

        <View style={styles.infoContainer}>
          <Text style={styles.infoText}>
            These targets will be used to track your daily nutrition and generate meal recommendations.
            You can always adjust these values later in settings.
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
          <Text style={styles.progressText}>Step 6 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '66%' }]} />
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
    marginTop: theme.spacing.sm,
  },
  adherenceLabel: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginBottom: theme.spacing.sm,
  },
  sliderValue: {
    textAlign: 'center',
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.primary,
    marginBottom: theme.spacing.xs,
  },
  slider: {
    width: '100%',
    height: 40,
  },
  sliderLabels: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: -theme.spacing.xs,
  },
  sliderLabelText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  infoContainer: {
    marginBottom: theme.spacing.xl,
    padding: theme.spacing.md,
    backgroundColor: `${theme.colors.primary}10`,
    borderRadius: theme.borderRadius.md,
  },
  infoText: {
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

export default NutritionalGoalsScreen; 