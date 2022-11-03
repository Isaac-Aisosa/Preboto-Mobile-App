import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView,Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';
import ads4 from '../../assets/ads3.png'

export default function Deposit({ navigation })
 {
    const [amount, setAmount] = useState('');
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
        console.log('Minimum Deposit is NGN 500')
        ToastAndroid.show("Minimum Deposit is NGN 500", ToastAndroid.SHORT);    
     }
     else{
      console.log('Let proceed');
      console.log(newAmount);

      axios.post('http://192.168.43.240:8000/api-customer-create-deposit/', {
        amount: newAmount
      },
      {
        headers: {
          'Authorization': `Token ${token}` 
        }
      })
      .then(function (response) {
        console.log(response.data);
        AsyncStorage.setItem('new_Deposit_transaction_id', JSON.stringify(response.data.transaction_id));
        AsyncStorage.setItem('new_Deposit_amount', JSON.stringify(response.data.amount));
        navigation.navigate('DepositSummary')
      
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error, ToastAndroid.SHORT);
      });


     }
    }
    
  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Deposit</Text>
      <StatusBar style="none" />

    <View>
        <Text style={{fontSize:20, marginTop:20}}>
            How much do you want to deposit?
        </Text>
    </View>

    <View  style={{marginTop:20}}>
            <TextInput
             mode="outlined"
             label="NGN"
             placeholder='Amount'
             name='Amount'
             keyboardType='numeric'
             style={{backgroundColor:'#dfeaf2', fontSize:20}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setAmount(val)}
             
             />
             
    </View>

    <View>
        <Text style={{fontSize:16, marginTop:5, color:'red'}}>
            Note:Minimum Deposit is NGN 500
        </Text>
    </View>

    <Pressable style={styles.button} onPress={proceed}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Proceed with Deposit</Text>
    </Pressable>

     
    <Image style={{width:Dimensions.get("window").width,height:'70%',alignSelf:'center', marginTop:30,}}source={ads4}   />



    </View>
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
    alignItems: 'stretch',
    

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
  fontSize: 30,
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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000566',
    marginTop: 20,
    marginBottom:40,
    backgroundColor: '#000566',
  },
  



});
