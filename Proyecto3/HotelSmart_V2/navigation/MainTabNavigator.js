import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import HotelServiciosScreen from '../screens/HotelServiciosScreen';
import HotelActividadesScreen from '../screens/HotelActividadesScreen';

import i18n from '../src/i18n';

const HomeStack = createStackNavigator({
  Home: HomeScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('Habitaciones'),
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

const LinksStack = createStackNavigator({
  Links: LinksScreen,
});

LinksStack.navigationOptions = {
  tabBarLabel: i18n.t('Hotel'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const SettingsStack = createStackNavigator({
  Settings: HotelServiciosScreen,
});

SettingsStack.navigationOptions = {
  tabBarLabel: i18n.t('Servicios'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-crop' : 'md-crop'}
    />
  ),
};

const ActividadesStack = createStackNavigator({
  HotelActividades: HotelActividadesScreen,
});

ActividadesStack.navigationOptions = {
  tabBarLabel: i18n.t('Actividades'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-bookmarks' : 'md-bookmarks'}
    />
  ),
};

const MainTab = createBottomTabNavigator({
  LinksStack,
  HomeStack,
  SettingsStack,
  ActividadesStack
});

MainTab.navigationOptions = {
  title: i18n.t('InfoHotel'),
  headerTintColor: 'white',
  headerStyle: {
      backgroundColor: 'red'
  },
}

export default MainTab;
