import {View,Text,ScrollView,Image} from 'react-native'
import React from 'react'
import { useNavigation,useRoute} from '@react-navigation/native'
import tw from "twrnc"
import { TouchableOpacity } from 'react-native-gesture-handler';
import * as Icon from 'react-native-feather'
export default function Restaurant(){
    const {params} = useRoute();
    const items = params ?? {};
    return(
        <View>
            <ScrollView>
            <View style ={tw`relative`}>
            <Image source={items.image} style={tw`w-full h-72`} />
            <TouchableOpacity style={`absolute top-14 left-4 bg-gray`}>
            <Icon.ArrowLeft strokeWidth={3}/>
            </TouchableOpacity>
                </View>
                <View style={{borderTopLeftRadius:35,borderTopRightRadius: 40}}>

                </View>
            </ScrollView>
        </View>
    )
}