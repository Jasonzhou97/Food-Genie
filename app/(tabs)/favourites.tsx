import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, FlatList, Text, View, Image } from 'react-native';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { AuthContext } from '@/hooks/AuthContext'; // Ensure you have the correct path to AuthContext


export default function TabTwoScreen() {
  const { user } = useContext(AuthContext);
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      if (user) {
        try {
          const firestore = getFirestore();
          const userDoc = await getDoc(doc(firestore, 'users', user.uid));
          if (userDoc.exists()) {
            const userData = userDoc.data();
            setFavoriteRestaurants(userData.favoriteRestaurants || []);
          } else {
            console.log('User document does not exist');
          }
        } catch (error) {
          console.error('Error fetching favorite restaurants:', error);
        }
      }
    };

    fetchFavoriteRestaurants();
  }, [user]);

  const renderItem = ({ item }) => (
    <View style={styles.restaurantItem}>
      <Text style={styles.restaurantText}>{item}</Text>
    </View>
  );

  const ListHeaderComponent = () => (
    <View style={styles.headerContainer}>
      <Ionicons size={310} name="code-slash" style={styles.headerImage} />
    </View>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={favoriteRestaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        ListHeaderComponent={ListHeaderComponent}
        ListEmptyComponent={<Text style={styles.noFavoritesText}>No favorite restaurants</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tinyLogo: {
    width: 50,
    height: 50,
  },
  logo: {
    width: 66,
    height: 58,
  },
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#D0D0D0', // Adjust according to the theme
    padding: 20,
  },
  headerImage: {
    color: '#808080',
  },
  restaurantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    backgroundColor: '#fff',
  },
  restaurantText: {
    fontSize: 16,
    color: '#333',
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#777',
    textAlign: 'center',
    marginTop: 20,
  },
});
