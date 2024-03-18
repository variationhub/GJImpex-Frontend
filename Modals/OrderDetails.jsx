import { IndexPath } from '@ui-kitten/components';
import React from 'react'
import { Modal, Pressable, StyleSheet, Text, View } from 'react-native'
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import Feather from "react-native-vector-icons/Feather";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import CSS from '../styles/gloable.json'

const OrderDetails = (props) => {
    const { detailsModel, orderData, products } = props.orderModalData;
    const { setDetailsModel, setOrderData, setProduct } = props.orderModalFn;

    const closeForm = () => {
        setOrderData({
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
        });
        const id = Date.now();
        setProduct({ [id]: { id: id, productName: "", quantity: "", sellPrice: "", total: "" } })
        setDetailsModel(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={detailsModel}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <View style={styles.topProduct}>
                        <Text style={styles.formTitle}>Order Details</Text>
                        <Pressable style={styles.closeForm} onPress={closeForm}>
                            <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                        </Pressable>
                    </View>
                    <View>
                        <View style={styles.logo}>
                            <MaterialIcons name="person" size={24} color={CSS.primaryColor} />
                            <Text style={styles.textStyle}>{orderData.party.partyName}</Text>
                        </View>
                        <View style={styles.contact}>
                            <View style={styles.logo}>
                                <MaterialIcons name="call" size={24} color={CSS.primaryColor} />
                                <Text style={styles.textStyle}>{orderData.party.mobileNumber}</Text>
                            </View>
                            <View style={styles.logo}>
                                <MaterialIcons name="location-city" size={24} color={CSS.primaryColor} />
                                <Text style={styles.textStyle}>{orderData.party.city}</Text>
                            </View>
                        </View>
                        <View style={styles.contact}>
                            <View style={styles.logo}>
                                <FontAwesome5 name="shipping-fast" size={18} color={CSS.primaryColor} />
                                <Text style={styles.textStyle}>{orderData.transport}</Text>
                            </View>

                            <View style={styles.logo}>
                                <FontAwesome5 name="building" size={20} color={CSS.primaryColor} />
                                <Text style={[styles.textStyle, { marginLeft: 14 }]}>{orderData.company}</Text>
                            </View>
                        </View>
                        {orderData?.narration &&
                            <View style={[styles.logo, { width: "95%" }]}>
                                <Feather name="message-square" size={20} color={CSS.primaryColor} />
                                <Text style={[styles.textStyle]}>{orderData.narration}</Text>
                            </View>
                        }

                    </View>
                    <Text style={styles.productList}>Products Details</Text>
                    <View>
                        <View style={styles.row}>
                            <Text style={[styles.cellName, styles.cellHeading]}>Name</Text>
                            <Text style={[styles.cellNumber, styles.cellHeading]}>Quantity</Text>
                            <Text style={[styles.cellNumber, styles.cellHeading]}>Price</Text>
                        </View>
                        {Object.values(products)?.map(item => {
                            return (
                                <View style={styles.row} key={item.id}>
                                    <Text style={[styles.cell, styles.cellName]} numberOfLines={1} >{item?.productName} - {item?.productType}</Text>
                                    <Text style={[styles.cellNumber]}>{item?.quantity}</Text>
                                    <Text style={[styles.cellNumber]}>{item?.sellPrice}</Text>
                                </View>
                            )
                        })}
                    </View>
                    <View style={[styles.row, styles.gst]}>
                        <Text style={[styles.cellName, styles.cellHeading]}>GST Price</Text>
                        <Text style={[styles.cellNumber, styles.cellHeading]}>GST %</Text>
                        <Text style={[styles.cellNumber, styles.cellHeading]}>Total</Text>
                    </View>
                    <View style={styles.row}>
                        <Text style={[styles.cell, styles.cellName]}>{orderData.gstPrice}</Text>
                        <Text style={[styles.cellNumber]}>{orderData.gst}</Text>
                        <Text style={[styles.cellNumber]}>{orderData.totalPrice}</Text>
                    </View>
                </View>
            </View>
        </Modal>
    )
}

export default OrderDetails;


const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        backgroundColor: "white",
        padding: 20,
        width: '100%',
        height: '93%',
        elevation: 5,
        marginTop: "auto"
    },
    topProduct: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    formTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5F4521',
    },
    logo: {
        width: "40%",
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 4
    },
    table: {
        borderWidth: 1,
        borderColor: "black",
        marginBottom: 10,
        marginTop: 30,
    },
    row: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#fff",
    },
    cell: {
        flex: 1,
        padding: 4,
        fontSize: 13,
        color: "black",
        borderColor: "black",
    },
    cellHeading: {
        textAlign: "center",
        fontWeight: "bold",
        backgroundColor: 'lightgray',
        padding: 4,
        fontSize: 12,
        borderBottomWidth: 1,
    },
    cellNumber: {
        textAlign: "center",
        width: "20%",
        borderLeftWidth: 1
    },
    cellName: {
        width: "60%",
    },
    gst: {
        marginTop: 'auto'
    },
    productList: {
        marginTop: 4,
        fontSize: 14,
        fontWeight: 'bold',
        color: '#5F4521',
        marginBottom: 4,
    },
    textStyle: {
        marginLeft: 10
    },
    contact: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
    }
});