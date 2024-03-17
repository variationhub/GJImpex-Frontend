import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../slices/order";
import OrderData from "../components/OrderData";
import OrderModal from "../modals/OrderModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { IndexPath } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";

const companyNameEnum = ['GJ Impex', 'Shreeji sensor', 'Shree Enterprice'];


const OrderScreen = () => {
    const [orderData, setOrderData] = useState({
        partyId: "",
        city: "",
        mobile: "",
        transportId: "",
        companyName: new IndexPath(0),
        gst: "",
        gstPrice: "",
        totalPrice: 0,
        confirmOrder: true,
        narration: "",
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
        setProduct((prev) => ({ ...prev, [id]: { id: id, productName: "", quantity: "", sellPrice: "", total: "" } }))
    }, [])

    const image = require('../assets/logo.png');

    const editOrder = (id) => {
        const value = data?.find(value => value.id === id)

        const result = value?.products?.reduce((acc, obj) => {
            acc[obj.id] = obj;
            return acc;
        }, {});

        setOrderData({
            partyId: value.party?.id,
            transportId: value.transportId,
            companyName: new IndexPath(companyNameEnum.indexOf(value.companyName)),
            gst: value.gst,
            gstPrice: value.gstPrice,
            // confirmOrder: value.confirmOrder,
            narration: value.narration,
        })

        setProduct(result);
        setIsEdit(true)
        setId(id)
        setModalAddOrder(true)
    }

    return (
        <LinearGradient
            colors={['#FFDFB2', '#E89187']}
            style={styles.backgroundImage}>
            {/*  <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}> */}
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                data.length ?
                    <ScrollView>
                        <View style={styles.container}>
                            {data.map((item, index) => <OrderData key={item.id} data={{ ...item, index }} editOrder={editOrder} setId={setId} />)}
                        </View>
                    </ScrollView>
                    :
                    <View>
                        <Text>No Oreder yet...</Text>
                    </View>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddOrder &&
                <OrderModal orderModalData={{ modalAddOrder, orderData, isEdit, id, products }} orderModalFn={{ setModalAddOrder, setOrderData, setIsEdit, setId, setProduct }} />
            }
        </LinearGradient>
        // </ImageBackground>
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
