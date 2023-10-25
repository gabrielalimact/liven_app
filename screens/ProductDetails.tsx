import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable, ScrollView, Alert } from 'react-native';
import { getProductDetails } from '../api/products';
import { Product } from '../types/products';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Route, useNavigation } from '@react-navigation/native';
import { COLORS, SIZES } from '../constants';
import LoadingSplash from '../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';


const ProductDetails = ({ route }: { route: Route<string, { productId: string }> }) => {
  const { productId } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState<Product>()
  const [isLoading, setIsLoading] = useState(true)
  const [cart, setCart] = useState<Product[]>([])

  const handlePressBack = () => {
    navigation.goBack();
  }

  const loadCart = async () => {
    try {
      const cartData = await AsyncStorage.getItem('cart');
      if (cartData) {
        console.log('Carrinho carregado:', JSON.parse(cartData));
        setCart(JSON.parse(cartData));
      }
    } catch (error) {
      console.error('Erro ao carregar o carrinho:', error);
    }
  };
  const saveCart = async (cartData: Product[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
      console.log(cartData)
    } catch (error) {
      console.error('Erro ao salvar o carrinho:', error);
    }
  };

  const handleAddToCart = () => {
    const updatedCart = [...cart, product as Product];
    setCart(updatedCart);

    saveCart(updatedCart);

    Alert.alert(
      'Item added to cart',
      'What would you like to do?',
      [
        {
          text: 'Keep Shopping',
          onPress: () => console.log('Continuar Olhando Pressed'),
        },
        {
          text: 'Go to Cart',
          onPress: () => navigation.navigate('Cart'),
        },
      ]
    );
  }

  useEffect(() => {
    getProductDetails(Number(productId)).then((res) => {
      setProduct(res)
      setIsLoading(false)
    })

    loadCart();

  }, [productId])

  return (
    <SafeAreaView  style={{ flex: 1 }}>
      {isLoading ? (<LoadingSplash />) : (
        <>
        <View style={styles.barBack}>
          <Pressable onPress={() => handlePressBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.black}/>
          </Pressable>
        </View>
        <ScrollView style={styles.container}>
          <View style={{alignItems: 'center'}}>
            <Image
              source={{ uri: product?.image }}
              style={styles.image}
            />
          </View>
          <View style={styles.ratingView}>
            <Text style={styles.ratingText}>
              <Ionicons name='star' size={18}/>
              {product?.rating.rate}</Text>
            <Text style={styles.ratingCount}>{product?.rating.count} reviews</Text>
          </View>
          <Text style={styles.title}>{product?.title}</Text>
          <Text>{product?.description}</Text>
          <View style={{height:70}}></View>
        </ScrollView>
        <View style={styles.bottomBar}>
          <Text style={styles.price}>${product?.price}</Text>
          <Pressable onPress={()=> handleAddToCart()} style={styles.pressableIconCard}>
            <Text style={{fontSize: 18, color: COLORS.white}}>Add to cart</Text>
            <Ionicons name='cart' size={30} color={COLORS.white}/>
          </Pressable>
        </View>
        </>
      )}
      
    </SafeAreaView>
  )
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  barBack: {
    height: 40,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
  },
  image: {
    width: '100%',
    height: 450,
    marginBottom: 10,
    resizeMode: 'contain',
  },
  title: {
    fontFamily: 'regular',
    fontSize: 24,
    textAlign: 'left',
  },
  price: {
    fontFamily: 'semibold',
    fontSize: 34,
    textAlign: 'left',
  },
  ratingText: {
    fontFamily: 'regular',
    fontSize: 18,
    color: COLORS.orange,
  },
  ratingCount: {
    fontFamily: 'regular',
    fontSize: 18,
    color: COLORS.gray,
  },
  ratingView: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
    gap: 5,
  },
  bottomBar: {
    width: '100%',
    height: 70,
    backgroundColor: COLORS.white,
    shadowColor: COLORS.gray2,
    shadowOffset:{
      width: 0,
      height: -5,
    },
    shadowOpacity: 0.5,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    position: 'absolute',
    bottom: 15

  },
  pressableIconCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15,
  }
})