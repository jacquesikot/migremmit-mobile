import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootNavigation from './app/navigation';
import { darkTheme, lightTheme } from './app/theme';
import { store } from './app/redux/store';
import { useAppSelector } from './app/redux/hooks';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  const queryClient = new QueryClient();
  // const currentTheme = useAppSelector((state) => state.country.mode);
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <StatusBar style={'light'} backgroundColor={lightTheme.colors.mainBackground} />
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={lightTheme}>
            <RootNavigation />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaView>
  );
}
