import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductData } from "../slices/product";
import ProductData from "../components/ProductData";
import ProductModal from "../modals/ProductModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const ProductScreen = () => {
    const [productData, setProductData] = useState({
        name: "",
        productType: "",
        stock: 0,
        minStock: 0,
        price: 0,
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.product)
    const login = useSelector((state) => state.login.data)
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
        const value = data.find(value => value.id === id)
        setProductData({
            productName: value.productName,
            productType: value.productType,
            stock: value.stock,
            minStock: value.minStock,
            price: value.price,

        })
        setIsEdit(true)
        setId(id)
        setModalAddProduct(true)
    }

    return (
        <LinearGradient
            colors={['#FFDFB2', '#E89187']}
            style={styles.backgroundImage}>
            {/* <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}> */}
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                data.length ?
                    <ScrollView>

                        <View style={styles.container}>
                            {data.map((item, index) => <ProductData key={item.id} data={{ ...item, index }} editProduct={editProduct} />)}
                        </View>
                    </ScrollView>
                    : <View style={styles.imageView}>
                        <Text style={styles.noData}>No Data</Text>
                        {/* <Image
            style={styles.nodataImage}
            source={require('../assets/image.png')}
        /> */}
                    </View>
            }
            {(login.role === "Accountant" || login.role === "Admin") &&
                <Pressable style={styles.fab} onPress={openForm}>
                    <Ionicons name="plus" size={30} color={'white'} />
                </Pressable>
            }
            {modalAddProduct &&
                <ProductModal productModalData={{ modalAddProduct, productData, isEdit, id }} productModalFn={{ setModalAddProduct, setProductData, setIsEdit, setId }} />
            }
        </LinearGradient>
        //  </ImageBackground>
    );
};

export default ProductScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        marginBottom:50
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
    loader: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "48px"
    }, imageView: {
        width: '100%',
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    nodataImage: {
        width: 200,
        height: 200
    },
    noData: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#5F4521',
        textAlign: 'center'
    }
});
