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
type PantryScreenProps = {
  navigation: BottomTabNavigationProp<any, 'Pantry'>;
};

// Define pantry item status types
type PantryItemStatus = 'fresh' | 'expiring' | 'out' | 'on-the-way';

// Define mock pantry item
interface PantryItem {
  id: string;
  name: string;
  quantity: string;
  category: string;
  expiryDate?: string;
  status: PantryItemStatus;
}

// Mock pantry data
const mockPantryItems: PantryItem[] = [
  { id: '1', name: 'Chicken Breast', quantity: '2 lbs', category: 'Protein', expiryDate: '10/15/2023', status: 'fresh' },
  { id: '2', name: 'Eggs', quantity: '8', category: 'Protein', expiryDate: '10/20/2023', status: 'fresh' },
  { id: '3', name: 'Spinach', quantity: '1 bag', category: 'Vegetables', expiryDate: '10/10/2023', status: 'expiring' },
  { id: '4', name: 'Brown Rice', quantity: '2 cups', category: 'Grains', status: 'fresh' },
  { id: '5', name: 'Greek Yogurt', quantity: '32 oz', category: 'Dairy', expiryDate: '10/12/2023', status: 'expiring' },
  { id: '6', name: 'Salmon', quantity: '1 lb', category: 'Protein', status: 'on-the-way' },
  { id: '7', name: 'Protein Powder', quantity: '2 lbs', category: 'Supplements', status: 'out' },
  { id: '8', name: 'Sweet Potatoes', quantity: '3', category: 'Vegetables', status: 'fresh' },
  { id: '9', name: 'Avocados', quantity: '2', category: 'Vegetables', expiryDate: '10/09/2023', status: 'expiring' },
  { id: '10', name: 'Almonds', quantity: '1 cup', category: 'Nuts', status: 'fresh' },
];

