import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Button from './Button';
import theme, { Box, Text } from '../theme';
import { numberWithCommas } from '../utils';
import { useAppSelector } from '../redux/hooks';

const styles = StyleSheet.create({
  container: {
    width: '90%',
    backgroundColor: theme.colors.white,
    borderRadius: theme.spacing.s,
    alignItems: 'center',
    justifyContent: 'center',
    padding: theme.spacing.m,
  },
  noResultText: {
    fontSize: 20,
    fontFamily: 'InterRegular',
    color: theme.colors.text,
    marginVertical: theme.spacing.s,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: theme.colors.text,
    fontWeight: '400',
    marginVertical: theme.spacing.s,
    textAlign: 'center',
    lineHeight: 23,
  },
});

interface NoResultProps {
  navigation: any;
  amount: number;
}
const NoResult = (props: NoResultProps) => {
  const activeFromCurrency = useAppSelector((state) => state.country.activeFromCurrency);
  const activeFromCountry = useAppSelector((state) => state.country.activeFromCountry);
  const activeToCountry = useAppSelector((state) => state.country.activeToCountry);
  const generateTitleText = `We could not find any providers who'd transfer ${
    numberWithCommas(props.amount.toString()) + ' ' + activeFromCurrency
  } from ${activeFromCountry.name} to ${activeToCountry.name}.`;
  return (
    <Box style={styles.container}>
      <Feather name="alert-circle" size={30} color={theme.colors.secondary} />
      <Text variant="subTitle" style={styles.noResultText}>
        No results
      </Text>
      <Text variant="subTitle" style={styles.titleText}>
        {generateTitleText}
      </Text>
      <Button
        label="Try new search"
        variant="secondary"
        onPress={() => props.navigation.goBack()}
        width={200}
        containerStyle={{
          marginTop: theme.spacing.m,
        }}
      />
    </Box>
  );
};

export default NoResult;
