import React, { Component } from 'react';
import { ActivityIndicator, View } from 'react-native';

class LoadingSpinner extends Component {
  render() {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: 'center'
        }}
      >
        <ActivityIndicator size="large" color="#ffa300" />
      </View>
    );
  }
}

export default LoadingSpinner;
