import React from 'react';
import { StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons';

import Button from './Button';
import theme, { Box, Text } from '../theme';

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
    marginBottom: theme.spacing.xs,
  },
  titleText: {
    fontSize: 16,
    fontFamily: 'InterRegular',
    color: theme.colors.text,
    fontWeight: '400',
    marginBottom: theme.spacing.s,
    textAlign: 'center',
  },
});

interface NoResultProps {
  navigation: any;
}
const NoResult = (props: NoResultProps) => {
  const generateTitleText = `We could not find any providers who'd transfer 1,000 ALL from Albania to Zambia.`;
  return (
    <Box style={styles.container}>
      <Feather name="alert-circle" size={30} color={theme.colors.secondary} />
      <Text variant="subTitle" style={styles.noResultText}>
        No results
      </Text>
      <Text variant="subTitle" style={styles.titleText}>
        We could not find any providers who'd transfer 1,000 ALL from Albania to Zambia.
      </Text>
      <Button label="Try new search" variant="secondary" onPress={() => true} width={200} />
    </Box>
  );
};

export default NoResult;
