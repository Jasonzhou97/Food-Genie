import React, { useContext, useEffect, useState } from 'react';
import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { getFirestore, doc, getDocs,collection } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function favouritesScreen() {
  const { user } = useContext(AuthContext);
  const [favRestaurants, setFavRestaurants] = useState([]);
  const navigation = useNavigation();

  const [output, setOutput] = useState('');

  useEffect(() => {
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
  
    fetchFavoriteRestaurants();
  }, [user]);

// handle recommendations based on favRestaurants
const recButton = async () => {
  try {
    const userInput = `Based on these favorite restaurants: ${favRestaurants.join(", ")}, recommend me restaurants or cuisine styles.`;
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

  return (
    <View style={styles.container}>
      <Text style={styles.sectionHead}> Your Favourite Restaurants</Text>
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
  },
  restaurantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
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
});
