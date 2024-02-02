import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from '../screens/Home';
import Details from '../screens/Details';

const Stack = createNativeStackNavigator();

function HomeNav() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Search" component={Home} />
      <Stack.Screen name="Details" component={Details} />
    </Stack.Navigator>
  );
}

export default HomeNav;
