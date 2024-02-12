import React, { useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Alert, ImageBackground } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import DetailsModal from "../Modals/DetailsModal";
import PartyModal from "../Modals/PartyModal";

const HomeScreen = () => {
    const [modalDelete, setModalDelete] = useState(false);
    const [modalAddParty, setModalAddParty] = useState(false);
    const [rowData, setRowData] = useState(null);
    const [partyData, setPartyData] = useState({
        name:"",
        products:{
            "123":{
                id:"123",
                name:"",
                quantity:0,
                price:0
            },
            "456":{
                id:"456",
                name:"",
                quantity:0,
                price:0
            }
        }
    })
    const [data, setData] = useState([
        // Assuming you have some data for each row
        { id: 1, title: "Jignesh bhai Surat", description: "Information for Row 1" },
        { id: 2, title: "Mukeshbhai Ambani Mumbai", description: "Information for Row 2" },
        { id: 3, title: "Elon bhai Musk", description: "Information for Row 3" },
        { id: 4, title: "Mark bhai Facebook", description: "Information for Row 4" },
        { id: 5, title: "Funsuf Vangadu", description: "Information for Row 5" },
        { id: 6, title: "Raju Rastugi Ahmedabad", description: "Information for Row 6" },
        { id: 7, title: "Jeff Bezos Africa", description: "Information for Row 7" },
        { id: 8, title: "John Cena WWE", description: "Information for Row 8" },
        { id: 9, title: "The Great Khali India", description: "Information for Row 9" },
        { id: 10, title: "Romson Thakur Vadodara", description: "Information for Row 10" },
        { id: 11, title: "Farhan Ali", description: "Information for Row 11" },
        { id: 12, title: "Aditya gadhavi", description: "Information for Row 12" },
        { id: 13, title: "Khan Saheb Mumbai", description: "Information for Row 13" },
        { id: 14, title: "Kareena Kappor Mumbai", description: "Information for Row 14" },
        { id: 15, title: "Romson Thakur Vadodara", description: "Information for Row 15" },
        { id: 16, title: "Farhan Ali", description: "Information for Row 16" },
        { id: 17, title: "Aditya gadhavi", description: "Information for Row 17" },
        { id: 18, title: "Khan Saheb Mumbai", description: "Information for Row 18" },
        { id: 19, title: "Kareena Kappor Mumbai", description: "Information for Row 19" },
    ]);

    const handleRowClick = (data) => {
        setRowData(data);
        setModalDelete(true);
    };

    const openForm = () => {
        setModalAddParty(true);
    };

    const deleteHandler = (e) => {
        e.stopPropagation()
        Alert.alert('Delete ', 'Are You Sure ?', [
            {
                text: 'Cancel',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Delete', onPress: () => console.log('OK Pressed') },

        ], {
            alertContainerStyle: styles.alertContainer,
            titleStyle: styles.alertTitle,
            messageStyle: styles.alertMessage,
        })
    }

    const image = require('../assets/logo.png');

    return (

        <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.25}>
            <ScrollView style={styles.scrollView}>
                {data.map((row) => (
                    <TouchableOpacity
                        key={row.id}
                        style={styles.row}
                        onPress={() => handleRowClick(row)}>
                        <Text ellipsizeMode="tail" style={styles.title}>{row.title}</Text>
                        <View style={styles.bottomLine}>
                            <Text style={styles.status}>- LR Pending</Text>
                            <View style={styles.icons}>
                                <TouchableOpacity style={styles.icon} onPress={(e) => e.stopPropagation()}>
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
                    </TouchableOpacity>
                ))}
                {rowData && (
                    <DetailsModal deleteModalData={{ modalDelete ,rowData}} deleteModalFn={{ setModalDelete,setRowData }} />
                )}
            </ScrollView>
            <TouchableOpacity style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </TouchableOpacity>
            {modalAddParty &&
                <PartyModal partyModalData={{modalAddParty,partyData, data}} partyModalFn={{setModalAddParty,setPartyData}}/>
            }

        </ImageBackground>
    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    scrollView: {
    },
    container: {
    },
    backgroundImage: {
        height:'100%',
    },
    image: {
        position: 'absolute',
        top: '50%',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 18,
        color: '#5f4521',
    },
    row: {
        height: 85,
        borderBottomWidth: 1,
        borderBottomColor: "#ccc",
        padding: 10,
    },
    modalContainer: {
        flex: 1,
        width: '100%',

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        position: 'relative',
        backgroundColor: "white",
        padding: 20,
        width: '100%',
        height: '80%',
        borderRadius: 10,
        elevation: 5,
    },
    status: {
        fontSize: 15,
        marginTop: 'auto',
        color: '#5f4521',
    },
    bottomLine: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: 'auto',
    },
    icons: {
        flexDirection: 'row',
        gap: 0,
        color: '#5f4521',
        marginBottom: -5
    },
    icon: {
        padding: 15,
        paddingBottom: 2
    },
    alertContainer: {
        backgroundColor: "lightgrey",
    },
    alertTitle: {
        fontSize: 200,
        fontWeight: "bold",
        color: "red",
    },
    alertMessage: {
        fontSize: 16,
        color: "black",
    },
    closeModal: {
        display: 'flex',
        position: 'absolute',
        top: '3%',
        right: '3%',
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
    modalContainer: {
        flex: 1,
        width: '100%',
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    closeForm: {
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
    formTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 15,
        color: '#5F4521',
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
    },
    saveButton: {
        backgroundColor: '#5F4521',
        padding: 10,
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 10,
    },
    saveButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
    closeForm: {
        position: 'absolute',
        top: '3%',
        right: '3%',
    },
    closeIcon: {
        // Icon styles
    },
});
