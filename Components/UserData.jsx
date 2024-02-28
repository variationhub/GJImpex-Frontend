import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteUserData } from "../slices/user";

const UserData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { name, role, mobileNumber, nickName, id } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteUserData(id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    return (
        <View style={styles.container}>

            <Text style={styles.role}>{role}</Text>
            <View style={styles.parent}>
                <View style={styles.first}>
                    <Text style={styles.nickname} >{nickName}</Text>
                </View>
                <View style={styles.middle}>
                    <Text style={styles.name} numberOfLines={1}>{name}</Text>
                    <Text style={styles.mobileNumber}>{mobileNumber}</Text>
                </View>
                <View style={styles.icons}>
                    <Pressable style={styles.icon} onPress={() => props.editUser(id)}>
                        <Ionicons name="marker" size={24} color={'#5F4521'} />
                    </Pressable>
                    <Pressable style={styles.icon} onPress={deleteHandler}>
                        <Ionicons name="delete" size={24} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </View>

    );
};

export default UserData;

const styles = StyleSheet.create({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
    },
    parent: {
        width: '95%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        backgroundColor: "#f0f0f0",
        borderRadius: 10,
        borderWidth: 1,
        padding: 10,
        borderColor: "#ccc",
        position: 'relative',
        // Shadow for iOS
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        // Shadow for Android
        elevation: 6,
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
    mobileNumber: {
        fontSize: 13,
        color: "#666",
    },
    icons: {
        flexDirection: 'row',
        color: '#5f4521',
        flex: 0
    },
    icon: {
        padding: 10,
    },
    first: {
        flex: 0,
        borderRadius: 50,
        height: 40,
        width:40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '7%',
        backgroundColor: 'rgba(251, 97, 26, 0.2)'
    },
    middle: {
        flex: 1,
    },
    nickname: {
        fontWeight: 'bold',
        color: '#FB611A',
        fontSize: 13,
    }
});
