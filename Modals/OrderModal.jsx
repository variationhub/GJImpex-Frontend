import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { createOrderData, updateOrderData } from '../slices/order';
import { Dropdown } from 'react-native-element-dropdown';

const OrderModal = (props) => {

    const { modalAddOrder, orderData, isEdit, id } = props.orderModalData;
    const { setModalAddOrder, setOrderData, setIsEdit, setId } = props.orderModalFn;

    const dispatch = useDispatch()
    const { products } = useSelector((state) => state.product)
    const closeForm = () => {
        setOrderData({
            name: "",
            product:"",
            quantity: "",
            value:"",
            transport: "",
            gstPrice:"",
        })
        setModalAddOrder(false);
    }

    const saveForm = (isEdit) => {
        console.log(orderData);
        if(isEdit){
            dispatch(updateOrderData(id, orderData))
            setIsEdit(false)
            setId('')
        }
        else{
            dispatch(createOrderData(orderData))
        }
        closeForm();
    };

    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddOrder}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Order</Text>
                    <TextInput
                        name="name"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={orderData.name}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, name: e }))}
                    />
                    <TextInput
                        name="product"
                        style={styles.input}
                        placeholder="Enter Product"
                        value={orderData.product}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, product: e }))}
                    />
                    <Dropdown
                        style={[styles.dropdown, isFocus && { borderColor: 'gray' }]}
                        placeholderStyle={styles.placeholderStyle}
                        selectedTextStyle={styles.selectedTextStyle}
                        inputSearchStyle={styles.inputSearchStyle}
                        data={products}
                        maxHeight={300}
                        labelField="name"
                        valueField="name"
                        placeholder={!isFocus ? 'Select item' : '...'}
                        value={products}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={(e) => setOrderData(prev => ({ ...prev, product: e.value }))}
                    />
                    <TextInput
                        name="quantity"
                        style={styles.input}
                        keyboardType="numeric"
                        placeholder="Enter quantity"
                        value={orderData.quantity}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, quantity: e }))}
                    />
                    <TextInput
                        name="price"
                        style={styles.input}
                        placeholder="Enter price"
                        value={orderData.price}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, price: e }))}
                    />
                    <TextInput
                        name="transport"
                        style={styles.input}
                        placeholder="Enter transport name"
                        value={orderData.transport}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, transport: e }))}
                    />
                    <TextInput
                        name="gst"
                        style={styles.input}
                        placeholder="Enter gst in percentage"
                        value={orderData.gst}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, gst: e }))}
                    />
                    <TouchableOpacity style={styles.saveButton} onPress={() => saveForm(isEdit)}>
                        <Text style={styles.saveButtonText}>{isEdit ? "Update" :"Create"}</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default OrderModal

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