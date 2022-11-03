import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';
import {Clipboard} from 'react-native';

export default function DepositSummary({ navigation })
 {
    const [amount, setAmount] = useState('');
    const [narration, setNarration] = useState('');
    const [token, setToken] = useState('');
    const [acct_number, setAcctNumber] = useState('');
    const [acct_name, setAcctName] = useState('');
    const [bank, setBank] = useState('');
   
    
    
    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
    setToken(data)
    
    });

    AsyncStorage.getItem('new_Deposit_transaction_id')
    .then((value) => {
    const data = JSON.parse(value);
    setNarration(data)
    
    });

    AsyncStorage.getItem('new_Deposit_amount')
    .then((value) => {
    const data = JSON.parse(value);
    var amount = '₦' + data.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
    setAmount(amount)
    
    });

    const copyNumber = () => {
        Clipboard.setString(acct_number);
        ToastAndroid.show("Account Number Copied!", ToastAndroid.SHORT);
      };

    const copyName = () => {
        Clipboard.setString(bank);
        ToastAndroid.show("Bank Copied!", ToastAndroid.SHORT);
      };

      const copyNarration = () => {
        Clipboard.setString(narration);
        ToastAndroid.show("Narration Copied!", ToastAndroid.SHORT);
      };  

    

    function complete(){

        axios.post('http://192.168.43.240:8000/api-deposit-complete/', {
            transaction_id: narration
          },
          {
            headers: {
              'Authorization': `Token ${token}` 
            }
          })
          .then(function (response) {
            console.log(response.status);
            navigation.navigate('DepositComplete')
          
          })
          .catch(function (error) {
            console.log(error);
            //ToastAndroid.show(error, ToastAndroid.SHORT);
          });

    }

   


    function getAccountDetails(){
        axios.get('http://192.168.43.240:8000/api-get-deposit-account/', 
      {
        headers: {
          'Authorization': `Token ${token}` 
        }
    
    })
    .then(function (response) {
    console.log(response.data);
    setAcctName(response.data.account_name);
    setAcctNumber(response.data.acct_number);
    setBank(response.data.bank);
    })
    .catch(function (error) {
    console.log(error);
    });
    }

    getAccountDetails();
    
  return (
      <SafeAreaView style={styles.container}>
    <ScrollView style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Deposit Summary</Text>
      <StatusBar style="none" />
      <View>
      <Text style={{fontSize:14, marginTop:10, marginLeft:10,fontWeight:'bold', alignSelf:'center',color:'#b30000'}}>
            Method
        </Text>
       <Text style={{fontSize:25, marginTop:0, marginLeft:10,fontWeight:'bold', alignSelf:'center'}}>
            Mobile Transfer
        </Text>
        </View>


        <Text style={{fontSize:18, marginTop:10, marginLeft:10}}>
            Follow this steps
        </Text>

    <View style={{marginTop:0, borderRadius:10, borderColor:'#660000', width:'100%', height:200, borderWidth:2}}>
    
        <Text style={{fontSize:14, marginTop:5, color:'red', marginLeft:10}}>
            1. Use your Bank mobile App
        </Text>
        <Text style={{fontSize:14, marginTop:5, color:'red', marginLeft:10}}>
            2. Click to Copy the account number and bank name
        </Text>
        <Text style={{fontSize:14, marginTop:5, color:'red', marginLeft:10}}>
            3. Click on the blue area to copy your unique narration
        </Text>
        <Text style={{fontSize:14, marginTop:5, color:'red', marginLeft:10}}>
            4. Make sure to use this narration below as the transfer narration
        </Text>
        <Text style={{fontSize:14, marginTop:5, color:'red', marginLeft:10}}>
            5. Click "Deposit Complete" when done
        </Text>
      
    </View>

        <Pressable style={{marginTop:20, borderRadius:5, width:'100%', height:60,backgroundColor:'#b3d9ff'}} onPress={copyNarration}>
         <Text style={{fontSize:14, marginTop:10, marginLeft:10,fontWeight:'normal', alignSelf:'center',color:'#000'}}>
            Transfer narration
          </Text>
           <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',alignSelf:'center',color:'#000'}}>
            {narration}
          </Text>
        </Pressable>

        <View>
        <Text style={{fontSize:12, marginTop:20, marginLeft:10,fontWeight:'normal',color:'#000'}}>
        Account Number
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',color:'#000'}}>
            {acct_number}
          </Text>
          <Pressable style={styles.copy} onPress={copyNumber}>
          <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Copy</Text>
         </Pressable>
          </View>

          
        <View>
        <Text style={{fontSize:12, marginTop:10, marginLeft:10,fontWeight:'normal',color:'#000'}}>
          Bank
          </Text>
          <View style={{flexDirection:'row'}}>
          <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',color:'#000'}}>
           {bank}
          </Text>
          <Pressable style={styles.copy} onPress={copyName}>
          <Text style={{fontSize:14, fontWeight:'bold', color:'white'}}>Copy</Text>
         </Pressable>
          </View>
          
          </View>

          <View>
          <Text style={{fontSize:12, marginTop:10, marginLeft:10,fontWeight:'normal',color:'#000'}}>
            Account Name
          </Text>
          <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',color:'#000'}}>
           {acct_name}
          </Text>
          </View>

        <View>
        <Text style={{fontSize:12, marginTop:10, marginLeft:10,fontWeight:'normal',color:'#000'}}>
        Amount
          </Text>
          <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',color:'#000'}}>
            {amount}
          </Text>
       </View>
      </View>

    <Pressable style={styles.button} onPress={complete}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Deposit complete</Text>
    </Pressable>



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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00b300',
    marginTop: 20,
    marginBottom:100,
    backgroundColor: '#00b300',
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
