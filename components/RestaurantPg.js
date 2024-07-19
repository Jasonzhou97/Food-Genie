import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';

export default function RestaurantPg({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={() => navigation.navigate('Restaurant', item)}>
            <View style={tw`shadow-lg mr-6 bg-white rounded-3xl mb-4`}>
                <Image style={tw`h-36 w-full rounded-t-3xl`} source={item.image} />
                <View style={tw`p-4`}>
                <Text style={tw`text-lg font-semibold mb-1`}>{item.name}</Text>
                <View style={tw`flex-row items-centre mb-2`}>
                    <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4 mr-1`} />
                    <Text style={tw`text-xs`}>
                        <Text style={tw`text-green-700`}>{item.stars}</Text>
                        <Text style={tw`text-gray-700`}> ({item.reviews} reviews)</Text> · <Text style={tw`font-semibold text-gray-700`}>{item.category}</Text>
                    </Text>
            </View>
            <View style={tw`flex-row justify-center items-center`}>
                <Text style={tw`text-gray-700 text-xs text-center font-semibold`}>Nearby: {item.address}</Text>
            </View>
            </View>
            </View>
        </TouchableWithoutFeedback>
    );
}
