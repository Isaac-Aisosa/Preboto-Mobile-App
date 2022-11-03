
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, ToastAndroid, ScrollView, Pressable,  ImageBackground, } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';
import bg from '../../assets/bg3.jpg';

export default function EmailReg({ navigation })

 {
     const[data, setData] = React.useState({
      check_textInputChange: false,
      secureTextEntry: true,
      secureComfirmTextEntry: true
     });

    const updateSecuredTextEntry = () =>{
      setData({
          ...data,
          secureTextEntry: !data.secureTextEntry
      });
    }

 const updateComfirmSecuredTextEntry = () =>{
  setData({
      ...data,
      secureComfirmTextEntry: !data.secureComfirmTextEntry
  });
}

const [firstname, setFirstname] = useState('');
const [lastname, setLastname] = useState('');
const [email, setEmail] = useState('');
const [password1, setPassword] = useState('');
const [password2, setPassword2] = useState('');
const [indicator, setIndicator] = useState(false);

var e = email
var remove_after='';
var username = '';

function signup(){
 e = email
 remove_after= e.indexOf('@');
 username =  e.substring(0, remove_after);

 if (password1 != password2){
  ToastAndroid.show("Password Does Not Match!", ToastAndroid.SHORT);
 }

 else if (password1.length < 5 || password2.length < 5){
  ToastAndroid.show("Password length must be 5!", ToastAndroid.SHORT);
 }

 else if (firstname == ''|| lastname == '' || email == '')
 {
  ToastAndroid.show("Please complete form", ToastAndroid.SHORT);
 }

 else{
//Email Check stage
setIndicator(!indicator);
axios.post('http://192.168.43.240:8000/api-email-check/', {
  email: email,
})
.then(function (response) {
  console.log(response.status);

 //Email Avaliable
  if(response.status == 200){
axios.post('http://192.168.43.240:8000/api-user-register/', {
  first_name: firstname ,
  last_name: lastname,
  username: username,
  email: email,
  password: password1,

})
.then(function (response) {
  console.log(response.data);
  AsyncStorage.setItem('first_name', JSON.stringify(firstname));
  AsyncStorage.setItem('last_name', JSON.stringify(lastname));
  AsyncStorage.setItem('username', JSON.stringify(username));
  AsyncStorage.setItem('email', JSON.stringify(email));
  AsyncStorage.setItem('password', JSON.stringify(password1));
  axios.post('http://192.168.43.240:8000/api-login/', {
    username: username,
    password: password1,
  })
  .then(function (response) {
    console.log(response.data);
    AsyncStorage.setItem('token', JSON.stringify(response.data.token));
    AsyncStorage.setItem('user_id', JSON.stringify(response.data.user_id.toString()));
    navigation.navigate('TransactionCode')
  })
  .catch(function (error) {
    console.log(error);
  });

})
.catch(function (error) {
  console.log(error);
});

  }

})
.catch(function (error) {
  console.log(error);
  //Email Used
  if (error.response.status == 409){
    setIndicator(indicator);
    ToastAndroid.show("This email has already been used", ToastAndroid.SHORT);
  }
});

 }
  }





  return (
    <ImageBackground source={bg} style={styles.container}>
    <View style={styles.header}>
    <Text animation="bounceIn" style={styles.preboto}>
    <MaterialCommunityIcons
           name='atom-variant'
           size={30}
         />
      PREBOTO
      </Text>
      <StatusBar style="none" />
    </View>

    <ScrollView
    animation= 'fadeInUpBig'
    style={styles.footer}>
    <Text animation="bounce"  style={styles.text}>Create Account</Text>
    <View>
      <View style={{flexDirection:'row', 
                    marginBottom:20}}>
          
           <TextInput
             mode="outlined"
             label="firstname"
             placeholder='firstname'
             name='firstname'
             style={{ paddingLeft:10, flex:1  }}
             textContentType='familyName'
             autoCapitalize='none'
             fontSize={18}
             onChangeText={(val)=>setFirstname(val)}
             left={<TextInput.Icon
              name='account'/>}
             />
             </View>

             <View style={{flexDirection:'row', 
                           marginBottom:20}}>
          
           <TextInput
             mode="outlined"
             label="lastname"
             placeholder='lastname'
             name='lastname'
             style={{ paddingLeft:10, flex:1  }}
             textContentType='givenName'
             autoCapitalize='none'
             fontSize={18}
             onChangeText={(val)=> setLastname(val)}
             left={<TextInput.Icon
              name='account'/>}
             />
             </View>
    
      <View style={{flexDirection:'row',
                    marginBottom:20 }}>
          <TextInput
             mode="outlined"
             label="Email"
             placeholder='Working Email'
             textContentType='emailAddress'
             name='email'
             style={{ paddingLeft:10, flex:1  }}
             autoCapitalize='none'
             fontSize={18}
             onChangeText={(val)=> setEmail(val)}
             left={<TextInput.Icon
              name='email'/>}
             /> 
        </View>
      <View style={{flexDirection:'row', 
                    marginBottom:25 }}>
          <TextInput
             mode="outlined"
             label="Password"
             placeholder='Password'
             name='password1'
             maxLength={5}
             secureTextEntry={data.secureTextEntry ? true : false}
             style={{ paddingLeft:10, flex:1  }}
             autoCapitalize='none'
             fontSize={18}
             onChangeText={(val)=> setPassword(val)}
             left={<TextInput.Icon
              name='lock'/>}
          
             /> 
        
      </View>

      <View style={{flexDirection:'row', 
                    marginBottom:10}}>

          <TextInput
             mode="outlined"
             label="Comfirm Password"
             placeholder='Comfirm Password'
             name='password2'
             maxLength={5}
             secureTextEntry={data.secureTextEntry ? true : false}
             style={{ paddingLeft:10, flex:1  }}
             autoCapitalize='none'
             fontSize={18}
             onChangeText={(val)=> setPassword2(val)}
             left={<TextInput.Icon
             name='lock'/>}
             /> 
      </View>
      <TouchableOpacity 
          onPress={updateSecuredTextEntry}
             > 
             {data.secureTextEntry ?
             <MaterialCommunityIcons
             name='eye-off-outline'
             color= 'gray'
             size={30} />
             :
             <MaterialCommunityIcons
             name='eye-outline'
             color= 'gray'
             size={30}/>
              }
             
          </TouchableOpacity>

      <View style={styles.warning}>
      <MaterialCommunityIcons
           name='information'
           color='white'
           size={30}
           style={styles.text}
         />
         <Text style={styles.textWaring}>Note this password will be required for every login. use a password you can remember </Text>
      </View>
      
    </View>
    <View style={styles.button}>

    <Pressable style={styles.button2}  onPress={signup}>
      <Text style={styles.text3}>Create Account</Text>
      <ActivityIndicator size="small" color="#fff" animating={indicator} style={{padding:10, marginTop:10}}/>
    </Pressable>
      </View> 
    
    </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
      },
  header: {
    flex: 0.2,
    alignItems: 'center',
    justifyContent: 'center',
  },

  footer: {
    flex: 2,
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 20,
    paddingHorizontal: 20,

    

  },
  button2: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00a80b',
    marginTop: 20,
    marginBottom:40,
    height:50,
    backgroundColor: '#00a80b',
    flexDirection:'row'
  },
  
  text3: {
    color:'white',
    fontSize: 20,
    fontWeight:'normal'
    
  },

    
  textWaring: {
    color:'white',
    fontSize: 14,
    fontWeight:'normal',
    alignSelf:'center',
    paddingHorizontal:0,
    width:'80%'

    
  },

  text: {
   
   fontSize: 30,
   fontWeight: 'normal',
   marginBottom: 8
   
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

warning: {
  backgroundColor: '#f0a8b5',
  borderRadius: 7,
  margin: 5,
  position:'relative',
  elevation:1,
  alignItems: 'stretch',
  marginTop:10,
  width:'95%',
  height: 70,
  alignSelf:'center',
  flexDirection:'row'
},



});
