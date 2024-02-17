import { StyleSheet, View, Text, SafeAreaView, VirtualizedList, ImageBackground, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../slices/product";
import ProductData from "../Components/ProductData";
import ProductModal from "../Modals/ProductModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const ProductScreen = () => {
    const [productData, setProductData] = useState({
        productName: "",
        description: "",
        stock: "",
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.product)

    const [modalAddProduct, setModalAddProduct] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');

    const openForm = () => {
        setModalAddProduct(true);
    };
    useEffect(() => {
        dispatch(fetchProductData())
    }, [])
    const image = require('../assets/logo.png');

    const editProduct = (id) => {
        const value = data.find(value => value._id === id)

        setProductData({
            productName: value.productName,
            description: value.description,
            stock: value.stock
        })
        setIsEdit(true)
        setId(id)
        setModalAddProduct(true)
    }

    return (
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}>
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                <ScrollView>

                    <View style={styles.container}>
                        {data.map(item => <ProductData key={item._id} data={item} editProduct={editProduct} />)}
                    </View>
                </ScrollView>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddProduct &&
                <ProductModal productModalData={{ modalAddProduct, productData, isEdit, id }} productModalFn={{ setModalAddProduct, setProductData, setIsEdit, setId }} />
            }

        </ImageBackground>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10
    },
    backgroundImage: {
        height: '100%',
    },
    DrawerButton: {
        backgroundColor: "#000",
        paddingVertical: 8,
        paddingHorizontal: 20,
        borderRadius: 10,
    },
    ButtonText: {
        color: "#fff",
    },
    fab: {
        position: 'absolute',
        bottom: 16,
        right: 16,
        backgroundColor: '#5F4521',
        borderRadius: 30,
        padding: 15,
        elevation: 5,
    },
    loader:{
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize:"48px"
    }
});
