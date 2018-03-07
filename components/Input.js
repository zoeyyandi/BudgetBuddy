import React, { Component } from 'react';
import { View, TextInput } from 'react-native';

class Input extends Component {
  handleTextChange = text => {
    this.props.updateText(text);
  };

  handleAmountChange = text => {
    let amount = parseFloat(text);
    if (amount || text === '') {
      this.props.updateAmount(text);
    }
  };

  render() {
    return (
      <View
        style={{
          height: 52,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row'
        }}
      >
        <TextInput
          placeholder={this.props.placeholder1}
          onChangeText={this.handleTextChange}
          value={this.props.text}
          style={{
            width: '65%',
            height: 51.3,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            paddingLeft: 4
          }}
        />
        <TextInput
          placeholder={this.props.placeholder2}
          onChangeText={this.handleAmountChange}
          value={this.props.amount}
          style={{
            width: '35%',
            height: 51.3,
            backgroundColor: 'white',
            borderColor: 'gray',
            borderWidth: 1,
            borderLeftWidth: 0,
            paddingLeft: 4
          }}
        />
      </View>
    );
  }
}

export default Input;
