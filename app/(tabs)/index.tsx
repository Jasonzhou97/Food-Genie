import React, { useState, useContext } from 'react';
import { Image, StyleSheet, View, TouchableOpacity, Dimensions, Text, useColorScheme } from 'react-native';
import { Searchbar } from 'react-native-paper';
import { Ionicons } from '@expo/vector-icons';
import ImageCarousel from '../../components/Carousel';
import { useNavigation } from '@react-navigation/native';
import { AuthContext } from '../../hooks/AuthContext';
import ParallaxScrollView from '../../components/ParallaxScrollView';

export default function HomeScreen() {
  const navigation = useNavigation();
  const { user } = useContext(AuthContext);
  const [searchQuery, setSearchQuery] = useState('');
  const scheme = useColorScheme(); // Detect current theme

  const handleSearch = () => {
    navigation.navigate('Map', { query: searchQuery });
  };

  const iconPress = () => {
    if (user) {
      navigation.navigate('profile');
    } else {
      navigation.navigate('SignUp');
    }
  };

  const mainContainerStyle = [styles.mainContainer, {
    backgroundColor: scheme === 'dark' ? '#000000' : '#FFFFFF',
  }];

  const trendingTextStyle = [styles.trendingText, {
    color: scheme === 'dark' ? '#FFFFFF' : '#000000',
  }];

  const iconColor = scheme === 'dark' ? '#FFFFFF' : '#000000';

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('../../assets/images/Logo.png')}
          style={styles.stockLogo}
          resizeMode='contain'
        />
      }>
      <View style={mainContainerStyle}>
        <View style={styles.searchContainer}>
          <Searchbar
            placeholder="Search"
            onChangeText={setSearchQuery}
            value={searchQuery}
            style={styles.searchBar}
            onSubmitEditing={handleSearch}
          />
          <TouchableOpacity onPress={iconPress}>
            <Ionicons name="person-circle-outline" size={40} color={iconColor} style={styles.profileIcon} />
          </TouchableOpacity>
        </View>
      </View>
      <View>
        <Text style={trendingTextStyle}>Trending Places</Text>
      </View>
      <ImageCarousel />
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  searchBar: {
    flex: 1,
    marginRight: 10,
    backgroundColor: 'transparent', // Transparent background to blend with mainContainer background
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  stockLogo: {
    width: '100%', // Adjust the width as needed
    height: 290,
    marginTop: -20,
  },
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  profileIcon: {
    marginLeft: 10,
  },
  trendingText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginVertical: 16,
  },
});
