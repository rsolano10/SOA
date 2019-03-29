import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import LoginScreen from '../screens/LoginScreen';
import MainMenu from '../screens/MainMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabNavigator from './MainTabNavigator';
import SwitchesScreen from '../screens/SwitchesScreen';

export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  Login: LoginScreen,
  Main: MainMenu,
  Settings:SettingsScreen,
  Switches:MainTabNavigator
}));