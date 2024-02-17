import React, { useState } from 'react'
import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { createProductData, updateProductData } from '../slices/product';
import { modelSlice } from '../slices/model';

const ProductModal = (props) => {

    const { modalAddProduct, productData, isEdit, id } = props.productModalData;
    const { setModalAddProduct, setProductData, setIsEdit, setId } = props.productModalFn;

    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch()
    const closeForm = () => {
        setProductData({
            productName: "",
            description: "",
            stock: ""
        })
        setModalAddProduct(false);
        setId("")
        setIsEdit(false);
    }

    const saveForm = async (isEdit) => {
        let resposne = false;
        setLoading(true);

        if(!productData.productName.trim()){
            dispatch(modelSlice.actions.setModel({visible:true, message:"Product name is required"}));
            setLoading(false);
            return;
        }
        if (isEdit) {
            resposne = await dispatch(updateProductData(id, {
                productName: productData.productName.trim(),
                description: productData.description.trim(),
                stock: productData.stock
            }))
        }
        else {
            resposne = await dispatch(createProductData(productData))
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
                    <TextInput
                        name="productName"
                        style={styles.input}
                        placeholder="Enter full name"
                        value={productData.productName}
                        onChangeText={(e) => setProductData(prev => ({ ...prev, productName: e }))}
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
                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" /> :
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