import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TextInput,
  KeyboardAvoidingView,
  TouchableOpacity,
  ImageBackground,
  Alert,
  Picker,
  Platform,
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

class LoginScreen extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      name: '',
      email: '',
      password: '',
      phone: null,
      blood_group: '',
    };
  }
  logIn = async (email, password) => {
    if (email && password) {
      try {
        const response = await firebase
          .auth()
          .signInWithEmailAndPassword(email, password);
          
          this.props.navigation.navigate('SwitchNavigator', {screen: 'LoadingScreen'});
      } catch (error) {
        switch (error.code) {
          case 'auth/user-not-found':
            alert('User Do not exist.');
            break;
          case 'auth/invalid-email':
            alert('Incorrect Email Address');
            break;
          case '':
            alert();
            break;
          default:
            break;
        }
      }
    } else {
      alert('Enter Email and Password.');
    }
  };

  async loadFonts() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
            <View>
                <StatusBar barStyle="dark-content" />

                {/* Text Inputs */}

                <View style={{ marginTop: 300, flex: 0.8 }}>
                  <TextInput
                    placeholder="Email"
                    placeholderTextColor="rgba(0,0,0,0.6)"
                    caretHidden ={false}
                    maxLength={50}
                    autoCapitalize={false}
                    autoCorrect={false}
                    autoFocus={true}
                    style={styles.input}
                    keyboardType="email-address"
                    onChangeText={(val) => {
                      this.setState({
                        email: val,
                      });
                    }}
                    value={this.state.email}
                  />

                  <View style={{marginTop: 25}}></View>

                  <TextInput
                    placeholder="Password"
                    placeholderTextColor="rgba(0,0,0,0.6)"
                    caretHidden={false}
                    autoCapitalize={false}
                    autoCorrect={false}
                    maxLength={35}
                    style={styles.input}
                    secureTextEntry={true}
                    onChangeText={(val) => {
                      this.setState({
                        password: val,
                      });
                    }}
                    value={this.state.password}
                  />
                </View>

                <View style={{  }}>
                  <TouchableOpacity
                    style={styles.loginButton}
                    onPress={() => {
                      this.logIn(this.state.email, this.state.password);
                    }}>
                    <Text style={styles.loginText}>Login</Text>
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
    backgroundColor: '#FFF3F3'
  },
  input: {
    backgroundColor: '#ccc',
    height: 50,
    width: 320,
    alignSelf: 'center',
    borderRadius: 50,
    textAlign: 'left',
    marginTop: 25,

    fontSize: 18,
    fontFamily: 'oswald',
    fontWeight: "500",
    paddingLeft: 10,
    color: 'black',
  },
  loginButton: {
    backgroundColor: '#f2464b',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 150,
    height: 55,
    borderRadius: 100,
    marginTop: 300,
  },
  loginText: {
    color: 'white',
    fontSize: 40,
    fontFamily: 'oswald',
    fontWeight: "500",
  },
});

export default LoginScreen;
