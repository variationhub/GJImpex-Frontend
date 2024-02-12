import { StyleSheet, View, Text, SafeAreaView, VirtualizedList, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../slices/user";
import UserData from "../Components/UserData";
import UserModal from "../Modals/UserModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const UserScreen = () => {
    const [userData, setUserData] = useState({
        name:"",
        role:"",
        phone:"",
        email:"",
        password:"",
        address:""
    })
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.user)

    const [modalAddUser, setModalAddUser] = useState(false);

    const openForm = () => {
        setModalAddUser(true);
    };
    useEffect(() => {
        dispatch(fetchUserData())
    }, [])
    const image = require('../assets/logo.png');

    return (
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.25}>
            <ScrollView>

                <View style={styles.container}>
                    {data.map(item => <UserData data={item} />)}
                </View>
                </ScrollView>
                <TouchableOpacity style={styles.fab} onPress={openForm}>
                    <Ionicons name="plus" size={30} color={'white'} />
                </TouchableOpacity>
                {modalAddUser &&
                    <UserModal userModalData={{ modalAddUser, userData }} userModalFn={{ setModalAddUser, setUserData }} />
                }

        </ImageBackground>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10
    },
    backgroundImage: {
        height:'100%',
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
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#5F4521',
        borderRadius: 30,
        padding: 15,
        elevation: 5,
    },
});
