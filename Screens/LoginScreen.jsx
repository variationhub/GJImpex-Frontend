import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from '../services/AuthService';
import { loginSlice } from '../slices/login';
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
import CSS from '../styles/gloable.json'
export default function LoginScreen() {
  const [contactNo, setContactNo] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await AuthService.login(contactNo, password);
      if (userData) {
        await AsyncStorage.setItem('token', userData.token);
        const decoded = jwtDecode(userData.token);
        dispatch(loginSlice.actions.updateUser(true));
        dispatch(loginSlice.actions.setData(decoded));
      } else {
        setError(true);
        setTimeout(() => {
          setError(false)
        }, 3000)
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {/* <View style={styles.upper}> */}
      <Image style={styles.logo} source={require('../assets/gjimpexlogin.png')} />
        <View style={styles.formContainer}>
          <Text style={styles.signInText}>Sign In</Text>
          {error && <Text style={styles.signInError}>Invalid phone number or password</Text>}
          <View style={styles.contactNumber}>
            <Ionicons name="phone" size={22} color={'black'} />
            <TextInput
              value={contactNo}
              onChangeText={setContactNo}
              style={styles.input}
              placeholder="Contact No."
              inputMode="numeric"
            />
          </View>
          <View style={styles.password}>
            <Ionicons name="lock" size={22} color={'black'} />
            <TextInput
              value={password}
              onChangeText={setPassword}
              style={[styles.input, { width: '85%' }]}
              placeholder="Password"
              secureTextEntry={isPasswordVisible}
            />
            <Pressable onPress={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ?

                <Ionicons name="eye" size={22} color={'black'} />
                :
                <Ionicons name="eye-off" size={22} color={'black'} />
              }
            </Pressable>
          </View>
        {/* </View> */}

        <Pressable style={styles.loginButton} onPress={handleLogin}>
          {loading ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.loginButtonText}>Login</Text>
          )}
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: '90%',
    height: 100,
    marginBottom: 30,
  },
  formContainer: {
    gap: 15,
    width: '90%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center'
  },
  signInText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    width: '95%',
    borderColor: '#ccc',
    borderRadius: 50,
    paddingHorizontal: 15,
    fontSize: 15,
  },
  loginButton: {
    width: '50%',
    marginTop: '10%',
    backgroundColor: CSS.primaryColor,
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  signInError: {
    color: "maroon",
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10
  },
  contactNumber: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: 'rgba(240, 97, 26, 0.1)',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
  },
  password: {
    width: '95%',
    display: 'flex',
    flexDirection: 'row',
    // justifyContent:'space-between',
    backgroundColor: 'rgba(240, 97, 26, 0.1)',
    borderWidth: 1,
    borderRadius: 50,
    alignItems: 'center',
    padding: 10,
  }


});
