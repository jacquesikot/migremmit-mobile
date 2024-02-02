import { createBox, createText, createTheme } from '@shopify/restyle';

const primaryColor = '#51C634';
const secondaryColor = '#FB8C3B';

const palette = {
  white: 'white',
  black: 'black',
  dark: '#101828',
  lightGrey: '#F4F0EF',
  purplePrimary: '#8C6FF7',
  purpleLight: '#E0D6EB',
  purpleDark: '#342E37',
  greenPrimary: primaryColor,
  greenLight: '#E0F3E9',
  greenDark: '#2B4029',
  orangePrimary: secondaryColor,
  orangeLight: '#FDEEE4',
  orangeDark: '#5A371B',
  disabled: '#D3D3D3',
  grey: {
    50: '#F9FAFB',
    100: '#F2F4F7',
    200: '#EAECF0',
    300: '#D0D5DD',
    400: '#98A2B3',
    500: '#667085',
    600: '#475467',
    700: '#344054',
  },
  text: {
    primary: '#101828',
    secondary: '#475467',
    disabled: '#6E7191',
  },
};

const theme = createTheme({
  colors: {
    mainBackground: palette.white,
    cardPrimaryBackground: palette.purplePrimary,
    white: palette.white,
    black: palette.black,
    primary: palette.greenPrimary,
    secondary: palette.orangePrimary,
    grey: palette.grey[500],
    lightGrey: palette.grey[100],
    text: palette.text.primary,
    textSecondary: palette.text.secondary,
    textDisabled: palette.text.disabled,
    backgroundDisabled: palette.disabled,
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

export type Theme = typeof theme;
export const Box = createBox<Theme>();
export const Text = createText<Theme>();
export default theme;
