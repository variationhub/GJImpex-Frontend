import React, { useRef, useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserData, updateUserData } from '../slices/user';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { Input, Layout, Select, SelectItem } from '@ui-kitten/components';

const UserModal = (props) => {

    const { modalAddUser, userData, isEdit, id, userRoles } = props.userModalData;
    const { setModalAddUser, setUserData, setIsEdit, setId } = props.userModalFn;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [userRef, setUserRef] = useState({
        name: useRef(),
        nickName: useRef(),
        mobileNumber: useRef(),
        email: useRef(),
        password: useRef(),
        role: useRef(),
    })

    const [error, setError] = useState({
        name: false,
        role: false,
        nickName: false,
        mobileNumber: false,
        email: false,
        password: false
    });

    const closeForm = () => {
        setUserData({
            name: "",
            role: 0,
            nickName: "",
            mobileNumber: "",
            email: "",
            password: ""
        })
        setModalAddUser(false);
        setIsEdit(false);
        setId('');
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(userData).forEach(key => {
            if (!userData[key]) {
                setError((prev) => ({ ...prev, [key]: true }))
                button = true;
            }
        })

        return button;
    }

    const saveForm = async (isEdit) => {

        if (checkAllFieldfilled()) {
            return;
        }

        let response = false;
        setLoading(true)
        if (isEdit) {
            response = await dispatch(updateUserData(id, {
                name: userData.name.trim(),
                role: userRoles[userData.role],
                mobileNumber: userData.mobileNumber.trim(),
                email: userData.email.trim(),
                nickName: userData.nickName.trim()
            }))
        }
        else {
            response = await dispatch(createUserData({
                name: userData.name.trim(),
                role: userRoles[userData.role],
                password: userData.password.trim(),
                mobileNumber: userData.mobileNumber.trim(),
                email: userData.email.trim(),
                nickName: userData.nickName.trim()
            }))
        }
        if (response) {
            closeForm();
        }
        setLoading(false);
    };


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddUser}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} User</Text>

                    <Input
                        value={userData.name}
                        label='User name'
                        name="userName"
                        status={error.name ? "danger" : "basic"}
                        placeholder='Ex. John Smith'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    name: false
                                }))
                            } setUserData(prev => ({ ...prev, name: e }))
                        }}
                        ref={userRef.name}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            userRef.nickName.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Input
                        value={userData.nickName}
                        name="nickName"
                        label='Nick Name'
                        status={error.nickName ? "danger" : "basic"}
                        placeholder='Ex. JS'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    nickName: false
                                }))
                            } setUserData(prev => ({ ...prev, nickName: e }))
                        }}
                        ref={userRef.nickName}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            userRef.mobileNumber.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Input
                        value={userData.mobileNumber}
                        name="mobileNumber"
                        label='Contact Number'
                        status={error.mobileNumber ? "danger" : "basic"}
                        placeholder='Ex. 1234567890'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    mobileNumber: false
                                }))
                            } setUserData(prev => ({ ...prev, mobileNumber: e }))
                        }}
                        ref={userRef.mobileNumber}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            userRef.email.current.focus();
                        }}
                        blurOnSubmit={false}
                    />


                    <Input
                        value={userData.email}
                        name="email"
                        label='Email Id'
                        status={error.email ? "danger" : "basic"}
                        placeholder='Ex. john@gmail.com'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    email: false
                                }))
                            } setUserData(prev => ({ ...prev, email: e }))
                        }}
                        ref={userRef.email}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            userRef.password.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    {!isEdit &&
                        <Input
                            value={userData.password}
                            name="password"
                            label='Password'
                            status={error.password ? "danger" : "basic"}
                            placeholder='Ex. JOhn@5m1th'
                            style={styles.input}
                            secureTextEntry={true}
                            onChangeText={(e) => {
                                if (e.length > 2) {
                                    setError((prev) => ({
                                        ...prev,
                                        password: false
                                    }))
                                } setUserData(prev => ({ ...prev, password: e }))
                            }}
                            ref={userRef.password}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                userRef.role.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                    }

                    <Layout
                        style={styles.selection}
                        level='1'
                    >
                        <Select
                            label='Select Role'
                            placeholder="Ex. Admin"
                            value={userRoles[userData.role]}
                            selectedIndex={userData.role}
                            ref={userRef.role}
                            onSelect={index => setUserData(prev => ({ ...prev, role: index }))}
                        >
                            {userRoles.map((value) => <SelectItem title={value} key={value} />)}
                        </Select>
                    </Layout>

                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" />
                            :
                            <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Create"}</Text>
                        }
                    </Pressable>
                    <Pressable style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default UserModal

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        position: 'relative',
        backgroundColor: "white",
        padding: 20,
        width: '100%',
        height: '93%',
        elevation: 5,
        marginTop: "auto"
    },
    closeModal: {
        display: 'flex',
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
    closeForm: {
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#5F4521',
    },
    input: {
        backgroundColor: 'white',
        marginVertical: 5
    },
    saveButton: {
        backgroundColor: '#5F4521',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    selection: {
        backgroundColor: 'white',
        marginVertical: 5
    }
});