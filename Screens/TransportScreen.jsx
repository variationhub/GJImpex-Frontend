import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator, Image } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTransportData } from "../slices/transport";
import TransportData from "../components/TransportData";
import TransportModal from "../modals/TransportModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const TransportScreen = () => {
    const [transportData, setTransportData] = useState({
        name: "",
        mobileNumber: "",
        gst: "",
        address: ""
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.transport)
    const login = useSelector((state) => state.login.data)
    const [modalAddTransport, setModalAddTransport] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');

    const openForm = () => {
        setModalAddTransport(true);
    };
    useEffect(() => {
        dispatch(fetchTransportData())
    }, [])


    const editTransport = (id) => {
        const value = data.find(value => value.id === id)
        setTransportData({
            name: value.transportName,
            mobileNumber: value.mobileNumber,
            gst: value.gst,
            address: value.address
        })
        setIsEdit(true)
        setId(id)
        setModalAddTransport(true)
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
                            {data.map((item, index) => <TransportData key={item.id} data={{ ...item, index, login }} editTransport={editTransport} />)}
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.imageView}>
                        <Image source={require("../assets/nodata.png")} style={styles.nodataImage} />
                    </View>
            }
            {(login.role === "Accountant" || login.role === "Admin" || login.role === "Sales") &&
                <Pressable style={styles.fab} onPress={openForm}>
                    <Ionicons name="plus" size={30} color={'white'} />
                </Pressable>
            }
            {modalAddTransport &&
                <TransportModal transportModalData={{ modalAddTransport, transportData, isEdit, id }} transportModalFn={{ setModalAddTransport, setTransportData, setIsEdit, setId }} />
            }
        </LinearGradient>
    );
};

export default TransportScreen;

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
    }
})
