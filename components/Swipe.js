import React, { Component } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import EachBudget from './EachBudget.js';
import EachExpense from './EachExpense.js';
import { SwipeButton } from './SwipeButton.js';
import Input from './Input.js';

export class Swipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditing: false,
      text: this.props.isEachExpense
        ? this.props.item.expenseName
        : this.props.item.budget,
      amount: this.props.isEachExpense
        ? this.props.item.expenseAmount
        : this.props.item.budgetAmount
    };
  }

  onEditPress = item => {
    this.props.handleRowClose(item);
    this.props.onModify();
    this.props.updateTextAndAmount(this.state.text, this.state.amount);
    this.setState({ isEditing: !this.state.isEditing });
  };

  onDeletePress = item => {
    this.props.handleRowClose(item);
    this.props.itemsRef.child(item._key).remove();
  };

  handleTextChange = text => {
    this.props.updateText(text);
    this.setState({ text });
  };

  updateAmount = amount => {
    this.props.updateAmount(amount);
    this.setState({ amount });
  };

  componentWillReceiveProps(nextProps) {
    if (
      this.props.isModifying !== nextProps.isModifying &&
      !nextProps.isModifying
    ) {
      this.setState({ isEditing: false });
    }
  }

  render() {
    const {
      item,
      onRowPress,
      isEachBudget,
      isEachExpense,
      rowRef,
      onRowOpen
    } = this.props;
    const { isEditing } = this.state;
    return (
      <SwipeRow
        ref={rowRef}
        rightOpenValue={-120}
        disableRightSwipe
        onRowOpen={() => {
          item._key ? onRowOpen(item._key) : onRowOpen(item.key);
        }}
        onRowClose={this.props.onRowClose}
      >
        <View
          style={{
            flex: 1,
            flexDirection: 'row',
            justifyContent: 'flex-end',
            alignItems: 'center'
          }}
        >
          <SwipeButton
            labelText="Edit"
            color="#22ddd3"
            item={item}
            onButtonPress={this.onEditPress}
          />
          <SwipeButton
            labelText="Delete"
            onButtonPress={
              this.props.onExpenseDeletePress
                ? this.props.onExpenseDeletePress
                : this.onDeletePress
            }
            color="#22ddd3"
            item={item}
          />
        </View>
        <View>
          {isEditing && (
            <Input
              updateText={this.handleTextChange}
              updateAmount={this.updateAmount}
              text={this.state.text}
              amount={this.state.amount}
              placeholder1={isEachExpense ? item.expenseName : item.budget}
              placeholder2={
                isEachExpense ? item.expenseAmount : item.budgetAmount
              }
            />
          )}
          {!isEditing &&
            isEachBudget && <EachBudget item={item} onPress={onRowPress} />}
          {!isEditing && isEachExpense && <EachExpense item={item} />}
        </View>
      </SwipeRow>
    );
  }
}
