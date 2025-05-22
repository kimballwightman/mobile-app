import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  ScrollView 
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import theme from '../../styles/theme';

// Define the navigation props
type PlanScreenProps = {
  navigation: BottomTabNavigationProp<any, 'Plan'>;
};

// Mock meal plan data
const mockMealPlan = {
  date: 'October 7, 2023',
  meals: [
    { id: '1', type: 'Breakfast', name: 'Avocado Toast with Eggs', calories: 420, carbs: 35, protein: 22, fat: 18 },
    { id: '2', type: 'Lunch', name: 'Chicken Salad Bowl', calories: 550, carbs: 45, protein: 40, fat: 15 },
    { id: '3', type: 'Dinner', name: 'Salmon & Quinoa', calories: 480, carbs: 32, protein: 35, fat: 18 },
    { id: '4', type: 'Snack', name: 'Greek Yogurt with Berries', calories: 180, carbs: 15, protein: 18, fat: 5 },
  ],
  totals: {
    calories: 1630,
    carbs: 127,
    protein: 115,
    fat: 56,
  },
  target: {
    calories: 2000,
    carbs: 150,
    protein: 130,
    fat: 60,
  }
};

const PlanScreen: React.FC<PlanScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [activeTab, setActiveTab] = useState('today');

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleOpenCart = () => {
    console.log('Open shopping cart');
  };

  const handleAddMeal = () => {
    console.log('Add meal to plan');
  };

  const handleMealPress = (mealId: string) => {
    console.log('Meal pressed:', mealId);
    // Would navigate to expanded meal view
  };

  // Cart icon (placeholder)
  const CartIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>🛒</Text>
    </View>
  );

  const getPercentage = (value: number, target: number) => {
    return Math.min(100, (value / target) * 100);
  };

  return (
    <ScreenContainer
      refreshing={refreshing}
      onRefresh={handleRefresh}
    >
      <Header 
        title="Meal Plan" 
        rightIcon={<CartIcon />}
        onPressRight={handleOpenCart}
      />

      {/* Date selector */}
      <View style={styles.dateSelector}>
        <TouchableOpacity style={styles.dateArrow}>
          <Text style={styles.dateArrowText}>◀</Text>
        </TouchableOpacity>
        <Text style={styles.dateText}>{mockMealPlan.date}</Text>
        <TouchableOpacity style={styles.dateArrow}>
          <Text style={styles.dateArrowText}>▶</Text>
        </TouchableOpacity>
      </View>

      {/* Tab Selector */}
      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'today' && styles.activeTab]}
          onPress={() => setActiveTab('today')}
        >
          <Text style={[styles.tabText, activeTab === 'today' && styles.activeTabText]}>Today</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === '3day' && styles.activeTab]}
          onPress={() => setActiveTab('3day')}
        >
          <Text style={[styles.tabText, activeTab === '3day' && styles.activeTabText]}>3-Day View</Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'week' && styles.activeTab]}
          onPress={() => setActiveTab('week')}
        >
          <Text style={[styles.tabText, activeTab === 'week' && styles.activeTabText]}>Week</Text>
        </TouchableOpacity>
      </View>

      {/* Daily Summary */}
      <View style={styles.summaryCard}>
        <Text style={styles.summaryTitle}>Daily Summary</Text>
        <View style={styles.nutrientBar}>
          <View style={styles.nutrientBarLabel}>
            <Text style={styles.nutrientLabel}>Calories</Text>
            <Text style={styles.nutrientValue}>
              {mockMealPlan.totals.calories} / {mockMealPlan.target.calories} kcal
            </Text>
          </View>
          <View style={styles.progressBarContainer}>
            <View 
              style={[
                styles.progressBar, 
                { width: `${getPercentage(mockMealPlan.totals.calories, mockMealPlan.target.calories)}%` }
              ]} 
            />
          </View>
        </View>

        <View style={styles.macrosContainer}>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Carbs</Text>
            <Text style={styles.macroValue}>{mockMealPlan.totals.carbs}g</Text>
            <View style={styles.miniProgressContainer}>
              <View 
                style={[
                  styles.miniProgress, 
                  { 
                    width: `${getPercentage(mockMealPlan.totals.carbs, mockMealPlan.target.carbs)}%`, 
                    backgroundColor: '#3b82f6' 
                  }
                ]} 
              />
            </View>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Protein</Text>
            <Text style={styles.macroValue}>{mockMealPlan.totals.protein}g</Text>
            <View style={styles.miniProgressContainer}>
              <View 
                style={[
                  styles.miniProgress, 
                  { 
                    width: `${getPercentage(mockMealPlan.totals.protein, mockMealPlan.target.protein)}%`, 
                    backgroundColor: '#22c55e' 
                  }
                ]} 
              />
            </View>
          </View>
          <View style={styles.macroItem}>
            <Text style={styles.macroLabel}>Fat</Text>
            <Text style={styles.macroValue}>{mockMealPlan.totals.fat}g</Text>
            <View style={styles.miniProgressContainer}>
              <View 
                style={[
                  styles.miniProgress, 
                  { 
                    width: `${getPercentage(mockMealPlan.totals.fat, mockMealPlan.target.fat)}%`, 
                    backgroundColor: '#f97316' 
                  }
                ]} 
              />
            </View>
          </View>
        </View>
      </View>

      {/* Meals List */}
      <View style={styles.mealsContainer}>
        <View style={styles.mealsHeader}>
          <Text style={styles.mealsTitle}>Meals</Text>
          <TouchableOpacity onPress={handleAddMeal}>
            <Text style={styles.addMealText}>+ Add</Text>
          </TouchableOpacity>
        </View>

        {mockMealPlan.meals.map((meal) => (
          <TouchableOpacity 
            key={meal.id} 
            style={styles.mealCard}
            onPress={() => handleMealPress(meal.id)}
          >
            <View style={styles.mealInfo}>
              <Text style={styles.mealType}>{meal.type}</Text>
              <Text style={styles.mealName}>{meal.name}</Text>
              <Text style={styles.mealCalories}>{meal.calories} kcal • {meal.carbs}c / {meal.protein}p / {meal.fat}f</Text>
            </View>
            <View style={styles.mealActions}>
              <Text style={styles.mealActionText}>→</Text>
            </View>
          </TouchableOpacity>
        ))}
      </View>

      {/* Shopping Cart Summary */}
      <View style={styles.cartPreview}>
        <View style={styles.cartTextContainer}>
          <Text style={styles.cartTitle}>Shopping Cart</Text>
          <Text style={styles.cartSubtitle}>15 items • $78.45</Text>
        </View>
        <TouchableOpacity 
          style={styles.viewCartButton}
          onPress={handleOpenCart}
        >
          <Text style={styles.viewCartText}>View</Text>
        </TouchableOpacity>
      </View>
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
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
  tabContainer: {
    flexDirection: 'row',
    marginBottom: theme.spacing.md,
    borderRadius: theme.borderRadius.md,
    backgroundColor: theme.colors.neutral,
    padding: 2,
  },
  tab: {
    flex: 1,
    paddingVertical: theme.spacing.sm,
    alignItems: 'center',
    borderRadius: theme.borderRadius.sm,
  },
  activeTab: {
    backgroundColor: theme.colors.surface,
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  tabText: {
    fontSize: theme.typography.bodyText.small,
    fontWeight: '500',
    color: theme.colors.textSecondary,
  },
  activeTabText: {
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  summaryCard: {
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
  summaryTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    marginBottom: theme.spacing.sm,
    color: theme.colors.textPrimary,
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
  mealsContainer: {
    flex: 1,
  },
  mealsHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: theme.spacing.sm,
  },
  mealsTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    color: theme.colors.textPrimary,
  },
  addMealText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.primary,
    fontWeight: '600',
  },
  mealCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
    flexDirection: 'row',
    alignItems: 'center',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 1,
      },
    }),
  },
  mealInfo: {
    flex: 1,
  },
  mealType: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  mealName: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginVertical: 2,
  },
  mealCalories: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  mealActions: {
    marginLeft: theme.spacing.sm,
  },
  mealActionText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.primary,
  },
  cartPreview: {
    backgroundColor: theme.colors.primary,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginTop: theme.spacing.md,
    marginBottom: theme.spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cartTextContainer: {
    flex: 1,
  },
  cartTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '700',
    color: theme.colors.surface,
  },
  cartSubtitle: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.surface,
    opacity: 0.8,
  },
  viewCartButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    borderRadius: theme.borderRadius.sm,
  },
  viewCartText: {
    color: theme.colors.surface,
    fontSize: theme.typography.bodyText.small,
    fontWeight: '600',
  },
});

export default PlanScreen; 