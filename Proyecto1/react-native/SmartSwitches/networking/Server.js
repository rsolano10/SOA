import React, { Component } from 'react';

import { AppRegistry, Alert, Platform } from 'react-native';

const url = 'http://192.168.1.3:3000';

async function login(username, password) {
  try {
    let loginUrl = `${url}/api/v1/user?username=${username}&password=${password}`;
    let response = await fetch(loginUrl);
    let responseJson = await response.json();
    return responseJson.auth;
  } catch (error) {
    Alert.alert("Error", "Server Communication Error");
    console.error(`Error is: ${error}`);
  }
}

async function sendSwitchSignal(signal) {
  try {
    let signalUrl = `${url}/api/v1/arduino/`;
    let data={
      action:signal
    }
    let response = await fetch(signalUrl,{
      method:'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type':'application/json'
      })
    })
    let responseJson = await response.json()
    console.log(`RESPUESTA: ${responseJson.status}`)
    return responseJson.status
  } catch (error) {
    Alert.alert("Error", "Server Communication Error");
    console.error(`Error is: ${error}`);
  }
}

async function signUp(username, password) {
  try {
    let signupUrl = `${url}/api/v1/user/`;
    let data={
      username:username,
      password:password
    }
    let response = await fetch(signupUrl,{
      method:'POST',
      body: JSON.stringify(data),
      headers: new Headers({
        'Content-Type':'application/json'
      })
    })
    let responseJson = await response.json()
    return responseJson.posted
  } catch (error) {
    Alert.alert("Error", "Server Communication Error");
    console.error(`Error is: ${error}`);
  }
}

export { login, sendSwitchSignal, signUp };
