import React from "react";
import { StyleSheet, View } from "react-native";
import OverlayLoader from "../components/OverlayLoader";
import theme, { Box, Text } from '../theme';
import AppHeader from "../components/AppHeader";
import  SetDefaultCountry  from  "../components/SetDefaultCountry"
import  SetDefaultCurrency  from  "../components/SetDefaultCurrency"

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGrey,
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

// interface SettingsProps {}


const Settings = () => {
  return <>
    {/* <OverlayLoader visible/> */}
    <Box style={styles.container}>
    <AppHeader title="Settings" showBackButton />
    
    <Box style={styles.pickerBox} alignSelf="center">
      <SetDefaultCountry />
      <SetDefaultCurrency/>
    </Box>
  
    </Box>
  
  </>;
};

export default Settings;
