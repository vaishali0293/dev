'use strict';
var React = require('react');
var ReactNative = require('react-native');

var {
  StyleSheet,
  Image,
  Text,
  View,
  AsyncStorage
} = ReactNative;

var {FBLogin, FBLoginManager} = require('react-native-facebook-login');

var FB_PHOTO_WIDTH = 200;

var Fb_login = React.createClass({
  getInitialState: function(){
    return {
      user: null,
    };
  },

  render: function() {
    var _this = this;
    var user = this.state.user;

    return (
      <View style={styles.loginContainer}>


        <FBLogin style={{ marginBottom: 10, }}
          permissions={["email","user_friends"]}
          onLogin={function(data){
            console.log("Logged in!");
            console.log(data);
            _this.setState({ user : data.credentials });
            try {
              AsyncStorage.setItem('login', 'fblogin');
              AsyncStorage.setItem('fbuser', JSON.stringify(data.credentials));
            } catch (error) {
              // Error saving data
              console.log('unable to store in Storage');
            }
          }}
          onLogout={function(){
            console.log("Logged out.");
            _this.setState({ user : null });
            AsyncStorage.removeItem('login', false);
            AsyncStorage.removeItem('fbuser');
            AsyncStorage.removeItem('fbuser_info');
            AsyncStorage.removeItem('fbuser_photo');
          }}
          onLoginFound={function(data){
            console.log("Existing login found.");
            console.log(data);
            _this.setState({ user : data.credentials });
          }}
          onLoginNotFound={function(){
            console.log("No user logged in.");
            _this.setState({ user : null });
          }}
          onError={function(data){
            console.log("ERROR");
            console.log(data);
          }}
          onCancel={function(){
            console.log("User cancelled.");
          }}
          onPermissionsMissing={function(data){
            console.log("Check permissions!");
            console.log(data);
          }}
        />

        <Text>{ user ? user.token : "N/A" }</Text>
      </View>
    );
  }
});

var Photo = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      photo: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.5/${user.userId}/picture?width=${FB_PHOTO_WIDTH}&redirect=false&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          photo : {
            url : responseData.data.url,
            height: responseData.data.height,
            width: responseData.data.width,
          },
        });

        try {
           AsyncStorage.setItem('fbuser_photo', JSON.stringify(responseData));
        } catch (error) {
          // Error saving data
          console.log('unable to store in Storage');
        }

      })
      .done();
  },

  render: function(){
    if(this.state.photo == null) return this.renderLoading();

    var photo = this.state.photo;

    return (
      <View style={styles.bottomBump}>

      </View>
    );
  },
  renderLoading: function(){
    return (
      <View>
        <Text>Loading...</Text>
      </View>
    );
  }
});

var Info = React.createClass({
  propTypes: {
    user: React.PropTypes.object.isRequired,
  },

  getInitialState: function(){
    return {
      info: null,
    };
  },

  componentWillMount: function(){
    var _this = this;
    var user = this.props.user;
    var api = `https://graph.facebook.com/v2.5/${user.userId}?fields=name,email&access_token=${user.token}`;

    fetch(api)
      .then((response) => response.json())
      .then((responseData) => {
        _this.setState({
          info : {
            name : responseData.name,
            email: responseData.email,
          },
        });

        try {
           AsyncStorage.setItem('fbuser_info', JSON.stringify(responseData));
        } catch (error) {
          // Error saving data
          console.log('unable to store in Storage');
        }

      })
      .done();
  },

  render: function(){
    var info = this.state.info;

    return (
      <View>

      </View>
    );
  }
});

var styles = StyleSheet.create({
  loginContainer: {
    marginTop:10
  },
  bottomBump: {

  },
});

module.exports = Fb_login;
