import React, { useState, useEffect } from 'react';
import { Text, View, FlatList, TouchableOpacity, Alert, StyleSheet, useColorScheme } from 'react-native';
import { useRoute, useNavigation } from '@react-navigation/native';
import { getFirestore, addDoc, collection, getDocs } from 'firebase/firestore';
import { auth } from '../config/firebase';

const RecommendRest = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const colorScheme = useColorScheme();
  const { userId, userName } = route.params;
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
    //get fav restaurants list
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
  //recommend restuarnts to other users and store in the other user's firestore info 
  const handleRecommend = async (restaurant) => {
    try {
      const firestore = getFirestore();
      const recommendedCollection = collection(firestore, `users/${userId}/recommendedRestaurants`);
      await addDoc(recommendedCollection, {
        name: restaurant.name,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        recommendedBy: auth.currentUser.uid,
        recommendedAt: new Date()
      });
      Alert.alert('Success', 'Restaurant recommended successfully.');
      navigation.goBack();
    } catch (error) {
      console.error('Error recommending restaurant:', error.message);
      Alert.alert('Error', 'Failed to recommend restaurant.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={[styles.header, { color: colorScheme === 'dark' ? 'white' : 'black' }]}>Recommend a Restaurant to {userName}</Text>
      <FlatList
        data={favoriteRestaurants}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.item}>
            <Text style={{ color: colorScheme === 'dark' ? 'white' : 'black' }}>{item.name}</Text>
            <TouchableOpacity onPress={() => handleRecommend(item)}>
              <Text style={styles.recommendButton}>❤️ Recommend</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recommendButton: {
    fontSize: 18,
    color: 'red',
  },
});

export default RecommendRest;
