import React, { Component } from 'react';
import { StackNavigator } from 'react-navigation';
import * as firebase from 'firebase';
import HomeScreen from './screens/HomeScreen';
import ExpenseList from './components/ExpenseList';

const firebaseConfig = {
  apiKey: 'AIzaSyDaOGMpYzYR9wrYNm9_-UdPVv6ILF2gpm4',
  authDomain: 'expensetracker-6d944.firebaseapp.com',
  databaseURL: 'https://expensetracker-6d944.firebaseio.com',
  storageBucket: ''
};
const firebaseApp = firebase.initializeApp(firebaseConfig);

class App extends Component {
  render() {
    return <RootNavigation screenProps={{ firebaseApp }} />;
  }
}

const RootNavigation = StackNavigator({
  Home: { screen: HomeScreen },
  ExpenseList: { screen: ExpenseList }
});

export default App;
