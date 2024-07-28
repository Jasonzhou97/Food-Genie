import { View, Text, useColorScheme } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { ScrollView } from 'react-native-gesture-handler';
import RestaurantPg from '@/components/RestaurantPg';

export default function FeatRow({ title, description, restaurants }) {
    const colorScheme = useColorScheme();
    const isDarkMode = colorScheme === 'dark';

    return (
        <View>
            <View style={tw`flex-row items-center px-4 justify-between`}>
                <View>
                    <Text style={[tw`text-lg font-bold`, { color: isDarkMode ? 'white' : 'black' }]}>{title}</Text>
                    <Text style={[tw`text-xs`, { color: isDarkMode ? 'white' : 'black' }]}>{description}</Text>
                </View>
            </View>
            <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{ paddingHorizontal: 15 }}
                style={tw`overflow-visible py-5`}
            >
                {restaurants.map((restaurant, index) => (
                    <RestaurantPg item={restaurant} key={index} />
                ))}
            </ScrollView>
        </View>
    );
}
