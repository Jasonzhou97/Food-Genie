import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform, View,Text,TouchableOpacity} from 'react-native';
import { useNavigation} from '@react-navigation/native';

export default function Login() {
  const navigation = useNavigation();
  return (
    <View>

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
