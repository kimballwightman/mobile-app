import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  Platform,
} from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import theme from '../../styles/theme';
import Button from '../../components/Button';
import InputField from '../../components/InputField';
import ApiService from '../../services/api';

type OnboardingStackParamList = {
  DefineGoal: undefined;
  ConnectToAppleHealth: undefined;
  UserInfo: undefined;
  WorkoutsPerWeek: undefined;
};

type UserInfoScreenProps = {
  navigation: NativeStackNavigationProp<OnboardingStackParamList, 'UserInfo'>;
};

const UserInfoScreen: React.FC<UserInfoScreenProps> = ({ navigation }) => {
  const [gender, setGender] = useState<string>('');
  const [age, setAge] = useState<string>('');
  const [heightFeet, setHeightFeet] = useState<string>('');
  const [heightInches, setHeightInches] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [appleHealthData, setAppleHealthData] = useState<any>(null);

  // In a real implementation, this would fetch data from Apple Health
  // if the user connected in the previous step
  useEffect(() => {
    const fetchAppleHealthData = async () => {
      try {
        if (Platform.OS === 'ios') {
          console.log('Attempting to save health data...');
          // This would be replaced with actual Apple Health API call
          const healthDataPayload = { appleHealthConnected: true };
          console.log('Health data payload:', healthDataPayload);
          
          try {
            const response = await ApiService.onboarding.saveHealthData(healthDataPayload);
            console.log('Health data response:', response);
            
            if (response?.data?.healthData) {
              setAppleHealthData(response.data.healthData);
              
              // Pre-fill form with Apple Health data if available
              if (response.data.healthData.gender) {
                setGender(response.data.healthData.gender);
              }
              if (response.data.healthData.age) {
                setAge(response.data.healthData.age.toString());
              }
              if (response.data.healthData.height) {
                const heightInInches = response.data.healthData.height;
                setHeightFeet(Math.floor(heightInInches / 12).toString());
                setHeightInches((heightInInches % 12).toString());
              }
              if (response.data.healthData.weight) {
                setWeight(response.data.healthData.weight.toString());
              }
            }
          } catch (apiError: any) {
            console.error('API Error saving health data:', apiError?.message, apiError?.stack);
            // Continue with onboarding even if Apple Health fails
          }
        }
      } catch (error: any) {
        console.error('Error fetching Apple Health data:', error?.message, error?.stack);
        // Continue with onboarding even if Apple Health fails
      }
    };

    fetchAppleHealthData();
  }, []);

  const validateInputs = (): boolean => {
    // Gender validation
    if (!gender) {
      setError('Please select your gender');
      return false;
    }
    
    // Age validation
    if (!age || isNaN(Number(age)) || Number(age) <= 0 || Number(age) > 120) {
      setError('Please enter a valid age (1-120)');
      return false;
    }
    
    // Height validation
    if (!heightFeet || isNaN(Number(heightFeet)) || Number(heightFeet) < 0) {
      setError('Please enter a valid height (feet)');
      return false;
    }
    
    if (!heightInches || isNaN(Number(heightInches)) || Number(heightInches) < 0 || Number(heightInches) >= 12) {
      setError('Please enter valid inches (0-11)');
      return false;
    }
    
    // Weight validation
    if (!weight || isNaN(Number(weight)) || Number(weight) <= 0) {
      setError('Please enter a valid weight');
      return false;
    }
    
    return true;
  };

  const handleNext = async () => {
    if (!validateInputs()) {
      return;
    }

    setIsLoading(true);
    try {
      // Convert height to total inches
      const heightInInches = Number(heightFeet) * 12 + Number(heightInches);
      
      // Create payload with exact expected format
      const userInfoPayload = {
        gender,
        age: Number(age),
        height: heightInInches,
        weight: Number(weight)
      };
      
      console.log('Saving user info with payload:', userInfoPayload);
      
      // Save user info to the API
      try {
        const response = await ApiService.onboarding.saveUserInfo(userInfoPayload);
        console.log('User info save response:', response);
        
        // Navigate to the next screen
        navigation.navigate('WorkoutsPerWeek');
      } catch (apiError: any) {
        console.error('API Error saving user info:', apiError?.message, apiError?.stack);
        setError(`Failed to save your information: ${apiError?.message || 'Unknown error'}`);
      }
    } catch (error: any) {
      console.error('Error in handleNext:', error?.message, error?.stack);
      setError('Failed to save your information. Please try again.');
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
          <Text style={styles.title}>Your Information</Text>
          <Text style={styles.subtitle}>
            We'll use this information to calculate your nutritional needs
          </Text>
        </View>

        {error && (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
          </View>
        )}

        <View style={styles.formContainer}>
          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Gender</Text>
            <View style={styles.genderButtons}>
              <Button
                title="Male"
                onPress={() => {
                  setGender('male');
                  setError(null);
                }}
                variant={gender === 'male' ? 'primary' : 'outline'}
                style={styles.genderButton}
              />
              <Button
                title="Female"
                onPress={() => {
                  setGender('female');
                  setError(null);
                }}
                variant={gender === 'female' ? 'primary' : 'outline'}
                style={styles.genderButton}
              />
              <Button
                title="Other"
                onPress={() => {
                  setGender('other');
                  setError(null);
                }}
                variant={gender === 'other' ? 'primary' : 'outline'}
                style={styles.genderButton}
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Age"
              value={age}
              onChangeText={(text) => {
                setAge(text);
                setError(null);
              }}
              placeholder="Enter your age"
              keyboardType="number-pad"
              returnKeyType="next"
            />
          </View>

          <View style={styles.fieldContainer}>
            <Text style={styles.label}>Height</Text>
            <View style={styles.heightFields}>
              <View style={styles.heightField}>
                <InputField
                  label="Feet"
                  value={heightFeet}
                  onChangeText={(text) => {
                    setHeightFeet(text);
                    setError(null);
                  }}
                  placeholder="ft"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
              </View>
              <View style={styles.heightField}>
                <InputField
                  label="Inches"
                  value={heightInches}
                  onChangeText={(text) => {
                    setHeightInches(text);
                    setError(null);
                  }}
                  placeholder="in"
                  keyboardType="number-pad"
                  returnKeyType="next"
                />
              </View>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <InputField
              label="Weight (lbs)"
              value={weight}
              onChangeText={(text) => {
                setWeight(text);
                setError(null);
              }}
              placeholder="Enter your weight"
              keyboardType="number-pad"
              returnKeyType="done"
            />
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
          <Text style={styles.progressText}>Step 3 of 9</Text>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: '33%' }]} />
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
  formContainer: {
    marginBottom: theme.spacing.xl,
  },
  fieldContainer: {
    marginBottom: theme.spacing.lg,
  },
  label: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as any,
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.sm,
  },
  genderButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  genderButton: {
    flex: 1,
    marginRight: theme.spacing.sm,
  },
  heightFields: {
    flexDirection: 'row',
  },
  heightField: {
    flex: 1,
    marginRight: theme.spacing.md,
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

export default UserInfoScreen; 