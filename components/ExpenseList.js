import React, { Component } from 'react';
import ReactNative from 'react-native';
import { View, Text, FlatList, Image, resizeMode } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import ActionButton from './ActionButton.js';
import { Swipe } from './Swipe.js';
import Input from './Input.js';
import { Footer } from './Footer.js';
const styles = require('../styles.js');
const background = require('../images/background.jpg');

class ExpenseList extends Component {
  static navigationOptions = {
    title: 'Expenses',
    headerStyle: styles.header,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
    },
    headerTintColor: 'white'
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      expenseText: '',
      expenseAmount: '',
      isAddingExpense: false,
      isModifying: false,
      expenseKey: null
    };
    this._rows = {};
    this.openRowId = null;
    this.itemsRef = this.props.screenProps.firebaseApp.firebase_
      .database()
      .ref();
  }

  componentDidMount() {
    this.listenForItems(this.itemsRef);
  }

  listenForItems = itemsRef => {
    itemsRef
      .child(this.props.navigation.state.params.data._key)
      .child('expenses')
      .on('value', snap => {
        // get children as an array
        let expenses = [];
        snap.forEach(child => {
          expenses.push({
            key: child.key,
            expenseName: child.val().expenseName,
            expenseAmount: child.val().expenseAmount
          });
          this.setState({
            data: expenses
          });
        });
      });
  };

  _keyExtractor = item => item.key;

  onExpenseDeletePress = item => {
    this._rows[item.key].closeRow();
    this.openRowId = null;
    this.itemsRef
      .child(this.props.navigation.state.params.data._key)
      .child('expenses')
      .child(item.key)
      .remove();
  };

  onRowOpen = id => {
    if (this.openRowId) {
      this._rows[this.openRowId].closeRow();
    }
    this.openRowId = id;
    this.setState({ expenseKey: id });
  };

  onRowClose = () => {
    this.openRowId = null;
  };

  handleRowClose = item => {
    this._rows[item.key].closeRow();
    this.openRowId = null;
  };

  onModify = () => {
    this.setState({ isModifying: !this.state.isModifying });
  };

  onConfirmChange = (budgetKey, expenseKey) => {
    let newData = {};
    newData[budgetKey + '/expenses/' + expenseKey] = {
      expenseAmount: this.state.expenseAmount,
      expenseName: this.state.expenseText
    };
    this.itemsRef.update(newData);
    this.setState({ isModifying: !this.state.isModifying, expenseKey: null });
  };

  updateTextAndAmount = (text, amount) => {
    this.setState({ expenseText: text, expenseAmount: amount });
  };

  _renderItem = ({ item }) => {
    return (
      <Swipe
        rowRef={ref => (this._rows[item.key] = ref)}
        item={item}
        onExpenseDeletePress={this.onExpenseDeletePress}
        onExpenseEditPress={this.onExpenseEditPress}
        onRowOpen={this.onRowOpen}
        onDeletePress={this.onDeletePress}
        isEachExpense={true}
        handleRowClose={this.handleRowClose}
        onRowClose={this.onRowClose}
        onModify={this.onModify}
        isModifying={this.state.isModifying}
        updateTextAndAmount={this.updateTextAndAmount}
        updateAmount={this.updateAmount}
        updateText={this.updateText}
      />
    );
  };

  totalExp = data => {
    const arrOfExpense = data.map(eachExpense =>
      Number(eachExpense.expenseAmount)
    );
    return arrOfExpense.reduce((acc, curr) => {
      return acc + curr;
    }, 0);
  };

  _renderFooter = () => {
    return (
      <Footer
        totalExp={this.totalExp}
        data={this.state.data}
        budget={this.props.navigation.state.params.data.budgetAmount}
      />
    );
  };

  _addItem = () => {
    if (
      this.state.isAddingExpense &&
      this.state.expenseText &&
      this.state.expenseAmount
    ) {
      this.props.navigation.state.params.firebaseRef
        .child(this.props.navigation.state.params.data._key)
        .child('expenses')
        .push({
          expenseName: this.state.expenseText,
          expenseAmount: this.state.expenseAmount
        });
    }
    this.setState({
      expenseText: '',
      expenseAmount: '',
      isAddingExpense: !this.state.isAddingExpense
    });
  };

  updateText = text => this.setState({ expenseText: text });
  updateAmount = amount => this.setState({ expenseAmount: amount });

  render() {
    const title =
      this.state.isAddingExpense || this.state.isModifying ? 'Confirm' : 'Add';
    return (
      <View style={styles.container}>
        <Image
          style={{
            backgroundColor: '#ccc',
            flex: 1,
            resizeMode,
            position: 'absolute',
            width: '100%',
            height: '100%',
            justifyContent: 'center'
          }}
          source={background}
        />
        <View
          style={{
            height: 52,
            display: 'flex',
            justifyContent: 'space-between',
            flexDirection: 'row'
          }}
        >
          <View
            style={{
              height: 52,
              width: '100%',
              display: 'flex',
              justifyContent: 'space-between',
              flexDirection: 'row',
              paddingLeft: 10,
              paddingTop: 16,
              paddingRight: 0,
              backgroundColor: '#eee'
            }}
          >
            <Text style={styles.liText}>
              {this.props.navigation.state.params.data.budget}
            </Text>
            <Text style={styles.liText}>
              ${this.props.navigation.state.params.data.budgetAmount}
            </Text>
          </View>
        </View>
        <FlatList
          data={this.state.data}
          extraData={this.state}
          renderItem={this._renderItem}
          keyExtractor={this._keyExtractor}
          ListFooterComponent={this._renderFooter}
        />
        {this.state.isAddingExpense && (
          <Input
            text={this.state.expenseText}
            amount={this.state.expenseAmount}
            updateText={this.updateText}
            updateAmount={this.updateAmount}
            placeholder1="Add new expense"
            placeholder2="Add amount"
          />
        )}
        <ActionButton
          title={title}
          onPress={
            this.state.isModifying ? this.onConfirmChange : this._addItem
          }
          isModifying={this.state.isModifying}
          expenseKey={this.state.expenseKey}
          itemKey={this.props.navigation.state.params.data._key}
        />
      </View>
    );
  }
}

export default ExpenseList;
