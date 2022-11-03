import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView, Pressable, Linking, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Clipboard} from 'react-native';


export default function Setting({ navigation })
 {
  function logout(){
      AsyncStorage.clear();
      navigation.navigate('Auth');
      //navigation.navigate('Create_Profile')
      console.log('logout');
  }
  const [token, setToken] = useState('');
  const [username, setUsername] = useState('');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [acct_number, setAccountNumber] = useState('---------');
  const [phone_number, setPhoneNumber] = useState('---------');
  const [emails, setClientEmail] = useState('---------');

  const [mobile1, setmobile1] = useState('---------');
  const [mobile2, setmobile2] = useState('---------');
  const [whatsapp, setwhatsapp] = useState('');
  const [email, setEmail] = useState('');
  const [facebook, setfacebook] = useState('');
  const [twitter, settwitter] = useState('');
  const [tiktok, settiktok] = useState('');
  const [youtube, setYoutube] = useState('');
  const [instagram, setInstagram] = useState('');

  const copyAcctNumber = () => {
    Clipboard.setString(acct_number);
    ToastAndroid.show("Account Number Copied!", ToastAndroid.SHORT);
  }; 
  
  AsyncStorage.getItem('token')
  .then((value) => {
  const data = JSON.parse(value);
  setToken(data)
  
  });

  AsyncStorage.getItem('first_name')
  .then((value) => {
  const data = JSON.parse(value);
  setFirstName(data);
  
  });
  AsyncStorage.getItem('last_name')
  .then((value) => {
  const data = JSON.parse(value);
  setLastName(data)
  
  });
  AsyncStorage.getItem('username')
  .then((value) => {
  const data = JSON.parse(value);
  setUsername(data)
  
  });

  AsyncStorage.getItem('email')
  .then((value) => {
  const data = JSON.parse(value);
  setClientEmail(data)
  
  });

  function getAccount(){
    axios.get('http://192.168.43.240:8000/api-get-account-balance/', 
  {
    headers: {
      'Authorization': `Token ${token}` 
    }

})
.then(function (response) {
console.log(response.status);
setAccountNumber(response.data.acct_number)

})
.catch(function (error) {
console.log(error);
});
}


function getProfile(){
  axios.get('http://192.168.43.240:8000/api-get-profile/', 
{
  headers: {
    'Authorization': `Token ${token}` 
  }

})
.then(function (response) {
console.log(response.status);
setPhoneNumber(response.data.Phone)

})
.catch(function (error) {
console.log(error);
});
}

function getCustomerServiceDetails(){
  axios.get('http://192.168.43.240:8000/api-get-customer-service-details/', 
{
  headers: {
    'Authorization': `Token ${token}` 
  }

})
.then(function (response) {
console.log(response.status);
setmobile1(response.data.mobile1)
setmobile2(response.data.mobile2)
setwhatsapp(response.data.whatsapp)
setEmail(response.data.email)
settwitter(response.data.twitter)
setfacebook(response.data.facebook)
setYoutube(response.data.youtube)
settiktok(response.data.tiktok)
setInstagram(response.data.instagram)
})
.catch(function (error) {
console.log(error);
});
}
 
useEffect(() => {
  
  getAccount();
  getProfile();
  getCustomerServiceDetails();
  
}, [token]);
    
  return (
      <View style={styles.container}>
         <StatusBar translucent backgroundColor="transparent" style='light'/> 
    <View style={styles.header}>
    <Text style={styles.preboto}>
    <MaterialCommunityIcons
           name='atom-variant'
           size={40}
         />
     </Text>
     <Text style={styles.preboto}>{first_name} {last_name}</Text>
     <Text style={{fontSize:16,color:'white'}}>{username}</Text>
     </View>
     <ScrollView style={styles.footer}>
   
     <View style={styles.account}>
     <Text style={{fontSize:14,color:'#959596',marginLeft:15,marginTop:10}}>Account Number</Text>
     <Text style={{fontSize:25,color:'#03001f',marginLeft:10,marginTop:0,fontWeight:'bold', letterSpacing:3}}>{acct_number}
     <Text style={{fontSize:14,color:'#4a36ff',marginLeft:15,marginTop:10, letterSpacing:2}} onPress={copyAcctNumber}>Copy</Text>
     </Text>
     <Text style={{fontSize:14,color:'#959596',marginLeft:15,marginTop:10}}>Phone Number</Text>
     <Text style={{fontSize:25,color:'#03001f',marginLeft:10,marginTop:0,fontWeight:'bold', letterSpacing:3}}>{phone_number}</Text>
     <Text style={{fontSize:10,color:'#03001f',marginLeft:10,marginTop:10,fontWeight:'normal', letterSpacing:3,}}>{emails}</Text>
    </View>
<View style={{alignSelf:'center'}}>
<Pressable style={styles.button} onPress={()=>navigation.navigate('SelectWithdrawAccount',{
            TOKEN: token,
          })}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Add or View Withdraw Account</Text>
    </Pressable>
</View>
 
    <View style={styles.Waccount}>
    <Text style={{fontSize:14,color:'#959596',marginLeft:15,marginTop:10}}>Customer Service</Text>
      <View>
      <Text style={{fontSize:20,color:'#03001f',marginLeft:15,marginTop:0,fontWeight:'bold', letterSpacing:3}}>{mobile1}</Text>
      <Text style={{fontSize:20,color:'#03001f',marginLeft:15,marginTop:0,fontWeight:'bold', letterSpacing:3}}>{mobile2}</Text>
      <Text style={{fontSize:16,color:'#03001f',marginLeft:15,marginTop:5,fontWeight:'normal', letterSpacing:3,}}>{email}</Text>
      </View>

      <Text style={{fontSize:14,color:'#c4c4c4',marginLeft:15,marginTop:20,fontWeight:'normal',
       letterSpacing:3,alignSelf:'center'}}>click the social icons</Text>
   
      <View style={{flexDirection:'row', marginLeft:0,marginTop:0, alignSelf:'center'}}>
      <MaterialCommunityIcons
           name='whatsapp'
           size={30}
           style={{margin:5,color:'green'}}
           onPress={() => Linking.openURL(`https://wa.me/${whatsapp}`)}
         />
        <MaterialCommunityIcons
           name='instagram'
           size={30}
           style={{margin:5,color:'#f50551'}}
           onPress={() => Linking.openURL(`${instagram}`)}
         />
               <MaterialCommunityIcons
           name='facebook'
           size={30}
           style={{margin:5,color:'#0c0596'}}
           onPress={() => Linking.openURL(`${facebook}`)}
         />
               <MaterialCommunityIcons
           name='twitter'
           size={30}
           style={{margin:5,color:'#0078f7'}}
           onPress={() => Linking.openURL(`${twitter}`)}
         />
               <MaterialCommunityIcons
           name='youtube'
           size={30}
           style={{margin:5,color:'#eb0000'}}
           onPress={() => Linking.openURL(`${youtube}`)}
         />

         <MaterialCommunityIcons
           name='gmail'
           size={30}
           style={{margin:5,color:'#6b0000'}}
           onPress={() => Linking.openURL(`${email}`)}
         />
     
      </View>
    </View>

<View style={{alignSelf:'center'}}>
<Pressable style={{  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 0,
  height:50,
  width:300,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'gray',
  marginTop: 20,
  marginBottom:10,
  backgroundColor: '#fff',}} onPress={()=>navigation.navigate('Policy',{
            TOKEN: token,
          })}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>Terms & Conditions</Text>
    </Pressable>
</View>

<View style={{alignSelf:'center'}}>
<Pressable style={{  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 0,
  height:50,
  width:300,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'gray',
  marginTop: 10,
  marginBottom:10,
  backgroundColor: '#fff',}} onPress={()=>navigation.navigate('About',{
            TOKEN: token,
          })}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>About Us</Text>
    </Pressable>
</View>

<View style={{alignSelf:'center'}}>
<Pressable style={{  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 0,
  height:50,
  width:300,
  borderRadius: 10,
  borderWidth: 1,
  borderColor: 'gray',
  marginTop: 10,
  marginBottom:20,
  backgroundColor: '#fff',}} onPress={()=>navigation.navigate('Website',{
            TOKEN: token,
          })}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'black'}}>Our WebSite</Text>
    </Pressable>
