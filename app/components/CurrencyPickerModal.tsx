import { Feather } from '@expo/vector-icons';
import React from 'react';
import { FlatList, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';

import { Currency } from '../redux/slice/country';
import { Box, Text } from '../theme';
import { useAppSelector } from '../redux/hooks';
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

interface CurrencyPickerModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setCurrency: (country: Currency) => void;
  curencies: Currency[];
  activeCurrency: Currency;
}
const CurrencyPickerModal = (props: CurrencyPickerModalProps) => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  const countries = useAppSelector((state) => state.country.countries);
  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        props.setCurrency(item);
        props.setVisible(false);
      }}
    >
      <Box
        style={{
          ...styles.selectContainer,
          backgroundColor: props.activeCurrency.name === item.name ? theme.colors.lightGrey : theme.colors.white,
        }}
      >
        <Image
          source={{ uri: countries.filter((c) => c.currencyName === item.name)[0].flagUrl }}
          style={{ width: 20, height: 15, borderRadius: 3 }}
        />
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
                Select a currency
              </Text>
              <TouchableOpacity onPress={() => props.setVisible(false)}>
                <Feather name="x" size={22} color={theme.colors.text} />
              </TouchableOpacity>
            </Box>
            <FlatList
              style={{ width: '100%' }}
              data={props.curencies}
              keyExtractor={(i, index) => i.code + index.toString()}
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

export default CurrencyPickerModal;
