import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';
import ads4 from '../../assets/ads5.png'

export default function Transfer({ navigation })
 {
    const [amount, setAmount] = useState('');
    const [recipient, setRecipient] = useState('');
    const [token, setToken] = useState('');
    
    
    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
    setToken(data)
    
    });

    function proceed(){
        var AmountremoveComma = amount.replace(/\,/g,'');
        var newAmount = parseInt( AmountremoveComma);

     if (newAmount  < 500){
        console.log('Minimum Transfer is NGN 500')
        ToastAndroid.show("Minimum Transfer is NGN 500", ToastAndroid.SHORT);    
     }
     else{
      console.log('Transfering');
      console.log(newAmount);

      axios.post('http://192.168.43.240:8000/api-preboto-transfer/', {
        amount: newAmount,
        recipient: recipient
      },
      {
        headers: {
          'Authorization': `Token ${token}` 
        }
      })
      .then(function (response) {
        console.log(response.data);
        AsyncStorage.setItem('new_Transfer_transaction_id', JSON.stringify(response.data.transaction_id));
        navigation.navigate('TransferSummary')
      
      })
      .catch(function (error) {
        console.log(error);
        ToastAndroid.show('Account Not Found!', ToastAndroid.SHORT);
      });


     }
    }
    
  return (
      <SafeAreaView style={styles.container}>
    <ScrollView style={styles.footer}>

      <StatusBar style="none" />


   <View style={{backgroundColor:'white',width:'100%',height:400, elevation:1, borderRadius:10}}>

        <View style={{flexDirection:'row', alignSelf:'center'}}>
        <MaterialCommunityIcons name="atom-variant" style={{fontSize:35, alignSelf:'center', marginTop:20, color:'#000566'}}/>    
        <Text style={{alignSelf:'center',fontSize:25,fontWeight:'bold',marginTop:20,color:'#000566' }}>Preboto Transfer</Text>
        </View>

        <View>
         <Text style={{alignSelf:'center', marginTop:5}}>Send money to other preboto users</Text>
       </View>
        
        <View>
        <Text style={{marginTop:20, marginLeft:20}}>Amount to Transfer</Text>
        <TextInput
             mode="outlined"
             label="NGN"
             placeholder='Amount'
             name='Amount'
             keyboardType='numeric'
             style={{backgroundColor:'#dfeaf2', fontSize:20, width:'90%', alignSelf:'center',marginTop:5}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setAmount(val)}
             
             />

        <Text style={{marginTop:10, marginLeft:20}}>Recipient Acct. Number</Text>
        <TextInput
             mode="outlined"
             label="Account Number"
             placeholder=''
             name='Account Number'
             keyboardType= 'numeric'
             style={{backgroundColor:'#dfeaf2', fontSize:20, width:'90%', alignSelf:'center',marginTop:5}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setRecipient(val)}
             
             />            
        </View>


    <Pressable style={styles.button} onPress={proceed}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Proceed with Transfer</Text>
    </Pressable>
   </View>
   <Image style={{width:300,height:400,alignSelf:'center', marginTop:30,}}source={ads4}   />
</ScrollView>
</SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#dfeaf2',
      
      },
  header: {
    flex: 1,
    alignItems: 'center',
    
    justifyContent: 'center',
  },

  footer: {
    flex: 2,
    backgroundColor: '#dfeaf2',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 20,
    
    

  },

  logo: {
      width: 150,
      height: 150

  },

  text: {
   
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 4
   
},

preboto: {
  color:'#0f2c40',
  fontSize: 20,
  fontWeight:'bold'
  
},
text2: {
  color:'#a61308',
  fontSize: 20,
  fontWeight:'normal'
  
},

button: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:50,
    width:'90%',
    alignSelf:'center',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000566',
    marginTop: 30,
    marginBottom:100,
    backgroundColor: '#000566',
  },

  copy: {
    justifyContent: 'center',
    textAlignVertical:'center',
    paddingHorizontal: 10,
    marginLeft:5,
    height:25,
    width:60,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#66b3ff',
    backgroundColor: '#66b3ff',
  },
  



});
