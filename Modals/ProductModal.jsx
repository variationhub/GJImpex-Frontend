import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { createProductData, updateProductData } from '../slices/product';

const ProductModal = (props) => {

    const { modalAddProduct, productData, isEdit, id } = props.productModalData;
    const { setModalAddProduct, setProductData, setIsEdit, setId } = props.productModalFn;

    const dispatch = useDispatch()
    const closeForm = () => {
        setProductData({
            name: "",
            description: "",
            stock: ""
        })
        setModalAddProduct(false);
        setId("")
    }

    const saveForm = (isEdit) => {
        if (isEdit) {
            dispatch(updateProductData(id, productData))
            setIsEdit(false)
        }
        else {
            dispatch(createProductData(productData))
        }
        setId('')
        closeForm();
    };

    console.log(productData)
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
                    <TextInput
                        name="name"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={productData.name}
                        onChangeText={(e) => setProductData(prev => ({ ...prev, name: e }))}
                    />
                    <TextInput
                        name="description"
                        style={styles.input}
                        placeholder="Enter description"
                        value={productData.description}
                        onChangeText={(e) => setProductData(prev => ({ ...prev, description: e }))}
                    />
                    <TextInput
                        name="stock"
                        style={styles.input}
                        inputMode="numeric"
                        placeholder="Enter stock"
                        value={String(productData.stock)}
                        onChangeText={(e) => setProductData(prev => ({ ...prev, stock: e }))}

                    />
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