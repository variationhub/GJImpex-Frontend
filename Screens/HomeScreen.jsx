import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../slices/order";
import OrderData from "../Components/OrderData";
import OrderModal from "../Modals/OrderModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const OrderScreen = () => {
    const [orderData, setOrderData] = useState({
        name: "",
        transport: "",
        gst: "",
        gstPrice: "",
        total: 0
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.order)
    const [modalAddOrder, setModalAddOrder] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');
    const [products, setProduct] = useState({})

    const openForm = () => {
        setModalAddOrder(true);
    };
    useEffect(() => {
        dispatch(fetchOrderData())
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { _id: id, productName: "", quantity: "", sellPrice: "", total: "" } }))
    }, [])

    const image = require('../assets/logo.png');

    const editOrder = (id) => {
        const value = data.find(value => value._id === id)

        const result = value?.orders?.reduce((acc, obj) => {
            acc[obj._id] = obj;
            return acc;
        }, {});

        setOrderData({
            name: value.partyName,
            transport: value.transport,
            gst: value.gst,
            gstPrice: value.gstPrice,
            total: value.totalPrice
        })

        setProduct(result);
        setIsEdit(true)
        setId(id)
        setModalAddOrder(true)
    }

    return (
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}>
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                <ScrollView>
                    <View style={styles.container}>
                        {data.map(item => <OrderData data={item} editOrder={editOrder} />)}
                    </View>
                </ScrollView>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddOrder &&
                <OrderModal orderModalData={{ modalAddOrder, orderData, isEdit, id, products }} orderModalFn={{ setModalAddOrder, setOrderData, setIsEdit, setId, setProduct }} />
            }
        </ImageBackground>
    );
};

export default OrderScreen;

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
    loader: {
        height: '100%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        fontSize: "48px"
    }
});
