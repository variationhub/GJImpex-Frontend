import { StyleSheet, Text, View } from "react-native";

const ProductionScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                This Is Production Screen
            </Text>
        </View>
    )
}

export default ProductionScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})