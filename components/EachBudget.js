import React, { Component } from 'react';
import ReactNative from 'react-native';
const styles = require('../styles.js');
import { View, TouchableHighlight, Text } from 'react-native';

class EachBudget extends Component {
  render() {
    const key = this.props.item._key;
    return (
      <View>
        <TouchableHighlight onPress={() => this.props.onPress(key)}>
          <View style={styles.li}>
            <Text style={styles.liText}>{this.props.item.budget}</Text>
            <Text style={styles.liText}>${this.props.item.budgetAmount}</Text>
          </View>
        </TouchableHighlight>
      </View>
    );
  }
}

export default EachBudget;
