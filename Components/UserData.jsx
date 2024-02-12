import { StyleSheet, View, Text, ImageBackground, TouchableOpacity } from "react-native";
import React, { useState } from "react";
import { ScrollView } from "react-native-gesture-handler";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const UserData = (props) => {
    const { name, role, phone } = props.data;
    return (


                <View style={styles.container}>
                    <Text style={styles.name}>{name}</Text>
                    <Text style={styles.role}>{role}</Text>
                    <Text style={styles.phone}>{phone}</Text>
                </View>
    
    );
};

export default UserData;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        position: 'relative'
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
    },
    role: {
        fontSize: 12,
        opacity: 0.4,
        color: "#333",
        marginBottom: 3,
        position: 'absolute',
        right: 10,
        top: 5,

    },
    phone: {
        fontSize: 13,
        color: "#666",
    },

});
