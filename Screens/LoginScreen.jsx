import React, { useState } from 'react';
import { View, Text, TextInput, Pressable, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch } from 'react-redux';
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthService from '../services/AuthService';
import { loginSlice } from '../slices/login';

export default function LoginScreen() {
  const [contactNo, setContactNo] = useState('9328677043');
  const [password, setPassword] = useState('GJ@2024');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const dispatch = useDispatch();

  const handleLogin = async () => {
    setLoading(true);
    try {
      const userData = await AuthService.login(contactNo, password);
      if (userData) {
        await AsyncStorage.setItem('token', userData.token);
        dispatch(loginSlice.actions.updateUser(true));
      } else {
        setError(true);
        setTimeout(()=>{
          setError(false)
        },3000)
      }
    } catch (error) {
      console.error('Login failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.logo} source={require('../assets/gjimpexlogin.png')} />
      <View style={styles.formContainer}>
        <Text style={styles.signInText}>Sign In</Text>
        {error && <Text style={styles.signInError}>Invalid phone number or password</Text>}
        <TextInput
          value={contactNo}
          onChangeText={setContactNo}
          style={styles.input}
          placeholder="Contact No."
          inputMode="numeric"
        />
        <TextInput
          value={password}
          onChangeText={setPassword}
          style={styles.input}
          placeholder="Password"
          secureTextEntry
        />
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
    width: '90%',
  },
  signInText: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingVertical: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    fontSize: 15,
  },
  loginButton: {
    backgroundColor: '#FB611A',
    paddingVertical: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
    textTransform: 'uppercase'
  },
  signInError:{
    color:"maroon",
    fontSize: 12,
    textAlign: 'center',
    marginBottom: 10
  }
});
