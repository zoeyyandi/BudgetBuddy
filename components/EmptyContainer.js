import React, { Component } from 'react';
import { Text, View } from 'react-native';

class EmptyContainer extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <Text
          style={{
            alignSelf: 'center',
            padding: 10
          }}
        >
          Please add your first budget to start...
        </Text>
      </View>
    );
  }
}

export default EmptyContainer;
