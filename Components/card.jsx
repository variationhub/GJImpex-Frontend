import { Pressable, StyleSheet, Text, View } from "react-native"
import Ionicons from "react-native-vector-icons/MaterialCommunityIcons";

const Card = () => {
    return (
        <View style={styles.container}>
            <View style={styles.upperline}>
                <Text style={styles.upperleft} numberOfLines={1}>Bhargav</Text>
                <Pressable style={styles.upperright}><Text style={styles.upperrightext}>9887</Text></Pressable>
            </View>

            <View style={styles.bottomline}>
                <Text style={styles.bottomleft}>Surat</Text>
                <View style={styles.bottomright}>
                    <Pressable style={styles.icon}>
                        <Ionicons name="marker" size={22} color={'#5F4521'} />
                    </Pressable>
                    <Pressable style={styles.icon}>
                        <Ionicons name="book-check" size={22} color={'#5F4521'} />
                    </Pressable>
                    <Pressable style={styles.icon}>
                        <Ionicons name="delete" size={22} color={'#5F4521'} />
                    </Pressable>
                </View>
            </View>
        </View>
    )

}
export default Card

const styles = StyleSheet.create({
   container:{
    height:'9%',
    borderWidth:1,
    width:'95%',
   },
   upperline:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
   },
   upperleft:{
    fontWeight: 'bold',
    fontSize: 12
   },
   bottomline:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
    paddingHorizontal: '2%',
    paddingVertical: '1%'
   },
   bottomright:{
    display:'flex',
    flexDirection: 'row',
    justifyContent:'space-between',
   },
   icon:{
    borderWidth:1,
    marginHorizontal: '0.3%',
    padding:'1%',
   }
});
