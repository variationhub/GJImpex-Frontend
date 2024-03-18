import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { createOrderData, updateOrderData } from '../slices/order';
import { Autocomplete, AutocompleteItem, IndexPath, Input, Layout, Select, SelectItem } from '@ui-kitten/components';

const companyNameEnum = ['GJ Impex', 'Shreeji sensor', 'Shree Enterprice'];

const filter = (item, query) => item.partyName.toLowerCase().includes(query.toLowerCase());
const filterProduct = (item, query) => item.productName.toLowerCase().includes(query.toLowerCase());

const OrderModal = (props) => {
    const { modalAddOrder, orderData, isEdit, id, products } = props?.orderModalData;
    const { setModalAddOrder, setOrderData, setIsEdit, setId, setProduct } = props?.orderModalFn;

    const dispatch = useDispatch();

    const productsData = useSelector((state) => state.product?.data);
    const partyData = useSelector((state) => state.party?.data);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(0);
    const [value, setValue] = useState(orderData?.partyId ? partyData?.find(item => item.id === orderData?.partyId) : null);
    const [data1, setData1] = useState(partyData || []);
    const [transport, setTransport] = useState(orderData?.partyId ? partyData?.find(item => item.id === orderData?.partyId).transport : []);
    
    const [value1, setValue1] = useState(null);
    const [data2, setData2] = useState(productsData);

    const openForm = () => {
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { id, quantity: "", sellPrice: "", total: 0 } }))
    }

    const removeItem = (id) => {
        delete products[id];
        setProduct({ ...products })
    }

    const handleChange = (id, name, value) => {
        setProduct((prev) => ({ ...prev, [id]: { ...prev[id], [name]: value } }))
    }

    useEffect(() => {
        const total = Object.values(products)?.reduce((acc, item) => {
            return Number(acc) + Number(item.sellPrice * item.quantity)
        }, 0)
        setOrderData((prev) => ({ ...prev, total: total }))
    }, [products]);

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
        setError1(() => ({
            party: false,
            company: false
        }))
        setModalAddOrder(false);
        setId("")
        const id = Date.now();
        setProduct({ [id]: { id: id, productName: "", quantity: "", sellPrice: "", total: "" } })
        setIsEdit(false);
    };

    const [error1, setError1] = useState({
        party: false,
        company: false,
    });

    const saveForm = async (isEdit) => {
        const data = {
            partyId: value?.id,
            transportId: orderData.transportId.trim(),
            companyName: companyNameEnum[orderData.companyName?.row],
            orders: Object.values(products)?.map((item) => {
                return {
                    productId: item?.productId,
                    quantity: item?.quantity,
                    sellPrice: item?.sellPrice
                }
            }),
            gst: orderData?.gst || 0,
            gstPrice: orderData?.gstPrice || 0,
            narration: orderData?.narration || ""
        }
        setLoading(true);
        let response = false;
        if (isEdit) {
            response = await dispatch(updateOrderData(id, data));
        } else {
            response = await dispatch(createOrderData(data));
        }
        if (response) {
            closeForm();
        }
        setLoading(false);
    };

    const onSelect = useCallback((index) => {
        setTransport(data1[index].transport)
        setValue(data1[index]);
        setOrderData((prev) => ({ ...prev, transportId: data1[index].transport[0].id }))
        setError1((prev) => ({
            ...prev,
            party: false
        }))
    }, [data1]);

    const onChangeText = useCallback((query) => {
        const data = partyData.filter(item => filter(item, query))
        if (data.length) {
            setData1(data);
        }
        else {
            setData1(data);
        }
        setValue(query);
        setError1((prev) => ({
            ...prev,
            party: false
        }))
    }, []);

    const onSelectProduct = useCallback((index, id) => {

        setProduct((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                productId: data2[index].id,
                productName: data2[index].productName,
                productType: data2[index].productType,
            }
        }))

    }, [data2]);

    const onChangeTextProduct = useCallback((query, id) => {
        const data = productsData.filter(item => filterProduct(item, query))
        if (data.length) {
            setData2(data);
        }
        else {
            setData2(data);
        }
        setProduct((prev) => ({
            ...prev,
            [id]: {
                ...prev[id],
                productName: query,
            }
        }))
        setValue1(query);
    }, [productsData]);

    const renderOption = (item, index) => (
        <AutocompleteItem
            style={{ width: 318 }}
            key={index}
            title={item.partyName}
        />
    );

    const renderOptionProduct = (item, index) => {
        return (
            <AutocompleteItem
                style={{ width: 250 }}
                key={index}
                title={`${item.productName} - ${item.productType}`}
            />
        )
    }

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddOrder}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                {currentPage === 0 ?
                    <View style={styles.modalContent}>
                        <View style={styles.topProduct}>
                            <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Order</Text>
                            <Pressable style={styles.closeForm} onPress={closeForm}>
                                <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                            </Pressable>
                        </View>
                        <Autocomplete
                            placeholder='Select Party Name'
                            value={value?.partyName}
                            status={error1.party ? 'danger' : 'basic'}
                            placement='inner top'
                            label="Party Name"
                            onSelect={onSelect}
                            onChangeText={onChangeText}
                        >
                            {data1?.map(renderOption)}
                        </Autocomplete>

                        {value?.mobileNumber &&
                            <>
                                <Text style={styles.mobileandcity}>Mobile : {value?.mobileNumber}, City : {value?.city}</Text>
                                <Text style={styles.transportation}>Transportation</Text>
                                <View style={styles.transportList}>
                                    {transport?.map(value => <Pressable key={value.id} onPress={() => setOrderData(prev => ({ ...prev, transportId: value.id }))} style={value.id === orderData.transportId ? styles.transportSelected : styles.transportSelect}>
                                        <Text style={styles.transportName}>{value.transportName}</Text>
                                    </Pressable>)}
                                </View>
                            </>
                        }


                        <Layout
                            style={styles.selection}
                            level='1'
                        >
                            <Select
                                label='Company'
                                placeholder="Ex. GJ Impex"
                                status={error1.company ? 'danger' : 'basic'}

                                value={companyNameEnum[orderData?.companyName?.row]}
                                selectedIndex={orderData?.companyName?.row}
                                onSelect={index => {
                                    setError1((prev) => ({ ...prev, company: false }))
                                    setOrderData(prev => ({ ...prev, companyName: index }))
                                }}
                            >
                                {companyNameEnum?.map((value) => <SelectItem title={value} key={value} />)}
                            </Select>
                        </Layout>

                        <Input
                            value={orderData.narration}
                            label='Narration'
                            placeholder='Ex. Urgent order'
                            style={styles.input}
                            textStyle={styles.inputTextStyle}
                            multiline={true}
                            onChangeText={(e) => {
                                setOrderData(prev => ({ ...prev, narration: e }))
                            }}
                        />

                        <Pressable style={styles.saveButton} onPress={() => {
                            setError1(() => ({
                                party: !Boolean(value),
                                company: !Boolean(orderData.companyName)
                            }))

                            if (Boolean(orderData.companyName) && Boolean(value)) {
                                setCurrentPage(1)
                            }
                        }}>
                            <Text style={styles.saveButtonText}>Next</Text>
                        </Pressable>
                    </View>
                    :
                    <View style={styles.modalContent}>
                        <View style={styles.topProduct}>
                            <Pressable style={styles.plus} onPress={openForm}>
                                <Text style={styles.productAddButton}>Add Product</Text>
                            </Pressable>
                            <Pressable onPress={closeForm}>
                                <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                            </Pressable>
                        </View>

                        <ScrollView style={styles.scrollview}>
                            {Object.values(products)?.map(item => {
                                return (
                                    <View key={item.id}>
                                        <View>
                                            <View style={styles.productAndMinus}>
                                                <Autocomplete
                                                    placeholder='Product Name'
                                                    value={item?.productName}
                                                    style={{ width: 250 }}
                                                    placement='inner top'
                                                    size="small"
                                                    onSelect={(index) => onSelectProduct(index, item.id)}
                                                    onChangeText={(query) => onChangeTextProduct(query, item.id)}
                                                >
                                                    {data2?.map(renderOptionProduct)}
                                                </Autocomplete>
                                                <Pressable style={styles.minus} onPress={() => removeItem(item.id)}>
                                                    <Ionicons name="minus" size={20} color={'white'} />
                                                </Pressable>
                                            </View>
                                            {item.productType &&
                                                <Text style={styles.productType}>Desc: {item.productType}</Text>
                                            }
                                        </View>

                                        <View style={styles.inlineInput}>
                                            <Input
                                                name="quantity"
                                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                                inputMode="numeric"
                                                placeholder="Quantity"
                                                size='small'
                                                value={String(item?.quantity || 0)}
                                                onChangeText={(e) => handleChange(item?.id, "quantity", Number(e))}
                                            />
                                            <Input
                                                name="sellPrice"
                                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                                inputMode="numeric"
                                                placeholder="Price"
                                                size='small'
                                                value={String(item?.sellPrice || 0)}
                                                onChangeText={(e) => handleChange(item?.id, "sellPrice", Number(e))}
                                            />
                                            <Text style={styles.totalPrice}>
                                                {(Number(item.quantity) * Number(item.sellPrice)).toFixed(2)}
                                            </Text>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <View style={styles.inlineInput2}>
                            <Input
                                name="gstPrice"
                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                placeholder="GST Amount"
                                keyboardType="numeric"
                                size="small"
                                value={String(orderData.gstPrice || 0)}
                                onChangeText={(e) => setOrderData(prev => ({ ...prev, gstPrice: Number(e) }))}
                            />
                            <Input
                                name="gst"
                                style={[styles.gst, { flex: 1, marginRight: 10 }]}
                                placeholder="GST %"
                                inputMode="numeric"
                                size='small'
                                value={String(orderData.gst || 0)}
                                onChangeText={(e) => setOrderData(prev => ({ ...prev, gst: Number(e) }))}
                            />
                            <Text style={styles.totalPrice}>
                                {orderData.gst ?
                                    Number(orderData.total + (orderData.gstPrice / orderData.gst)).toFixed(2)
                                    :
                                    Number(orderData.total + orderData.gstPrice).toFixed(2)
                                }
                            </Text>
                        </View>
                        <View style={styles.buttons}>
                            <Pressable style={[styles.saveButton, styles.btn]} onPress={() => setCurrentPage(0)}>
                                {
                                    <Text style={styles.saveButtonText}>Back</Text>
                                }
                            </Pressable>
                            <Pressable style={[styles.saveButton, styles.btn]} onPress={() => !loading && saveForm(isEdit)}>
                                {
                                    loading ? <ActivityIndicator color="#ffffff" />
                                        :
                                        <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Create"} Order</Text>
                                }
                            </Pressable>
                        </View>

                    </View>
                }
            </View>
        </Modal>
    )
}

export default OrderModal;

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
    input: {
        marginVertical: 5,
        backgroundColor: 'white',
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
    dropdown: {
        height: 40,
        width: '85%',
        borderColor: '#808080',
        borderWidth: 1,
        borderRadius: 0,
        paddingHorizontal: 8,
    },
    placeholderStyle: {
        fontSize: 15,
        color: 'gray',
        fontFamily: ''
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    inlineInput: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    plus: {
        backgroundColor: 'rgba(50, 250, 150, 0.7)',
        borderRadius: 5,
        padding: 2,
        width: '40%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    productAddButton: {
        color: 'green',
        padding: 2
    },
    minus: {
        backgroundColor: 'maroon',
        borderRadius: 5,
        padding: 2,
    },
    scrollview: {
        marginTop: 10,
        // borderColor: 'lightgray',
        // borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        // backgroundColor: 'whitesmoke'
    },
    addProduct: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 15,
    },
    productTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#5F4521',
    },
    productAndMinus: {
        justifyContent: 'space-between',
        alignItems: 'center',
        flexDirection: 'row',
    },
    inlineInput2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    gst: {
        borderWidth: 1,
        maxWidth: 65
    },
    mobileandcity: {
        marginVertical: 10,
        color: "grey",
    },
    transportList: {
        display: 'flex',
        flexWrap: 'wrap',
        flexDirection: 'row',
        gap: 10,
        alignItems: 'center',
        marginBottom: 10,
    },
    transportSelect: {
        marginVertical: 4,
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
    },
    transportName: {
        textTransform: 'uppercase'
    },
    transportSelected: {
        marginVertical: 4,
        borderWidth: 1,
        borderColor: 'green',
        paddingHorizontal: 10,
        borderRadius: 5,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 2,
        backgroundColor: 'lightgreen'
    },
    transportation: {
        fontSize: 12,
        color: "#8F9BB3",
        fontWeight: "800",
    },
    productType: {
        fontSize: 12,
        color: "#8F9BB3",
        fontWeight: "800",
        marginLeft: 4,
    },
    totalPrice: {
        fontSize: 14,
        color: "#8F9BB3",
        fontWeight: "800",
        width: 90,
        textAlign: 'right',
    },
    buttons: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        width: '100%',
    },
    btn: {
        width: '45%'
    }
});
