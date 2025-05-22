import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image 
} from 'react-native';
import theme from '../styles/theme';

interface HeaderProps {
  title: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  onPressLeft?: () => void;
  onPressRight?: () => void;
}

const Header: React.FC<HeaderProps> = ({
  title,
  leftIcon,
  rightIcon,
  onPressLeft,
  onPressRight,
}) => {
  return (
    <View style={styles.header}>
      {leftIcon ? (
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={onPressLeft}
        >
          {leftIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
      
      <Text style={styles.title}>{title}</Text>
      
      {rightIcon ? (
        <TouchableOpacity 
          style={styles.iconContainer} 
          onPress={onPressRight}
        >
          {rightIcon}
        </TouchableOpacity>
      ) : (
        <View style={styles.iconPlaceholder} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    height: 56,
    width: '100%',
    paddingHorizontal: theme.spacing.md,
    backgroundColor: theme.colors.surface,
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.neutralDark,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
  },
  iconPlaceholder: {
    width: 40,
  },
  title: {
    fontSize: theme.typography.headingSizes.h5,
    fontWeight: '700',
    color: theme.colors.textPrimary,
    textAlign: 'center',
    flex: 1,
  },
});

export default Header; 