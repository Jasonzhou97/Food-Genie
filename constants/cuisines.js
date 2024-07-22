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
    description: 'Discover the latest most popular in trend restaurants',
    restaurants: [
      {
        id: 1,
        name: 'The Roti Prata House',
        image: require('../assets/images/Rotiprata.png'),
        description: 'Crispy and savory prata',
        lng: 103.839843,
        lat: 1.352083,
        address: '246M Upper Thomson Rd, Singapore 574370',
        stars: 4.2,
        reviews: '2.1k',
        cuisineID: 7, // Indian
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
        image: require('../assets/images/JumboSeafood.png'),
        description: 'Famous chili crab',
        lng: 103.893456,
        lat: 1.282302,
        address: '20 Upper Circular Rd, The Riverwalk, Singapore 058416',
        stars: 4.7,
        reviews: '3.2k',
        cuisineID: 1, // Chinese
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
        image: require('../assets/images/FatBoys.png'),
        description: 'Gourmet burgers',
        lng: 103.819836,
        lat: 1.290270,
        address: '38 Beach Rd, #01-04 South Beach Tower, Singapore 189767',
        stars: 4.3,
        reviews: '1.8k',
        cuisineID: 5, // Western
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
        image: require('../assets/images/BakKutTeh.png'),
        description: 'Traditional peppery pork rib soup',
        lng: 103.845304,
        lat: 1.286957,
        address: '11 New Bridge Rd, Singapore 059383',
        stars: 4.4,
        reviews: '3.0k',
        cuisineID: 1, // Chinese
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
        image: require('../assets/images/KomalaVilas.png'),
        description: 'Authentic South Indian vegetarian cuisine',
        lng: 103.852319,
        lat: 1.300076,
        address: '76-78 Serangoon Rd, Singapore 217981',
        stars: 4.6,
        reviews: '1.5k',
        cuisineID: 7, // Indian
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
        image: require('../assets/images/BurntEnds.png'),
        description: 'Modern Australian BBQ',
        lng: 103.841758,
        lat: 1.280245,
        address: '20 Teck Lim Rd, Singapore 088391',
        stars: 4.8,
        reviews: '2.7k',
        cuisineID: 6, // Western
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
        image: require('../assets/images/TeppeiJapanese.png'),
        description: 'Omakase dining experience',
        lng: 103.844267,
        lat: 1.280632,
        address: '1 Tras Link, #01-18 Orchid Hotel, Singapore 078867',
        stars: 4.9,
        reviews: '1.9k',
        cuisineID: 3, // Japanese
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
  }


export const topRated = {
    id: 2,
    title: 'Top Rated Picks',
    description: 'Check out the highest rated restaurants in town',
    restaurants: [
      {
        id: 1,
        name: 'Candlenut',
        image: require('../assets/images/Candlenut.jpeg'),
        description: 'Michelin-starred Peranakan cuisine',
        lng: 103.811554,
        lat: 1.278887,
        address: '17A Dempsey Rd, Singapore 249676',
        stars: 4.7,
        reviews: '1.2k',
        cuisineID: 1, // Assuming 1 is for Peranakan cuisine
        category: 'Peranakan',
        dishes: [
          {
            id: 1,
            name: 'Buah Keluak Ayam',
            description: 'Chicken with Indonesian black nut',
            price: 25,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Kueh Pie Tee',
            description: 'Crispy pastry with savory fillings',
            price: 15,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Chap Chye',
            description: 'Mixed vegetable stew',
            price: 20,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 2,
        name: 'Odette',
        image: require('../assets/images/Odette.png'),
        description: 'Modern French cuisine',
        lng: 103.851959,
        lat: 1.290270,
        address: '1 St Andrew’s Rd, #01-04 National Gallery, Singapore 178957',
        stars: 4.8,
        reviews: '2.5k',
        cuisineID: 2, // Assuming 2 is for French cuisine
        category: 'French',
        dishes: [
          {
            id: 1,
            name: 'Heirloom Beetroot Variation',
            description: 'A variety of beetroot dishes',
            price: 45,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Challans Guinea Fowl',
            description: 'Guinea fowl with foie gras',
            price: 60,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Rosemary Smoked Organic Egg',
            description: 'Smoked egg with caviar and creme fraiche',
            price: 35,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 3,
        name: 'Burnt Ends',
        image: require('../assets/images/BurntEnds.png'),
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
        id: 4,
        name: 'Labyrinth',
        image: require('../assets/images/Labyrinth.png'),
        description: 'Innovative Singaporean cuisine',
        lng: 103.855236,
        lat: 1.288559,
        address: '8 Raffles Ave, #02-23, Esplanade Mall, Singapore 039802',
        stars: 4.6,
        reviews: '1.3k',
        cuisineID: 1, // Assuming 1 is for Singaporean cuisine
        category: 'Singaporean',
        dishes: [
          {
            id: 1,
            name: 'Ang Moh Chicken Rice',
            description: 'A modern take on chicken rice',
            price: 30,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Chili Crab',
            description: 'Spicy and tangy chili crab',
            price: 70,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Laksa',
            description: 'Rich and spicy noodle soup',
            price: 25,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
      {
        id: 5,
        name: 'Les Amis',
        image: require('../assets/images/LesAmis.png'),
        description: 'Fine French dining',
        lng: 103.834215,
        lat: 1.311928,
        address: '1 Scotts Rd, #01-16 Shaw Centre, Singapore 228208',
        stars: 4.9,
        reviews: '1.6k',
        cuisineID: 2, // Assuming 2 is for French cuisine
        category: 'French',
        dishes: [
          {
            id: 1,
            name: 'Blue Lobster',
            description: 'Lobster with caviar and cauliflower',
            price: 85,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 2,
            name: 'Lamb Saddle',
            description: 'Roasted lamb saddle with herbs',
            price: 70,
            image: require('../assets/images/pizzaDish.png'),
          },
          {
            id: 3,
            name: 'Lemon Tart',
            description: 'Classic French lemon tart',
            price: 20,
            image: require('../assets/images/pizzaDish.png'),
          },
        ],
      },
    ],
  };