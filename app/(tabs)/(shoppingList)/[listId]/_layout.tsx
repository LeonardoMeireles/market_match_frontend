import { Stack } from 'expo-router';
import { View } from 'react-native';

export default function ListPage() {
  return <Stack>
    <Stack.Screen name="index" options={{headerShown: false}}/>
    <Stack.Screen name="productList" options={{headerShown: false}}/>
    <Stack.Screen name="marketResultList" options={{headerShown: false}}/>
  </Stack>;
}