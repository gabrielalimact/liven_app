import { useFonts } from 'expo-font';
import * as SplashScreehn from 'expo-splash-screen';
import { useCallback } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import BottomTabNavagation from './navagation/BottomTabNavagation';
import ProductDetails from './screens/ProductDetails';
const Stack = createStackNavigator();

export default function App() {
  const [fontsLoaded] = useFonts({
    regular: require('./assets/fonts/Poppins-Regular.ttf'),
    medium: require('./assets/fonts/Poppins-Medium.ttf'),
    bold: require('./assets/fonts/Poppins-Bold.ttf'),
    light: require('./assets/fonts/Poppins-Light.ttf'),
    semibold: require('./assets/fonts/Poppins-SemiBold.ttf'),
    extrabold: require('./assets/fonts/Poppins-ExtraBold.ttf'),

  });

  const onLayoutRootView = useCallback(async () => {
    if(fontsLoaded){
      await SplashScreehn.hideAsync();
    }
  }, [fontsLoaded]);

  if(!fontsLoaded){
    return (
      null
    );
  }

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Bottom Navagation" component={BottomTabNavagation} options={{
          headerShown: false
        }} />

        <Stack.Screen name="ProductDetails" component={ProductDetails} options={{
          headerShown: false
        }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}