import {View,Text,StyleSheet,Image,TouchableOpacity} from 'react-native'
import tailwind from 'tailwind-rn';
import CustomText from '../../components/CustomText';
import { useNavigation } from '@react-navigation/native'
import { SafeAreaView } from 'react-native-safe-area-context'

export default function AuthenticateScreen(){

        return(
            <View style={styles.mainContainer}>
                <View>
                    <CustomText style={styles.text}>
                        Hungry? Let's get started!
                    </CustomText>
                    <View style={styles.imageContainer}>
                        <Image source={require('@/assets/images/eating.png')}
                        style={styles.image}/>
                        
                    </View>
                    <View>
                        <TouchableOpacity 
                        onPress={() => navigation.navigate('SignUp')}
                         style={styles.regCon}>
                            <Text style={styles.regText}>Sign Up</Text>
                        </TouchableOpacity>
                        <View style={styles.logCon}>
                            <Text style={{fontWeight:'semibold'}} >Already have an Account? </Text>
                            <TouchableOpacity>
                                <Text style={{fontWeight:'bold',color:'black'}}>Log in</Text>
                            </TouchableOpacity>
                        </View>
                        
                    </View>
                </View>
            </View>
        )
}

const styles = StyleSheet.create({
    mainContainer:{
        backgroundColor:'#FAF3F0',
        flex:1,

    },
    secondContainer:{
        flexDirection:'row',
        justifyContent:'space-around',
    },
    text:{
        marginTop:100,
        textAlign:'center',
        alignContent:'center',
        fontSize:20,
        fontWeight:'bold'
    },
    regCon:{
        backgroundColor:'#FFCACC',
        borderRadius:20,
        padding:3,
        margin:40,
        marginTop:100,
        marginBottom:20


    },
    logCon:{
        flexDirection:'row',
        justifyContent:'center'
    },
    regText:{
        color:'black',
        textAlign:'center',
        fontSize:20,
        padding:10,
        fontWeight:'bold'
   
    },
    imageContainer:{
        marginTop:50,
        flexDirection:'row',
        justifyContent:'center',
        
    },
    image:{
        width:300,
        height:300,
        resizeMode: 'stretch',
    },
})