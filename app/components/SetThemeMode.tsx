import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import theme, { Box, Text } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: theme.spacing.xs,
  },
  selectContainerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

const SetThemeMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleThemeMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <>
      <Box style={styles.container}>
        <Text variant="caption" color="text" style={{ fontFamily: 'InterBold', fontSize: 10 }}>
          Set Theme Mode
        </Text>
        <Box style={styles.selectContainer}>
          <TouchableOpacity onPress={toggleThemeMode}>
            <Box style={styles.selectContainerItem}>
              <Text variant="body" ml="s" style={{ fontFamily: 'InterSemibold', width: '80%' }} numberOfLines={1}>
                {isDarkMode ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleThemeMode}>
            <Feather name={isDarkMode ? 'moon' : 'sun'} size={24} color="black" />
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
};

export default SetThemeMode;
