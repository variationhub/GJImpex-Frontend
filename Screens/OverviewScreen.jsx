import { LinearGradient } from "expo-linear-gradient";
import { StyleSheet, Text, View } from "react-native";

const OverviewScreen = () => {

    return (
        <LinearGradient
        colors={['#FFDFB2', '#E89187']}
        style={styles.backgroundImage}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Text style={{ fontFamily: 'ubuntu', fontSize:30 }}>Coming Soon....!</Text>
            </View>
        </LinearGradient>
    )
}

export default OverviewScreen;

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