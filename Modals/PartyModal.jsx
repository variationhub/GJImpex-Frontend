import React, { useCallback, useEffect, useRef, useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createPartyData, updatePartyData } from '../slices/party';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Input } from '@ui-kitten/components';
import { fetchTransportData } from '../slices/transport';

const filter = (item, query) => item.transportName.toLowerCase().includes(query.toLowerCase());

const PartyModal = (props) => {

    const { modalAddParty, partyData, isEdit, id } = props.partyModalData;
    const { setModalAddParty, setPartyData, setIsEdit, setId } = props.partyModalFn;
    const transportData = useSelector(state => state.transport.data)
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [value, setValue] = React.useState(partyData.transport ? partyData.transport : []);
    const [data, setData] = React.useState(transportData);

    const [partyRef] = useState({
        partyName: useRef(),
        city: useRef(),
        mobileNumber: useRef(),
        transport: useRef(),
    })

    useEffect(() => {
        dispatch(fetchTransportData())
    }, [])

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
            transport: []
        })
        setModalAddParty(false);
        setIsEdit(false);
        setId('');
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(partyData).forEach(key => {
            if (key === "mobileNumber") {
                if (partyData[key].length !== 10) {
                    setError((prev) => ({ ...prev, [key]: true }))
                    button = true;
                }
            } else if (!partyData[key]) {
                setError((prev) => ({ ...prev, [key]: true }))
                button = true;
            }
        })

        return button;
    }

    const onSelect = useCallback((index) => {
        if (value.find(item => item.id === data[index].id)) {
            setValue(value.filter(item => item.id !== data[index].id));
        } else {
            setValue(prev => [...prev, data[index]]);
            setPartyData(prev => ({ ...prev, transport: data[index] }))
        }
    }, [data, value]);

    const onChangeText = useCallback((query) => {
        const data = transportData.filter(item => filter(item, query))
        if (data.length) {
            setData(data.filter(item => filter(item, query)));
        }
        else {
            setData(data);
        }
        setValue(query);
    }, []);

    const renderOption = (item, index) => (
        <AutocompleteItem
            key={index}
            title={item.transportName}
            style={{ width: 352 }}
        />
    );
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
                transport: value.map((item) => ({ id: item.id, transportName: item.transportName }))
            }))
        }
        else {
            response = await dispatch(createPartyData({
                partyName: partyData.partyName.trim(),
                city: partyData.city.trim(),
                mobileNumber: partyData.mobileNumber.trim(),
                transport: value.map((item) => ({ id: item.id, transportName: item.transportName }))
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
                        label='Party Name'
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
                            partyRef.city.current.focus();
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
                        keyboardType='numeric'
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
                            partyRef.transportName.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    <Autocomplete
                        placeholder='Transport..'
                        label={"Transport"}
                        style={styles.assignTo}
                        placement='inner top'
                        onSelect={onSelect}
                        onChangeText={onChangeText}
                    >
                        {data?.map(renderOption)}
                    </Autocomplete>

                    <View style={styles.multipleTransport}>
                        {value?.map((item, index, arr) => {
                            return (
                                <View style={styles.removeItem} key={item.id + index}>
                                    <Text>{item.transportName} {arr.length - 1 === index ? "" : ", "}</Text>
                                </View>)
                        })}
                    </View>

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
    },
    multipleTransport: {
        marginTop: 8,
        display: 'flex',
        flexDirection: 'row',
        gap: 4
    },
    removeItem: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    },
    removeButton: {
        width: 24,
        height: 24,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 12,
        backgroundColor: "maroon"
    }
});