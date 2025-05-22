import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  FlatList, 
  TextInput 
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import theme from '../../styles/theme';

// Define the navigation props
type ExploreScreenProps = {
  navigation: BottomTabNavigationProp<any, 'Explore'>;
};

// Mock recipe data
const mockRecipes = [
  { id: '1', name: 'Protein Pancakes', calories: 420, carbs: 42, protein: 30, fat: 12 },
  { id: '2', name: 'Greek Yogurt Bowl', calories: 320, carbs: 28, protein: 24, fat: 8 },
  { id: '3', name: 'Chicken Fajita Bowl', calories: 550, carbs: 45, protein: 40, fat: 15 },
  { id: '4', name: 'Salmon & Quinoa', calories: 480, carbs: 32, protein: 35, fat: 18 },
  { id: '5', name: 'Steak & Sweet Potato', calories: 620, carbs: 55, protein: 42, fat: 22 },
  { id: '6', name: 'Turkey Chili', calories: 380, carbs: 30, protein: 35, fat: 12 },
  { id: '7', name: 'Tofu Stir Fry', calories: 340, carbs: 25, protein: 20, fat: 10 },
  { id: '8', name: 'Egg White Omelette', calories: 280, carbs: 10, protein: 25, fat: 8 },
];

const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleOpenFilters = () => {
    console.log('Open filters');
  };

  const handleMealPress = (mealId: string) => {
    console.log('Meal pressed:', mealId);
    // Would navigate to meal detail screen
  };

  // Filter icon (placeholder)
  const FilterIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>🔍</Text>
    </View>
  );

  // Render a meal card
  const renderMealCard = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.mealCard}
      onPress={() => handleMealPress(item.id)}
    >
      <View style={styles.mealImagePlaceholder}>
        <Text style={styles.mealImagePlaceholderText}>🍽️</Text>
      </View>
      <Text style={styles.mealTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      <View style={styles.macroRow}>
        <View style={[styles.macroIndicator, { backgroundColor: '#3b82f6', flex: item.carbs }]} />
        <View style={[styles.macroIndicator, { backgroundColor: '#22c55e', flex: item.protein }]} />
        <View style={[styles.macroIndicator, { backgroundColor: '#f97316', flex: item.fat }]} />
      </View>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer 
      scrollable={false}
      style={styles.container}
    >
      <Header 
        title="Explore Meals" 
        rightIcon={<FilterIcon />}
        onPressRight={handleOpenFilters}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search meals..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Meal Grid */}
      <FlatList
        data={mockRecipes}
        renderItem={renderMealCard}
        keyExtractor={item => item.id}
        numColumns={2}
        columnWrapperStyle={styles.mealRow}
        contentContainerStyle={styles.mealGrid}
        showsVerticalScrollIndicator={false}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
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
  searchContainer: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutralDark,
  },
  searchInput: {
    backgroundColor: theme.colors.neutral,
    borderRadius: theme.borderRadius.md,
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    fontSize: theme.typography.bodyText.regular,
  },
  mealGrid: {
    padding: theme.spacing.sm,
    backgroundColor: theme.colors.neutral,
  },
  mealRow: {
    justifyContent: 'space-between',
    marginHorizontal: theme.spacing.sm,
  },
  mealCard: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginVertical: theme.spacing.sm,
    width: '48%',
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
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  mealImagePlaceholder: {
    height: 120,
    backgroundColor: theme.colors.neutral,
    justifyContent: 'center',
    alignItems: 'center',
  },
  mealImagePlaceholderText: {
    fontSize: 24,
  },
  mealTitle: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
    marginHorizontal: theme.spacing.sm,
    marginTop: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  mealCalories: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginHorizontal: theme.spacing.sm,
    marginBottom: theme.spacing.xs,
  },
  macroRow: {
    flexDirection: 'row',
    height: 4,
    marginTop: theme.spacing.xs,
  },
  macroIndicator: {
    height: '100%',
  },
});

export default ExploreScreen; 