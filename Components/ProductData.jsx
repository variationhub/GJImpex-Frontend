import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, Modal } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { useDispatch } from 'react-redux';
import { deleteProductData, updateStockData } from "../slices/product";
import CSS from '../styles/gloable.json'
import { Input } from "@ui-kitten/components";


const RenderCheckboxModal = (props) => {
    const { setShowModalCheckboxes, productId, setProductId } = props

    const dispatch = useDispatch();

    const [value, setValue] = useState({
        stock: "",
        price: ""
    })

    const closeForm = () => {
        setShowModalCheckboxes(false)
        setProductId("");
    }
    const [error, setError] = useState({
        stock: false,
        price: false
    });

    const saveForm = () => {

        if (!value.stock || !value.price) {
            if (!value.stock) {
                setError((prev) => ({ ...prev, stock: true }))
            }

            if (!value.price) {
                setError((prev) => ({ ...prev, price: true }))
            }
            return;
        }

        const data = {
            stock: Number(value.stock),
            price: Number(value.price)
        }

        const response = dispatch(updateStockData(productId, data));
        if (response) {
            closeForm();
        }
    };

    return (
        <View style={[styles.centeredView, styles.modal]}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={true}>
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <View style={{ display: "flex", flexDirection: "row", justifyContent: "space-between" }}>
                            <Text style={[styles.modalTitle, { fontSize: 16 }]}>Add Stock</Text>
                            <Pressable style={styles} onPress={closeForm}>
                                <Ionicons style={styles.closeIcon} name="close" size={24} color={'#5F4521'} />
                            </Pressable>
                        </View>
                        <View style={{ display: "flex", flexDirection: "row", alignItems: "center", justifyContent: "space-between" }}>
                            <Input
                                value={value.stock}
                                label='Stock'
                                status={error.stock ? "danger" : "basic"}
                                placeholder='Ex. 50'
                                keyboardType="numeric"
                                style={styles.inputStock}
                                onChangeText={(e) => {
                                    setValue((prev) => ({ ...prev, stock: e }))
                                    setError((prev) => ({ ...prev, stock: false }))
                                }}
                            />
                            <Input
                                value={value.price}
                                label='Purcha price'
                                status={error.price ? "danger" : "basic"}
                                keyboardType="numeric"
                                placeholder='Ex. 200'
                                style={styles.inputStock}
                                onChangeText={(e) => {
                                    setValue((prev) => ({ ...prev, price: e }))
                                    setError((prev) => ({ ...prev, price: false }))
                                }}
                            />
                        </View>
                        <View style={styles.button}>
                            <Pressable style={styles.saveButton} onPress={saveForm}>
                                <Text style={styles.saveButtonText}>ADD</Text>
                            </Pressable>
                        </View>

                    </View>
                </View>
            </Modal>
        </View>
    );
};


const ProductData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { productName, productType, stock, id, index } = props.data;
    const [productId, setProductId] = useState("");
    const [showModalCheckboxes, setShowModalCheckboxes] = useState(false);
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteProductData(id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    const handleAddProduct = (id) => {
        setProductId(id);
        setShowModalCheckboxes(!showModalCheckboxes);
    };

    return (
        <View style={[styles.container, CSS.card]}>
            <View style={styles.firstLine}>
                {/* style={{ display: "flex", flexDirection: "row", alignItems: "center" }} */}
                <View style={styles.index}>
                    <Text style={styles.indexText}>{index + 1}</Text>
                </View>
                <View style={styles.stockParent}>
                    <Text style={styles.stock}>{stock}</Text>
                </View>
            </View>
            <View style={styles.secoundLine}>
                <View style={styles.logo}>
                    <MaterialIcons name="local-grocery-store" size={26} color={CSS.primaryColor} />
                </View>
                <View style={styles.nameContact}>
                    <Text style={styles.name} numberOfLines={1}>{productName} </Text>
                    <Text style={styles.mobileNumber}>{productType}</Text>
                </View>
                <View style={styles.icons}>
                    <Pressable style={styles.iconEdit} onPress={() => props.editProduct(id)}>
                        <FontAwesome5 name="edit" size={14} color={'white'} />
                    </Pressable>
                    <Pressable style={styles.iconDelete} onPress={() => handleAddProduct(id)}>
                        <Ionicons name="clipboard-plus-outline" size={18} color={CSS.primaryColor} />
                    </Pressable>
                    <Pressable style={styles.iconDelete} onPress={deleteHandler}>
                        <Ionicons name="delete" size={16} color={CSS.primaryColor} />
                    </Pressable>
                </View>
            </View>
            {showModalCheckboxes && <RenderCheckboxModal productId={productId} setProductId={setProductId} handleAddProduct={handleAddProduct} showModalCheckboxes={showModalCheckboxes} setShowModalCheckboxes={setShowModalCheckboxes} />}
        </View>

    );
};

export default ProductData;

const styles = StyleSheet.create({
    container: {
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
        marginRight: 'auto',
        marginLeft: 25
    },
    name: {
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
    stock: {
        fontSize: 14,
        fontWeight: '900',
        color: CSS.primaryColor,
    },
    stockParent: {
        position: 'absolute',
        top: 0,
        right: "35%",
        display: 'flex',
        backgroundColor: 'rgba(240, 97, 26, 0.2)',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottomLeftRadius: 12,
        borderBottomRightRadius: 12,
        paddingVertical: 2,
        paddingHorizontal: 10
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
    secoundLine: {
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
        padding: 25,
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
        marginBottom: 10,
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
        width: '100%',
        padding: 10,
    },
    saveButtonText: {
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
    inputStock: {
        borderWidth: 1,
        width: "47%",
        marginBottom: 10
    }
});
