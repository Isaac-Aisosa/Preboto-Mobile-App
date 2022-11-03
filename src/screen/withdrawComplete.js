import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button, Platform, ToastAndroid, ScrollView, Pressable, SafeAreaView} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


export default function WithdrawComplete({ navigation })
 {
    
  return (
      <SafeAreaView style={styles.container}>
    <ScrollView style={styles.footer}>
    
      <StatusBar style="none" />
      <View>
      <MaterialCommunityIcons name="checkbox-marked-circle-outline" style={{fontSize:100, alignSelf:'center', marginTop:30, color:'green'}}/>
       <Text style={{fontSize:20, marginTop:10, marginLeft:10,fontWeight:'bold', alignSelf:'center',color:'#000'}}>
       Withdraw Request Completed!
        </Text>
        </View>


        <Pressable style={{marginTop:20, borderRadius:5, width:'100%', height:100,backgroundColor:'#b3d9ff'}}>
         <Text style={{fontSize:14, marginTop:10, marginLeft:10,fontWeight:'normal', alignSelf:'center',color:'#000'}}>
            You Will receive payment under 24hrs.
          </Text>
          <Text style={{fontSize:14, marginTop:10, marginLeft:10,marginRight:10,fontWeight:'normal', alignSelf:'center',color:'red'}}>
            Note: if you dont get credited after 24hrs contact Preboto
          </Text>
        </Pressable>

    <Pressable style={styles.button} onPress={()=>navigation.navigate('Tab')}>
      <Text style={{fontSize:18, fontWeight:'bold', color:'white'}}>Go to DashBoard</Text>
    </Pressable>



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
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#00b300',
    marginTop: 20,
    marginBottom:100,
    backgroundColor: '#00b300',
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
  



});
