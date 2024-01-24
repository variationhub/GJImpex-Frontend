import { Button, Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import * as React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();

export default function LoginScreen({navigation}) {
  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/gjimpexlogin.png')}>

        </Image>
        <View style={styles.inputFields}>
            <Text style={styles.signin}>
                Sign In
            </Text>
            <TextInput
                style={[styles.input]}
                placeholder='Contact No.'>
            </TextInput>
            <TextInput
                style={[styles.input]}
                placeholder='Password'
                >
            </TextInput>
        <Pressable style={styles.loginButton} onPress={() => navigation.navigate('Home')}>
            <Text style={styles.loginText}> Login </Text>
        </Pressable> 
        </View>
            
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
    image: {
        width: "90%",
        height: 100,
        marginTop:"20%",
        // marginBottom:"auto"
    },
    inputFields:{
        width : "100%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: 50,
        height : "50%",
        gap : 20,
        justifyContent : 'center'
    },
    input :{
        borderWidth : 1,
        padding : 7,
        height : 40,
        width : '90%',
        borderColor : 'rgba(0, 0, 0, 0.2)',
        borderRadius : 5,
        margin : "0 auto"
    },
    loginButton :{
        width : '90%',
        padding : 5,
        backgroundColor : '#FB611A',
        borderRadius : 5,
        display : "flex",
        alignItems : "center",
    },
    signin :{
        fontSize : 18,
        marginRight: 'auto',
        marginLeft: '5%'
    },
    loginText:{
        fontSize : 16,
        letterSpacing : 1,
        padding : 5,
        color : 'white'
    }
});