import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView, Pressable  } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'



export default function TransactionCode({ navigation })
 {
    const [code, setCode] = useState('');
    const [token, setToken] = useState('');

  
    const [pin, setPin] = useState('');
    const [pin2, setPin2] = useState('');
    

    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
    setToken(data)

    });

 
    function create(){

      if (pin == ''|| pin2 == '')
      {
       ToastAndroid.show("Input Transaction", ToastAndroid.SHORT);
      }

      else if (pin != pin2){
        ToastAndroid.show("Pin Does Not Match!", ToastAndroid.SHORT);
       }
      
       else if (pin.length < 4 || pin2.length < 4){
        ToastAndroid.show("Pin length must be 4!", ToastAndroid.SHORT);
       }
     else{
        axios.post('http://192.168.43.240:8000/api-create-transaction_code/', {

        transaction_code: pin,
     },
      {
        headers: {
          'Authorization': `Token ${token}` 
        }

  })
  .then(function (response) {
    console.log(response);
    navigation.navigate('Create_Profile')
  })
  .catch(function (error) {
    console.log(error);
  });
}
    }

  return (
      <View style={styles.container}>
  
    <Text style={styles.text}>Create a 4 digit Transaction Pin</Text>

    <View style={styles.warning}>
      <MaterialCommunityIcons
           name='information'
           color='white'
           size={20}
      
         />
         <Text style={styles.textWaring}>Note this pin will be used to confirm all transaction. DO NOT forget this pin.</Text>
      </View>

<View style={styles.inputcontainer} >
<Text>Set Transaction Pin</Text>
      <TextInput
      maxLength={4}
      style={styles.input}
      autoCapitalize='none'
      onChangeText={(val)=> setPin(val)}
    />
 </View>

 <View style={styles.inputcontainer} >
 <Text>Confirm Transaction Pin</Text>
      <TextInput
      maxLength={4}
      style={styles.input}
      autoCapitalize='none'
      onChangeText={(val)=> setPin2(val)}
    />
 </View>

      <View style={styles.button}>
      <Pressable style={styles.button2} onPress={create} >
      <Text style={styles.text3}>Proceed</Text>
    </Pressable>
      </View>  

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingVertical: 60,
        paddingHorizontal: 20,
        width:'100%',
      
      },

  footer: {
    flex: 2,
    backgroundColor: '#fff',
    paddingVertical: 60,
    paddingHorizontal: 20,
    alignItems: 'stretch',
    

  },

  logo: {
      width: 150,
      height: 150

  },

  text: {
   
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 40,
   marginTop:20,
   
},

preboto: {
  color:'#0f2c40',
  fontSize: 40,
  fontWeight:'bold'
  
},
text2: {
  color:'#a61308',
  fontSize: 20,
  fontWeight:'normal'
  
},

button: {
  marginBottom:30,
  marginTop:30,
  
},

inputcontainer:{
  width:'80%',
  height:50,
  alignItems:'center',
  alignSelf:'center',
  marginTop: 40
 
 },
 
 input:{
   width:'80%',
   height:50,
   alignItems:'center',
   alignSelf:'center',
   borderColor:'#000566',
   fontSize: 30,
   borderRadius:7,
   borderWidth:2,
   textAlign:'center', 
   alignContent:'center'
  
  },
 


 button2: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 7,
  marginTop: 20,
  height:50,
  backgroundColor: '#00a80b',
},

text3: {
  color:'white',
  fontSize: 20,
  fontWeight:'normal'
  
},

warning: {
  backgroundColor: '#f0a8b5',
  borderRadius: 7,
  margin: 5,
  position:'relative',
  elevation:1,
  alignItems: 'stretch',
  marginBottom:0,
  width:'95%',
  height: 70,
  alignSelf:'center',
  flexDirection:'row'
},

textWaring: {
  color:'white',
  fontSize: 16,
  fontWeight:'normal',
  alignSelf:'center',
  paddingHorizontal:0,
  width:'90%'

  
},

});
