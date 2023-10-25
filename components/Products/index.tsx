import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Product } from '../../types/products';
import { COLORS, SIZES } from '../../constants';

const Products = (props: { product: Product }) => {
  return (
    <View style={styles.viewProducts}>
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
    elevation: 5,
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
  }
});
export default Products;