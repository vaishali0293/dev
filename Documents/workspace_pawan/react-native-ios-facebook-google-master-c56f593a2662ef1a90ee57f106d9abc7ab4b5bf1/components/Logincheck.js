import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage
} from 'react-native';

import Dashboard from '../Layouts/Dashboard';
import Loginscreen from '../Layouts/Loginscreen';
import Profile from '../Layouts/Profile';

class Logincheck extends Component{

  constructor(props){
    super(props);
    this.state = {login: false, user: null, user_info: null, user_photo: null};
  }

  componentWillMount(){
    this.getlogindetails();
  }

  async getlogindetails(){
    var login_value = false;
     try{
        login_value = await AsyncStorage.getItem('login');
        if(login_value == "fblogin"){
            fbuser = await AsyncStorage.getItem('fbuser');
            fbuser_info = await AsyncStorage.getItem('fbuser_info');
            fbuser_photo = await AsyncStorage.getItem('fbuser_photo');
              this.setState({ user: fbuser});
              this.setState({ user_info: fbuser_info});
              this.setState({ user_photo: fbuser_photo});
        }
        console.log(login_value);
     }catch(error){
       console.log('Async storage login not found :)');
     }
     this.setState({ login: login_value});
  }

  render(){
    //<Dashboard user={this.state.user} user_info={this.state.user_info} user_photo={this.state.user_photo} />
    if(this.state.login == "fblogin"){
      return (
        <Profile {...this.props}/>
      );
    }else{
      return (
        <View style={styles.container}>
          <Loginscreen />
        </View>
      );
   }
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

module.exports = Logincheck;
