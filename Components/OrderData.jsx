import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, Alert, Pressable, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteOrderData } from "../slices/order";

const OrderData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { name, product, quantity, price, value, transport, gst, _id } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteOrderData(_id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    return (
        <View style={styles.container}>
            <ScrollView horizontal={true}><Text style={styles.name}>{name}</Text></ScrollView>
            <Text style={styles.product}>{product}</Text>
            <Text style={styles.quantity}>{quantity}</Text>
            <View style={styles.icons}>
            <TouchableOpacity style={styles.icon} onPress={()=>props.editOrder(_id)}>
                <Ionicons name="marker" size={24} color={'#5F4521'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={(e) => e.stopPropagation()}>
                <Ionicons name="book-check" size={24} color={'#5F4521'} />
            </TouchableOpacity>
            <TouchableOpacity style={styles.icon} onPress={deleteHandler}>
                <Ionicons name="delete" size={24} color={'#5F4521'} />
            </TouchableOpacity>
            </View>
        </View>
    );
};

export default OrderData;

const styles = StyleSheet.create({
    container: {
        width: '95%',
        height: 80,
        backgroundColor: "#f0f0f0",
        padding: 10,
        marginBottom: 10,
        borderRadius: 4,
        borderWidth: 1,
        borderColor: "#ccc",
        position: 'relative',
    },
    name: {
        fontSize: 15,
        fontWeight: "bold",
        marginBottom: 5,
        width: '70%',
        // overflow: 'scroll',
    },
    stock: {
        fontSize: 15,
        padding:4,
        backgroundColor: 'rgba(251, 97, 26, 0.3)',
        width:80,
        textAlign:'center',
        color: "#5f4521",
        marginBottom: 3,
        position: 'absolute',
        borderRadius: 10,
        fontWeight: 'bold',
        right: 10,
        top: 5,
    },
    description: {
        fontSize: 13,
        color: "#666",

    },
    icons: {
        position: 'absolute',
        right: 0,
        bottom: 6,
        flexDirection: 'row',
        gap: 0,
        color: '#5f4521',
    },
    icon: {
        padding: 10,
        paddingBottom: 2
    },
    quantity:{
        textAlign:'center'
    }
});
