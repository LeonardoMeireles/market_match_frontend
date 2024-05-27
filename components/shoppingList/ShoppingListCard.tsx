import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import { ShoppingList } from '@/services/types/classTypes';
import { router } from 'expo-router';

interface ShoppingListProps {
  shoppingList: ShoppingList;
}

export default function ShoppingListCard(
  {
    shoppingList
  }: ShoppingListProps
) {

  return (
    <TouchableOpacity
      style={styles.container}
      onPressIn={() => {
        router.navigate({
          pathname: `/(shoppingList)/${shoppingList.id}`,
        });
      }}
    >
      <Text style={styles.name}>{shoppingList.name}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#383838',
    padding: 8,
    height: 64,
    width: '100%',
    borderRadius: 4,
  },
  name: {
    fontWeight: '600'
  }
});
