import { NavigationContainer } from "@react-navigation/native";
import "react-native-gesture-handler";
import { useEffect, useState } from 'react';
import AppStack from "./stack/AppStack";
import { ActivityIndicator, Modal, Pressable, StyleSheet, Text, View, AppState } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Provider, useDispatch, useSelector } from "react-redux";
import store from "./store";
import * as eva from '@eva-design/eva';
import { ApplicationProvider } from '@ui-kitten/components';
import { modelSlice } from "./slices/model";

import { Platform } from 'react-native'
import { fetchOrderData } from "./slices/order";
import { fetchTransportData } from "./slices/transport";
import { fetchProductData } from "./slices/product";
import { fetchPartyData } from "./slices/party";
import URL from "./url.json"

const noGlow = `
textarea, select, input, button {
	-webkit-appearance: none;
	outline: none!important;
}
textarea:focus, select:focus, input:focus, button:focus {
	-webkit-appearance: none;
	outline: none!important;
}
`

export const injectWebCss = f => {

  if (!Platform.OS == 'web') return
  if (Platform.OS == 'android') return

  const style = document.createElement('style')
  style.textContent = `textarea, select, input, button { outline: none!important; }`
  return document.head.append(style)

}

injectWebCss()

const Navigation = () => {
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState(null);
  const [ws, setWs] = useState(null);

  const { visible, message } = useSelector(state => state.model)
  const dispatch = useDispatch();

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


  useEffect(() => {
    const appStateChangeHandler = (nextAppState) => {
      if (nextAppState === 'active') {
        const newWs = new WebSocket(`${URL.BASE_URL_WS}`);
        setWs(newWs);
      } else {
        if (ws) {
          ws.close();
        }
      }
    };

    AppState.addEventListener('change', appStateChangeHandler);

    return () => {
      AppState.removeEventListener('change', appStateChangeHandler);
      if (ws) {
        ws.close();
      }
    };
  }, []);

  useEffect(() => {
    if (ws) {
      ws.onmessage = (event) => {
        const data = JSON.parse(event.data);
        if (data.DOMAIN === 'ORDER') {
          dispatch(fetchOrderData(false))
        }

        if (data.DOMAIN === 'PARTY') {
          dispatch(fetchPartyData(false))
        }

        if (data.DOMAIN === 'PRODUCT') {
          dispatch(fetchProductData(false))
        }

        if (data.DOMAIN === 'TRANSPORT') {
          dispatch(fetchTransportData(false))
        }

        console.log(data);
      };
    }
  }, [ws]);

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <>
      <NavigationContainer>
        <ApplicationProvider {...eva} theme={eva.light}>
          <AppStack token={userToken} />
        </ApplicationProvider>
      </NavigationContainer>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
      // onRequestClose={closeForm}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={[styles.message, { marginBottom: 5, fontWeight: 'bold', fontSize: 16 }]}>
              Error
            </Text>
            <Text style={styles.message}>{message}</Text>
            <Pressable style={styles.closeButton} onPress={() => dispatch(modelSlice.actions.setModel({ visible: false, message: "" }))}>
              <Text style={styles.text}>
                Close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </>
  );
};

export default APP = () => {

  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,

    width: '100%',
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    position: 'relative',
    backgroundColor: "white",
    borderRadius: 5,
    padding: 15,
    width: '75%',
    height: '18%',
    elevation: 5,
  },
  closeButton: {
    position: 'absolute',
    bottom: 15,
    right: 20,
    padding: 4,
  },
  text: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#5F4521",
  }
});