</View>


    <View style={{alignSelf:'center', marginBottom:50,marginTop:20}}>
<Pressable style={styles.logout} onPress={logout}>  
<MaterialCommunityIcons
           name='account'
           size={20}
           style={{color:'white'}}
         />
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Logout</Text>
    </Pressable>
</View>
    
    </ScrollView>

</View>     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#000566',
      
      },
  header: {
    alignItems: 'center',
    justifyContent: 'center',
    height:210
  },

  footer: {
    flex:1,
    backgroundColor: '#fff',
    paddingHorizontal: 5,
    height:'100%',
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
  color:'#fff',
  fontSize: 30,
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

account: {
  backgroundColor: '#fff',
  borderRadius: 7,
  margin: 10,
  borderWidth:1,
  borderColor:'#0e008a',
  textAlign:'center',
  marginTop:10,
  width:'95%',
  height: 170,
  
},

Waccount: {
  backgroundColor: '#fff',
  borderRadius: 7,
  margin: 10,
  borderWidth:1,
  borderColor:'#0e008a',
  textAlign:'center',
  marginBottom:1,
  width:'95%',
  height: 200,
  
},

button: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 0,
  height:50,
  width:300,
  borderRadius: 10,
  borderWidth: 2,
  borderColor: '#000566',
  marginTop: 20,
  marginBottom:20,
  backgroundColor: '#000566',
},

logout: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 0,
  height:50,
  width:150,
  borderRadius: 5,
  borderWidth: 2,
  borderColor: '#000566',
  marginTop: 20,
  marginBottom:20,
  backgroundColor: '#000566',
  flexDirection:'row'
},


});
