import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  TextInput,
  Text,
  StyleSheet,
  ViewStyle,
  TextStyle,
  TouchableOpacity,
  TextInputProps,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';
import theme from '../styles/theme';

interface InputFieldProps extends TextInputProps {
  label?: string;
  error?: string;
  helperText?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  secureTextEntry?: boolean;
  containerStyle?: ViewStyle;
  labelStyle?: TextStyle;
  inputStyle?: TextStyle;
  errorStyle?: TextStyle;
  helperTextStyle?: TextStyle;
  onRightIconPress?: () => void;
}

const InputField: React.FC<InputFieldProps> = ({
  label,
  error,
  helperText,
  leftIcon,
  rightIcon,
  secureTextEntry,
  containerStyle,
  labelStyle,
  inputStyle,
  errorStyle,
  helperTextStyle,
  onRightIconPress,
  ...textInputProps
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(!secureTextEntry);
  const inputRef = useRef<TextInput>(null);

  // Force focus on mount if autoFocus is true
  useEffect(() => {
    if (textInputProps.autoFocus && inputRef.current) {
      setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
    }
  }, [textInputProps.autoFocus]);

  const handleFocus = () => {
    setIsFocused(true);
    if (textInputProps.onFocus) {
      textInputProps.onFocus(undefined as any);
    }
  };

  const handleBlur = () => {
    setIsFocused(false);
    if (textInputProps.onBlur) {
      textInputProps.onBlur(undefined as any);
    }
  };

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
      // Explicitly show keyboard for iOS
      if (Platform.OS === 'ios') {
        setTimeout(() => {
          Keyboard.dismiss();
          inputRef.current?.focus();
        }, 50);
      }
    }
  };

  // Get styles for the input container based on state
  const getInputContainerStyle = (): ViewStyle => {
    let containerStyle: ViewStyle = {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: 1,
      borderColor: theme.colors.neutralDark,
      borderRadius: theme.borderRadius.md,
      paddingHorizontal: theme.spacing.sm,
      backgroundColor: theme.colors.surface,
    };

    if (isFocused) {
      containerStyle = {
        ...containerStyle,
        borderColor: theme.colors.primary,
        shadowColor: theme.colors.primary,
        shadowOpacity: 0.1,
        shadowRadius: 4,
        shadowOffset: { width: 0, height: 0 },
        elevation: 2,
      };
    }

    if (error) {
      containerStyle = {
        ...containerStyle,
        borderColor: theme.colors.error,
      };
    }

    return containerStyle;
  };

  // Calculate styles for the input based on presence of icons
  const getInputStyles = () => {
    const styles: TextStyle[] = [baseStyles.input, inputStyle || {}];
    
    if (leftIcon) {
      styles.push(baseStyles.inputWithLeftIcon);
    }
    
    if (rightIcon || secureTextEntry) {
      styles.push(baseStyles.inputWithRightIcon);
    }
    
    return styles;
  };

  return (
    <View style={[baseStyles.container, containerStyle]}>
      {label && (
        <Text style={[baseStyles.label, labelStyle]}>{label}</Text>
      )}

      <TouchableWithoutFeedback onPress={focusInput}>
        <View style={getInputContainerStyle()}>
          {leftIcon && (
            <View style={baseStyles.leftIconContainer}>
              {leftIcon}
            </View>
          )}

          <TextInput
            {...textInputProps}
            ref={inputRef}
            style={getInputStyles()}
            onFocus={handleFocus}
            onBlur={handleBlur}
            secureTextEntry={secureTextEntry && !isPasswordVisible}
            placeholderTextColor={theme.colors.textSecondary}
            editable={true}
            keyboardAppearance="light"
            blurOnSubmit={false}
            showSoftInputOnFocus={true}
          />

          {(rightIcon || secureTextEntry) && (
            <TouchableOpacity 
              style={baseStyles.rightIconContainer}
              onPress={secureTextEntry ? togglePasswordVisibility : onRightIconPress}
            >
              {secureTextEntry ? (
                <Text style={baseStyles.eyeIcon}>
                  {isPasswordVisible ? '👁️' : '👁️‍🗨️'}
                </Text>
              ) : (
                rightIcon
              )}
            </TouchableOpacity>
          )}
        </View>
      </TouchableWithoutFeedback>

      {error && (
        <Text style={[baseStyles.error, errorStyle]}>{error}</Text>
      )}

      {helperText && !error && (
        <Text style={[baseStyles.helperText, helperTextStyle]}>{helperText}</Text>
      )}
    </View>
  );
};

const baseStyles = StyleSheet.create({
  container: {
    marginBottom: theme.spacing.md,
    width: '100%',
  },
  label: {
    fontSize: theme.typography.bodyText.regular,
    fontWeight: theme.typography.fontWeight.medium as TextStyle['fontWeight'],
    color: theme.colors.textPrimary,
    marginBottom: theme.spacing.xs,
  },
  input: {
    flex: 1,
    fontSize: theme.typography.bodyText.regular,
    paddingVertical: theme.spacing.sm,
    color: theme.colors.textPrimary,
  },
  inputWithLeftIcon: {
    paddingLeft: theme.spacing.xs,
  },
  inputWithRightIcon: {
    paddingRight: theme.spacing.xs,
  },
  leftIconContainer: {
    marginRight: theme.spacing.xs,
  },
  rightIconContainer: {
    marginLeft: theme.spacing.xs,
  },
  error: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.error,
    marginTop: theme.spacing.xs,
  },
  helperText: {
    fontSize: theme.typography.bodyText.small,
    color: theme.colors.textSecondary,
    marginTop: theme.spacing.xs,
  },
  eyeIcon: {
    fontSize: theme.typography.bodyText.regular,
  },
});

export default InputField; 