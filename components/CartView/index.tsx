import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { ProductsToCart } from '../../types/products';
import { COLORS } from '../../constants'
import { Ionicons } from '@expo/vector-icons';
import { useCart } from '../../provider/CartProvider';


const CartView = (props: { product: ProductsToCart }) => {
  const { addToCart, removeToCart } = useCart()
  function truncateTitle(title: string, maxLength: number) {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  const truncatedTitle = useMemo(() => truncateTitle(props.product.product.title, 25), [props.product.product.title]);
  const totalPrice = useMemo(() => (props.product.product.price * props.product.quantity).toFixed(2), [props.product.product.price, props.product.quantity]);


  const handleAddQuantity = () => {
    addToCart(props.product.product)
  }
  const handleRemoveQuantity = () => {
    removeToCart(props.product.product)
  }
  const handleRemoveAll = () => {
    removeToCart(props.product.product, true)
  }


  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Image source={{ uri: props.product.product.image }} style={styles.image} />
        <View style={{flex: 2}}>
          <View style={styles.titleBar}>
            <Text style={{fontSize: 16}}>{truncatedTitle}</Text>
            <Pressable onPress={handleRemoveAll}  testID='remove-all-button'>
            <Ionicons name='ios-close' size={20} color={COLORS.gray2} />
            </Pressable>
          </View>
          <View style={styles.priceQuantity}>
            <Text style={{fontSize: 18}}>${totalPrice}</Text>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Pressable onPress={handleRemoveQuantity} testID='remove-quantity-button'>
                <Ionicons name="ios-remove" size={30} color={COLORS.red} />
              </Pressable>
              <Text style={{fontSize: 18}} testID='quantity'>{props.product.quantity}</Text>
              <Pressable onPress={handleAddQuantity} testID='add-quantity-button'>
                <Ionicons name="ios-add" size={30} color={COLORS.primary} testID='add-button-icon'/>
              </Pressable>
            </View>
          </View>
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
    padding: 10,
    marginBottom: 10,
    minHeight: 120,
    justifyContent: 'center',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.gray2,

  },
  image: {
    width: 75,
    height: 75,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  cardView: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 15,
  },
  priceQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBar: {
    flexDirection: 'row',
    paddingBottom: 30,
    justifyContent: 'space-between'
  },
})