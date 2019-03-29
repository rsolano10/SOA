import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import { List, ListItem } from 'react-native-elements'

import TabBarIcon from '../components/TabBarIcon';
import SwitchesScreen from '../screens/SwitchesScreen';
import LinksScreen from '../screens/LinksScreen';

const SwitchesScreenStack = createStackNavigator({
  SwitchesScreen: SwitchesScreen,
});


SwitchesScreenStack.navigationOptions = {
  tabBarLabel: 'Switches',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-outlet${focused ? '' : '-outline'}`
          : 'md-outlet'
      }
    />
  ),
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: 'Rutines',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-stats'}
    />
  ),
};


export default createBottomTabNavigator({
  SwitchesScreenStack,
  LinksStack,
});
