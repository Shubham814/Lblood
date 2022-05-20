import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ImageBackground,
  TouchableOpacity
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import firebase from 'firebase';
import db from '../config';

let customFont = {
  amatic: require('../assets/AmaticSC-Regular.ttf'),
  oswald: require('../assets/Oswald-Regular.ttf'),
};


class Profile extends Component {
  constructor() {
    super();
    this.state = {
      name: "Username",
      email: "example.123@gmail.com",
      phone: "12-3456-7809",
      fontsLoaded: false,
      blood_group: "O+"
    };
  }
  fetchDetails = () => {
    var userId = firebase.auth().currentUser.uid;
    let name,email,phone,blood_group;
    db.ref('users/' + userId).on('value',(snapshot)=>{
      var val = snapshot.val();
      name = val.name;
      email = val.email;
      phone = val.phone;
      blood_group = val.blood_group;
    })
    this.setState({
      name: name,
      email: email,
      phone: phone,
      blood_group: blood_group
    })
  }
  logOut = () => {
    firebase.auth().signOut()
    this.props.navigation.navigate('HomeScreen');
  }
  async loadFonts() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }
  componentDidMount() {
    this.loadFonts();
    this.fetchDetails()
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
   return(
     <View style={styles.container}>
     <Text style= {[styles.name,{textTransform: 'uppercase'}]}>{this.state.name}</Text>
     
     <View style={{margin: 15}}>
     <Text style={styles.head}>Email</Text>
     <Text style={[styles.detail,{textTransform: 'lowercase'}]}>{this.state.email}</Text>
     
     <Text style={styles.head}>Phone</Text>
     <Text style={styles.detail}>{this.state.phone}</Text>

     <Text style={styles.head}>Blood Group</Text>
     <Text style={styles.detail}>{this.state.blood_group}</Text>

     <Text style={styles.head}>Region</Text>
     <Text style={styles.detail}>India</Text>
     </View>

     <TouchableOpacity 
     style={styles.logoutButton} 
     onPress = {()=>{this.logOut()}}>
     <Text style={styles.logoutText}>Logout</Text>
     </TouchableOpacity>
     </View>
   )
  }
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  name:{
    color: '#f2464b',
    alignSelf: 'center',
    fontSize: 25,
    fontWeight: "500",
    marginTop: RFValue(50),
    fontFamily: 'oswald'
  },
  head:{
    fontSize: 17,
    color: '#f2464b',
    fontFamily: 'oswald',
    marginTop: 20,
  },
  detail:{
    fontSize: 17,
    color: '#f2464b',
    borderBottomWidth: 1,
    borderBottomStartRadius: 3,
    borderBottomEndRadius: 3,
    borderBottomColor: '#f2464b',
    marginTop: RFValue(3),
    fontFamily: 'oswald'
  },
  logoutButton: {
    alignSelf: 'center',
    width: 250,
    backgroundColor: '#f2464b',
    marginTop: 20,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    borderWidth: 2,
    borderColor: '#f2464b',
  },
  logoutText: {
    color: 'white',
    fontFamily: 'sans-serif',
    fontSize: RFValue(25)
  },
});

export default Profile;









