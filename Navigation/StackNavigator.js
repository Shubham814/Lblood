import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import TabNavigator from "./TabNavigator";
import ReadDetails from "../Screens/readDetails";
import New from '../Screens/new';
import NewDonor from '../Screens/newDonor'
import ReadDonor from '../Screens/ReadDonation'
import ReadRequest from '../Screens/readRequester'

const Stack = createStackNavigator();

const StackNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false
      }}
    >
      <Stack.Screen name="Home" component={TabNavigator} />
      <Stack.Screen name="ReadDetails" component={ReadDetails} />
      <Stack.Screen name="ReadDonor" component={ReadDonor} />
      <Stack.Screen name="New" component={New} />
      <Stack.Screen name="NewDonor" component={NewDonor} />
      <Stack.Screen name="ReadRequest" component={ReadRequest} />
    </Stack.Navigator>
  );
};

export default StackNavigator;
