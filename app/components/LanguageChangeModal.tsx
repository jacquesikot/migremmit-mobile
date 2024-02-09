import { Feather } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { Currency, Language, setLanguage } from '../redux/slice/country';
import { Box, Text } from '../theme';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import useTheme from '../hooks/useTheme';

const styledTheme = (theme: any) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: theme.spacing.xl,
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: 22,
      backgroundColor: 'rgba(0,0,0,0.8)',
    },
    modalView: {
      margin: 20,
      backgroundColor: 'white',
      borderRadius: 12,
      padding: 35,
      alignItems: 'center',
      justifyContent: 'center',
      shadowColor: theme.colors.black,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '90%',
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      width: '100%',
      marginBottom: theme.spacing.m,
    },
    selectContainer: {
      flexDirection: 'row',
      borderBottomWidth: 2,
      paddingVertical: theme.spacing.m,
      paddingHorizontal: theme.spacing.m,
      borderRadius: theme.spacing.s,
      borderBottomColor: theme.colors.lightGrey,
      alignItems: 'center',
    },
  });
};

interface LanguageChangeModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
}
const LanguageChangeModal = (props: LanguageChangeModalProps) => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  const activeLanguage = useAppSelector((state) => state.country.language);
  const dispatch = useAppDispatch();
  const languages: Language[] = [
    {
      name: 'English',
      value: 'ENGLISH',
      flagUrl: 'https://flagcdn.com/w320/us.png',
    },
    {
      name: 'Bemba',
      value: 'BEMBA',
      flagUrl: 'https://flagcdn.com/w320/zm.png',
    },
  ];
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        dispatch(setLanguage(item));
        props.setVisible(false);
      }}
    >
      <Box
        style={{
          ...styles.selectContainer,
          backgroundColor: activeLanguage.value === item.value ? theme.colors.lightGrey : theme.colors.white,
        }}
      >
        <Image source={{ uri: item.flagUrl }} style={{ width: 20, height: 15, borderRadius: 3 }} />
        <Text variant="body" ml="s" numberOfLines={1}>
          {item.name}
        </Text>
      </Box>
    </TouchableOpacity>
  );

  if (!props.visible) {
    return null;
  }

  return (
    <Box style={styles.container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(!props.visible);
        }}
      >
        <Box style={styles.centeredView}>
          <Box style={styles.modalView}>
            <Box style={styles.header}>
              <Text variant="subTitle" color="text">
                Select a language
              </Text>
              <TouchableOpacity onPress={() => props.setVisible(false)}>
                <Feather name="x" size={22} color={theme.colors.text} />
              </TouchableOpacity>
            </Box>
            <FlatList
              style={{ width: '100%' }}
              data={languages}
              keyExtractor={(i, index) => i.value + index.toString()}
              renderItem={renderItem}
              initialNumToRender={10}
              maxToRenderPerBatch={5}
              windowSize={10}
            />
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default LanguageChangeModal;
