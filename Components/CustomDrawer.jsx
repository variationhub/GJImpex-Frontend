import { View, Text, Pressable } from "react-native";
import { DrawerContentScrollView, DrawerItem, DrawerItemList } from "@react-navigation/drawer";
import Ionicons from "react-native-vector-icons/Ionicons";
import { Image } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useDispatch, useSelector } from "react-redux";
import { loginSlice } from "../slices/login";

const CustomDrawer = (props) => {
    const dispatch = useDispatch();
    const {name, role} = useSelector(state => state.login.data)
    return (
        <View style={{ flex: 1 }}>
            <View style={{ marginTop: 20, padding: 20, display: 'flex', flexDirection: 'row', alignItems: 'center', borderBottomWidth: 1, borderBottomColor: "#ccc"}}>
                <Image
                    source={require("../assets/logo.png")} // Replace with the actual path or URL of the profile photo
                    style={{ width: 60, height: 60, borderRadius: 40 }}
                />
                <View style={{ marginLeft: 10, }}>
                    <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{name}</Text>
                    <Text style={{ fontSize: 12, color: 'gray' }}>{role}</Text>
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
                    {/* <Ionicons name="exit-outline" size={22} /> */}
                    <DrawerItemList {...props} labelStyle={{
                        color: props.focused ? '#fff' : '#fff',
                    }} activeBackgroundColor="#fff" 
                    >
                        <DrawerItem
                            label="Help"
                        />
                    </DrawerItemList>
                </View>
            </DrawerContentScrollView>
            <View style={{ padding: 20, borderTopWidth: 1, borderTopColor: "#ccc" }}>
                <Pressable style={{ paddingVertical: 15 }} onPress={() => {
                    AsyncStorage.removeItem('token');
                    dispatch(loginSlice.actions.updateUser(false));
                    dispatch(loginSlice.actions.setData({}));
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
                </Pressable>
            </View>
        </View>
    );
};

export default CustomDrawer;
