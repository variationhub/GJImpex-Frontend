import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchOrderData } from "../slices/order";
import OrderData from "../components/OrderData";
import OrderModal from "../modals/OrderModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { IndexPath } from "@ui-kitten/components";
import { LinearGradient } from "expo-linear-gradient";
import { fetchProductData } from "../slices/product";
import { fetchPartyData } from "../slices/party";
import { Image } from "react-native";
import OrderDetails from "../modals/OrderDetails";

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
        narration: ""
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.order)
    const login = useSelector((state) => state.login.data)
    const [modalAddOrder, setModalAddOrder] = useState(false);
    const [detailsModel, setDetailsModel] = useState(false);
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

    useEffect(() => {
        dispatch(fetchProductData());
        dispatch(fetchPartyData())
    }, []);


    const editOrder = (id, details = false) => {
        const value = data?.find(value => value.id === id)

        const result = value?.products?.reduce((acc, obj) => {
            acc[obj.id] = { ...obj, productId: obj.id };
            return acc;
        }, {});

        setOrderData({
            partyId: value.party?.id,
            party: value.party,
            transportId: value.transportId,
            transport: value.party?.transport.find(item => item.id === value.transportId)?.transportName,
            companyName: new IndexPath(companyNameEnum.indexOf(value.companyName)),
            company: value.companyName,
            gst: value.gst,
            gstPrice: value.gstPrice,
            // confirmOrder: value.confirmOrder,
            narration: value.narration,
            totalPrice: value.totalPrice,
        })
        setProduct(result);
        if (!details) {
            setIsEdit(true)
            setId(id)
            setModalAddOrder(true)
        } else {
            setDetailsModel(true)
        }
    }

    return (
        <LinearGradient
            colors={['#FFDFB2', '#E89187']}
            style={styles.backgroundImage}>
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                data.length ?
                    <ScrollView>
                        <View style={styles.container}>
                            {data.map((item, index) => <OrderData key={item.id} data={{ ...item, login, index }} editOrder={editOrder} setId={setId} />)}
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.imageView}>
                        <Text style={styles.noData}>No Data</Text>
                        {/* <Image
                            style={styles.nodataImage}
                            source={require('../assets/image.png')}
                        /> */}
                    </View>
            }
            {(login.role === "Admin" || login.role === "Sales") &&
                <Pressable style={styles.fab} onPress={openForm}>
                    <Ionicons name="plus" size={30} color={'white'} />
                </Pressable>
            }
            {modalAddOrder &&
                <OrderModal orderModalData={{ modalAddOrder, orderData, isEdit, id, products }} orderModalFn={{ setModalAddOrder, setOrderData, setIsEdit, setId, setProduct }} />
            }

            {detailsModel &&
                <OrderDetails orderModalData={{ detailsModel, orderData, products }} orderModalFn={{ setDetailsModel, setOrderData, setProduct }} />
            }
        </LinearGradient>
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
    },
    imageView: {
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
