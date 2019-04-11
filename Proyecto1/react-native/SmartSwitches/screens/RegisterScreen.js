import React, { Component } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  Button,
  TouchableHighlight,
  Image,
  Alert
} from 'react-native';

import { signUp } from '../networking/Server'

export default class RegisterPage extends Component {

  static navigationOptions = {
    title: "Sign Up",
  };

  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
    }
  }
  _handleUsernameChange = (event) => {
    this.setState({
      username: event.nativeEvent.text
    })
  }

  _handlePasswordChange = (event) => {
    this.setState({
      password: event.nativeEvent.text
    })
  }

  _onClickListener = () => {
    signUp(this.state.username, this.state.password).then((result) => {
      if (result == false) {
        Alert.alert("Alert", "User already exist");
      } else if (result == true) {
        this.setState = ({
          username: '',
          password: ''
        })
        Alert.alert("Alert", "User created! :)")
      } else {
        Alert.alert("Error", "Server Communication Error");
      }
    })
    //Alert.alert("Alert", "Button pressed " + viewId);
  }

  render() {
    return (
      <View style={styles.container}>

        <Text style={styles.headerText}>Create Account</Text>
        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/male-user/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Username"
            keyboardType="email-address"
            underlineColorAndroid='transparent'
            value={this.state.username}
            onChange={this._handleUsernameChange} />
        </View>

        <View style={styles.inputContainer}>
          <Image style={styles.inputIcon} source={{ uri: 'https://png.icons8.com/key-2/ultraviolet/50/3498db' }} />
          <TextInput style={styles.inputs}
            placeholder="Password"
            secureTextEntry={true}
            underlineColorAndroid='transparent'
            value={this.state.password}
            onChange={this._handlePasswordChange} />
        </View>

        <TouchableHighlight style={[styles.buttonContainer, styles.signupButton]} onPress={this._onClickListener}>
          <Text style={styles.signUpText}>Sign up</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2080B7',
  },
  inputContainer: {
    borderBottomColor: '#F5FCFF',
    backgroundColor: '#FFFFFF',
    borderRadius: 30,
    borderBottomWidth: 1,
    width: 250,
    height: 45,
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },
  inputs: {
    height: 45,
    marginLeft: 16,
    borderBottomColor: '#FFFFFF',
    flex: 1,
  },
  inputIcon: {
    width: 30,
    height: 30,
    marginLeft: 15,
    justifyContent: 'center'
  },
  buttonContainer: {
    height: 45,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    width: 250,
    borderRadius: 30,
  },
  signupButton: {
    backgroundColor: "#00b5ec",
  },
  signUpText: {
    color: 'white',
  },
  headerText: {
    color: 'white',
    justifyContent: 'center',
    margin: 30,
    fontSize: 30,
},
});