
import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Picker,Pressable } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput } from 'react-native-paper';

export default function CreateProfile({ navigation })

 {

const [phone, setPhone] = useState('');
const [token, setToken] = useState('');


AsyncStorage.getItem('token')
.then((value) => {
const data = JSON.parse(value);
setToken(data)

});

function update(){
axios.post('http://192.168.43.240:8000/api-update-profile/', {
  phone: phone
},
{
  headers: {
    'Authorization': `Token ${token}` 
  }
})
.then(function (response) {
  console.log(response.data);
  AsyncStorage.setItem('phone', JSON.stringify(phone));
  navigation.navigate('index')

})
.catch(function (error) {
  console.log(error);
});

  }

  return (
      <View style={styles.container}>
    <View 
    animation= 'fadeInUpBig'
    style={styles.footer}>
    <Text animation="bounce"  style={styles.text}>Add Phone</Text>
    <ScrollView>
    <View>
       <View style={{flexDirection:'row',
                   marginBottom:20}}>
            <TextInput
             mode="outlined"
             label="Phone"
             placeholder='+234...'
             name='phone'
             defaultValue='+234'
             maxLength={14}
             keyboardType='phone-pad'
             style={{ paddingLeft:10, flex:1, fontSize:16  }}
             textContentType='telephoneNumber'
             autoCapitalize='none'
             onChangeText={(val)=>setPhone(val)}
             
             />
             
             </View>
  
  
    </View>
    <View>
    <Pressable style={styles.button2}   onPress={update}>
      <Text style={styles.text3}>Submit</Text>
    </Pressable>
      </View> 
      </ScrollView>
    </View>
    </View>
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
   
   fontSize: 30,
   fontWeight: 'bold',
   marginBottom: 8
   
},

proflex: {
  color:'#0f2c40',
  fontSize: 40,
  fontWeight:'bold'
  
},
text2: {
  color:'#000',
  fontSize: 16,
  fontWeight:'normal',
  marginLeft:10
  
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
    borderWidth: 2,
    borderColor: '#00a80b',
    marginTop: 20,
    marginBottom:40,
    height:50,
    backgroundColor: '#00a80b',
  },
  
  text3: {
    color:'white',
    fontSize: 20,
    fontWeight:'normal'
    
  },


});
