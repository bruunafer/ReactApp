import React, { useState } from 'react';
import { View, TextInput, Text, Pressable, Alert, StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import api from '../api/api';

export default function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    try {
      const response = await api.post('/auth/login', { email, password });
      await AsyncStorage.setItem('token', response.data.token);
      navigation.navigate('Home');
    } catch (error) {
      Alert.alert('Erro no login', error.response?.data?.message || 'Erro inesperado.');
    }
  };

  const handleNavigateToRegister = () => {
    navigation.navigate('Register');
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <Text style={styles.title}>Login</Text>

      <TextInput
        style={styles.input}
        placeholder="Informe seu E-mail"
        keyboardType="email-address"
        autoCapitalize="none"
        autoComplete="email"
        value={email}
        onChangeText={setEmail}
        placeholderTextColor="#aaa"
      />

      <TextInput
        style={styles.input}
        placeholder="Informe sua senha"
        secureTextEntry
        autoCapitalize="none"
        value={password}
        onChangeText={setPassword}
        placeholderTextColor="#aaa"
      />

      <Pressable style={[styles.button, styles.buttonSpacing]} onPress={handleLogin}>
       <Text style={styles.buttonText}>Entrar</Text>
      </Pressable>

      <Pressable style={styles.button} onPress={handleNavigateToRegister}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </Pressable>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    justifyContent: 'center',
    paddingHorizontal: 25,
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
