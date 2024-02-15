import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert, ScrollView } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch } from 'react-redux';
import { deleteProductData } from "../slices/product";

const ProductData = (props) => {

    const { productName, description, stock, _id } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteProductData(_id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    return (
        <View style={styles.container}>
            <Text style={styles.name} numberOfLines={1}>{productName}</Text>
            <Text style={styles.description}>{description}</Text>
            <Pressable  style={styles.stock}><Text style={styles.stockText}>{stock}</Text></Pressable>
            <View style={styles.icons}>
            <Pressable style={styles.icon} onPress={()=>props.editProduct(_id)}>
                <Ionicons name="marker" size={24} color={'#5F4521'} />
            </Pressable>
            <Pressable style={styles.icon} onPress={deleteHandler}>
                <Ionicons name="delete" size={24} color={'#5F4521'} />
            </Pressable>
            </View>
        </View>
    );
};

export default ProductData;

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
        width:"70%"
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
    stockText:{
        textAlign:'center'
    }
});
