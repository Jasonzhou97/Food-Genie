import {View,Text,StyleSheet,Image} from 'react-native'

export default function AuthenticateScreen(){
        return(
            <View style={styles.mainContainer}>
                <View>
                    <Text style={styles.text}>
                        Hungry? Let's get started!
                    </Text>
                    <View style={styles.imageContainer}>
                        <Image source={require('@/assets/images/eating.jpeg')}
                        style={styles.image}/>
                        
                    </View>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#FFE8C8',
        flex:1,

    },
    secondContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
        backgroundColor:'#FFE8C8',
    },
    text:{
        marginTop:100,
        alignContent:'center'
    },
    imageContainer:{
        marginTop:50,
        flexDirection:'row',
        justifyContent:'center'
    },
    image:{
        width:350,
        height:350
    }
})