import { View, Text } from 'react-native'
import React from 'react'
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {index} from './app/index'
import {Login} from './app/login'
import {SignUp} from './app/SignUp'
import {Register} from './app/register'
import {Map} from './app/map'



const Stack = createNativeStackNavigator();

export default function AppNavigation() {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRouteName='Welcome'>
          <Stack.Screen name="Welcome" options={{headerShown: false}} component={index} />
          <Stack.Screen name="Login" options={{headerShown: false}} component={Login} />
          <Stack.Screen name="SignUp" options={{headerShown: false}} component={SignUp} />
          <Stack.Screen name="Register" options={{headerShown: false}} component={Register} />
          <Stack.Screen name="Map" options={{headerShown: false}} component={Map} />
        </Stack.Navigator>
      </NavigationContainer>
    )
  }
  
