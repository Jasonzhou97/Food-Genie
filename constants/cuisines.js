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
    image:require('../assets/images/indian.jpeg')
}



]

export const featured = {
    id: 1,
    title: 'Explore New Favourites',
    description: 'Discover the latest most popular in trend restaurants ',
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
        cuisineID: 7,
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
        cuisineID: 1,
        category: 'Seafood',
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
        cuisineID: 6,
        category: 'American',
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
      {
        id: 4,
        name: 'Song Fa Bak Kut Teh',
        image: require('../assets/images/steak.png'),
        description: 'Traditional peppery pork rib soup',
        lng: 103.845304,
        lat: 1.286957,
        address: '11 New Bridge Rd, Singapore 059383',
        stars: 4.4,
        reviews: '3.0k',
        cuisineID: 1,
        category: 'Chinese',
        dishes: [
          {
            id: 1,
            name: 'Bak Kut Teh',
            description: 'Pork rib soup with a peppery broth',
            price: 12,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Braised Pig’s Trotter',
            description: 'Tender pig’s trotter in a savory braise',
            price: 10,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Preserved Vegetables',
            description: 'Pickled mustard greens',
            price: 4,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 5,
        name: 'Komala Vilas',
        image: require('../assets/images/steak.png'),
        description: 'Authentic South Indian vegetarian cuisine',
        lng: 103.852319,
        lat: 1.300076,
        address: '76-78 Serangoon Rd, Singapore 217981',
        stars: 4.6,
        reviews: '1.5k',
        cuisineID: 3,
        category: 'Indian',
        dishes: [
          {
            id: 1,
            name: 'Masala Dosa',
            description: 'Crispy dosa filled with spicy potato',
            price: 5,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Vadai',
            description: 'Savory lentil fritters',
            price: 2,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Idli',
            description: 'Steamed rice cakes',
            price: 3,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 6,
        name: 'Burnt Ends',
        image: require('../assets/images/steak.png'),
        description: 'Modern Australian BBQ',
        lng: 103.841758,
        lat: 1.280245,
        address: '20 Teck Lim Rd, Singapore 088391',
        stars: 4.8,
        reviews: '2.7k',
        cuisineID: 4,
        category: 'Australian',
        dishes: [
          {
            id: 1,
            name: 'Burnt Ends Sanger',
            description: 'Pulled pork shoulder, cole slaw, chipotle aioli',
            price: 20,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'King Crab and Garlic Brown Butter',
            description: 'Fresh king crab with garlic brown butter',
            price: 45,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Grilled Quail',
            description: 'Charcoal grilled quail with sherry vinegar',
            price: 30,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 7,
        name: 'Teppei Japanese Restaurant',
        image: require('../assets/images/steak.png'),
        description: 'Omakase dining experience',
        lng: 103.844267,
        lat: 1.280632,
        address: '1 Tras Link, #01-18 Orchid Hotel, Singapore 078867',
        stars: 4.9,
        reviews: '1.9k',
        cuisineID: 5,
        category: 'Japanese',
        dishes: [
          {
            id: 1,
            name: 'Omakase',
            description: 'Chef’s choice multi-course meal',
            price: 80,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Kaisen Don',
            description: 'Sashimi rice bowl',
            price: 25,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Teppei Bento',
            description: 'Assorted tempura and sashimi bento',
            price: 30,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
    ],
  };
  