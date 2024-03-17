import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const PendingOrderScreen = () => {

    return (
        <LinearGradient
        colors={['#FFDFB2', '#E89187']}
        style={styles.backgroundImage}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text>Coming Soon....!</Text>
            </View>
        </LinearGradient>
    )
}

export default PendingOrderScreen;

const styles = StyleSheet.create({
    container:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    backgroundImage: {
        height: '100%',
    },
})