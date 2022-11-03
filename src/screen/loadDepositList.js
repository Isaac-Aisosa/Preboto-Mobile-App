import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AsyncStorage from '@react-native-async-storage/async-storage'
import {Token} from './data'

export default function LoadDepositList({ navigation })
 {

    console.log('token:');
    console.log(Token);

    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
   // setToken(data)
    navigation.navigate('DepositList',{
        TOKEN: data,

      })
    });

    
  return (
      <SafeAreaView style={styles.container}>
    <ScrollView style={styles.footer}>
    
      <StatusBar style="none" />
      <View>
      <MaterialCommunityIcons name="atom-variant" style={{fontSize:100, alignSelf:'center', marginTop:30, color:'#000566'}}/>
        </View>

    </ScrollView>
</SafeAreaView >     
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
    backgroundColor: 'white',
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingVertical: 60,
    paddingHorizontal: 20,
    
    

  },



});
