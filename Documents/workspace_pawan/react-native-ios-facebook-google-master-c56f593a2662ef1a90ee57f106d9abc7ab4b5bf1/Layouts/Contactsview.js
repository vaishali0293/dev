import React, { Component } from 'react';
import { View, Text, StyleSheet, Image, TouchableHighlight, NavigatorIOS } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 12,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    marginLeft: 12,
    fontSize: 16,
  },
  photo: {
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});

var Chatui = require('./Chatui');

class Contactsview extends Component{

  constructor(props){
    super(props);
    this.dochat = this.dochat.bind(this);
  }

  dochat(){
    this.props.navigator.push({
      component: Chatui,
      title: 'Chatting',
    });
  }

  render(){
      //<Image source={{ uri: props.picture.large}} style={styles.photo} />
      //{`${props}`}
      var phonenumber = "";
      if(this.props.phoneNumbers[0].number != 'undefined'){
      var phonenumber = this.props.phoneNumbers[0].number;
      console.log(phonenumber);
    }
    return (
      <View style={styles.container}>
        <Text style={styles.text}>
          {this.props.givenName}
          ({phonenumber})

        </Text>
        <TouchableHighlight onPress={this.dochat}>
          <Text style={styles.text}>Chat</Text>
        </TouchableHighlight>
      </View>
    );
  }
}


module.exports = Contactsview;
