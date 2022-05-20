import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
  TextInput,
  SafeAreaView,
} from 'react-native';
import * as Font from 'expo-font';
import AppLoading from 'expo-app-loading';
import axios from 'axios'
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
      refreshing: false,
      data: [],
      userLocation: {},
    };
    }

/* Location Functions Start
  onRegionChange(region, lastLat, lastLong) {
    this.setState({
      userLocation: region,
      lat: lastLat,
      long: lastLong
    });
    console.log(this.state.userLocation)
  }
  getLocation = () => {
    this.watchID = navigator.geolocation.watchPosition((position) => {
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  50,
        longitudeDelta: 50
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }
 Location Function End */

  getData = () => {
    console.log(this.state.pincode)
    axios
      .get(
        'https://shubham814.github.io/blood-banks-api/data.json'
      )
      .then((response) => {
        console.log(response.data.length)
        var sort = [];
        for(var i = 0; i < response.data.length; i++) {
          if(response.data[i]["Pincode"] === this.state.pincode){
          sort.push(response.data[i]);
        }
        }
        this.setState({
          data: sort
        });
        console.log(this.state.data)
      })
      .catch((err) => {
        alert('Error: ' + err.message);
      });
      this.setState({
      refreshing: true
    })
  };

  writeConditions =() => {
    if(!this.state.pincode && this.state.data.length === 0 ){
      return <Text style={styles.statement}>Enter Pincode to get started.</Text>
    } else if(this.state.pincode && this.state.data.length === 0 ){
      return <Text style={styles.statement}>Sorry! We cannot find Blood Banks in this area. Maybe you have wrote the wrong pincode.</Text>
    } else {
      return(
        <FlatList 
          keyExtractor={this.keyExtractor}
          renderItem={this.renderItem}
          refreshing={this.state.refreshing}
          data={this.state.data}
          />
      )
    }
  }

// Primary Functions
  keyExtractor = (item, index) => {
    index.toString();
  };
  renderItem =({ item: data }) => {
    var address = data['State'] + ", " + data['City'];
    return(
      <TouchableOpacity 
      style={styles.cardContainer} 
      onPress={()=>{this.props.navigation.navigate('ReadDetails',{details: data})}}>
      <Text style={[styles.text,{fontSize: 23}]}>{data['Blood Bank Name']}</Text>
      <Text style={[styles.text,{fontSize: 18}]}>{address}</Text>
      
      <View style={{flexDirection: 'row'}}>
      <Ionicons name="call" size={18} color="white" />
      <Text style={[styles.text,{fontSize: 15, marginLeft: 5}]}>{data['Mobile']}</Text>
      </View>
      </TouchableOpacity>
    )
  }
  async loadFonts() {
    await Font.loadAsync(customFont);
    this.setState({ fontsLoaded: true });
  }

  componentDidMount() {
    this.loadFonts();
    this.getData();
    //this.getLocation();
  }
  render() {
    if (!this.state.fontsLoaded) {
      return <AppLoading />;
    } else {
      return (
        <SafeAreaView style={{flex: 1,}}>

        <Text style={styles.head} >Blood Bank</Text>

        <TextInput 
        placeholder="Enter Pincode of City"
        style={styles.input}
        maxLength= {6}
        keyboardType="number-pad"
        onChangeText={(text)=>{
          this.setState({
            pincode: parseInt(text)
          })
          this.getData();
        }}
        />
        

      {this.writeConditions()}
          
        </SafeAreaView>
      );
    }
  }
}

const styles = StyleSheet.create({
  head:{
    alignSelf: 'center',
    fontSize: 50,
    fontFamily: 'amatic',
  },
  cardContainer: {
    backgroundColor: '#f2464b',
    marginTop: 25,
    marginBottom: 50,
    height: RFValue(135),
    paddingLeft: RFValue(20),
    paddingTop: RFValue(12),
    width: RFValue(350),
    alignSelf: 'center',
    borderWidth: 1,
    borderRadius: 40,
    borderColor: '#f57174',
  },
  text:{
    color: 'white',
    fontFamily: 'oswald',
  },
  input:{
    marginTop: 25,
    width: RFValue(300),
    height: RFValue(40),
    borderWidth: 1,
    borderRadius: 50,
    alignSelf: 'center',
    paddingLeft: 10,
    fontFamily: 'oswald'
  },
  statement:{
    marginTop: 25,
    alignSelf: 'center',
    fontFamily: 'oswald',
    color: 'grey'
  }
});

export default Requests;



















