// theme.ts

import { createBox, createText, createTheme } from '@shopify/restyle';

const primaryColor = '#51C634';
const secondaryColor = '#FB8C3B';

const lightPalette = {
  mainBackground: '#FFFFFF',
  mainBackgroundLight: '#F2F4F7',
  cardPrimaryBackground: '#8C6FF7',
  white: '#FFFFFF',
  black: '#000000',
  primary: '#51C634',
  secondary: '#FB8C3B',
  grey: '#667085',
  lightGrey: '#F2F4F7',
  text: '#101828',
  textSecondary: '#475467',
  textDisabled: '#6E7191',
  backgroundDisabled: '#D3D3D3',
};

const darkPalette = {
  mainBackground: '#101828',
  mainBackgroundLight: '#121212',
  cardPrimaryBackground: '#8C6FF7',
  white: '#FFFFFF',
  black: '#000000',
  primary: '#51C634',
  secondary: '#FB8C3B',
  grey: '#475467',
  lightGrey: '#344054',
  text: '#FFFFFF',
  textSecondary: '#6E7191',
  textDisabled: '#475467',
  backgroundDisabled: '#D3D3D3',
};

const lightTheme = createTheme({
  colors: {
    ...lightPalette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      fontFamily: 'InterBold',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 28,
      fontFamily: 'InterMedium',
    },
    subTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'InterMedium',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'InterRegular',
    },
    caption: {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'InterLight',
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'InterMedium',
    },
    link: {
      fontSize: 16,
      textDecorationLine: 'underline',
      fontFamily: 'InterRegular',
    },
  },
});

const darkTheme = createTheme({
  colors: {
    ...darkPalette,
  },
  spacing: {
    xs: 4,
    s: 8,
    m: 16,
    l: 24,
    xl: 40,
  },
  textVariants: {
    header: {
      fontWeight: 'bold',
      fontSize: 34,
      fontFamily: 'InterBold',
    },
    title: {
      fontWeight: 'bold',
      fontSize: 28,
      fontFamily: 'InterMedium',
    },
    subTitle: {
      fontWeight: 'bold',
      fontSize: 20,
      fontFamily: 'InterMedium',
    },
    body: {
      fontSize: 16,
      lineHeight: 24,
      fontFamily: 'InterRegular',
    },
    caption: {
      fontSize: 12,
      lineHeight: 18,
      fontFamily: 'InterLight',
    },
    button: {
      fontSize: 16,
      fontWeight: 'bold',
      fontFamily: 'InterMedium',
    },
    link: {
      fontSize: 16,
      textDecorationLine: 'underline',
      fontFamily: 'InterRegular',
    },
  },
});

export type Theme = typeof lightTheme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();

export { lightTheme, darkTheme };
