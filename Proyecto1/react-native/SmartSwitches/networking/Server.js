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
    console.error(`Error is: ${error}`);
  }
}

async function sendSwitchSignal(switchId, signal) {
  try {
    let loginUrl = `${url}/api/v1/user?username=${username}&password=${password}`;
    let response = await fetch(loginUrl);
    let responseJson = await response.json();
    return responseJson.auth;
  } catch (error) {
    console.error(`Error is: ${error}`);
  }
}

export { login };
