import { StyleSheet, Text, View } from "react-native";

const PartyScreen = () => {

    return (
        <View style={styles.container}>
            <Text>
                This Is Party Screen
            </Text>
        </View>
    )
}

export default PartyScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    }
})