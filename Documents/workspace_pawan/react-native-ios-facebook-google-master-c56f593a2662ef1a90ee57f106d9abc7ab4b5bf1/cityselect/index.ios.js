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
  ListView,
  TouchableHighlight,
  View,
  NavigatorIOS
} from 'react-native';

import Row from './Row';
import data from './demoData';
import city1 from './city1';
import Header from './Header';
import Footer from './Footer';
class subnominelist extends Component {

  constructor() {
    super();
    const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
    this.state = {
      dataSource: ds.cloneWithRows(city1),
    };
  }
  class PropertyFinderApp extends React.Component {
  render() {
    return (
      <React.NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Property Finder',
          component: subnominelist,
        }}/>
    );
  }
}

  render() {
    return (
      <View >
    
      <ListView
      style={styles.container}
        dataSource={this.state.dataSource}

          renderSeparator={(sectionId, rowId) => <View key={rowId} style={styles.separator} />}
          // <TouchableHighlight>
                  renderRow={(data) => <Row {...data} />}
            // </TouchableHighlight>


        renderHeader={() => <Header />}
        renderFooter={() => <Footer />}

      />
      </View>
    );
  }
}
// const styles = StyleSheet.create({
//   /*
//    * Removed for brevity
//    */
//   separator: {
//     flex: 10,
//     height: StyleSheet.hairlineWidth,
//     backgroundColor: '#8E8E8E',
//   },
// });

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  separator: {

    height: 1,
    backgroundColor: '#6CBCCE',
  },
  cob: {

    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },

});

AppRegistry.registerComponent('subnominelist', () => subnominelist);
