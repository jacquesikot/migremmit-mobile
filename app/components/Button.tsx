import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { Box, Text } from '../theme';
import useTheme from '../hooks/useTheme';

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
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
  disabled?: boolean;
  width?: number;
}

const Button = ({ label, onPress, variant = 'primary', containerStyle, disabled, width }: ButtonProps) => {
  const theme = useTheme();
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
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={{ ...containerStyle, ...{ width: width ? width : undefined } }}
      disabled={disabled}
    >
      <Box style={[styles.container, { backgroundColor }]} opacity={disabled ? 0.5 : 1}>
        <Text variant="button" color={textColor}>
          {label}
        </Text>
      </Box>
    </TouchableOpacity>
  );
};

export default Button;
