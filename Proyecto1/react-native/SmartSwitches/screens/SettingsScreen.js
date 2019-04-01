import * as React from 'react';
import {
  StyleSheet,
  Switch,
  View,
  Text,
  TouchableHighlight
} from 'react-native';

import { Constants } from 'expo';

export default class SettingsScreen extends React.Component {
  static navigationOptions = {
    title: 'Settings',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
  };

  constructor() {
    super();
    this.state = {
      switchValue: false,
    }
  }


  _onClickListener = () => {
    this.props.navigation.navigate('Login');
  }

  _onSwitchClicked = () => {
    this.setState({
      switchValue: !this.state.switchValue
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.headerText}>Notifications</Text>
        <Switch
          onValueChange={this._onSwitchClicked}
          value={this.state.switchValue} />

        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={this._onClickListener}>
          <Text style={styles.loginText}>Logout</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#2080B7',
  },
  headerText: {
    color: 'white',
    justifyContent: 'center',
    margin: 30,
    fontSize: 20,
    marginTop: 50
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 300,
    width: 250,
    borderRadius: 30,
  },
  loginButton: {
    backgroundColor: "#00b5ec",
  },
});
