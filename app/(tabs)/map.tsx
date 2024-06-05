import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Place {
  type: string;
  properties: {
    Name: string;
    Description: string;
  };
  geometry: {
    type: string;
    coordinates: [number, number, number];
  };
}

const App = () => {
  const [places, setPlaces] = useState<Place[]>([]);

  useEffect(() => {
    // Fetch GeoJSON data
    fetch("https://api-production.data.gov.sg/v2/public/api/collections/1377/metadata")
      .then(response => response.json())
      .then(data => {
        // Extract GeoJSON data from the response
        const geoJsonData = data.data.collectionMetadata.childDatasets;
  
        console.log("GeoJSON data:", geoJsonData); // Log the GeoJSON data
  
        // Ensure that geoJsonData is an array before setting the state
        if (Array.isArray(geoJsonData)) {
          // Set places state with GeoJSON features
          setPlaces(geoJsonData);
        } else {
          console.error("GeoJSON data is not in the expected format:", data);
        }
      })
      .catch(error => console.error('Error fetching GeoJSON data:', error));
  }, []);
  
  
  return (
    <View style={{ flex: 1 }}>
      <MapView
        style={{ flex: 1 }}
        initialRegion={{
          latitude: 1.3521, // Initial map center latitude
          longitude: 103.8198, // Initial map center longitude
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      >
        {places.map(place => (
          <Marker
            key={place.properties.Name}
            coordinate={{
              latitude: place.geometry.coordinates[1],
              longitude: place.geometry.coordinates[0],
            }}
            title={place.properties.Name}
            description={place.properties.Description}
          />
        ))}
      </MapView>
    </View>
  );
};

export default App;
