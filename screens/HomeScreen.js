import React, { Component } from 'react';
import ReactNative from 'react-native';
import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableHighlight,
  TouchableOpacity,
  TextInput,
  Image,
  resizeMode
} from 'react-native';
import { SwipeRow } from 'react-native-swipe-list-view';
import ActionButton from '../components/ActionButton.js';
import EachBudget from '../components/EachBudget.js';
import ExpenseList from '../components/ExpenseList.js';
import { Swipe } from '../components/Swipe.js';
import Input from '../components/Input.js';
import EmptyContainer from '../components/EmptyContainer.js';
import LoadingSpinner from '../components/LoadingSpinner.js';
const background = require('../images/background.jpg');
const styles = require('../styles.js');

class HomeScreen extends Component {
  static navigationOptions = {
    title: 'Budget List',
    headerStyle: styles.header,
    headerTitleStyle: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
    }
  };
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      isAdding: false,
      text: '',
      budgetAmount: '',
      isEditing: false,
      isModifying: false,
      isLoading: true,
      key: null,
      isEmpty: false
    };
    this._rows = {};
    this.openRowId = null;
    this.itemsRef = this.props.screenProps.firebaseApp.firebase_
      .database()
      .ref();
  }

  listenForItems = itemsRef => {
    itemsRef.on('value', snap => {
      // get children as an array
      var items = [];
      snap.forEach(child => {
        items.push({
          budget: child.val().budget.name,
          budgetAmount: child.val().budget.amount,
          _key: child.key,
          expenses: child.val().expenses
        });
      });

      this.setState({
        data: items,
        isLoading: false,
        isEmpty: items.length === 0
      });
    });
  };

  componentDidMount() {
    this.listenForItems(this.itemsRef);
    this.checkDataEmtpy();
  }

  onRowPress = key => {
    let budget = this.state.data.find(budget => budget._key === key);
    this.props.navigation.navigate('ExpenseList', {
      data: budget,
      firebaseRef: this.itemsRef
    });
  };

  handleRowClose = item => {
    this._rows[item._key].closeRow();
    this.openRowId = null;
  };

  onRowOpen = id => {
    if (this.openRowId) {
      this._rows[this.openRowId].closeRow();
    }
    this.openRowId = id;
    this.setState({ key: id });
  };

  onRowClose = () => {
    this.openRowId = null;
  };

  onConfirmChange = key => {
    let newData = {};
    newData[key + '/budget'] = {
      name: this.state.text,
      amount: this.state.budgetAmount
    };
    this.itemsRef.update(newData);
    this.setState({ isModifying: !this.state.isModifying });
  };

  onModify = () => {
    this.setState({ isModifying: !this.state.isModifying });
  };

  updateTextAndAmount = (text, budgetAmount) => {
    this.setState({ text, budgetAmount });
  };

  checkDataEmtpy = () => {
    if (this.state.data.length === 0) {
      this.setState({ isEmpty: true });
    }
  };

  _renderItem = ({ item }) => {
    return (
      <Swipe
        itemKey={this.state.key}
        isModifying={this.state.isModifying}
        rowRef={ref => (this._rows[item._key] = ref)}
        onRowOpen={this.onRowOpen}
        itemsRef={this.itemsRef}
        item={item}
        onRowPress={this.onRowPress}
        isEachBudget={true}
        handleRowClose={this.handleRowClose}
        onModify={this.onModify}
        onRowClose={this.onRowClose}
        updateText={this.updateText}
        updateAmount={this.updateAmount}
        updateTextAndAmount={this.updateTextAndAmount}
      />
    );
  };

  _addItem = () => {
    if (this.state.isAdding && this.state.text && this.state.budgetAmount) {
      this.itemsRef.push({
        budget: {
          name: this.state.text,
          amount: this.state.budgetAmount
        }
      });
    }
    this.setState({
      text: '',
      budgetAmount: '',
      isAdding: !this.state.isAdding,
      isEmpty: false
    });
  };

  updateText = text => this.setState({ text });
  updateAmount = amount => this.setState({ budgetAmount: amount });

  _keyExtractor = item => item._key;

  render() {
    const title =
      this.state.isAdding || this.state.isModifying ? 'Confirm' : 'Add';
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
        {this.state.isLoading && <LoadingSpinner />}
        {this.state.isEmpty && !this.state.isLoading && <EmptyContainer />}
        {!this.state.isLoading &&
          !this.state.isEmpty && (
            <FlatList
              data={this.state.data}
              extraData={this.state}
              renderItem={this._renderItem}
              keyExtractor={this._keyExtractor}
            />
          )}
        {this.state.isAdding && (
          <Input
            text={this.state.text}
            amount={this.state.budgetAmount}
            updateText={this.updateText}
            updateAmount={this.updateAmount}
            placeholder1="Add new budget"
            placeholder2="Add amount"
          />
        )}
        <ActionButton
          itemKey={this.state.key}
          title={title}
          isModifying={this.state.isModifying}
          onPress={
            this.state.isModifying ? this.onConfirmChange : this._addItem
          }
        />
      </View>
    );
  }
}

export default HomeScreen;
