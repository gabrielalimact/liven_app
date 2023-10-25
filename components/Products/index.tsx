import React from 'react';
import { View, StyleSheet, Image, Text, Pressable } from 'react-native';
import { Product } from '../../types/products';
import { SIZES } from '../../constants';
import { Ionicons } from '@expo/vector-icons';

const Products = (props: { product: Product }) => {
  return (
    <View style={styles.viewProducts}>
      <Image
        source={{ uri: props.product.image }}
        style={styles.image}
        />
      <Text>
        {props.product.title}
      </Text>
      <Text>
        ${props.product.price}
      </Text>

      <View>
        <Pressable style={styles.cartBar}>
          <Text>
            Add to Cart
          </Text>
          <Ionicons name="cart-outline" size={24} color="black" />
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 180,
    height: 180,
    marginBottom: SIZES.small,
    resizeMode: 'contain'
  },
  viewProducts: {
    width: '45%',
    alignItems: 'center',
    marginBottom: SIZES.medium,
  },
  cartBar: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    justifyContent: 'center',
  }
});
export default Products;