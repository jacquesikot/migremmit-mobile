import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Feather } from '@expo/vector-icons';

import Settings from '../screens/Settings';
import HomeNav from './HomeNav';
import useTheme from '../hooks/useTheme';

const Tab = createBottomTabNavigator();

function BottomTab() {
  const theme = useTheme();
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarActiveBackgroundColor: theme.colors.lightGrey,
      }}
    >
      <Tab.Screen
        name="Home"
        component={HomeNav}
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <Feather name="home" size={24} color={color} />,
        }}
      />
      <Tab.Screen
        name="Settings"
        component={Settings}
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <Feather name="settings" size={24} color={color} />,
        }}
      />
    </Tab.Navigator>
  );
}

export default BottomTab;
