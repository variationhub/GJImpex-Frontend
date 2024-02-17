import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../slices/user";
import UserData from "../Components/UserData";
import UserModal from "../Modals/UserModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const UserScreen = () => {
    const [userData, setUserData] = useState({
        name: "",
        role: "",
        phone: "",
        email: "",
        password: "",
        address: ""
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.user)

    const [modalAddUser, setModalAddUser] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');

    const openForm = () => {
        setModalAddUser(true);
    };
    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    const image = require('../assets/logo.png');

    const editUser = (id) => {
        const value = data.find(value => value._id === id)
        setUserData({
            name: value.name,
            role: value.role,
            phone: value.phone,
            email: value.email,
            password: "password",
            address: value.address
        })
        setIsEdit(true)
        setId(id)
        setModalAddUser(true)
    }

    return (
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}>
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                <ScrollView>

                    <View style={styles.container}>
                        {data.map(item => <UserData key={item._id} data={item} editUser={editUser} />)}
                    </View>
                </ScrollView>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddUser &&
                <UserModal userModalData={{ modalAddUser, userData, isEdit, id }} userModalFn={{ setModalAddUser, setUserData, setIsEdit, setId }} />
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
        height: '100%',
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
    loader: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "48px"
    }
});
