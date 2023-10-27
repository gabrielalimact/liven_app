import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import '@testing-library/jest-native/extend-expect'
import BottomTabNavigation from '../../navigation/BottomTabNavigation';
import { NavigationContainer } from '@react-navigation/native'; 

jest.mock("expo-font");
jest.mock("expo-asset");
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

describe('BottomTabNavigation', () => {

  it('deve renderizar o app', () => {
    const { getByText } = render(
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    )

    const title = getByText('Liven\'s Store');
    const categories = getByText('All Products' || 'Woman\'s Clothing' || 'Men\'s Clothing' || 'Jewelery' || 'Electronics');

    
    expect(title).toBeTruthy();
    expect(categories).toBeTruthy();
  })

  it('deve renderizar o bottom tab navigation', () => {
    const { getByTestId } = render(
      <NavigationContainer>
        <BottomTabNavigation />
      </NavigationContainer>
    )

    const home = getByTestId('home-tab');
    const cart = getByTestId('cart-tab');

    expect(home).toBeTruthy();
    expect(cart).toBeTruthy();
  });

  it('deve alternar entre as guias', () => {
    const { getByTestId } = render( 
    <NavigationContainer>
      <BottomTabNavigation />
    </NavigationContainer>
  );

    const homeTab = getByTestId('home-tab');
    const cartTab = getByTestId('cart-tab');

    // Clique na guia Home
    fireEvent.press(homeTab);
    
    // Verifique se a guia Home está ativa após o clique
    expect(homeTab.props.accessibilityState.selected).toBeTruthy();
    expect(cartTab.props.accessibilityState.selected).not.toBeTruthy();

    // Clique na guia Cart
    fireEvent.press(cartTab);

    // Verifique se a guia Home está ativa após o clique
    expect(cartTab.props.accessibilityState.selected).toBeTruthy();
    expect(homeTab.props.accessibilityState.selected).not.toBeTruthy();
    
  });
});
