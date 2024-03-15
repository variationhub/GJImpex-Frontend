import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteUserData } from "../slices/user";
import CSS from '../styles/gloable.json'

const UserData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { name, role, nickName, mobileNumber, id, index } = props.data;
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
        <View style={[styles.container, CSS.card]}>
            <View style={styles.firstLine}>
                <View style={{display:"flex", flexDirection:"row", alignItems:"center"}}>
                    <View style={styles.index}>
                        <Text>{index + 1}</Text>
                    </View>
                    <Text style={styles.name} numberOfLines={1}>{name} </Text>
                </View>
                <Text style={styles.nickName}>{nickName}</Text>
            </View>
            {/* <Text style={styles.role}>{role}</Text> */}
            <Text style={styles.mobileNumber}>{mobileNumber}</Text>
            <View style={styles.icons}>
                <Pressable style={styles.icon} onPress={() => props.editUser(id)}>
                    <Ionicons name="marker" size={24} color={CSS.secondaryColor} />
                </Pressable>
                <Pressable style={styles.icon} onPress={deleteHandler}>
                    <Ionicons name="delete" size={24} color={CSS.secondaryColor} />
                </Pressable>
            </View>
        </View>

    );
};

export default UserData;

const styles = StyleSheet.create({
    container: {
        backgroundColor: CSS.orangeCardColor,
    },
    firstLine: {
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        padding: 5,
        paddingBottom: 10,
        justifyContent:"space-between"
    },
    index: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "rgba(255, 255, 255, 0.5)",
        justifyContent: "center",
        alignItems: "center",
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginLeft: 10,
        color: CSS.secondaryColor,
    },
    nickName: {
        borderRadius: 50,
        backgroundColor: "rgba(0,0,0,0.3)",
        opacity: 1,
        fontSize: 12,
        padding: 4,
        paddingHorizontal: 8,
        color: "white",
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
        gap: 0,
        color: CSS.secondaryColor,
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
