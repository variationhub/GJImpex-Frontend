import { StyleSheet } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from './Pages/login';
import LRScreen from './Pages/lr';



const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
    <Stack.Navigator initialRouteName = "login">
      <Stack.Screen 
        name="login"
        component={LoginScreen}
      />
    <Stack.Screen name="lr" component={LRScreen} />
    </Stack.Navigator>
  </NavigationContainer>
  );
}
