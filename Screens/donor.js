import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  ScrollView,
  Linking,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';


let data = require('../assets/data.json');

let customFont = {
  amatic: require('../assets/AmaticSC-Regular.ttf'),
  oswald: require('../assets/Oswald-Regular.ttf'),
};

class Requests extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      flatListData: data,
    };
  }

  fetchRequests = () => {
    let name, bloodGroup, postedOn, location,message,cause,phoneNumber,email;

    var userId = firebase.auth().currentUser.uid;
    var details = [];

    db.ref('/donation/').on('value', (snapshot) => {
      snapshot.forEach((childSnapshot) => {
        /* console.log(childSnapshot.key); // "xz0ezxzrpkb"
        console.log(childSnapshot.val()); // {blood_group:"B+",cause:"Random Cause", ...
        console.log(childSnapshot.val().message); // "example@gmail.com"
        console.log(childSnapshot.child('message').val()); // "example@gmail.com" */
        name = childSnapshot.val().name
        bloodGroup = childSnapshot.val().blood_group
        postedOn = childSnapshot.val().created_on
        location = childSnapshot.val().location
        message = childSnapshot.val().message
        cause = childSnapshot.val().cause
        phoneNumber = childSnapshot.val().phone_number
        email= childSnapshot.val().email
        var dta = {name,bloodGroup,postedOn,location,message,cause,phoneNumber,email}
        console.log(dta)
        details.push(dta)
      });
    });

    console.log(details)

    this.setState({
      flatListData: details,
    });
  };

  async loadFonts() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }
  keyExtractor = (item, index) => {
    index.toString();
  };
  renderItem = ({ item: data }) => {
    return (
      <TouchableOpacity
        style={styles.dataButton}
        onPress={() => {
          this.props.navigation.navigate('ReadDonor', { details: data });
        }}>
        <View style={styles.row}>
          <Text style={styles.text}>{data.name}</Text>
          <Text style={styles.text}>{data.bloodGroup}</Text>
        </View>
        <Text style={styles.text}>{data.postedOn}</Text>
        <Text style={styles.location}>{data.location}</Text>
      </TouchableOpacity>
    );
  };
  componentDidMount() {
    this.loadFonts();
    this.fetchRequests()
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={styles.container}>
        <View>
          <StatusBar barStyle="dark-content" />

          <View
            style={[
              styles.row,
              {
                padding: RFValue(5),
                borderBottomWidth: 1,
                borderBottomColor: '#000000',
              },
            ]}>
            <Text style={styles.greetingText}>Nearest Donors</Text>
            <TouchableOpacity
              onPress={() => {
                this.props.navigation.navigate('NewDonor');
              }}>
              <Ionicons name="add-circle" size={RFValue(30)} color="#f2464b" />
            </TouchableOpacity>
          </View>

          <View style={{ alignItems: 'center' }}>
            <Text style={styles.heading}>Donors</Text>
          </View>

          <ScrollView>
            <FlatList
              keyExtractor={this.keyExtractor}
              data={this.state.flatListData}
              renderItem={this.renderItem}
            />
          </ScrollView>
          </View>
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  container: {
    height: '100%',
    backgroundColor: '#eee'
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  greetingText: {
    padding: RFValue(5),
    fontSize: 18,
    fontFamily: 'oswald',
  },
  heading: {
    fontSize: RFValue(50),
    fontFamily: 'amatic',
    fontWeight: "500",
    borderBottomWidth: 1,
    borderBottomColor: '#000000',
  },
  dataButton: {
    backgroundColor: '#f2464b',
    marginTop: 25,
    marginBottom: 25,
    height: RFValue(120),
    paddingLeft: RFValue(20),
    paddingTop: RFValue(12),
    width: RFValue(350),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#f57174',
  },
  text: {
    color: 'white',
    fontFamily: 'oswald',
    fontSize: RFValue(20),
    paddingRight: RFValue(18),
  },
  location: {
    color: 'white',
    fontFamily: 'oswald',
    fontSize: RFValue(25),
    paddingRight: RFValue(18),
  },
});

export default Requests;
