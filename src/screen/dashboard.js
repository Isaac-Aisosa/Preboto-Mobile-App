import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { 
        StyleSheet, Text, View, 
        Image,Button,TextInput, Platform, 
        ToastAndroid, ScrollView, 
        ImageBackground,Pressable,BackHandler,Dimensions
         
      } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import bg from '../../assets/bg3.jpg';
import { Container, Header, Content, Card, CardItem, Body } from "native-base";
import { Avatar } from 'react-native-paper';
import CardSilder from 'react-native-cards-slider';

import ads1 from '../../assets/ads1.jpg'
import ads2 from '../../assets/ads2.jpg'
import ads3 from '../../assets/ads3.jpg'


export default function Dashboard({ navigation })
 {
  useEffect(() => {
   GetData()

   getAccountBalance()
   getAccountTrade()
   //setTimeout(getAccountBalance(), 5000);
   const reload = setInterval(() => {
    getAccountBalance()
    getAccountTrade()
  }, 1000 * 10) // in milliseconds
  return () => clearInterval(reload)
  }, [token])

  const [token, setToken] = useState('');
  const [name, setName] = useState('');
  const [percent, setPercent] = useState('0');
  const [balanceCurrencyFormat, setbalanceCurrencyFormat] = useState('0');
  const [interest, setInterest] = useState('0');
  const [tradeValue, setTradeValue] = useState('0');

  //setbalanceCurrencyFormat(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(balance));
 // setbalanceCurrencyFormat(currencyFormat(balance));
 
  AsyncStorage.getItem('token')
  .then((value) => {
  const data = JSON.parse(value);
  setToken(data)
  getAccountBalance()
  getAccountTrade()
  });

  let GetData = async ()=>{  
    try{  
      let name = await AsyncStorage.getItem('first_name');  
      let first_name = JSON.parse(name);
      setName(first_name)

      //let b = await AsyncStorage.getItem('balance');  
      //let balance = JSON.parse(b);
      //setBalance(balance)
      //setbalanceCurrencyFormat(new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 }).format(balance));
      //setbalanceCurrencyFormat(currencyFormatter.format(balance, { code: 'USD' }));
      ///setbalanceCurrencyFormat(currencyFormat(balance));

      //let int = await AsyncStorage.getItem('interest_rate');  
      //let interest_rate = JSON.parse(int);
      //setInterest(interest_rate)

      //let valu = await AsyncStorage.getItem('value');  
      //let value = JSON.parse(valu);
      //setTradeValue(value)
    }  
    catch(error){  
    
    }  
  }
function getAccountBalance(){
    axios.get('http://192.168.43.240:8000/api-get-account-balance/', 
  {
    headers: {
      'Authorization': `Token ${token}` 
    }

})
.then(function (response) {
console.log(response.status);
setbalanceCurrencyFormat('₦' + response.data.balance.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
//AsyncStorage.setItem('balance', JSON.stringify(response.data.balance));
//AsyncStorage.setItem('interest_rate', JSON.stringify(response.data.interest_rate));
//AsyncStorage.setItem('value', JSON.stringify(value));
})
.catch(function (error) {
console.log(error);
});
//setTimeout(getAccountBalance, 10000);
}

function getAccountTrade(){
  axios.get('http://192.168.43.240:8000/api-get-last-account-trade/', 
{
  headers: {
    'Authorization': `Token ${token}` 
  }

})
.then(function (response) {
console.log(response.status);
setInterest('₦' + response.data.returns.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
setTradeValue('₦' + response.data.inputAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,'));
let par = response.data.returns / response.data.inputAmount * 100;
let newpar = par.toFixed(1);
setPercent(newpar);
//AsyncStorage.setItem('balance', JSON.stringify(response.data.balance));
//AsyncStorage.setItem('interest_rate', JSON.stringify(response.data.interest_rate));
//AsyncStorage.setItem('value', JSON.stringify(value));
})
.catch(function (error) {
console.log(error);
});
//setTimeout(getAccountBalance, 10000);
}

  return (
    <ImageBackground source={bg} style={styles.container}>
    <StatusBar translucent backgroundColor="transparent" style='light'/> 
    <View style={styles.header}>
    <Text style={styles.preboto}>
    <MaterialCommunityIcons
           name='atom-variant'
           size={25}
         />
      PREBOTO</Text>
    <Text style={styles.wel}>Hello, {name}</Text>
 </View>

<View style={styles.overlayCard}>
<Text style={styles.cardtext}>Total Balance</Text>
<Text style={styles.balance}>{balanceCurrencyFormat}</Text>
</View>

<ScrollView style={styles.footer}>
<View style={styles.transaction}>
<View style={styles.con}>
<Pressable style={styles.icon}   onPress={()=>navigation.navigate('Deposit')}>
<Avatar.Icon size={45} icon="progress-download" color='#000566' backgroundColor='#bcc2d1' />
<Text style={styles.Transactiontext}>Deposit</Text>
</Pressable>

<Pressable style={styles.icon} onPress={()=>navigation.navigate('Transfer')}>
<Avatar.Icon size={45} icon="swap-horizontal" color='#000566' backgroundColor='#bcc2d1' />
<Text style={styles.Transactiontext}>Transfer</Text>
</Pressable>

<Pressable style={styles.icon} onPress={()=>navigation.navigate('SelectWithdrawAccount',{
            TOKEN: token,
          })}>
<Avatar.Icon size={45} icon="bank" color='#000566' backgroundColor='#bcc2d1' />
<Text style={styles.Transactiontext}>Withdraw</Text>
</Pressable>
</View>
</View>

        <View  style={styles.sumary}>
            <CardItem header bordered>
              <Text>Account Trading Summary (24hrs)</Text>
            </CardItem>
            <CardItem bordered>
              <Body>
           <Text style={styles.sumarytext1}>Account Trade Value (NGN)</Text>
           <Text style={styles.sumarytextValue}>{tradeValue}</Text>
            </Body>
            </CardItem>
            <CardItem footer bordered>
            <Body>
           {percent < 0 ? (
           <View>
             <Text style={{fontWeight:'normal', color:'#000', fontSize:14}}>Account Loss (<Text style={{fontSize:14,color:'red', marginTop:14,marginLeft:5}}>{percent}%</Text>)</Text>
             <Text style={{fontWeight:'bold', color:'red', fontSize:18,padding:5}}>{interest}</Text>
           </View>
           ) : (
             <View>
             <Text style={{fontWeight:'normal', color:'#000', fontSize:14}}>Account Growth (<Text style={{fontSize:14,color:'green', marginTop:14,marginLeft:5}}>+{percent}%</Text>)</Text>
        
              <Text style={{fontWeight:'bold', color:'green', fontSize:18,padding:5}}>{interest}</Text>
             </View>
           )}
          
             </Body>
            </CardItem>
       </View>


       <CardSilder autoplay interval={4000}>
       <View style={styles.ads}>
       <Image style={{width:'90%',height:150,alignSelf:'center', marginTop:0,}}source={ads1}   />
       <Text style={{color:'#00358a', marginTop:3, fontSize:16, fontWeight:'bold'}}>Relax and Watch your Account Grow</Text>
       </View>
       <View style={styles.ads}>
       <Image style={{width:'90%',height:150,alignSelf:'center', marginTop:0,}}source={ads2}   />
       <Text style={{color:'#9909e0', marginTop:3, fontSize:16, fontWeight:'bold'}}>We Help you Create a New Cash Inflow</Text>
       </View>
       <View style={styles.ads}>
       <Image style={{width:'90%',height:150,alignSelf:'center', marginTop:0,}}source={ads3}   />
       <Text style={{color:'#248a22', letterSpacing:1, marginTop:3, fontSize:16,fontWeight:'bold'}}>We Help you Benefit from Forex</Text>
       </View>
      
      </CardSilder>



     



     
       
 </ScrollView>
</ImageBackground>    
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#010761',
      
      },
  header: {
    marginTop:10,
   height:200
  },

  footer: {
    flex:2,
    backgroundColor: '#dfeaf2',
    paddingVertical: 50,
  },

  overlayCard: {
    backgroundColor: '#fff',
    borderRadius: 5,
    margin: 10,
    position:'absolute',
    elevation:1,
    borderWidth:1,
    borderColor:'#7a7a7a',
    alignItems: 'stretch',
    marginTop:150,
    width:'95%',
    height: 100,
    alignSelf:'center'
  },

  sumary: {
    backgroundColor: '#fff',
    margin: 5,
    borderRadius:5,
    borderWidth:1,
    borderColor:'#0007DB',
    position:'relative',
    elevation:10,
    alignItems: 'stretch',
    marginTop:10,
    width:'95%',
    height:"auto",
    alignSelf:'center'
  },

  sumaryTitle: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    marginTop:3,
    borderRadius: 2,
    borderColor:'gray',
    width:'100%',
    height: 30,
    alignSelf:'center'
  },

  sumaryValue: {
    backgroundColor: '#fff',
    borderBottomWidth:1,
    marginTop:3,
    borderRadius: 2,
    borderColor:'gray',
    width:'100%',
    height: 30,
    alignSelf:'center'
  },

  sumaryGrowth: {
    backgroundColor: '#fff',
    marginTop:3,
    marginBottom:3,
    borderRadius: 2,
    width:'100%',
    height: 30,
    alignSelf:'center'
  },

  cardtext: {
    color:'#000',
    fontSize: 18,
    marginLeft:19,
    marginTop:5,
    fontWeight:'bold' 
  },
  sumarytext: {
    color:'#2d2e2e',
    fontSize: 16,
    marginLeft:10,
    marginTop:5,
    fontWeight:'normal' 
  },
  sumarytext1: {
    color:'#2d2e2e',
    fontSize: 14,
    marginLeft:10,
    marginTop:5,
    fontWeight:'normal' 
  },
  sumarytextValue: {
    color:'#2d2e2e',
    fontSize: 20,
    marginLeft:10,
    marginTop:5,
    fontWeight:'bold' 
  },

  sumarytextGrowth: {
    color:'#008a17',
    fontSize: 20,
    marginLeft:10,
    marginTop:5,
    fontWeight:'bold' 
  },

  balance: {
    color:'#000',
    fontSize: 30,
    marginLeft:10,
    marginTop:10,
    fontWeight:'bold' 
  },

  logo: {
      width: 150,
      height: 150

  },

  transaction: {
    backgroundColor: '#fff',
    borderRadius: 7,
    margin: 10,
    position:'relative',
    elevation:3,
    borderWidth:1,
    borderColor:'#7a7a7a',
    textAlign:'center',
    alignItems:'center',
    marginTop:10,
    width:'95%',
    height: 120,
    
  },

  ads: {
    backgroundColor: '#fff',
    borderRadius: 7,
    margin: 0,
    position:'relative',
    elevation:3,
    borderWidth:1,
    borderColor:'#7a7a7a',
    textAlign:'center',
    alignItems:'center',
    marginTop:10,
    marginBottom:100,
    width:'100%',
    height: 200,
    
  },

  con: {
  
    alignSelf:'center',
    flexDirection:'row',
    margin:30,
    textAlign:'center'
    
  },

  trans: {
      alignSelf:'center',
      alignContent:'center',
      backgroundColor:'gray',
      width:40,
      height:40,
      elevation:10,
      margin:30,
      borderRadius:60,
    
  },


  Transactiontext: {
    color:'#000',
    fontSize: 14,
    margin:0,
   
    marginTop:0,
    fontWeight:'normal' 
  },

  icon: {
    marginTop:0,
    margin:'10%',
  },


  text: {
   fontSize: 20,
   fontWeight: 'bold',
   marginBottom: 4
   
},

bar: {
    color:'#fff',
},

preboto: {
  color:'#fff',
  fontSize: 25,
  margin:30,
  alignSelf:'center',
  fontWeight:'bold'
  
},

wel: {
  color:'#fff',
  fontSize: 20,
  marginLeft:10,
  elevation:2,
  alignSelf:'center',
  fontWeight:'bold'
  
},
text2: {
  color:'#a61308',
  fontSize: 20,
  fontWeight:'normal'
  
},

button: {
  marginBottom:30,
  
  
},



});
