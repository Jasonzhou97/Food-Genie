import React, { useContext, useEffect, useState } from 'react';
import Ionicons from '@expo/vector-icons/Ionicons';
import { Alert,StyleSheet, Image, Platform,Text,View,FlatList,TouchableOpacity} from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { getFirestore, doc, getDoc } from 'firebase/firestore';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';

export default function favouritesScreen() {
  const {user} = useContext(AuthContext);
  const [favRestaurants,setFavRestaurants] = useState('');
  const navigation = useNavigation();

  const [output,setOutput] = useState('');

  useEffect(()=>{
    const fetchFavoriteRestaurants = async() =>{
      if(user){
        const firestore = getFirestore();
        const userDoc = await getDoc(doc(firestore,'users',user.uid));
        if(userDoc.exists()){
          const userData = userDoc.data();
          setFavRestaurants(userData.favoriteRestaurants||[]);
        }
        else{
          console.log('User document does not exist')
        }
      }
    };
    fetchFavoriteRestaurants();

  },[user]);
          
  console.log(favRestaurants);
  const recButton = async () =>{
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
  
  /*
  const recButton = async ()=>{
    try{
      const res = await fetch("http://localhost:5000/recommend",{
        method:"POST",
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify({
          favorites:favRestaurants
        })
      });

      const textResponse = await res.json();
      console.log('Server response:', textResponse); // Log the raw response for debugging
      const result = JSON.parse(textResponse);
      if (res.ok) {
        Alert.alert('Recommendations', result.recommendations);
      } else {
        Alert.alert('Error', result.error);
      }
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      Alert.alert('Error', 'Failed to fetch recommendations');
    }

  }
*/
  return (
    <View style={styles.container}>
      <Text style={styles.sectionHead}> Your Favourite Restaurants</Text>
      <FlatList data={favRestaurants}
      renderItem={({item}) => (
        <View style={styles.restaurantItem}>
          <Text style={styles.restaurantText}>{item}</Text>
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
    container:{
      flex:1,
      padding:20,
      backgroundColor:'#fff',
    },
    sectionHead:{
      fontSize:20,
    fontWeight:'bold',
    marginBottom:10,
    },
    restaurantItem:{
      padding:10,
      borderBottomWidth:1,
      borderBottomColor:'#ccc',
      width:'100%',
    },
    restaurantText:{
      fontSize: 16,
    color:'#333',
    },
    noFavText: {
      fontSize:16,
      color:'#777',
      marginTop:10,
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
