import React from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  NativeModules
} from 'react-native';

import {GiftedChat, Actions, Bubble} from 'react-native-gifted-chat';
import CustomActions from '../components/CustomActions';
import CustomView from '../components/CustomView';

const Firebase = require('firebase');
var ReadImageData = require('NativeModules').ReadImageData;

class Chatui extends React.Component {
  constructor(props) {
    super(props);
    // Initialize Firebase
    var config = {
    apiKey: "AIzaSyAfr2xVHBZDSK3x47pqP3lukrlOFr8r248",
    authDomain: "subnominee.firebaseapp.com",
    databaseURL: "https://subnominee.firebaseio.com",
    storageBucket: "subnominee.appspot.com",
    };
    Firebase.initializeApp(config);

    this._databaseRef = Firebase.database().ref();


    this.state = {
      messages: [],
      loadEarlier: true,
      typingText: null,
      isLoadingEarlier: false,
    };

    this._isMounted = false;
    this.onSend = this.onSend.bind(this);
    this.onReceive = this.onReceive.bind(this);
    this.renderCustomActions = this.renderCustomActions.bind(this);
    this.renderBubble = this.renderBubble.bind(this);
    this.renderFooter = this.renderFooter.bind(this);
    this.onLoadEarlier = this.onLoadEarlier.bind(this);

    this._isAlright = null;




  }

  componentWillMount() {
    this._isMounted = true;
    this.onSend([{
      _id: Math.round(Math.random() * 1000000),
      text:"hi",
      createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
      user: {
        _id: 1,
        name: 'Developer',
      }
    }]);
    // this.setState(() => {
    //   return {
    //     messages: require('./data/messages.js'),
    //   };
    // });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  onLoadEarlier() {
    this.setState((previousState) => {
      return {
        isLoadingEarlier: true,
      };
    });

    setTimeout(() => {
      if (this._isMounted === true) {
        this.setState((previousState) => {
          return {
            messages: GiftedChat.prepend(previousState.messages, require('../data/old_messages.js')),
            loadEarlier: false,
            isLoadingEarlier: false,
          };
        });
      }
    }, 1000); // simulating network
  }

  onSend(messages = []) {
    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, messages),
      };
    });


    // if Text is sent
        if (messages[0].hasOwnProperty('text')) {
          this._databaseRef.push({
            _id: Math.round(Math.random() * 1000000),
            text: messages[0].text,
            createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
            user: {
              _id: 1,
              name: 'Developer',
            }
          })
        }else{
          //var mountainsRef = this._storageRef.child('mountains.jpg');
          var file = (messages[0].image); // use the Blob or File API
          console.log(file);
          ReadImageData.readImage(file, (imageBase64) => {
            var image =  "data:image/png;base64,"+imageBase64;
            this._databaseRef.push({
              _id: Math.round(Math.random() * 1000000),
              image: image,
              createdAt: new Date(Date.UTC(2016, 7, 30, 17, 20, 0)),
              user: {
                _id: 1,
                name: 'Developer',
              }
            })
          });
          console.log('Message is not a text message');
        }

    // for demo purpose
    this.answerDemo(messages);
  }

  answerDemo(messages) {
    if (messages.length > 0) {
      if ((messages[0].image || messages[0].location) || !this._isAlright) {
        this.setState((previousState) => {
          return {
            typingText: 'React Native is typing'
          };
        });
      }
    }

    setTimeout(() => {
      if (this._isMounted === true) {
        if (messages.length > 0) {
          if (messages[0].image) {
            this.onReceive('Nice picture!');
          } else if (messages[0].location) {
            this.onReceive('My favorite place');
          } else {
            if (!this._isAlright) {
              this._isAlright = true;
              this.onReceive('Alright');
            }
          }
        }
      }

      this.setState((previousState) => {
        return {
          typingText: null,
        };
      });
    }, 1000);
  }

  onReceive(text) {
    this._databaseRef.on('child_added', (child) => {
      this.setState((previousState) => {
        console.log(child.val());
          if (child.val().text) {
            return {
            messages: GiftedChat.append(previousState.messages, {
              _id: Math.round(Math.random() * 1000000),
              text: child.val().text,
              createdAt: new Date(),
              user: child.val().user,
            }),
        }
        }else{
          return {
          messages: GiftedChat.append(previousState.messages, {
            _id: Math.round(Math.random() * 1000000),
            image: child.val().image,
            createdAt: new Date(),
            user: child.val().user,
          }),
        };
        }
      });
    });
  }

  renderCustomActions(props) {
    if (Platform.OS === 'ios') {
      return (
        <CustomActions
          {...props}
        />
      );
    }
    const options = {
      'Action 1': (props) => {
        alert('option 1');
      },
      'Action 2': (props) => {
        alert('option 2');
      },
      'Cancel': () => {},
    };
    return (
      <Actions
        {...props}
        options={options}
      />
    );
  }

  renderBubble(props) {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#f0f0f0',
          }
        }}
      />
    );
  }

  renderCustomView(props) {
    return (
      <CustomView
        {...props}
      />
    );
  }

  renderFooter(props) {
    if (this.state.typingText) {
      return (
        <View style={styles.footerContainer}>
          <Text style={styles.footerText}>
            {this.state.typingText}
          </Text>
        </View>
      );
    }
    return null;
  }

  render() {
    return (
      <GiftedChat
        messages={this.state.messages}
        onSend={this.onSend}
        loadEarlier={this.state.loadEarlier}
        onLoadEarlier={this.onLoadEarlier}
        isLoadingEarlier={this.state.isLoadingEarlier}

        user={{
          _id: 1, // sent messages should have same user._id
        }}

        renderActions={this.renderCustomActions}
        renderBubble={this.renderBubble}
        renderCustomView={this.renderCustomView}
        renderFooter={this.renderFooter}
      />
    );
  }
}

const styles = StyleSheet.create({
  footerContainer: {
    marginTop: 5,
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 10,
  },
  footerText: {
    fontSize: 14,
    color: '#aaa',
  },
});

module.exports = Chatui;
