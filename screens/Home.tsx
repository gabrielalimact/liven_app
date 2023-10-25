import React, { useEffect, useState } from 'react';

import {
  Text, View, Image, StyleSheet, ScrollView
} from 'react-native';
import { getProducts } from '../api/products';

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
  const [womensClothing, setWomensClothing] = useState<Product[]>()
  const [mensClothing, setMensClothing] = useState<Product[]>()
  const [jewelery, setJewelery] = useState<Product[]>()
  const [electronics, setElectronics] = useState<Product[]>()

  useEffect(() => {
    getProducts().then((res) => {
      const womensClothing = res.filter((item: any) => item.category === 'women\'s clothing')
      setWomensClothing(womensClothing)
      
      const mensClothing = res.filter((item: any) => item.category === 'men\'s clothing')
      setMensClothing(mensClothing)

      const jewelery = res.filter((item: any) => item.category === 'jewelery')
      setJewelery(jewelery)

      const electronics = res.filter((item: any) => item.category === 'electronics')
      setElectronics(electronics)

      const data = res
      setData(data)
    })
  }, [])
  
  return (
    <ScrollView>
      {data?.map((item, index) => (
        <View key={index}>
          <Image
            source={{ uri: item.image }}
            style={styles.image}
          />

          <Text>
            {item.title}
          </Text>
        
        </View>
      
      ))}

    
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  image: {
    width: 100,
    height: 100
  }
});

export default HomeScreen;