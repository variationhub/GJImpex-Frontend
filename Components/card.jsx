import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const Card = (props) => {

    const {
        upperleft = "",
        upperright = "",
        bottomleft = "",
        checkMark=false,
        isEdit = false
    } = props?.data;

    const {
        checkClick = () => {},
        noCheckClick = () =>{}
    } = props?.fn

    return (
        <View style={styles.container}>
            <View style={styles.upperline}>
                <Text style={styles.upperleft} numberOfLines={1}>{upperleft}</Text>
                <Pressable style={styles.upperright}><Text style={styles.upperrightext}>{upperright}</Text></Pressable>
            </View>

            <View style={styles.bottomline}>
                <Text style={styles.bottomleft}>{bottomleft}</Text>
                <View style={styles.bottomright}>
                    {checkMark ?
                    <Pressable style={styles.icon} onPress={checkClick}>
                        <Ionicons name="book-check" size={23} color={'#5F4521'} />
                    </Pressable>
                    : null }
                    <Pressable style={styles.icon} onPress={isEdit ? checkClick : noCheckClick}>
                        <Ionicons name="marker" size={23} color={'#5F4521'} />
                    </Pressable>
                    <Pressable style={styles.icon}>
                        <Ionicons name="delete" size={23} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </View>
    )

}
export default Card

const styles = StyleSheet.create({
    container: {
        // height: '10%',
        margin:5,
        borderWidth: 1,
        borderRadius: 10,
        width: '95%',
    },
    upperline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
        marginTop: '1%'
    },
    upperleft: {
        fontWeight: 'bold',
        fontSize: 16
    },
    bottomleft: {
        fontSize: 14
    },
    bottomline: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingHorizontal: '2%',
        paddingVertical: '1%',
    },
    bottomright: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    icon: {
        marginHorizontal: '0.1%',
        padding: '2%',
    }
});
