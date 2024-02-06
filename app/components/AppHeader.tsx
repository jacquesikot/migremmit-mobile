import { Feather, Ionicons } from '@expo/vector-icons';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

import { useAppSelector } from '../redux/hooks';
import theme, { Box, Text } from '../theme';
import LanguageChangeModal from './LanguageChangeModal';

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
    marginTop:  20, // Hack to fix the top bar on iOS
  },
  logo: {
    width: 154,
    height: 45,
  },
});

interface AppHeaderProps {
  title: string;
  dontShowBackButton?: boolean;
  showBackButton?: boolean;
  navigation?: any; // find correct type here later
}
const AppHeader = (props: AppHeaderProps) => {
  const currentLanguage = useAppSelector((state) => state.country.language);
  const [showLanguageModal, setShowLanguageModal] = React.useState(false);
  return (
    <Box style={styles.container}>
      {props.showBackButton && (
        <TouchableOpacity onPress={() => props.navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={18} color="black" />
        </TouchableOpacity>) || props.dontShowBackButton
      }
      <Box marginLeft="m">
        {props.showBackButton || props.dontShowBackButton ? (
          <Text variant="subTitle">{props.title}</Text>
        ) : (
          <Image source={require('../../assets/images/logo.png')} style={styles.logo} />
        )}
      </Box>

      <Box flex={1} />

      {!showLanguageModal && (
        <TouchableOpacity
          onPress={() => setShowLanguageModal(!showLanguageModal)}
          style={{ flexDirection: 'row', alignItems: 'center' }}
        >
          <Image
            source={{ uri: currentLanguage.flagUrl }}
            style={{ width: 25, height: 15, borderRadius: theme.spacing.xs, marginRight: theme.spacing.xs }}
          />
          <Feather name="chevron-down" size={18} color="black" />
        </TouchableOpacity>
      )}

      <LanguageChangeModal visible={showLanguageModal} setVisible={setShowLanguageModal} />
    </Box>
  );
};

export default AppHeader;
