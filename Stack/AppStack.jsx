import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import CustomDrawer from "../Components/CustomDrawer";
import UserScreen from "../Screens/UserScreen";
import ProductScreen from "../Screens/ProductScreen";
import TaskScreen from "../Screens/TaskScreen";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../slices/login";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const option = {
    headerShown: true,
    headerStyle: { backgroundColor: '#FB611A' },
    headerTintColor: 'white'
};

const AppStack = ({token}) => {
    const { user } = useSelector((state)=> state.login);
    const dispatch = useDispatch();

    useEffect(()=>{
        if(token){
        dispatch(loginSlice.actions.updateUser(true))
        }
    },[]);

    if (user) {
        // User is authenticated, show the drawer navigator
        return (
            <Drawer.Navigator initialRouteName="Users" drawerContent={(props) => <CustomDrawer {...props}/>} 
            screenOptions={{
                
                drawerActiveTintColor: '#fff',
                drawerActiveBackgroundColor: "#FB611A",
              }}// Replace with your desired background color
            >
                <Drawer.Screen
                    name="Orders"
                    component={HomeScreen}
                    options={option}
                />
                <Drawer.Screen
                        name="Task"
                        component={TaskScreen}
                        options={option}
                />
                <Drawer.Screen
                    name="Users"
                    component={UserScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="Products"
                    component={ProductScreen}
                    options={option}
                />
            </Drawer.Navigator>
        );
    } else {
        // User is not authenticated, show the login stack navigator
        return (
            <Stack.Navigator>
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }
};

export default AppStack;
