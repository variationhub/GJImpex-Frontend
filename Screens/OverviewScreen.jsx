import { StyleSheet, Text, View } from "react-native";

const OverviewScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                This Is Overview Screen
            </Text>
        </View>
    )
}

export default OverviewScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})