import React, { useCallback, useEffect, useState } from 'react';
import { StyleSheet, View, Text, Modal, Pressable, TextInput, ScrollView, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import order, { createOrderData, updateOrderData } from '../slices/order';
import { Dropdown } from 'react-native-element-dropdown';
import { fetchProductData } from '../slices/product';
import { Autocomplete, AutocompleteItem, Input, Layout, Select, SelectItem } from '@ui-kitten/components';
import { fetchPartyData } from '../slices/party';

const companyNameEnum = ['GJ Impex', 'Shreeji sensor', 'Shree Enterprice'];

const filter = (item, query) => item.partyName.toLowerCase().includes(query.toLowerCase());
const filterProduct = (item, query) => item.productName.toLowerCase().includes(query.toLowerCase());

const OrderModal = (props) => {
    const { modalAddOrder, orderData, isEdit, id, products } = props.orderModalData;
    const { setModalAddOrder, setOrderData, setIsEdit, setId, setProduct } = props.orderModalFn;

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchProductData());
        dispatch(fetchPartyData())
    }, []);

    const productsData = useSelector((state) => state.product.data);
    const partyData = useSelector((state) => state.party.data);

    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);

    const openForm = () => {
        const id = Date.now();
        setProduct((prev) => ({ ...prev, [id]: { id: id, productName: "", quantity: "", sellPrice: "", total: 0 } }))
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
            return acc + Number(item.sellPrice * item.quantity)
        }, 0)
        setOrderData((prev) => ({ ...prev, total: total }))
    }, [products]);

    const closeForm = () => {
        setOrderData({
            name: "",
            transport: "",
            gst: "",
            gstPrice: "",
            total: 0
        });
        setModalAddOrder(false);
        setId("")
        const id = Date.now();
        setProduct({ [id]: { id: id, productName: "", quantity: "", sellPrice: "", total: "" } })
        setIsEdit(false);
    };

    const [error, setError] = useState({
        name: false,
        role: false,
        nickName: false,
        mobileNumber: false,
        email: false,
        password: false
    });

    const saveForm = async (isEdit) => {
        const data = {
            partyName: orderData.name.trim(),
            transport: orderData.transport.trim(),
            orders: Object.values(products)?.map((item) => {
                return {
                    productName: item.productName,
                    quantity: item.quantity,
                    sellPrice: item.sellPrice
                }
            }),
            gst: orderData.gst,
            gstPrice: orderData.gstPrice
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

    const [value, setValue] = useState(null);
    const [data1, setData1] = useState(partyData);
    const [transport, setTransport] = useState([]);

    const [value1, setValue1] = useState(null);
    const [data2, setData2] = useState(productsData);

    const onSelect = useCallback((index) => {
        setTransport(data1[index].transport)
        setValue(data1[index]);
        setOrderData((prev) => ({ ...prev, transportId: data1[index].transport[0].id }))
    }, [data1]);

    const onChangeText = useCallback((query) => {
        const data = partyData.filter(item => filter(item, query))
        if (data.length) {
            setValue(query);
            setData1(data);
        }
        else {
            setValue("");
            setData1(data);
        }
    }, []);

    const onSelectProduct = useCallback((index) => {
        console.log(data2)
        // setValue1(data2[index]);
        // console.log(produ)
        // setOrderData((prev) => ({ ...prev, orders: data2[index] }))
        setProduct
    }, [data2]);

    const onChangeTextProduct = useCallback((query) => {
        const data = productsData.filter(item => filterProduct(item, query))
        if (data.length) {
            setValue1(query);
            setData2(data);
        }
        else {
            setValue1("");
            setData2(data);
        }
    }, []);

    const renderOption = (item, index) => (
        <AutocompleteItem
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
                            placement='inner top'
                            label="Party Name"
                            onSelect={onSelect}
                            style={{ border: "10px solid blue" }}
                            onChangeText={onChangeText}
                        >
                            {data1.map(renderOption)}
                        </Autocomplete>

                        {value?.mobileNumber &&
                            <>
                                <Text style={styles.mobileandcity}>Mobile : {value?.mobileNumber}, City : {value?.city}</Text>
                                <Text style={styles.transportation}>Transportation</Text>
                                <View style={styles.transportList}>
                                    {transport.map(value => <Pressable onPress={() => setOrderData(prev => ({ ...prev, transportId: value.id }))} style={value.id === orderData.transportId ? styles.transportSelected : styles.transportSelect}>
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
                                value={companyNameEnum[orderData.companyName?.row]}
                                selectedIndex={orderData.companyName}
                                onSelect={index => setOrderData(prev => ({ ...prev, companyName: index }))}
                            >
                                {companyNameEnum.map((value) => <SelectItem title={value} key={value} />)}
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

                        <Pressable style={styles.saveButton} onPress={() => setCurrentPage(1)}>
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
                                        <View style={styles.productAndMinus} >
                                            <Autocomplete
                                                placeholder='Product Name'
                                                value={value?.productName}
                                                style={{ width: 250 }}
                                                placement='inner top'
                                                onSelect={onSelectProduct}
                                                onChangeText={onChangeTextProduct}
                                            >
                                                {data2?.map(renderOptionProduct)}
                                            </Autocomplete>
                                            {/* <Dropdown
                                                style={styles.dropdown}
                                                placeholderStyle={styles.placeholderStyle}
                                                selectedTextStyle={styles.selectedTextStyle}
                                                inputSearchStyle={styles.inputSearchStyle}
                                                data={data}
                                                maxHeight={300}
                                                labelField="productName"
                                                valueField="productName"
                                                value={item.productName}
                                                placeholder="Select product"

                                            /> */}

                                            <Pressable style={styles.minus} onPress={() => removeItem(item.id)}>
                                                <Ionicons name="minus" size={20} color={'white'} />
                                            </Pressable>
                                        </View>
                                        <View style={styles.inlineInput}>
                                            <Input
                                                name="quantity"
                                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                                inputMode="numeric"
                                                placeholder="Quantity"
                                                value={String(item.quantity)}
                                                onChangeText={(e) => handleChange(item.id, "quantity", Number(e))}
                                            />
                                            <Input
                                                name="sellPrice"
                                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                                inputMode="numeric"
                                                placeholder="Price"
                                                value={String(item.sellPrice)}
                                                onChangeText={(e) => handleChange(item.id, "sellPrice", Number(e))}
                                            />
                                            <Input
                                                name="total"
                                                style={[styles.input, { flex: 1 }]}
                                                value={(Number(item.quantity) * Number(item.sellPrice)).toFixed(2)}
                                                placeholder='Total Value'
                                                editable={false}
                                            ></Input>
                                        </View>
                                    </View>
                                )
                            })}
                        </ScrollView>
                        <View style={styles.inlineInput2}>
                            <TextInput
                                name="gstPrice"
                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                placeholder="GST Amount"
                                keyboardType="numeric"
                                value={String(orderData.gstPrice)}
                                onChangeText={(e) => setOrderData(prev => ({ ...prev, gstPrice: e }))}
                            />
                            <TextInput
                                name="gst"
                                style={[styles.gst, { flex: 1, marginRight: 10 }]}
                                placeholder="GST %"
                                inputMode="numeric"
                                value={String(orderData.gst)}
                                onChangeText={(e) => setOrderData(prev => ({ ...prev, gst: e }))}
                            />
                            <TextInput
                                name="total"
                                placeholder="Total Value"
                                style={[styles.input, { flex: 1, marginRight: 10 }]}
                                value={String(orderData.total + (Number((Number(orderData.gstPrice) / Number(orderData.gst || 1))).toFixed(2)))}
                                editable={false}
                            />
                        </View>
                        <Pressable style={styles.saveButton} onPress={() => setCurrentPage(0)}>
                            {
                                <Text style={styles.saveButtonText}>Back</Text>
                            }
                        </Pressable>
                        <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                            {
                                loading ? <ActivityIndicator color="#ffffff" />
                                    :
                                    <Text style={styles.saveButtonText}>Next</Text>
                            }
                        </Pressable>

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
        padding: 12,
        borderColor: 'lightgray',
        borderWidth: 1,
        borderRadius: 5,
        marginBottom: 12,
        backgroundColor: 'whitesmoke'
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
        marginBottom: 10,
    },
    inlineInput2: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    gst: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 10,
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
});
