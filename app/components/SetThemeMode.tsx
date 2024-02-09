import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Box, Text } from '../theme';
import useTheme from '../hooks/useTheme';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { toggleTheme } from '../redux/slice/country';

const styledTheme = (theme: any) => {
  return StyleSheet.create({
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
};

const SetThemeMode = () => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  const dispatch = useAppDispatch();
  const currentTheme = useAppSelector((state) => state.country.mode);

  const toggleThemeMode = () => {
    dispatch(toggleTheme());
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
                {currentTheme === 'DARK' ? 'Dark Mode' : 'Light Mode'}
              </Text>
            </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={toggleThemeMode}>
            <Feather name={currentTheme === 'DARK' ? 'moon' : 'sun'} size={24} color="black" />
          </TouchableOpacity>
        </Box>
      </Box>
    </>
  );
};

export default SetThemeMode;
