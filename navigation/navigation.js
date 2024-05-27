import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import index from '@/app/(tabs)/index'
import {login} from '@/app/(tabs)/login'
import SignUp from '@/app/(tabs)/SignUp'

const Stack = createNativeStackNavigator();


export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={index} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={login} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
