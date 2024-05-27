import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import React, { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import { Product, ShoppingList } from '@/services/types/classTypes';
import ProductCard from '@/components/shoppingList/ProductCard';
import FindMarketButton from '@/components/shoppingList/FindMarketButton';
import AddProductCard from '@/components/shoppingList/AddProductButton';
import { useIsFocused } from '@react-navigation/core';

export default function ListPage() {
  const {
    shoppingLists,
    shoppingListProducts,
    getShoppingListProducts,
    removeFromList
  } = useMarketMatch();
  const {listId} = useLocalSearchParams();
  const [loadingProducts, setLoadingProducts] = useState<boolean>(true);
  const list = shoppingLists.find((list) => list.id === listId);
  const isFocused = useIsFocused();

  useEffect(() => {
    setLoadingProducts(true);
    getShoppingListProducts(listId as string)
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoadingProducts(false));
  }, [isFocused]);

  if (loadingProducts) {
    return <View style={styles.container}>
      <Text style={styles.title}>{list?.name}</Text>
      <View style={styles.loaderContainer}>
        <Text style={{color: '#FFF'}}>Carregando...</Text>
      </View>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{list?.name}</Text>
      {shoppingListProducts.length
        ? <>
          <View style={styles.productList}>
            <AddProductCard listId={listId as string}/>
            {shoppingListProducts.map((product, index) => {
              return (
                <ProductCard
                  product={product}
                  key={index}
                  removeFromList={() => removeFromList(product.ean, listId as string)}
                />
              );
            })}
          </View>
          <View style={styles.searchMarketContainer}>
            <FindMarketButton listId={listId as string}/>
          </View>
        </>
        : <>
          <View style={styles.noProductsContainer}>
            <Text style={styles.noProductsTitle}>
              Adicione novos produtos á sua lista para encontrar o mercado ideal para seu bolso!
            </Text>
          </View>
          <View style={styles.noProductsButtonContainer}>
            <TouchableOpacity
              style={styles.noProductsButton}
              onPressIn={() => {
                router.navigate({
                  pathname: `/${listId}/productList`,
                });
              }}
            >
              <Text style={styles.noProductsButtonText}>Adicionar produtos</Text>
            </TouchableOpacity>
          </View>
        </>
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '15%',
    padding: 16
  },
  loaderContainer: {
    width: '100%',
    height: '100%',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  productList: {
    width: '100%',
    marginTop: 16,
    gap: 8,
  },
  title: {
    fontWeight: 'bold',
    fontSize: 32,
    color: '#CCC',
    textDecorationLine: 'underline',
  },
  bottomButton: {
    position: 'absolute',
    bottom: 100,
    right: 16,
  },
  button: {
    backgroundColor: '#5C8374',
    padding: 10,
    borderRadius: 32,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#FFF',
    borderWidth: 1,
    height: 64,
    width: 64,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 32,
    fontWeight: 'bold',
  },
  searchMarketContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noProductsContainer: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '50%'
  },
  noProductsTitle: {
    fontSize: 20,
    marginBottom: 8,
    color: '#CCC',
    textAlign: 'center'
  },
  noProductsButtonContainer: {
    alignItems: 'center',
    width: '100%'
  },
  noProductsButton: {
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    padding: 8,
    width: '80%',
    backgroundColor: '#245b5b'
  },
  noProductsButtonText: {
    color: '#FFF',
    fontWeight: 'bold',
    textAlign: 'center'
  }
});
