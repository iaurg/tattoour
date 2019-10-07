import React, { useState, useEffect } from 'react';
import { SafeAreaView, ScrollView, Text, Image, StyleSheet, AsyncStorage } from 'react-native';
import logo from '../assets/logo.png';
import SpotList from '../components/SpotList';
export default function List(){
  const [arts, setArts] = useState([]);
  
  useEffect(() => {
    AsyncStorage.getItem('arts').then(storageArts => {
      const artsArray = storageArts.split(',').map(art => art.trim());
      setArts(artsArray);
    })
  }, []);

  return(
    <SafeAreaView style={styles.container}>
      <Image style={styles.logo} source={logo} />
      <ScrollView>
        {arts.map(art => <SpotList key={art} art={art} />)}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex:1,
  },
  logo:{
    height:32,
    resizeMode: 'contain',
    alignSelf: 'center',
    marginTop: 30 
  }
});