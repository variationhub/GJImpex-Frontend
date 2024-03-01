import React, { useEffect, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen";
import LoginScreen from "../screens/LoginScreen";
import CustomDrawer from "../components/CustomDrawer";
import UserScreen from "../screens/UserScreen";
import ProductScreen from "../screens/ProductScreen";
import TaskScreen from "../screens/TaskScreen";
import PendingOrderScreen from "../screens/PendingOrderScreen";
import ProductionScreen from "../screens/ProductionScreen";
import TransportScreen from "../screens/TransportScreen";
import PartyScreen from "../screens/PartyScreen";
import OverviewScreen from "../screens/OverviewScreen";
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";
import { jwtDecode } from "jwt-decode";
import "core-js/stable/atob";
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
            const decoded = jwtDecode(token);
            dispatch(loginSlice.actions.setData(decoded || {}))
        }
    }, [token]);

    if (user) {
        return (
            <Drawer.Navigator initialRouteName="USERS DETAILS" drawerContent={(props) => <CustomDrawer {...props} />}
                screenOptions={{

                    drawerActiveTintColor: '#fff',
                    drawerActiveBackgroundColor: "#FB611A",
                }}
            >
                <Drawer.Screen
                    name="OVERVIEW"
                    component={OverviewScreen}
                    options={option}
                    icon={({ color, size }) => <Ionicons name="exit-outline" size={22} />}
                />
                <Drawer.Screen
                    name="PARTY (CUSTOMERS)"
                    component={PartyScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="CONFIRMED ORDERS"
                    component={HomeScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="PENDING ORDERS"
                    component={PendingOrderScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="TRANSPORTATION"
                    component={TransportScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="PRODUCTION"
                    component={ProductionScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="USERS DETAILS"
                    component={UserScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="PRODUCTS DETAILS"
                    component={ProductScreen}
                    options={option}
                />
                <Drawer.Screen
                    name="TASKS"
                    component={TaskScreen}
                    options={option}
                />
            </Drawer.Navigator>
        );
    } else {
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
