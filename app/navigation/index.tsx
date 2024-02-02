import * as React from 'react';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import * as SplashScreen from 'expo-splash-screen';
import { NavigationContainer } from '@react-navigation/native';
import { useFonts } from 'expo-font';

import BottomTab from './BottomTab';
import { useEffect } from 'react';

export default function RootNavigation() {
  const [loaded, error] = useFonts({
    InterRegular: require('../../assets/fonts/Inter-Regular.ttf'),
    InterSemibold: require('../../assets/fonts/Inter-SemiBold.ttf'),
    InterBold: require('../../assets/fonts/Inter-Bold.ttf'),
    InterMedium: require('../../assets/fonts/Inter-Medium.ttf'),
    InterLight: require('../../assets/fonts/Inter-Light.ttf'),
    InterExtraLight: require('../../assets/fonts/Inter-ExtraLight.ttf'),
    InterThin: require('../../assets/fonts/Inter-Thin.ttf'),
    InterBlack: require('../../assets/fonts/Inter-Black.ttf'),
    ...FontAwesome.font,
  });

  // Expo Router uses Error Boundaries to catch errors in the navigation tree.
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }
  return (
    <NavigationContainer>
      <BottomTab />
    </NavigationContainer>
  );
}
