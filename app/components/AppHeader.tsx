import React from 'react';
import { StyleSheet, Image, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import theme, { Box, Text } from '../theme';

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 70,
    paddingHorizontal: theme.spacing.m,
    paddingVertical: theme.spacing.s,
    backgroundColor: theme.colors.white,
    borderTopWidth: 2,
    borderColor: theme.colors.primary,
  },
  logo: {
    width: 154,
    height: 45,
  },
});

interface AppHeaderProps {
  title: string;
  showBackButton?: boolean;
  navigation?: any; // find correct type here later
}
const AppHeader = (props: AppHeaderProps) => {
  return (
    <Box style={styles.container}>
      {props.showBackButton && (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={18} color="black" />
        </TouchableOpacity>
      )}
      <Box marginLeft="m">
        {props.showBackButton ? (
          <Text variant="subTitle">{props.title}</Text>
        ) : (
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        )}
      </Box>
    </Box>
  );
};

export default AppHeader;
