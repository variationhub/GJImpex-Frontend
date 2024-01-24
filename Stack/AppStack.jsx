import React from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen"
import CustomDrawer from "../Components/CustomDrawer";
import UserScreen from "../Screens/UserScreen";
import ProductScreen from "../Screens/ProductScreen";
import OrderScreen from "../Screens/OrderScreen";

const Drawer = createDrawerNavigator();

const AppStack = () => {
    return (
        <Drawer.Navigator initialRouteName="LoginScreen" drawerContent={(props) => <CustomDrawer {...props} />}>
            <Drawer.Screen
                name="LoginScreen"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            <Drawer.Screen
                name="HomeScreen"
                component={HomeScreen}
                options={{ headerShown: true }}
            />
             <Drawer.Screen
                name="UserScreen"
                component={UserScreen}
                options={{ headerShown: true }}
            />
             <Drawer.Screen
                name="ProductScreen"
                component={ProductScreen}
                options={{ headerShown: true }}
            />
             <Drawer.Screen
                name="OrderScreen"
                component={OrderScreen}
                options={{ headerShown: true }}
            />
        </Drawer.Navigator>
    );
};

export default AppStack;
