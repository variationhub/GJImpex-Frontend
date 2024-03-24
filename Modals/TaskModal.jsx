import React, { useCallback, useEffect, useState } from 'react'

import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator, Button } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { createTaskData, updateTaskData } from '../slices/task';
import { useDispatch, useSelector } from 'react-redux';
import { Autocomplete, AutocompleteItem, Datepicker, Input } from '@ui-kitten/components';
import SelectDropdown from 'react-native-select-dropdown';
import { fetchUserData } from '../slices/user';
import DateTimePicker from '@react-native-community/datetimepicker'; // Import the DatePicker component

const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

const TaskEnum = ['Task', 'Query', 'General']
const TaskModal = (props) => {

    const { modalAddTask, taskData, isEdit, id } = props.taskModalData;
    const { setModalAddTask, setTaskData, setIsEdit, setId } = props.taskModalFn;
    const [showDateTimePicker, setShowDateTimePicker] = useState(false); 
    const [data1, setData1] = useState(value2 || []);
    const [value, setValue] = useState(null)
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const value2 = useSelector((state) => state.user?.data)
    const [selectedDateTime, setSelectedDateTime] = useState(new Date());

    const [error, setError] = useState({
        topic: false,
        description: false,
        type: false,
        assignTo: false,
        timeSent: false
    });

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    const closeForm = () => {
        setTaskData({
            topic: "",
            description: "",
            type: "",
            assignTo: "",
            timeSent: new Date()
        })
        setModalAddTask(false);
        setIsEdit(false);
        setId('');
    }

    const checkAllFieldfilled = () => {
        let button = false;
        Object.keys(taskData).forEach(key => {
            if (!taskData[key]) {
                setError((prev) => ({ ...prev, [key]: true }))
                button = true;
            }
        })

        return button;
    }

    const saveForm = async (isEdit) => {

        if (checkAllFieldfilled()) {
            return;
        }

        let response = false;
        setLoading(true)
        if (isEdit) {
            response = await dispatch(updateTaskData(id, {
                topic: taskData.topic.trim(),
                description: taskData.description.trim(),
                type:taskData.type.trim().toUppercase(),
                assignTo:taskData.assignTo.trim(),
                timeSent: taskData.timeSent
            }))
        }
        else {
            response = await dispatch(createTaskData({
                topic: taskData.topic.trim(),
                description: taskData.description.trim(),
                type:taskData.type.trim(),
                assignTo:taskData.assignTo.trim(),
                timeSent: taskData.timeSent

            }))
        }
        if (response) {
            closeForm();
        }
        setLoading(false);
    };

    const onSelect = useCallback((index) => {
        setValue(data1[index]);
        // setError1((prev) => ({
        //     ...prev,
        //     name: false
        // }))
    }, [data1]);

    const onChangeText = useCallback((query) => {
        const data = value2.filter(item => filter(item, query))
        if (data.length) {
            setData1(data);
        }
        else {
            setData1(data);
        }
        setValue(query);
        // setError1((prev) => ({
        //     ...prev,
        //     name: false
        // }))
    }, []);

    const renderOption = (item, index) => (
        <AutocompleteItem
            style={{ width: 318 }}
            key={index}
            title={item.name}
        />
    );
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalAddTask}
            onRequestClose={closeForm}
        >
            <View style={styles.modalContainer}>
                <View style={styles.modalContent}>
                    <Text style={styles.formTitle}>{isEdit ? "Edit" : "Add"} Task</Text>

                    <Input
                        value={taskData.topic}
                        label='Task Topic'
                        placeholder='Ex. Loadcell Related'
                        style={styles.input}
                        name="topic"
                        status={error.name ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    topic: false
                                }))
                            }
                            setTaskData(prev => ({ ...prev, topic: e }))
                        }}
                    />
                    <Input
                        value={taskData.description}
                        label='Description'
                        placeholder='Ex. Tomorrow is One Urgent Delivery'
                        style={styles.input}
                        name="description"
                        status={error.description ? "danger" : "basic"}
                        onChangeText={(e) => {
                            if (e.length > 2) {
                                setError((prev) => ({
                                    ...prev,
                                    description: false
                                }))
                            }
                            setTaskData(prev => ({ ...prev, description: e }))
                        }}
                    />
                    <Autocomplete
                        placeholder='Assign To'
                        value={value?.name}
                        status={error.assignTo ? 'danger' : 'basic'}
                        placement='inner top'
                        label="Assign To"
                        onSelect={onSelect}
                        onChangeText={onChangeText}
                    >
                        {data1?.map(renderOption)}
                    </Autocomplete>
                    <View style={styles.selectDrop}>
                        <Text style={styles.company}>Type</Text>
                        <SelectDropdown
                            data={TaskEnum}
                            defaultValueByIndex={TaskEnum.indexOf(taskData?.General)}
                            onSelect={(selectedItem, index) => {
                                setTaskData(prev => ({ ...prev, type: selectedItem }))
                            }}
                            buttonStyle={styles.dropdown}
                            dropdownStyle={styles.selectedTextStyle}
                            buttonTextStyle={styles.selectedTextStyleButton}
                            rowTextStyle={styles.selectedTextStyleRow}
                        />
                    </View>
                    <View styles={styles.timeSent}>
                        <Input
                            value={selectedDateTime}
                            label='Time Sent'
                            placeholder='Ex. Sending Time'
                            style={styles.input}
                            name="sentTime"
                            status={error.sentTime ? "danger" : "basic"}
                            onChangeText={(e) => {
                                if (e.length > 2) {
                                    setError((prev) => ({
                                        ...prev,
                                        sentTime: false
                                    }))
                                }
                                setTaskData(prev => ({ ...prev, sentTime: e }))
                            }}
                            />
                        <Pressable onPress={() => setShowDateTimePicker(true)}>
                            <Ionicons name="calendar" size={26} />
                        </Pressable>
                    </View>
                    {showDateTimePicker && (
                        <DateTimePicker
                            value={selectedDateTime}
                            mode="datetime"
                            display="default"
                            onChange={(event, date) => {
                                setShowDateTimePicker(false);
                                setSelectedDateTime(date || selectedDateTime);
                        }}
                    />
                    )}
                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" />
                            :
                            <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Add"}</Text>
                        }
                    </Pressable>
                    <Pressable style={styles.closeForm} onPress={closeForm}>
                        <Ionicons style={styles.closeIcon} name="close" size={30} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </Modal>
    )
}

export default TaskModal

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
        backgroundColor: 'white',
        marginVertical: 5
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
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    placeholderStyle: {
        fontSize: 15,
        color: 'gray',
        fontFamily: ''
    },
    selectedTextStyle: {
        fontSize: 15,
    },
    selectDrop: {
        marginTop: 8
    },
    company: {
        color: "#8F9BB3",
        fontWeight: "800",
        fontSize: 12,
        marginBottom: 2
    },
    selectedTextStyleButton: {
        fontSize: 15,
        textAlign: 'left'
    },
    selectedTextStyle: {
        borderRadius: 2,
        height: 'fit-content'
    },
    dropdown: {
        height: 40,
        width: '100%',
        borderColor: '#E4E9F2',
        backgroundColor: 'white',
        borderWidth: 1,
        borderRadius: 4
    },
    selectedTextStyleRow: {
        fontSize: 15,
        textAlign: 'left',
        padding: 10,
    },
    timeSent:{
        
    }
});