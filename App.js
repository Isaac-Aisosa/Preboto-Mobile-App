// In App.js in a new project

import React, { useState, useEffect } from 'react';
import { View, Text, Button,Image } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage'


import Auth from './src/Auth/auth'
import Index from './src/screen/index'
import AppSecurity from './src/Auth/security'

const Stack = createStackNavigator();

export default function App({ navigation })
 {



  const [token, setToken] = useState('');

  useEffect(() => {  
    AsyncStorage.getItem('token')
    .then((value) => {
    const data = JSON.parse(value);
    setToken(data)

    });
  },
  [])


  return (


<NavigationContainer>
<Stack.Navigator headerMode='none'>
{token == null ? (
 
  <Stack.Screen name="Auth" component={Auth}  
          
          options={{ title: 'Preboto',
          headerTitleStyle: {
            fontWeight: 'normal',   
          },
          }}/>
  ) : (
  <Stack.Screen name="AppSecurity" component={AppSecurity}  
          options={{ title: 'Preboto',
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'normal',   
          },
          }}/>
   )}

    <Stack.Screen name="Index" component={Index}  
          options={{ title: 'Preboto',
          headerShown: false,
          headerTitleStyle: {
            fontWeight: 'normal',   
          },
          }}/>

        </Stack.Navigator>
    </NavigationContainer>
  
  );
}





