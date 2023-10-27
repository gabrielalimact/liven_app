import React, { useEffect, useState } from 'react';

import {
  Text, View, Image, StyleSheet, ScrollView, Pressable 
} from 'react-native';
import { getProducts } from '../api/products';
import { SafeAreaView } from 'react-native-safe-area-context';
import { COLORS, SIZES } from '../constants';
import Products from '../components/Products';

type Product = {
  category: string,
  description: string,
  id: number,
  image: string,
  price: number,
  rating: {
    rate: number,
    count: number
  },
  title: string
}

const HomeScreen = () => {
  const [data, setData] = useState<Product[]>()
  const [filterWomensClothing, setFilterWomensClothing] = useState(false)
  const [filterMensClothing, setFilterMensClothing] = useState(false)
  const [filterJewelery, setFilterJewelery] = useState(false)
  const [filterElectronics, setFilterElectronics] = useState(false)
  const [allProducts, setAllProducts] = useState(true)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    getProducts().then((res) => {
      const womensClothing = res.filter((item: any) => item.category === 'women\'s clothing')      
      const mensClothing = res.filter((item: any) => item.category === 'men\'s clothing')
      const jewelery = res.filter((item: any) => item.category === 'jewelery')
      const electronics = res.filter((item: any) => item.category === 'electronics')

      const data = res
      if(allProducts){
        setData(data)
        setIsLoading(false)
      }
      if(filterWomensClothing){
        setData(womensClothing)
      }
      if(filterMensClothing){
        setData(mensClothing)
      }
      if(filterJewelery){
        setData(jewelery)
      }
      if(filterElectronics){
        setData(electronics)
      }
    })
  }, [filterElectronics, filterJewelery, filterMensClothing, filterWomensClothing, allProducts])

  const handleFilters = (category: string) => {
    if(category === 'all'){ 
      setFilterElectronics(false)
      setFilterJewelery(false)
      setFilterMensClothing(false)
      setFilterWomensClothing(false)
      setAllProducts(true)
    }
    if(category === 'women'){
      setFilterElectronics(false)
      setFilterJewelery(false)
      setFilterMensClothing(false)
      setAllProducts(false)
      if(filterWomensClothing){
        setFilterWomensClothing(false)
      }else{
        setFilterWomensClothing(true)
      }
    }
    if(category === 'men'){
      setFilterElectronics(false)
      setFilterJewelery(false)
      setFilterWomensClothing(false)
      setAllProducts(false)
      if(filterMensClothing){
        setFilterMensClothing(false)
      } else {
        setFilterMensClothing(true)
      }
    }
    if(category === 'jewelery'){
      setFilterElectronics(false)
      setFilterMensClothing(false)
      setFilterWomensClothing(false)
      setAllProducts(false)
      if(filterJewelery){
        setFilterJewelery(false)
      } else {
        setFilterJewelery(true)
      }
    }
    if(category === 'electronics'){
      setFilterJewelery(false)
      setFilterMensClothing(false)
      setFilterWomensClothing(false)
      setAllProducts(false)
      if(filterElectronics){
        setFilterElectronics(false)
      } else {
        setFilterElectronics(true)
      }
    }
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView style={styles.container}>
        <View style={styles.titleView}>
          <Text style={styles.textTitle}>
            Liven's Store
          </Text>
        </View>
        <ScrollView 
          horizontal={true} 
          showsHorizontalScrollIndicator={false}
        >
          <View style={styles.appBar} >
          <Pressable onPress={()=>handleFilters('all')} style={[styles.itemAppBar, {
              backgroundColor: allProducts ? COLORS.primary : COLORS.white,
            }]}>
              <Text>
                All Products
              </Text>
            </Pressable>
            <Pressable onPress={()=>handleFilters('women')} style={[styles.itemAppBar, {
              backgroundColor: filterWomensClothing ? COLORS.primary : COLORS.white,
            }]}>
              <Text>
                Woman's Clothing
              </Text>
            </Pressable>

            <Pressable onPress={()=>handleFilters('men')} style={[styles.itemAppBar, {
              backgroundColor: filterMensClothing ? COLORS.primary : COLORS.white,
            }]}>
              <Text>
                Men's Clothing
              </Text>
            </Pressable>

            <Pressable onPress={()=>handleFilters('jewelery')} style={[styles.itemAppBar, {
              backgroundColor: filterJewelery ? COLORS.primary : COLORS.white,
            }]}>
              <Text>
                Jewelery
              </Text>
            </Pressable>

            <Pressable onPress={()=>handleFilters('electronics')} style={[styles.itemAppBar, {
              backgroundColor: filterElectronics ? COLORS.primary : COLORS.white,
            }]}>
              <Text>
                Electronics
              </Text>
            </Pressable>
          </View>
        </ScrollView>
        {isLoading ? (
          <Text>Loading...</Text> 
        ) : (
          <View style={{
            flexDirection: 'row',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            gap: 10,
            marginBottom: SIZES.xxLarge,
          }}>

            {data?.map((item, index) => (
              <Products key={index} product={item} />
            ))}
        
          </View>
        )}
      
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: SIZES.large,
    marginTop: SIZES.small,
    backgroundColor: COLORS.offwhite,
    marginBottom: SIZES.xxLarge,
  },
  titleView: {
    marginBottom: SIZES.small,
  },
  image: {
    width: 180,
    height: 180,
    marginBottom: SIZES.small,
    resizeMode: 'contain'
  },
  textTitle: {
    fontFamily: 'bold',
    fontSize: 30,
    textAlign: 'left',
  },
  appBar: {
    flexDirection: 'row',
    marginBottom: SIZES.small,
    padding: 10,
    alignItems: 'center',

  },
  itemAppBar: {
    marginRight: 15,
    fontFamily: 'regular',
    fontSize: 16,
    padding: 10,
    borderRadius: 20,
    backgroundColor: COLORS.white,
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

export default HomeScreen;