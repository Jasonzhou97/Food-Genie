import { View, Text, ScrollView, Image, TouchableOpacity, Alert } from 'react-native';
import {React, useState, useEffect} from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import * as Icon from 'react-native-feather';
import { getFirestore, collection, getDocs, addDoc } from 'firebase/firestore';
import { auth } from '../config/firebase'; // adjust the import according to your project structure

export default function Restaurant() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;
    const [favoriteRestaurants, setFavoriteRestaurants] = useState([]);

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

    const handleAddToFavorites = async () => {
        const existingFavorite = favoriteRestaurants.find(
            fav => fav.name === item.name
        );

        if (existingFavorite) {
            Alert.alert("Already Added", "This restaurant is already in your favorite list.");
        } else {
            try {
                const firestore = getFirestore();
                const user = auth.currentUser;

                if (user) {
                    const favoritesCollection = collection(firestore, `users/${user.uid}/favoriteRestaurants`);
                    await addDoc(favoritesCollection, {
                        name: item.name,
                        latitude: item.lat,
                        longitude: item.lng,
                        addedAt: new Date()
                    });

                    setFavoriteRestaurants([...favoriteRestaurants, {
                        name: item.name,
                        latitude: item.latitude,
                        longitude: item.longitude
                    }]);

                    Alert.alert("Success", "The restaurant has been added to your favorite list.");
                }
            } catch (error) {
                console.error('Error adding favorite restaurant:', error.message);
            }
        }
    };

    return (
        <View style={tw`flex-1`}>
            <ScrollView>
                <View style={tw`relative`}>
                    <TouchableOpacity onPress={() => navigation.goBack()}
                        style={[tw`absolute top-10 left-2 bg-gray-200 p-1 rounded-full`, { zIndex: 100 }]}>
                        <Icon.ArrowLeft strokeWidth={3} stroke="black" width={32} height={32} />
                    </TouchableOpacity>
                    <Image source={item.image} style={tw`w-full h-72`} />
                </View>
                <View style={[tw`bg-white mt-12 pt-4 flex-1`, { borderTopLeftRadius: 35, borderTopRightRadius: 35 }]}>
                    <View style={tw`px-5`}>
                        <Text style={tw`font-bold py-3 text-black`}>{item.name}</Text>
                        <View style={tw`flex-row items-center`}>
                            <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                            <Text style={tw`text-xs text-black`}>
                                <Text style={tw`text-green-700`}>{item.stars}</Text>
                                <Text style={tw`text-gray-700`}> ({item.reviews} reviews)</Text> · <Text style={tw`font-semibold text-gray-700`}>{item.category}</Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={tw`text-gray-700 mt-2 px-5 mt-3 mb-8`}>{item.description}</Text>
                    <TouchableOpacity 
                        onPress={handleAddToFavorites}
                        style={[tw`absolute bottom-10 right-5 bg-gray-200 p-3 rounded-full`, { zIndex: 100 }]}
                    >
                        <Icon.Plus strokeWidth={3} stroke="black" width={32} height={32} />
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </View>
    );
}
