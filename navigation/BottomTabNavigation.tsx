import React from 'react';
import HomeScreen from '../screens/Home';
import { createBottomTabNavigator, BottomTabNavigationOptions  } from '@react-navigation/bottom-tabs';
import Cart from '../screens/Cart';
import { Ionicons } from '@expo/vector-icons';
import { COLORS } from '../constants';

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarShowLabel: false,
  tabBarHideOnKeyboard: true,
  headerShown: false,
  tabBarStyle: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 0,
    height: 70
  } 
} as BottomTabNavigationOptions;

const BottomTabNavigation = () => {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
      <Tab.Screen 
        name="Home" 
        component={HomeScreen} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons 
                name={ focused ? 'home' : 'home-outline'} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2}
                testID="home-tab-icon"
              />
            );
          },          
          tabBarTestID: 'home-tab'
        }}
      />

      <Tab.Screen 
        name="Cart" 
        component={Cart} 
        options={{
          tabBarIcon: ({ focused }) => {
            return (
              <Ionicons 
                name={ focused ? 'cart' : 'cart-outline'} 
                size={24} 
                color={focused ? COLORS.primary : COLORS.gray2} 
                testID="cart-tab-icon"
              />
            );
          },
          tabBarTestID: 'cart-tab'
        }}/>

    </Tab.Navigator>
  );
}

export default BottomTabNavigation;