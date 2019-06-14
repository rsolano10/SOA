import React from 'react';
import { createAppContainer, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';
import LoginScreen from '../screens/LoginScreen';
import RegisterScreen from '../screens/RegisterScreen';
import CloudVisionScreen from '../screens/CloudVisionScreen';
import WeatherScreen from '../screens/WeatherScreen';
import MainMenuScreen from '../screens/MainMenuScreen';
import BedroomScreen from '../screens/BedroomScreen';
import ConstactoScreen from '../screens/ContactoScreen';
import ConfigScreen from './ConfigNavigator';
import HotelServiciosScreen from '../screens/HotelServiciosScreen';
import ZoneInfoScreen from '../screens/ZoneInfoScreen';
import SocialScreen from '../screens/SocialScreen';
import SocialNavigatorScreen from './SocialNavigator';
import CommentScreen from '../screens/CommentsScreen';


export default createAppContainer(createStackNavigator({
  // You could add another route here for authentication.
  // Read more at https://reactnavigation.org/docs/en/auth-flow.html
  MainMenu:MainMenuScreen,
  Comment:CommentScreen,
  Login: LoginScreen,
  Auth: RegisterScreen,
  Contacto:ConstactoScreen,
  BedroomInfo:BedroomScreen,
  Weather:WeatherScreen,
  CloudVision: CloudVisionScreen,
  Main: MainTabNavigator,
  Config: ConfigScreen,
  Servicios: HotelServiciosScreen,
  Zone: ZoneInfoScreen,
  Social:SocialScreen,
  Socialnavigator: SocialNavigatorScreen,
}));