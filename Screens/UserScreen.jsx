import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserData } from "../slices/user";
import UserData from "../components/UserData";
import UserModal from "../modals/UserModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const userRoles = ['Admin', 'Sales', 'Accountant', 'Dispatcher', 'Production', 'Other'];


const UserScreen = () => {
    const [userData, setUserData] = useState({
        name: "",
        role: 0,
        mobileNumber: "",
        email: "",
        password: "",
        nickName: ""
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
        const value = data.find(value => value.id === id)
        setUserData({
            name: value.name,
            role: userRoles.indexOf(value.role),
            mobileNumber: value.mobileNumber,
            email: value.email,
            password: "password",
            nickName: value.nickName
        })
        setIsEdit(true)
        setId(id)
        setModalAddUser(true)
    }

    return (
        <LinearGradient
        colors={['#ffdfb2', '#fbcca2', '#f6b896', '#f0a48d', '#e89187']}
        style={styles.backgroundImage}>
        {/* <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}> */}
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                <ScrollView>

                    <View style={styles.container}>
                        {data.map((item, index) => <UserData key={item.id} data={{...item, index}} editUser={editUser} />)}
                    </View>
                </ScrollView>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddUser &&
                <UserModal userModalData={{ modalAddUser, userData, isEdit, id, userRoles }} userModalFn={{ setModalAddUser, setUserData, setIsEdit, setId }} />
            }
           
        {/* </ImageBackground> */}
        </LinearGradient>
    );
};

export default UserScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        backgroundImage: 'linear-gradient(to bottom, #ffdfb2, #fbcca2, #f6b896, #f0a48d, #e89187)'

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
