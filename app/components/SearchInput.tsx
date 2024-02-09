import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { Box } from '../theme';
import useTheme from '../hooks/useTheme';

const styledTheme = (theme: any) => {
  return StyleSheet.create({
    container: {
      width: '100%',
      height: 50,
      backgroundColor: theme.colors.lightGrey,
      borderRadius: 12,
      alignItems: 'center',
      flexDirection: 'row',
      paddingHorizontal: theme.spacing.m,
    },
    input: {
      flex: 1,
      marginLeft: theme.spacing.s,
      fontFamily: 'InterRegular',
      fontSize: 14,
      color: theme.colors.text,
    },
  });
};

interface SearchInputProps extends TextInputProps {}
const SearchInput = (props: SearchInputProps) => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  return (
    <Box style={styles.container}>
      <Feather name="search" size={18} color="black" />
      <TextInput placeholder={props.placeholder} style={styles.input} {...props} />
    </Box>
  );
};

export default SearchInput;
