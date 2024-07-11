import {View,Text} from 'react-native'
import React from 'react'

export const cuisines = [
{
    id:1,
    name:'Chinese',
    image:require('../assets/images/ramen.png')
},
{
    id:2,
    name:'Korean',
    image:'Japanese',
    image:require('../assets/images/bibimbap.png')
},
{
    id:3,
    name:'Japanese',
    image:require('../assets/images/sushi.png')
},
{
    id:4,
    name:'Thai',
    image:require('../assets/images/mango.png')
},
{
    id:5,
    name:'Fast Food',
    image:require('../assets/images/burger.png')
},
{
    id:6,
    name:'Western',
    image:require('../assets/images/steak.png')
},
{
    id:7,
    name:"Indian",
    image:require('../assets/images/steak.png')
}



]

export const featured = {
    id: 1,
    title: 'Hot and Spicy',
    description: 'soft and tender fried chicken',
    restaurants: [
      {
        id: 1,
        name: 'The Roti Prata House',
        image: require('../assets/images/steak.png'),
        description: 'Crispy and savory prata',
        lng: 103.839843,
        lat: 1.352083,
        address: '246M Upper Thomson Rd, Singapore 574370',
        stars: 4.5,
        reviews: '2.1k',
        cuisineID:7,
        category: 'Singaporean',
        dishes: [
          {
            id: 1,
            name: 'Plain Prata',
            description: 'Classic crispy prata',
            price: 1.2,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Egg Prata',
            description: 'Prata with egg filling',
            price: 1.8,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Cheese Prata',
            description: 'Prata with melted cheese',
            price: 2.5,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 2,
        name: 'Jumbo Seafood',
        image: require('../assets/images/steak.png'),
        description: 'Famous chili crab',
        lng: 103.893456,
        lat: 1.282302,
        address: '20 Upper Circular Rd, The Riverwalk, Singapore 058416',
        stars: 4.7,
        reviews: '3.2k',
        category: 'Seafood',
        cuisineID:1,
        dishes: [
          {
            id: 1,
            name: 'Chili Crab',
            description: 'Spicy and tangy chili crab',
            price: 70,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Black Pepper Crab',
            description: 'Crab with black pepper sauce',
            price: 65,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Cereal Prawns',
            description: 'Prawns fried with cereal',
            price: 25,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 3,
        name: 'Fatboy’s The Burger Bar',
        image: require('../assets/images/steak.png'),
        description: 'Gourmet burgers',
        lng: 103.819836,
        lat: 1.290270,
        address: '38 Beach Rd, #01-04 South Beach Tower, Singapore 189767',
        stars: 4.3,
        reviews: '1.8k',
        category: 'American',
        cuisineID:6,
        dishes: [
          {
            id: 1,
            name: 'The Wimpy',
            description: 'Beef burger with cheddar cheese',
            price: 15,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Fat Basterd',
            description: 'Double beef patties with bacon and egg',
            price: 22,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Swiss Shroom',
            description: 'Beef burger with Swiss cheese and mushrooms',
            price: 18,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
    ],
  };
  