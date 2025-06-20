import React, { useState } from 'react';
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

export default function RegisterScreen({ navigation }) {
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    birth_date: '',
    phone: '',
    email: '',
    password: '',
  });

  const handleRegister = async () => {
    try {
      await api.post('/auth/register', form);
      Alert.alert('Registro', 'Usuário criado com sucesso!');
      navigation.navigate('Login');
    } catch (error) {
      Alert.alert('Erro no registro', error.response?.data?.message || 'Erro inesperado.');
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer} showsVerticalScrollIndicator={false}>
        <Text style={styles.title}>Criar Conta</Text>

        <TextInput
          style={styles.input}
          placeholder="Nome"
          value={form.name}
          onChangeText={(text) => setForm({ ...form, name: text })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="CPF"
          value={form.cpf}
          onChangeText={(text) => setForm({ ...form, cpf: text })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Data de Nascimento"
          value={form.birth_date}
          onChangeText={(text) => setForm({ ...form, birth_date: text })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Telefone"
          value={form.phone}
          onChangeText={(text) => setForm({ ...form, phone: text })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="E-mail"
          value={form.email}
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setForm({ ...form, email: text })}
          placeholderTextColor="#aaa"
        />

        <TextInput
          style={styles.input}
          placeholder="Senha"
          value={form.password}
          secureTextEntry
          autoCapitalize="none"
          onChangeText={(text) => setForm({ ...form, password: text })}
          placeholderTextColor="#aaa"
        />

        <Pressable style={styles.button} onPress={handleRegister}>
          <Text style={styles.buttonText}>Registrar</Text>
        </Pressable>

        <View style={styles.footer}>
          <Pressable onPress={() => navigation.navigate('Login')}>
            <Text style={styles.footerText}>Voltar para o Login</Text>
          </Pressable>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    paddingHorizontal: 25,
  },
  scrollContainer: {
    paddingTop: 40,
    paddingBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    color: '#1a1647',
    marginBottom: 30,
    alignSelf: 'center',
  },
  input: {
    backgroundColor: '#d3d3d3',
    color: '#1a1647',
    paddingHorizontal: 15,
    paddingVertical: 14,
    borderRadius: 8,
    marginBottom: 15,
    fontSize: 16,
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
  footer: {
    marginTop: 20,
    alignItems: 'center',
  },
  footerText: {
    color: '#1a1647',
    fontWeight: '600',
    fontSize: 16,
  },
});
