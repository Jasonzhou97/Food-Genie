import { View, Text, Image } from 'react-native';
import React from 'react';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
import tw from 'twrnc';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { useNavigation} from '@react-navigation/native'
export default function RestaurantPg({ item }) {
    const navigation = useNavigation();
    return (
        <TouchableWithoutFeedback onPress={()=>navigation.navigate('Restaurant')}>
            <View style={tw`shadow-lg mr-6 bg-white rounded-3xl`}>
                <Image style={tw`h-36 w-64 rounded-t-3xl`} source={item.image} />
                <Text style={tw`text-lg font-semibold`}>{item.name}</Text>
                <View style={tw`flex-row items-center`}>
                    <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                    <Text style={tw`text-xs`}>
                        <Text style={tw`text-green-700`}>{item.stars}</Text>
                        <Text style={tw`text-gray-700`}> ({item.reviews} reviews)</Text> · <Text style={tw`font-semibold text-gray-700`}>{item.category}</Text>
                    </Text>
                </View>
            </View>
            <View style={tw`flex-row psace-x-1 items-center`}>
                <Text style={tw`gray-gray-700 text-xs`}>Nearby {item.address}</Text>
            </View>
        </TouchableWithoutFeedback>
    );
}