import React from 'react';
import { StyleSheet, TextInput, TextInputProps } from 'react-native';
import { Feather } from '@expo/vector-icons';
import theme, { Box } from '../theme';

const styles = StyleSheet.create({
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

interface SearchInputProps extends TextInputProps {}
const SearchInput = (props: SearchInputProps) => {
  return (
    <Box style={styles.container}>
      <Feather name="search" size={18} color="black" />
      <TextInput placeholder={props.placeholder} style={styles.input} {...props} />
    </Box>
  );
};

export default SearchInput;
