import * as React from 'react';
import { View, Text, Button, StatusBar } from 'react-native';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Dashboard from './dashboard'
import Setting from './setting'
import Chart from './chart'
import Transaction from './transaction'

const Tab = createBottomTabNavigator();

export default function MyTabs() {
  return (
    
    <Tab.Navigator
      initialRouteName="Dashboard"
      screenOptions={{
        tabBarActiveTintColor: '#000566',
        tabBarInactiveTintColor: '#9798ad',
      }}

     >

      
      <Tab.Screen
        name="Dashboard"
        component={Dashboard}
        options={{
          headerShown: false,
          tabBarLabel: 'Dashboard',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home-variant" color={color} size={25} />
          ),
        }}
      />
      
      <Tab.Screen
        name="Transactions"
        component={Transaction}
        options={{
          headerShown: true,
          tabBarLabel: 'Transaction',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="format-list-bulleted-square" color={color} size={25} />
          ),
        }}
      />


      <Tab.Screen
        name="Account Trading History"
        component={Chart}
        options={{
          headerShown: true,
          tabBarLabel: 'Growth',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="finance" color={color} size={25} />
          ),
        }}
      />

     <Tab.Screen
        name="Setting"
        component={Setting}
        options={{
          headerShown: false,
          tabBarLabel: 'Account',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account-cog" color={color} size={25} />
          ),
        }}
      />  
    </Tab.Navigator>

    

     





  );
}