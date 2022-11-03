import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image,Button,TextInput, Platform, ToastAndroid, ScrollView } from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';

import DepositList from './depositList'
import TransferList from './transferList'
import WithdrawList from './withdrawList'

const Tab = createMaterialTopTabNavigator();

export default function MyTransactions() {
  const [token, setToken] = useState('');

  AsyncStorage.getItem('token')
  .then((value) => {
  const data = JSON.parse(value);
  setToken(data)
  });



  return (
    <Tab.Navigator>
      <Tab.Screen name="Deposits" component={DepositList} options={{ headerShown: false, }}  initialParams={{TOKEN:token}} />
      <Tab.Screen name="Withdraw" component={WithdrawList} options={{ headerShown: false, }} initialParams={{TOKEN:token}}/>
      <Tab.Screen name="Transfer" component={TransferList} options={{ headerShown: false, }} initialParams={{TOKEN:token}}/>
      
    </Tab.Navigator>
  );
}
