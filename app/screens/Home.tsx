import { LinearGradient } from 'expo-linear-gradient';
import React, { useEffect } from 'react';
import { KeyboardAvoidingView, Platform, ScrollView, StyleSheet } from 'react-native';
import { useQuery } from 'react-query';

import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { getAllCountries } from '../api/countries';
import AppHeader from '../components/AppHeader';
import Button from '../components/Button';
import CountryPicker from '../components/CountryPicker';
import CurrencyInput from '../components/CurrencyInput';
import CurrencyPicker from '../components/CurrencyPicker';
import OverlayLoader from '../components/OverlayLoader';
import { HomeNavStackProps } from '../navigation/HomeNav';
import { useAppDispatch } from '../redux/hooks';
import { Country, setCountries } from '../redux/slice/country';
import theme, { Box, Text } from '../theme';

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.white,
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: 'center',
    paddingTop: theme.spacing.xl,
  },
  headerText: {
    width: '70%',
    textAlign: 'center',
  },
  pickerBox: {
    backgroundColor: theme.colors.white,
    width: '90%',
    borderRadius: 12,
    marginTop: theme.spacing.xl,
    padding: theme.spacing.m,
  },
  line: {
    width: '100%',
    height: 2,
    backgroundColor: theme.colors.lightGrey,
    marginVertical: theme.spacing.m,
  },
});

const Home = ({ navigation }: NativeStackScreenProps<HomeNavStackProps, 'Search'>) => {
  const dispatch = useAppDispatch();
  const getCountriesQuery = useQuery({
    queryKey: 'countries',
    queryFn: () => getAllCountries(),
  });
  const countries: Country[] | [] = getCountriesQuery.data
    ? getCountriesQuery.data.map((country: any) => {
        const currencyKey = country.currencies && Object.keys(country.currencies)[0];
        return {
          name: country.name.common,
          code: currencyKey,
          flagUrl: country.flags.png,
          currencyName: country.currencies && country.currencies[currencyKey].name,
        };
      })
    : [];
  const [amount, setAmount] = React.useState('');

  useEffect(() => {
    dispatch(setCountries(countries));
  }, [getCountriesQuery.data]);

  return (
    <KeyboardAvoidingView behavior={Platform.OS === 'ios' ? 'padding' : 'height'} style={{ flex: 1 }}>
      <>
        <OverlayLoader visible={getCountriesQuery.isLoading} />
        <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
          <AppHeader title="Home" />
          <LinearGradient colors={[theme.colors.primary, theme.colors.white]} style={styles.gradient}>
            <Text variant="subTitle" color="white" style={styles.headerText}>
              Compare international money transfers and save
            </Text>
            <Box style={styles.pickerBox}>
              <CountryPicker isFrom />
              <Box style={styles.line} />
              <CountryPicker />
              <Box style={styles.line} />
              <Box flexDirection="row" alignItems="center" justifyContent="space-between">
                <CurrencyInput isFrom onChangeText={(e) => setAmount(e)} value={amount} />
                <CurrencyPicker />
              </Box>
              <Button
                label="Compare"
                variant="secondary"
                onPress={() => navigation.navigate('Details', { amount: parseInt(amount, 10) })}
                containerStyle={{ marginTop: 20 }}
                disabled={amount.length < 1}
              />
            </Box>
          </LinearGradient>
        </ScrollView>
      </>
    </KeyboardAvoidingView>
  );
};

export default Home;
