
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, Pressable, ImageBackground,ScrollView, ToastAndroid } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import bg from '../../assets/bg3.jpg';
import { TextInput } from 'react-native-paper';

export default function EmailLogin({ navigation })
 {
     const[data, setData] = React.useState({
      secureTextEntry: true
     });

     const [email, setEmail] = useState('');
     const [password1, setPassword] = useState('');
     const [indicator, setIndicator] = useState(false);

     function login(){

      if (email === '' || password1.length < 5){
        ToastAndroid.show("Incorrect Credentials", ToastAndroid.SHORT); 
      }

      else{
      var e = email
      var remove_after= e.indexOf('@');
      var username =  e.substring(0, remove_after);
      setIndicator(!indicator);
      axios.post('http://192.168.43.240:8000/api-login/', {
      username: username,
      password: password1,
      })
     .then(function (response) {
     //console.log(response.data);
     AsyncStorage.setItem('token', JSON.stringify(response.data.token));
     AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id.toString()));
     AsyncStorage.setItem('first_name', JSON.stringify(response.data.firstname));
     AsyncStorage.setItem('last_name', JSON.stringify(response.data.lastname));
     AsyncStorage.setItem('username', JSON.stringify(username));
     AsyncStorage.setItem('email', JSON.stringify(response.data.email));
     AsyncStorage.setItem('password', JSON.stringify(password1));
     setIndicator(indicator);
     navigation.navigate('index')
  })
  .catch(function (error) {
    console.log(error);
    if(error.response.status == 400){
      ToastAndroid.show("Incorrect Login Credentials", ToastAndroid.SHORT); 
      setIndicator(indicator);
     }
  });

      }
     }

    const updateSecuredTextEntry = () =>{
      setData({
          ...data,
          secureTextEntry: !data.secureTextEntry
      });
}


  return (
    <ImageBackground source={bg} style={styles.container}>
    
    <View  style={styles.header}>
    <Text animation="bounceIn" style={styles.preboto}>
    <MaterialCommunityIcons
           name='atom-variant'
           size={30}
         />
      PREBOTO
      </Text>
      <StatusBar style="none" />
    </View>
  

    <View 
    animation= 'fadeInUpBig'
    style={styles.footer}>

    <Text animation="bounce"  style={styles.text}>Account Login</Text>
    
    <ScrollView>
    <View style={styles.inputField}>
      <View style={{flexDirection:'row', 
                    marginBottom:20 }}>
          <TextInput
             mode="outlined"
             label="Email"
             placeholder='email address'
             style={{ paddingLeft:10, flex:1  }}
             textContentType='emailAddress'
             autoCapitalize='none'
             onChangeText={(val)=> setEmail(val)}

             left={<TextInput.Icon
              name='email'/>}

             /> 

          { data.check_textInputChange  ?  
          
          <View
            animation='bounceIn'>
          <MaterialCommunityIcons
           name='check-circle-outline'
           color= 'green'
           size={20}
           />
           </View>
           : null}
      </View>


      <View style={styles.inputField}>
      <View style={{flexDirection:'row', 
                    marginBottom:25 }}>
     
          <TextInput
             mode="outlined"
             label="Password"
             placeholder='Password'
             maxLength={5}
             secureTextEntry={data.secureTextEntry ? true : false}
             style={{ paddingLeft:10, flex:1, fontSize:20   }}
             autoCapitalize='none'
             onChangeText={(val)=> setPassword(val)}

             left={<TextInput.Icon
              name='lock'/>}

             right={<TextInput.Icon
                name='eye-off-outline'
               onPress={updateSecuredTextEntry} />}

             /> 

      </View>
      </View>

    </View>
    <Pressable style={styles.button1}   onPress={login}>
      <Text style={styles.text4}>Login</Text>
      <ActivityIndicator size="small" color="#030099" animating={indicator} style={{padding:10, marginTop:10}}/>
    </Pressable>
    <View>
    <Pressable style={styles.button2}  onPress={()=>navigation.navigate('EmailReg')}>
      <Text style={styles.text3}>Create New Account</Text>
    </Pressable>
    </View>
     </ScrollView>
    </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: 'white',
      
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
  color:'#fff',
  fontSize: 30,
  margin:30,
  alignSelf:'center',
  fontWeight:'bold' 
},

text2: {
  color:'#a61308',
  fontSize: 20,
  fontWeight:'normal'
  
},

button2: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 7,
  borderWidth: 2,
  borderColor: '#00a80b',
  marginTop: 30,
  height:50,
  backgroundColor: '#00a80b',
},

text3: {
  color:'#fff',
  fontSize: 20,
  fontWeight:'normal'
  
},

button1: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 7,
  borderWidth: 2,
  borderColor: '#030099',
  elevation: 2,
  height:50,
  marginTop: 10,
  backgroundColor: '#fff',
  flexDirection:'row'
},

text4: {
  color:'#030099',
  fontSize: 25,
  fontWeight:'normal'
  
},

inputField:{
 marginTop:20,
 marginBottom:10,
 
},

});
