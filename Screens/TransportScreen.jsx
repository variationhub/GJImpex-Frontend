import { StyleSheet, Text, View } from "react-native";

const TransportScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                This Is Transport Screen
            </Text>
        </View>
    )
}

export default TransportScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})