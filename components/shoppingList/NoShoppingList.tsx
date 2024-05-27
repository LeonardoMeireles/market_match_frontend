import { StyleSheet } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';

export default function NoShoppingList() {

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Nenhuma lista de compras encontrada</Text>
      <Text style={styles.text}>Toque no botão "Nova Lista" para encontrarmos o mercado ideal para seu bolso.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8
  },
  text: {
    fontSize: 14,
    textAlign: 'center'
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
});
