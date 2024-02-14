import React from 'react'
import { StyleSheet, View, Text, Modal, TouchableOpacity } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const DetailsModal = (props) => {

    const {modalDelete,rowData} = props.deleteModalData;

    const {setModalDelete,setRowData} = props.deleteModalFn; 

    const closeModal = () => {
        setRowData(null)
        setModalDelete(false);
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalDelete}
            onRequestClose={closeModal}>
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text  >{rowData.title}</Text>
                    <Text>{rowData.description}</Text>
                    <TouchableOpacity onPress={closeModal} style={styles.closeModal}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default DetailsModal;

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        width: '100%',

        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
    },
    modalContent: {
        position : 'relative',
        backgroundColor: "white",
        padding: 20,
        width: '100%',
        height: '93%',
        marginTop: 'auto',
        elevation: 5,
    },
    closeModal : {
        display : 'flex',
        position : 'absolute',
        top : '3%',
        right : '3%',
    }
});