import { View, Text, ScrollView, Image } from 'react-native';
import React from 'react';
import { useNavigation, useRoute } from '@react-navigation/native';
import tw from 'twrnc';
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from 'react-native-feather';

export default function Restaurant() {
    const navigation = useNavigation();
    const { params } = useRoute();
    let item = params;


    return (
        <View style={tw`flex-1`}>
            <ScrollView>
                <View style={tw`relative`}>
                    <Image source={item.image} style={tw`w-full h-72`} />
                    <TouchableOpacity 
                        style={tw`absolute top-14 left-4 bg-gray-200 p-2 rounded-full`} 
                        onPress={() => navigation.goBack()}
                    >
                        <Icon.ArrowLeft strokeWidth={3} stroke="black" width={24} height={24} />
                    </TouchableOpacity>
                </View>
                <View style={[tw`bg-white mt-12 pt-6`, { borderTopLeftRadius: 35, borderTopRightRadius: 40 }]}>
                    <View style={tw`px-5`}>
                        <Text>{item.name}</Text>
                        <View style={tw`flex-row items-center`}>
                            <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                            <Text style={tw`text-xs`}>
                                <Text style={tw`text-green-700`}>{item.stars}</Text>
                                <Text style={tw`text-gray-700`}> ({item.reviews} reviews)</Text> · <Text style={tw`font-semibold text-gray-700`}>{item.category}</Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={tw`text-gray mt-2 px-5`}>{item.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
