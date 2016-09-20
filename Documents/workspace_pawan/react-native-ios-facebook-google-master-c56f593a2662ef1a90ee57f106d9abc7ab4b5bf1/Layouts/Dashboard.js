import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TouchableHighlight,
  AsyncStorage,
  ListView
} from 'react-native';

var FBLoginManager = require('NativeModules').FBLoginManager;
var Contacts = require('react-native-contacts')
var Appcontacts = require('../components/Appcontacts');


class Dashboard extends Component{

  propTypes: {
      style: View.propTypes.style,
      onPress: React.PropTypes.func,
      onLogin: React.PropTypes.func,
      onLogout: React.PropTypes.func,
    }

  constructor(props){
    super(props);
    this.state = {user: null}
    this.handleLogout = this.handleLogout.bind(this);
  }

  handleLogout(){
    console.log("This is handle Logout Function.");
      var _this = this;
      FBLoginManager.logout(function(error, data){
        if (!error) {
          console.log("No error Occured");
          _this.setState({ user : null});
          _this.props.onLogout && _this.props.onLogout();

          AsyncStorage.removeItem('login', false);
          AsyncStorage.removeItem('fbuser');
          AsyncStorage.removeItem('fbuser_info');
          AsyncStorage.removeItem('fbuser_photo');

        } else {
          console.log(error, data);
        }
      });
    }

  render(){


    var user = JSON.parse(this.props.user);
    var user_info = JSON.parse(this.props.user_info);
    var photo = JSON.parse(this.props.user_photo);
    console.log(photo.data);
    return (
      <View >
        <Appcontacts {...this.props}/>
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

module.exports = Dashboard;
