import { StyleSheet } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Pages/login';
import LandingScreen from './Pages/landingPage';
import { createDrawerNavigator } from '@react-navigation/drawer';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName = "login">
      <Stack.Screen 
        name="login"
        component={LoginScreen}
        options={{headerShown: false}}
      />
    <Stack.Screen 
        name="landingPage" 
        component={LandingScreen} 
        options={{headerShown: false}}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
