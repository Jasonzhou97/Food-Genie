import React, { useState } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';

export default function App() {
  // Example of saved favorite locations
  const [favoriteLocations, setFavoriteLocations] = useState([
    { id: 1, latitude: 1.350650, longitude: 103.836738, title: 'Favorite Place 1' },
    { id: 2, latitude: 1.200033, longitude: 100.389930, title: 'Favorite Place 2' },
  ]);

  return (
    <View style={styles.container}>
      <MapView
        style={styles.map}
        initialRegion={{
          latitude: 1.357382,
          longitude: 99.202020,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {favoriteLocations.map((location) => (
          <Marker
            key={location.id}
            coordinate={{ latitude: location.latitude, longitude: location.longitude }}
            title={location.title}
            pinColor="red" // Change the color of the marker to indicate favorite
          />
        ))}
      </MapView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  map: {
    width: '100%',
    height: '100%',
  },
});
