

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native';

import Googlelogin from '../components/Googlelogin';
import Fb_login from '../components/Fb_login';

class Loginscreen extends Component{

  render(){
    return (
      <View style={styles.container}>
        <Googlelogin />
        <Fb_login />
      </View>
    );
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  text:{
    marginTop: 100,
    color: '#333333',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

module.exports = Loginscreen;
