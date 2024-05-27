import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import { Product, ShoppingList } from '@/services/types/classTypes';
import { router } from 'expo-router';
import React from 'react';

interface AddProductCardProps {
  listId: string;
}

export default function FindMarketButton(
  {
    listId
  }: AddProductCardProps
) {
  const {
    getLocation,
  } = useMarketMatch();

  return (
    <TouchableOpacity
      onPressIn={() => {
        getLocation().then(() => {
          router.navigate({
            pathname: `/${listId}/marketResultList`,
          });
        });

      }}
      style={styles.button}
    >
      <Text style={styles.buttonText}>Procurar o mercado ideal</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center'
  },
  button: {
    padding: 16,
    width: '100%',
    marginBottom: 8,
    backgroundColor: '#065b5b',
    borderRadius: 8
  }
});
