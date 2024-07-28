import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { getFirestore, doc, getDocs, collection, addDoc, deleteDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function FavouritesScreen() {
  const { user } = useContext(AuthContext);
  const [favRestaurants, setFavRestaurants] = useState([]);
  const [recommendedRestaurants, setRecommendedRestaurants] = useState([]);
  const navigation = useNavigation();

  const [output, setOutput] = useState('');

  const fetchFavoriteRestaurants = async () => {
    if (user) {
      try {
        const firestore = getFirestore();
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
        const favoritesSnapshot = await getDocs(favoritesCollection);

        const favoriteRestaurantsList = favoritesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setFavRestaurants(favoriteRestaurantsList);
      } catch (error) {
        console.error('Error fetching favorite restaurants:', error);
        Alert.alert('Error', 'Failed to fetch favorite restaurants');
      }
    }
  };

  const fetchRecommendedRestaurants = async () => {
    if (user) {
      try {
        const firestore = getFirestore();
        const recommendedCollection = collection(firestore, `users/${user.uid}/recommendedRestaurants`);
        const recommendedSnapshot = await getDocs(recommendedCollection);

        const recommendedRestaurantsList = recommendedSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));

        setRecommendedRestaurants(recommendedRestaurantsList);
      } catch (error) {
        console.error('Error fetching recommended restaurants:', error);
        Alert.alert('Error', 'Failed to fetch recommended restaurants');
      }
    }
  };

  useEffect(() => {
    fetchFavoriteRestaurants();
    fetchRecommendedRestaurants();
  }, [user]);
  //load the names of their favourite restaurants into chatgpt and ask for recommendation
  const recButton = async () => {
    try {
      const restaurantNames = favRestaurants.map(restaurant => restaurant.name).join(", ");
      const userInput = `Based on these favorite restaurants: ${restaurantNames}, recommend me restaurants or cuisine styles in singaporean context.`;
      
      const response = await axios.post(
        'https://api.openai.com/v1/chat/completions',
        {
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: userInput }],
          temperature: 0.7,
        },
        {
          headers: {
            'Authorization': `Bearer sk-proj-taAkgo9f4Dbd088NclcWT3BlbkFJrm2wuyGiwKwMIvCiG6q6`, 
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const rec = response.data.choices[0].message.content?.trim() || 'No recommendations found';
        setOutput(rec);
        Alert.alert('Recommendations', rec);
      } else {
        console.error('Empty or invalid response from OpenAI API:', response);
        Alert.alert('Error', 'Failed to fetch recommendations: Empty or invalid response');
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations');
    }
  };
  //add the recommended resaturant to own list
  const handleAddToFavorites = async (restaurant) => {
    try {
      const firestore = getFirestore();
      const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
      await addDoc(favoritesCollection, {
        name: restaurant.name,
        latitude: restaurant.latitude,
        longitude: restaurant.longitude,
        addedAt: new Date()
      });
      Alert.alert('Success', 'Restaurant added to your favorite list');
      fetchFavoriteRestaurants(); // Refresh favorite list
    } catch (error) {
      console.error('Error adding to favorites:', error);
      Alert.alert('Error', 'Failed to add to favorites');
    }
  };
  //remove recommended restaurant 
  const handleRemoveRecommendation = async (restaurantId) => {
    try {
      const firestore = getFirestore();
      const restaurantDoc = doc(firestore, `users/${user.uid}/recommendedRestaurants`, restaurantId);
      await deleteDoc(restaurantDoc);
      Alert.alert('Success', 'Restaurant removed from recommendations');
      fetchRecommendedRestaurants(); // to refresh recommended list
    } catch (error) {
      console.error('Error removing recommendation:', error);
      Alert.alert('Error', 'Failed to remove recommendation');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHead}>Your Favourite Restaurants</Text>
      <FlatList
        data={favRestaurants}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.restaurantText}>{item.name}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noFavText}>No favorite restaurants</Text>}
      />

      <TouchableOpacity style={styles.button} onPress={recButton}>
        <Text style={styles.buttonText}>Recommend Restaurants</Text>
      </TouchableOpacity>

      <Text style={styles.sectionHead}>Recommended by other users</Text>
      <FlatList
        data={recommendedRestaurants}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.restaurantText}>{item.name}</Text>
            <Text style={styles.restaurantText}>Recommended by: {item.recommendedByName}</Text>
            <View style={styles.buttonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => handleAddToFavorites(item)}
              >
                <Text style={styles.buttonText}>+</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.removeButton}
                onPress={() => handleRemoveRecommendation(item.id)}
              >
                <Text style={styles.buttonText}>-</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noFavText}>No recommended restaurants</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  sectionHead: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop:10
  },
  restaurantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  restaurantText: {
    fontSize: 16,
    color: '#333',
  },
  noFavText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  buttonContainer: {
    flexDirection: 'row',
  },
  addButton: {
    backgroundColor: '#4CAF50',
    padding: 5,
    borderRadius: 5,
    marginRight: 5,
  },
  removeButton: {
    backgroundColor: '#FF6347',
    padding: 5,
    borderRadius: 5,
  },
});
