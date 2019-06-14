import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import SocialScreen from '../screens/SocialScreen';
import CommentScreen from '../screens/CommentsScreen';

import i18n from '../src/i18n';

const SocialStanck = createStackNavigator({
  Social: SocialScreen,
});

SocialStanck.navigationOptions = {
  tabBarLabel: i18n.t('Social'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-create${focused ? '' : '-outline'}`
          : 'md-create'
      }
    />
  ),
};

const CommentStack = createStackNavigator({
  Comment: CommentScreen,
});

CommentStack.navigationOptions = {
  tabBarLabel: i18n.t('Experiencias'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const TabBarConfig = createBottomTabNavigator({
  SocialStanck,
  CommentStack,
});

TabBarConfig.navigationOptions = {
    title: i18n.t('Social'),
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: 'red'
    },
}

export default TabBarConfig;
