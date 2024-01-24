import { StyleSheet } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './pages/login';
import LandingScreen from './pages/home';

const Stack = createNativeStackNavigator();

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
        name="Home" 
        component={LandingScreen} 
        // options={{headerShown: false}}
    />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
