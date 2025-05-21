import React from 'react';
import { 
  TouchableOpacity, 
  Text, 
  StyleSheet, 
  ViewStyle, 
  TextStyle, 
  ActivityIndicator 
} from 'react-native';
import theme from '../styles/theme';

type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
type ButtonSize = 'small' | 'medium' | 'large';

interface ButtonProps {
  title: string;
  onPress: () => void;
  variant?: ButtonVariant;
  size?: ButtonSize;
  disabled?: boolean;
  fullWidth?: boolean;
  loading?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  title,
  onPress,
  variant = 'primary',
  size = 'medium',
  disabled = false,
  fullWidth = false,
  loading = false,
  style,
  textStyle,
  leftIcon,
  rightIcon,
}) => {
  const getButtonStyle = (): ViewStyle => {
    let baseStyle: ViewStyle = {
      borderRadius: theme.borderRadius.md,
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    };

    // Size styles
    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          paddingVertical: theme.spacing.xs,
          paddingHorizontal: theme.spacing.sm,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          paddingVertical: theme.spacing.md,
          paddingHorizontal: theme.spacing.lg,
        };
        break;
      default: // medium
        baseStyle = {
          ...baseStyle,
          paddingVertical: theme.spacing.sm,
          paddingHorizontal: theme.spacing.md,
        };
    }

    // Variant styles
    switch (variant) {
      case 'secondary':
        baseStyle = {
          ...baseStyle,
          backgroundColor: theme.colors.neutralDark,
        };
        break;
      case 'outline':
        baseStyle = {
          ...baseStyle,
          backgroundColor: 'transparent',
          borderWidth: 1,
          borderColor: theme.colors.primary,
        };
        break;
      case 'text':
        baseStyle = {
          ...baseStyle,
          backgroundColor: 'transparent',
        };
        break;
      default: // primary
        baseStyle = {
          ...baseStyle,
          backgroundColor: theme.colors.primary,
        };
    }

    // Full width style
    if (fullWidth) {
      baseStyle.width = '100%';
    }

    // Disabled style
    if (disabled || loading) {
      baseStyle.opacity = 0.6;
    }

    return baseStyle;
  };

  const getTextStyle = (): TextStyle => {
    let baseStyle: TextStyle = {
      fontWeight: theme.typography.fontWeight.bold as TextStyle['fontWeight'],
      fontSize: theme.typography.bodyText.regular,
    };

    // Size-based text styles
    switch (size) {
      case 'small':
        baseStyle = {
          ...baseStyle,
          fontSize: theme.typography.bodyText.small,
        };
        break;
      case 'large':
        baseStyle = {
          ...baseStyle,
          fontSize: theme.typography.bodyText.regular,
        };
        break;
      default: // medium
        baseStyle = {
          ...baseStyle,
          fontSize: theme.typography.bodyText.regular,
        };
    }

    // Variant-based text styles
    switch (variant) {
      case 'secondary':
        baseStyle = {
          ...baseStyle,
          color: theme.colors.textPrimary,
        };
        break;
      case 'outline':
      case 'text':
        baseStyle = {
          ...baseStyle,
          color: theme.colors.primary,
        };
        break;
      default: // primary
        baseStyle = {
          ...baseStyle,
          color: theme.colors.surface,
        };
    }

    return baseStyle;
  };

  return (
    <TouchableOpacity
      style={[getButtonStyle(), style]}
      onPress={onPress}
      disabled={disabled || loading}
      activeOpacity={0.8}
    >
      {leftIcon && !loading && <>{leftIcon}</>}
      
      {loading ? (
        <ActivityIndicator 
          size="small" 
          color={variant === 'primary' ? theme.colors.surface : theme.colors.primary} 
        />
      ) : (
        <Text style={[getTextStyle(), textStyle]}>{title}</Text>
      )}
      
      {rightIcon && !loading && <>{rightIcon}</>}
    </TouchableOpacity>
  );
};

export default Button; 