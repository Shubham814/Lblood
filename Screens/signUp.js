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
  Platform,
  Picker
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
  addData = async (name, email, password, phone) => {
    if (
      this.state.name &&
      this.state.email &&
      this.state.password &&
      this.state.phone &&
      this.state.blood_group != ''
    ) {
      this.logIn(email, password);
      let userId = firebase.auth().currentUser.uid;
      db.ref('users/' + userId).set({
        name: name,
        email: email,
        password: password,
        phone: phone,
        blood_group: this.state.blood_group,
      });
      this.props.navigation.navigate('Login');
    } else {
      Alert.alert('Error', 'Please Fill all the details');
    }

    /* console.log("Add Data")
    let name = this.state.name
    console.log(name + " " + email);
    db.collection('people')
    .doc('Mv779IpOoWTrtz5x2FK6').
    update({
    name: name,
    email: email
})
console.log("added")

    this.props.navigation.navigate('LoadingScreen')
     firebase
      .auth()
      .fetchSignInMethodsForEmail(email)
      .then((result) => {
        console.log('result', result);
      })
      .catch((error) => {
        // Handle Errors here.
      }); */
  };
  logIn = (email, password) => {
    firebase
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredential) => {
        // Signed in
        var user = userCredential.user;
        Alert.alert(
          'Congralutations',
          'You Registered your account Succesfully. Now Login to your account.'
        );
      })
      .catch((error) => {
        var errorCode = error.code;
        var errorMessage = error.message;
        Alert.alert('Error', errorCode, errorMessage);
        // ..
      });
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
          <KeyboardAvoidingView
            style={[styles.container]}
            behavior={Platform.OS === "ios" ? "padding":"height"}
            enabled>
            <StatusBar barStyle="dark-content" />


            <View style={{marginTop: 75}}></View>

            <View style={{flex: 0.8}}>
            {/* Text Inputs */}

            <TextInput
              placeholder="Username"
              placeholderTextColor="rgba(0,0,0,0.6)"
              caretHidden={false}
              autoCapitalize={false}
              autoCorrect={false}
              autoFocus={true}
              maxLength={35}
              style={styles.input}
              onChangeText={(val) => {
                this.setState({
                  name: val,
                });
              }}
              value={this.state.name}
            />

            <TextInput
              placeholder="Email"
              placeholderTextColor="rgba(0,0,0,0.6)"
              caretHidden={false}
              autoCapitalize={false}
              autoCorrect={false}
              maxLength={50}
              style={styles.input}
              keyboardType="email-address"
              onChangeText={(val) => {
                this.setState({
                  email: val,
                });
              }}
              value={this.state.email}
            />

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

            <TextInput
              placeholder="Phone Number"
              placeholderTextColor="rgba(0,0,0,0.6)"
              caretHidden={false}
              autoCapitalize={false}
              autoCorrect={false}
              maxLength={10}
              keyboardType="number-pad"
              style={styles.input}
              onChangeText={(val) => {
                this.setState({
                  phone: val,
                });
              }}
              value={this.state.phone}
            />

            <Picker
              selectedValue={this.state.blood_group}
              style={styles.picker}
              onValueChange={(itemValue, itemIndex) =>
                this.setState({ blood_group: itemValue })
              }>
              <Picker.Item label="Blood Group" value="" />
              <Picker.Item label="A+" value="A+" />
              <Picker.Item label="A-" value="A-" />
              <Picker.Item label="B+" value="B+" />
              <Picker.Item label="B-" value="B-" />
              <Picker.Item label="AB+" value="AB+" />
              <Picker.Item label="AB-" value="AB-" />
              <Picker.Item label="O+" value="O+" />
              <Picker.Item label="O-" value="O-" />
            </Picker>
            </View>

            <View style={{flex: 0.2}}>
            <TouchableOpacity
              style={styles.loginButton}
              onPress={() => {
                this.addData(
                  this.state.name,
                  this.state.email,
                  this.state.password,
                  this.state.phone
                );
              }}>
              <Text style={styles.loginText}>Sign Up </Text>
            </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
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
    height: 50,
    borderRadius: 100,
    marginTop: 50,
  },
  loginText: {
    color: 'white',
    fontSize: 30,
    fontFamily: 'amatic',
    fontWeight: "500",
  },
  picker: {
    width: 320,
    height: 50,
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
    borderColor: 'black',
    marginTop: 25,
    fontSize: 18,
    fontFamily: 'oswald',
    fontWeight: "500",
    paddingLeft: 10,
    color: 'black',
  }
});

export default LoginScreen;
