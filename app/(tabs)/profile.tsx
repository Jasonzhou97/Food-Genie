import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList, TextInput, Modal, Button } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { auth } from '../../config/firebase'; 
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';

export default function ProfileScreen() {
  const { user, setUser } = useContext(AuthContext);
  const navigation = useNavigation();
  const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);
  const [newRestaurant, setNewRestaurant] = useState('');
  const [newName, setNewName] = useState(user?.displayName || '');
  const [editModalVisible, setEditModalVisible] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [avatarSource, setAvatarSource] = useState(null);

  useEffect(() => {
    const fetchFavoriteRestaurants = async () => {
      if (user) {
        const firestore = getFirestore();
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
        const favoritesSnapshot = await getDocs(favoritesCollection);

        const favoriteRestaurantsList = favoritesSnapshot.docs.map(doc => doc.data());
        setFavoriteRestaurants(favoriteRestaurantsList);
      }
    };

    fetchFavoriteRestaurants();
  }, [user]);

  const handleAddFavoriteRestaurant = async () => {
    if (newRestaurant.trim()) {
      try {
        const firestore = getFirestore();
        const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);

        // Add the new restaurant to the subcollection
        await addDoc(favoritesCollection, {
          name: newRestaurant.trim(),
          addedAt: new Date()
        });

        // Update the local state
        setFavoriteRestaurants(prev => [...prev, { name: newRestaurant.trim() }]);
        setNewRestaurant('');
        setModalVisible(false);
        console.log('Favorite restaurant added:', newRestaurant.trim());
      } catch (error) {
        console.error('Error adding favorite restaurant:', error);
        Alert.alert('Error', 'Failed to add favorite restaurant');
      }
    } else {
      Alert.alert('Error', 'Please enter a restaurant name.');
    }
  };

  const handleLogout = async () => {
    try {
      console.log('Logout button pressed');
      await signOut(auth);
      Alert.alert('Log Out', 'You have been signed out successfully');
      navigation.navigate('Home'); 
    } catch (error) {
      console.error('Sign Out Error:', error);
      Alert.alert('Sign Out Error');
    }
  };

  const editProfilePress = () => {
    console.log('Profile Edit button pressed');
    setEditModalVisible(true);
  };

  const handleChoosePic = () =>{
    const options ={
        mediaType:'photo',
        maxWidth: 150,
        maxHeight: 150,
        quality: 1,
    };
    launchImageLibrary(options, (response) => {
        if (response.didCancel) {
          console.log('User cancelled image picker');
        } else if (response.error) {
          console.error('ImagePicker Error:', response.error);
          Alert.alert('Error', 'Failed to pick an image');
        } else {
          // Set the selected image URI to state
          setAvatarSource(response.uri);
        }
      });
    };

  const handleSaveProfile = async () => {
    console.log('handleSaveProfile called');
    
    if (newName.trim()) {
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
  
        console.log('Firestore initialized');
        console.log(`Document reference: users/${user.uid}`);
  
        // Update Firestore document
        console.log('Updating Firestore document');
        await updateDoc(userDocRef, {
          username: newName.trim(),
        });
  
        console.log('Firestore document updated successfully');
  
        // Update Firebase Auth profile
        console.log('Updating Firebase Auth profile');
        await updateProfile(auth.currentUser, {
          displayName: newName.trim(),
        });
  
        console.log('Firebase Auth profile updated successfully');

        // Update the local user context with the new name
        const updatedUser = {
          ...user,
          displayName: newName.trim(),
        };
        setUser(updatedUser);
  
        setEditModalVisible(false);
        console.log('Profile name updated:', newName.trim());
        Alert.alert('Success', 'Profile name updated successfully');
      } catch (error) {
        console.error('Error updating profile name:', error);
        Alert.alert('Error', 'Failed to update profile name');
      }
    } else {
      Alert.alert('Error', 'Please enter a valid name.');
    }
  };

  if (!user) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}> User not logged in</Text>
      </View>
    );
  }


  return (
    <View style={styles.container}>
      <Image
        source={require('../../assets/images/Logo.png')}
        style={styles.profileImage}
      />
      <Text style={styles.name}>{user.displayName || 'No Name Provided'}</Text>
      <Text style={styles.email}>{user.email}</Text>

      <TouchableOpacity onPress={editProfilePress} style={styles.button}>
        <Text style={styles.buttonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChoosePic} style={styles.button}>
        <Text style={styles.buttonText}>Profile Picture</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleLogout}>
        <Text style={styles.buttonText}>Log Out</Text>
      </TouchableOpacity>

      <Text style={styles.sectionTitle}>Favorite Restaurants</Text>
      <FlatList
        data={favoriteRestaurants}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text style={styles.restaurantText}>{item}</Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.noFavoritesText}>No favorite restaurants</Text>}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.buttonText}>Add Favorite Restaurant</Text>
      </TouchableOpacity>

      <Modal
        animationType="slide"
        transparent={true}
        visible={editModalVisible}
        onRequestClose={() => {
          setEditModalVisible(!editModalVisible);
      }}
      >
      <View style={styles.modalView}>
      <Text style={styles.modalText}>Edit Profile Name</Text>
      <TextInput
        style={styles.input}
        placeholder="New Name"
        value={newName}
        onChangeText={setNewName}
      />
      <TouchableOpacity style={styles.button} onPress={handleSaveProfile}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setEditModalVisible(!editModalVisible)}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>
      </View>
      </Modal>


      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Add a new favorite restaurant</Text>
          <TextInput
            style={styles.input}
            placeholder="Restaurant Name"
            value={newRestaurant}
            onChangeText={setNewRestaurant}
          />
          <TouchableOpacity style={styles.button} onPress={handleAddFavoriteRestaurant}>
            <Text style={styles.buttonText}>Add</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.buttonClose]} onPress={() => setModalVisible(!modalVisible)}>
            <Text style={styles.buttonText}>Cancel</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  email: {
    fontSize: 18,
    color: '#777',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#1E90FF',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
  },
  addButton: {
    backgroundColor: '#32CD32',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
    width: '80%',
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  message: {
    fontSize: 18,
    color: '#777',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
    marginBottom: 10,
  },
  restaurantItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    width: '100%',
    alignItems: 'center',
  },
  restaurantText: {
    fontSize: 16,
    color: '#333',
  },
  noFavoritesText: {
    fontSize: 16,
    color: '#777',
    marginTop: 10,
  },
  modalView: {
    marginTop: 300,
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontSize: 18,
    fontWeight: 'bold',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonClose: {
    backgroundColor: '#FF6347',
  },
});
 