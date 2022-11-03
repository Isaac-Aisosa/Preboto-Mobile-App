import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, SafeAreaView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { TextInput,Provider,Modal, Portal, } from 'react-native-paper';
import DropDown from "react-native-paper-dropdown";
import {Clipboard} from 'react-native';
import trade from '../../assets/trade.png';

export default function tradeDetails({ route, navigation })
 {

    const [narration, setNarration] = useState('');

    const {  inputAmount, outputAmount, returns,gain,loss,timestamp } = route.params;  

  return (
      <SafeAreaView style={styles.container}>
    <View style={styles.footer}>
    <Text animation="bounceIn" style={styles.preboto}>Trade Details</Text>
      <StatusBar style="none" />
       <Image style={{width:150,height:150,alignSelf:'center', marginTop:30,}}source={trade}   />

       <Text style={{fontSize:14, marginTop:20, color:'#0f0e0e', fontWeight:'normal', alignSelf:'center'}}>
            Open Balance
        </Text>
        <Text style={{fontSize:30, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {'₦' + inputAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>



        {gain ? (
        <View style={{backgroundColor:'#00b300', width:200,height:50, marginRight:5, borderRadius:50, marginBottom:10, alignSelf:'center', marginTop:5}}>
        <Text style={{alignSelf:'center', marginRight:10, marginTop:10,color:'#fff', fontSize:20 }}>
        { '+' + (returns / inputAmount * 100).toFixed(1) + "%"}
          
          </Text>
          <Text style={{fontSize:14, marginTop:20, color:'green', fontWeight:'normal', alignSelf:'center'}}>
            Profit
        </Text>
          <Text style={{fontWeight:'bold', color:'green', fontSize:18, alignSelf:'center', marginBottom:20}}>{'₦' + returns.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
        </View>
       ) : (
         <View></View>
       )}
 
 
       {loss ? (
        <View style={{backgroundColor:'#f05d5d', width:200,height:50, marginRight:5, borderRadius:50, marginBottom:10, alignSelf:'center', marginTop:5}}>
        <Text style={{alignSelf:'center', marginRight:10, marginTop:10,color:'#fff', fontSize:20}}>
        {(returns / inputAmount * 100).toFixed(1) + "%"}
          </Text>
          <Text style={{fontSize:14, marginTop:20, color:'red', fontWeight:'normal', alignSelf:'center'}}>
            Loss
        </Text>
          <Text style={{fontWeight:'bold', color:'red', fontSize:18, alignSelf:'center', marginBottom:20}}>{'₦' + returns.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}</Text>
        </View>
       ) : (
         <View></View>
       )}

       <View style={{marginTop:50}}>
        <Text style={{fontSize:14, marginTop:0, color:'#0f0e0e', fontWeight:'normal', alignSelf:'center'}}>
            Close Balance
        </Text>
        <Text style={{fontSize:30, marginTop:0, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {'₦' + outputAmount.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,')}
        </Text>
        <Text style={{fontSize:16, marginTop:20, color:'#0f0e0e', fontWeight:'bold', alignSelf:'center'}}>
            {timestamp}
        </Text>

        </View>
             
    </View>

</SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        backgroundColor: '#fff',
      
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
