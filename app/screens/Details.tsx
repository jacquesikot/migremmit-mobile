import React, { useEffect } from 'react';
import { FlatList, Image, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Feather } from '@expo/vector-icons';

import AppHeader from '../components/AppHeader';
import theme, { Box, Text } from '../theme';
import { HomeNavStackProps } from '../navigation/HomeNav';
import { useAppSelector } from '../redux/hooks';
import { useMutation } from 'react-query';
import { GetRemittanceProvidersRequest, PayoutMethod, getRemittanceProviders } from '../api/monito';
import OverlayLoader from '../components/OverlayLoader';
import RemittanceOptionCard from '../components/RemittanceOptionCard';
import { numberWithCommas } from '../utils';
import NoResult from '../components/NoResult';
import ProviderCard from '../components/ProviderCard';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.lightGrey,
  },
  header: {
    paddingHorizontal: theme.spacing.m,
    height: 60,
    borderBottomWidth: 2,
    borderColor: theme.colors.primary,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: theme.spacing.xl,
  },
  headerCurrencyStyle: {
    fontFamily: 'InterMedium',
    fontSize: 16,
    color: theme.colors.text,
    marginLeft: theme.spacing.s,
  },
  optionsHeader: {
    height: 150,
    paddingLeft: theme.spacing.m,
    borderRadius: theme.spacing.s,
  },
});

const Details = ({ route, navigation }: NativeStackScreenProps<HomeNavStackProps, 'Details'>) => {
  const [activeOption, setActiveOption] = React.useState<PayoutMethod | undefined>();
  const activeFromCountry = useAppSelector((state) => state.country.activeFromCountry);
  const activeToCountry = useAppSelector((state) => state.country.activeToCountry);
  const activeFromCurrency = useAppSelector((state) => state.country.activeFromCurrency);
  const activeToCurrency = useAppSelector((state) => state.country.activeToCurrency);
  const apiData: GetRemittanceProvidersRequest = {
    from: activeFromCountry.code,
    to: activeToCountry.code,
    currencyFrom: activeFromCurrency.code,
    currencyTo: activeToCurrency.code,
    amount: route.params.amount,
  };
  // console.log(activeFromCountry);
  const getRemittanceMutation = useMutation((data: GetRemittanceProvidersRequest) => getRemittanceProviders(data), {
    onSuccess: (data) => {
      // console.log(data);
    },
    onError: (error) => {
      console.log(error);
      // setPageLoading(false);
    },
  });

  useEffect(() => {
    getRemittanceMutation.mutate(apiData);
  }, []);

  useEffect(() => {
    setActiveOption(getRemittanceMutation.data?.options[0]);
  }, [getRemittanceMutation.data]);
  return (
    <>
      <OverlayLoader visible={getRemittanceMutation.isLoading} />
      <Box style={styles.container}>
        <AppHeader title="Search Results" showBackButton navigation={navigation} />

        <Box style={styles.header}>
          <Image
            source={{ uri: activeFromCountry.flagUrl }}
            style={{ width: 25, height: 15, borderRadius: theme.spacing.xs }}
          />
          <Text variant="subTitle" style={styles.headerCurrencyStyle}>
            {numberWithCommas(route.params.amount.toString()) + ' ' + activeFromCurrency.code}
          </Text>

          <Feather
            name="arrow-right"
            size={16}
            color={theme.colors.text}
            style={{ marginHorizontal: theme.spacing.s }}
          />

          <Image
            source={{ uri: activeToCountry.flagUrl }}
            style={{ width: 25, height: 15, borderRadius: theme.spacing.xs }}
          />
          <Text variant="subTitle" style={styles.headerCurrencyStyle}>
            {activeToCurrency.code}
          </Text>
        </Box>

        <Box style={{ alignItems: 'center' }}>
          {getRemittanceMutation.data && getRemittanceMutation.data.options.length > 0 ? (
            <>
              <Box style={styles.optionsHeader}>
                <FlatList
                  data={getRemittanceMutation.data?.options}
                  showsHorizontalScrollIndicator={false}
                  keyExtractor={(i, index) => index.toString()}
                  horizontal
                  renderItem={({ item, index }) => (
                    <RemittanceOptionCard
                      handleOnPress={() => setActiveOption(item)}
                      key={index}
                      iconType={item.payout}
                      amount={item.promosAmount ? item.promosAmount.toString() : item.receivedAmount.toString()}
                      isBestValue={item.isBestValue}
                      active={activeOption === item}
                    />
                  )}
                />
              </Box>

              <Box
                style={{
                  width: '100%',
                  paddingHorizontal: theme.spacing.m,
                  marginVertical: theme.spacing.m,
                }}
              >
                <Text variant="subTitle">Providers</Text>
              </Box>

              <FlatList
                data={getRemittanceMutation.data.providers}
                keyExtractor={(i, index) => index.toString()}
                renderItem={({ item }) => (
                  <ProviderCard
                    logoUrl={item.logo}
                    rating={item.providerScore || 0}
                    timeToReceive={item.transferTime.toString()}
                    exchangeRate={item.rate.toString()}
                    recipientGets={item.receivedAmount.toString()}
                    fee={item.fee.toString()}
                  />
                )}
              />
            </>
          ) : getRemittanceMutation.isLoading ? null : (
            <NoResult navigation={navigation} amount={route.params.amount} />
          )}
        </Box>
      </Box>
    </>
  );
};

export default Details;
