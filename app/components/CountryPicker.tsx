import React from 'react';
import { StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Feather } from '@expo/vector-icons';

import theme, { Box, Text } from '../theme';
import CountryPickerModal from './CountryPickerModal';
import { Country, setActiveFromCountry, setActiveToCountry } from '../redux/slice/country';
import { useAppDispatch, useAppSelector } from '../redux/hooks';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '100%',
    padding: 10,
    borderRadius: 8,
    backgroundColor: 'white',
    marginTop: theme.spacing.xs,
  },
  selectContainerItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});

interface CountryPickerProps {
  isFrom?: boolean;
}
const CountryPicker = (props: CountryPickerProps) => {
  const [modalVisible, setModalVisible] = React.useState(false);
  const dispatch = useAppDispatch();
  const activeFromCountry = useAppSelector((state) => state.country.activeFromCountry);
  const activeToCountry = useAppSelector((state) => state.country.activeToCountry);
  const activeCountry = props.isFrom ? activeFromCountry : activeToCountry;
  const handleSetCountry = (country: Country) => {
    if (props.isFrom) {
      dispatch(setActiveFromCountry(country));
    } else {
      dispatch(setActiveToCountry(country));
    }
  };
  return (
    <>
      <Box style={styles.container}>
        <Text variant="caption" color="text" style={{ fontFamily: 'InterBold', fontSize: 10 }}>
          {props.isFrom ? 'COUNTRY FROM' : 'COUNTRY TO'}
        </Text>
        <Box style={styles.selectContainer}>
          <TouchableOpacity  onPress={() => setModalVisible(!modalVisible)}>
          <Box style={styles.selectContainerItem}>
            <Image source={{ uri: activeCountry.flagUrl }} style={{ width: 20, height: 15, borderRadius: 3 }} />
            <Text variant="body" ml="s" style={{ fontFamily: 'InterSemibold', width: '80%' }} numberOfLines={1}>
              {activeCountry.name}
            </Text>
          </Box>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Feather name="chevron-down" size={24} color="black" />
          </TouchableOpacity>
        </Box>
      </Box>
      <CountryPickerModal visible={modalVisible} setVisible={setModalVisible} setCountry={handleSetCountry} />
    </>
  );
};

export default CountryPicker;
