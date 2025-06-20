import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  TextInput,
  Pressable,
  Alert,
  StyleSheet,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import api from '../api/api';
import { useRoute, useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function FormScreen() {
  const route = useRoute();
  const navigation = useNavigation();
  const user = route.params?.user;

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    gender: '',
    birth_date: '',
    address: '',
    phone: '',
    email: '',
  });

  useEffect(() => {
    if (user) setForm(user);
  }, [user]);

  const handleSave = async () => {
    const { name, cpf, gender, birth_date, address, phone, email } = form;
    if (!name || !cpf || !gender || !birth_date || !address || !phone || !email) {
      Alert.alert('Campos obrigatórios', 'Preencha todos os campos antes de salvar.');
      return;
    }

    try {
      const token = await AsyncStorage.getItem('token');
      const config = {
        headers: { Authorization: `Bearer ${token}` },
      };

      if (user) {
        await api.put(`/users/${user.id}`, form, config);
        Alert.alert('Sucesso', 'Usuário atualizado com sucesso!');
      } else {
        await api.post('/users', form, config);
        Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      }

      navigation.goBack();
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      Alert.alert('Erro ao salvar', error.response?.data?.message || 'Erro inesperado.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>{user ? 'Editar Usuário' : 'Novo Usuário'}</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.name}
          onChangeText={(t) => setForm({ ...form, name: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={form.cpf}
          onChangeText={(t) => setForm({ ...form, cpf: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Gênero"
          value={form.gender}
          onChangeText={(t) => setForm({ ...form, gender: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento (YYYY-MM-DD)"
          value={form.birth_date}
          onChangeText={(t) => setForm({ ...form, birth_date: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Endereço"
          value={form.address}
          onChangeText={(t) => setForm({ ...form, address: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={form.phone}
          onChangeText={(t) => setForm({ ...form, phone: t })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={form.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(t) => setForm({ ...form, email: t })}
          placeholderTextColor="#aaa"
        />

        <Pressable style={styles.button} onPress={handleSave}>
          <Text style={styles.buttonText}>Salvar</Text>
        </Pressable>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
  },
  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 20,
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
    marginTop: 10,
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
});
