import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import AppHeader from '../components/AppHeader';
import theme, { Box, Text } from '../theme';
import { HomeNavStackProps } from '../navigation/HomeNav';
import { useAppSelector } from '../redux/hooks';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGrey,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
    height: 60,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerCurrencyStyle: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.s,
  },
});

const Details = ({ route }: NativeStackScreenProps<HomeNavStackProps, 'Details'>) => {
  const activeFromCountry = useAppSelector((state) => state.country.activeFromCountry);
  const activeToCountry = useAppSelector((state) => state.country.activeToCountry);
  return (
    <Box style={styles.container}>
      <AppHeader title="Search Results" showBackButton />

      <Box style={styles.header}>
        <Image
          source={{ uri: activeFromCountry.flagUrl }}
          style={{ width: 25, height: 15, borderRadius: theme.spacing.xs }}
        />
        <Text variant="subTitle" style={styles.headerCurrencyStyle}>
          {route.params.amount.toString() + ' ' + activeFromCountry.code}
        </Text>

        <Feather name="arrow-right" size={16} color={theme.colors.text} style={{ marginHorizontal: theme.spacing.s }} />

        <Image
          source={{ uri: activeToCountry.flagUrl }}
          style={{ width: 25, height: 15, borderRadius: theme.spacing.xs }}
        />
        <Text variant="subTitle" style={styles.headerCurrencyStyle}>
          {activeToCountry.code}
        </Text>
      </Box>
    </Box>
  );
};

export default Details;
