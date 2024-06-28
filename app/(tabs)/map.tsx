import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { useRoute } from '@react-navigation/native';

const Map = () => {
  const route = useRoute();
  const [currentPosition, setCurrentPosition] = useState(null);
  const mapRef = useRef(null);

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

  useEffect(() => {
    if (route && route.params && route.params.query) {
      // Handle search query passed from home screen
      // You can use the query value to perform specific actions
      // For example, you might want to set markers or search for a specific location
      console.log('Search query from home screen:', route.params.query);
    }
  }, [route]);

  return (
    <View style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder='Search'
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
            <Text style={{ fontSize: 24 }}>📍</Text>
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
});

export default Map;
