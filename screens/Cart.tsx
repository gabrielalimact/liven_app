import AsyncStorage from '@react-native-async-storage/async-storage';
import React, {useCallback, useEffect, useState} from 'react';

import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
  StyleSheet
} from 'react-native';
import { Product } from '../types/products';
import { SafeAreaView } from 'react-native-safe-area-context';
import LoadingSplash from '../components/Loading';
import { COLORS } from '../constants';
import CardView from '../components/CartView';


const Cart = () => {
  const [data, setData] = useState<Product[]>()
  const [isLoading, setIsLoading] = useState(true)

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        setData(JSON.parse(cartData));
        setIsLoading(false);
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    }
  };

  const cleanCart = async () => {
    try {
      await AsyncStorage.removeItem('cart');
      setData([]);
      setIsLoading(false);

    } catch (error) {
      console.error('Erro ao limpar o carrinho:', error);
    }
  }


  const dataStorage = AsyncStorage.getItem('cart');
  useEffect(() => {
    loadCart();
  }, [data, dataStorage])

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
        <Text style={styles.topBarText}>Your cart</Text>
        <Text>{data?.length} items</Text>
        <Pressable style={{
          backgroundColor: COLORS.primary,
          padding: 10,
          borderRadius: 10,
          alignItems: 'center',
        }} onPress={() => cleanCart()}
        >
          <Text>Clean Cart</Text>
        </Pressable>
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
          data?.length === 0 ? (<Text style={{
            fontFamily: 'regular',
            fontSize: 15,
            textAlign: 'center',
          }}>No products in cart</Text>) :
            data?.map((item, index) => (
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
        <Text style={{fontSize: 20, fontFamily: 'bold'}}>Checkout for ${data?.reduce((acc, item) => acc + item.price, 0).toFixed(2)}</Text>
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