import React, { useContext, useState } from "react";
import { createDrawerNavigator } from "@react-navigation/drawer";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../Screens/HomeScreen";
import LoginScreen from "../Screens/LoginScreen";
import CustomDrawer from "../Components/CustomDrawer";
import UserScreen from "../Screens/UserScreen";
import ProductScreen from "../Screens/ProductScreen";
import OrderScreen from "../Screens/OrderScreen";

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

const option = {
    headerShown: true,
    headerStyle: { backgroundColor: '#FB611A' },
    headerTintColor: 'white'
};

const AppStack = () => {
    const [user, setUser] = useState(false);

    if (user) {
        // User is authenticated, show the drawer navigator
        return (
            <Drawer.Navigator initialRouteName="Orders" drawerContent={(props) => <CustomDrawer {...props} setUser={setUser} />} 
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
                        component={OrderScreen}
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
                    component={() => <LoginScreen setUser={setUser} />}
                    options={{ headerShown: false }}
                />
            </Stack.Navigator>
        );
    }
};

export default AppStack;
