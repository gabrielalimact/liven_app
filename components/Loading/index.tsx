import React from 'react';
import { View, Text, Image, StyleSheet, Pressable } from 'react-native';
import { COLORS } from '../../constants';

const LoadingSplash = () => {
  return (
    <View style={{
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: COLORS.white,
    }}>
      <Image source={require('../../assets/loadingsplash.gif')} style={{
        width: 100,
        height: 100,
      }} />
    </View>
  )
}

export default LoadingSplash;