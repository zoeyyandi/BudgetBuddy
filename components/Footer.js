import React from 'react';
import ReactNative from 'react-native';
import { View, Text } from 'react-native';
const styles = require('../styles.js');

export const Footer = ({ totalExp, data, budget }) => {
  return (
    <View
      style={{
        height: 103,
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#eee'
      }}
    >
      <View
        style={{
          height: 51.5,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: 10,
          paddingTop: 12,
          paddingRight: 0,
          borderWidth: 1,
          borderColor: 'white',
          borderTopWidth: 0
        }}
      >
        <Text style={styles.liText}>Total Expenses</Text>
        <Text style={styles.liText}>${totalExp(data).toFixed(2)}</Text>
      </View>
      <View
        style={{
          height: 51.5,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          paddingLeft: 10,
          paddingRight: 0,
          paddingTop: 12,
          borderWidth: 1,
          borderColor: 'white',
          borderBottomWidth: 0
        }}
      >
        <Text style={styles.liText}>Balance</Text>
        <Text style={styles.liText}>
          ${(Number(budget) - totalExp(data)).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};
