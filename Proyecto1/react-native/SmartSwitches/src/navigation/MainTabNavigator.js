import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';
import TabBarIcon from '../components/TabBarIcon';
import SwitchesScreen from '../screens/SwitchesScreen';
import LinksScreen from '../screens/LinksScreen';
import StatsScreen from '../screens/StatsScreen';

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
  header:null,
};

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});


LinksStack.navigationOptions = {
  tabBarLabel: 'Rutines',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-stats' : 'md-alarm'}
    />
  ),
};


const StatsScreenStack = createStackNavigator({
  StatsScreen: StatsScreen,
});

StatsScreenStack.navigationOptions = {
  tabBarLabel: 'Stats',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-outlet${focused ? '' : 'md-stats'}`
          : 'md-stats'
      }
    />
  ),
  header:null,
};

export default createBottomTabNavigator({
  SwitchesScreenStack,
  LinksStack,
  StatsScreenStack,
});
