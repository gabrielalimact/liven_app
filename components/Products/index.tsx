import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Product } from '../../types/products';
import { COLORS, SIZES } from '../../constants';
import { useNavigation } from '@react-navigation/native';


const Products = (props: { product: Product }) => {
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate('ProductDetails', { productId: props.product.id });
  }
  return (
    <Pressable onPress={() =>handlePress()} style={styles.viewProducts}>
    <View>
      <Image
        source={{ uri: props.product.image }}
        style={styles.image}
      />
      <Text style={styles.titleItem}>
        {props.product.title}
      </Text>
      <Text style={styles.priceItem}>
        ${props.product.price}
      </Text>
    </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 150,
    height: 150,
    marginBottom: SIZES.small,
    resizeMode: 'contain',
  },
  viewProducts: {
    width: '48%',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    borderRadius: 10,
    padding: 10,
    shadowColor: COLORS.gray2,
    shadowOffset:{
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
  },
  cartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  titleItem: {
    fontFamily: 'regular',
    fontSize: 14,
    textAlign: 'center',
  },
  priceItem: {
    fontFamily: 'bold',
    fontSize: 18,
    textAlign: 'center',
  }
});
export default Products;