import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect, useRef } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, TextInput} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as LocalAuthentication from 'expo-local-authentication'
import ActionSheet, { SheetManager } from "react-native-actions-sheet";
import { SafeAreaView } from 'react-native-safe-area-context';


export default function Security({ navigation })
 {
  useEffect(() => {
    GetDetails();
    (async () => {
      const compatible = await LocalAuthentication.hasHardwareAsync();
      setIsBiometricSupported(compatible);
    })();
   }, [])

  const[data, setData] = useState({
    secureTextEntry: true
   });

   const [isBiometricSupported, setIsBiometricSupported] = useState(false);

   const updateSecuredTextEntry = () =>{
    setData({
        ...data,
        secureTextEntry: !data.secureTextEntry
    });
}

  const ref_input2 = useRef();
  const ref_input3 = useRef();
  const ref_input4 = useRef();
  const ref_input5 = useRef();

  const [password, setPassword] = useState('');
  const [auth_password, setAuthPassword] = useState('');
  const [first_name, setFirst_name] = useState('');
  const [last_name, setLast_name] = useState('');

  let GetDetails = async ()=>{  
    try{  
      let pass = await AsyncStorage.getItem('password');  
      let password = JSON.parse(pass);
      setAuthPassword(password)

      let first = await AsyncStorage.getItem('first_name');  
      let first_name = JSON.parse(first);
      setFirst_name(first_name)

      let last = await AsyncStorage.getItem('last_name');  
      let last_name = JSON.parse(last);
      setLast_name(last_name)
    }  
    catch(error){  
    
    }  
  }
   const handleBiometricAuth = async () => {  
        SheetManager.show("auth_sheet");
        // try {
        //   // Checking if device is compatible
        //   const isCompatible = await LocalAuthentication.hasHardwareAsync();
          
        //   if (!isCompatible) {
        //     throw new Error('Your device isn\'t compatible.')
        //   }
    
        //   // Checking if device has biometrics records
        //   const isEnrolled = await LocalAuthentication.isEnrolledAsync();
          
        //   if (!isEnrolled) {
        //     throw new Error('No Faces / Fingers found.')
        //   }
    
        //   // Authenticate user
        //   await LocalAuthentication.authenticateAsync();
    
        //   Alert.alert('Authenticated', 'Welcome back !')
        // } catch (error) {
        //   Alert.alert('An error as occured', error?.message);
        // }
        try{
  
          let result = await LocalAuthentication.authenticateAsync(
            {promptMessage:'Scan your finger.',
             disableDeviceFallback: false,
            }
          );
          console.log('Scan Result:', result);
          if(result.success){
            console.log('Success auth')
            SheetManager.hide("auth_sheet");
            ToastAndroid.show('Success!', ToastAndroid.SHORT);
            navigation.navigate('Index');
          }
          }
          catch(error){
            console.log(error);
            Alert.alert('error', error.toString());
          }
        }
     

if (isBiometricSupported){
  SheetManager.show("auth_sheet");
  handleBiometricAuth()
}

function CancelAuth(){
  SheetManager.hide("auth_sheet");
}

  function PasswordAuth(){
   if (password == auth_password){
    navigation.navigate('Tab')
    console.log('corect password')
   }
   else
   {
     console.log('incorect password')
   }

  }
    
  return (
      <View style={styles.container}>
    <SafeAreaView style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>
    <MaterialCommunityIcons
           name='atom-variant'
           size={80}
         />
     </Text>
      <StatusBar style="none" />

      <View style={styles.welcomeCon }>
        <Text style={styles.welcome }>
          Welcome Back!
        </Text>
        <Text style={styles.username }>
          {first_name} {last_name}
        </Text>
       
      </View>
      
      <Text  style={styles.text}>Enter Password</Text>

<View style={styles.inputcontainer} >

<TextInput
      maxLength={5}
      style={styles.input}
      secureTextEntry={data.secureTextEntry ? true : false}
      autoCapitalize='none'
      onChangeText={(val)=> setPassword(val)}
    />
</View>

     
          <Text style={styles.switch } onPress={()=>navigation.navigate('Auth')}>Switch account !</Text>
      <View style={styles.button}>
      <Pressable style={styles.button2}  onPress={PasswordAuth}>
      <Text style={styles.text3}>Login</Text>
    </Pressable>
      </View> 
     <View style={styles.fingerprint} >
       <Pressable onPress={handleBiometricAuth}>
       <MaterialCommunityIcons
           name='fingerprint'
           size={90}
           style={styles.preboto}
         />
       </Pressable>

    <Text animation="bounceIn" style={styles.preboto}>
       Tap to use fingerprint
     </Text>
   </View>

<ActionSheet id="auth_sheet">
  <SafeAreaView>
    <Text style={{fontSize:18,fontWeight:'bold', alignSelf:'center', marginTop:30}}>Authentication required</Text>
    <Text style={{fontSize:14,fontWeight:'normal', alignSelf:'center', marginTop:0}}>Verify Identity</Text>
    <Text style={{fontSize:14,fontWeight:'400', alignSelf:'center', marginTop:0}}>Please authenticate to login into Preboto account</Text>
    <Text style={{fontSize:12,fontWeight:'normal', alignSelf:'center', marginBottom:10, color:'gray'}}>Touch your fingerprint sensor</Text>

    <Pressable style={{height:35,width:100,backgroundColor:'white',
                       borderColor:'blue',borderRadius:10,borderWidth:2,
                       alignItems: 'center',justifyContent: 'center', paddingVertical: 5,
                      paddingHorizontal: 10,alignSelf:'center',marginBottom:40}}  onPress={CancelAuth}>

      <Text style={{fontSize:14,color:'blue',}}>Cancel</Text>

    </Pressable>
   <MaterialCommunityIcons
           name='fingerprint'
           size={50}
           style={{color:'gray',
           fontWeight:'normal',
           alignSelf:'center',
           marginTop:10,
          marginBottom:40}}
         />
  </SafeAreaView>
</ActionSheet>


    </SafeAreaView>
</View>     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#dfeaf2',
        width:'99%',
        height:'99%'
      
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
   marginBottom: 4,
   alignSelf:'center',
   marginTop:40,
   
},

preboto: {
  color:'#000566',
  fontWeight:'bold',
  alignSelf:'center',
  marginTop:10
  
},
text2: {
  color:'#a61308',
  fontSize: 20,
  fontWeight:'normal'
  
},

button: {
  marginBottom:30,
  
  
},

button2: {
  alignItems: 'center',
  justifyContent: 'center',
  paddingVertical: 5,
  paddingHorizontal: 10,
  borderRadius: 10,
  marginTop: 20,
  height:50,
  backgroundColor: '#077d0b',
},

text3: {
  color:'white',
  fontSize: 20,
  fontWeight:'normal'
  
},

welcome: {
  color:'#363636',
  fontSize: 20,
  fontWeight:'normal',
  alignSelf:'center'
  
},

username: {
  color:'#000566',
  fontSize: 30,
  fontWeight:'bold',
  alignSelf:'center'
},

switch: {
  color:'#ff0019',
  fontSize: 16,
  fontWeight:'bold',
  alignSelf:'center',
  marginTop:10,
},

welcomeCon:{
  marginTop:30,
  position:'relative',
  width:'95%',
  alignSelf:'center'
},

fingerprint:{
  alignSelf:'center',
  marginTop:10,
},

inputcontainer:{
 width:'80%',
 height:50,
 alignItems:'center',
 alignSelf:'center'

},

input:{
  width:'80%',
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
