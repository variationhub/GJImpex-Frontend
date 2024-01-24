import { StyleSheet, View, Text } from "react-native";
import React from "react";

const UserScreen = () => {
    return (
        <View style={styles.container}>
            <Text>User Page</Text>
        </View>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    DrawerButton: {
        backgroundColor: "#000",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    ButtonText: {
        color: "#fff",
    },
});
