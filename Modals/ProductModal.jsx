import React, { useRef, useState } from 'react'
import { StyleSheet, View, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { createProductData, updateProductData } from '../slices/product';
import { modelSlice } from '../slices/model';
import { Input, Text } from '@ui-kitten/components';

const ProductModal = (props) => {

    const { modalAddProduct, productData, isEdit, id } = props.productModalData;
    const { setModalAddProduct, setProductData, setIsEdit, setId } = props.productModalFn;

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()

    const productName = useRef();
    const productType = useRef();
    const stock = useRef();
    const minStock = useRef();
    const price = useRef();

    const [error, setError] = useState({
        productName: false,
        stock: false,
        minStock: false,
        price: false
    });

    const closeForm = () => {
        setProductData({
            productName: "",
            productType: "",
            stock: "",
            minStock: "",
            price: ""

        })
        setModalAddProduct(false);
        setId("")
        setIsEdit(false);
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(productData).forEach(key => {
            if ((key === "stock" || key === "price") && !isEdit) {
                if (!productData[key]) {
                    setError((prev) => ({ ...prev, [key]: true }))
                    button = true;
                }
            }
        })

        return button;
    }

    const saveForm = async (isEdit) => {

        if (checkAllFieldfilled()) {
            return;
        }

        let resposne = false;
        setLoading(true);

        if (!productData.productName.trim()) {
            dispatch(modelSlice.actions.setModel({ visible: true, message: "Product name is required" }));
            setLoading(false);
            return;
        }

        const data = {
            productName: productData.productName.trim(),
            productType: productData.productType.trim(),
            productPriceHistory: [{
                price: productData.price,
                stock: productData.stock
            }],
            minStock: productData.minStock,
        }
        if (isEdit) {
            resposne = await dispatch(updateProductData(id, {
                productName: productData.productName.trim(),
                productType: productData.productType.trim(),
                minStock: productData.minStock,
            }))
        }
        else {
            resposne = await dispatch(createProductData(data))
        }
        if (resposne) {
            closeForm();
        }
        setLoading(false);
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddProduct}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Product</Text>
                    <Input
                        value={productData.productName}
                        label='Product Name'
                        status={error.productName ? "danger" : "basic"}
                        placeholder='Ex. loadcell'
                        style={styles.input}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    productName: false
                                }))
                            } setProductData(prev => ({ ...prev, productName: e }))
                        }}
                        ref={productName}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            productType.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    <Input
                        value={productData.productType}
                        label='Product Description'
                        placeholder='Ex. 200Kg'
                        style={styles.input}
                        onChangeText={(e) => setProductData(prev => ({ ...prev, productType: e }))}
                        ref={productType}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            stock.current.focus();
                        }}
                        blurOnSubmit={false}
                    />

                    {!isEdit &&

                        <Input
                            value={String(productData.stock)}
                            label='Stock'
                            placeholder='Ex. 50'
                            style={styles.input}
                            status={error.stock ? "danger" : "basic"}
                            inputMode='numeric'
                            onChangeText={(e) => {
                                if (e) {
                                    setError((prev) => ({
                                        ...prev,
                                        stock: false
                                    }))
                                }
                                setProductData(prev => ({ ...prev, stock: Number(e) }))
                            }}
                            ref={stock}
                            returnKeyType='next'
                            onSubmitEditing={() => {
                                minStock.current.focus();
                            }}
                            blurOnSubmit={false}
                        />
                    }
                    <Input
                        value={String(productData.minStock)}
                        label='Minimum Stock'
                        placeholder='Ex. 50'
                        style={styles.input}
                        status={error.minStock ? "danger" : "basic"}
                        inputMode='numeric'
                        onChangeText={(e) => {
                            if (e) {
                                setError((prev) => ({
                                    ...prev,
                                    minStock: false
                                }))
                            }
                            setProductData(prev => ({ ...prev, minStock: Number(e) }))
                        }}
                        ref={minStock}
                        returnKeyType='next'
                        onSubmitEditing={() => {
                            price.current.focus();
                        }}
                        blurOnSubmit={false}
                    />
                    {!isEdit &&
                        <Input
                            value={String(productData.price)}
                            label='Purchase Price'
                            placeholder='Ex. 50'
                            status={error.price ? "danger" : "basic"}
                            style={styles.input}
                            inputMode='numeric'
                            onChangeText={(e) => {
                                if (e) {
                                    setError((prev) => ({
                                        ...prev,
                                        price: false
                                    }))
                                } setProductData(prev => ({ ...prev, price: Number(e) }))
                            }}
                            ref={price}
                        />
                    }

                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" /> :
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

export default ProductModal

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
        borderWidth: 1,
        borderColor: '#5F4521',
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
