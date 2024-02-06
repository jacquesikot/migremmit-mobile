import { Feather } from '@expo/vector-icons';
import React from 'react';
import { StyleSheet, TextInput, TextInputProps, TouchableOpacity } from 'react-native';

import { useAppDispatch, useAppSelector } from '../redux/hooks';
import { Currency, setFromCurrency, setToCurrency } from '../redux/slice/country';
import theme, { Box, Text } from '../theme';
import CurrencyPickerModal from './CurrencyPickerModal';
import useCreateMessage from '../language/createMessage';

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderRadius: theme.spacing.xs,
    borderColor: theme.colors.primary,
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: 200,
    paddingHorizontal: theme.spacing.s,
    height: 55,
  },
  line: {
    width: 2,
    backgroundColor: theme.colors.lightGrey,
  },
  input: {
    width: '60%',
    height: 50,
    fontFamily: 'InterRegular',
    fontSize: 18,
    color: theme.colors.text,
  },
  currencyPicker: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingLeft: theme.spacing.s,
  },
  currencyText: {
    fontFamily: 'InterBold',
    fontSize: 16,
    marginRight: theme.spacing.xs,
  },
});

interface CurrencyInputProps extends TextInputProps {
  isFrom?: boolean;
}
const CurrencyInput = (props: CurrencyInputProps) => {
  const dispatch = useAppDispatch();
  const toCurrencies = useAppSelector((state) => state.country.toCurrencies);
  const fromCurrencies = useAppSelector((state) => state.country.fromCurrencies);
  const activeFromCurrency = useAppSelector((state) => state.country.activeFromCurrency);
  const activeToCurrency = useAppSelector((state) => state.country.activeToCurrency);
  const currencies = props.isFrom ? fromCurrencies : toCurrencies;
  const activeCurrency = props.isFrom ? activeFromCurrency : activeToCurrency;
  const [showCurrencyPicker, setShowCurrencyPicker] = React.useState(false);
  
  const handleSetCurrency = (currency: Currency) => {
    if (props.isFrom) {
      dispatch(setFromCurrency(currency));
    } else {
      dispatch(setToCurrency(currency));
    }
  };
  const { createMessage } = useCreateMessage();
  return (
    <Box>
      <Text variant="caption" color="text" mb="xs" style={{ fontFamily: 'InterBold', fontSize: 10 }}>
        {createMessage('YOU_SEND')}
      </Text>
      <Box style={styles.container}>
        <TextInput style={styles.input} placeholder="E.g. 550" {...props} />
        <Box style={styles.line} />
        <TouchableOpacity onPress={() => setShowCurrencyPicker(true)} style={styles.currencyPicker}>
          <Text variant="body" style={styles.currencyText}>
            {activeCurrency.code}
          </Text>
          <Feather name="chevron-down" size={16} color="black" />
        </TouchableOpacity>
      </Box>

      <CurrencyPickerModal
        activeCurrency={activeCurrency}
        curencies={currencies}
        setCurrency={handleSetCurrency}
        visible={showCurrencyPicker}
        setVisible={setShowCurrencyPicker}
      />
    </Box>
  );
};

export default CurrencyInput;
