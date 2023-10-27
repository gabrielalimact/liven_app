import React from 'react';
import { render } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'
import { Product, ProductsToCart } from '../../types/products';
import Products from '../../components/Products';
import ProductDetails from '../../screens/ProductDetails';
import { NavigationContainer } from '@react-navigation/native';

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


describe('Product', () => {
  it('renders product on home correctly', () => {
 
    const { getByText, getByTestId } = render(
    <NavigationContainer>
      <Products product={product.product} />
    </NavigationContainer>
    );
    
    const titleProduct = getByText('Sample Product');
    const priceProduct = getByText('$10.99');
    const imageProduct = getByTestId('image-product');
    expect(titleProduct).toBeTruthy();
    expect(priceProduct).toBeTruthy();
    expect(imageProduct).toBeTruthy();
    
  });

  it('renders products details correctly', () => {
 
    const { getByText, getByTestId } = render(
    <NavigationContainer>
      <ProductDetails route={{ params: { productId: 1 } }} productMock={product.product} />
    </NavigationContainer>
    );
    
    const titleProduct = getByText('Sample Product');
    const priceProduct = getByText('$10.99');
    const imageProduct = getByTestId('image-product');
    const ratingText = getByTestId('rating-text');
    const ratingCount = getByTestId('rating-count');
    const descriptionProduct = getByTestId('description-product');

    expect(titleProduct).toBeTruthy();
    expect(priceProduct).toBeTruthy();
    expect(imageProduct).toBeTruthy();
    expect(ratingText).toBeTruthy();
    expect(ratingCount).toBeTruthy();
    expect(descriptionProduct).toBeTruthy();
  });

})