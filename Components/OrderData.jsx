import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteOrderData, updateStatus } from "../slices/order";
import { CheckBox } from "@ui-kitten/components";
import { Modal } from "react-native";

const RenderCheckboxModal = (props) => {
    const { setShowModalCheckboxes, id, setId, dispatched, billed, LR } = props
    const [isBilledChecked, setIsBilledChecked] = useState(billed);
    const [isDispatchChecked, setIsDispatchChecked] = useState(dispatched);
    const [isLrSentChecked, setIsLrSentChecked] = useState(LR);

    const dispatch = useDispatch()
    const [value, setValue] = useState("");
    const closeForm = () => {
        setShowModalCheckboxes(false)
        setId("");
    }

    const saveForm = () => {
        let data = false
        if (value == 'billed' && isBilledChecked) {
            data = true
        }
        if (value == 'dispatched' && isDispatchChecked) {
            data = true
        }
        if (value == 'LR' && isLrSentChecked) {
            data = true
        }
        dispatch(updateStatus(id, value, data))

        setId("");
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
                            onChange={(newValue) => {
                                setIsBilledChecked(newValue)
                                setValue('billed')
                            }}
                        >Billed</CheckBox>
                        <CheckBox
                            style={styles.modalCheckbox}
                            checked={isDispatchChecked}
                            onChange={(newValue) => {
                                setIsDispatchChecked(newValue)
                                setValue('dispatched')
                            }}
                        >Dispatch</CheckBox>
                        <CheckBox
                            style={styles.modalCheckbox}
                            checked={isLrSentChecked}
                            onChange={(newValue) => {
                                setIsLrSentChecked(newValue)
                                setValue('LR')
                            }}
                        >LR Sent</CheckBox>
                        <Pressable style={styles.saveButton} onPress={() => saveForm()}>
                            <Text style={styles.saveButtonText}>SAVE</Text>
                        </Pressable>
                        <Pressable style={styles.closeForm} onPress={closeForm}>
                            <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                        </Pressable>
                    </View>
                </View>
            </Modal>
        </View>
    );
};

const OrderData = (props) => {
    const [id, setId] = useState('');
    const [showModalCheckboxes, setShowModalCheckboxes] = useState(false);
    const { partyName, status, price, dispatched, billed, LR, transport, gst, updatedDate, orderChanged, _id } = props.data;
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

    const handleBookCheck = (_id) => {
        setId(_id);
        setShowModalCheckboxes(!showModalCheckboxes);
    };

    return (
        <>
            <View style={styles.container}>
                <ScrollView horizontal={true}><Text style={styles.name}>{partyName}</Text></ScrollView>
                <Text style={styles.transport}>{transport}</Text>
                <View style={styles.inline}>
                    <Text style={styles.status}>{status}</Text>
                    <View style={styles.icons}>
                        <Pressable style={styles.icon} onPress={() => props.editOrder(_id)}>
                            <Ionicons name="marker" size={24} color={'#5F4521'} />
                        </Pressable>
                        <Pressable style={styles.icon} onPress={() => handleBookCheck(_id)}>
                            <Ionicons name="book-check" size={24} color={'#5F4521'} />
                        </Pressable>
                        <Pressable style={styles.icon} onPress={deleteHandler}>
                            <Ionicons name="delete" size={24} color={'#5F4521'} />
                        </Pressable>
                    </View>
                </View>
            </View>
            {showModalCheckboxes && <RenderCheckboxModal dispatched={dispatched} billed={billed} LR={LR} id={id} setId={setId} handleBookCheck={handleBookCheck} showModalCheckboxes={showModalCheckboxes} setShowModalCheckboxes={setShowModalCheckboxes} />}
        </>
    );
};

export default OrderData;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 85,
        backgroundColor: "#f0f0f0",
        padding: 10,
        paddingBottom: 5,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        position: 'relative',
        fontWeight: 'bold'

    },
    name: {
        fontSize: 17,
        fontWeight: "bold",
        marginBottom: 5,
    },
    transport: {
        fontSize: 15,
        textAlign: 'center',
        color: "#5f4521",
        marginBottom: 3,
        position: 'absolute',
        right: 10,
        top: 5,
    },
    inline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    status: {
        fontSize: 13,
        color: "#666",
        backgroundColor: 'rgba(251, 97, 26, 0.3)',
        // width: 'auto',
        padding: 5,
        paddingHorizontal: 10,
        borderRadius: 10,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    icons: {
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
        width: '90%',
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
    modal: {
        position: 'absolute'
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    modalCheckbox: {
        marginBottom: 10,
        height: 30
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
