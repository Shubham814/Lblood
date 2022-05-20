import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity,
  Linking
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MapView, { Marker } from 'react-native';
import Clipboard from '@react-native-community/clipboard';


import firebase from 'firebase';
import db from '../config';

let customFont = {
  amatic: require('../assets/AmaticSC-Regular.ttf'),
  oswald: require('../assets/Oswald-Regular.ttf'),
};

class ReadBloodBankDetails extends Component {
  constructor() {
    super();
    this.state = {
      fontsLoaded: false,
      mapRegion: null,
      lastLat: null,
      lastLong: null,
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
    let data = this.props.route.params.details;
      return (
        <SafeAreaView style={styles.container}>
          <StatusBar barStyle="dark-content" />

          

          <Text style={styles.head}>{data['Blood Bank Name']}</Text>
          
          <View style={styles.row}>
          <Text style={styles.foot}>State     : </Text>
          <Text style={styles.data}>{data['State']}</Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.foot}>District  : </Text>
          <Text style={styles.data}>{data['District']}</Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.foot}>City      : </Text>
          <Text style={styles.data}>{data['City']}</Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.foot}>Address   : </Text>
          <Text style={styles.data}>{data['Address']}</Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.foot}>Latitude   : </Text>
          <Text style={styles.data}>{data['Latitude']}</Text>
          </View>

          <View style={styles.row}>
          <Text style={styles.foot}>Longitude   : </Text>
          <Text style={styles.data}>{data['Longitude']}</Text>
          </View>

          <TouchableOpacity style={{flexDirection: 'row', justifyContent: 'space-between'}} onPress={()=>{Linking.openURL(`tel:${data['Mobile']}`)}}>
          <View style={styles.row}>
          <Text style={styles.foot}>Contact    : </Text>
          <Text style={styles.data}>{data['Mobile']}</Text>
          </View>
          <Ionicons name="call" size={18} color="black" />
          </TouchableOpacity>

          <TouchableOpacity 
          onPress={()=>{ Clipboard.setString(`${data['Latitude']}, ${data['Longitude']}`)}}>
          <Text style={styles.foot}>Copy Coordinates</Text>
          </TouchableOpacity>
        </SafeAreaView>
      );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    backgroundColor: '#eee'
  },
  row:{
    flexDirection: 'row',
  },
  head:{
    fontSize: 40,
    color: 'black',
    fontFamily: 'amatic',
    marginTop: '10'
  },
  foot:{
    fontSize: 20,
    color: 'black',
    fontFamily: 'oswald',
    marginTop: '10'
  },
  data:{
    fontSize: 18,
    color: 'black',
    fontFamily: 'oswald',
    marginTop: '10',
    fontWeight: 'normal'
  }
});

export default ReadBloodBankDetails;