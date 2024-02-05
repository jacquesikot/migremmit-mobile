import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';

import theme, { Box, Text } from '../theme';
import { useAppDispatch, useAppSelector } from '../redux/hooks';
import CurrencyPickerModal from './CurrencyPickerModal';
import { Currency, setFromCurrency, setToCurrency } from '../redux/slice/country';
// import useCreateMessage from '../language/createMessage';

const styles = StyleSheet.create({
  container: {
    width: 100,
    borderWidth: 2,
    borderRadius: theme.spacing.xs,
    borderColor: theme.colors.grey,
    height: 55,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
  },
  currencyText: {
    fontFamily: 'InterBold',
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
});

interface SetDefaultCurrencyProps {
  isFrom?: boolean;
}
const SetDefaultCurrency = ({ isFrom }: SetDefaultCurrencyProps) => {
  const dispatch = useAppDispatch();
  const toCurrencies = useAppSelector((state) => state.country.toCurrencies);
  const fromCurrencies = useAppSelector((state) => state.country.fromCurrencies);
  const activeFromCurrency = useAppSelector((state) => state.country.activeFromCurrency);
  const activeToCurrency = useAppSelector((state) => state.country.activeToCurrency);
  const currencies = isFrom ? fromCurrencies : toCurrencies;
  const activeCurrency = isFrom ? activeFromCurrency : activeToCurrency;
  const [showCurrencyPicker, setShowCurrencyPicker] = React.useState(false);
  const handleSetCurrency = (currency: Currency) => {
    if (isFrom) {
      dispatch(setFromCurrency(currency));
    } else {
      dispatch(setToCurrency(currency));
    }
  };
//   const { createMessage } = useCreateMessage();
  
  return (
    <Box>
      <Text variant="caption" color="text" mb="xs" style={{ fontFamily: 'InterBold', fontSize: 10 }}>
      'Set Default Currency'
      </Text>
      <TouchableOpacity activeOpacity={0.8} onPress={() => setShowCurrencyPicker(true)} style={styles.container}>
        <Text variant="body" style={styles.currencyText}>
          {activeCurrency.code}
        </Text>
        <Feather name="chevron-down" size={16} color="black" />
      </TouchableOpacity>
      <CurrencyPickerModal
        activeCurrency={activeCurrency}
        curencies={currencies}
        visible={showCurrencyPicker}
        setVisible={setShowCurrencyPicker}
        setCurrency={handleSetCurrency}
      />
    </Box>
  );
};

export default SetDefaultCurrency;
