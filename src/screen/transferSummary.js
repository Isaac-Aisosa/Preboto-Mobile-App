import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


export default function TransferSummary({ navigation })
 {
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [name, setName] = useState('');
    const [username, setUsername] = useState('');
    const [accountNum, setAccountNum] = useState('');
    const [token, setToken] = useState('');
    const [transaction_id, setTransaction_id] = useState('');
    
    
    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
    setToken(data)
    
    });

    AsyncStorage.getItem('new_Transfer_transaction_id')
    .then((value) => {
    const data = JSON.parse(value);
    setTransaction_id(data)
    
    });

    function getTransferSummary(){
        axios.post('http://192.168.43.240:8000/api-transfer-summary/', {
            transaction_id: transaction_id
          },
          {
            headers: {
              'Authorization': `Token ${token}` 
            }
          })
          .then(function (response) {
            console.log(response.status);
            console.log(response.data);
            setAccountNum(response.data.accountNum);
            setName(response.data.fullname);
            setUsername(response.data.username)
            var amount = '₦' + response.data.amount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')
            setAmount(amount)
            //navigation.navigate('DepositComplete')
          
          })
          .catch(function (error) {
            console.log(error);
            //ToastAndroid.show(error, ToastAndroid.SHORT);
          });
    }

    getTransferSummary();

    function Transfer(){
        if(pin.length === 4){
          console.log('Transfering money now')
          axios.post('http://192.168.43.240:8000/api-transfer-approved/', {
            transaction_id: transaction_id,
            pin: pin
          },
          {
            headers: {
              'Authorization': `Token ${token}` 
            }
          })
          .then(function (response) {
            console.log(response.status);
            navigation.navigate('TransferComplete')
          
          })
          .catch(function (error) {
            console.log(error);
            if (error.response.status == 406){
                ToastAndroid.show('incorrect pin', ToastAndroid.LONG);
            }
            if (error.response.status == 402){
                ToastAndroid.show('Insuficient Fund!', ToastAndroid.LONG);
                navigation.navigate('Tab')
            }
            //ToastAndroid.show(error, ToastAndroid.SHORT);
          });
        }
        else{
            console.log('incorrect pin') 
            ToastAndroid.show('incorrect pin', ToastAndroid.SHORT);
        }
    }
    
    
  return (
      <SafeAreaView style={styles.container}>
    <ScrollView style={styles.footer}>

      <StatusBar style="none" />


   <View style={{backgroundColor:'white',width:'100%',height:550, elevation:1, borderRadius:10}}>

        <View style={{alignSelf:'center'}}>
        <MaterialCommunityIcons name="atom-variant" style={{fontSize:45, alignSelf:'center', marginTop:20, color:'#000566'}}/>    
        <Text style={{alignSelf:'center',fontSize:25,fontWeight:'bold',marginTop:0,color:'#000566' }}>Transfer Summary</Text>
        </View>
        <View >
        <Text style={{marginTop:20, marginLeft:20, fontSize:14}}>Amount</Text>
        <Text style={{marginTop:0, marginLeft:20, fontSize:25, fontWeight:'700'}}>{amount}</Text>

        <Text style={{marginTop:10, marginLeft:20, fontSize:14}}>Recipient</Text>
        <Text style={{marginTop:0, marginLeft:20, fontSize:20, fontWeight:'700'}}>{name}</Text>
        <Text style={{marginTop:0, marginLeft:20, fontSize:14, fontWeight:'700'}}>({username})</Text>
        

        <Text style={{marginTop:10, marginLeft:20, fontSize:14}}>Account number</Text>
        <Text style={{marginTop:0, marginLeft:20, fontSize:25, fontWeight:'700'}}>{accountNum}</Text>
        </View>

         <View>
         <Text style={{marginTop:10,fontSize:16, alignSelf:'center', color:'red', marginBottom:10 }}>Enter Transaction Pin</Text>
         <TextInput
           maxLength={4}
           style={styles.input}
           autoCapitalize='none'
           keyboardType= 'numeric'
           textContentType='password'
           secureTextEntry={true}
           onChangeText={(val)=> setPin(val)}
          />
         </View>

    <Pressable style={styles.button} onPress={Transfer}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Transfer</Text>
    </Pressable>


   </View>
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
    marginTop: 20,
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
  
  input:{
    width:'40%',
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


});
