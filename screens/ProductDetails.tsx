import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { Route } from '@react-navigation/native';
import { getProductDetails } from '../api/products';
import { Product } from '../types/products';
import { Ionicons } from '@expo/vector-icons';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants';
import LoadingSplash from '../components/Loading';

const ProductDetails = ({ route }: { route: Route<string, { productId: string }> }) => {
  const { productId } = route.params;
  const navigation = useNavigation();
  const [product, setProduct] = useState<Product>()
  const [isLoading, setIsLoading] = useState(true)

  const handlePressBack = () => {
    navigation.goBack();
  }

  useEffect(() => {
    console.log('productId', productId)
    getProductDetails(Number(productId)).then((res) => {
      setProduct(res)
      setIsLoading(false)
    })
  }, [productId])

  return (
    <SafeAreaView  style={{ flex: 1 }}>
      {isLoading ? (<LoadingSplash />) : (
        <View style={styles.container}>
        <View style={styles.barBack}>
          <Pressable onPress={() => handlePressBack()}>
          <Ionicons name="arrow-back" size={30} color={COLORS.black}/>
          </Pressable>
        </View>
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
        <Text style={styles.price}>${product?.price}</Text>

      </View>
      )}
      
    </SafeAreaView>
  )
};

export default ProductDetails;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  barBack: {
    width: '100%',
    height: 50,
  },
  image: {
    width: 450,
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
    fontFamily: 'bold',
    fontSize: 40,
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
  }
})