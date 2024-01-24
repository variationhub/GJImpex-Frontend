import { Button, StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LandingScreen() {
  return (
    <View style={styles.container}>
      <View style={styles.button}>
        <Button title='Menu'/>
      </View>
        <Text>
            This is Landing Screen !..
        </Text>
    </View>
  );
}


const styles = StyleSheet.create({
  container:{
      display: "flex",
      flexDirection: "column",
      // justifyContent: "center",
      alignItems: "center",
      height: "100%"
  },
  button:{
    marginTop: "20%",
    width:"100%",
  }
});