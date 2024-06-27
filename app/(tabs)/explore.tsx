import { View, Text, StyleSheet, Image, Platform, ScrollView } from 'react-native';
import React, { useState } from 'react';
import { TouchableOpacity, GestureHandlerRootView } from 'react-native-gesture-handler';
import tw from 'twrnc';
import FeatRow from '@/components/FeatRow';
import { cuisines, featured } from '../../constants/cuisines';

export default function TabTwoScreen() {
  const [activeCuisine, setActiveCuisine] = useState(null);

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
                    onPress={() => setActiveCuisine(cuisine.id)}
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
          {[featured, featured, featured].map((item, index) => (
            <FeatRow
              key={index}
              title={item.title}
              restaurants={item.restaurants}
              description={item.description}
            />
          ))}
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
