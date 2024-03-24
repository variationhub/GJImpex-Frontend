import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import { ActivityIndicator, ScrollView, StyleSheet, View, Image } from "react-native";
import { useSelector } from "react-redux";
import OrderData from "../components/OrderData";
import OrderModal from "../modals/OrderModal";
import OrderDetails from "../modals/OrderDetails";

const companyNameEnum = ['GJ Impex', 'Shreeji sensor', 'Shree Enterprice'];


const DoneOrderScreen = () => {

    const [orderData, setOrderData] = useState({
        partyId: "",
        city: "",
        mobile: "",
        transportId: "",
        companyName: companyNameEnum[0],
        freight: "",
        gst: "",
        gstPrice: "",
        totalPrice: "",
        confirmOrder: true,
        narration: ""
    })
    const { doneData, loading } = useSelector((state) => state.order)
    const login = useSelector((state) => state.login.data)
    const [modalAddOrder, setModalAddOrder] = useState(false);
    const [detailsModel, setDetailsModel] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');
    const [products, setProduct] = useState({})

    const editOrder = (id, details = false) => {
        const value = doneData?.find(value => value.id === id)

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
                doneData.length ?
                    <ScrollView>
                        <View style={styles.container}>
                            {doneData.map((item, index) => <OrderData key={item.id} data={{ ...item, login, index, done: true }} editOrder={editOrder} setId={setId} />)}
                        </View>
                    </ScrollView>
                    :
                    <View style={styles.imageView}>
                        <Image source={require("../assets/nodata.png")} style={styles.nodataImage} />
                    </View>
            }
            {modalAddOrder &&
                <OrderModal orderModalData={{ modalAddOrder, orderData, isEdit, id, products, pending: true }} orderModalFn={{ setModalAddOrder, setOrderData, setIsEdit, setId, setProduct }} />
            }

            {detailsModel &&
                <OrderDetails orderModalData={{ detailsModel, orderData, products }} orderModalFn={{ setDetailsModel, setOrderData, setProduct }} />
            }
        </LinearGradient>
    )
}

export default DoneOrderScreen;

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
    }
});