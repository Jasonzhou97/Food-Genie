import { Image, StyleSheet, Platform,View, TouchableOpacity,Dimensions,Text } from 'react-native';
import { SearchBar } from 'react-native-screens';
import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TextInput } from 'react-native-gesture-handler';
import { useState } from 'react';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from '@/components/Carousel'


export default function HomeScreen() {
  const width = Dimensions.get('window').width;
  //search bar state management
  const [searchQuery, setSearchQuery] = useState('');
  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/food_1.jpeg')}
          style={styles.stockLogo}
          resizeMode='cover'
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
        
        <TouchableOpacity>
        <Ionicons name="person-circle-outline" size={40} color="black" style={styles.profileIcon} />
        </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text>Trending Places </Text>
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
    height: 300,
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
  carouselContainer: {
    flex: 1,
    paddingVertical: 16,
  },
  carouselItem: {
    flex: 1,
    borderWidth: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselText: {
    textAlign: 'center',
    fontSize: 30,
  },

});
