import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const route = useRoute();
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null);
  const googlePlacesRef = useRef(null);
  const searchQuery = route.params?.query;

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('We are unable to get your location permission');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.0922,
        longitudeDelta: 0.0421,
      });
    })();
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
      >
        {currentPosition && (
          <Marker coordinate={currentPosition}>
            <View style={styles.markerContainer}>
              <View style={styles.avatarContainer}>
                <Image source={require('@/assets/images/avatar_1.png')} style={styles.avatar} />
              </View>
              <Text style={{ fontSize: 24 }}>📍</Text>
            </View>
          </Marker>
        )}
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
});

export default Map;
