import React, {useCallback, useEffect, useState} from 'react';

import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSplash from '../components/Loading';
import { COLORS } from '../constants';
import CardView from '../components/CartView';
import { useCart } from '../provider/CartProvider';

const Cart = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [priceTotal, setPriceTotal] = useState(0)
  const { cart  } = useCart()

  useEffect(() => {
    if(cart) {
      const total = cart?.map(item => (item.product.price * item.quantity))
      const totalPrice = total.reduce((acc, currentValue) => acc + currentValue, 0).toFixed(2);
  
      setPriceTotal(Number(totalPrice))
      setIsLoading(false)
  
    }
  }, [cart])


  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  return (
    <SafeAreaView style={{flex: 1}}>
      <View style={styles.topBarCart}>
        <Text style={styles.topBarText}>My cart</Text>
        <Text>{cart?.length} items</Text>
      </View>
      <ScrollView style={{
        backgroundColor: '#fff',
        padding: 20,
      }}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
      >
        {isLoading ? (<LoadingSplash />) : (
          cart?.length === 0 ? (<Text style={{
            fontFamily: 'regular',
            fontSize: 15,
            textAlign: 'center',
          }}>No products in cart</Text>) :
            cart?.map((item, index) => (
              <CardView key={index} product={item} />
            )
            )
        )}

      </ScrollView>
      <View style={{
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        backgroundColor: COLORS.white,
        paddingBottom: 10,
      }}>

      <Pressable style={{
        backgroundColor: COLORS.primary,
        padding: 20,
        borderRadius: 20,
        width: '80%',
        alignItems: 'center',

      }} onPress={() => console.log('Go to payment')}
      >
        <Text style={{fontSize: 20, fontFamily: 'bold'}}>Checkout for ${priceTotal}</Text>
      </Pressable>
      </View>
      
      <View style={{height: 35}}>

      </View>
    </SafeAreaView>
  );
}

export default Cart;

const styles = StyleSheet.create({
  topBarCart: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 20,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },
  topBarText: {
    fontFamily: 'bold',
    fontSize: 30,
  }

})