import React, { useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createTransportData, updateTransportData } from '../slices/transport';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';

const TransportModal = (props) => {

    const { modalAddTransport, transportData, isEdit, id } = props.transportModalData;
    const { setModalAddTransport, setTransportData, setIsEdit, setId } = props.transportModalFn;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);

    const closeForm = () => {
        setTransportData({
            name: ""
        })
        setModalAddTransport(false);
        setIsEdit(false);
        setId('');
    }

    const saveForm = async (isEdit) => {
        let response = false;
        setLoading(true)
        if (isEdit) {
            response = await dispatch(updateTransportData(id, {
                transportName: transportData.name.trim()
            }))
        }
        else {
            response = await dispatch(createTransportData({
                transportName: transportData.name.trim()
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
            visible={modalAddTransport}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Transport</Text>
                    <TextInput
                        name="name"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={transportData.name}
                        onChangeText={(e) => setTransportData(prev => ({ ...prev, name: e }))}
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

export default TransportModal

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
    placeholderStyle: {
        fontSize: 15,
        color: 'gray',
        fontFamily: ''
    },
    selectedTextStyle: {
        fontSize: 15,
    },

});