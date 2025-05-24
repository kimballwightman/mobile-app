import React, { useState, useEffect, useCallback } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Platform, 
  TouchableOpacity, 
  FlatList, 
  TextInput,
  Image,
  ActivityIndicator,
  RefreshControl
} from 'react-native';
import { BottomTabNavigationProp } from '@react-navigation/bottom-tabs';
import ScreenContainer from '../../components/ScreenContainer';
import Header from '../../components/Header';
import theme from '../../styles/theme';
import ApiService from '../../services/api';

// Define the navigation props
type ExploreScreenProps = {
  navigation: BottomTabNavigationProp<any, 'Explore'>;
};

// Define Recipe interface
interface Recipe {
  recipe_id: string;
  name: string;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  image_url?: string;
  description?: string;
}

const ExploreScreen: React.FC<ExploreScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [page, setPage] = useState(1);
  const [hasMoreData, setHasMoreData] = useState(true);
  const [isSearching, setIsSearching] = useState(false);

  // Function to fetch recipes
  const fetchRecipes = useCallback(async (pageNum: number = 1, refresh: boolean = false) => {
    try {
      if (refresh) {
        setRefreshing(true);
      } else if (pageNum === 1) {
        setLoading(true);
      }

      const response = await ApiService.explore.getMeals(pageNum, 10);
      
      const newRecipes = response.data.results as Recipe[];
      
      if (refresh || pageNum === 1) {
        setRecipes(newRecipes);
      } else {
        setRecipes(prevRecipes => [...prevRecipes, ...newRecipes]);
      }
      
      setHasMoreData(newRecipes.length === 10);
      setPage(pageNum);
    } catch (error) {
      console.error('Failed to fetch recipes:', error);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  // Search for recipes
  const searchRecipes = async () => {
    if (!searchQuery.trim()) {
      return fetchRecipes(1, true);
    }
    
    try {
      setIsSearching(true);
      setLoading(true);
      
      const response = await ApiService.explore.searchMeals(searchQuery);
      
      // Map the response to our Recipe interface
      const searchResults = response.data.results.map((item: any) => ({
        recipe_id: item.id || item.recipe_id,
        name: item.title || item.name,
        calories: item.calories || 0,
        protein: item.protein || 0,
        carbs: item.carbs || 0,
        fats: item.fat || item.fats || 0,
        image_url: item.image || item.image_url,
        description: item.summary || item.description
      }));
      
      setRecipes(searchResults);
      setHasMoreData(false); // Simplified for now, no pagination in search
    } catch (error) {
      console.error('Search failed:', error);
    } finally {
      setLoading(false);
      setIsSearching(false);
    }
  };

  // Load more recipes when reaching end of list
  const loadMoreRecipes = () => {
    if (!loading && hasMoreData && !isSearching) {
      fetchRecipes(page + 1);
    }
  };

  // Initial load
  useEffect(() => {
    fetchRecipes();
  }, [fetchRecipes]);

  const handleRefresh = () => {
    fetchRecipes(1, true);
  };

  const handleOpenFilters = () => {
    // This would open a filter modal in a real implementation
    console.log('Open filters');
  };

  const handleMealPress = (mealId: string) => {
    console.log('Meal pressed:', mealId);
    // Navigate to expanded meal view
    // navigation.navigate('MealDetail', { mealId });
  };

  // Filter icon (placeholder)
  const FilterIcon = () => (
    <View style={styles.iconContainer}>
      <Text style={styles.iconText}>🔍</Text>
    </View>
  );

  // Render a meal card
  const renderMealCard = ({ item }: { item: Recipe }) => (
    <TouchableOpacity 
      style={styles.mealCard}
      onPress={() => handleMealPress(item.recipe_id)}
    >
      {item.image_url ? (
        <Image 
          source={{ uri: item.image_url }} 
          style={styles.mealImage}
          resizeMode="cover"
        />
      ) : (
        <View style={styles.mealImagePlaceholder}>
          <Text style={styles.mealImagePlaceholderText}>🍽️</Text>
        </View>
      )}
      <Text style={styles.mealTitle} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.mealCalories}>{item.calories} kcal</Text>
      <View style={styles.macroRow}>
        <View style={[styles.macroIndicator, { backgroundColor: '#3b82f6', flex: item.carbs }]} />
        <View style={[styles.macroIndicator, { backgroundColor: '#22c55e', flex: item.protein }]} />
        <View style={[styles.macroIndicator, { backgroundColor: '#f97316', flex: item.fats }]} />
      </View>
    </TouchableOpacity>
  );

  // Render the loading state
  if (loading && recipes.length === 0) {
    return (
      <ScreenContainer style={styles.container}>
        <Header 
          title="Explore Meals" 
          rightIcon={<FilterIcon />}
          onPressRight={handleOpenFilters}
        />
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={theme.colors.primary} />
          <Text style={styles.loadingText}>Loading recipes...</Text>
        </View>
      </ScreenContainer>
    );
  }

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
          onSubmitEditing={searchRecipes}
          returnKeyType="search"
        />
      </View>

      {/* Meal Grid */}
      <FlatList
        data={recipes}
        renderItem={renderMealCard}
        keyExtractor={item => item.recipe_id}
        numColumns={2}
        columnWrapperStyle={styles.mealRow}
        contentContainerStyle={styles.mealGrid}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={[theme.colors.primary]}
          />
        }
        onEndReached={loadMoreRecipes}
        onEndReachedThreshold={0.5}
        ListFooterComponent={
          hasMoreData && !refreshing ? (
            <View style={styles.footerLoader}>
              <ActivityIndicator size="small" color={theme.colors.primary} />
            </View>
          ) : null
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No recipes found</Text>
          </View>
        }
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
  mealImage: {
    height: 120,
    width: '100%',
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: theme.spacing.md,
    color: theme.colors.textSecondary,
  },
  footerLoader: {
    paddingVertical: theme.spacing.md,
    alignItems: 'center',
  },
  emptyContainer: {
    padding: theme.spacing.xl,
    alignItems: 'center',
  },
  emptyText: {
    color: theme.colors.textSecondary,
  },
});

export default ExploreScreen; 