import { StyleSheet, Text, View } from 'react-native';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LRScreen() {
  return (
    <View>
        <Text>
            This is LR Screen !..
        </Text>
    </View>
  );
}
