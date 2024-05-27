import { Pressable, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';
import { View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import NoShoppingList from '@/components/shoppingList/NoShoppingList';
import AddListButton from '@/components/shoppingList/AddListButton';
import React, { useEffect, useState } from 'react';
import ShoppingListCard from '@/components/shoppingList/ShoppingListCard';
import { Link, router, useLocalSearchParams } from 'expo-router';
import ProductCard from '@/components/shoppingList/ProductCard';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { string } from 'prop-types';
import MarketCard from '@/components/shoppingList/MarketCard';
import { MarketResult } from '@/services/types/responseTypes';

interface MarketResultProps {
  listId: string;
}

export default function MarketResultList() {
  const {
    getMarketResult
  } = useMarketMatch();
  const {listId} = useLocalSearchParams();
  const [loading, setLoading] = useState(true); //Distance in Km
  const [marketResult, setMarketResult] = useState<Partial<MarketResult>[]>();
  const [distanceFilter, setDistanceFilter] = useState('1'); //Distance in Km

  function findMarketMatch() {
    setLoading(true);
    getMarketResult(listId as string, Number(distanceFilter) * 1000)
      .then((res) => {
        setMarketResult(res);
        setLoading(false);
      });
  }

  useEffect(() => {
    findMarketMatch();
  }, []);

  if (loading) {
    return <View style={styles.container}>
      <Text style={styles.title}>Carregando...</Text>
    </View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Mercados</Text>
      <View style={styles.distanceContainer}>
        <Text style={styles.subTitle}>Distância máxima (KM): </Text>
        <View style={styles.distanceInputContainer}>
          <TextInput
            style={styles.distanceInput}
            placeholderTextColor={'#FFF'}
            keyboardType="numeric"
            onChangeText={distance => {
              setDistanceFilter(distance.replace(',', '.'));
            }}
            defaultValue={distanceFilter.toString()}
            onEndEditing={(event) => {
              findMarketMatch();
            }}
          />
        </View>
      </View>
      <ScrollView
        style={{width: '100%', marginTop: 32}}
        contentContainerStyle={styles.childrenContainer}
        horizontal
        pagingEnabled
        nestedScrollEnabled
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}
      >
        {marketResult?.map((marketResult, index) => (
          <MarketCard
            {...marketResult}
            key={index}
          />
        ))}
      </ScrollView>
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
  distanceContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  distanceInputContainer: {
    position: 'relative',
    width: '25%',
    borderBottomWidth: 1,
    borderColor: '#FFF'
  },
  distanceInput: {
    position: 'absolute',
    textAlign: 'right',
    width: '100%',
    top: 13,
    fontSize: 16,
    color: '#FFF',
  },
  childrenContainer: {
    width: '100%',
  },
  title: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 32,
    color: '#CCC',
    textDecorationLine: 'underline',
  },
  subTitle: {
    marginTop: 16,
    fontWeight: 'bold',
    fontSize: 16,
    color: '#CCC',
  },
});
