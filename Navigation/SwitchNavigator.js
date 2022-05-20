import React, { Component } from 'react';
import { StyleSheet, Text, View, Image } from 'react-native';
import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import Loading from '../Screens/Loading';
import Stack_Navigator from './StackNavigator';

var AppNavigator = createSwitchNavigator({
  LoadingScreen: Loading,
  StackNavigator: Stack_Navigator,
});

const AppContainer = createAppContainer(AppNavigator);

const SwitchNavigator = () => {
  return (
    <AppContainer />
  )
};

export default SwitchNavigator;
