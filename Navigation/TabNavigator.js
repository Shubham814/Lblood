import React, { Component } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome'
import { RFValue } from 'react-native-responsive-fontsize';


import Request from '../Screens/request';
import Donor from '../Screens/donor';
import BloodBank from '../Screens/bloodBank';
import Profile from '../Screens/profile';

import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';

const Tab = createMaterialBottomTabNavigator();

class TabNavigator extends Component {
  render() {
    return (
      <Tab.Navigator
        labeled={true}
        shifting={true}
        barStyle={styles.bottomStyles}
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName;
            if (route.name === 'Request') {
              iconName = focused ? 'water' : 'water-outline';
              size = 20;
            } else if (route.name === 'Donor') {
              iconName = focused ? 'color-fill' : 'color-fill-outline';
              size = 20;
            }
            else if (route.name === 'BloodBank') {
              iconName = focused ? 'fitness' : 'fitness-outline';
              size = 20;
            } else if (route.name === 'Profile') {
              iconName = focused ? 'person' : 'person-outline';
              size = 20;
            }
            return (
              <Ionicons
                name={iconName}
                size={size}
                color={color}
                style={styles.icons}
              />
            );
          },
        })}
        activeColor={'#f2464b'}
        inactiveColor={'grey'}>
        <Tab.Screen name="Request" component={Request} />
        <Tab.Screen name="Donor" component={Donor} />
        <Tab.Screen name="BloodBank" component={BloodBank} />
        <Tab.Screen name="Profile" component={Profile} />
      </Tab.Navigator>
    );
  }
}

const styles = StyleSheet.create({
   bottomStyles: {
    backgroundColor: '#fff',
    height: '8%',
    width: '100%',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    position: 'absolute',
    fontSize: 20,
  },
  icons: {
    width: RFValue(60),
    height: RFValue(60),
    paddingLeft: RFValue(10),
  }, 
});

export default TabNavigator;
