import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, button } from 'react-native';

export default function App() {
  const [defaultStyle, setdefaultStyle] = useState(true);
  const [defaultText, setdefaultText] = useState('Ukryj');
  function zminaTekst(){
    if(defaultText === 'Pokaż'){
      setdefaultText('Ukryj');
    }else{
      setdefaultText('Pokaż');
    }

  };

  return (
    <View style={styles.container}>
      <Text>Zadanie 2</Text>
      <StatusBar/>
      <TouchableOpacity style = {styles.button} onPress = {() => {setdefaultStyle(!defaultStyle), zminaTekst()}}>
        <Text style ={styles.button}>{defaultText}</Text>
        </TouchableOpacity>
      <View style={defaultStyle ? styles.tekst: styles.schowaj} >   
      <Text>Nazywam się</Text>
      <Text style={styles.imie}>Iwona Suda</Text>
      
      </View>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    alignItems: "center",
    backgroundColor: "#DDDDDD",
  },
  tekst:{
    
    alignItems: 'center',
    justifyContent: 'center',
  },
  imie:{
    fontWeight:'bold',
    alignItems: 'center',
  },
  schowaj:{
    display: 'none',
    alignItems: 'center',
    justifyContent: 'center',

  },
});
