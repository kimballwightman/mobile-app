import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import theme from '../../styles/theme';

// Define the navigation props
type DashboardScreenProps = {
  navigation: BottomTabNavigationProp<any, 'Dashboard'>;
};

const DashboardScreen: React.FC<DashboardScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);

  // Profile icon (placeholder)
  const ProfileIcon = () => (
    <View style={styles.profileIconContainer}>
      <Text style={styles.profileIconText}>👤</Text>
    </View>
  );

  // Notifications icon (placeholder)
  const NotificationsIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>🔔</Text>
    </View>
  );

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleOpenProfile = () => {
    // Will open side drawer in the future
    console.log('Open profile/settings');
  };

  const handleOpenNotifications = () => {
    console.log('Open notifications');
  };

  return (
    <ScreenContainer
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <Header 
        title="Dashboard" 
        leftIcon={<ProfileIcon />}
        rightIcon={<NotificationsIcon />}
        onPressLeft={handleOpenProfile}
        onPressRight={handleOpenNotifications}
      />

      {/* Date selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.dateArrow}>
          <Text style={styles.dateArrowText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>Today, Oct 7</Text>
        <TouchableOpacity style={styles.dateArrow}>
          <Text style={styles.dateArrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Nutrient Summary */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Daily Summary</Text>
        <View style={styles.nutrientBar}>
          <View style={styles.nutrientBarLabel}>
            <Text style={styles.nutrientLabel}>Calories</Text>
            <Text style={styles.nutrientValue}>1,450 / 2,000 kcal</Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View style={[styles.progressBar, { width: '72.5%' }]} />
          </View>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>148g</Text>
            <View style={styles.miniProgressContainer}>
              <View style={[styles.miniProgress, { width: '80%', backgroundColor: '#3b82f6' }]} />
            </View>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>95g</Text>
            <View style={styles.miniProgressContainer}>
              <View style={[styles.miniProgress, { width: '60%', backgroundColor: '#22c55e' }]} />
            </View>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={styles.macroValue}>52g</Text>
            <View style={styles.miniProgressContainer}>
              <View style={[styles.miniProgress, { width: '70%', backgroundColor: '#f97316' }]} />
            </View>
          </View>
        </View>
      </View>

      {/* Meal & Workout Tiles */}
      <Text style={styles.sectionTitle}>Today's Plan</Text>
      <View style={styles.card}>
        <View style={styles.mealTile}>
          <View style={styles.mealTimeContainer}>
            <Text style={styles.mealTime}>8:00 AM</Text>
          </View>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>Breakfast</Text>
            <Text style={styles.mealDescription}>Avocado Toast with Eggs</Text>
          </View>
          <View style={styles.mealActions}>
            <TouchableOpacity style={styles.mealButton}>
              <Text style={styles.mealButtonText}>Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mealTile}>
          <View style={styles.mealTimeContainer}>
            <Text style={styles.mealTime}>12:30 PM</Text>
          </View>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>Lunch</Text>
            <Text style={styles.mealDescription}>Chicken Salad Bowl</Text>
          </View>
          <View style={styles.mealActions}>
            <TouchableOpacity style={styles.mealButton}>
              <Text style={styles.mealButtonText}>Log</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.mealTile}>
          <View style={styles.mealTimeContainer}>
            <Text style={styles.mealTime}>5:30 PM</Text>
          </View>
          <View style={styles.mealInfo}>
            <Text style={styles.mealName}>Workout</Text>
            <Text style={styles.mealDescription}>Upper Body Strength</Text>
          </View>
          <View style={styles.mealActions}>
            <TouchableOpacity style={styles.mealButton}>
              <Text style={styles.mealButtonText}>Log</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Weekly Trends */}
      <Text style={styles.sectionTitle}>Weekly Trends</Text>
      <View style={styles.card}>
        <Text style={styles.cardSubtext}>Coming soon</Text>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  profileIconContainer: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: theme.colors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileIconText: {
    fontSize: 16,
  },
  iconContainer: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconText: {
    fontSize: 16,
  },
  dateSelector: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: theme.spacing.md,
  },
  dateArrow: {
    padding: theme.spacing.sm,
  },
  dateArrowText: {
    fontSize: 16,
    color: theme.colors.primary,
  },
  dateText: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
    marginHorizontal: theme.spacing.md,
  },
  card: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  cardTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  cardSubtext: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    textAlign: 'center',
    padding: theme.spacing.md,
  },
  nutrientBar: {
    marginVertical: theme.spacing.sm,
  },
  nutrientBarLabel: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  nutrientLabel: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  nutrientValue: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: theme.colors.neutral,
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: theme.colors.primary,
  },
  macrosContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.sm,
  },
  macroItem: {
    flex: 1,
    marginHorizontal: 4,
  },
  macroLabel: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  macroValue: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textPrimary,
    fontWeight: '600',
  },
  miniProgressContainer: {
    height: 4,
    backgroundColor: theme.colors.neutral,
    borderRadius: 2,
    overflow: 'hidden',
    marginTop: 4,
  },
  miniProgress: {
    height: '100%',
  },
  sectionTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  mealTile: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: theme.spacing.sm,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutralDark,
  },
  mealTimeContainer: {
    width: 70,
  },
  mealTime: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  mealInfo: {
    flex: 1,
  },
  mealName: {
    fontSize: theme.typography.bodyText.small,
    fontWeight: '600',
    color: theme.colors.textPrimary,
  },
  mealDescription: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  mealActions: {
    flexDirection: 'row',
  },
  mealButton: {
    backgroundColor: theme.colors.primary,
    paddingHorizontal: theme.spacing.sm,
    paddingVertical: 4,
    borderRadius: theme.borderRadius.sm,
  },
  mealButtonText: {
    color: theme.colors.surface,
    fontSize: theme.typography.bodyText.small,
    fontWeight: '600',
  },
});

export default DashboardScreen; 