import React, { useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { createOrderData, updateOrderData } from '../slices/order';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchProductData } from '../slices/product';


const OrderModal = (props) => {
    const { modalAddOrder, orderData, isEdit, id, products } = props.orderModalData;
    const { setModalAddOrder, setOrderData, setIsEdit, setId, setProduct } = props.orderModalFn;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductData());
    }, []);

    const { data } = useSelector((state) => state.product);

    const [loading, setLoading] = useState(false);

    const openForm = () => {
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { _id: id, productName: "", quantity: "", sellPrice: "", total: 0 } }))
    }

    const removeItem = (id) => {
        delete products[id];
        setProduct({ ...products })
    }

    const handleChange = (id, name, value) => {
        setProduct((prev) => ({ ...prev, [id]: { ...prev[id], [name]: value } }))
    }

    useEffect(() => {
        const total = Object.values(products)?.reduce((acc, item) => {
            return acc + Number(item.sellPrice * item.quantity)
        }, 0)
        setOrderData((prev) => ({ ...prev, total: total }))
    }, [products]);

    const closeForm = () => {
        setOrderData({
            name: "",
            transport: "",
            gst: "",
            gstPrice: "",
            total: 0
        });
        setModalAddOrder(false);
        setId("")
        const id = Date.now();
        setProduct({ [id]: { _id: id, productName: "", quantity: "", sellPrice: "", total: "" } })
        setIsEdit(false);
    };

    const saveForm = async (isEdit) => {
        const data = {
            partyName: orderData.name.trim(),
            transport: orderData.transport.trim(),
            orders: Object.values(products)?.map((item) => {
                return {
                    productName: item.productName,
                    quantity: item.quantity,
                    sellPrice: item.sellPrice
                }
            }),
            gst: orderData.gst,
            gstPrice: orderData.gstPrice
        }
        setLoading(true);
        let response = false;
        if (isEdit) {
            response = await dispatch(updateOrderData(id, data));
        } else {
            response = await dispatch(createOrderData(data));
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
                                <View key={item._id}>
                                    <View style={styles.productAndMinus} >
                                        <Dropdown
                                            style={styles.dropdown}
                                            placeholderStyle={styles.placeholderStyle}
                                            selectedTextStyle={styles.selectedTextStyle}
                                            inputSearchStyle={styles.inputSearchStyle}
                                            data={data}
                                            maxHeight={300}
                                            labelField="productName"
                                            valueField="productName"
                                            value={item.productName}
                                            placeholder="Select product"
                                            onChange={(e) => handleChange(item._id, "productName", e.productName)}

                                        />
                                        <Pressable style={styles.minus} onPress={() => removeItem(item._id)}>
                                            <Ionicons name="minus" size={20} color={'white'} />
                                        </Pressable>
                                    </View>
                                    <View style={styles.inlineInput}>
                                        <TextInput
                                            name="quantity"
                                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                                            inputMode="numeric"
                                            placeholder="Quantity"
                                            value={String(item.quantity)}
                                            onChangeText={(e) => handleChange(item._id, "quantity", Number(e))}
                                        />
                                        <TextInput
                                            name="sellPrice"
                                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                                            inputMode="numeric"
                                            placeholder="Price"
                                            value={String(item.sellPrice)}
                                            onChangeText={(e) => handleChange(item._id, "sellPrice", Number(e))}
                                        />
                                        <TextInput
                                            name="total"
                                            style={[styles.input, { flex: 1 }]}
                                            value={(Number(item.quantity) * Number(item.sellPrice)).toFixed(2)}
                                            placeholder='Total Value'
                                            editable={false}
                                        ></TextInput>
                                    </View>
                                </View>
                            )
                        })}
                    </ScrollView>
                    <View style={styles.inlineInput2}>
                        <TextInput
                            name="gstPrice"
                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                            placeholder="GST Amount"
                            keyboardType="numeric"
                            value={String(orderData.gstPrice)}
                            onChangeText={(e) => setOrderData(prev => ({ ...prev, gstPrice: e }))}
                        />
                        <TextInput
                            name="gst"
                            style={[styles.gst, { flex: 1, marginRight: 10 }]}
                            placeholder="GST %"
                            inputMode="numeric"
                            value={String(orderData.gst)}
                            onChangeText={(e) => setOrderData(prev => ({ ...prev, gst: e }))}
                        />
                        <TextInput
                            name="total"
                            placeholder="Total Value"
                            style={[styles.input, { flex: 1, marginRight: 10 }]}
                            value={String(orderData.total + (Number((Number(orderData.gstPrice) / Number(orderData.gst || 1))).toFixed(2)))}
                            editable={false}
                        />
                    </View>
                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {
                            loading ? <ActivityIndicator color="#ffffff" />
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
        padding: 12,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: 'whitesmoke'
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
    inlineInput2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gst: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
        maxWidth: 65
    }
});
