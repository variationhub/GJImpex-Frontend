import { View, Text, TouchableOpacity } from "react-native";
import { DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch } from "react-redux";
import { loginSlice } from "../slices/login";

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 20, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
                <Image
                    source={require("../assets/logo.png")} // Replace with the actual path or URL of the profile photo
                    style={{ width: 60, height: 60, borderRadius: 40 }}
                />
                <View style={{ marginLeft: 10, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>GJImpex</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>ADMIN</Text>
                </View>
            </View>
            <DrawerContentScrollView
                {...props}
                contentContainerStyle={{
                    // backgroundColor: "#fff",
                    zIndex: 1,
                }}
            >
                <View style={{ flex: 1, backgroundColor: "#fff", paddingTop: 10 }}>
                    <DrawerItemList {...props} labelStyle={{
                        color: props.focused ? '#fff' : '#fff',
                    }} activeBackgroundColor="#fff" />
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
                <TouchableOpacity style={{ paddingVertical: 15 }} onPress={() => {
                    AsyncStorage.removeItem('token');
                    dispatch(loginSlice.actions.updateUser(false));
                }}>
                    <View style={{ flexDirection: "row", alignItems: "center" }}>
                        <Ionicons name="exit-outline" size={22} />
                        <Text
                            style={{
                                fontSize: 15,

                                marginLeft: 5,
                            }}
                        >
                            Sign Out
                        </Text>
                    </View>
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default CustomDrawer;
