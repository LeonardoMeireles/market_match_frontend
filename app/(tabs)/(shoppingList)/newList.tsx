import { StatusBar } from 'expo-status-bar';
import { Platform, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Text, View } from '@/components/Themed';
import { useState } from 'react';
import { router } from 'expo-router';
import { useMarketMatch } from '@/services/marketMatchContext';

export default function ModalScreen() {
  const {
    addList
  } = useMarketMatch();
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <View style={styles.subContainer}>
        <Text style={styles.title}>Qual será o nome da sua nova lista?</Text>
        <TextInput
          style={styles.nameInput}
          placeholder="ex.: Compra semanal para casa"
          onChangeText={newName => setName(newName)}
          defaultValue={name}
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.createButton}
          onPressIn={async () => {
            const id = await addList(name);
            router.navigate({
              pathname: `/(shoppingList)/${id}`,
            });
          }}
        >
          <Text>Criar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 8,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  subContainer: {
    display: 'flex',
    justifyContent: 'flex-start',
    marginTop: '20%'
  },
  title: {
    fontSize: 20,
    fontWeight: 700,
    textAlign: 'center',
    marginBottom: 8
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
  nameInput: {
    height: 64,
    margin: 12,
    width: 300,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#dedede',
    textAlign: 'center'
  },
  buttonContainer: {
    alignItems: 'center',
    width: '100%'
  },
  createButton: {
    alignItems: 'center',
    borderRadius: 8,
    marginBottom: 24,
    padding: 8,
    width: '80%',
    backgroundColor: '#245b5b'
  }
});
