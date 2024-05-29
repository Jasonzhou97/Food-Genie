import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View,Text,TouchableOpacity,TextInput} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <View>
        <TouchableOpacity
          onPress={()=>navigation.goBack()}>
          <Text>go back</Text>
        </TouchableOpacity>
        </View>
        <View>
          <Image source={require("../assets/images/login.jpeg")}
          style={{width:200,height:200}}>
          </Image>
        </View>
      </SafeAreaView>
      <View
      style={{borderTopLeftRadius:50,borderTopRightRadius:50}}>
        <View>
          <Text>Email Address</Text>
          <TextInput value="test12345" placeholder="Enter Password"></TextInput>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
