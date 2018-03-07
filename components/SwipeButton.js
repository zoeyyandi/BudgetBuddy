import React from 'react';
import ReactNative from 'react-native';
import { TouchableOpacity, Text } from 'react-native';
const styles = require('../styles.js');

export const SwipeButton = ({ labelText, onButtonPress, color, item }) => {
  return (
    <TouchableOpacity
      style={{
        justifyContent: 'center',
        alignItems: 'center',
        width: 60,
        height: '100%',
        backgroundColor: color,
        borderWidth: 0.5,
        borderColor: 'white'
      }}
      onPress={() => {
        onButtonPress(item);
      }}
    >
      <Text style={{ color: 'white' }}>{labelText}</Text>
    </TouchableOpacity>
  );
};
