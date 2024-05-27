import { StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { Product } from '@/services/types/classTypes';
import { TabBarIcon } from '@/app/(tabs)/_layout';
import { useMarketMatch } from '@/services/marketMatchContext';
import { useState } from 'react';

interface ProductCardProps {
  product: Product;
  addProductToList?: () => Promise<void>;
  removeFromList?: () => Promise<void>;
}

export default function ProductCard(
  {
    product,
    addProductToList,
    removeFromList
  }: ProductCardProps
) {
  const {
    shoppingListProducts
  } = useMarketMatch();
  const [inList, setInList] = useState(!!shoppingListProducts.find((productList) => productList.ean === product.ean));


  return (
    <View
      style={styles.container}
    >
      <Text numberOfLines={1} style={styles.name}>{product.name}</Text>
      {addProductToList
        ?
        <TouchableOpacity
          onPressOut={() => {
            if (addProductToList) {
              addProductToList().then(() => {
                setInList(true);
              });
            }
          }}
        >
          <TabBarIcon name={inList ? 'check' : 'plus'} color={'#93B1A6'}/>
        </TouchableOpacity>
        : null
      }
      {removeFromList
        ?
        <TouchableOpacity
          onPressOut={() => {
            if (removeFromList) {
              removeFromList();
            }
          }}
        >
          <TabBarIcon name={'trash'} color={'#b93c3c'}/>
        </TouchableOpacity>
        : null
      }
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#383838',
    padding: 16,
    height: 64,
    width: '100%',
    borderRadius: 4,
  },
  name: {
    fontWeight: '600',
    width: '85%'
  }
});
