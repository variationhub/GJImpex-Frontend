import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, TextInput, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { createOrderData, updateOrderData } from '../slices/order';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchProductData } from '../slices/product';


const OrderModal = (props) => {
    const { modalAddOrder, orderData, isEdit, id } = props.orderModalData;
    const { setModalAddOrder, setOrderData, setIsEdit, setId } = props.orderModalFn;

    const dispatch = useDispatch();

    const [products, setProduct] = useState({})

    useEffect(() => {
        dispatch(fetchProductData());
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { id, productName: "", quantity: 0, sellPrice: "", total: 0 } }))
    }, []);

    const { data } = useSelector((state) => state.product);

    const openForm = () => {
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { id, productName: "", quantity: 0, sellPrice: "", total: 0 } }))

    }

    const removeItem = (id) => {
        delete products[id];
        setProduct({ ...products })
    }

    const handleChange = (id, name, value) => {
        setProduct((prev) => ({ ...prev, [id]: { ...prev[id], [name]: value } }))
    }

    const closeForm = () => {
        setOrderData({
            name: "",
            transport: "",
            gst: "",
            gstPrice: 0,
            total: 0
        });
        setModalAddOrder(false);
    };

    const saveForm = (isEdit) => {
        const data = {
            partyName : orderData.name,
            transport : orderData.transport,
            orders: Object.values(products)?.map((item)=> {
                return{
                    productName: item.productName,
                    quantity : item.quantity,
                    sellPrice: item.sellPrice
                }
            }),
            gst: orderData.gst,
            gstPrice: orderData.gstPrice
        }
        if (isEdit) {
            dispatch(updateOrderData(id, orderData));
            setIsEdit(false);
            setId('');
        } else {
            dispatch(createOrderData(data));
        }
        closeForm();
    };

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
                        placeholder="Enter Party & City name"
                        value={orderData.name}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, name: e }))}
                    />
                    <TextInput
                        name="transport"
                        style={styles.input}
                        placeholder="Enter transport name"
                        value={orderData.transport}
                        onChangeText={(e) => setOrderData(prev => ({ ...prev, transport: e }))}
                    />
                    <View style={styles.addProduct}>
                        <Text style={styles.productTitle}>{isEdit ? "Edit" : "Add"} Product </Text>
                        <Pressable style={styles.plus} onPress={openForm}>
                            <Ionicons name="plus" size={20} color={'white'} />
                        </Pressable>
                    </View>
                    <ScrollView style={styles.scrollview}>
                        {Object.values(products)?.map(item => {
                            return (
                                <>
                                    <View style={styles.productAndMinus} key={item.id}>
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            data={data}
                                            maxHeight={300}
                                            labelField="name"
                                            valueField="name"
                                            value={item.productName}
                                            placeholder="Select item"
                                            onChange={(e) => handleChange(item.id, "productName", e.name)}

                                        />
                                        <Pressable style={styles.minus} onPress={() => removeItem(item.id)}>
                                            <Ionicons name="minus" size={20} color={'white'} />
                                        </Pressable>
                                    </View>
                                    <View style={styles.inlineInput}>
                                        <TextInput
                                            name="quantity"
                                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                                            inputMode="numeric"
                                            placeholder="Quantity"
                                            value={item.quantity}
                                            onChangeText={(e) => handleChange(item.id, "quantity", Number(e))}
                                        />
                                        <TextInput
                                            name="sellPrice"
                                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                                            inputMode="numeric"
                                            placeholder="Price"
                                            value={item.sellPrice}
                                            onChangeText={(e) => handleChange(item.id, "sellPrice", Number(e))}
                                        />
                                        <TextInput
                                            name="total"
                                            style={[styles.input, { flex: 1 }]}
                                            value={(Number(item.quantity) * Number(item.sellPrice)).toFixed(2)}
                                            placeholder='Total Value'
                                            editable={false}
                                        ></TextInput>
                                    </View>
                                </>
                            )
                        })}
                    </ScrollView>
                    <View style={styles.inlineInput2}>
                        <TextInput
                            name="gstPrice"
                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                            placeholder="GST Amount"
                            inputMode="numeric"
                            value={orderData.gstPrice}
                            onChangeText={(e) => setOrderData(prev => ({ ...prev, gstPrice: e }))}
                        />
                        <TextInput
                            name="gst"
                            style={[styles.gst, { flex: 1, marginRight: 10}]}
                            placeholder="GST %"
                            inputMode="numeric"
                            value={orderData.gst}
                            onChangeText={(e) => setOrderData(prev => ({ ...prev, gst: e }))}
                        />
                        <TextInput
                            name="total"
                            placeholder="Total Value"
                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                            value={orderData.total}
                            editable={false}
                        />
                    </View>
                    <Pressable style={styles.saveButton} onPress={() => saveForm(isEdit)}>
                        <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Create"}</Text>
                    </Pressable>
                    <Pressable style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default OrderModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        width: '100%',
        height: '93%',
        elevation: 5,
        marginTop: "auto"
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
        height: 40,
        width: '85%',
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
    inlineInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    plus: {
        backgroundColor: 'darkgreen',
        borderRadius: 5,
        padding: 2,
    },
    minus: {
        backgroundColor: 'maroon',
        borderRadius: 5,
        padding: 2,
    },
    scrollview: {
        padding:12,
        borderColor:'lightgray',
        borderWidth:1,
        borderRadius:5,
        marginBottom:12,
        backgroundColor:'whitesmoke'
    },
    addProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5F4521',
    },
    productAndMinus: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 10,
    },
    inlineInput2:{
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gst:{
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        maxWidth:65
    }
});
