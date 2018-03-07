import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
const constants = styles.constants;
const { StyleSheet, Text, View, TouchableHighlight } = ReactNative;

class ActionButton extends Component {
  handleOnPress = () => {
    const { expenseKey, isModifying, itemKey, onPress } = this.props;
    if (expenseKey) {
      if (isModifying) {
        onPress(itemKey, expenseKey);
      } else {
        onPress();
      }
    } else {
      if (isModifying) {
        onPress(itemKey);
      } else {
        onPress();
      }
    }
  };

  render() {
    return (
      <View style={styles.action}>
        <TouchableHighlight
          underlayColor={constants.actionColor}
          onPress={this.handleOnPress}
        >
          <Text style={styles.actionText}>{this.props.title}</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

module.exports = ActionButton;
