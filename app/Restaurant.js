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
                <View tyle={tw`relative`}>
                <TouchableOpacity onPress={()=>navigation.goBack()}
                        style={[tw`absolute top-10 left-2 bg-gray-200 p-1 rounded-full`, { zIndex: 10 }]}>
                        <Icon.ArrowLeft strokeWidth={3} stroke="black" width={32} height={32} />
                    </TouchableOpacity>
                    <Image source={item.image} style={tw`absolute top-23 w-full h-72 rounded-3xl `} />
                    
                </View>
                <View style={[tw`top-90 bg-white mt-12 pt-4`, { borderTopLeftRadius: 35, borderTopRightRadius: 40 }]}>
                    <View style={tw`px-5`}>
                        <Text style={tw`font-bold py-3`}>{item.name}</Text>
                        <View style={tw`flex-row items-center`}>
                            <Image source={require('../assets/images/star.png')} style={tw`h-4 w-4`} />
                            <Text style={tw`text-xs`}>
                                <Text style={tw`text-green-700`}>{item.stars}</Text>
                                <Text style={tw`text-gray-700`}> ({item.reviews} reviews)</Text> · <Text style={tw`font-semibold text-gray-700`}>{item.category}</Text>
                            </Text>
                        </View>
                    </View>
                    <Text style={tw`text-gray-700 mt-2 px-5 mt-3 mb-8`}>{item.description}</Text>
                </View>
            </ScrollView>
        </View>
    );
}
