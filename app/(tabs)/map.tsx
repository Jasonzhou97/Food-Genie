import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Alert, TouchableOpacity, useColorScheme } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, doc, updateDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../../config/firebase';

const Map = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const googlePlacesRef = useRef(null);
  const searchQuery = route.params?.query;

  useEffect(() => {
    const fetchUserLocations = async () => {
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');

      try {
        const userDocs = await getDocs(usersCollection);
        const locations = userDocs.docs.map(doc => {
          const data = doc.data();
          return {
            id: doc.id,
            name: data.name || 'Unknown',
            latitude: data.lastKnownLoc?.latitude || null,
            longitude: data.lastKnownLoc?.longitude || null,
            avatarUrl: data.avatarUrl || null,
          };
        });

        console.log("User Locations:", locations);
        setUserLocations(locations);
      } catch (error) {
        console.error('Error fetching user locations:', error.message);
      }
    };

    fetchUserLocations();
  }, []);

  const avatarTap = (user) => {
    navigation.navigate('RecommendRest', { userId: user.id, userName: user.name });
  };

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      const firestore = getFirestore();
      const user = auth.currentUser;

      if (user) {
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
        const favoritesSnapshot = await getDocs(favoritesCollection);

        const favoriteRestaurantsList = favoritesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoriteRestaurants(favoriteRestaurantsList);
      }
    };

    fetchFavoriteRestaurants();
  }, []);

  useEffect(() => {
    if (searchQuery && googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText(searchQuery);
    }
  }, [searchQuery]);

  const onPlaceSelected = (data, details = null) => {
    if (details) {
      const { lat, lng } = details.geometry.location;
      const position = {
        latitude: lat,
        longitude: lng,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      };

      setCurrentPosition(position);
      mapRef.current.animateToRegion(position, 1000);
    }
  };

  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });

    const user = auth.currentUser;

    if (!user) {
      Alert.alert('Sign In Required', 'You need to sign in to add favorite restaurants.', [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Sign In', onPress: () => navigation.navigate('Login') }
      ]);
      return;
    }

    Alert.prompt(
      "Add Favorite Restaurant",
      "Enter the name of the restaurant:",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "OK",
          onPress: (restaurantName) => {
            if (restaurantName.trim()) {
              saveFavoriteRestaurant(latitude, longitude, restaurantName.trim());
            } else {
              Alert.alert("Error", "Please enter a valid restaurant name.");
            }
          },
        },
      ],
      "plain-text",
      ""
    );
  };

  const saveFavoriteRestaurant = async (latitude, longitude, restaurantName) => {
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
        await addDoc(favoritesCollection, {
          name: restaurantName,
          latitude,
          longitude,
          addedAt: new Date()
        });
        Alert.alert("Success", "The location has been added to your favorite restaurants.");
      } catch (error) {
        console.error('Error adding favorite restaurant:', error.message);
      }
    }
  };

  const handleAvatarPress = (user) => (event) => {
    event.stopPropagation();

    const currentUser = auth.currentUser;
    if (currentUser && currentUser.uid === user.id) {
      return;
    }

    avatarTap(user);
  };

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        ref={googlePlacesRef}
        placeholder="Search"
        fetchDetails={true}
        onPress={onPlaceSelected}
        query={{
          key: 'AIzaSyAQB9pT0fdwuUIL_uLdF7g08wIQhiLGwas',
          language: 'en',
        }}
        styles={{
          container: styles.searchContainer,
          textInput: styles.textInput,
        }}
      />

      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={currentPosition}
        onPress={handleMapPress}
      >
        {currentPosition && (
          <Marker coordinate={currentPosition}>
            <View style={styles.currentUserMarker}>
              <View style={styles.currentUserAvatarContainer}>
                <Image
                  source={require('@/assets/images/avatar_1.png')}
                  style={styles.currentUserAvatar}
                />
              </View>
              <Text style={[styles.markerText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>📍</Text>
            </View>
          </Marker>
        )}

        {userLocations
          .filter(user => user.latitude !== null && user.longitude !== null)
          .map((user, index) => (
            <Marker
              key={index}
              coordinate={{ latitude: user.latitude, longitude: user.longitude }}
            >
              <TouchableOpacity style={styles.markerContainer} onPress={handleAvatarPress(user)}>
                <View style={styles.avatarContainer}>
                  <Image
                    source={user.avatarUrl ? { uri: user.avatarUrl } : require('@/assets/images/avatar_1.png')}
                    style={styles.avatar}
                  />
                </View>
                <Text style={[styles.markerText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{user.name}</Text>
                <Text style={[styles.markerText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>📍</Text>
              </TouchableOpacity>
            </Marker>
          ))}

        {favoriteRestaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: restaurant.latitude, longitude: restaurant.longitude }}
          >
            <View style={styles.favoriteRestaurantMarker}>
              <Text style={[styles.heartEmoji, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>❤️</Text>
              <Text style={[styles.markerText, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>{restaurant.name}</Text>
            </View>
          </Marker>
        ))}
      </MapView>
    </View>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    position: 'absolute',
    top: 10,
    left: '5%',
    width: '90%',
    zIndex: 1,
    padding: 10,
  },
  textInput: {
    height: 44,
    paddingHorizontal: 10,
    borderRadius: 50,
    backgroundColor: '#FFF',
    elevation: 5,
  },
  markerContainer: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatarContainer: {
    marginLeft: 20,
    borderWidth: 2,
    borderColor: '#fff',
    borderRadius: 25,
    overflow: 'hidden',
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  currentUserMarker: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  currentUserAvatarContainer: {
    marginLeft: 20,
    borderWidth: 3,
    borderColor: 'red',
    borderRadius: 25,
    overflow: 'hidden',
    padding: 5,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 5,
  },
  currentUserAvatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  favoriteRestaurantMarker: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  heartEmoji: {
    fontSize: 24,
  },
  markerText: {
    fontSize: 12,
    textAlign: 'center',
  },
});

export default Map;
