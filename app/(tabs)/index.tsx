import { Image, StyleSheet, Platform,View, TouchableOpacity,Dimensions,Text } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';
import { useMemo, useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from '@/components/Carousel'
import { useNavigation} from '@react-navigation/native'

export default function HomeScreen() {
  const navigation = useNavigation();
  const width = Dimensions.get('window').width;
  //search bar state management
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/Logo.png')}
          style={styles.stockLogo}
          resizeMode='contain'
        />
      }>


      <View style={styles.mainContainer}>

        <View style={styles.searchContainer}>
          <Searchbar
      placeholder="Search"
      onChangeText={setSearchQuery}
      value={searchQuery}
      style={styles.searchBar}
        />
        
        <TouchableOpacity onPress={()=>navigation.navigate("SignUp")}>
        <Ionicons name="person-circle-outline" size={40} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={styles.trendingText}>Trending Places </Text>
      </View>
      <ImageCarousel/>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  searchBar:{
    flex:1,
    marginRight:10,

  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'space-between',
    marginBottom: 16,
  },
  stockLogo: {
    width: '100%', // Adjust the width as needed
    height: 290,
    marginTop: -20,
  },
  mainContainer:{
    flex:1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileIcon:{
    marginLeft:10,
  },
  trendingText:{

  }
});
