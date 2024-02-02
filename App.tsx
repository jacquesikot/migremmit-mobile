import { SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { ThemeProvider } from '@shopify/restyle';
import { QueryClient, QueryClientProvider } from 'react-query';

import RootNavigation from './app/navigation';
import theme from './app/theme';
import { store } from './app/redux/store';

export default function App() {
  const queryClient = new QueryClient();
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Provider store={store}>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider theme={theme}>
            <RootNavigation />
          </ThemeProvider>
        </QueryClientProvider>
      </Provider>
    </SafeAreaView>
  );
}
