import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
import ContactoScreen from '../screens/ContactoScreen';

import i18n from '../src/i18n';
import ReservasScreen from '../screens/ReservasScreen';

const HomeStack = createStackNavigator({
  Reservas: ReservasScreen,
});

HomeStack.navigationOptions = {
  tabBarLabel: i18n.t('Reservas'),
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

const ContactoStack = createStackNavigator({
  Contacto: ContactoScreen,
});

ContactoStack.navigationOptions = {
  tabBarLabel: i18n.t('Contacto'),
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? 'ios-home' : 'md-home'}
    />
  ),
};

const TabBarConfig = createBottomTabNavigator({
  HomeStack,
  ContactoStack,
});

TabBarConfig.navigationOptions = {
    title: i18n.t('AcercaDe'),
    headerTintColor: 'white',
    headerStyle: {
        backgroundColor: 'red'
    },
}

export default TabBarConfig;
