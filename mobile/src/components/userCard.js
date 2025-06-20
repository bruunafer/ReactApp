import React from 'react';
import { View, Text, Pressable, Alert, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

export default function UserCard({ user, onDelete, onEdit }) {
  const handleDelete = async () => {
    try {
      const token = await AsyncStorage.getItem('token');

      await api.delete(`/users/${user.id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      Alert.alert('Sucesso', 'Usuário deletado com sucesso!');
      onDelete();  // Atualiza a lista na HomeScreen
    } catch (error) {
      console.error('Erro ao deletar:', error);
      Alert.alert('Erro', error.response?.data?.message || 'Erro ao deletar usuário.');
    }
  };

  return (
    <View style={styles.card}>
      <Text style={styles.name}>{user.name}</Text>
      <Text style={styles.details}>CPF: {user.cpf}</Text>
      <Text style={styles.details}>E-mail: {user.email}</Text>

      <View style={styles.buttonContainer}>
        <Pressable style={[styles.button, styles.editButton]} onPress={onEdit}>
          <Text style={styles.buttonText}>Editar</Text>
        </Pressable>

        <Pressable style={[styles.button, styles.deleteButton]} onPress={handleDelete}>
          <Text style={styles.buttonText}>Excluir</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#d3d3d3',
    padding: 15,
    borderRadius: 10,
    marginBottom: 15,
  },
  name: {
    fontSize: 18,
    fontWeight: '700',
    color: '#1a1647',
  },
  details: {
    fontSize: 14,
    color: '#333',
    marginTop: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: 10,
  },
  button: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 6,
    marginLeft: 10,
  },
  editButton: {
    backgroundColor: '#1a1647',
  },
  deleteButton: {
    backgroundColor: '#ff4d4f',
  },
  buttonText: {
    color: '#fff',
    fontWeight: '600',
  },
});
