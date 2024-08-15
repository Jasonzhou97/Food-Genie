import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity, Alert, FlatList, TextInput, Modal, Button } from 'react-native';
import { AuthContext } from '../../hooks/AuthContext';
import { auth } from '../../config/firebase'; 
import { signOut, updateProfile } from 'firebase/auth';
import { useNavigation } from '@react-navigation/native';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc } from 'firebase/firestore';
import { launchImageLibrary } from 'react-native-image-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';

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
  
        const favoriteRestaurantsList = favoritesSnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        }));
        setFavoriteRestaurants(favoriteRestaurantsList);
      }
    };
  
    fetchFavoriteRestaurants();
  }, [user]);
  //navigate to maps page for them to add
  const handleAdd = () =>{
    navigation.navigate('map');
  }
  const handleAddFavoriteRestaurant = async () => {
    navigation.navigate('map');
    if (newRestaurant.trim()) {
      try {
        const firestore = getFirestore();
    const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);

    const newRestaurantData = {
      name: newRestaurant.trim(),
      latitude: null,
      longitude: null,
      addedAt: new Date()
    };
    const docRef = await addDoc(favoritesCollection, newRestaurantData);

    setFavoriteRestaurants(prev => [...prev, { id: docRef.id, ...newRestaurantData }]);
    setNewRestaurant('');
    setModalVisible(false);
  } catch (error) {
    Alert.alert('Error', 'Failed to add favorite restaurant');
  }
  };
  
}

  const handleRemoveFavoriteRestaurant = async (id) => {
    try {
      const firestore = getFirestore();
      const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
      await deleteDoc(doc(favoritesCollection, id));
  
      setFavoriteRestaurants(prev => prev.filter(restaurant => restaurant.id !== id));
    } catch (error) {
      console.error('Error removing favorite restaurant:', error);
      Alert.alert('Error', 'Failed to remove favorite restaurant');
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      Alert.alert('Log Out', 'You have been signed out successfully');
      navigation.navigate('index'); 
    } catch (error) {
      Alert.alert('Sign Out Error');
    }
  };

  const editProfilePress = () => {
    console.log('Profile Edit button pressed');
    setEditModalVisible(true);
  };


  

  const handleSaveProfile = async () => {
    console.log('handleSaveProfile called');
  
    if (newName.trim()) {
      try {
        const firestore = getFirestore();
        const userDocRef = doc(firestore, 'users', user.uid);
        await updateDoc(userDocRef, {
          name: newName.trim(), 
        });
  
        await updateProfile(auth.currentUser, {
          displayName: newName.trim(),  
        });
  
        const updatedUser = {
          ...user,
          displayName: newName.trim(),
        };
        setUser(updatedUser);
  
        setEditModalVisible(false);
        Alert.alert('Success', 'Profile name updated successfully');
      } catch (error) {
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

      </View>

      <FlatList
        data={favoriteRestaurants}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.restaurantItem}>
            <Text>{item.name || 'Unnamed Restaurant'}</Text>
            <TouchableOpacity onPress={() => handleRemoveFavoriteRestaurant(item.id)}>
              <Ionicons name="remove-circle" size={24} color="red" />
            </TouchableOpacity>
          </View>
        )}
      />

      <TouchableOpacity style={styles.addButton} onPress={handleAdd}>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
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
