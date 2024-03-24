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
        companyName: companyNameEnum[0],
        freight: "",
        gst: 18,
        gstPrice: "",
        totalPrice: "",
        confirmOrder: true,
        narration: "",
        priority: false
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.order)
    const [filter, setFilter] = useState([])
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
        dispatch(fetchOrderData(true, true))
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
            companyName: value.companyName,
            company: value.companyName,
            gst: value.gst,
            gstPrice: value.gstPrice,
            freight: value.freight,
            confirmOrder: value.confirmOrder,
            narration: value.narration,
            totalPrice: value.totalPrice,
            priority: value.priority
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

    const filterHandler = (data) => {
        if (data === "ALL") {
            setFilter([])
        } else {
            if (filter.includes(data)) {
                setFilter(filter.filter(item => item !== data))
            } else {
                setFilter([...filter, data])
            }
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
                    <>
                        <View style={styles.filter}>
                            <Pressable style={[styles.filterbtn, !filter.length ? styles.fillAll : styles.all]} onPress={() => filterHandler("ALL")}>
                                <Text style={styles.filterText}>ALL</Text>
                            </Pressable >
                            <Pressable style={[styles.filterbtn, filter.includes("BILLING") ? styles.fillBilling : styles.billing]} onPress={() => filterHandler("BILLING")}>
                                <Text style={styles.filterText}>BILLING</Text>
                            </Pressable >
                            <Pressable style={[styles.filterbtn, filter.includes("DISPATCHING") ? styles.fillDispatching : styles.dispatching]} onPress={() => filterHandler("DISPATCHING")}>
                                <Text style={styles.filterText}>DISPATCHING</Text>
                            </Pressable>
                            <Pressable style={[styles.filterbtn, filter.includes("LR PENDING") ? styles.fillLrpending : styles.lrpending]} onPress={() => filterHandler("LR PENDING")}>
                                <Text style={styles.filterText}>LR PENDING</Text>
                            </Pressable>
                        </View>
                        <ScrollView>
                            <View style={styles.container}>
                                {data.filter(item => filter.length ? filter.includes(item.status) : true)?.map((item, index) => <OrderData key={item.id} data={{ ...item, login, index }} editOrder={editOrder} setId={setId} />)}
                            </View>
                        </ScrollView>
                    </>
                    :
                    <View style={styles.imageView}>
                        <Image source={require("../assets/nodata.png")} style={styles.nodataImage} />
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
        paddingTop: 10,
        marginBottom: 50
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
        width: 240,
        height: 240
    },
    noData: {
        fontSize: 30,
        fontWeight: "bold",
        color: '#5F4521',
        textAlign: 'center'
    },
    filter: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
        width: '100%',
        padding: "2%"
    },
    filterbtn: {
        borderWidth: 1,
        borderStyle: 'dashed',
        borderRadius: 8,
        paddingHorizontal: 8,
        paddingVertical: 4
    },
    billing: {
        backgroundColor: 'rgba(255, 0, 0, 0.2)',
        borderColor: 'rgba(255, 0, 0, 1)',
    },
    dispatching: {
        backgroundColor: 'rgba(100, 100, 200, 0.2)',
        borderColor: 'rgba(100, 100, 100, 1)'
    },
    lrpending: {
        backgroundColor: 'rgba(15, 150, 100, 0.2)',
        borderColor: 'rgba(15, 150, 100, 1)'
    },
    all: {
        // backgroundColor: 'gray',
        borderColor: 'gray',
        borderStyle: 'dashed'
    },
    fillAll: {
        backgroundColor: 'gray',
        borderColor: 'gray',
        borderStyle: 'solid',
    },
    fillBilling: {
        backgroundColor: 'rgba(255, 0, 0, 1)',
        borderColor: 'rgba(255, 0, 0, 1)',
        borderStyle: 'solid',
    },
    fillDispatching: {
        backgroundColor: 'rgba(100, 100, 200, 1)',
        borderColor: 'rgba(100, 100, 100, 1)',
        borderStyle: 'solid'
    },
    fillLrpending: {
        backgroundColor: 'rgba(15, 150, 100, 1)',
        borderColor: 'rgba(15, 150, 100, 1)',
        borderStyle: 'solid'
    },

    filterText: {
        fontSize: 12
    }
});
