// create useTheme hook

import { useAppSelector } from '../redux/hooks';
import { darkTheme, lightTheme } from '../theme';

const useTheme = () => {
  const currentTheme = useAppSelector((state) => state.country.mode);

  const theme = currentTheme === 'LIGHT' ? lightTheme : darkTheme;

  return theme;
};

export default useTheme;
