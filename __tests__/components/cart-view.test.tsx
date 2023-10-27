import React from 'react';
import { render  } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'
import CartView from '../../components/CartView';
import { Product, ProductsToCart } from '../../types/products';

jest.mock("expo-font");
jest.mock("expo-asset");
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

const product = {
  product: {
    category: 'category',
    description: 'description',
    id: 1,
    rating: {
      rate: 1,
      count: 2,
    },
    title: 'Sample Product',
    price: 10.99,
    image: 'sample_image_url',
  } as Product,
  quantity: 2,
} as ProductsToCart;


describe('CartView', () => {
  it('renders product on cart correctly', () => {
 
    const { getByText, getByTestId } = render(<CartView product={product} />);
    
    const addQuantityButton = getByTestId('add-quantity-button');
    const removeQuantityButton = getByTestId('remove-quantity-button');
    const removeButton = getByTestId('remove-all-button');

    expect(addQuantityButton).toBeOnTheScreen()
    expect(removeButton).toBeOnTheScreen()
    expect(removeQuantityButton).toBeOnTheScreen()
    expect(getByText('Sample Product')).toBeTruthy();
    expect(getByText('$21.98')).toBeTruthy();
  });

})