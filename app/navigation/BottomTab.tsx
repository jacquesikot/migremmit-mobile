import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import Settings from '../screens/Settings';
import HomeNav from './HomeNav';

const Tab = createBottomTabNavigator();

function BottomTab() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <Tab.Screen name="Home" component={HomeNav} />
      <Tab.Screen name="Settings" component={Settings} />
    </Tab.Navigator>
  );
}

export default BottomTab;
