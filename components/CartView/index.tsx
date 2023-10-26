import React, { useMemo } from 'react'
import { View, Text, StyleSheet, Image, Pressable } from 'react-native'
import { ProductsToCart } from '../../types/products';
import { COLORS } from '../../constants'
import { AntDesign } from '@expo/vector-icons';
import { useCart } from '../../provider/CartProvider';


const CartView = (props: { product: ProductsToCart }) => {
  const { addToCart, removeToCart } = useCart()
  function truncateTitle(title: string, maxLength: number) {
    if (title && title.length > maxLength) {
      return title.substring(0, maxLength) + '...';
    }
    return title;
  }

  const truncatedTitle = useMemo(() => truncateTitle(props.product.product.title, 15), [props.product.product.title]);
  const totalPrice = useMemo(() => (props.product.product.price * props.product.quantity).toFixed(2), [props.product.product.price, props.product.quantity]);


  const handleAddQuantity = () => {
    addToCart(props.product.product)
  }
  const handleRemoveQuantity = () => {
    removeToCart(props.product.product)
  }


  return (
    <View style={styles.container}>
      <View style={styles.cardView}>
        <Image source={{ uri: props.product.product.image }} style={styles.image} />
        <View style={{ flexDirection: 'column'}}>
          <View style={styles.titleBar}>
            <Text style={{fontSize: 22}}>{truncatedTitle}</Text>
            <Pressable onPress={handleAddQuantity}>
              <AntDesign name="close" size={15} color="black" />
            </Pressable>
          </View>
          <View style={styles.priceQuantity}>
            <Text style={{fontSize: 18}}>${totalPrice}</Text>
            <View style={{flexDirection: 'row', gap: 10, alignItems: 'center'}}>
              <Pressable onPress={handleRemoveQuantity}>
                <AntDesign name="minuscircleo" size={24} color="black" />
              </Pressable>
              <Text style={{fontSize: 16}}>{props.product.quantity}</Text>
              <Pressable onPress={handleAddQuantity}>
                <AntDesign name="pluscircleo" size={24} color="black" />
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
    shadowColor: COLORS.gray2,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: .5,
    padding: 10,
    marginBottom: 10,
    borderRadius: 20,
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
  },
  priceQuantity: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  titleBar: {
    flexDirection: 'row',
    paddingVertical: 10,
    justifyContent: 'center'
  }
})