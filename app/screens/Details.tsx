import { Feather } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, Linking, StyleSheet } from 'react-native';

import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { useMutation } from 'react-query';
import { GetRemittanceProvidersRequest, PayoutMethod, getRemittanceProviders } from '../api/monito';
import AppHeader from '../components/AppHeader';
import NoResult from '../components/NoResult';
import OverlayLoader from '../components/OverlayLoader';
import ProviderCard from '../components/ProviderCard';
import useTheme from '../hooks/useTheme';
import { HomeNavStackProps } from '../navigation/HomeNav';
import { useAppSelector } from '../redux/hooks';
import { Box, Text } from '../theme';
import { numberWithCommas } from '../utils';
import useCreateMessage from '../language/createMessage';

const styles = (theme: any) => {
  return StyleSheet.create({
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
};

const Details = ({ route, navigation }: NativeStackScreenProps<HomeNavStackProps, 'Details'>) => {
  const theme = useTheme();
  const { createMessage } = useCreateMessage();
  const [activeOption, setActiveOption] = useState<PayoutMethod | undefined>();
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
      console.log(data.providers.map((p) => p.payin));
      console.log(activeOption?.payout);
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

  const handleProviderClick = async (url: string) => {
    await Linking.openURL(url);
  };
  return (
    <>
      <OverlayLoader visible={getRemittanceMutation.isLoading} />
      <Box style={styles(theme).container}>
        <AppHeader title={createMessage('SEARCH_RESULT')} showBackButton navigation={navigation} />

        <Box style={styles(theme).header}>
          <Image
            source={{ uri: activeFromCountry.flagUrl }}
            style={{ width: 25, height: 15, borderRadius: theme.spacing.xs }}
          />
          <Text variant="subTitle" style={styles(theme).headerCurrencyStyle}>
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
          <Text variant="subTitle" style={styles(theme).headerCurrencyStyle}>
            {activeToCurrency.code}
          </Text>
        </Box>

        <Box style={{ alignItems: 'center' }}>
          {getRemittanceMutation.data && getRemittanceMutation.data.options.length > 0 ? (
            <>
              <Box style={{ height: hp(70) }}>
                <FlatList
                  data={getRemittanceMutation.data.providers}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(i, index) => index.toString()}
                  renderItem={({ item }) => (
                    <ProviderCard
                      logoUrl={item.logo}
                      rating={item.providerScore || 0}
                      timeToReceive={item.transferTime.toString()}
                      exchangeRate={item.rate.toString()}
                      recipientGets={item.receivedAmount.toString()}
                      fee={item.fee.toString()}
                      onPress={() => handleProviderClick(item.url)}
                    />
                  )}
                />
              </Box>
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
