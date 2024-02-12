import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useEffect, useState } from 'react';
import AppStack from "./Stack/AppStack";
import { ActivityIndicator, View } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider } from "react-redux";
import store from "./store";

export default App = () => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);

  useEffect(() => {
    // Check if token exists in AsyncStorage
    AsyncStorage.getItem('token')
      .then(token => {
        if (token) {
          setUserToken(token);
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
      return (
      <Provider store={store}>
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      </Provider>
      );
    } 

  return (
    <Provider store={store}>
      <NavigationContainer>
        <AppStack token={userToken}/>
      </NavigationContainer>
    </Provider>
  );
};
