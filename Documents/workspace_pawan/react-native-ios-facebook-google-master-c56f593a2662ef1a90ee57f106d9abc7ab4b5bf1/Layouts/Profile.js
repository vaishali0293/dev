import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  AsyncStorage,
  Image,
  TouchableHighlight,
  NavigatorIOS
} from 'react-native';

import Dashboard from '../Layouts/Dashboard';

class Profile extends Component{

  propTypes: {
      style: View.propTypes.style,
      onPress: React.PropTypes.func,
      onLogin: React.PropTypes.func,
      onLogout: React.PropTypes.func
    }

  constructor(props,context){
    super(props, context);
    this.state = {login: false, user: null, user_info: null, user_photo: null};
    this.getlogindetails = this.getlogindetails.bind(this);
    this.handleLogout = this.handleLogout.bind(this);
    //console.log(this.props);
  }

  componentWillMount(){
    this.getlogindetails();
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

  _handleNextPress(nextRoute) {
    var _that = this;
    console.log(_that.props)
    this.props.navigator.push(nextRoute);
  }

  render(){

    const nextRoute = {
          component: Dashboard,
          title: 'Dashboard',
          passProps: { user:this.state.user, user_info:this.state.user_info, user_photo:this.state.user_photo }
        };

    if(this.state.login != false){
      var user = JSON.parse(this.state.user);
      var user_info = JSON.parse(this.state.user_info);
      var photo = JSON.parse(this.state.user_photo);
      return (
        <View style={styles.container}>
          <Text>User - ID {user.userId}</Text>
          <View style={styles.bottomBump}>
            <Image
              style={{
                  height: photo.data.height,
                  width: photo.data.width,
                }
              }
              source={{uri: photo.data.url}}
            />
          </View>
          <View style={styles.bottomBump}>
             <Text>{ user_info.name }</Text>
             <Text>{ user_info.email }</Text>
          </View>

          <TouchableHighlight onPress={() => this._handleNextPress(nextRoute)}>
            <Text style={{marginTop: 10, alignSelf: 'center'}}>
              save
            </Text>
          </TouchableHighlight>

          <TouchableHighlight style={{marginTop:100}} onPress={this.handleLogout}>
              <Text>Logout</Text>
          </TouchableHighlight>
        </View>
      );
    }else{
      return (
        <View style={styles.container}>
          <Text>Hasdi</Text>
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

module.exports = Profile;
