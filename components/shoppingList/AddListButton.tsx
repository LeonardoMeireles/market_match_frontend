import { Button, StyleSheet, TouchableOpacity } from 'react-native';

import EditScreenInfo from '@/components/EditScreenInfo';
import { Text, View } from '@/components/Themed';
import { useMarketMatch } from '@/services/marketMatchContext';

interface AddListButtonProps {}

export default function AddListButton(
  {}: AddListButtonProps
) {

  return (
    <TouchableOpacity style={styles.button}>
      <Text style={{color: '#fff'}}>+ Adicionar Lista</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#282828',
    padding: 10,
    borderRadius: 8
  },
});
