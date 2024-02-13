import { Image, Pressable, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthService from '../Services/AuthService';
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import { loginSlice } from '../slices/login';

const Stack = createNativeStackNavigator();

export default function LoginScreen() {

        const [contactNo, setContactNo] = useState('9328677043');
        const [password, setPassword] = useState('GJ@2024');
        const [loading, setLoading] = useState(false);
        const dispatch = useDispatch();
        const handleLogin = async () => {
          setLoading(true);
          try {
            const userData = await AuthService.login(contactNo, password);
            await AsyncStorage.setItem('token', userData.token);
            dispatch(loginSlice.actions.updateUser(true));
            // navigation.navigate('HomeScreen');
          } catch (error) {
            console.error('Login failed:', error);
            // Handle login error, e.g., show error message to the user
          } finally {
            setLoading(false);
          }
        };
  

  return (
    <View style={styles.container}>
        <Image style={styles.image} source={require('../assets/gjimpexlogin.png')}>

        </Image>
        <View style={styles.inputFields}>
            <Text style={styles.signin}>
                Sign In
            </Text>
            <TextInput
                value={contactNo}
                onChangeText={setContactNo}
                style={[styles.input]}
                placeholder='Contact No.'>
            </TextInput>
            <TextInput
                value={password}
                onChangeText={setPassword}
                style={[styles.input]}
                placeholder='Password'
                >
            </TextInput>
        <Pressable style={styles.loginButton} onPress={handleLogin}>
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
        marginLeft : 'auto',
        marginRight : "auto"
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
