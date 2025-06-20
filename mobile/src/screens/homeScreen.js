import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Pressable,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import api from '../api/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserCard from '../components/userCard';

export default function HomeScreen({ navigation }) {
  const [usuarios, setUsuarios] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetchUsuarios();
  }, []);

  const fetchUsuarios = async () => {
    try {
      const token = await AsyncStorage.getItem('token');
      const response = await api.get('/users', {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsuarios(response.data);
    } catch (error) {
      console.error('Erro ao buscar usuários:', error);
    }
  };

  const filtered = usuarios.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Lista de Usuários</Text>

      <TextInput
        style={styles.input}
        placeholder="Pesquisar por nome"
        value={search}
        onChangeText={setSearch}
        placeholderTextColor="#aaa"
      />

      <Pressable style={styles.button} onPress={() => navigation.navigate('Form')}>
        <Text style={styles.buttonText}>Novo Usuário</Text>
      </Pressable>

      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <UserCard
            user={item}
            onDelete={fetchUsuarios}
            onEdit={() => navigation.navigate('Form', { user: item })}
          />
        )}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingTop: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1647',
    marginBottom: 20,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#d3d3d3',
    color: '#1a1647',
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 8,
    fontSize: 16,
    marginBottom: 15,
  },
  button: {
    backgroundColor: '#1a1647',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#ffffff',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.4,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: '700',
    fontSize: 18,
  },
  listContainer: {
    paddingBottom: 20,
  },
});
