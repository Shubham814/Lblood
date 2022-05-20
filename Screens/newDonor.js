import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  Image,
  TouchableOpacity,
  TextInput,
  Alert,
} from 'react-native';
import Picker from '@react-native-picker/picker'
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';

import firebase from 'firebase';
import db from '../config';

let customFont = {
  amatic: require('../assets/AmaticSC-Regular.ttf'),
  oswald: require('../assets/Oswald-Regular.ttf'),
};

class New extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      location: '',
      blood_group: '',
      message: '',
      cause: '',
      request_no: 0,
      value: null,
    };
  }
  incrementValue = () => {
    var num;
    db.ref('requests').on('value', (snapshot) => {
      console.log('Snap ' + snapshot.val().request_no);
      num = snapshot.val().request_no;
      console.log('Val ' + num);
    });
    this.setState({
      value: num,
    })
    var state = this.state.value 
    db.ref('requests').set({
      request_no: state + 1
    });
  };
  makeRequest = (location, message, cause, blood_group) => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1;
    var yyyy = today.getFullYear();

    if (dd < 10) {
      dd = '0' + dd;
    }
    if (mm < 10) {
      mm = '0' + mm;
    }
    today = dd + '-' + mm + '-' + yyyy;

    let name,phoneNumber,email;
    var userId = firebase.auth().currentUser.uid;
    db.ref('/users/' + userId).on('value', (snapshot) => {
      name = snapshot.val().name,
      phoneNumber = snapshot.val().phone,
      email = snapshot.val().email
    });
    if (location && message && blood_group) {
      db.ref('donation/' + Math.random().toString(36).slice(2)).set({
        name: name,
        phone_number: phoneNumber,
        email: email,
        location: location,
        message: message,
        blood_group: blood_group,
        created_on: today,
      });
      
      this.props.navigation.navigate('Home')
      Alert.alert(
        'Donation Status',
        'Your Donation has been SUCCESSFULLY posted.'
      );
      
      this.props.navigation.navigate('Home');
    } else {
      Alert.alert(
        'Error',
        'Sorry! we cannot record your donation. Try again in a moment.'
      );
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
          <StatusBar barStyle="dark-content" />
          <Text style={styles.heading}>New Donation</Text>

          <Text style={styles.action}>Choose Blood Group you want to Donate</Text>
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

          <Text style={styles.action}>Specific Location</Text>
          <TextInput
            placeholder="Location (Lajpat Nagar, Bhiwani, Haryana)"
            placeholderTextColor="rgba(0,0,0,0.6)"
            caretHidden={false}
            style={styles.input}
            onChangeText={(val) => {
              this.setState({
                location: val,
              });
            }}
            value={this.state.location}
          />

          <Text style={styles.action}>Message</Text>
          <TextInput
            placeholder="Message (This is a donation on occasion of my new baby.)"
            placeholderTextColor="rgba(0,0,0,0.6)"
            caretHidden={false}
            style={styles.input}
            onChangeText={(val) => {
              this.setState({
                message: val,
              });
            }}
            value={this.state.message}
          />


          <TouchableOpacity
            style={styles.requestButton}
            onPress={() => {
              this.makeRequest(
                this.state.location,
                this.state.message,
                this.state.cause,
                this.state.blood_group
              );
            }}>
            <Text style={styles.requestText}>Make Donation</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  picker: {
    backgroundColor: '#ffffff',
    height: 50,
    width: 320,
    alignSelf: 'center',
    borderRadius: 10,
    textAlign: 'left',
    marginTop: -10,

    fontSize: 18,
    fontFamily: 'oswald',
    fontWeight: "500",
    paddingLeft: 10,
    color: 'black',
  },
  heading: {
    alignSelf: 'center',
    marginTop: RFValue(10),
    fontSize: 45,
    fontFamily: 'amatic',
    color: '#f2464b',
    height: 50,
    fontWeight: "500",
  },
  requestButton: {
    backgroundColor: '#f2464b',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: 320,
    height: 50,
    borderRadius: 100,
    marginTop: 50,
  },
  requestText: {
    color: 'white',
    fontSize: RFValue(35),
    fontFamily: 'amatic',
    fontWeight: "500",
  },
  action: {
    margin: 20,
    fontFamily: 'oswald',
    color: 'grey',
  },
  input: {
    backgroundColor: '#ccc',
    height: 50,
    width: 310,
    alignSelf: 'center',
    borderRadius: 5,
    textAlign: 'left',
    marginTop: -10,

    fontSize: 15,
    fontFamily: 'oswald',
    fontWeight: "500",
    paddingLeft: 10,
    color: 'black',
  },
});

export default New;
