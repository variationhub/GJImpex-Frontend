import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Pressable, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteOrderData } from "../slices/order";
import { CheckBox } from "@ui-kitten/components";
import { Modal } from "react-native";

const RenderCheckboxModal = (props) => {
    const { showModalCheckboxes, setShowModalCheckboxes, handleBookCheck } = props
    const [isBilledChecked, setIsBilledChecked] = useState(false);
    const [isDispatchChecked, setIsDispatchChecked] = useState(false);
    const [isLrSentChecked, setIsLrSentChecked] = useState(false);
    const closeForm = () => {
       
    }

    const saveForm = () => {
        console.log();
    
        closeForm();
    };
    return (
        <View style={[styles.centeredView, styles.modal]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text style={styles.modalTitle}>Update Status</Text>
                        <CheckBox
                            style={styles.modalCheckbox}
                            checked={isBilledChecked}
                            onChange={(newValue) => setIsBilledChecked(newValue)}
                        >Billed</CheckBox>
                        <CheckBox
                            style={styles.modalCheckbox}
                            checked={isDispatchChecked}
                            onChange={(newValue) => setIsDispatchChecked(newValue)}
                        >Dispatch</CheckBox>
                        <CheckBox
                            style={styles.modalCheckbox}
                            checked={isLrSentChecked}
                            onChange={(newValue) => setIsLrSentChecked(newValue)}
                        >LR Sent</CheckBox>
                    <TouchableOpacity style={styles.saveButton} onPress={() => saveForm()}>
                        <Text style={styles.saveButtonText}>SAVE</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const OrderData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);
    const [showModalCheckboxes, setShowModalCheckboxes] = useState(false); // State for checkbox modal visibility

    const { partyName, status, price, LR, transport, gst, updatedDate, orderChanged, _id } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteOrderData(_id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }
    const handleBookCheck = () => {
        setShowModalCheckboxes(!showModalCheckboxes);
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView horizontal={true}><Text style={styles.name}>{partyName}</Text></ScrollView>
                <Text style={styles.product}>{status}</Text>
                <Text style={styles.quantity}>{LR}</Text>
                <View style={styles.icons}>
                    <TouchableOpacity style={styles.icon} onPress={() => props.editOrder(_id)}>
                        <Ionicons name="marker" size={24} color={'#5F4521'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={handleBookCheck}>
                        <Ionicons name="book-check" size={24} color={'#5F4521'} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.icon} onPress={deleteHandler}>
                        <Ionicons name="delete" size={24} color={'#5F4521'} />
                    </TouchableOpacity>
                </View>
            </View>
            {showModalCheckboxes && <RenderCheckboxModal handleBookCheck={handleBookCheck} showModalCheckboxes={showModalCheckboxes} setShowModalCheckboxes={setShowModalCheckboxes} />}
        </>
    );
};

export default OrderData;


const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 80,
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        position: 'relative',
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        width: '70%',
        // overflow: 'scroll',
    },
    stock: {
        fontSize: 15,
        padding: 4,
        backgroundColor: 'rgba(251, 97, 26, 0.3)',
        width: 80,
        textAlign: 'center',
        color: "#5f4521",
        marginBottom: 3,
        position: 'absolute',
        borderRadius: 10,
        fontWeight: 'bold',
        right: 10,
        top: 5,
    },
    description: {
        fontSize: 13,
        color: "#666",

    },
    icons: {
        position: 'absolute',
        right: 0,
        bottom: 6,
        flexDirection: 'row',
        gap: 0,
        color: '#5f4521',
    },
    icon: {
        padding: 10,
        paddingBottom: 2
    },
    quantity: {
        textAlign: 'center'
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 22,
    },
    modalView: {
        width:'90%',
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modal:{
        position:'absolute'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalCheckbox: {
        marginBottom: 10,
        height:30
    },
    modalButton: {
        marginTop: 20,
        backgroundColor: '#5F4521',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    modalButtonText: {
        color: 'white',
        fontSize: 16,
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
    closeForm: {
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
    closeModal: {
        display: 'flex',
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
});
