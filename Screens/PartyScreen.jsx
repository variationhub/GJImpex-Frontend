import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPartyData } from "../slices/party";
import PartyData from "../components/PartyData";
import PartyModal from "../modals/PartyModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";
import { fetchTransportData } from "../slices/transport";

const partyRoles = ['Admin', 'Sales', 'Accountant', 'Dispatcher', 'Production', 'Other'];


const PartyScreen = () => {
    const [partyData, setPartyData] = useState({
        partyName: "",
        city: "",
        mobileNumber: "",
        transport : [{
            transportName: '',
            id: ''
        }],
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.party)

    const [modalAddParty, setModalAddParty] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');

    const openForm = () => {
        setModalAddParty(true);
    };
    useEffect(() => {
        dispatch(fetchPartyData())
    }, [])

    const image = require('../assets/logo.png');

    const editParty = (id) => {
        const value = data.find(value => value.id === id)
        setPartyData({
            partyName: value.partyName,
            city: value.city,
            mobileNumber: value.mobileNumber,
            transport: value.transport[0]
        })
        setIsEdit(true)
        setId(id)
        setModalAddParty(true)
    }

    return (
        <LinearGradient
        colors={['#FFDFB2', '#E89187']}
        style={styles.backgroundImage}>
        {/* <ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}> */}
            {loading ?
                <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
                :
                <ScrollView>

                    <View style={styles.container}>
                        {data.map((item, index) => <PartyData key={item.id} data={{...item, index}} editParty={editParty} />)}
                    </View>
                </ScrollView>
            }
            <Pressable style={styles.fab} onPress={openForm}>
                <Ionicons name="plus" size={30} color={'white'} />
            </Pressable>
            {modalAddParty &&
                <PartyModal partyModalData={{ modalAddParty, partyData, isEdit, id, partyRoles }} partyModalFn={{ setModalAddParty, setPartyData, setIsEdit, setId }} />
            }
           
        {/* </ImageBackground> */}
        </LinearGradient>
    );
};

export default PartyScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10,
        backgroundImage: 'linear-gradient(to bottom, #ffdfb2, #fbcca2, #f6b896, #f0a48d, #e89187)'

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
    }
});
