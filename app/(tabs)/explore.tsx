import { View, Text, StyleSheet, Image, Platform, ScrollView, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import FeatRow from '@/components/FeatRow';
import { cuisines, featured ,topRated} from '../../constants/cuisines';

export default function ExploreScreen() {
  const [activeCuisine, setActiveCuisine] = useState(null);
  const filteredRest = featured.restaurants.filter(restaurant => activeCuisine?restaurant.cuisineID==activeCuisine:true);
  const filteredTopRated = topRated.restaurants.filter(restaurant=>activeCuisine?restaurant.cuisineID==activeCuisine:true)
  const handleCuisinePress = (cuisineId) => {
    setActiveCuisine(prevCuisine => prevCuisine === cuisineId ? null : cuisineId);
  };
  return (
    <GestureHandlerRootView style={styles.container}>
      <ScrollView>
        <View style={tw`mt-5`}>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`px-4`}
          >
            {cuisines.map((cuisine, index) => {
              const isActive = cuisine.id === activeCuisine;
              return (
                <View key={index} style={tw`flex mr-6 justify-center items-center`}>
                  <TouchableOpacity
                    onPress={() => handleCuisinePress(cuisine.id)}
                    style={tw`p-2 rounded-full ${isActive ? 'bg-gray-700' : 'bg-gray-200'}`}
                  >
                    <Image style={{ width: 45, height: 45 }} source={cuisine.image} />
                  </TouchableOpacity>
                  <Text style={tw`${isActive ? 'font-semibold text-gray-800' : 'text-gray-500'} text-sm`}>
                    {cuisine.name}
                  </Text>
                </View>
              );
            })}
          </ScrollView>
        </View>
        <View style={tw`mt-5 px-4`}>
        <FeatRow
            title={featured.title}
            restaurants={filteredRest}
            description={featured.description}
          />
          <FeatRow
            title={topRated.title}
            restaurants={filteredTopRated}
            description={topRated.description}
          />
        </View>
      </ScrollView>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
});
