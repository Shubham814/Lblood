import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Alert
} from 'react-native';
import firebase from 'firebase'


class LoadingScreen extends Component {
  constructor() {
    super();
    this.state = {
    };
  }
  checkUser = () => {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.props.navigation.navigate('StackNavigator', {screen: 'Home'});
        alert("System Paad denge! Jai Baba ki.")
        // Alert.alert(
        //   "Login Status",
        //   "You logged in Successfully."
        // )
      } else {
        this.props.navigation.navigate('StackNavigator', {screen: 'Home'});
        Alert.alert(
          "Error",
          "Sorry! An error occured while Log In."
        )
      }
  })
  }
  componentDidMount(){
    this.checkUser();
  }
  render() {
   return(
     <View style={styles.container}>
     <ActivityIndicator size="large" color="blue" />
     </View>
   )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#eee',
    alignItems: 'center',
    justifyContent: 'center',
    height: "100%",
  },
});

export default LoadingScreen;
