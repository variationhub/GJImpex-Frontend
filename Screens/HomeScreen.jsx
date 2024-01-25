import { StyleSheet, View, Text } from "react-native";
import React from "react";
import { ImageBackground } from "react-native";
import { Image } from "react-native";

const HomeScreen = () => {
    return (
        <View style={styles.backgroundImage}>
            <View style={styles.image}><Image source={require('../assets/logo.png')} ></Image></View>
            <View style={styles.container}>
                <Text>Home Page</Text>
            </View>
        </View>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
    //   flex: 1,
    //   width: "100%",
    //   height: "100%",
    //   flexDirection: 'column',
    //   alignItems: 'center',
    //   justifyContent: 'center',
    },
    backgroundImage: {
        flex:1,
        position:'relative',
    },
    image : {
        zIndex: -1,
        position: 'relative',
        width: "100%",
        height: "100%",
        opacity: 0.2,
        display : 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    }
  });
  
