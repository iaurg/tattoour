import React, { useState, useEffect } from 'react';
import { View, AsyncStorage, KeyboardAvoidingView, Platform, StyleSheet, Text, TextInput, Image, TouchableOpacity } from 'react-native';
import api from '../services/api';
import logo from '../assets/logo.png';

export default function Login({ navigation }){
  const [email, setEmail] = useState('');
  const [arts, setArts] = useState('');

  useEffect(() => {
    AsyncStorage.getItem('user').then(user => {
      if(user){
        navigation.navigate('List');
      }
    })
  }, []);

  async function handleSubmit(){
    // email, arts
    const response = await api.post('/sessions', {
      email
    })

    const {_id} = response.data;

    await AsyncStorage.setItem('user', _id);
    await AsyncStorage.setItem('arts', arts);

    navigation.navigate('List');

  }

  return (
  <KeyboardAvoidingView enabled={Platform.OS === 'ios'} behavior="padding" style={styles.container}>
    <Image source={logo} />
    <View style={styles.form}>
      <Text style={styles.label}>Seu e-mail*</Text>
      <TextInput style={styles.input} 
      placeholder="Seu e-mail" 
      placeholderTextColor="#999" 
      keyboardType="email-address"
      autoCapitalize="none"
      autoCorrect={false}
      value={email}
      onChangeText={setEmail}
      />

    <Text style={styles.label}>Estilos*</Text>
      <TextInput style={styles.input} 
      placeholder="Estilos de interesse" 
      placeholderTextColor="#999" 
      autoCapitalize="words"
      autoCorrect={false}
      value={arts}
      onChangeText={setArts}
      />
    </View>

    <TouchableOpacity onPress={handleSubmit} style={styles.button}>
      <Text style={styles.buttonText}>Encontrar Estudios</Text>
    </TouchableOpacity>
  </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent: 'center',
    alignItems: 'center'
  },

  label:{
    fontWeight: 'bold',
    color: '#444',
    marginBottom: 8,
  },

  form: {
    alignSelf:'stretch',
    paddingHorizontal: 30,
    marginTop: 30
  },

  input: {
    borderWidth: 1,
    borderColor:'#ddd',
    paddingHorizontal: 20,
    fontSize: 16,
    color:'#444',
    height:44,
    marginBottom: 20,
    borderRadius: 2,
  },
  button:{
    height:42,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 20,
  },
  buttonText: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 16
  },
})