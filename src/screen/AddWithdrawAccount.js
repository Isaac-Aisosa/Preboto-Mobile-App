import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput,Provider,Modal, Portal, } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import ads4 from '../../assets/ads9.png'

export default function AddWithdrawAccount({ route, navigation })
 {

  const [accountNumber, setAccountNumber] = useState('');
  const [accountName, setAccountName] = useState('');


    const {  bankName, bankCode, Authtoken } = route.params;
    

    const sendData = async () => {
      
      if (accountNumber.length  < 10){
        ToastAndroid.show("Account Number Incomplete", ToastAndroid.SHORT);    
     }
     else{

      axios.post('http://192.168.43.240:8000/api-add-withdraw-account/', {
        number: accountNumber,
        name:accountName,
        bankname: bankName,
        bankcode:bankCode
      },
      {
        headers: {
          'Authorization': `Token ${Authtoken}` 
        }
      })
      .then(function (response) {
        console.log(response.data);
        ToastAndroid.show('Account Added!', ToastAndroid.SHORT);
        navigation.navigate('Tab')
      })
      .catch(function (error) {
        console.log(error);
        //ToastAndroid.show(error.response.status, ToastAndroid.SHORT);
      });


     }

   
    };


  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Add Withdraw Account</Text>
      <StatusBar style="none" />


    <View  style={{marginTop:20}}>
            <TextInput
             mode="outlined"
             label="Account Number"
             placeholder=''
             name='Account Number'
             keyboardType='numeric'
             maxLength={10}
             style={{backgroundColor:'white', fontSize:20}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setAccountNumber(val)}
             
             />
        <Text style={{fontSize:14, marginTop:5, color:'red'}}>
            Ensure your account details are correct
        </Text>

            <TextInput
             mode="outlined"
             label="Account Name"
             placeholder=''
             name='Account Name'
             keyboardType='default'
             style={{backgroundColor:'white', fontSize:20, marginTop:10, marginBottom:10}}
             textContentType='none'
             autoCapitalize='none'
             onChangeText={(val)=>setAccountName(val)}
             
             /> 
             
    </View>

    <Text style={{fontSize:20, marginTop:5, fontWeight:'bold'}}>
            {bankName}
        </Text>
  
     <Pressable style={styles.button} onPress={sendData}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Save Account</Text>
    </Pressable>

    <Image style={{width:300,height:600,alignSelf:'center', marginTop:30,}}source={ads4}   />
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
    borderColor: '#189602',
    marginTop: 30,
    marginBottom:40,
    backgroundColor: '#189602',
  },

  add: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    height:40,
    borderRadius: 5,
    borderWidth: 2,
    borderColor: '#00a62c',
    marginTop: 0,
    marginBottom:10,
    backgroundColor: '#00a62c',
  },
  



});
