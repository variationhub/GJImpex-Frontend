import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CustomDrawer from "../components/CustomDrawer";
import UserScreen from "../screens/UserScreen";
import ProductScreen from "../screens/ProductScreen";
import TaskScreen from "../screens/TaskScreen";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../slices/login";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const option = {
    headerShown: true,
    headerStyle: { backgroundColor: '#FB611A' },
    headerTintColor: 'white'
};

const AppStack = ({ token }) => {
    const { user } = useSelector((state) => state.login);
    const dispatch = useDispatch();

    useEffect(() => {
        if (token) {
            dispatch(loginSlice.actions.updateUser(true))
        }
    }, []);

    if (user) {
        // User is authenticated, show the drawer navigator
        return (
            <Drawer.Navigator initialRouteName="Task" drawerContent={(props) => <CustomDrawer {...props} />}
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