const PantryScreen: React.FC<PantryScreenProps> = ({ navigation }) => {
  const [refreshing, setRefreshing] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedStatus, setSelectedStatus] = useState<PantryItemStatus | null>(null);

  const categories = [...new Set(mockPantryItems.map(item => item.category))];

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate a data refresh
    setTimeout(() => {
      setRefreshing(false);
    }, 1500);
  };

  const handleAddItem = () => {
    console.log('Add pantry item');
  };

  const handlePantryItemPress = (itemId: string) => {
    console.log('Pantry item pressed:', itemId);
    // Would open pantry item detail
  };

  const getStatusColor = (status: PantryItemStatus) => {
    switch (status) {
      case 'fresh':
        return theme.colors.success;
      case 'expiring':
        return theme.colors.warning;
      case 'out':
        return theme.colors.error;
      case 'on-the-way':
        return theme.colors.primary;
      default:
        return theme.colors.textSecondary;
    }
  };

  const getStatusLabel = (status: PantryItemStatus) => {
    switch (status) {
      case 'fresh':
        return 'Fresh';
      case 'expiring':
        return 'Expiring Soon';
      case 'out':
        return 'Out of Stock';
      case 'on-the-way':
        return 'On the Way';
      default:
        return status;
    }
  };

  // Filter pantry items based on search, category, and status
  const filteredItems = mockPantryItems.filter(item => {
    // Apply search filter
    const matchesSearch = !searchQuery || 
      item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    
    // Apply category filter
    const matchesCategory = !selectedCategory || item.category === selectedCategory;
    
    // Apply status filter
    const matchesStatus = !selectedStatus || item.status === selectedStatus;
    
    return matchesSearch && matchesCategory && matchesStatus;
  });

  const renderPantryItem = ({ item }: { item: PantryItem }) => (
    <TouchableOpacity 
      style={styles.pantryItem}
      onPress={() => handlePantryItemPress(item.id)}
    >
      <View style={styles.pantryItemContent}>
        <View style={styles.pantryItemHeader}>
          <Text style={styles.pantryItemName}>{item.name}</Text>
          <View style={[styles.statusIndicator, { backgroundColor: getStatusColor(item.status) }]} />
        </View>
        <View style={styles.pantryItemDetails}>
          <Text style={styles.pantryItemQuantity}>{item.quantity}</Text>
          <Text style={styles.pantryItemCategory}>{item.category}</Text>
          {item.expiryDate && (
            <Text style={styles.pantryItemExpiry}>
              Expires: {item.expiryDate}
            </Text>
          )}
        </View>
      </View>
      <Text style={styles.pantryItemStatus}>{getStatusLabel(item.status)}</Text>
    </TouchableOpacity>
  );

  const renderCategoryFilter = ({ item }: { item: string }) => (
    <TouchableOpacity
      style={[
        styles.categoryChip,
        selectedCategory === item && styles.categoryChipSelected
      ]}
      onPress={() => {
        setSelectedCategory(selectedCategory === item ? null : item);
      }}
    >
      <Text 
        style={[
          styles.categoryChipText,
          selectedCategory === item && styles.categoryChipTextSelected
        ]}
      >
        {item}
      </Text>
    </TouchableOpacity>
  );

  return (
    <ScreenContainer
      scrollable={false}
      style={styles.container}
    >
      <Header 
        title="Pantry" 
        rightIcon={
          <TouchableOpacity onPress={handleAddItem}>
            <Text style={styles.addButtonText}>+</Text>
          </TouchableOpacity>
        }
        onPressRight={handleAddItem}
      />

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search pantry items..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {/* Category Filters */}
      <View>
        <FlatList
          data={categories}
          renderItem={renderCategoryFilter}
          keyExtractor={item => item}
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.categoryList}
        />
      </View>

      {/* Status Filters */}
      <View style={styles.statusFilters}>
        <TouchableOpacity
          style={[
            styles.statusChip,
            !selectedStatus && styles.statusChipSelected,
            { borderColor: theme.colors.textSecondary }
          ]}
          onPress={() => setSelectedStatus(null)}
        >
          <Text style={[
            styles.statusChipText,
            !selectedStatus && styles.statusChipTextSelected
          ]}>All</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusChip,
            selectedStatus === 'fresh' && styles.statusChipSelected,
            { borderColor: theme.colors.success }
          ]}
          onPress={() => setSelectedStatus(selectedStatus === 'fresh' ? null : 'fresh')}
        >
          <Text style={[
            styles.statusChipText,
            selectedStatus === 'fresh' && { color: theme.colors.success }
          ]}>Fresh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusChip,
            selectedStatus === 'expiring' && styles.statusChipSelected,
            { borderColor: theme.colors.warning }
          ]}
          onPress={() => setSelectedStatus(selectedStatus === 'expiring' ? null : 'expiring')}
        >
          <Text style={[
            styles.statusChipText,
            selectedStatus === 'expiring' && { color: theme.colors.warning }
          ]}>Expiring</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.statusChip,
            selectedStatus === 'out' && styles.statusChipSelected,
            { borderColor: theme.colors.error }
          ]}
          onPress={() => setSelectedStatus(selectedStatus === 'out' ? null : 'out')}
        >
          <Text style={[
            styles.statusChipText,
            selectedStatus === 'out' && { color: theme.colors.error }
          ]}>Out</Text>
        </TouchableOpacity>
      </View>

      {/* Pantry Items List */}
      <FlatList
        data={filteredItems}
        renderItem={renderPantryItem}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.pantryList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        showsVerticalScrollIndicator={false}
        ListEmptyComponent={() => (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No pantry items found</Text>
          </View>
        )}
      />
    </ScreenContainer>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.neutral,
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: '600',
    color: theme.colors.primary,
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
  categoryList: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
  },
  categoryChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.sm,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  categoryChipSelected: {
    backgroundColor: theme.colors.primary,
    borderColor: theme.colors.primary,
  },
  categoryChipText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textPrimary,
  },
  categoryChipTextSelected: {
    color: theme.colors.surface,
    fontWeight: '600',
  },
  statusFilters: {
    flexDirection: 'row',
    paddingHorizontal: theme.spacing.md,
    paddingBottom: theme.spacing.sm,
    flexWrap: 'wrap',
  },
  statusChip: {
    paddingHorizontal: theme.spacing.md,
    paddingVertical: theme.spacing.xs,
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    marginRight: theme.spacing.sm,
    marginBottom: theme.spacing.sm,
    borderWidth: 1,
  },
  statusChipSelected: {
    backgroundColor: theme.colors.surface,
  },
  statusChipText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
  },
  statusChipTextSelected: {
    fontWeight: '600',
  },
  pantryList: {
    padding: theme.spacing.md,
  },
  pantryItem: {
    backgroundColor: theme.colors.surface,
    borderRadius: theme.borderRadius.md,
    padding: theme.spacing.md,
    marginBottom: theme.spacing.md,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    ...Platform.select({
      ios: {
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 1 },
        shadowOpacity: 0.1,
        shadowRadius: 2,
      },
      android: {
        elevation: 2,
      },
    }),
    borderWidth: 1,
    borderColor: theme.colors.neutralDark,
  },
  pantryItemContent: {
    flex: 1,
  },
  pantryItemHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xs,
  },
  pantryItemName: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: '600',
    color: theme.colors.textPrimary,
    marginRight: theme.spacing.sm,
  },
  statusIndicator: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  pantryItemDetails: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  pantryItemQuantity: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
  },
  pantryItemCategory: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginRight: theme.spacing.md,
  },
  pantryItemExpiry: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.warning,
  },
  pantryItemStatus: {
    fontSize: theme.typography.bodyText.small,
    fontWeight: '500',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: theme.spacing.xl,
  },
  emptyText: {
    fontSize: theme.typography.bodyText.regular,
    color: theme.colors.textSecondary,
  },
});

export default PantryScreen; 