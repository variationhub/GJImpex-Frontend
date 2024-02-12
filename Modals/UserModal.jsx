import React from 'react'

import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createUserData } from '../slices/user';
import { useDispatch } from 'react-redux';
import SelectDropdown from 'react-native-select-dropdown'

const countries = ["Egypt", "Canada", "Australia", "Ireland"]


const UserModal = (props) => {

    const { modalAddUser, userData } = props.userModalData;
    const { setModalAddUser, setUserData } = props.userModalFn;

    const dispatch = useDispatch()
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
    }

    const saveForm = () => {
        dispatch(createUserData(userData))
        closeForm();
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
                    <Text style={styles.formTitle}>Add User</Text>
                    <TextInput
                        name="name"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={userData.name}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, name: e }))}
                    />
                    <TextInput
                        name="phone"
                        keyboardType="numeric"
                        style={styles.input}
                        placeholder="Enter phone number"
                        value={userData.phone}
                        onChangeText={(e) => setUserData(prev => ({ ...prev, phone: e }))}
                    />
                    <SelectDropdown
                        data={countries}
                        onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index);
                        }}
                        buttonTextAfterSelection={(selectedItem, index) => {
                            return selectedItem;
                        }}
                        rowTextForSelection={(item, index) => {
                            return item;
                        }}
                        dropdownStyle={styles.dropdown}
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
                        style={styles.input}
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

                    <TouchableOpacity style={styles.saveButton} onPress={saveForm}>
                        <Text style={styles.saveButtonText}>Create</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </TouchableOpacity>
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
    dropdown: {
        borderColor: 'transparent',
        borderWidth: 1,
        borderRadius: 5,
        marginTop: 10,
        paddingLeft: 10,
      },
});