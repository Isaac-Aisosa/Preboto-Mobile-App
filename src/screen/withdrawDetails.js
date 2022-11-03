import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput,Provider,Modal, Portal, } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {Clipboard} from 'react-native';

export default function WithdrawDetails({ route, navigation })
 {

    const {  amount, time, complete,pending,failed,bank,transactionID,token } = route.params;

    const [bankname, setBankName] = useState('');
    const [account, setAcc_name] = useState('');
    const [accNumber, setAccNumber] = useState('');
       
    const FetchData = async () => {
        
         axios.post('http://192.168.43.240:8000/api-get-withdraw-account-detail/', {
             
            bank: bank,
        
          }, 
         {
           headers: {
             'Authorization': `Token ${token}` 
           }
       
       })
       .then(function (response) {
       console.log(response.status);
      // console.log(response.data.bankName);
       setAccNumber(response.data.accNumber);
       setBankName(response.data.bankName);
       setAcc_name(response.data.accName);
       
       })
       .catch(function (error) {
       console.log(error);
       });
       };

       useEffect(()=>{
    
        FetchData();
       //Animated.timing(translateX,{toValue:0,duration:2000}).start();
       
     },[token])
    
    const copyNarration = () => {
        Clipboard.setString(transactionID);
        ToastAndroid.show("Transaction ID Copied!", ToastAndroid.SHORT);
      };  

  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Withdraw Details</Text>
      <StatusBar style="none" />

      {pending ? (
       <MaterialCommunityIcons name="alpha-p-circle" style={{fontSize:200, alignSelf:'center', marginTop:30, color:'#e39709'}}/>
      ) : (
        <View></View>
      )}

    {complete ? (
      
        <MaterialCommunityIcons name="checkbox-marked-circle-outline" style={{fontSize:200, alignSelf:'center', marginTop:30, color:'#1bc900'}}/>
       
      ) : (
        <View></View>
      )} 

      {failed ? (
        <MaterialCommunityIcons name="alert" style={{fontSize:200, alignSelf:'center', marginTop:30, color:'#e31009'}}/>
      ) : (
        <View></View>
      )}   

        <Text style={{fontSize:30, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {'₦' + amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>
        <Text style={{fontSize:16, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {time}
        </Text>
        <Text style={{fontSize:16, marginTop:0, color:'green', fontWeight:'bold', alignSelf:'center'}}>
            Withdraw to:
        </Text>
        <Text style={{fontSize:20, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {bankname}
        </Text>
        <Text style={{fontSize:18, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {account}
        </Text>
        <Text style={{fontSize:16, marginTop:0, color:'blue', fontWeight:'bold', alignSelf:'center'}}>
            {accNumber}
        </Text>

        <Pressable style={{marginTop:20, borderRadius:5, width:'100%', height:60,backgroundColor:'#b3d9ff'}} onPress={copyNarration}>
         <Text style={{fontSize:14, marginTop:10, marginLeft:10,fontWeight:'normal', alignSelf:'center',color:'#000'}}>
         Transaction ID
          </Text>
           <Text style={{fontSize:20, marginTop:0, marginLeft:10,fontWeight:'bold',alignSelf:'center',color:'#000'}}>
            {transactionID}
          </Text>
        </Pressable>
             
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
    backgroundColor: '#fff',
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
