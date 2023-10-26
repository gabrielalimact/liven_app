import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Product, ProductsToCart } from '../../types/products';

interface CartContextType {
  cart: ProductsToCart[];
  addToCart: (product: Product) => void;
  removeToCart: (product: Product, remove?: boolean) => void;
}

const CartContext = createContext<CartContextType>({
  cart: [],
  addToCart: (product: Product) => {},
  removeToCart: (product: Product, remove?: boolean) => {},
});

const CartProvider = ({ children } : any) => {
  const [cart, setCart] = useState<ProductsToCart[]>([]);

  useEffect(() => {
    const loadCart = async () => {
      try {
        const cartData = await AsyncStorage.getItem('cart');
        if (cartData) {
          setCart(JSON.parse(cartData));
        }
      } catch (error) {
        console.error('Error loading cart data:', error);
      }
    };

    loadCart();
  }, []);

  const saveCart = async (cartData: ProductsToCart[]) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(cartData));
      setCart(cartData);
    } catch (error) {
      console.error('Error saving cart data:', error);
    }
  };

  const addToCart = (product: Product) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product?.id);

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity += 1;
      setCart(updatedCart);
      saveCart(updatedCart);
    } else {
      const updatedProduct: ProductsToCart = {
        product: product,
        quantity: 1,
      };
      const updatedCart = [...cart, updatedProduct];
      setCart(updatedCart);
      saveCart(updatedCart);
    }
  };

  const removeToCart = (product: Product, remove?: boolean) => {
    const existingIndex = cart.findIndex((item) => item.product.id === product?.id);

    if (existingIndex !== -1) {
      const updatedCart = [...cart];
      updatedCart[existingIndex].quantity -= 1;
      
      if(updatedCart[existingIndex].quantity === 0 || remove) {
        updatedCart.splice(existingIndex, 1);
      }

      setCart(updatedCart);
      saveCart(updatedCart);
    }
  }
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeToCart }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  return useContext(CartContext);
};

export default CartProvider;
