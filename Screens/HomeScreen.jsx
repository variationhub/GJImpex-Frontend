import React, { useState } from "react";
import { StyleSheet, View, Text, Image, Modal, TouchableOpacity, ScrollView, StatusBar, SafeAreaView, Alert } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const HomeScreen = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [rowData, setRowData] = useState(null);

    const handleRowClick = (data) => {
        setRowData(data);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
    };

    const data = [
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
    ];


const deleteHandler = (e) =>{
    e.stopPropagation()
    Alert.alert('Delete ', 'Are You Sure ?', [
        {
          text: 'Cancel',
          onPress: () => console.log('Cancel Pressed'),
          style: 'cancel',
        },
        {text: 'Delete', onPress: () => console.log('OK Pressed')},
        
      ], {
        alertContainerStyle: styles.alertContainer,
        titleStyle: styles.alertTitle,
        messageStyle: styles.alertMessage,
      })
}
    return (

        <ScrollView style={styles.scrollView}>
            {/* <View style={styles.image}>
                <Image source={require('../assets/logo.png')} />
            </View> */}
            {data.map((row) => (
                <TouchableOpacity
                    key={row.id}
                    style={styles.row}
                    onPress={() => handleRowClick(row)}
                >
                    <Text ellipsizeMode="tail" style={styles.title}>{row.title}</Text>
                    <View style={styles.bottomLine}>
                        <Text style={styles.status}>- LR Pending</Text>
                        <View style={styles.icons}>
                            <TouchableOpacity onPress={(e) => e.stopPropagation()}>
                                <Ionicons name="marker" size={26} color={'#5F4521'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={(e) => e.stopPropagation()}>
                                <Ionicons name="book-check" size={26} color={'#5F4521'} />
                            </TouchableOpacity>
                            <TouchableOpacity onPress={deleteHandler}>
                                <Ionicons name="delete" size={26} color={'#5F4521'} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </TouchableOpacity>
            ))}
            {rowData && (
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={modalVisible}
                    onRequestClose={closeModal}
                    presentationStyle="fullScreen"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text  >{rowData.title}</Text>
                            <Text>{rowData.description}</Text>
                            <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
                                <Text>Close Modal</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </ScrollView>

    );
};

export default HomeScreen;

const styles = StyleSheet.create({
    scrollView: {
    },
    container: {
    },
    backgroundImage: {
    },
    image: {
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
        gap: 20,
        color: '#5f4521',
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
});
