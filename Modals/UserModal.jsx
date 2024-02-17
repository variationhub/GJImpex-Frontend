import React, { useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserData, updateUserData } from '../slices/user';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';


const data = [
    { label: 'Admin', value: 'Admin' },
    { label: 'Sales', value: 'Sales' },
    { label: 'Accountant', value: 'Accountant' }
];

const UserModal = (props) => {

    const { modalAddUser, userData, isEdit, id } = props.userModalData;
    const { setModalAddUser, setUserData, setIsEdit, setId } = props.userModalFn;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const closeForm = () => {
        setUserData({
            name: "",
            role: "",
            phone: "",
            email: "",
            password: "",
            address: ""
        })
        setModalAddUser(false);
        setIsEdit(false);
        setId('');
    }

    const saveForm = async (isEdit) => {
        let response = false;
        setLoading(true)
        if (isEdit) {
            response = await dispatch(updateUserData(id, {
                name: userData.name.trim(),
                role: userData.role,
                phone: userData.phone.trim(),
                email: userData.email.trim(),
                address: userData.address.trim()
            }))
        }
        else {
            response = await dispatch(createUserData({
                name: userData.name.trim(),
                role: userData.role,
                password: userData.password.trim(),
                phone: userData.phone.trim(),
                email: userData.email.trim(),
                address: userData.address.trim()
            }))
        }
        if (response) {
            closeForm();
        }
        setLoading(false);
    };

    const [isFocus, setIsFocus] = useState(false);

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
                    <TextInput
                        name="name"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={userData.name}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, name: e }))}
                    />
                    <TextInput
                        name="phone"
                        inputMode="numeric"
                        style={styles.input}
                        placeholder="Enter phone number"
                        value={userData.phone}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, phone: e }))}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        iconStyle={styles.iconStyle}
                        data={data}
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select role' : '...'}
                        value={userData.role}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(e) => setUserData(prev => ({ ...prev, role: e.value }))}
                    />
                    <TextInput
                        name="email"
                        style={styles.input}
                        placeholder="Enter email"
                        value={userData.email}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, email: e }))}

                    />
                    <TextInput
                        name="password"
                        secureTextEntry={isEdit ? true : false}
                        style={styles.input}
                        editable={isEdit ? false : true}
                        placeholder="Enter password"
                        value={userData.password}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, password: e }))}

                    />
                    <TextInput
                        name="address"
                        style={styles.input}
                        placeholder="Enter address"
                        value={userData.address}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, address: e }))}

                    />

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
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
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
    dropdown: {
        height: 40,
        marginBottom: 10,
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 0,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 15,
        color: 'gray',
        fontFamily: ''
    },
    selectedTextStyle: {
        fontSize: 15,
    },

});