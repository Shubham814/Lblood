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
  Linking,
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

class Requester extends Component {
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
    var data = this.props.route.params.details;
    console.log(data);
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />
          <Text style={styles.name}>{data.name}</Text>

          <Text style={styles.mainHead}>Details</Text>

          <View style={styles.row}>
            <Text style={styles.bloodGroup}>{data.blood_group}</Text>
            <Text style={styles.date}>{data.created_on}</Text>
          </View>

          
          <Text style={styles.head}>
            Location: <Text style={styles.detail}>{data.location}</Text>
          </Text>
          <Text style={styles.head}>
            Message: <Text style={styles.detail}>{data.message}</Text>
          </Text>
          <Text style={styles.mainHead}>Contact Details</Text>
          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`tel:${data.phone_number}`);
            }}>
            
            <View style={styles.row}>
            <Text style={styles.subHead}>Phone: +91 {data.phone_number}</Text>
            <Ionicons name="call" size={RFValue(30)} />
            </View>
          </TouchableOpacity>
          {/* */}


          <TouchableOpacity
            onPress={() => {
              Linking.openURL(`mailto:${data.email}`);
            }}>
            <View style={styles.row}>
            <Text style={styles.subHead}>Email: {data.email}</Text>
            <Ionicons name="mail" size={RFValue(30)} />
            </View>
          </TouchableOpacity>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 4,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  name: {
    alignSelf: 'center',
    fontSize: 25,
    fontFamily: 'oswald',
    borderBottomWidth: 1,
    marginBottom: 10,
  },
  bloodGroup: {
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  date: {
    fontSize: 15,
    fontFamily: 'sans-serif',
  },
  head:{
    fontFamily: 'oswald',
    fontSize: 15,
    marginTop: 8,
  },
  detail:{
    fontFamily: 'sans-serif',
    fontSize: 14,
  },
  subHead:{
    fontSize: 15,
    fontFamily: 'sans-serif',
    marginTop: 10
  },
  mainHead:{
    fontFamily: 'oswald',
    fontSize: 20,
    marginTop: 10,
    alignSelf: 'center'
  }
});

export default Requester;
