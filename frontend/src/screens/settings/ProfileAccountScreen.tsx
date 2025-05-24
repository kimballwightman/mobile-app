import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ActivityIndicator, Alert } from 'react-native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import theme from '../../styles/theme';
import { useAuth } from '../../context/AuthContext';
import ApiService from '../../services/api';

type ProfileAccountScreenProps = {
  navigation: NativeStackNavigationProp<any>;
};

// Define the user profile structure
interface UserProfile {
  id: string;
  email: string;
  name: string;
  created_at?: string;
  updated_at?: string;
  [key: string]: any; // Allow for other fields
}

const ProfileAccountScreen: React.FC<ProfileAccountScreenProps> = ({ navigation }) => {
  const { user, restartOnboarding } = useAuth();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Fetch the user's database profile
    const fetchProfile = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const { data } = await ApiService.user.getProfile();
        setProfile(data);
      } catch (err: any) {
        console.error('Error fetching profile:', err);
        setError('Failed to load profile');
      } finally {
        setLoading(false);
      }
    };
    
    fetchProfile();
  }, []);

  const handleBack = () => {
    navigation.goBack();
  };

  const handleRestartOnboarding = () => {
    Alert.alert(
      "Restart Onboarding",
      "This will restart the onboarding process. Your existing profile data will be preserved but you'll need to go through the setup process again. Continue?",
      [
        {
          text: "Cancel",
          style: "cancel"
        },
        {
          text: "Restart",
          style: "destructive",
          onPress: async () => {
            try {
              await restartOnboarding();
              // Navigate back to the main screen which will redirect to onboarding
              navigation.navigate('MainTabs');
            } catch (error) {
              console.error('Error restarting onboarding:', error);
              Alert.alert('Error', 'Failed to restart onboarding. Please try again.');
            }
          }
        }
      ]
    );
  };

  // Back icon component
  const BackIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.backIcon}>←</Text>
    </View>
  );

  return (
    <ScreenContainer>
      <Header
        title="Profile & Account"
        leftIcon={<BackIcon />}
        onPressLeft={handleBack}
      />

      <ScrollView style={styles.container}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={theme.colors.primary} />
            <Text style={styles.loadingText}>Loading profile...</Text>
          </View>
        ) : error ? (
          <View style={styles.errorContainer}>
            <Text style={styles.errorText}>{error}</Text>
            <TouchableOpacity 
              style={styles.retryButton}
              onPress={() => {
                setLoading(true);
                ApiService.user.getProfile()
                  .then(({ data }) => {
                    setProfile(data);
                    setError(null);
                  })
                  .catch(() => setError('Failed to load profile'))
                  .finally(() => setLoading(false));
              }}
            >
              <Text style={styles.retryButtonText}>Retry</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <>
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Profile Information</Text>

              <View style={styles.profileIconLarge}>
                <Text style={styles.profileIconText}>
                  {profile?.name?.charAt(0).toUpperCase() || user?.email?.charAt(0).toUpperCase() || 'U'}
                </Text>
              </View>
              
              <View style={styles.infoCard}>
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Auth ID</Text>
                  <Text style={styles.infoValue}>{user?.id || 'Not available'}</Text>
                </View>
                
                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Email</Text>
                  <Text style={styles.infoValue}>{profile?.email || user?.email || 'Not set'}</Text>
                </View>

                <View style={styles.infoItem}>
                  <Text style={styles.infoLabel}>Name</Text>
                  <Text style={styles.infoValue}>{profile?.name || 'Not set'}</Text>
                </View>
                
                {profile?.created_at && (
                  <View style={styles.infoItem}>
                    <Text style={styles.infoLabel}>Member Since</Text>
                    <Text style={styles.infoValue}>
                      {new Date(profile.created_at).toLocaleDateString()}
                    </Text>
                  </View>
                )}
              </View>

              <TouchableOpacity style={styles.editButton}>
                <Text style={styles.editButtonText}>Edit Profile</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Account Security</Text>

              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Change Password</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Two-Factor Authentication</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Connected Accounts</Text>

              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Connect with Google</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.settingItem}>
                <Text style={styles.settingText}>Connect with Apple</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Preferences</Text>

              <TouchableOpacity 
                style={styles.settingItem}
                onPress={handleRestartOnboarding}
              >
                <Text style={styles.settingTextWarning}>Restart Onboarding</Text>
              </TouchableOpacity>
            </View>
          </>
        )}
      </ScrollView>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: theme.spacing.md,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
    fontSize: theme.typography.bodyText.regular,
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: theme.spacing.xl,
  },
  errorText: {
    marginBottom: theme.spacing.md,
    color: theme.colors.error,
    fontSize: theme.typography.bodyText.regular,
    textAlign: 'center',
  },
  retryButton: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    borderRadius: theme.borderRadius.sm,
  },
  retryButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.bodyText.small,
    fontWeight: '600',
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  backIcon: {
    fontSize: 18,
    color: theme.colors.primary,
  },
  section: {
    marginVertical: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  sectionTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    marginBottom: theme.spacing.md,
    color: theme.colors.textPrimary,
  },
  profileIconLarge: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: theme.colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginBottom: theme.spacing.lg,
  },
  profileIconText: {
    color: theme.colors.surface,
    fontSize: 32,
    fontWeight: 'bold',
  },
  infoCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.sm,
    padding: theme.spacing.md,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  infoItem: {
    marginBottom: theme.spacing.md,
  },
  infoLabel: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginBottom: 4,
  },
  infoValue: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
  },
  editButton: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    paddingVertical: theme.spacing.sm,
    paddingHorizontal: theme.spacing.md,
    alignSelf: 'center',
    marginTop: theme.spacing.md,
  },
  editButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
  },
  settingItem: {
    paddingVertical: theme.spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutralDark,
  },
  settingText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textPrimary,
  },
  settingTextWarning: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.error,
  },
});

export default ProfileAccountScreen; 