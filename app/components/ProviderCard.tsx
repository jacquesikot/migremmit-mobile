import React from 'react';
import { StyleSheet, Image } from 'react-native';
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';
import Svg, { Circle } from 'react-native-svg';

import theme, { Box, Text } from '../theme';

const styles = StyleSheet.create({
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

interface ProviderCardProps {
  logoUrl: string;
  rating: number;
  timeToReceive: string;
  fee: string;
  exchangeRate: string;
  recipientGets: string;
}

interface CircleProgressBarProps {
  progress: number;
}

const PROGRESS_BAR_RADIUS = 20;
const PROGRESS_BAR_STROKE_WIDTH = 4;
const PROGRESS_BAR_DURATION = 1000;

const CircularProgressBar = ({ progress }: CircleProgressBarProps) => {
  // Assuming progress is a value between 0 and 100
  const radius = 30; // Adjust the radius as needed
  const circumference = 2 * Math.PI * radius;
  const progressValue = (progress / 100) * circumference;

  return (
    <Box justifyContent="center" alignItems="center">
      <Svg height="100" width="100">
        {/* Background circle */}
        <Circle cx="50%" cy="50%" r={radius} stroke="#e0e0e0" strokeWidth="5" fill="transparent" />

        {/* Progress circle */}
        <Circle
          cx="50%"
          cy="50%"
          r={radius}
          stroke={theme.colors.primary}
          strokeWidth="5"
          fill="transparent"
          strokeDasharray={`${progressValue} ${circumference}`}
        />
      </Svg>

      <Text variant="subTitle" style={{ textAlign: 'center', position: 'absolute' }}>{`${progress * 10}`}</Text>
    </Box>
  );
};

const ProviderCard = (props: ProviderCardProps) => {
  return (
    <Box style={styles.container}>
      <Box style={styles.logoContainer}>
        <Box position="absolute" right={0} top={-45}>
          <CircularProgressBar progress={props.rating * 10} />
        </Box>
        <Image source={{ uri: props.logoUrl }} style={{ width: 140, height: 40 }} />
      </Box>

      <Box>
        <Box>
          <Text variant="subTitle" style={{ textAlign: 'center' }}>
            {props.timeToReceive} days
          </Text>
          <Text variant="subTitle" style={{ textAlign: 'center' }}>
            Reciepient gets
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default ProviderCard;
