import { StyleSheet, Text, View } from "react-native";

const PendingOrderScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                This Is Pending Order Screen
            </Text>
        </View>
    )
}

export default PendingOrderScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})