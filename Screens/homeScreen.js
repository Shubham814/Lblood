import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';

import firebase from 'firebase';
import db from '../config';

let customFont = {
  amatic: require('../assets/AmaticSC-Regular.ttf'),
  oswald: require('../assets/Oswald-Regular.ttf'),
};

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
    };
  }

  async loadFonts() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    let pulse = <Image source={require('../pulse.png')} style={styles.pulse} />
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
        <View>
          <StatusBar barStyle="dark-content" />

          <View style={{  resizeMode: 'contain' }}>
            <Image source={require('../assets/logo.png')} style={styles.logo} />
            <Text style={styles.appName}>L{pulse}blood</Text>
            <Text style={styles.appDescription}>A Life Saver App</Text>
          </View>

            <View style={{ marginTop: RFValue(30) }}>
              <TouchableOpacity
                style={styles.button}
                onPress={() => {
                  this.props.navigation.navigate('Login');
                }}>
                <Text style={styles.buttonText}>Log In</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.button, { backgroundColor: 'transparent' }]}
                onPress={() => {
                  this.props.navigation.navigate('Signup');
                }}>
                <Text style={[styles.buttonText,{color: '#08a033'}]}>Sign Up</Text>
              </TouchableOpacity>
            </View>
            </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  logo: {
    width: RFValue(125),
    height: RFValue(125),
    marginTop: RFValue(175),
    alignSelf: 'center',
  },
  appName: {
    alignSelf: 'center',
    fontFamily: 'oswald',
    fontSize: RFValue(50),
    color: 'black'
  },
  appDescription: {
    alignSelf: 'center',
    fontFamily: 'oswald',    fontSize: RFValue(26),
    color: 'black'
  },
  button: {
    alignSelf: 'center',
    width: 250,
    backgroundColor: '#08a033',
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#08a033',
  },
  buttonText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: RFValue(20)
  },
  pulse:{
    width: RFValue(35),
    height: RFValue(35)
  }
});

export default Requests;
