import Ionicons from '@expo/vector-icons/Ionicons';
import { StyleSheet, Image, Platform,View, TouchableOpacity,Text } from 'react-native';
import React, {useState } from 'react';
import { Collapsible } from '@/components/Collapsible';
import { ExternalLink } from '@/components/ExternalLink';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import {cuisines} from '../../constants/cuisines';
import { GestureHandlerRootView, ScrollView } from 'react-native-gesture-handler';
import tw from 'twrnc'
import FeatRow from '@/components/FeatRow'
import {featured} from '@/constants/cuisines'
export default function TabTwoScreen() {
  const [activeCuisine, setActiveCuisine] = useState(null);
  return (
    <GestureHandlerRootView>
      <View style={tw`mt-5`}>
      <ScrollView horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{paddingHorizontal:15}}
      style={tw`overflow-visible`}
      > 
      {
        cuisines.map((cuisine,index)=>{
          let isActive = cuisine.id==activeCuisine;
          let btn = isActive?'bg-gray-700':'bg-gray 200';
          let text = isActive?'font-semibold text-gray-800' : 'text-gray-500'
          return (
            <View key={index} style={tw`flex mr-6 justify-center items-center`} >
              <TouchableOpacity onPress={()=>setActiveCuisine(cuisine.id)}
              style={tw`p-2 rounded-full shadowbg-gray-100`}
              >
                <Image style={{width:45,height:45}} source={cuisine.image}></Image>
                
              </TouchableOpacity>
              <Text style={tw`text-sm`}>{cuisine.name}</Text>
            </View>
            
          )
        })
      }
      <View style={tw`mt-5`}>
      </View>


      </ScrollView>
      </View>
      </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
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
