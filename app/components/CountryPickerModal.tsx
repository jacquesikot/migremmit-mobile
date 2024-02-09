import React, { useEffect } from 'react';
import { FlatList, Image, Modal, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import { Box, Text } from '../theme';
import SearchInput from './SearchInput';
import { Country } from '../redux/slice/country';
import { useAppSelector } from '../redux/hooks';
import useTheme from '../hooks/useTheme';

const styles = (theme: any) => {
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
      height: '80%',
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
      borderBottomColor: theme.colors.lightGrey,
      alignItems: 'center',
    },
  });
};

interface CountryPickerModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  setCountry: (country: Country) => void;
}
const CountryPickerModal = (props: CountryPickerModalProps) => {
  const theme = useTheme();
  const countries = useAppSelector((state) => state.country.countries);
  const [searchText, setSearchText] = React.useState('');
  const [filteredCountries, setFilteredCountries] = React.useState<Country[]>(countries);

  useEffect(() => {
    if (searchText.length === 0) {
      setFilteredCountries(countries);
      return;
    }
    const filtered = countries.filter((country) => country.name.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredCountries(filtered);
  }, [searchText, countries]);

  useEffect(() => {
    setFilteredCountries(countries);
  }, [props.visible]);

  const renderItem = ({ item }: any) => (
    <TouchableOpacity
      onPress={() => {
        props.setCountry(item);
        props.setVisible(false);
      }}
    >
      <Box style={styles(theme).selectContainer}>
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
    <Box style={styles(theme).container}>
      <Modal
        animationType="slide"
        transparent={true}
        visible={props.visible}
        onRequestClose={() => {
          props.setVisible(!props.visible);
        }}
      >
        <Box style={styles(theme).centeredView}>
          <Box style={styles(theme).modalView}>
            <Box style={styles(theme).header}>
              <Text variant="subTitle" color="text">
                Select a country
              </Text>
              <TouchableOpacity onPress={() => props.setVisible(false)}>
                <Feather name="x" size={22} color={theme.colors.text} />
              </TouchableOpacity>
            </Box>
            <SearchInput placeholder="Type here" onChangeText={(e) => setSearchText(e)} />
            <FlatList
              style={{ width: '100%' }}
              data={filteredCountries}
              keyExtractor={(i, index) => i.code + index.toString()} // code could be the same for different countries
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

export default CountryPickerModal;
