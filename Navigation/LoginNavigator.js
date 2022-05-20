import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../Screens/homeScreen';
import Login from '../Screens/Login';
import SignUp from '../Screens/signUp';

import SwitchNavigator from '../Navigation/SwitchNavigator';

const Stack = createStackNavigator();

class LoginNavigation extends React.Component {
  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="HomeScreen"
          screenOptions={{
            headerShown: false,
          }}>
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Signup" component={SignUp} />
          <Stack.Screen name="SwitchNavigator" component={SwitchNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}

export default LoginNavigation;
