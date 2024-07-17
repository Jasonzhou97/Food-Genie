import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image, Alert, Button } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute } from '@react-navigation/native';
import { getFirestore, doc, updateDoc, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../../config/firebase';

const Map = () => {
  const route = useRoute();
  const [currentPosition, setCurrentPosition] = useState(null);
  const [userLocations, setUserLocations] = useState([]);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const mapRef = useRef(null);
  const googlePlacesRef = useRef(null);
  const searchQuery = route.params?.query;

  // Function to update user location in Firestore
  const updateUserLoc = async (latitude, longitude) => {
    const firestore = getFirestore();
    const user = auth.currentUser;

    if (user) {
      try {
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
          lastKnownLoc: {
            latitude: latitude,
            longitude: longitude
          }
        });
      } catch (error) {
        console.error('Error updating location:', error.message);
      }
    }
  };

  // Fetch current user's location on component mount
  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('We are unable to get your location permission');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;
      setCurrentPosition({
        latitude,
        longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
      updateUserLoc(latitude, longitude);
    })();
  }, []);
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
  // Fetch other users' locations from Firestore
  useEffect(() => {
    const fetchUserLocations = async () => {
      const firestore = getFirestore();
      const usersCollection = collection(firestore, 'users');
      const userDocs = await getDocs(usersCollection);
  
      const locations = userDocs.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          name: data.name, // Assuming `name` field exists in Firestore
          latitude: data.latitude,
          longitude: data.longitude,
          avatarUrl: data.avatarUrl,
        };
      });
  
      setUserLocations(locations);
    };
  
    fetchUserLocations();
  }, []);
  

  // Handle search query change
  useEffect(() => {
    if (searchQuery && googlePlacesRef.current) {
      googlePlacesRef.current.setAddressText(searchQuery);
    }
  }, [searchQuery]);

  // Handle selection of a place from Google Places Autocomplete
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

  // Handle map taps
  const handleMapPress = (event) => {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ latitude, longitude });
  
    // Prompt user to enter restaurant name
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
      "plain-text", // Specify input type for the prompt
      ""
    );
  };
  
  // Save favorite restaurant to Firestore
  const saveFavoriteRestaurant = async (latitude, longitude, restaurantName) => {
    const firestore = getFirestore();
    const user = auth.currentUser;
  
    if (user) {
      try {
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
        await addDoc(favoritesCollection, {
          name: restaurantName, // Use the actual restaurant name
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
  
  
  return (
    <View style={{ flex: 1 }}>
      {/* Google Places Autocomplete */}
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

      {/* MapView */}
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
        onPress={handleMapPress} // Handle map press
      >
        {/* Render current user marker */}
        {currentPosition && (
          <Marker coordinate={currentPosition}>
            <View style={styles.markerContainer}>
              {/* Adjust avatar rendering */}
              <View style={styles.avatarContainer}>
                <Image source={require('@/assets/images/avatar_1.png')} style={styles.avatar} />
              </View>
              <Text style={{ fontSize: 24 }}>📍</Text>
            </View>
          </Marker>
        )}

        {/* Render other users' markers */}
        {userLocations.map((user, index) => (
          <Marker
            key={index}
            coordinate={{ latitude: user.latitude, longitude: user.longitude }}
          >
            <View style={styles.markerContainer}>
              <View style={styles.avatarContainer}>
                <Image source={{ uri: user.avatarUrl }} style={styles.avatar} />
              </View>
              <Text style={{ fontSize: 24 }}>📍</Text>
            </View>
          </Marker>
        ))}
        {favoriteRestaurants.map((restaurant, index) => (
          <Marker
            key={index}
            coordinate={{
              latitude: restaurant.latitude || 0,
              longitude: restaurant.longitude || 0,
            }}
          >
            <View style={styles.marker}>
              <Text style={styles.markerText}>❤️</Text>
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
  marker: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  markerText: {
    fontSize: 24,
  },
});

export default Map;
