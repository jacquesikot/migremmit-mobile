import React from 'react';
import { Image, StyleSheet } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Circle } from 'react-native-svg';

import { useAppSelector } from '../redux/hooks';
import { Box, Text } from '../theme';
import Button from './Button';
import useTheme from '../hooks/useTheme';
import useCreateMessage from '../language/createMessage';

const styledTheme = (theme: any) => {
  return StyleSheet.create({
    container: {
      width: wp(90),
      backgroundColor: theme.colors.white,
      borderRadius: theme.spacing.s,
      padding: theme.spacing.s,
      marginTop: theme.spacing.l,
      alignItems: 'center',
    },
    logoContainer: {
      width: '98%',
      backgroundColor: theme.colors.lightGrey,
      borderRadius: theme.spacing.s,
      height: 70,
      justifyContent: 'center',
      padding: theme.spacing.s,
    },
    bestDealContainer: {},
  });
};

interface ProviderCardProps {
  logoUrl: string;
  rating: number;
  timeToReceive: string;
  fee: string;
  exchangeRate: string;
  recipientGets: string;
  onPress: () => void;
}

interface CircleProgressBarProps {
  progress: number;
  theme: any;
}

const PROGRESS_BAR_RADIUS = 30;
const PROGRESS_BAR_STROKE_WIDTH = 5;

const CircularProgressBar = ({ progress, theme }: CircleProgressBarProps) => {
  const circumference = 2 * Math.PI * PROGRESS_BAR_RADIUS;
  const progressValue = (progress / 100) * circumference;

  return (
    <Box justifyContent="center" alignItems="center">
      <Svg height="100" width="100">
        {/* Background circle */}
        <Circle cx="50%" cy="50%" r={PROGRESS_BAR_RADIUS} stroke="#e0e0e0" strokeWidth="5" fill="white" />

        {/* Progress circle */}
        <Circle
          cx="50%"
          cy="50%"
          r={PROGRESS_BAR_RADIUS}
          stroke={theme.colors.primary}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={`${progressValue} ${circumference}`}
        />
      </Svg>

      <Text variant="subTitle" style={{ textAlign: 'center', position: 'absolute', fontSize: 16 }}>{`${
        progress / 10
      }`}</Text>
    </Box>
  );
};

const ProviderCard = (props: ProviderCardProps) => {
  const theme = useTheme();
  const styles = styledTheme(theme);
  const { createMessage } = useCreateMessage();
  const activeToCurrency = useAppSelector((state) => state.country.activeToCurrency);
  const activeFromCurrency = useAppSelector((state) => state.country.activeFromCurrency);
  const timeTakenText =
    parseInt(props.timeToReceive) > 0
      ? `${props.timeToReceive} ${createMessage('DAYS_TO_RECEIVE')}`
      : createMessage('IN_MINUTES');
  return (
    <Box style={styles.container}>
      <Box style={styles.logoContainer}>
        <Box position="absolute" right={0} top={-45}>
          <CircularProgressBar progress={props.rating * 10} theme={theme} />
        </Box>
        <Image source={{ uri: props.logoUrl }} style={{ width: 180, height: 50 }} />
      </Box>

      <Box width={'100%'} padding="s">
        <Box flexDirection="row" alignItems="center" justifyContent="space-between">
          <Text variant="subTitle" fontSize={14} fontWeight="400" style={{ textAlign: 'center' }}>
            {timeTakenText}
          </Text>
          <Text color="textSecondary" fontSize={14} fontWeight="400" variant="subTitle" style={{ textAlign: 'center' }}>
            {createMessage('RECEIPIENT_GETS')}
          </Text>
        </Box>

        <Box flexDirection="row" justifyContent="space-between" mt="m">
          <Box>
            <Box flexDirection="row" alignItems="center">
              <Text color="textSecondary" fontSize={12} fontWeight="400" variant="subTitle">
                {createMessage('FEE')}
              </Text>
              <Text fontSize={12} fontWeight="400" variant="subTitle" ml="xs">
                {props.fee} {activeFromCurrency.code}
              </Text>
            </Box>
            <Box flexDirection="row" alignItems="center">
              <Text color="textSecondary" fontSize={12} fontWeight="400" variant="subTitle">
                {createMessage('EXCHANGE_RATE')}
              </Text>
              <Text fontSize={12} fontWeight="400" variant="subTitle" ml="xs">
                {parseInt(props.exchangeRate).toFixed(3)}
              </Text>
            </Box>
          </Box>
          <Box>
            <Text fontSize={18} fontWeight="400" variant="subTitle">
              {parseInt(props.recipientGets).toFixed(2)} {activeToCurrency.code}
            </Text>
          </Box>
        </Box>
      </Box>

      <Box width={'100%'} mt="m">
        <Button variant="secondary" label={createMessage('GO')} onPress={props.onPress} />
      </Box>
    </Box>
  );
};

export default ProviderCard;
