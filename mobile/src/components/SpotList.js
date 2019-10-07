import React, {useState,useEffect} from 'react';
import {View, Text, StyleSheet, FlatList, Image, TouchableOpacity} from 'react-native';
import {withNavigation} from 'react-navigation';
import api from '../services/api';

function SpotList({art, navigation}){
  const [studios, setStudios] = useState([]);

  useEffect(() => {
    async function loadSpots(){
      const response = await api.get(`/studios`, {
        params: { art }
      })

      setStudios(response.data)
    }
    loadSpots();
  }, []);

  function handleNavigate(id){
    navigation.navigate('Book', { id });
  }

  return(
    <View style={styles.container}>
      <Text style={styles.title}>Estudios que trabalham com <Text style={styles.bold}>{art}</Text></Text>
      <FlatList 
        style={styles.list} 
        data={studios} 
        keyExtractor={item => item._id}
        horizontal
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.listItem}>
            <Image source={{ uri: item.thumbnail_url }} style={styles.thumbnail}></Image>
            <Text style={styles.studio}>{item.studio}</Text>   
            <Text style={styles.price}>{item.price ? `R$${item.price}/por dia` : 'Gratuito'}</Text>
            <TouchableOpacity onPress={() => handleNavigate(item._id)} style={styles.button}>
              <Text style={styles.buttonText}>
                Solicitar Reserva
              </Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    marginTop:30,
  },
  title:{
    fontSize: 20,
    color:'#444',
    paddingHorizontal: 20,
    marginBottom:15,
  },
  bold:{
    fontWeight:'bold',
  },
  list:{
    paddingHorizontal: 20,
  },
  listItem:{
    marginRight:15,
  },
  thumbnail:{
    width:200,
    height:120,
    resizeMode: 'cover',
    borderRadius: 2,
  },
  studio:{
    fontSize:24,
    fontWeight: 'bold',
    color:'#333',
    marginTop: 10
  },
  price:{
    fontSize:15,
    color:'#999',
    marginTop: 5
  },
  button:{
    height:32,
    marginTop:15,
    backgroundColor: '#f05a5b',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 2,
    paddingHorizontal: 20,
  },
  buttonText: {
    color:'#fff',
    fontWeight: 'bold',
    fontSize: 15
  },
});

export default withNavigation(SpotList);