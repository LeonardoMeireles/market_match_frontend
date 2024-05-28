import { Linking, StyleSheet, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';
import { Market, Product, ShoppingList } from '@/services/types/classTypes';
import { router } from 'expo-router';
import { MarketResult } from '@/services/types/responseTypes';

interface MarketCardProps {
  market: Market;
  total: number;
  distance: string;
}

export default function MarketCard(
  {
    name,
    total_price,
    distance,
    url,
  }: Partial<MarketResult>
) {

  function treatDistance() {
    if (distance > 1000) return `${(distance / 1000).toFixed(2)}km`;
    return `${distance?.toFixed(2)}m`;
  }

  return (
    <TouchableOpacity
      onPress={() => {
        Linking.openURL(url as string);
      }}
      style={styles.container}
    >
      <View style={styles.marketInfoContainer}>
        <Text numberOfLines={1} style={styles.name}>{name}</Text>
        <Text style={styles.distance}>Distância: {treatDistance()}</Text>
      </View>
      <View style={styles.distanceContainer}>
        <Text style={styles.totalValue}>R${total_price}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#383838',
    padding: 8,
    height: 64,
    width: '100%',
    borderRadius: 4,
    flexDirection: 'row'
  },
  name: {
    fontSize: 20,
    fontWeight: '600'
  },
  distance: {
    fontSize: 12,
    fontWeight: 400
  },
  marketInfoContainer: {
    display: 'flex',
    justifyContent: 'space-between',
    backgroundColor: '#383838',
    width: '70%'
  },
  distanceContainer: {
    display: 'flex',
    justifyContent: 'center',
    backgroundColor: '#383838',
  },
  totalValue: {
    fontSize: 18,
    fontWeight: 600
  },
  totalText: {
    fontSize: 14,
    textAlign: 'right',
    fontWeight: 400
  }
});
