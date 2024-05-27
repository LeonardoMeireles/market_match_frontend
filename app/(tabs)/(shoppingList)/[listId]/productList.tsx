import { FlatList, StyleSheet, Text, TextInput } from 'react-native';
import { View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import React, { useCallback, useEffect, useState } from 'react';
import ProductCard from '@/components/shoppingList/ProductCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { Product } from '@/services/types/classTypes';
import { debounce } from 'lodash';
import { useLocalSearchParams } from 'expo-router';

interface ProductListProps {
  listId: string;
}

export default function ProductList() {
  const {
    getProductList,
    addProductToList
  } = useMarketMatch();
  const {listId} = useLocalSearchParams();
  const [page, setPage] = useState(0);
  const [searchInput, setSearchInput] = useState('');
  const [productList, setProductList] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);

  function getStartOfList(search: string) {
    setLoadingProducts(true);
    getProductList(0, search)
      .then((res) => {
        setLoadingProducts(false);
        setProductList(res as Product[]);
      });
  }

  useEffect(() => {
    getStartOfList(searchInput);
  }, []);

  function handleEndOfList() {
    setLoadingProducts(true);
    const newPageValue = page + 1;
    getProductList(newPageValue, searchInput)
      .then((res) => {
        setPage(newPageValue);
        setProductList((productList) => {
          return [...productList, ...res];
        });
        setLoadingProducts(false);
      });
  }

  if (loadingProducts && !productList?.length) {
    return <Text>Loading Products...</Text>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <FontAwesome
          size={28}
          name={'search'}
          color={'#CCC'}
        />
        <TextInput
          style={styles.searchInput}
          placeholderTextColor={'#FFF'}
          placeholder="Pesquisar por produto..."
          onChangeText={newName => {
            setPage(0);
            setSearchInput(newName);
          }}
          defaultValue={searchInput}
          onEndEditing={(event) => {
            setProductList([]);
            getStartOfList(event.nativeEvent.text);
          }}
        />
      </View>
      <FlatList
        style={styles.childrenContainer}
        contentContainerStyle={styles.childrenContainer}
        data={productList}
        onEndReached={() => handleEndOfList()}
        renderItem={(props) =>
          <ProductCard
            product={props.item}
            key={props.item.ean}
            addProductToList={() => addProductToList(props.item.ean, listId as string)}
          />
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    width: '100%',
    paddingTop: '10%',
  },
  childrenContainer: {
    width: '100%',
    gap: 8
  },
  searchContainer: {
    display: 'flex',
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  searchInput: {
    height: 64,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    fontSize: 16,
    color: '#FFF',
  },
});
