import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from 'react-redux';
import { deleteOrderData, updateStatus } from "../slices/order";
import CSS from '../styles/gloable.json'
import { Modal } from "react-native";
import { CheckBox } from "@ui-kitten/components";

const RenderCheckboxModal = (props) => {
    const { setShowModalCheckboxes, orderId, setId, dispatched, billed, LR } = props
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
        dispatch(updateStatus(orderId, value, data))

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
    const [modalDelete, setModalDelete] = useState(false);
    const [orderId, setOrderId] = useState('');
    const [showModalCheckboxes, setShowModalCheckboxes] = useState(false);

    const { party, mobileNumber, status, dispatched, billed, LR, id, index} = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteOrderData(id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    const handleBookCheck = (id) => {
        setOrderId(id);
        setShowModalCheckboxes(!showModalCheckboxes);
    };

    return (
        <View style={[styles.container, CSS.card]}>
            <View style={styles.firstLine}>
                {/* style={{ display: "flex", flexDirection: "row", alignItems: "center" }} */}
                <View style={styles.index}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.statusParent}>
                    <Text style={styles.status}>{status}</Text>
                </View>
            </View>
            <View style={styles.secondLine}>
                <View style={styles.logo}>
                    <FontAwesome5 name="money-bill-wave" size={22} color={CSS.primaryColor} />
                </View>
                <View style={styles.nameContact}>
                    <Text style={styles.name} numberOfLines={1}>{party?.partyName} </Text>
                    <Text style={styles.mobileNumber}>{party?.mobileNumber}</Text>
                </View>
                <View style={styles.icons}>
                    <Pressable style={styles.iconEdit} onPress={() => props.editOrder(id)}>
                        <FontAwesome5 name="edit" size={14} color={'white'} />
                    </Pressable>
                    <Pressable style={styles.iconDelete} onPress={() => handleBookCheck(id)}>
                        <Ionicons name="book-check" size={18} color={CSS.primaryColor} />
                    </Pressable>
                    <Pressable style={styles.iconDelete} onPress={deleteHandler}>
                        <Ionicons name="delete" size={18} color={CSS.primaryColor} />
                    </Pressable>
                </View>
            </View>
            {showModalCheckboxes && <RenderCheckboxModal dispatched={dispatched} billed={billed} LR={LR} orderId={orderId} setOrderId={setOrderId} handleBookCheck={handleBookCheck} showModalCheckboxes={showModalCheckboxes} setShowModalCheckboxes={setShowModalCheckboxes} setId={props.setId} />}

        </View>

    );
};

export default OrderData;

const styles = StyleSheet.create({
    container: {
        paddingVertical: 8,
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "column",
        position:'relative'
    },
    firstLine: {
        width:'100%',
        display:'flex',
        position:'absolute',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    index: {
        width: 30,
        height: 30,
        borderTopLeftRadius:12,
        borderBottomRightRadius: 50,
        backgroundColor: CSS.primaryColor,
        justifyContent: "center",
        alignItems: "center",
    },
    indexText:{
        top:3,
        left:8,
        position: 'absolute',
        color:'white',
        fontWeight:'bold',
    },
    nameContact: {
        display: "flex",
        flexDirection: "column",
        marginRight: 'auto',
        marginLeft: 15
    },
    name: {
        fontFamily:'Ubuntu-Title',
        fontSize: 15,
        fontWeight: "bold",
        color: CSS.secondaryColor,
    },
    mobileNumber: {
        fontSize: 13,
        color: "#666",
    },
    logo: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius:50,
        backgroundColor: "rgba(240, 97, 26, 0.2)",
    },
    status: {
        fontSize: 12,
        fontWeight: '900',
        color: CSS.primaryColor,
    },
    statusParent:{
        top: 0,
        position: 'absolute',
        right: 100,
        display:'flex',
        backgroundColor:'rgba(240, 97, 26, 0.2)',
        alignItems:'center',
        justifyContent:'center',
        borderBottomLeftRadius:15,
        borderBottomRightRadius:15,
        width:'18%',
        padding:5
    },
    icons: {
        flexDirection: 'row',
        gap: 3,
    },
    iconEdit: {
        height:35,
        width:35,
        backgroundColor: CSS.primaryColor,
        borderRadius: 40,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconDelete: {
        height:35,
        width:35,
        backgroundColor: 'white',
        borderWidth:2,
        borderColor: CSS.primaryColor,
        borderRadius: 40,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    first: {
        flex: 0,
        borderRadius: 50,
        height: 40,
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '7%',
        backgroundColor: 'rgba(251, 97, 26, 0.2)'
    },
    secondLine: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection: "row",
        paddingHorizontal:15,
        paddingVertical:20
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
