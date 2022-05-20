import React, { Component } from 'react';
import { View, Text } from 'react-native';
import StackNavigator from '../Navigation/StackNavigator';
import { NavigationContainer } from '@react-navigation/native';

class Requests extends Component {
  render() {
    return (
      <NavigationContainer>
        <StackNavigator />
      </NavigationContainer>
    );
  }
}

export default Requests;
