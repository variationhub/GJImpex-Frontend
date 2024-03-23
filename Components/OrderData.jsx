import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, TextInput } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from 'react-redux';
import { deleteOrderData, updateStatus } from "../slices/order";
import CSS from '../styles/gloable.json'
import { Modal } from "react-native";
import { Input } from "@ui-kitten/components";
import CheckBox from 'react-native-check-box'


const RenderCheckboxModal = (props) => {
    const { setShowModalCheckboxes, orderId, setId, dispatched, billed, lrSent, billNumber, role } = props
    const [isBilledChecked, setIsBilledChecked] = useState(billed);
    const [isDispatchChecked, setIsDispatchChecked] = useState(dispatched);
    const [isLrSentChecked, setIsLrSentChecked] = useState(lrSent);
    const [billNo, setBillNumber] = useState(billNumber || "");
    const dispatch = useDispatch();

    const closeForm = () => {
        setShowModalCheckboxes(false)
        setId("");
    }
    const [error, setError] = useState(false);

    const saveForm = () => {
        if (!billNo) {
            setError(true);
            setTimeout(() => {
                setError(false)
            }, 2000)
            return;
        }

        if (isLrSentChecked) {
            dispatch(updateStatus(orderId, 'lrSent', { isBilledChecked, billNo }))
        }
        else if (isDispatchChecked) {
            dispatch(updateStatus(orderId, 'dispatched', { isBilledChecked, billNo }))
        }
        else if (isBilledChecked && billNo.trim() !== '') {
            dispatch(updateStatus(orderId, 'billed', { isBilledChecked, billNumber: billNo }))
        }

        closeForm();
    };

    const reset = (e) => {
        e.stopPropagation()
        Alert.alert('Reset ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Reset', onPress: () => dispatch(updateStatus(orderId, 'billed', { isBilledChecked: false, billNo })) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
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
                            onClick={() => {
                                if (role === "Accountant" || role === "Admin")
                                    setIsBilledChecked(!isBilledChecked)
                            }}
                            isChecked={isBilledChecked}
                            disabled={billed}
                            rightText={"Billed"}
                            style={styles.modalCheckbox}
                            checkBoxColor="#5F4521"
                            checkedCheckBoxColor={billed ? "lightgray" : "#FB611A"}
                            uncheckedCheckBoxColor={billed ? "lightgray" : "#5F4521"}

                        />
                        {isBilledChecked && (
                            <Input
                                style={styles.input}
                                value={billNo}
                                disabled={billed}
                                onChangeText={setBillNumber}
                                status={error ? "danger" : "basic"}
                                placeholder="Enter Bill Number"
                            />
                        )}
                        <CheckBox
                            onClick={() => {
                                if (role === "Dispatcher" || role === "Admin") {
                                    setIsDispatchChecked(!isDispatchChecked)
                                }
                            }}
                            isChecked={isDispatchChecked}
                            disabled={!billed || dispatched}
                            rightText={"Dispatch"}
                            style={styles.modalCheckbox}
                            checkBoxColor="#5F4521"
                            checkedCheckBoxColor={(!billed || dispatched) ? "lightgray" : "#FB611A"}
                            uncheckedCheckBoxColor={(!billed || dispatched) ? "lightgray" : "#5F4521"}
                        />

                        <CheckBox
                            onClick={() => {
                                if (role === "Sales" || role === "Admin") {
                                    setIsLrSentChecked(!isLrSentChecked)
                                }
                            }}
                            isChecked={isLrSentChecked}
                            disabled={!billed || !dispatched || lrSent}
                            rightText={"LR Sent"}
                            style={styles.modalCheckbox}
                            checkBoxColor="#5F4521"
                            checkedCheckBoxColor={(!billed || !dispatched || lrSent) ? "lightgray" : "#FB611A"}
                            uncheckedCheckBoxColor={(!billed || !dispatched || lrSent) ? "lightgray" : "#5F4521"}

                        />
                        <View style={styles.button}>
                            <Pressable style={styles.resetButton} onPress={reset}>
                                <Text style={styles.resetButtonText}>RESET</Text>
                            </Pressable>
                            <Pressable style={styles.saveButton} onPress={saveForm}>
                                <Text style={styles.saveButtonText}>SAVE</Text>
                            </Pressable>
                        </View>
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
    const [orderId, setOrderId] = useState('');
    const [showModalCheckboxes, setShowModalCheckboxes] = useState(false);
    const { party, changed, status, billNumber, dispatched, billed, lrSent, id, index, user, login, pending = false } = props.data;
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
                <View style={styles.index}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                {status === 'BILLING' &&
                    <View style={styles.statusParent}>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                }
                {status === 'DISPATCHING' &&
                    <View style={styles.statusDispatching}>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                }
                {status === 'LR PENDING' &&
                    <View style={styles.statusLR}>
                        <Text style={styles.status}>{status}</Text>
                    </View>
                }
            </View>
            <View style={styles.secondLine}>
                <View style={styles.logo}>
                    <FontAwesome5 name="money-bill-wave" size={22} color={CSS.primaryColor} />
                </View>
                <View style={styles.nameContact}>
                    <Pressable onPress={() => props.editOrder(id, true)} >
                        <Text style={styles.name} numberOfLines={1}>{party?.partyName} </Text>
                        <Text style={styles.mobileNumber}>{party?.mobileNumber}</Text>
                    </Pressable>
                </View>
                <View style={styles.icons}>
                    <Pressable disabled={user?.id !== login.id} style={user?.id !== login.id ? styles.iconEditDisable : styles.iconEdit} onPress={() => props.editOrder(id)}>
                        <FontAwesome5 name="edit" size={14} color={'white'} />
                    </Pressable>
                    {!pending &&
                        <Pressable style={styles.iconDelete} onPress={() => handleBookCheck(id)}>
                            <Ionicons name="book-check" size={18} color={CSS.primaryColor} />
                        </Pressable>
                    }
                    <Pressable disabled={user?.id !== login.id} style={user?.id !== login.id ? styles.iconDeleteDisable : styles.iconDelete} onPress={deleteHandler}>
                        <Ionicons name="delete" size={18} color={CSS.primaryColor} />
                    </Pressable>
                </View>
            </View>
            {changed &&
                <View style={styles.statusParentChanged}>
                    <Text style={styles.statusChanged}>Order changed</Text>
                </View>
            }
            {showModalCheckboxes && <RenderCheckboxModal billNumber={billNumber} dispatched={dispatched} billed={billed} lrSent={lrSent} orderId={orderId} role={login?.role} setOrderId={setOrderId} handleBookCheck={handleBookCheck} showModalCheckboxes={showModalCheckboxes} setShowModalCheckboxes={setShowModalCheckboxes} setId={props.setId} />}
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
        position: 'relative'
    },
    firstLine: {
        width: '100%',
        display: 'flex',
        position: 'absolute',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    index: {
        width: 30,
        height: 30,
        borderTopLeftRadius: 12,
        borderBottomRightRadius: 50,
        backgroundColor: CSS.primaryColor,
        justifyContent: "center",
        alignItems: "center",
    },
    indexText: {
        top: 3,
        left: 8,
        position: 'absolute',
        color: 'white',
        fontWeight: 'bold',
    },
    nameContact: {
        display: "flex",
        flexDirection: "column",
        marginRight: "auto",
        marginLeft: 10
    },
    name: {
        // fontFamily: 'Ubuntu-Title',
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
        borderRadius: 50,
        backgroundColor: "rgba(240, 97, 26, 0.2)",
    },
    status: {
        fontSize: 12,
        fontWeight: '900',
        color: 'white',
        paddingHorizontal: 5
    },
    // statusD: {
    //     fontSize: 12,
    //     fontWeight: '900',
    //     color: '',
    //     paddingHorizontal: 5
    // },
    // statusL: {
    //     fontSize: 12,
    //     fontWeight: '900',
    //     color: '',
    //     paddingHorizontal: 5
    // },
    statusChanged: {
        fontSize: 12,
        fontWeight: '900',
        color: 'white',
        textTransform: 'uppercase'
    },
    statusParentChanged: {
        bottom: 0,
        position: 'absolute',
        right: 0,
        display: 'flex',
        backgroundColor: 'maroon',
        alignItems: 'center',
        justifyContent: 'center',
        borderTopLeftRadius: 15,
        borderBottomRightRadius: 12,
        width: '40%',
        padding: 5,
    },
    statusParent: {
        top: 0,
        position: 'absolute',
        left: 40,
        display: 'flex',
        backgroundColor: 'rgba(255, 0, 0, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        minWidth: 80,
        padding: 5
    },
    statusDispatching: {
        top: 0,
        position: 'absolute',
        left: 120,
        display: 'flex',
        backgroundColor: 'rgba(0, 0, 255, 0.8)',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        minWidth: 80,
        padding: 5
    },
    statusLR:{
        top: 0,
        position: 'absolute',
        left: 220,
        display: 'flex',
        backgroundColor: 'rgba(15, 150, 100, 1)',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 15,
        borderBottomRightRadius: 15,
        minWidth: 80,
        padding: 5
    },
    icons: {
        flexDirection: 'row',
        gap: 3,
    },
    iconEdit: {
        height: 35,
        width: 35,
        backgroundColor: CSS.primaryColor,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconEditDisable: {
        height: 35,
        width: 35,
        backgroundColor: CSS.primaryColor,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.4
    },
    iconDelete: {
        height: 35,
        width: 35,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: CSS.primaryColor,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconDeleteDisable: {
        height: 35,
        width: 35,
        backgroundColor: 'white',
        borderWidth: 2,
        borderColor: CSS.primaryColor,
        borderRadius: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        opacity: 0.4
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
        alignItems: 'center',
        flexDirection: "row",
        paddingHorizontal: 15,
        paddingVertical: 20
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
    button: {
        justifyContent: 'space-between',
        display: 'flex',
        flexDirection: 'row',
        width: '100%',
    },
    saveButton: {
        backgroundColor: '#5F4521',
        borderRadius: 5,
        width: '45%',
        padding: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
    },
    resetButton: {
        backgroundColor: '#5F4521',
        borderRadius: 5,
        width: '45%',
        padding: 10,
    },
    resetButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center'
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
    input: {
        borderWidth: 1,
        marginBottom: 18
    }
});
