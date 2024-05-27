import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import { Product, ShoppingList } from '@/services/types/classTypes';
import { router } from 'expo-router';

interface AddProductCardProps {
  listId: string;
}

export default function AddProductCard(
  {
    listId
  }: AddProductCardProps
) {

  return (
    <TouchableOpacity
      onPressIn={() => {
        router.navigate({
          pathname: `/${listId}/productList`,
        });
      }}
      style={styles.container}
    >
      <Text style={styles.name}>+ Adicionar um novo produto á sua lista</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#183D3D',
    padding: 8,
    height: 42,
    width: '100%',
    borderRadius: 4,
  },
  name: {
    textAlign: 'center',
    fontWeight: '600'
  }
});