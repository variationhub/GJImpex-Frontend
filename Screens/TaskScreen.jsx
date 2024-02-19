import { StyleSheet, View, Text } from "react-native";
import React from "react";
import Card from "../components/card";

const TaskScreen = () => {
    return (
        <View style={styles.container}>
            <Card></Card>
        </View>
    );
};

export default TaskScreen;

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
