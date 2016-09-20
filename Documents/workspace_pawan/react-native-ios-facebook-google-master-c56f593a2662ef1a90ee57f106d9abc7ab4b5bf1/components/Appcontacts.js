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

var Contacts = require('react-native-contacts')
var Contactsview = require('../Layouts/Contactsview');

class Appcontacts extends Component{

  constructor(props){
    super(props);
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows([])
    };

    Contacts.getAll((err, contacts) => {
      if(err && err.type === 'permissionDenied'){
        console.log("error fetching Contact");
      } else {
        console.log("Contacts Details 1 - "+ JSON.stringify(contacts));
        this.setState({dataSource: ds.cloneWithRows(contacts)});
      }
    });
  }

  render(){
    return (
      <View style={styles.contactlist}>
        <ListView
            style={styles.container}
           dataSource={this.state.dataSource}
           renderRow={(data) => <Contactsview {...data} {...this.props}/>}
           contentInset={{bottom:49}}
           automaticallyAdjustContentInsets={false}
           enableEmptySections={true}
           renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
         />
      </View>
    );
  }

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',

  },
  contactlist:{
  //  height:500
  marginTop:100
},
separator: {
    flex: 1,
    height: StyleSheet.hairlineWidth,
    backgroundColor: '#8E8E8E',
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

module.exports = Appcontacts;
