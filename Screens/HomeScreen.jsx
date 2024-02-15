import { StyleSheet, View, ImageBackground, ScrollView, TouchableOpacity } from "react-native";
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
        gstPrice: 0,
        total: 0
    })
    const dispatch = useDispatch();
    const { data } = useSelector((state) => state.order)
    const [modalAddOrder, setModalAddOrder] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');


    const openForm = () => {
        setModalAddOrder(true);
    };
    useEffect(() => {
        dispatch(fetchOrderData())
    }, [])

    const image = require('../assets/logo.png');

    const editOrder = (id) => {
        const value = data.find(value => value._id === id)
        setOrderData({
            name: value.name,
            description: value.description,
            stock: value.stock
        })
        setIsEdit(true)
        setId(id)
        setModalAddOrder(true)
    }

    return (
        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}>
            <ScrollView>
                <View style={styles.container}>
                    {data.map(item => <OrderData data={item} editOrder={editOrder} />)}
                </View>
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </TouchableOpacity>
            {modalAddOrder &&
                <OrderModal orderModalData={{ modalAddOrder, orderData, isEdit, id }} orderModalFn={{ setModalAddOrder, setOrderData, setIsEdit, setId }} />
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
});
