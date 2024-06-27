import { View, Text } from 'react-native';
import React from 'react';
import tw from 'twrnc';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import RestaurantPg from '@/components/RestaurantPg';

export default function FeatRow({ title, description, restaurants }) {
    return (
        <View>
            <View style={tw`flex-row items-center px-4 justify-between`}>
                <View>
                    <Text style={tw`text-gray-500 text-xs`}>{title}</Text>
                    <Text>{description}</Text>
                </View>
                <TouchableOpacity>
                    <Text>See All</Text>
                </TouchableOpacity>
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
