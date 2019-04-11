import { createAppContainer, createStackNavigator } from 'react-navigation';
import LoginScreen from '../screens/LoginScreen';
import MainMenu from '../screens/MainMenu';
import SettingsScreen from '../screens/SettingsScreen';
import MainTabNavigator from './MainTabNavigator';
import RegisterScreen from '../screens/RegisterScreen';

export default createAppContainer(createStackNavigator({
  Login: LoginScreen,
  Main: MainMenu,
  Settings:SettingsScreen,
  Switches:MainTabNavigator,
  Register:RegisterScreen,
}));