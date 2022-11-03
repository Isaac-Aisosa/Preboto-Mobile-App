import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, Dimensions } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput,Provider,Modal, Portal, } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import ads4 from '../../assets/ads8.png'

export default function Withdraw({ route, navigation })
 {
  useEffect(() => {
    getAccountBalance()
    
   }, [])
    const [amount, setAmount] = useState('');
    const [balance, setBalance] = useState('0');
    const [formatbalance, setBalanceCurrencyFormat] = useState('0');

    const {  bankName, bankId, Authtoken, Number, Name, acc_owner } = route.params;
     
    function getAccountBalance(){
      axios.get('http://192.168.43.240:8000/api-get-account-balance/', 
    {
      headers: {
        'Authorization': `Token ${Authtoken}` 
      }
  
  })
  .then(function (response) {
  console.log(response.status);
  setBalanceCurrencyFormat('₦' + response.data.balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
  setBalance(response.data.balance);

  })
  .catch(function (error) {
  console.log(error);
  });
  }



    function proceed(){
        var AmountremoveComma = amount.replace(/\,/g,'');
        var newAmount = parseInt( AmountremoveComma);

     if (newAmount  < 500 || !newAmount){

        ToastAndroid.show("Minimum Withdraw is NGN 500", ToastAndroid.SHORT);    
     }
     else{

      if (balance < newAmount){
        ToastAndroid.show("Insuficient fund!", ToastAndroid.SHORT); 
      }
      else{
      axios.post('http://192.168.43.240:8000/api-customer-withdraw/', {
        amount: newAmount,
        bank: bankId,
        bankname: bankName,
        owner: acc_owner,
      },
      {
        headers: {
          'Authorization': `Token ${Authtoken}` 
        }
      })
      .then(function (response) {
        console.log(response.data);
        navigation.navigate('WithdrawComplete')
      
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error, ToastAndroid.SHORT);
      });
    }

     }
    }
    
  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Withdraw</Text>
      <StatusBar style="none" />

    <View>
    <Text style={{fontSize:16, marginTop:0}}>
            Account Balance
    </Text>
    <Text style={{fontSize:18,fontWeight:'bold'}}>
           {formatbalance}
    </Text>


        <Text style={{fontSize:18, marginTop:20}}>
            How much do you want to withdraw?
        </Text>
    </View>

    <View  style={{marginTop:0}}>
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
            Note:Minimum withdraw is NGN 500
        </Text>
    </View>


    <View style={{alignSelf:'center'}}>
        <Text style={{fontSize:25, marginTop:10, fontWeight:'bold', alignSelf:'center'}}>
           {bankName}
        </Text>
        <Text style={{fontSize:20,color:'#0e008a',fontWeight:'bold', alignSelf:'center'}}>
           {Name}
        </Text>
        <Text style={{fontSize:18, marginTop:0, fontWeight:'normal', color:'#e63900',alignSelf:'center', letterSpacing:3}}>
           {Number}
        </Text>
    </View>

     <Pressable style={styles.button} onPress={proceed}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Request Withdraw</Text>
    </Pressable>
    <Image style={{width:'87%',height:'60%',alignSelf:'center', marginTop:10,}}source={ads4}   />
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

  add: {
    alignItems: 'center',
    alignSelf:'flex-end',
    justifyContent: 'center',
    height:40,
    width:40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00a62c',
    marginTop: 0,
    marginBottom:10,
    backgroundColor: '#00a62c',
  },
  



});
