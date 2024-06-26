import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';

const App = () => {
  const [currentPosition, setCurrentPosition] = useState(null);

  useEffect(()=>{
    (async()=>{
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        alert('We are unable to get your location permission');
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setCurrentPosition({
        latitude:location.coords.latitude,
        longitude: ocation.coords.longitude,
      });
    })();
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 1.3521,
          longitude: 103.8198,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
        region={
          currentPosition
            ? {
                ...currentPosition,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
            : undefined
        }
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

export default App;
