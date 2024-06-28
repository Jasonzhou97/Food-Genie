import {View,Text,ScrollView} from 'react-native'
import React from 'react'
import { useNavigation,useRoute} from '@react-navigation/native'
import tw from "twrnc"

export default function Restaurant(){
    const {params} = useRoute();
    let items = params;
    return(
        <View>
            <ScrollView>
            <View style ={tw`relative`}>
                </View>
            </ScrollView>
        </View>
    )
}