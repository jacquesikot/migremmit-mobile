import React from 'react';
import { StyleSheet } from 'react-native';

import AppHeader from '../components/AppHeader';
import SetDefaultCountry from '../components/SetDefaultCountry';
import SetDefaultCurrency from '../components/SetDefaultCurrency';
import SetThemeMode from '../components/SetThemeMode';
import { Box } from '../theme';
import useTheme from '../hooks/useTheme';
import { useAppDispatch } from '../redux/hooks';
import useCreateMessage from '../language/createMessage';

const styledTheme = (theme: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.mainBackgroundLight,
    },

    pickerBox: {
      backgroundColor: theme.colors.white,
      width: '90%',
      borderRadius: 12,
      marginTop: theme.spacing.xl,
      padding: theme.spacing.m,
      borderWidth: 1,
      borderColor: theme.colors.lightGrey,
    },
  });

const Settings = () => {
  const theme = useTheme();
  const { createMessage } = useCreateMessage();
  const styles = styledTheme(theme);
  const dispatch = useAppDispatch();
  return (
    <>
      <Box style={styles.container}>
        <AppHeader title={createMessage('SETTINGS')} dontShowBackButton />

        <Box style={styles.pickerBox} alignSelf="center">
          {/* <SetThemeMode /> */}
          <SetDefaultCountry />
          <SetDefaultCurrency />
        </Box>
      </Box>
    </>
  );
};

export default Settings;
