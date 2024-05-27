import { Pressable, StyleSheet, Text, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import NoShoppingList from '@/components/shoppingList/NoShoppingList';
import AddListButton from '@/components/shoppingList/AddListButton';
import React, { useEffect, useState } from 'react';
import ShoppingListCard from '@/components/shoppingList/ShoppingListCard';
import { Link, router } from 'expo-router';

export default function TabOneScreen() {
  const {
    getShoppingList,
    shoppingLists,
  } = useMarketMatch();
  const [loadingUserInfo, setLoadingUserInfo] = useState(true);

  useEffect(() => {
    getShoppingList()
      .then(() => {
        setLoadingUserInfo(false);
      });
  }, []);

  if (loadingUserInfo) {
    return <View style={{...styles.container, justifyContent: 'center'}}>
      <Text style={{color: '#FFF'}}>Carregando...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      {!shoppingLists.length
        ? <NoShoppingList/>
        : <View style={styles.shoppingLists}>
          {shoppingLists.map((shoppingList) =>
            <ShoppingListCard key={shoppingList.id} shoppingList={shoppingList}/>
          )}
        </View>
      }
      <View style={styles.bottomButton}>
        <TouchableOpacity
          onPressIn={() => {
            router.navigate({
              pathname: '/(shoppingList)/newList',
            });
          }}
          style={styles.button}
        >
          <Text style={{color: '#fff'}}>+ Adicionar Lista</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    padding: 16,
    paddingTop: '20%'
  },
  bottomButton: {
    position: 'absolute',
    bottom: 64,
    right: 16,
  },
  button: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 8
  },
  shoppingLists: {
    gap: 16,
    width: '100%'
  }
});
