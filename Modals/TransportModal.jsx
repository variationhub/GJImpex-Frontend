import React, { useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createTransportData, updateTransportData } from '../slices/transport';
import { useDispatch } from 'react-redux';
import { Input } from '@ui-kitten/components';

const TransportModal = (props) => {

    const { modalAddTransport, transportData, isEdit, id } = props.transportModalData;
    const { setModalAddTransport, setTransportData, setIsEdit, setId } = props.transportModalFn;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState({
        name: false,
        mobileNumber: false,
        gst: false,
        address: false
    });

    const closeForm = () => {
        setTransportData({
            name: "",
            mobileNumber: "",
            gst: "",
            address: ""
        })
        setModalAddTransport(false);
        setIsEdit(false);
        setId('');
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(transportData).forEach(key => {
            if (!transportData[key]) {
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
            response = await dispatch(updateTransportData(id, {
                transportName: transportData.name.trim(),
                mobileNumber: transportData.mobileNumber.trim(),
                gst:transportData.gst.trim().toUppercase(),
                address:transportData.address.trim()
            }))
        }
        else {
            response = await dispatch(createTransportData({
                transportName: transportData.name.trim(),
                mobileNumber: transportData.mobileNumber.trim(),
                gst:transportData.gst.trim(),
                address:transportData.address.trim()
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
            visible={modalAddTransport}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Transport</Text>

                    <Input
                        value={transportData.name}
                        label='Transport Name'
                        placeholder='Ex. Vatan'
                        style={styles.input}
                        name="name"
                        status={error.name ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    name: false
                                }))
                            }
                            setTransportData(prev => ({ ...prev, name: e }))
                        }}
                    />
                    <Input
                        value={transportData.mobileNumber}
                        label='Mobile Number'
                        placeholder='Ex. 9019293939'
                        style={styles.input}
                        name="mobile"
                        status={error.mobileNumber ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    mobileNumber: false
                                }))
                            }
                            setTransportData(prev => ({ ...prev, mobileNumber: e }))
                        }}
                    />
                    <Input
                        value={transportData.gst}
                        label='GST Number'
                        placeholder='Ex. 22AAAAA0000A1Z5'
                        style={styles.input}
                        name="gst"
                        status={error.gst ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    gst: false
                                }))
                            }
                            setTransportData(prev => ({ ...prev, gst: e.toUpperCase() }))
                        }}
                    />
                    <Input
                        value={transportData.address}
                        label='Address'
                        placeholder='Ex. 31, Shubham Complex'
                        style={styles.input}
                        name="address"
                        status={error.address ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    address: false
                                }))
                            }
                            setTransportData(prev => ({ ...prev, address: e }))
                        }}
                    />

                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" />
                            :
                            <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Add"}</Text>
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
    placeholderStyle: {
        fontSize: 15,
        color: 'gray',
        fontFamily: ''
    },
    selectedTextStyle: {
        fontSize: 15,
    },

});