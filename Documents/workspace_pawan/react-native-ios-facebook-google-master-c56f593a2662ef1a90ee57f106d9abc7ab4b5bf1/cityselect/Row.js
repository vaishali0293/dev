

import React, { Component } from 'react';

import { CheckboxField, Checkbox } from 'react-native-checkbox-field';

import { View, Text, StyleSheet, Image ,TouchableHighlight,AlertIOS} from 'react-native';
// <Image source={{ uri: props.picture.large}} style={styles.photo} />
// <Text style={styles.text}>
//   {`${props.name.first} ${props.name.last}`}
// </Text>
import CheckBox from 'react-native-checkbox';

class Row extends Component {
  constructor(props) {
        super(props);

        this.state = {
            selected: false,
            fieldLabel: ''
        };

        this.selectCheckbox = this.selectCheckbox.bind(this);
    }

    selectCheckbox() {
        this.setState({
            selected: !this.state.selected
        });
    }

    render() {
        const defaultColor = '#fff';

        // Only onSelect prop is required
        return (
          <View style={styles.container}>
          <TouchableHighlight style={styles.wrapper}>

           <Text style={styles.text}>
             {this.props.City} {this.props.Region}
           </Text>

           </TouchableHighlight>

            <CheckboxField
                label={this.state.fieldLabel}
                onSelect={this.selectCheckbox}
                selected={this.state.selected}
                defaultColor={defaultColor}
                selectedColor="#247fd2"
                containerStyle={styles.containerStyle}
                labelStyle={styles.labelStyle}
                checkboxStyle={styles.checkboxStyle}
                labelSide="right">

            </CheckboxField>
              </View>
        )
    }
}

const styles = StyleSheet.create({

    container: {
      flex: 1,
      padding: 5,
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
    wrapper: {
     borderRadius: 5,
     marginBottom: 5,
   },
   button: {
      backgroundColor: '#eeeeee',
      padding: 10,
    },

    containerStyle: {
        flex: 1,
        flexDirection: 'row',
        padding: 8,
        alignItems: 'center'
    },
    labelStyle: {
        flex: 1
    },
    checkboxStyle: {
        width: 16,
        height: 16,
        borderWidth: 2,
        borderColor: '#ddd',
        borderRadius: 5
    }
});


module.exports =  Row;
