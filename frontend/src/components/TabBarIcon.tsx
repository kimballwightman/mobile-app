import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import theme from '../styles/theme';

// Since we don't have access to a full icon library, we'll create a basic text-based icon system
// In a real app, you would use a proper icon library like react-native-vector-icons

interface TabBarIconProps {
  name: string;
  focused: boolean;
}

const TabBarIcon: React.FC<TabBarIconProps> = ({ name, focused }) => {
  // Simple text-based icons (would be replaced with proper icons in a real app)
  const getIconText = () => {
    switch (name) {
      case 'Dashboard':
        return '📊'; // Dashboard icon
      case 'Plan':
        return '📅'; // Calendar/Planning icon
      case 'Explore':
        return '🔍'; // Search/Explore icon
      case 'Pantry':
        return '🥘'; // Pantry/Food icon
      default:
        return '•';
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[
        styles.icon, 
        focused && styles.focusedIcon
      ]}>
        {getIconText()}
      </Text>
      <Text style={[
        styles.label,
        focused && styles.focusedLabel
      ]}>
        {name}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: theme.spacing.xs,
  },
  icon: {
    fontSize: 18,
    marginBottom: 2,
    color: theme.colors.textSecondary,
  },
  focusedIcon: {
    color: theme.colors.primary,
  },
  label: {
    fontSize: theme.typography.bodyText.extraSmall,
    color: theme.colors.textSecondary,
  },
  focusedLabel: {
    color: theme.colors.primary,
    fontWeight: '700',
  },
});

export default TabBarIcon; 