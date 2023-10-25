import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { Product } from '../../types/products'
import { COLORS } from '../../constants'

const CartView = (props: { product: Product }) => {

  function truncateTitle(title: string, maxLength: number) {
    if (title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

    return (
      <View style={styles.container}>
        <View style={styles.cardView}>
          <Image source={{ uri: props.product.image }} style={styles.image} />
          <View style={{gap: 5}}>
            <Text style={{fontSize: 18}}>{truncateTitle(props.product.title, 22)}</Text>
            <Text style={{fontSize: 16}}>${props.product.price}</Text>
          </View>
        </View>
      </View>
    )
}

export default CartView

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: .5,
    padding: 10,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  }
})