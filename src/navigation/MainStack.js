import {LoginScreen, HomeScreen, DevicesDetailScreen} from '../screens';
import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import {mainStack} from '../config/navigators';

const Stack = createStackNavigator();
const MainStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name={mainStack.login} component={LoginScreen} />
      <Stack.Screen name={mainStack.home_tab} component={HomeScreen} />
      <Stack.Screen
        name={mainStack.device_detail}
        component={DevicesDetailScreen}
      />
    </Stack.Navigator>
  );
};

export default MainStack;
