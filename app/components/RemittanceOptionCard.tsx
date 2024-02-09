import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Text } from '../theme';
import { PayoutType } from '../api/monito';
import { useAppSelector } from '../redux/hooks';
import { numberWithCommas } from '../utils';
import useTheme from '../hooks/useTheme';

const styledTheme = (theme: any) => {
  return StyleSheet.create({
    container: {
      backgroundColor: theme.colors.white,
      height: 140,
      padding: 10,
      width: 150,
      marginRight: 10,
      borderRadius: theme.spacing.s,
      alignItems: 'center',
    },
    transferText: {
      fontSize: 11,
      fontFamily: 'InterLight',
      fontWeight: '300',
      color: theme.colors.text,
    },
    titleText: {
      fontSize: 16,
      fontFamily: 'InterMedium',
      color: theme.colors.text,
    },
    amountText: {
      fontSize: 16,
      fontFamily: 'InterLight',
      fontWeight: '300',
      color: theme.colors.text,
      marginVertical: theme.spacing.xs,
    },
    bestValueText: {
      fontSize: 11,
      fontFamily: 'InterBold',
      fontWeight: '300',
      color: theme.colors.primary,
    },
  });
};

interface RemittanceOptionCardProps {
  iconType: PayoutType;
  amount: string;
  isBestValue: boolean;
  active: boolean;
  handleOnPress: () => void;
}
const RemittanceOptionCard = (props: RemittanceOptionCardProps) => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  const activeToCurrency = useAppSelector((state) => state.country.activeToCurrency);
  const returnIconFromPayoutType = () => {
    switch (props.iconType) {
      case 'CASH':
        return 'cash';
      case 'WALLET':
        return 'wallet-outline';
      case 'CARD':
        return 'credit-card-outline';
      default:
        return 'cash';
    }
  };

  const returnTitleTextFromPayoutType = () => {
    switch (props.iconType) {
      case 'CASH':
        return 'Cash pick up';
      case 'WALLET':
        return 'Mobile wallet';
      case 'CARD':
        return 'Card';
      default:
        return 'Cash';
    }
  };

  const activeStyle = props.active ? { borderColor: theme.colors.black, borderBottomWidth: 3 } : {};
  return (
    <TouchableOpacity activeOpacity={0.7} onPress={props.handleOnPress} style={{ ...styles.container, ...activeStyle }}>
      <MaterialCommunityIcons
        name={returnIconFromPayoutType()}
        size={24}
        color="black"
        style={{ marginBottom: theme.spacing.xs }}
      />
      <Text style={styles.transferText} variant="subTitle">
        Transfer to
      </Text>
      <Text style={styles.titleText} variant="subTitle">
        {returnTitleTextFromPayoutType()}
      </Text>
      <Text style={styles.amountText} variant="subTitle">
        {numberWithCommas(props.amount) + ' ' + activeToCurrency.code}
      </Text>
      {props.isBestValue && (
        <Text style={styles.bestValueText} variant="subTitle">
          Best Deal
        </Text>
      )}
    </TouchableOpacity>
  );
};

export default RemittanceOptionCard;
