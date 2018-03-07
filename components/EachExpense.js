import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
const { View, TouchableHighlight, Text } = ReactNative;

class EachExpense extends Component {
  render() {
    return (
      <TouchableHighlight>
        <View style={styles.li}>
          <Text style={styles.liText}>{this.props.item.expenseName}</Text>
          <Text style={styles.liText}>${this.props.item.expenseAmount}</Text>
        </View>
      </TouchableHighlight>
    );
  }
}

export default EachExpense;
