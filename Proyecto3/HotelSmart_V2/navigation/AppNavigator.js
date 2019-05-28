import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import RegisterScreen from '../screens/RegisterScreen';

const AppStack = createStackNavigator({ Register: RegisterScreen });

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Auth: RegisterScreen,
  Main: MainTabNavigator,
}));