import React, { useCallback, useEffect, useState } from 'react'
import { StyleSheet, View, Text, Modal, Pressable, TextInput, Picker, ActivityIndicator } from "react-native";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { useDispatch, useSelector } from 'react-redux';
import { createTaskData, updateTaskData } from '../slices/task';
import { modelSlice } from '../slices/model';
import { Autocomplete, AutocompleteItem } from '@ui-kitten/components';
import { fetchUserData } from '../slices/user';


const filter = (item, query) => item.name.toLowerCase().includes(query.toLowerCase());

const TaskModal = (props) => {

    const { modalAddTask, taskData, isEdit, id } = props.taskModalData;
    const { setModalAddTask, setTaskData, setIsEdit, setId } = props.taskModalFn;
    const [value, setValue] = React.useState(null);
    const [loading, setLoading] = useState(false);
    const userData = useSelector(state=> state.user.data)
    const [data, setData] = React.useState(userData);

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchUserData())
    }, [])

    const closeForm = () => {
        setTaskData({
            topic: "",
            description: "",
            type: "",
            assignTo: "",
            timeSent: ""
            
        })
        setModalAddTask(false);
        setId("")
        setIsEdit(false);
    }

    const saveForm = async (isEdit) => {
        let resposne = false;
        setLoading(true);

        if(!taskData.topic.trim()){
            dispatch(modelSlice.actions.setModel({visible:true, message:"Task name is required"}));
            setLoading(false);
            return;
        }
        if (isEdit) {
            resposne = await dispatch(updateTaskData(id, {
                topic: taskData.topic.trim(),
                description: taskData.description.trim(),
                type: taskData.type,
                assignTo: taskData.assignTo,
                timeSent: taskData.timeSent
            }))
        }
        else {
            resposne = await dispatch(createTaskData(taskData))
        }
        if (resposne) {
            closeForm();
        }
        setLoading(false);
    };
      const onSelect = useCallback((index) => {
        setValue(data[index].name);
      }, [data]);
    
      const onChangeText = useCallback((query) => {
        const data = userData.filter(item => filter(item, query))
        if(data.length){
            setValue(query);
            setData(userData.filter(item => filter(item, query)));
        }
        else{
            setValue("");
            setData(userData);
        }
      }, []);
    
      const renderOption = (item, index) => (
        <AutocompleteItem
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
                    <TextInput
                        name="topic"
                        style={styles.input}
                        placeholder="Enter Topic"
                        value={taskData.topic}
                        onChangeText={(e) => setTaskData(prev => ({ ...prev, topic: e }))}
                    />
                    <TextInput
                        name="description"
                        style={styles.input}
                        placeholder="Enter description"
                        value={taskData.description}
                        onChangeText={(e) => setTaskData(prev => ({ ...prev, description: e }))}
                    />
                    <TextInput
                        name="type"
                        style={styles.input}
                        inputMode="numeric"
                        placeholder="Enter type"
                        value={String(taskData.type)}
                        onChangeText={(e) => setTaskData(prev => ({ ...prev, type: e }))}
                    />
                    <Autocomplete
                        placeholder='Assing to ..'
                        value={value}
                        style={styles.assignTo}
                        placement='inner top'
                        onSelect={onSelect}
                        onChangeText={onChangeText}
                        >
                        {data.map(renderOption)}
                    </Autocomplete>
                    <TextInput
                        name="timeSent"
                        style={styles.input}
                        inputMode="numeric"
                        placeholder="Enter timeSent"
                        value={String(taskData.timeSent)}
                        onChangeText={(e) => setTaskData(prev => ({ ...prev, timeSent: e }))}
                    />
                    <Pressable style={styles.saveButton} onPress={() => !loading && saveForm(isEdit)}>
                        {loading ? <ActivityIndicator color="#ffffff" /> :
                            <Text style={styles.saveButtonText}>{isEdit ? "Update" : "Create"}</Text>
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
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        height: 40,
        marginBottom: 10,
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
    assignTo:{
        width: '100%',
        borderWidth: 5,
        backgroundColor: '#fff',
        marginBottom: 10
    }
});