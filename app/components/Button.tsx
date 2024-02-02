import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import theme, { Box, Text } from '../theme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    padding: theme.spacing.m,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
});

interface ButtonProps {
  label: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
  containerStyle?: any;
  disabled?: boolean; // New prop for disabled mode
}

const Button = ({ label, onPress, variant = 'primary', containerStyle, disabled }: ButtonProps) => {
  const backgroundColor = disabled
    ? theme.colors.backgroundDisabled
    : variant === 'primary'
    ? theme.colors.primary
    : theme.colors.secondary;

  const textColor = disabled ? 'textDisabled' : 'white';

  const handlePress = () => {
    if (!disabled) {
      onPress();
    }
  };

  return (
    <TouchableOpacity activeOpacity={0.7} onPress={handlePress} style={containerStyle} disabled={disabled}>
      <Box style={[styles.container, { backgroundColor }]} opacity={disabled ? 0.5 : 1}>
        <Text variant="button" color={textColor}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
