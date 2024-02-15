import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteUserData } from "../slices/user";

const UserData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { name, role, phone, _id } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteUserData(_id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1}>{name}</Text>
            <Text style={styles.role}>{role}</Text>
            <Text style={styles.phone}>{phone}</Text>
            <View style={styles.icons}>
            <Pressable style={styles.icon} onPress={()=>props.editUser(_id)}>
                <Ionicons name="marker" size={24} color={'#5F4521'} />
            </Pressable>
            <Pressable style={styles.icon} onPress={deleteHandler}>
                <Ionicons name="delete" size={24} color={'#5F4521'} />
            </Pressable>
            </View>
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
        width: "75%"
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
    icons: {
        position: 'absolute',
        right: 0,
        bottom: 6,
        flexDirection: 'row',
        gap: 0,
        color: '#5f4521',
    },
    icon: {
        padding: 10,
        paddingBottom: 2
    },
});
