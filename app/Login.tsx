import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View,Text,TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>
      <SafeAreaView>
        <TouchableOpacity
          onPress={()=>navigation.goBack()}>
          <Text>go back</Text>
        </TouchableOpacity>
      </SafeAreaView>
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
