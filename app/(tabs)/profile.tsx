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
  
        const favoriteRestaurantsList = favoritesSnapshot.docs.map(doc => {
          const data = doc.data();
          console.log('Fetched restaurant:', data); // Log fetched data
          return data;
        });
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
        const newRestaurantData = {
          name: newRestaurant.trim(),
          latitude: null, // add latitude field
          longitude: null, // add longitude field
          addedAt: new Date()
        };
        await addDoc(favoritesCollection, newRestaurantData);

        // Update the local state
        setFavoriteRestaurants(prev => [...prev, newRestaurantData]);
        setNewRestaurant('');
        setModalVisible(false);
        console.log('Favorite restaurant added:', newRestaurantData);
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

  const handleChoosePic = () => {
    const options = {
      mediaType: 'photo',
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
        setAvatarSource(response.assets[0].uri);
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
        <Text style={styles.message}>User not logged in</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileContainer}>
        {avatarSource ? (
          <Image source={{ uri: avatarSource }} style={styles.avatar} />
        ) : (
          <Image source={require('@/assets/images/avatar_1.png')} style={styles.avatar} />
        )}
        <Text style={styles.name}>{user.displayName}</Text>
        <Button title="Choose Profile Picture" onPress={handleChoosePic} />
      </View>

      <FlatList
        data={favoriteRestaurants}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text>{item.name || 'Unnamed Restaurant'}</Text>
            {item.latitude && item.longitude && (
              <Text style={styles.coordinates}>
                Coordinates: {item.latitude}, {item.longitude}
              </Text>
            )}
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.addButtonText}>Add Favorite Restaurant</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.editButton} onPress={editProfilePress}>
        <Text style={styles.editButtonText}>Edit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Log Out</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter Restaurant Name"
              value={newRestaurant}
              onChangeText={setNewRestaurant}
              style={styles.input}
            />
            <Button title="Add Restaurant" onPress={handleAddFavoriteRestaurant} />
            <Button title="Cancel" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>

      <Modal visible={editModalVisible} animationType="slide" transparent={true}>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <TextInput
              placeholder="Enter New Name"
              value={newName}
              onChangeText={setNewName}
              style={styles.input}
            />
            <Button title="Save Changes" onPress={handleSaveProfile} />
            <Button title="Cancel" onPress={() => setEditModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 8,
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  restaurantItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  coordinates: {
    fontSize: 12,
    color: 'grey',
  },
  addButton: {
    backgroundColor: '#007BFF',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  editButton: {
    backgroundColor: '#28a745',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 16,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  logoutButton: {
    backgroundColor: '#dc3545',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '80%',
    padding: 16,
    backgroundColor: '#fff',
    borderRadius: 8,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    padding: 8,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    marginBottom: 16,
  },
});
