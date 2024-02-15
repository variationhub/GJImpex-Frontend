import React from 'react'

import { StyleSheet, View, Text, Modal, TouchableOpacity, TextInput, Picker } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";


const PartyModal = (props) => {

    const { modalAddParty, partyData, data } = props.partyModalData;
    const { setModalAddParty, setPartyData } = props.partyModalFn;

    const closeForm = () => {
        setModalAddParty(false);
    }

    const saveForm = () => {
        const value = { id: new Date(), title: partyName, description: "Information for Row 1" }
        setData([...data, partyData])

        // Close the form modal
        closeForm();
    };

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddParty}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>Add Party</Text>
                    <TextInput
                        style={styles.input}
                        placeholder="Party name and city"
                        value={partyData.name}
                        onChangeText={(text) => setPartyName(text)}
                    />
                    <TextInput
                        style={styles.input}
                        placeholder="Transport"
                        value={partyData.name}
                        onChangeText={(text) => setPartyName(text)}
                    />
                    {/* <Picker
                        // selectedValue={["Product 1", "Product 2", "Product 3", "Product 4"]}
                    // onValueChange={(itemValue, itemIndex) =
                    // style={styles.picker}
                    >
                        <Picker.Item label="Option 1" value="option1" />
                        <Picker.Item label="Option 2" value="option2" />
                        <Picker.Item label="Option 3" value="option3" />
                    </Picker> */}

                    <View>
                        <TextInput
                            style={styles.input}
                            placeholder="Quantity"
                            // value={quantity}
                            // onChangeText={(text) => setQuantity(text)}
                            keyboardType="numeric"
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Value"
                            // value={value}
                            // onChangeText={(text) => setValue(text)}
                            keyboardType="numeric"
                        />
                    </View>
                    <TouchableOpacity style={styles.saveButton} onPress={saveForm}>
                        <Text style={styles.saveButtonText}>Save</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    )
}

export default PartyModal

const styles = StyleSheet.create({
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
        height: '93%',
        elevation: 5,
        marginTop: "auto"
    },
    closeModal: {
        display: 'flex',
        position: 'absolute',
        top: '3%',
        right: '3%',
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
    }
});