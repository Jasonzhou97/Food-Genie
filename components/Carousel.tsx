import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');

// Carousel data (replace with your image paths)
const carouselData = [
  { id: 1, source: require('@/assets/images/food_stock.jpeg') },
  { id: 2, source: require('@/assets/images/food_1.jpeg') },
  { id: 3, source: require('@/assets/images/food_1.jpeg') },
  { id: 4, source: require('@/assets/images/food_1.jpeg') },
  { id: 5, source: require('@/assets/images/food_1.jpeg') },
  { id: 6, source: require('@/assets/images/food_1.jpeg') },
];

const ImageCarousel: React.FC = () => {
  return (
    <View style={styles.carouselContainer}>
      <Carousel
        loop
        width={width}
        height={width / 2}
        autoPlay={true}
        data={carouselData}
        scrollAnimationDuration={1000}
        renderItem={({ item }) => (
          <View style={styles.carouselItem}>
            <Image source={item.source} style={styles.carouselImage} resizeMode="cover" />
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  carouselContainer: {
    flex: 1,
    paddingVertical: 16,
    justifyContent:'center',
    alignItems:'center',
  },
  carouselItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  carouselImage: {
    width: '90%',
    height: '100%',
    borderRadius:10
  },
});

export default ImageCarousel;
