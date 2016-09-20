/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  PropTypes
} from 'react-native';


import Logincheck from './components/Logincheck';
import Profile from './Layouts/Profile'

class project1 extends Component {
  render() {
    return (
      <NavigatorIOS
        initialRoute={{
          component: Logincheck,
          title: "Login Screen"
        }}
        style={{flex: 1}}
      />
    );
  }
}



AppRegistry.registerComponent('project1', () => project1);
