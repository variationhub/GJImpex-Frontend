import { StyleSheet, View, ImageBackground, ScrollView, Pressable, ActivityIndicator, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTaskData } from "../slices/task";
import TaskData from "../components/TaskData";
import TaskModal from "../modals/TaskModal";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { LinearGradient } from "expo-linear-gradient";

const TaskScreen = () => {
    const [taskData, setTaskData] = useState({
        name: "",
        taskType: "",
        stock: "",
        minimumStock: "",
        purchasePrice: "",
    })
    const dispatch = useDispatch();
    const { data, loading } = useSelector((state) => state.task)

    const [modalAddTask, setModalAddTask] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [id, setId] = useState('');

    const openForm = () => {
        setModalAddTask(true);
    };
    useEffect(() => {
        dispatch(fetchTaskData())
    }, [])

    const image = require('../assets/logo.png');

    const editTask = (id) => {
        const value = data.find(value => value.id === id)
        setTaskData({
            taskName: value.taskName,
            taskType: value.taskType,
            stock: value.stock,
            minStock: value.minStock,
            price: value.price,

        })
        setIsEdit(true)
        setId(id)
        setModalAddTask(true)
    }


    return (
        <LinearGradient
        colors={['#FFDFB2', '#E89187']}
        style={styles.backgroundImage}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text >Coming Soon....!</Text>
            </View>
        </LinearGradient>
        
        //<ImageBackground source={image} style={styles.backgroundImage} resizeMode="contain" opacity={0.4}>
        //   {loading ? */}
        //         <ActivityIndicator size="large" style={styles.loader} color="#5F4521" />
        //         :
        //         <ScrollView>
        //             <View style={styles.container}>
        //                 {data.map(item => <TaskData key={item.id} data={item} editTask={editTask} />)}
        //             </View>
        //         </ScrollView>
        //     }
        //     <Pressable style={styles.fab} onPress={openForm}>
        //         <Ionicons name="plus" size={30} color={'white'} />
        //     </Pressable>
        //     {modalAddTask &&
        //         <TaskModal taskModalData={{ modalAddTask, taskData, isEdit, id }} taskModalFn={{ setModalAddTask, setTaskData, setIsEdit, setId }} />
        //     }
        // </ImageBackground>

        
    );
};

export default TaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        paddingTop: 10
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
