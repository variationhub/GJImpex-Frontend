import React, { useState } from "react";
import { StyleSheet, View, Text, Pressable, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { useDispatch } from 'react-redux';
import { deleteTransportData } from "../slices/transport";
import CSS from '../styles/gloable.json'

const TransportData = (props) => {
    const [modalDelete, setModalDelete] = useState(false);

    const { transportName, city, mobileNumber, id, index } = props.data;
    const dispatch = useDispatch();
    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => dispatch(deleteTransportData(id)) },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    return (
        <View style={[styles.container, CSS.card]}>
            <View style={styles.firstLine}>
                {/* style={{ display: "flex", flexDirection: "row", alignItems: "center" }} */}
                <View style={styles.index}>
                    <Text style={[styles.indexText]}>{index + 1}</Text>
                </View>
            </View>
            <View style={styles.secoundLine}>
                <View style={styles.logo}>
                    <FontAwesome5 name="shipping-fast" size={24} color={CSS.primaryColor} />
                </View>
                <View style={styles.nameContact}>
                    <Text style={styles.name} numberOfLines={1}>{transportName} </Text>
                </View>
                <View style={styles.icons}>
                    <Pressable style={styles.iconEdit} onPress={() => props.editTransport(id)}>
                        <FontAwesome5 name="edit" size={14} color={'white'} />
                    </Pressable>
                    <Pressable style={styles.iconDelete} onPress={deleteHandler}>
                        <Ionicons name="delete" size={16} color={CSS.primaryColor} />
                    </Pressable>
                </View>
            </View>
        </View>

    );
};

export default TransportData;

const styles = StyleSheet.create({
    container: {
        // fontFamily: 'Ubuntu-Title',
        backgroundColor: 'white',
        display: "flex",
        flexDirection: "column",
        position:'relative'
    },
    firstLine: {
        width:'100%',
        display:'flex',
        position:'absolute',
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    index: {
        width: 30,
        height: 30,
        borderTopLeftRadius:12,
        borderBottomRightRadius: 50,
        backgroundColor: CSS.primaryColor,
        justifyContent: "center",
        alignItems: "center",
    },
    indexText:{
        top:3,
        left:8,
        position: 'absolute',
        color:'white',
        fontWeight:'bold',
    },
    nameContact: {
        display: "flex",
        flexDirection: "column",
        marginRight: 'auto',
        marginLeft: 25
    },
    name: {
        // fontFamily:'Ubuntu-Title',
        fontSize: 15,
        fontWeight: "bold",
        color: CSS.secondaryColor,
    },
    logo: {
        width: 45,
        height: 45,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 50,
        backgroundColor: "rgba(240, 97, 26, 0.2)",

    },
    icons: {
        flexDirection: 'row',
        gap: 3,
    },
    iconEdit: {
        height:35,
        width:35,
        backgroundColor: CSS.primaryColor,
        borderRadius: 40,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    iconDelete: {
        height:35,
        width:35,
        backgroundColor: 'white',
        borderWidth:2,
        borderColor: CSS.primaryColor,
        borderRadius: 40,
        display:'flex',
        alignItems: 'center',
        justifyContent: 'center'
    },
    first: {
        flex: 0,
        borderRadius: 50,
        height: 40,
        width: 40,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: '7%',
        backgroundColor: 'rgba(251, 97, 26, 0.2)'
    },
    secoundLine: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems:'center',
        flexDirection: "row",
        paddingHorizontal:15,
        paddingVertical:20
    },

});
