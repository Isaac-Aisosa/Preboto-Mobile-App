import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { WebView } from 'react-native-webview';

export default function About({ navigation })
 {

    
  return (
      <SafeAreaView style={styles.container}>
     
     <WebView 
      style={styles.container}
      source={{ uri: 'http://192.168.43.240:8000/about' }}
    />

  </SafeAreaView >     
  );
}

const styles = StyleSheet.create({
  container: {
        flex: 1,
        marginTop:30,
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
    
    

  },




});
