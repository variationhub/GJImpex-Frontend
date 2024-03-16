import React, { useRef, useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createPartyData, updatePartyData } from '../slices/party';
import { useDispatch } from 'react-redux';
import { Dropdown } from 'react-native-element-dropdown';
import { Input, Layout, Select, SelectItem } from '@ui-kitten/components';

const PartyModal = (props) => {

    const { modalAddParty, partyData, isEdit, id, partyRoles } = props.partyModalData;
    const { setModalAddParty, setPartyData, setIsEdit, setId } = props.partyModalFn;

    const dispatch = useDispatch();

    const [loading, setLoading] = useState(false);
    const [partyRef, setPartyRef] = useState({
        partyName: useRef(),
        city: useRef(),
        mobileNumber: useRef(),
        transport: useRef(),
    })

    const [error, setError] = useState({
        partyName: false,
        city: false,
        mobileNumber: false,
        transport: false
    });

    const closeForm = () => {
        setPartyData({
            partyName: "",
            city: "",
            mobileNumber: "",
            transport: ""
        })
        setModalAddParty(false);
        setIsEdit(false);
        setId('');
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(partyData).forEach(key => {
            if (!partyData[key]) {
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
            response = await dispatch(updatePartyData(id, {
                partyName: partyData.partyName.trim(),
                city: partyData.city.trim(),
                mobileNumber: partyData.mobileNumber.trim(),
                transport: partyData.transport.trim()
            }))
        }
        else {
            response = await dispatch(createPartyData({
                partyName: partyData.partyName.trim(),
                city: partyData.city.trim(),
                mobileNumber: partyData.mobileNumber.trim(),
                transport: partyData.transport.trim()
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
            visible={modalAddParty}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Party</Text>

                    <Input
                        value={partyData.partyName}
                        label='Party partyName'
                        partyName="partyName"
                        status={error.partyName ? "danger" : "basic"}
                        placeholder='Ex. John Smith'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    partyName: false
                                }))
                            } setPartyData(prev => ({ ...prev, partyName: e }))
                        }}
                        ref={partyRef.partyName}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            partyRef.nickName.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Input
                        value={partyData.city}
                        partyName="city"
                        label='City'
                        status={error.city ? "danger" : "basic"}
                        placeholder='Ex. Surat'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    city: false
                                }))
                            } setPartyData(prev => ({ ...prev, city: e }))
                        }}
                        ref={partyRef.city}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            partyRef.mobileNumber.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Input
                        value={partyData.mobileNumber}
                        partyName="mobileNumber"
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
                            } setPartyData(prev => ({ ...prev, mobileNumber: e }))
                        }}
                        ref={partyRef.mobileNumber}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            partyRef.email.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" />
                            :
                            <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Create"}</Text>
                        }
                    </Pressable>
                    <Pressable style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} partyName="close" size={30} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default PartyModal

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