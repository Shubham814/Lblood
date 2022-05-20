import React, { Component } from 'react';
import { View, Text } from 'react-native';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';

import StackNavigator from './Navigation/LoginNavigator'
import Loading from './Screens/Loading';
import Home from './Screens/Home';


const switchNavigator = createSwitchNavigator({
  LoginScreen: StackNavigator,
  LoadingScreen: Loading,
  MainApp: Home
});

const AppNavigator = createAppContainer(switchNavigator);

export default class App extends Component {
  render(){
    return(
      <AppNavigator />
    )
  }
}
